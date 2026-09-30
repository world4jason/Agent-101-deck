"""Browser regression checks for the slide deck (issue #2).

Run:  python3 tests/deck_check.py
Needs: pip install playwright && python3 -m playwright install chromium
Exits non-zero if any check fails.
"""
import pathlib
import sys

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError, sync_playwright

DECK = (pathlib.Path(__file__).resolve().parent.parent / "slides" / "index.html").as_uri()
VIEWPORTS = [(1440, 900), (1366, 768), (390, 844)]
BAD_HASHES = ["#1.5", "#0", "#999", "#abc", "#", "#-1", "#1e1", "#05", "#05x", "# 3"]

failures = []


def check(cond, msg):
    if not cond:
        failures.append(msg)


def state(page):
    return page.evaluate(
        """() => {
          const slides = [...document.querySelectorAll('.slide')];
          const shown = slides.map((s, i) => [i, getComputedStyle(s).display])
                              .filter(([, d]) => d !== 'none').map(([i]) => i);
          const active = slides.findIndex(s => s.classList.contains('active'));
          const rail = [...document.querySelectorAll('[data-rail].active')].map(r => r.dataset.rail);
          return {
            n: slides.length, shown, active,
            section: active >= 0 ? slides[active].dataset.section : null,
            rail,
            current: document.getElementById('current').textContent,
            total: document.getElementById('total').textContent,
            progress: document.getElementById('progress').style.width,
            hash: location.hash,
          };
        }"""
    )


def open_deck(browser, hash_="", viewport=(1440, 900)):
    page = browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(DECK + hash_)
    page.wait_for_load_state("load")
    return page, errors


def expect_slide(page, i, label):
    s = state(page)
    check(s["active"] == i, f"{label}: active {s['active']} != {i}")
    check(s["shown"] == [i], f"{label}: displayed slides {s['shown']} != [{i}]")
    check(s["current"] == str(i + 1), f"{label}: counter {s['current']} != {i + 1}")
    check(s["hash"] == f"#{i + 1}", f"{label}: hash {s['hash']} != #{i + 1}")
    want = f"{(i + 1) / s['n'] * 100}%"
    # Browsers round inline percentages to ~5 decimals.
    check(abs(float(s["progress"][:-1]) - float(want[:-1])) < 1e-3, f"{label}: progress {s['progress']} != {want}")
    return s


def check_every_slide(browser):
    for vp in VIEWPORTS:
        page, errors = open_deck(browser, viewport=vp)
        n = state(page)["n"]
        check(state(page)["total"] == str(n), f"{vp}: total text != {n}")
        for i in range(n):
            page.evaluate(f"location.hash = '#{i + 1}'")
            page.wait_for_timeout(50)
            s = expect_slide(page, i, f"{vp} slide {i + 1}")
            if vp[0] > 900:
                check(s["rail"] == [s["section"]], f"{vp} slide {i + 1}: rail {s['rail']} != [{s['section']}]")
        check(not errors, f"{vp}: page errors {errors}")
        page.close()


def check_fragments_walk(browser):
    page, errors = open_deck(browser)
    n = state(page)["n"]
    total_frags = page.evaluate("document.querySelectorAll('.fragment').length")
    for _ in range(n + total_frags - 1):
        page.keyboard.press("ArrowRight")
    s = state(page)
    check(s["active"] == n - 1, f"fragment walk: ended at {s['active']} not {n - 1}")
    hidden = page.evaluate("[...document.querySelectorAll('.fragment')].filter(f => !f.classList.contains('visible')).length")
    check(hidden == 0, f"fragment walk: {hidden} fragments still hidden")
    for _ in range(n + total_frags - 1):
        page.keyboard.press("ArrowLeft")
    expect_slide(page, 0, "fragment walk back")
    visible = page.evaluate("[...document.querySelectorAll('.fragment')].filter(f => f.classList.contains('visible')).length")
    check(visible == 0, f"fragment walk back: {visible} fragments still visible")
    check(not errors, f"fragment walk: page errors {errors}")
    page.close()


def check_fragment_opacity(browser):
    page, errors = open_deck(browser)
    fragment_slide = page.evaluate(
        """() => [...document.querySelectorAll('.slide')]
          .findIndex(slide => slide.querySelector('.fragment'))"""
    )
    if fragment_slide < 0:
        check(False, "fragment opacity: no slide contains fragments")
        page.close()
        return

    page.evaluate(f"location.hash = '#{fragment_slide + 1}'")
    page.wait_for_timeout(50)
    expect_slide(page, fragment_slide, "fragment opacity start")
    selector = ".slide.active .fragment"
    count = page.locator(selector).count()
    opacity_before = page.locator(selector).evaluate_all("fragments => fragments.map(f => getComputedStyle(f).opacity)")
    check(opacity_before == ["0"] * count, f"fragment opacity: before reveal {opacity_before} != all 0")

    for _ in range(count):
        page.keyboard.press("ArrowRight")
    try:
        page.wait_for_function(
            """() => [...document.querySelectorAll('.slide.active .fragment')]
              .every(f => getComputedStyle(f).opacity === '1')""",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        check(False, "fragment opacity: timed out waiting for revealed fragments to reach opacity 1")
    opacity_after = page.locator(selector).evaluate_all("fragments => fragments.map(f => getComputedStyle(f).opacity)")
    check(opacity_after == ["1"] * count, f"fragment opacity: after reveal {opacity_after} != all 1")
    check(not errors, f"fragment opacity: page errors {errors}")
    page.close()


def check_keyboard_after_buttons(browser):
    page, errors = open_deck(browser)
    nav_start = page.evaluate(
        """() => {
          const slides = [...document.querySelectorAll('.slide')];
          for (let i = 0; i <= slides.length - 3; i++) {
            if (slides.slice(i, i + 3).every(s => s.querySelectorAll('.fragment').length === 0)) return i;
          }
          return -1;
        }"""
    )
    if nav_start < 0:
        check(False, "keyboard: no run of 3 consecutive slides without fragments")
        page.close()
        return
    body_slide = page.evaluate(
        """() => {
          const slides = [...document.querySelectorAll('.slide')];
          return slides.findIndex((s, i) => i < slides.length - 1 && s.querySelectorAll('.fragment').length === 0);
        }"""
    )
    page.evaluate(f"location.hash = '#{nav_start + 1}'")
    page.wait_for_timeout(50)
    page.click("#next")
    expect_slide(page, nav_start + 1, "click Next")
    page.keyboard.press("ArrowRight")
    expect_slide(page, nav_start + 2, "ArrowRight after clicking Next")
    page.keyboard.press("ArrowLeft")
    expect_slide(page, nav_start + 1, "ArrowLeft with button focused")
    page.click("#prev")
    expect_slide(page, nav_start, "click Prev")
    page.keyboard.press("Tab")
    check(page.evaluate("document.activeElement.id") == "next", "Tab from Prev focuses Next")
    expect_slide(page, nav_start, "Tab leaves slide unchanged")
    page.keyboard.press("PageDown")
    expect_slide(page, nav_start + 1, "PageDown with button focused")
    page.keyboard.press("PageUp")
    expect_slide(page, nav_start, "PageUp with button focused")
    # Native button activation must fire exactly once (no double step).
    page.focus("#next")
    page.keyboard.press("Space")
    expect_slide(page, nav_start + 1, "Space on focused Next")
    page.keyboard.press("Enter")
    expect_slide(page, nav_start + 2, "Enter on focused Next")
    page.keyboard.press("End")
    s = state(page)
    expect_slide(page, s["n"] - 1, "End")
    hidden_last = page.evaluate(
        """() => {
          const slides = [...document.querySelectorAll('.slide')];
          return [...slides[slides.length - 1].querySelectorAll('.fragment')]
            .filter(f => !f.classList.contains('visible')).length;
        }"""
    )
    check(hidden_last == 0, f"End: {hidden_last} fragments of the last slide still hidden")
    page.keyboard.press("Home")
    expect_slide(page, 0, "Home")
    # Browser shortcuts with modifiers must not move slides.
    page.keyboard.press("Alt+ArrowRight")
    page.keyboard.press("Control+ArrowRight")
    page.keyboard.press("Meta+ArrowRight")
    expect_slide(page, 0, "modifier+ArrowRight ignored")
    if body_slide < 0:
        check(False, "keyboard: no fragment-free slide before the last slide for body Space")
    else:
        page.evaluate(f"location.hash = '#{body_slide + 1}'")
        page.wait_for_timeout(50)
        expect_slide(page, body_slide, "body Space starts on fragment-free slide")
        page.evaluate("document.activeElement.blur()")
        page.keyboard.press("Space")
        expect_slide(page, body_slide + 1, "Space on body")
    check(not errors, f"keyboard: page errors {errors}")
    page.close()


def check_hash(browser):
    page, errors = open_deck(browser, "#5")
    expect_slide(page, 4, "initial #5")
    page.evaluate("location.hash = '#7'")
    page.wait_for_timeout(100)
    expect_slide(page, 6, "hashchange to #7")
    for bad in BAD_HASHES:
        page.evaluate(f"location.hash = {bad!r}")
        page.wait_for_timeout(100)
        expect_slide(page, 6, f"hashchange to invalid {bad!r} keeps slide 7")
    page.evaluate("location.hash = '#8'")
    page.wait_for_timeout(100)
    expect_slide(page, 7, "hashchange to #8 before back/forward")
    page.go_back()
    page.wait_for_timeout(100)
    expect_slide(page, 6, "back returns to slide 7")
    page.go_forward()
    page.wait_for_timeout(100)
    expect_slide(page, 7, "forward returns to slide 8")
    check(not errors, f"hash: page errors {errors}")
    page.close()
    for bad in BAD_HASHES:
        page, errors = open_deck(browser, bad)
        expect_slide(page, 0, f"initial invalid {bad!r} falls back to slide 1")
        check(not errors, f"initial {bad!r}: page errors {errors}")
        page.close()


def check_print(browser):
    page, _ = open_deck(browser)
    page.emulate_media(media="print")
    try:
        page.wait_for_function(
            """() => [...document.querySelectorAll('.fragment')]
              .every(f => getComputedStyle(f).opacity === '1')""",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        hidden = page.evaluate(
            "[...document.querySelectorAll('.fragment')].filter(f => getComputedStyle(f).opacity !== '1').length"
        )
        check(False, f"print: timed out with {hidden} fragments not fully visible")
    s = state(page)
    check(len(s["shown"]) == s["n"], f"print: {len(s['shown'])} of {s['n']} slides displayed")
    page.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for fn in (check_every_slide, check_fragments_walk, check_fragment_opacity, check_keyboard_after_buttons, check_hash, check_print):
            before = len(failures)
            fn(browser)
            print(f"{'PASS' if len(failures) == before else 'FAIL'}  {fn.__name__}")
        browser.close()
    for f in failures:
        print("  -", f)
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
