(() => {
  "use strict";
  const script = document.currentScript;
  const siteRoot = new URL("../", script.src);
  const path = location.pathname;
  const selected = path.includes("/versions/v7/") ? "v7"
    : path.includes("/drafts/rev10.html") ? "v10" : "current";
  const versions = [
    { id:"v7", text:"v7", pages:44, url:"versions/v7/", file:"downloads/agent101-v7-editable.pptx" },
    { id:"v10", text:"v10", pages:55, url:"drafts/rev10.html", file:"downloads/agent101-v10-editable.pptx" },
    { id:"current", text:"最新版", pages:107, url:"slides/", file:"downloads/agent101-current-editable.pptx" }
  ];
  const current = versions.find(v => v.id === selected);
  const bar = document.querySelector("footer.controls");
  if (!bar) return;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("version-nav.css",script.src).href;
  document.head.append(css);

  const group = document.createElement("div");
  group.className = "deck-version-tools";
  group.setAttribute("aria-label", "簡報版本與 PPTX");
  const nav = document.createElement("nav");
  nav.className = "deck-version-links";
  nav.setAttribute("aria-label", "切換簡報版本");
  for (const version of versions) {
    const link = document.createElement("a");
    link.className = "deck-version-link";
    link.textContent = version.text;
    link.href = new URL(version.url,siteRoot).href;
    link.title = version.text+"（"+version.pages+" 頁）";
    if (version.id === selected) {
      link.classList.add("is-current");
      link.setAttribute("aria-current","page");
    } else {
      link.target = "_blank";
      link.rel = "noopener";
    }
    nav.append(link);
  }
  const download = document.createElement("a");
  download.className = "deck-pptx-export";
  download.href = new URL(current.file,siteRoot).href;
  download.setAttribute("download", current.file.split("/").pop());
  download.textContent = "下載可編輯 PPTX ↓";
  download.title = "下載 "+current.text+" 的原生可編輯 PPTX（文字、卡片、流程圖為物件；網頁互動不包含）。";
  download.setAttribute("aria-label","下載 "+current.text+" 的原生可編輯 PowerPoint");
  group.append(nav,download);
  bar.append(group);
})();
