const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const deckUrl = process.env.DECK_URL || pathToFileURL(path.resolve(__dirname, '../drafts/rev11.html')).href;
const viewports = [[768, 844], [767, 844], [390, 844]];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}),
  });
  let fixedLayout;

  try {
    for (const [width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${deckUrl}#3`);
      await page.waitForLoadState('load');

      const layout = await page.evaluate(() => {
        const deck = document.querySelector('.deck');
        const deckStyle = getComputedStyle(deck);
        const rect = deck.getBoundingClientRect();
        const slide = document.querySelector('#page-3');
        return {
          isRev11: document.body.classList.contains('rev11-draft'),
          deckWidth: deckStyle.width,
          deckMaxWidth: deckStyle.maxWidth,
          scale: new DOMMatrixReadOnly(deckStyle.transform).a,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          matchingColumns: getComputedStyle(slide.querySelector('.matching-demo')).gridTemplateColumns,
          groupLabelDisplay: getComputedStyle(slide.querySelector('.matching-group-label')).display,
          headingFontSize: getComputedStyle(slide.querySelector('h1')).fontSize,
          checklistColumns: getComputedStyle(document.querySelector('.checklist')).gridTemplateColumns,
        };
      });
      const expectedScale = Math.min(width / 1440, height / 900);
      const label = `${width}x${height}`;

      assert.equal(layout.isRev11, true, `${label}: DECK_URL did not load rev11`);
      assert.equal(layout.deckWidth, '1440px', `${label}: fixed canvas width`);
      assert.equal(layout.deckMaxWidth, 'none', `${label}: fixed canvas max-width`);
      assert.ok(Math.abs(layout.scale - expectedScale) < 1e-4, `${label}: scale ${layout.scale} != ${expectedScale}`);
      assert.ok(Math.abs(layout.rect.width - width) < 1, `${label}: rendered width ${layout.rect.width} != ${width}`);
      assert.ok(Math.abs(layout.rect.height - 900 * expectedScale) < 1, `${label}: rendered height ${layout.rect.height} != ${900 * expectedScale}`);
      assert.ok(Math.abs(layout.rect.x - (width - layout.rect.width) / 2) < 1, `${label}: canvas is not horizontally centered`);
      assert.ok(Math.abs(layout.rect.y - (height - layout.rect.height) / 2) < 1, `${label}: canvas is not vertically centered`);

      if (width === 768) {
        fixedLayout = layout;
        assert.equal(layout.matchingColumns.split(' ').length, 5, `${label}: fixed diagram columns`);
        assert.equal(layout.groupLabelDisplay, 'block', `${label}: fixed diagram group label`);
        assert.equal(layout.headingFontSize, '36px', `${label}: fixed slide heading size`);
      } else {
        for (const key of ['matchingColumns', 'groupLabelDisplay', 'headingFontSize', 'checklistColumns']) {
          assert.equal(layout[key], fixedLayout[key], `${label}: fixed-canvas ${key} changed`);
        }
      }
      assert.deepEqual(errors, [], `${label}: browser errors`);
      console.log(`PASS ${label}: ${layout.rect.width}x${layout.rect.height} at scale ${layout.scale}`);
      await page.close();
    }

    const rev10Page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const rev10Url = process.env.REV10_URL || new URL('../drafts/rev10.html', deckUrl).href;
    await rev10Page.goto(`${rev10Url}#3`);
    await rev10Page.waitForLoadState('load');
    const rev10Layout = await rev10Page.evaluate(() => {
      const deck = document.querySelector('.deck');
      const style = getComputedStyle(deck);
      const matchingDemo = document.querySelector('.matching-demo');
      return {
        isRev10: document.body.classList.contains('rev10-draft') && !document.body.classList.contains('rev11-draft'),
        deckWidth: style.width,
        deckMaxWidth: style.maxWidth,
        transform: style.transform,
        matchingColumns: getComputedStyle(matchingDemo).gridTemplateColumns,
        groupLabelDisplay: getComputedStyle(matchingDemo.querySelector('.matching-group-label')).display,
      };
    });
    assert.equal(rev10Layout.isRev10, true, 'REV10_URL did not load standalone rev10');
    assert.equal(rev10Layout.deckWidth, '390px', 'rev10 responsive canvas width changed');
    assert.equal(rev10Layout.deckMaxWidth, '100%', 'rev10 responsive max-width changed');
    assert.equal(rev10Layout.transform, 'none', 'rev10 responsive transform changed');
    assert.equal(rev10Layout.matchingColumns.split(' ').length, 1, 'rev10 matching diagram no longer reflows on mobile');
    assert.equal(rev10Layout.groupLabelDisplay, 'none', 'rev10 mobile group label visibility changed');
    console.log('PASS 390x844 rev10 retains its responsive presentation');
    await rev10Page.close();
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
