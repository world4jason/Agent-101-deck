(() => {
  'use strict';

  const ROOT = document.documentElement;
  const slides = [...document.querySelectorAll('.slide')];
  const canvas = document.getElementById('canvas');
  const viewport = document.querySelector('.viewport');
  const currentPage = document.getElementById('current-page');
  const totalPages = document.getElementById('total-pages');
  const progressTrack = document.querySelector('.progress-track');
  const progressFill = document.getElementById('progress-fill');
  const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const notesButton = document.getElementById('notes-button');
  const chapterLinks = [...document.querySelectorAll('.chapter-rail [data-start]')];
  const sceneIds = slides.map(slide => slide.dataset.rev13SceneId || slide.dataset.rev13MergedScenes?.split(',')[0]);
  let pageIndex = 0;

  const ROLE_DATA = [
    { name: 'Owner', display: '授權人', example: '查看配對規則的審查與測試紀錄，再決定是否授權合併。' },
    { name: 'PM', display: '專案經理', example: '協調工作與交接，安排配對規則票的先後順序。' },
    { name: 'PO', display: '產品負責人', example: '釐清需求與驗收，寫明單向按讚不能配對。' },
    { name: 'UI/UX', display: '介面與體驗設計', example: '設計使用方式，例如規劃配對清單怎麼呈現。' },
    { name: 'Dev', display: '開發者', example: '修改程式並留下紀錄，實作互按才配對。' },
    { name: 'Reviewer', display: '程式審查者', example: '檢查修改是否符合工作票，退回範圍外的聊天室。' },
    { name: 'QA', display: '品質驗證者', example: '依驗收條件核對行為，檢查單向按讚後沒有配對紀錄。' },
  ];

  const KANBAN = [
    { key: 'backlog', label: '待整理' },
    { key: 'ready', label: '待接手' },
    { key: 'dev', label: '開發中' },
    { key: 'review', label: '待審查' },
    { key: 'qa', label: '待驗證' },
    { key: 'product-check', label: '產品確認' },
    { key: 'done', label: '本票完成' },
  ];
  const LOCATOR_LABELS = {
    backlog: '待整理', ready: '待接手', dev: '開發', review: '審查',
    qa: '驗證', 'product-check': '產品確認', done: '本票完成',
  };

  const STAGE_KANBAN = {
    brainstorming: ['backlog'],
    refinement: ['backlog'],
    ready: ['ready'],
    dev: ['dev'],
    review: ['review'],
    qa: ['qa'],
    product_check: ['product-check'],
    human_gate: ['product-check'],
    release_done: ['product-check'],
  };

  const STAGES = {
    brainstorming: {
      label: 'Brainstorming',
      activity: '是活動，不是看板欄',
      kanban: 'pre-backlog → Backlog',
      goal: '尚待形成',
      target: '決定下一個要處理的使用者問題與方向',
      input: '問題、觀察、機會與限制',
      activities: ['探索選項', '整理 Outcome Goal', '定義成功訊號'],
      output: 'Goal／Proposal 與未決假設',
      stateChange: '問題待釐清 → Goal／Proposal 待確認',
      handoff: '方向確認後交 PO 進入 Backlog Refinement',
      exit: '需求方確認方向，並留下共同可追溯的 Goal 紀錄。',
      lead: ['Owner', 'PM', 'PO'],
      co: [],
      nextStage: 'Refinement · Backlog',
      githubObjects: 'Goal Issue · Proposal',
      github: '建立／更新 Goal 或 Proposal Issue（類型依團隊配置）',
    },
    refinement: {
      label: 'Refinement / Planning',
      activity: '在 Backlog 進行',
      kanban: 'Backlog',
      goal: '已決定的 Goal Issue',
      target: '確認可行性，把需求拆成可交辦工作',
      input: 'Goal／Proposal、限制、依賴與未決疑問',
      activities: ['界定範圍', '拆分工作票', '釐清 AC／AT', '確認證據與風險'],
      output: 'Parent／Child Tickets、Scope、AC／AT、各 AC 的預期 Evidence、未決清單',
      stateChange: 'Goal → 已界定範圍與驗收契約的 Tickets；仍在 Backlog',
      handoff: 'PO／Dev／QA 進行 Ready Check',
      exit: '票可估算與驗證；阻礙已處置或有明確處置方式。',
      lead: ['PO', 'PM'],
      co: ['Owner', 'Dev', 'QA', 'UI/UX'],
      nextStage: 'Ready Check',
      githubObjects: 'Parent Issue · Sub-issues · Project',
      github: '更新 Parent Issue／Sub-issues、依賴與 Project 欄位',
    },
    ready: {
      label: 'Ready Check',
      activity: '確認交接條件',
      kanban: 'Backlog → Ready',
      goal: '保持 Parent Goal 不變',
      target: '決定這張票是否具備開工條件',
      input: '已釐清的票、AC／AT、依賴與責任',
      activities: ['檢查範圍', '確認可測性', '檢查依賴', '指定接手者'],
      output: 'Ready Ticket 與明確接手者；尚未開工',
      stateChange: 'Backlog → Ready；接手者已明確',
      handoff: '條件成立後交指定 Dev；尚未開工',
      exit: '本課 Required Ready 條件滿足，才允許拉進 Dev。',
      lead: ['PO', 'Dev'],
      co: ['QA'],
      nextStage: 'Dev',
      githubObjects: 'Issue · Project',
      github: 'Issue／Project：Backlog → Ready',
    },
    dev: {
      label: 'Dev',
      activity: '看板工作站',
      kanban: 'Dev',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '在核准範圍內實作並留下版本',
      input: 'Ready Ticket 的核准 範圍／AC、設計、共同 Repo 與 停止條件',
      activities: ['建立 Branch', '實作並 Commit', '自測與記錄未完成項'],
      output: '版本、修改摘要、自測紀錄與未驗清單',
      stateChange: 'Ready → Dev；形成版本',
      handoff: '版本與自測紀錄交 Reviewer',
      exit: '待審改動與自測可供審查；自測不等於 QA 完成。',
      lead: ['Dev'],
      co: ['PO', 'UI/UX'],
      nextStage: 'PR Review',
      githubObjects: 'Issue · Branch · Commit',
      github: 'Issue → Branch／Commit；需要時連結 PR',
    },
    review: {
      label: 'PR Review',
      activity: '看板工作站',
      kanban: 'Review',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '檢查修改、風險與範圍邊界',
      input: 'PR 差異、Ticket／AC、版本與自測摘要',
      activities: ['比對差異', '提出審查意見', '處置重大問題'],
      output: '審查發現、同意或要求修改',
      stateChange: 'Dev → Review；重大審查問題須有處置',
      handoff: '重大問題已處置才交 QA；否則回 Dev',
      outputNote: '概念示意；不代表真實 PR 或 Review 紀錄',
      exit: '重大問題已有處置，待審改動可交付 QA；PR 尚不必然 Merge。',
      lead: ['Reviewer'],
      co: ['Dev', 'PO'],
      nextStage: 'QA / Verification',
      githubObjects: 'Pull Request · Review · Checks',
      github: 'Pull Request、Review comments 與 checks',
    },
    qa: {
      label: 'QA / Verification',
      activity: '看板工作站',
      kanban: 'QA',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '用可重跑證據檢查版本行為',
      input: '可識別版本、AC／AT、測試資料與環境',
      activities: ['實際符合預期 → PASS', '實際不符預期 → FAIL', '尚未執行 → 未測（NOT RUN）'],
      output: '測試紀錄、發現／缺漏與補驗請求',
      stateChange: 'Review → QA；留下實際結果與未測項',
      handoff: '證據與未測項交 PO 作 Product Check',
      outputNote: '概念示意；未執行項維持未測',
      exit: '交付明確證據與剩餘未驗項；未執行不改成 PASS。',
      lead: ['QA'],
      co: ['Dev'],
      nextStage: 'Product Check',
      githubObjects: 'Evidence · Test results · Issue',
      github: 'Evidence、PR test results 或 Issue comments',
    },
    product_check: {
      label: 'Product Check',
      activity: '看板工作站',
      kanban: 'Product Check',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '判斷這張票是否符合需求並推進 Goal',
      input: 'Ticket／AC、Review／QA Evidence、Parent Goal 與風險',
      activities: ['核對產品結果', '檢查需求變更', '記錄實作缺口'],
      output: '接受範圍、退回理由或未完成路徑',
      stateChange: 'QA → Product Check；保留接受範圍或未完成路徑',
      handoff: '交授權者作 Human Gate；退回時保留處置路徑',
      outputNote: '概念示意；未測量整體 Goal 成效',
      exit: '產品責任方留下明確接受或退回建議，並保留風險。',
      lead: ['PO'],
      co: ['Owner', 'Dev', 'QA'],
      nextStage: 'Human Gate · 欄外決策',
      githubObjects: 'Issue · Project',
      github: '更新 Issue／Project 的產品判斷紀錄',
    },
    human_gate: {
      label: 'Human Gate',
      activity: '欄外人類決策',
      kanban: 'Product Check（欄外決策）',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '由授權的人決定整合／發布或要求補驗',
      input: '版本、Review／QA Evidence、剩餘風險與發布計畫',
      activities: ['檢查證據', '評估剩餘風險', '決定是否授權'],
      output: '可回查的授權、暫停或退回紀錄',
      stateChange: 'Product Check → 欄外授權、暫停或退回',
      handoff: '授權後才進 Merge／上線；不授權則暫停或補驗',
      outputNote: '條件式輸出；沒有真實授權紀錄',
      exit: '明確授權且後續 上線／DoD 條件可檢查；不自動 Done。',
      lead: ['Owner'],
      co: ['PO', 'QA', 'Dev'],
      nextStage: 'Merge / 上線 / Done',
      githubObjects: 'Pull Request · Issue decision log',
      github: 'PR／Issue 決策紀錄；尚未直接等於 Merge',
    },
    release_done: {
      label: 'Done',
      activity: '本票交付完成後，才標 Done',
      kanban: '本票條件 → 授權 → 合併 → 完成交付',
      goal: 'Parent Goal Issue（連回原始產品結果）',
      target: '核對本票 DoD，再分清授權、合併與交付',
      input: '工作票上寫明的 DoD、交付範圍與證據要求',
      activities: ['AC／AT 全符合並留獨立驗證紀錄', '授權人決定是否合併', '實際合併並記交付後才標 Done'],
      output: '完成交付的紀錄與狀態',
      stateChange: '符合本票條件 → 授權 → 合併並完成交付 → Done',
      handoff: '符合 DoD 才能申請合併；實際合併並完成交付後才標本票 Done。功能上線另行判斷。',
      outputNote: '其他工作票完成後，仍要由授權人決定是否讓功能上線',
      exit: '完成本票交付並留下證據後，才可標 Done；功能是否上線另由授權人決定。',
      lead: ['Dev'],
      co: ['Owner', 'PO', 'QA'],
      nextStage: '合併後記錄本票交付',
      githubObjects: 'Issue · Project · 所需 PR／版本證據',
      github: '在 Issue／Project 留下 DoD 與交付完成紀錄',
    },
  };

  const RESPONSIBILITY = {
    Owner: '決定方向並作正式授權',
    PM: '促進協作，安排風險與節奏',
    PO: '整理需求、驗收條件與產品判斷',
    'UI/UX': '設計介面與使用互動',
    Dev: '實作、修正並交出版本',
    Reviewer: '檢查程式修改、範圍與風險',
    QA: '依驗收條件獨立驗證行為',
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
  }

  const SWIMLANE_LAYOUT = {
    width: 1600,
    height: 780,
    roles: [
      { name: 'Owner', label: '授權人', y: 161 }, { name: 'PM', label: '專案經理', y: 211 },
      { name: 'PO', label: '產品負責人', y: 261 }, { name: 'UI/UX', label: '介面設計', y: 311 },
      { name: 'Dev', label: '開發者', y: 361 }, { name: 'Reviewer', label: '程式審查', y: 411 },
      { name: 'QA', label: '品質驗證', y: 461 }, { name: 'Agent', label: 'Agent', y: 511 },
    ],
    stages: [
      { key: 'backlog', number: '01', label: 'Backlog', subLabel: '待整理', x: 190, width: 140 },
      { key: 'ready', number: '02', label: 'Ready', subLabel: '待接手', x: 340, width: 140 },
      { key: 'dev', number: '03', label: 'Dev', subLabel: '開發中', x: 490, width: 140 },
      { key: 'review', number: '04', label: 'Review', subLabel: '待審查', x: 640, width: 140 },
      { key: 'qa', number: '05', label: 'QA', subLabel: '待驗證', x: 790, width: 140 },
      { key: 'product-check', number: '06', label: 'Product Check', subLabel: '產品確認', x: 940, width: 160 },
      { key: 'human_gate', number: '', label: 'Human Gate', subLabel: '欄外授權', x: 1110, width: 130, outside: true },
      { key: 'done', number: '07', label: 'Done', subLabel: '本票完成', x: 1250, width: 140 },
    ],
  };

  const PROCESS_STEPS = [
    { key: 'backlog', number: '01', label: '待整理' },
    { key: 'ready', number: '02', label: '待接手' },
    { key: 'dev', number: '03', label: '開發' },
    { key: 'review', number: '04', label: '審查' },
    { key: 'qa', number: '05', label: '驗證' },
    { key: 'product-check', number: '06', label: '產品確認' },
    { key: 'done', number: '07', label: '完成' },
  ];
  const PROCESS_HANDOFFS = [
    { from: 'backlog', to: 'ready', label: '工作票＋驗收' },
    { from: 'ready', to: 'dev', label: '交接條件' },
    { from: 'dev', to: 'review', label: '版本＋自測' },
    { from: 'review', to: 'qa', label: '審查意見' },
    { from: 'qa', to: 'product-check', label: '測試紀錄' },
    { from: 'product-check', to: 'human_gate', label: '核對結果' },
    { from: 'human_gate', to: 'done', label: '放行決定' },
  ];
  const ROLE_SHORT = {
    Owner: '授權', PM: '協調', PO: '產品', 'UI/UX': '設計',
    Dev: '開發', Reviewer: '審查', QA: '驗證', Agent: 'Agent',
  };

  const SWIMLANE_ROLE_TASKS = {
    Owner: { 'human_gate': { title: '授權合併', decision: true } },
    PM: { backlog: { title: '釐清問題' } },
    PO: {
      backlog: { title: '拆票＋驗收' },
      ready: { title: '確認開工' },
      'product-check': { title: '核對目標' },
    },
    Dev: {
      dev: { title: '改配對規則' },
      review: { title: '依意見修正', co: true },
      qa: { title: '協助重現', co: true },
    },
    Reviewer: { review: { title: '核對改動' } },
    QA: {
      qa: { title: '驗收核對' },
      'product-check': { title: '整理證據', co: true },
    },
    Agent: { dev: { title: '改配對規則', co: true } },
  };

  const SWIMLANE_X = Object.fromEntries(SWIMLANE_LAYOUT.stages.map(stage => [stage.key, stage.x + stage.width / 2]));
  SWIMLANE_X.refinement = SWIMLANE_X.backlog;
  SWIMLANE_X.end = 1480;
  const SWIMLANE_Y = Object.fromEntries(SWIMLANE_LAYOUT.roles.map(role => [role.name, role.y]));

  function svgLines(x, y, lines, className, fontSize = 18, color = '#e9eee8') {
    const start = y - ((lines.length - 1) * 10);
    return `<text class="${className}" x="${x}" y="${start}" fill="${color}" font-size="${fontSize}" text-anchor="middle">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? 20 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
  }

  function svgRect(x, y, width, height, fill, stroke, radius = 5, className = '') {
    return `<rect class="${className}" x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
  }

  function roundedOrthogonalPath(points, radius = 8) {
    if (points.length < 2) return '';
    let path = `M${points[0][0]} ${points[0][1]}`;
    for (let index = 1; index < points.length - 1; index += 1) {
      const previous = points[index - 1];
      const corner = points[index];
      const next = points[index + 1];
      const beforeLength = Math.abs(corner[0] - previous[0]) + Math.abs(corner[1] - previous[1]);
      const afterLength = Math.abs(next[0] - corner[0]) + Math.abs(next[1] - corner[1]);
      const bend = Math.min(radius, beforeLength / 2, afterLength / 2);
      const before = [
        corner[0] - Math.sign(corner[0] - previous[0]) * bend,
        corner[1] - Math.sign(corner[1] - previous[1]) * bend,
      ];
      const after = [
        corner[0] + Math.sign(next[0] - corner[0]) * bend,
        corner[1] + Math.sign(next[1] - corner[1]) * bend,
      ];
      path += ` L${before[0]} ${before[1]} Q${corner[0]} ${corner[1]} ${after[0]} ${after[1]}`;
    }
    const end = points.at(-1);
    return `${path} L${end[0]} ${end[1]}`;
  }

  function workCardMarkup({ x, y, role, title, co = false, decision = false }, { focused = false, context = false, state = '' } = {}) {
    const width = 128;
    const height = 32;
    const left = x - width / 2;
    const top = y - height / 2;
    const classes = `swimlane-node work-card${co ? ' is-co' : ' is-lead'}${decision ? ' decision-node' : ''}${focused ? ' is-focus' : ''}${context ? ' is-context' : ''}`;
    const shape = decision
      ? `<polygon class="swimlane-card" points="${x},${top} ${x + width / 2},${y} ${x},${top + height} ${x - width / 2},${y}"/>`
      : svgRect(left, top, width, height, focused ? '#303326' : '#172322', focused ? '#e2bd70' : '#59746a', 4, 'swimlane-card');
    return `<g class="${classes}" data-role="${esc(role)}"${state ? ` data-state="${esc(state)}"` : ''} aria-label="${esc(`${ROLE_SHORT[role] || role}：${title}`)}">${shape}<text class="swimlane-card-title" x="${x}" y="${y + 5}" text-anchor="middle">${esc(title)}</text></g>`;
  }

  function handoffLabelMarkup({ from, to, label }, index, active = false, uid = '') {
    const start = SWIMLANE_X[from];
    const end = SWIMLANE_X[to];
    if (!start || !end) return '';
    const mid = (start + end) / 2;
    const width = Math.max(54, label.length * 15 + 16);
    return `<g class="swimlane-handoff${active ? ' is-active' : ''}" data-handoff="${from}-${to}"><path d="M${start + 5} 110 H${end - 5}" marker-end="url(#swimlane-arrow-${uid})"/><rect x="${mid - width / 2}" y="117" width="${width}" height="18" rx="4"/><text x="${mid}" y="131" text-anchor="middle">${esc(label)}</text></g>`;
  }

  const SWIMLANE_CARD_STATUS_SHORTENINGS = Object.freeze({
    '尚未建立': '未建立',
    '尚未備妥': '未備妥',
    '尚未開始': '未開始',
    '尚未送審': '未送審',
    '尚未驗證': '未驗證',
    '尚未核對': '未核對',
    '等待決定': '待決定',
    '尚未完成': '未完成',
    '尚未開分支': '未開分支',
    '尚無修改紀錄': '無修改紀錄',
    '已拆分・待補': '已拆待補',
    '補測 PASS': '補測通過',
    '配對規則票已交辦': '已交辦',
    '沿用既有目標': '沿用目標',
    '尚未產生': '未產生',
    '尚未決定': '未決定',
    '整體目標仍未測': '目標未測',
    '同一張票已交辦': '已交辦',
    'Agent 修改為教學示意': '示意',
    '審查流程為教學示意': '示意',
    '三次規則實測可回查': '可回查',
    '介面與完整流程未測': '介面流程未測',
    '規則測試紀錄可回查': '可回查',
    'Agent 修改：教學示意': '示意',
    '審查：教學示意': '示意',
    '測試對應修正版': '修正版測試',
  });

  function compactSwimlaneCardStatus(status) {
    const fullStatus = String(status ?? '');
    const compactStatus = SWIMLANE_CARD_STATUS_SHORTENINGS[fullStatus] || fullStatus;
    const maxLength = fullStatus === '已授權（示意）' ? 7 : 6;
    return [...compactStatus].length <= maxLength ? compactStatus : '詳見說明';
  }

  function mapFooterMarkup(uid, page, options = {}) {
    const isPrinciplePage = options.principles === true;
    // Keep the numbered explanation row clearly above the documents/version note.
    const principles = isPrinciplePage ? `<g class="map-footer-principles" aria-label="五項原則"><g><circle cx="204" cy="702" r="12"/><text class="principle-number" x="204" y="708">1</text><text x="224" y="708">共用工作紀錄</text></g><g><circle cx="494" cy="702" r="12"/><text class="principle-number" x="494" y="708">2</text><text x="514" y="708">超出範圍先停</text></g><g><circle cx="784" cy="702" r="12"/><text class="principle-number" x="784" y="708">3</text><text x="804" y="708">人與 Agent 分工</text></g><g><circle cx="1074" cy="702" r="12"/><text class="principle-number" x="1074" y="708">4</text><text x="1094" y="708">獨立核對結果</text></g><g><circle cx="1364" cy="702" r="12"/><text class="principle-number" x="1364" y="708">5</text><text x="1384" y="708">回看產品目標</text></g></g>` : '';
    const footerRule = isPrinciplePage ? 730 : 696;
    const docY = isPrinciplePage ? 760 : 738;
    const versionSummary = options.briefVersion ? '' : '<text x="924" y="' + docY + '">版本修改與審查紀錄</text>';
    const responsibility = options.roleLegend ? `<g class="role-map-key"><rect x="24" y="701" width="20" height="16" rx="3" class="key-lead"/><text x="52" y="715">主責</text><rect x="142" y="701" width="20" height="16" rx="3" class="key-co"/><text x="170" y="715">協作</text><polygon points="288,700 298,709 288,718 278,709" class="key-decision"/><text x="306" y="715">決策</text></g>` : '';
    return `<g class="map-footer"><path d="M18 ${footerRule} H1582" class="map-footer-rule"/>${principles}${responsibility}<text class="map-footer-track" x="24" y="${docY}">文件</text><text x="78" y="${docY}">目標、工作票、驗收與結果</text><text class="map-footer-track" x="810" y="${docY}">版本管理</text>${versionSummary}</g>`;
  }

  function renderMotherMap(options = {}) {
    const {
      spotlightZones = [], roles = [], stage = '', states = [], agent = true,
      revealFoundations = false, page = 'map', ticketPosition = '', ticketPrevious = '',
      delta = null, actualReturn = '', delegateDevWork = false, focusRole = '',
      newAgent = false, capability = '', roleLegend = false, showReturnPaths = false,
      processOnly = false, briefVersion = false, workloadCount = '',
    } = options;
    const uid = String(page).replace(/[^A-Za-z0-9_-]/g, '');
    const focusedRoles = new Set(roles.map(role => role === 'Human' ? 'Owner' : role));
    const focusedZones = new Set(spotlightZones);
    const stageKey = stage === 'brainstorming' || stage === 'refinement' ? 'backlog'
      : stage === 'release_done' ? 'done' : stage === 'human_gate' ? 'human_gate'
        : stage.replaceAll('_', '-');
    const reveal = order => revealFoundations ? ` fragment" data-fragment-order="${order}` : '';
    const dimZone = zone => focusedZones.size && !focusedZones.has(zone) ? ' is-dim' : '';
    const stageFill = key => key === stageKey ? ' is-focus' : '';
    const returnFocus = { review: ['Reviewer', 'review'], qa: ['QA', 'qa'], goal: ['PO', 'product-check'], gate: ['Owner', 'human_gate'] }[actualReturn] || [];
    const defaultFocusRole = ({ backlog: 'PO', ready: 'PO', dev: delegateDevWork ? 'Agent' : 'Dev', review: 'Reviewer', qa: 'QA', 'product-check': 'PO', human_gate: 'Owner', done: 'Owner' })[stageKey] || '';
    const focusedCardRole = focusRole || ((delegateDevWork || capability === 'assist') ? 'Agent' : returnFocus[0]) || defaultFocusRole;
    const focusedCardState = returnFocus[1] || ((delegateDevWork || capability === 'assist') ? (capability === 'assist' ? 'review' : 'dev') : stageKey);
    const focusedHandoff = !actualReturn ? PROCESS_HANDOFFS.find(item => item.from === stageKey) : null;
    const boardStages = SWIMLANE_LAYOUT.stages.filter(column => !column.outside);
    const stageHeaders = boardStages.map(column => {
      const center = column.x + column.width / 2;
      const classes = `swimlane-stage${stageFill(column.key)}`;
      const pillX = column.x + 8;
      const header = `${svgRect(column.x + 4, 50, column.width - 8, 53, '#172325', '#3c5550', 4, 'swimlane-stage-box')}<rect class="swimlane-step-pill" x="${pillX}" y="57" width="30" height="20" rx="10"/><text class="swimlane-step-number" x="${pillX + 15}" y="72" text-anchor="middle">${column.number}</text><text x="${center + 10}" y="73" class="swimlane-stage-label" text-anchor="middle">${esc(PROCESS_STEPS.find(item => item.key === column.key)?.label || column.subLabel)}</text>`;
      return `<g class="${classes}" data-state="${column.key}">${header}</g>`;
    }).join('');
    const gateHeader = `<g class="swimlane-outside-gate${stageKey === 'human_gate' ? ' is-focus' : ''}" data-state="human_gate"><polygon class="swimlane-gate" points="1175,24 1186,35 1175,46 1164,35"/><text x="1194" y="41" class="swimlane-stage-label swimlane-gate-label" text-anchor="start">人類授權</text></g>`;
    const handoffs = PROCESS_HANDOFFS.map((item, index) => handoffLabelMarkup(item, index, focusedHandoff === item, uid)).join('');

    const activities = `<g class="swimlane-activity"><rect x="190" y="15" width="290" height="30" rx="4"/><text x="335" y="36" text-anchor="middle">整理問題／拆分工作（活動）</text></g>`;
    const workload = workloadCount ? `<g class="swimlane-workload"><rect x="505" y="15" width="365" height="30" rx="4"/><text x="687" y="36" text-anchor="middle">進行中 ${esc(workloadCount)} 張（目前／上限）</text></g>` : '';
    const roleGuides = SWIMLANE_LAYOUT.roles.map(({ name, label, y }) => {
      if (name === 'Agent' && !agent) return '';
      const isNew = name === 'Agent' && newAgent;
      const displayLabel = isNew ? 'Agent' : label;
      const roleDim = newAgent ? name !== 'Agent' : !!roles.length && !focusedRoles.has(name) && !(name === 'Agent' && focusedZones.has('agent'));
      const addedBand = isNew ? `<rect class="swimlane-agent-added-band" x="170" y="${y - 22}" width="1380" height="48" rx="4"/>` : '';
      const rowBottom = name === 'Agent' ? 528 : y + 25;
      return `<g class="swimlane-lane lane-${name.replace(/[^A-Za-z0-9]/g, '').toLowerCase()}${roleDim ? ' is-dim' : ''}${isNew ? ' is-new' : ''}" data-role="${esc(name)}">${addedBand}<path class="swimlane-row-line" d="M170 ${rowBottom} H1550"/><text class="swimlane-role-label" x="18" y="${y + 6}">${esc(displayLabel)}</text></g>`;
    }).join('');

    const roleContent = processOnly ? '' : SWIMLANE_LAYOUT.roles.map(({ name, y }) => {
      if (name === 'Agent' && !agent) return '';
      if (name === 'Agent' && (newAgent || capability === 'human')) return '';
      const tasks = name === 'Agent' && capability === 'assist'
        ? {
          review: { title: '協助審查', co: true },
          qa: { title: '整理測試', co: true },
        }
        : { ...(SWIMLANE_ROLE_TASKS[name] || {}) };
      if (delegateDevWork && name === 'Dev') tasks.dev = { title: '交辦工作' };
      if (delegateDevWork && name === 'Agent') tasks.dev = { title: '修改規則', co: true };
      return Object.entries(tasks).map(([key, item]) => {
        const x = SWIMLANE_X[key];
        if (!x || !item.title) return '';
        const isAssistEndpoint = capability === 'assist' && (
          (name === 'Reviewer' && key === 'review') || (name === 'Agent' && key === 'review')
        );
        const isReturnEndpoint = actualReturn === 'review'
          ? (name === 'Reviewer' && key === 'review') || (name === 'Dev' && key === 'review')
          : actualReturn === 'qa'
            ? (name === 'QA' && key === 'qa') || (name === 'Dev' && key === 'dev')
            : actualReturn === 'goal'
              ? (name === 'PO' && key === 'product-check') || (name === 'PO' && key === 'backlog')
              : false;
        const focused = (name === focusedCardRole && key === focusedCardState) || isReturnEndpoint || isAssistEndpoint;
        const context = (newAgent && name !== 'Agent') || (Boolean(focusedCardRole && focusedCardState) && !focused);
        return workCardMarkup({ x, y, role: name, ...item }, { focused, context, state: key });
      }).join('');
    }).join('');

    const delegateLink = delegateDevWork ? `<g class="swimlane-agent-handoff" aria-label="開發者交辦給 Agent"><path d="M${SWIMLANE_X.dev} 380 V492" marker-end="url(#swimlane-arrow-agent-${uid})"/></g>` : '';
    const assistLinks = capability === 'assist' ? `<g class="swimlane-agent-handoff assist-review" aria-label="Agent 協助審查、審查者核對"><path d="M${SWIMLANE_X.review} 428 V494" marker-end="url(#swimlane-arrow-agent-${uid})"/></g><g class="swimlane-agent-handoff assist-qa" aria-label="Agent 整理測試、品質驗證者核對"><path d="M${SWIMLANE_X.qa} 478 V494" marker-end="url(#swimlane-arrow-agent-${uid})"/></g>` : '';

    const capabilityRoles = {
      delegate: [],
      assist: [
        { role: 'UI/UX', label: '視情況協助・本課不示範', kind: 'assist' },
      ],
      human: [
        { role: 'Owner', label: '由人決定', kind: 'human' },
        { role: 'PM', label: '由人決定', kind: 'human' },
        { role: 'PO', label: '由人決定', kind: 'human' },
      ],
    }[capability] || [];
    const capabilityBadges = capabilityRoles.map(({ role, label, kind }) => {
      const y = SWIMLANE_Y[role];
      const x = kind === 'human' ? 1380 : 1200;
      const width = kind === 'human' ? 156 : 336;
      return `<g class="swimlane-capability-badge is-${kind}" data-role="${esc(role)}"><rect x="${x}" y="${y - 18}" width="${width}" height="36" rx="6"/><text x="${x + width / 2}" y="${y + 6}" text-anchor="middle">${esc(label)}</text></g>`;
    }).join('');

    const showOverviewReturns = showReturnPaths;
    const returnPath = (kind, points, label, x, y, width, focused = false) => {
      const active = focused ? ' is-active' : '';
      const text = label ? `<rect x="${x - width / 2}" y="${y - 12}" width="${width}" height="20" rx="4"/><text x="${x}" y="${y + 3}" text-anchor="middle">${esc(label)}</text>` : '';
      return `<g class="swimlane-return${active}" data-return="${kind}"><path d="${roundedOrthogonalPath(points)}" marker-end="url(#swimlane-arrow-return-${uid})"/>${text}</g>`;
    };
    const showReturns = showOverviewReturns || actualReturn;
    const returnPaths = showReturns ? [
      ...((showOverviewReturns || actualReturn === 'goal') ? [returnPath('goal', [[1020, 244], [1020, 180], [336, 180], [336, 244]], '目標不符・回到釐清', 690, 162, 210, actualReturn === 'goal')] : []),
      ...((showOverviewReturns || actualReturn === 'review') ? [returnPath('review', [[710, 428], [710, 390], [560, 390], [560, 378]], '審查意見・回到開發', 875, 376, 190, actualReturn === 'review')] : []),
      ...((showOverviewReturns || actualReturn === 'qa') ? [returnPath('qa', [[860, 478], [860, 520], [560, 520], [560, 378]], '測試發現・回到開發', 710, 502, 200, actualReturn === 'qa')] : []),
      ...(actualReturn === 'gate' ? [returnPath('gate', [[1243, 161], [1260, 161], [1260, 237], [1088, 237]], '指定補做者', 1374, 258, 112, true)] : []),
    ].join('') : '';

    const docs = [
      { key: 'backlog', label: '產品目標', status: '尚未建立' },
      { key: 'ready', label: '工作票', status: '尚未備妥' },
      { key: 'dev', label: '工作紀錄', status: '尚未開始' },
      { key: 'review', label: '審查意見', status: '尚未送審' },
      { key: 'qa', label: '測試紀錄', status: '尚未驗證' },
      { key: 'product-check', label: '目標對照', status: '尚未核對' },
      { key: 'human_gate', label: '授權決定', status: '等待決定' },
      { key: 'done', label: '交付紀錄', status: '尚未完成' },
    ];
    const docStage = delta?.docStage || '';
    const docNodes = docs.map(({ key, label, status }) => {
      const x = SWIMLANE_X[key];
      const isChanged = key === docStage;
      const past = delta?.docStates?.[key];
      const currentLabel = isChanged ? (delta.docLabel || label) : (past?.label || label);
      const currentStatus = compactSwimlaneCardStatus(isChanged ? (delta.docStatus || status) : (past?.status || status));
      const stageClass = '';
      const width = key === 'human_gate' ? 150 : 136;
      const left = x - width / 2;
      const right = x + width / 2;
      return `<g class="swimlane-doc-node${isChanged ? ' is-changed' : ''}${stageClass}" data-state="${key}"><path class="swimlane-doc-card" d="M${left} 540 H${right - 14} L${right} 554 V592 H${left} Z"/><path class="swimlane-doc-fold" d="M${right - 14} 540 V554 H${right}"/><text class="swimlane-doc-name" x="${x}" y="562" text-anchor="middle">${esc(currentLabel)}</text><text class="swimlane-doc-status" x="${x}" y="585" text-anchor="middle">${esc(currentStatus)}</text></g>`;
    }).join('');
    const versions = [
      { key: 'dev', x: 460, label: 'Branch', status: '尚未開分支' },
      { key: 'review', x: 700, label: 'Commit', status: '尚無修改紀錄' },
      { key: 'qa', x: 940, label: 'PR', status: '尚未送審' },
      { key: 'human_gate', x: 1180, label: 'Merge', status: '尚未授權' },
    ];
    const versionStage = delta?.versionStage || '';
    const versionXs = versions.map(item => item.x);
    const versionLinks = briefVersion ? '' : versionXs.slice(0, -1).map((x, index) => `<path class="swimlane-version-link" d="M${x + 10} 624 H${versionXs[index + 1] - 12}" marker-end="url(#swimlane-arrow-${uid})"/>`).join('');
    const versionNodes = briefVersion
      ? `<g class="swimlane-version-summary"><rect x="620" y="603" width="580" height="42" rx="5"/><text x="910" y="630" text-anchor="middle">每次修改都留下紀錄（細節在開發站）</text></g>`
      : versions.map(({ key, label, status }) => {
      const x = versions.find(item => item.key === key)?.x || SWIMLANE_X[key];
      const isChanged = key === versionStage;
      const currentLabel = isChanged ? (delta.versionLabel || label) : label;
      const past = delta?.versionStates?.[key];
      const currentStatus = compactSwimlaneCardStatus(isChanged ? (delta.versionStatus || status) : (past?.status || status));
      const stageClass = '';
      return `<g class="swimlane-version-node${isChanged ? ' is-changed' : ''}${stageClass}" data-state="${key}"><circle class="swimlane-version-dot" cx="${x}" cy="624" r="9"/><text class="swimlane-version-name" x="${x}" y="654" text-anchor="middle">${esc(currentLabel)}</text><text class="swimlane-version-status" x="${x}" y="675" text-anchor="middle">${esc(currentStatus)}</text></g>`;
    }).join('');
    const principleMarkers = options.principles ? `<g class="principle-map-markers" aria-label="五項原則在工作位置上的標記">
      <g class="principle-map-point"><circle cx="155" cy="562" r="9"/><text x="155" y="567">1</text></g>
      <g class="principle-map-point"><circle cx="155" cy="511" r="9"/><text x="155" y="516">2</text></g>
      <g class="principle-map-point"><circle cx="155" cy="411" r="9"/><text x="155" y="416">3</text></g>
      <g class="principle-map-point"><circle cx="155" cy="461" r="9"/><text x="155" y="466">4</text></g>
      <g class="principle-map-point"><circle cx="155" cy="261" r="9"/><text x="155" y="266">5</text></g>
    </g>` : '';
    const footer = mapFooterMarkup(uid, page, { principles: options.principles, roleLegend, briefVersion });

    return `<div class="mother-map" data-mother-map-id="rev13-four-foundations" data-stage="${esc(stage)}" data-capability="${esc(capability)}" data-assist-focus="review"><svg class="swimlane-svg" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="swimlane-title-${uid} swimlane-desc-${uid}"><title id="swimlane-title-${uid}">人、流程、文件與版本管理的工作圖</title><desc id="swimlane-desc-${uid}">流程沿七個看板狀態前進；人依責任分工，下方記錄文件和版本管理。人類授權是欄外決定；三條虛線標出主要退回位置。</desc><defs><marker id="swimlane-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#8faaa1"/></marker><marker id="swimlane-arrow-return-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#85918a"/></marker><marker id="swimlane-arrow-agent-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#d78d78"/></marker></defs><g class="swimlane-process"><text class="swimlane-axis-label" x="18" y="82">流程</text>${activities}${workload}${stageHeaders}${gateHeader}${handoffs}</g><g class="swimlane-people${dimZone('people')}${reveal(1)}"><text class="swimlane-group-label" x="18" y="136">人</text>${roleGuides}${roleContent}${delegateLink}${assistLinks}${capabilityBadges}${returnPaths}</g><g class="swimlane-documents${dimZone('documents')}${reveal(2)}"><path class="swimlane-section-rule" d="M170 538 H1550"/><text class="swimlane-group-label" x="18" y="562">文件</text>${docNodes}</g><g class="swimlane-version${dimZone('version')}${reveal(3)}"><path class="swimlane-section-rule is-heavy" d="M170 600 H1550"/><text class="swimlane-group-label" x="18" y="632">版本管理</text>${versionLinks}${versionNodes}</g>${principleMarkers}${footer}</svg></div>`;
  }

  function renderOpeningMap(slide) {
    const step = Number(slide.dataset.openingStep || 1);
    const uid = `opening-${slide.dataset.page}`;
    const showProcess = step >= 2;
    const showPeople = step >= 3;
    const showDocuments = step >= 4;
    const showVersions = step >= 5 && slide.dataset.versionDetails !== 'false';
    const showCard = step >= 6;
    const showReturns = step >= 7;
    const currentStage = ({ 2: 'backlog', 3: 'backlog', 4: 'backlog', 5: 'dev', 6: 'dev', 7: 'qa' })[step];
    const focusRole = slide.dataset.focusRoleCard || (step === 7 ? 'QA' : 'Dev');
    const focusReturn = slide.dataset.focusReturn || '';
    const dim = zone => {
      if (step === 2 && zone !== 'process') return ' is-dim';
      if (step === 3 && zone !== 'people' && zone !== 'process') return ' is-dim';
      if (step === 4 && zone !== 'documents') return ' is-dim';
      if (step === 5 && zone !== 'version') return ' is-dim';
      return '';
    };
    const roleRows = SWIMLANE_LAYOUT.roles
      .filter(({ name }) => step >= 3 && name !== 'Agent')
      .map(({ name, y }) => {
        const roleLabel = { Owner: '授權人', PM: '專案經理', PO: '產品負責人', 'UI/UX': '介面設計', Dev: '開發者', Reviewer: '程式審查', QA: '品質驗證' }[name];
        return `<g class="opening-role" data-role="${esc(name)}"><path d="M170 ${y + 25} H1550"/><text class="opening-role-name" x="190" y="${y + 6}">${esc(roleLabel)}</text></g>`;
      }).join('');
    const processStages = SWIMLANE_LAYOUT.stages.filter(item => !item.outside);
    const stageHeaders = showProcess ? processStages.map(column => {
      const center = column.x + column.width / 2;
      const active = column.key === currentStage ? ' is-current' : '';
      const pillX = column.x + 8;
      const arrow = `${svgRect(column.x + 4, 53, column.width - 8, 49, '#172325', '#3c5550', 4, 'opening-stage-box')}<rect class="opening-step-pill${active}" x="${pillX}" y="58" width="30" height="20" rx="10"/><text class="opening-step-number" x="${pillX + 15}" y="73" text-anchor="middle">${column.number}</text><text class="opening-stage-name" x="${center + 8}" y="83" text-anchor="middle">${esc(PROCESS_STEPS.find(item => item.key === column.key)?.label || column.subLabel)}</text>`;
      return `<g class="opening-stage" data-state="${column.key}">${arrow}</g>`;
    }).join('') : '';
    const openingHandoffs = showProcess ? PROCESS_HANDOFFS.map(({ from, to, label }) => {
      const start = SWIMLANE_X[from], end = SWIMLANE_X[to];
      const mid = (start + end) / 2;
      const width = Math.max(54, label.length * 15 + 16);
      const active = !focusReturn && from === currentStage ? ' is-active' : '';
      return `<g class="opening-handoff${active}" data-handoff="${from}-${to}"><path d="M${start + 5} 110 H${end - 5}" marker-end="url(#opening-arrow-${uid})"/><rect x="${mid - width / 2}" y="117" width="${width}" height="18" rx="4"/><text x="${mid}" y="131" text-anchor="middle">${esc(label)}</text></g>`;
    }).join('') : '';
    const activity = showProcess ? `<g class="opening-activity"><rect x="190" y="15" width="430" height="30" rx="4"/><text x="405" y="36" text-anchor="middle">整理問題（Brainstorming）／拆分工作（Refinement）</text></g>` : '';
    const outsideGate = showProcess ? `<g class="opening-gate${currentStage === 'human_gate' ? ' is-current' : ''}"><polygon points="1175,24 1186,35 1175,46 1164,35"/><text x="1194" y="41">人類授權</text></g>` : '';
    const docs = [
      { x: SWIMLANE_X.backlog, label: '產品目標', purpose: '待建立' },
      { x: SWIMLANE_X.dev, label: '工作票＋驗收', purpose: '待交接' },
      { x: SWIMLANE_X.qa, label: '測試紀錄', purpose: '待驗證' },
      { x: SWIMLANE_X.done, label: '交付紀錄', purpose: '待決定' },
    ];
    const docNodes = showDocuments ? docs.map(({ x, label, purpose }) => {
      const width = 148, left = x - width / 2, right = x + width / 2;
      return `<g class="opening-doc"><path d="M${left} 540 H${right - 13} L${right} 553 V587 H${left} Z"/><path d="M${right - 13} 540 V553 H${right}"/><text x="${x}" y="560" text-anchor="middle">${esc(label)}</text><text class="opening-doc-purpose" x="${x}" y="580" text-anchor="middle">${esc(purpose)}</text></g>`;
    }).join('') : '';
    const versionData = [
      { x: SWIMLANE_X.dev, label: '分支', purpose: '隔離修改' },
      { x: SWIMLANE_X.review, label: '提交', purpose: '記錄變更' },
      { x: SWIMLANE_X.qa, label: 'PR', purpose: '待審查' },
      { x: SWIMLANE_X.done, label: '合併', purpose: '需授權' },
    ];
    const versionLinks = showVersions ? versionData.slice(0, -1).map((node, index) => `<path class="opening-version-link" d="M${node.x + 10} 625 H${versionData[index + 1].x - 12}" marker-end="url(#opening-arrow-version-${uid})"/>`).join('') : '';
    const versions = showVersions ? versionData.map(({ x, label, purpose }) => `<g class="opening-version-node"><circle cx="${x}" cy="625" r="10"/><text class="opening-version-name" x="${x}" y="654" text-anchor="middle">${esc(label)}</text><text class="opening-version-purpose" x="${x}" y="678" text-anchor="middle">${esc(purpose)}</text></g>`).join('') : '';
    const cardItems = showReturns ? [
      { role: 'PO', state: 'backlog', title: '拆分工作' },
      { role: 'Dev', state: 'dev', title: '修改規則' },
      { role: 'Dev', state: 'review', title: '依意見修' },
      { role: 'Reviewer', state: 'review', title: '檢查改動' },
      { role: 'QA', state: 'qa', title: '核對結果' },
      { role: 'PO', state: 'product-check', title: '對照目標' },
    ] : (showCard ? [{ role: 'Dev', state: 'dev', title: '修改規則' }] : []);
    const card = cardItems.map(item => {
      const isReturnEndpoint = step === 7 && (
        (focusReturn === 'qa' && ((item.role === 'QA' && item.state === 'qa') || (item.role === 'Dev' && item.state === 'dev')))
        || (focusReturn === 'review' && ((item.role === 'Reviewer' && item.state === 'review') || (item.role === 'Dev' && item.state === 'review')))
        || (focusReturn === 'goal' && (item.role === 'PO' && ['product-check', 'backlog'].includes(item.state)))
      );
      const focused = isReturnEndpoint || (item.role === focusRole && item.state === currentStage);
      return workCardMarkup({ x: SWIMLANE_X[item.state], y: SWIMLANE_Y[item.role], role: item.role, ...item }, {
        focused, context: step === 7 && !focused, state: item.state,
      });
    }).join('');
    const workLinks = step === 7 ? `<g class="opening-work-link"><path d="M${SWIMLANE_X.dev} 385 V536" marker-end="url(#opening-arrow-${uid})"/><path d="M${SWIMLANE_X.dev} 587 V615" marker-end="url(#opening-arrow-version-${uid})"/></g>` : '';
    const returnPath = (kind, points, label, x, y, width, order) => {
      const active = focusReturn === kind ? ' is-active' : '';
      const fragment = kind === focusReturn ? '' : ' fragment';
      const orderAttribute = fragment ? ` data-fragment-order="${order}"` : '';
      return `<g class="opening-return${fragment}${active}"${orderAttribute} data-return="${kind}"><path d="${roundedOrthogonalPath(points)}" marker-end="url(#opening-return-arrow-${uid})"/><rect x="${x - width / 2}" y="${y - 12}" width="${width}" height="20" rx="4"/><text x="${x}" y="${y + 3}" text-anchor="middle">${esc(label)}</text></g>`;
    };
    const returns = showReturns ? `<g class="opening-return-routes">
      ${returnPath('qa', [[860, 478], [860, 486], [560, 486], [560, 378]], '測試退回', 700, 516, 104, 1)}
      ${returnPath('review', [[710, 428], [710, 378]], '審查退回', 900, 402, 104, 2)}
      ${returnPath('goal', [[1020, 244], [1020, 179], [336, 179], [336, 261], [328, 261]], '目標不符', 650, 154, 104, 3)}
    </g>` : '';
    const railLabels = showProcess ? `<text class="opening-track-label opening-doc-label" x="18" y="563">文件</text><text class="opening-track-label opening-version-label" x="18" y="652">版本管理</text>` : '';
    const skeletonPrompts = step === 1
      ? `<g class="opening-skeleton-prompts" aria-label="四個工作區域與問題">
          <text class="opening-prompt-name opening-prompt-process" x="198" y="76">流程</text><text class="opening-prompt-question opening-prompt-process" x="198" y="111">做到哪？</text>
          <text class="opening-prompt-name opening-prompt-people" x="198" y="232">人</text><text class="opening-prompt-question opening-prompt-people" x="198" y="267">誰做？</text>
          <text class="opening-prompt-name opening-prompt-documents" x="198" y="388">文件</text><text class="opening-prompt-question opening-prompt-documents" x="198" y="423">根據什麼、怎麼驗？</text>
          <text class="opening-prompt-name opening-prompt-version" x="198" y="544">版本管理</text><text class="opening-prompt-question opening-prompt-version" x="198" y="579">改的是哪一版？</text>
        </g>`
      : `<g class="opening-skeleton-prompts" aria-label="四個工作區域">
          <text class="opening-prompt-name opening-prompt-process" x="18" y="82">流程</text>
          <text class="opening-prompt-name opening-prompt-people" x="18" y="180">人</text>
          <text class="opening-prompt-name opening-prompt-documents" x="18" y="563">文件</text>
          <text class="opening-prompt-name opening-prompt-version" x="18" y="652">版本管理</text>
        </g>`;
    const personLane = `<g class="opening-map-zone opening-people${dim('people')}">${roleRows}${card}${workLinks}${returns}</g>`;
    const processLane = `<g class="opening-map-zone opening-process${dim('process')}">${activity}${stageHeaders}${openingHandoffs}${outsideGate}</g>`;
    const documentsLane = `<g class="opening-map-zone opening-documents${dim('documents')}">${docNodes}</g>`;
    const versionLane = `<g class="opening-map-zone opening-version${dim('version')}">${versionLinks}${versions}</g>`;
    const footer = showProcess ? mapFooterMarkup(uid, slide.dataset.page, { briefVersion: true }) : '';
    const panels = step === 1
      ? `<rect class="opening-panel opening-panel-process" x="170" y="18" width="1380" height="148" rx="5"/><rect class="opening-panel opening-panel-people" x="170" y="174" width="1380" height="148" rx="5"/><rect class="opening-panel opening-panel-documents" x="170" y="330" width="1380" height="148" rx="5"/><rect class="opening-panel opening-panel-version" x="170" y="486" width="1380" height="148" rx="5"/>`
      : `<rect class="opening-panel opening-panel-process" x="170" y="15" width="1380" height="120" rx="5"/><rect class="opening-panel opening-panel-people" x="170" y="137" width="1380" height="401" rx="5"/><rect class="opening-panel opening-panel-documents" x="170" y="538" width="1380" height="77" rx="3"/><rect class="opening-panel opening-panel-version" x="170" y="625" width="1380" height="67" rx="3"/>`;
    return `<div class="full-map-wrap opening-map"><svg class="swimlane-svg" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">同一張工作圖逐步補上角色與紀錄</title><desc id="${uid}-desc">流程、人員、文件和版本管理依序加入。折線標明從哪張工作卡退回、要回到哪張工作卡。</desc><defs><marker id="opening-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#8ba69c"/></marker><marker id="opening-return-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#e6aa8f"/></marker><marker id="opening-arrow-version-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#92a9d4"/></marker></defs>${panels}${processLane}${personLane}${documentsLane}${versionLane}${railLabels}${skeletonPrompts}${footer}</svg></div>`;
  }

  function locator(slide) {
    const stage = slide.dataset.focusStage || '';
    const roleNames = (slide.dataset.focusRolesMap || slide.dataset.focusRoles || '').split(',').map(role => role.trim()).filter(Boolean).map(role => role === 'Human' ? 'Owner' : role);
    const roleLabel = {
      Human: '人', Owner: '授權人', PM: '專案經理', PO: '產品負責人',
      'UI/UX': '介面設計', Dev: '開發者', Reviewer: '程式審查', QA: '品質驗證', Agent: 'Agent',
    };
    const shortRoles = roleNames.map(role => roleLabel[role] || role);
    const roleSummary = shortRoles.length > 4 ? `${shortRoles.slice(0, 3).join(' · ')}等` : (shortRoles.length ? shortRoles.join(' · ') : '所有角色');
    const selected = new Set(STAGE_KANBAN[stage] || []);
    const markers = new Set((slide.dataset.stateMarkers || '').split(',').filter(Boolean));
    const stateMarkup = item => {
      const active = selected.has(item.key) || markers.has(item.key) || (stage === 'release_done' && item.key === 'done');
      const previous = slide.dataset.ticketPrevious === item.key;
      const currentTicket = slide.dataset.ticketPosition === item.key;
      return `<span class="locator-state${active ? ' is-current' : ''}${previous ? ' is-ghost' : ''}${currentTicket ? ' has-ticket' : ''}" data-state="${item.key}"${active ? ' aria-current="step"' : ''}>${esc(LOCATOR_LABELS[item.key] || item.label)}</span>`;
    };
    const stageStates = KANBAN.map((item, index) => `${index === 6 ? `<span class="locator-gate${stage === 'human_gate' ? ' is-current' : ''}" data-state="human_gate"><i aria-hidden="true"></i><b>授權決定</b></span>` : ''}${stateMarkup(item)}`).join('');
    return `<aside class="map-locator" aria-label="流程進度" data-mother-map-id="rev13-four-foundations"><span class="locator-heading">流程</span><div class="locator-board" role="list" aria-label="七個工作狀態與欄外授權決定">${stageStates}</div><span class="locator-focus"><b>負責角色</b><span>${esc(roleSummary)}</span><i class="locator-focus-band" aria-hidden="true"></i></span></aside>`;
  }

  function renderKanbanDiagram(slide) {
    return `<div class="full-map-wrap">${renderMotherMap({ stage: slide.dataset.focusStage || 'refinement', roles: (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean), page: slide.dataset.page, agent: slide.dataset.agent !== 'false' })}</div>`;
  }

  function renderStageAnatomy(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field anatomy-field">
        <div class="goal-target">
          <article class="fragment" data-fragment-order="1"><span>產品目標｜配對 App 想達到什麼？</span><strong>互相按讚後，在配對清單找到對方。</strong></article>
          <span class="goal-target-separator fragment" data-fragment-order="2" aria-hidden="true">≠</span>
          <article class="fragment" data-fragment-order="2"><span>本站任務｜現在要完成什麼？</span><strong>釐清單向按讚會不會建立配對。</strong></article>
        </div>
        <div class="contract-flow">
          <article class="contract-node fragment" data-fragment-order="3"><span>已知條件</span><strong>小安按讚，小晴尚未按。</strong></article>
          <span class="diagram-arrow fragment" data-fragment-order="4" aria-hidden="true">→</span>
          <article class="contract-node active fragment" data-fragment-order="4"><span>要做的事</span><strong>比較單向、互按與重複按讚。</strong><div class="app-like-mock" aria-label="配對 App 按讚畫面示意"><span>小晴</span><b>♡ 按讚</b><em>尚未配對</em></div></article>
          <span class="diagram-arrow fragment" data-fragment-order="5" aria-hidden="true">→</span>
          <article class="contract-node fragment" data-fragment-order="5"><span>留下的紀錄</span><strong>工作票、驗收條件與檢查方法。</strong></article>
        </div>
        <div class="anatomy-bottom">
          <article class="exit-node fragment" data-fragment-order="6"><span>交接條件</span><strong>工作和檢查方法寫清，接手者能開始處理。</strong></article>
          <article class="people-github-node fragment" data-fragment-order="7"><span>負責角色與紀錄位置</span><strong>產品負責人整理工作票；有程式修改時再連到版本與送審紀錄。</strong></article>
        </div>
      </div>
    </div>`;
  }

  const COURSE_PARTS = [
    { title: '軟體工程的四要素', summary: '人、流程、文件和版本管理，如何一起讓工作走到交付？' },
    { title: '加入 Agent：五要素', summary: '同一張票交給 Agent 後，哪些工作能交給它？' },
    { title: 'Agent 進階用法', summary: '什麼時候一人合作，什麼時候拆開工作？' },
    { title: '五項協作原則', summary: '怎麼交代工作、分工、核對結果並回看目標？' },
  ];

  function courseOutlineProgress(active) {
    return `<ol class="course-outline-progress" aria-label="課程四段進度">${COURSE_PARTS.map((part, index) => `<li class="${index + 1 === active ? 'is-current' : ''}"${index + 1 === active ? ' aria-current="step"' : ''}><b>${index + 1}</b><span>${esc(part.title)}</span></li>`).join('')}</ol>`;
  }

  function renderCourseOutline() {
    const cards = COURSE_PARTS.map((part, index) => {
      return `<article class="course-outline-card course-outline-part-${index + 1}${index === 0 ? ' is-current' : ''}"><header><b>${index + 1}</b><strong>${esc(part.title)}</strong></header><p>${esc(part.summary)}</p></article>`;
    }).join('');
    return `<div class="course-outline-field"><div class="course-outline-grid">${cards}</div></div>`;
  }

  function renderGoodTicket(slide) {
    const active = Number(slide.dataset.ticketStep || 1);
    const card = (key, step, heading, contents) => active < step ? '' : `<section class="good-ticket-part${active === step ? ' is-active' : ' is-context'}" data-ticket-key="${key}"><header>${heading}</header>${contents}</section>`;
    const content = [
      card('goal', 1, '工作目標', '<div class="ticket-goal-copy"><p><b>目標：</b>讓互相按讚的兩個人配成一對。</p><p class="ticket-parent-goal"><b>產品目標：</b>讓使用者在配對清單找到對方；還需要按讚、配對清單另外兩張票。</p></div>'),
      card('scope', 2, '工作範圍與排除', '<p><b>要做：</b>互相按讚才建立配對紀錄。<b>不做：</b>介面、聊天、登入與功能上線。</p>'),
      card('criteria', 3, '驗收條件與檢查方法', '<div class="ticket-pair"><article><b>AC 驗收條件</b><p>1．單向按讚不配對。</p><p>2．互相按讚建立 1 筆配對。</p><p>3．重複按讚仍只有 1 筆。</p></article><article><b>AT 檢查方法</b><p>1．單向按讚，查 0 筆。</p><p>2．互相按讚，查 1 筆。</p><p>3．從 1 筆開始重複按讚，仍查 1 筆。</p></article></div>'),
      card('dod', 4, '全部滿足才算完成', '<p>驗收條件全通過，審查與檢查紀錄齊全；人授權並完成合併後，這張票才算完成。功能上線另行決定。</p>'),
      card('owner', 5, '負責人與目前進度', '<p><b>主責：</b>產品負責人　<b>目前：</b>拆分工作中（待整理）</p>'),
    ].join('');
    return `<div class="good-ticket-wrap"><article class="good-ticket-card" aria-label="配對規則工作票示意"><header class="good-ticket-heading"><strong>配對規則</strong><span>工作票・教學示意</span></header><div class="good-ticket-grid" style="--ticket-step:${active}">${content}</div></article></div>`;
  }

  function renderRolesOverview(slide) {
    const cards = ROLE_DATA.map((role, index) => `
      <article class="role-card role-card-${index + 1}" data-role="${esc(role.name)}">
        <span class="role-orbit" aria-hidden="true"></span>
        <strong>${esc(role.display)}</strong><p><span>${esc(RESPONSIBILITY[role.name])}</span><span>${esc(role.example)}</span></p>
      </article>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field roles-field">
        <div class="role-constellation">
          ${cards}
        </div>
        <div class="role-distinction"><b>一個人可以兼任多種職責</b><span>做的人不替自己驗收；合併由授權人決定。</span></div>
      </div>
    </div>`;
  }

  function renderRolesStages(slide) {
    return `<div class="full-map-wrap">${renderMotherMap({
      spotlightZones: (slide.dataset.focusZones || '').split(',').filter(Boolean),
      stage: slide.dataset.focusStage || 'refinement',
      roles: (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean),
      page: slide.dataset.page,
      agent: slide.dataset.agent !== 'false',
      roleLegend: true,
      briefVersion: slide.dataset.briefVersion === 'true',
    })}</div>`;
  }

  function renderDocumentTypes(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field doc-type-field">
        <div class="doc-tree-root"><span>配對 App 的產品目標</span><strong>互相按讚後，在配對清單找到對方。</strong></div>
        <div class="tree-trunk" aria-hidden="true"></div>
        <section class="ticket-cluster" aria-label="一個產品目標拆成三張配對 App 工作票">
          <header><strong>產品目標 → 三張工作票</strong></header>
          <div class="ticket-tree">
            <article class="ticket-node feature-ticket"><strong>按讚</strong><div class="mini-app-screen"><b>小晴</b><span>♡ Like</span></div></article>
            <article class="ticket-node feature-ticket"><strong>配對規則</strong><div class="mini-app-screen"><b>兩人互按</b><span>建立配對紀錄</span></div></article>
            <article class="ticket-node feature-ticket"><strong>配對清單</strong><div class="mini-app-screen"><b>我的配對</b><span>小晴　●</span></div></article>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderDocumentLifecycle(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field lifecycle-field">
        <div class="lifecycle-heading"><strong>同一張示意 Issue，沿流程逐步補記</strong><span>原工作契約持續保留</span></div>
        <div class="lifecycle-contract"><b>Issue：</b>Parent Goal · Scope · AC／AT · 依賴</div>
        <div class="lifecycle-flow" aria-label="需求拆票、交付、Review、Evidence 與放行記錄的六步生命週期">
          <article class="lifecycle-step" data-step="1"><span>Backlog · 需求／拆票</span><strong>把工作變成可交辦契約</strong><small>Parent Goal、Scope、AC／AT</small></article>
          <article class="lifecycle-step" data-step="2"><span>Ready · 交接條件</span><strong>確認責任與可驗證性</strong><small>接手者、依賴、Exit 條件</small></article>
          <article class="lifecycle-step" data-step="3"><span>Dev · 交付版本</span><strong>連結程式修改</strong><small>Branch、Commit、PR 差異</small></article>
          <article class="lifecycle-step" data-step="4"><span>Review · 審查更新</span><strong>保留發現與處置</strong><small>PR 審查發現；未處置項回到 Dev</small></article>
          <article class="lifecycle-step" data-step="5"><span>QA／Product Check · Evidence</span><strong>把結果對回 AC 與版本</strong><small>結果連到Commit；未測項：未測</small></article>
          <article class="lifecycle-step" data-step="6"><span>Human Gate · 放行記錄</span><strong>留下授權或不授權的決定與理由</strong><small>只在授權後進入後續 Merge／上線</small></article>
        </div>
        <div class="lifecycle-note"><b>示意流程</b><span>Review、測試、Evidence 與放行只在實際發生時補記；本圖不代表 Matching 文件已建立。</span></div>
      </div>
    </div>`;
  }

  function renderCriteria(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field criteria-field criteria-example-field">
        <header class="criteria-example-title"><strong>配對 App：小安單向按讚小晴</strong></header>
        <div class="criteria-step-grid">
          <section class="criteria-step fragment" data-fragment-order="1">
            <h2>先定目標</h2>
            <article><b>Goal · 產品目標</b><p>互相按讚後，能在配對清單找到對方。</p></article>
            <article><b>Stage Target · 本站工作</b><p>確認單向按讚不會建立配對。</p></article>
          </section>
          <section class="criteria-step fragment" data-fragment-order="2">
            <h2>再寫條件與檢查</h2>
            <article><b>Acceptance Criteria（AC）</b><p>只一方按 Like 時，不建立配對。</p></article>
            <article><b>Acceptance Test（AT）</b><p>重設資料，單向按 Like，再查配對紀錄；預期 0 筆。</p></article>
          </section>
          <section class="criteria-step fragment" data-fragment-order="3">
            <h2>最後交接與留證</h2>
            <article><b>Definition of Done（DoD）</b><p>AC／AT 全符合並留獨立核對紀錄；合併需人授權，交付後才標 Done。功能上線另判。</p></article>
            <article><b>Exit · 交接條件</b><p>交出結果和仍未測項。</p></article>
            <article><b>Evidence · 實際紀錄</b><p>版本、輸入、預期、實際與結果。</p></article>
          </section>
        </div>
      </div>
    </div>`;
  }

  function renderGitGithub(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field git-github-field">
        <div class="git-purpose-pair"><article><b>Git</b><span>記錄程式的每次修改</span></article><article><b>GitHub</b><span>讓團隊共用工作票並互相檢查</span></article></div>
        <div class="git-ticket-connection"><span>配對規則工作票 #3</span><i aria-hidden="true">↔</i><span>同一份程式修改</span></div>
        <div class="git-sequence" aria-label="Branch、Commit、PR、Merge 的順序">
          <article><small>Git</small><b>Branch</b><span>為配對規則開獨立分支</span></article><i aria-hidden="true">→</i>
          <article><small>Git</small><b>Commit</b><span>記下程式修改</span></article><i aria-hidden="true">→</i>
          <article><small>GitHub</small><b>PR</b><span>連到工作票並請人審查</span></article><i aria-hidden="true">→</i>
          <article><small>GitHub</small><b>Merge</b><span>取得授權後才合併</span></article>
        </div>
      </div>
    </div>`;
  }

  function renderVersionHistory(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field version-history-field">
        <svg class="git-history" viewBox="0 0 1000 450" role="img" aria-label="Branch、Commit、PR、Merge 與回復路徑的版本關係">
          <defs>
            <marker id="arrow-version" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker>
            <marker id="arrow-rollback" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker>
          </defs>
          <path class="git-track main-track" d="M76 290 H930" />
          <path class="git-track branch-track" d="M250 290 C320 290 330 150 420 150 H650 C710 150 710 290 735 290" />
          <path class="git-track review-track" d="M650 150 C690 170 718 225 730 278" marker-end="url(#arrow-version)" />
          <path class="git-track rollback-track" d="M748 301 H780 C796 365 833 365 855 304" marker-end="url(#arrow-rollback)" />
          <circle class="git-dot" cx="110" cy="290" r="13" /><circle class="git-dot" cx="250" cy="290" r="13" />
          <circle class="git-dot branch-dot" cx="420" cy="150" r="13" /><circle class="git-dot branch-dot" cx="540" cy="150" r="13" />
          <circle class="git-dot pr-dot" cx="650" cy="150" r="15" /><circle class="git-dot merge-dot" cx="735" cy="290" r="15" />
          <circle class="git-dot recovery-dot" cx="870" cy="290" r="13" />
          <text x="110" y="335" text-anchor="middle">既有版本</text><text x="250" y="335" text-anchor="middle">Branch</text>
          <text x="420" y="111" text-anchor="middle">Commit</text><text x="540" y="111" text-anchor="middle">更多修改</text>
          <text x="650" y="78" text-anchor="middle">PR／Review</text><text x="735" y="335" text-anchor="middle">Merge</text>
          <text class="recovery-node-label" x="870" y="255" text-anchor="middle">回復紀錄</text>
          <text class="recovery-trigger-label" x="810" y="393" text-anchor="middle">合併後發現問題</text>
          <text class="recovery-label" x="810" y="428" text-anchor="middle">新增回復紀錄，保留既有版本歷史</text>
        </svg>
        <div class="history-legend"><span><i class="legend-main"></i>既有版本</span><span><i class="legend-branch"></i>Branch</span><span><i class="legend-pr"></i>PR／Review</span><span><i class="legend-recovery"></i>回復路徑</span></div>
      </div>
    </div>`;
  }

  function renderAgentPrimer(slide) {
    const terms = [
      { title: 'Chat', text: '一般聊天：回答問題' },
      { title: 'Session', text: '一次對話的工作脈絡' },
      { title: 'Agent', text: '接工作票並使用工具實作的 AI 助手' },
      { title: 'Workflow', text: '按步驟完成工作的流程' },
    ];
    const termCards = terms.map(term => `<article class="agent-term"><strong>${term.title}</strong><span>${term.text}</span></article>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field agent-primer-field">
        <div class="agent-terms fragment" data-fragment-order="1" aria-label="四個不同概念">${termCards}</div>
        <div class="agent-work-path fragment" data-fragment-order="2">
          <article><span>人類交辦</span><strong>工作票、範圍與停止條件</strong></article>
          <i aria-hidden="true">→</i><article class="agent-executor"><span>Agent 執行／協調</span><strong>依工作票修改程式</strong></article>
          <i aria-hidden="true">→</i><article><span>人類判斷</span><strong>審查、驗證與放行</strong></article>
        </div>
      </div>
    </div>`;
  }

  function renderStageCard(slide, stageKey) {
    const data = STAGES[stageKey];
    if (!data) return '<p class="render-error">Stage data unavailable.</p>';
    if (slide.dataset.introOnly === 'true') {
      const introductions = {
        brainstorming: { name: '整理問題', input: '問題、觀察和限制', work: '整理要解決的問題', role: '授權人、專案經理與產品負責人', output: '共同方向與待確認事項', record: '產品目標紀錄', version: '尚未開始程式修改' },
        refinement: { name: '拆分工作', input: '已確認方向與未解疑問', work: '拆成可交接、可檢查的工作票', role: '產品負責人與專案經理', output: '工作範圍、驗收條件和檢查方法', record: '工作票', version: '尚未開始程式修改' },
        ready: { name: '確認可開工', input: '工作內容、條件和依賴', work: '確認範圍、負責人和接手條件', role: '產品負責人、開發者與品質驗證者', output: '可開始處理的工作票', record: '工作票和目前進度', version: '尚未開始程式修改' },
        dev: { name: '開發', input: '已備妥的工作票', work: '依範圍修改程式並自行檢查', role: '開發者', output: '修改摘要和自我檢查紀錄', record: '工作票的修改紀錄', version: '程式修改可回查' },
        review: { name: '程式審查', input: '程式修改和自我檢查紀錄', work: '由另一人檢查修改和工作範圍', role: '程式審查者與開發者', output: '審查意見和處理狀態', record: '審查紀錄', version: '意見連回相應修改' },
        qa: { name: '品質驗證', input: '驗收條件和可識別的版本', work: '重做檢查並記下觀察', role: '品質驗證者', output: '各項結果及未測項目', record: '測試紀錄', version: '結果對應實際修改' },
        product_check: { name: '產品確認', input: '工作票結果和原本目標', work: '對照目標並找出缺口', role: '產品負責人', output: '接受範圍或未完成事項', record: '目標對照紀錄', version: '只核對已有的修改紀錄' },
        human_gate: { name: '人類授權', input: '測試紀錄和剩餘風險', work: '由授權人決定授權、暫停或補驗', role: '授權人', output: '有原因可回查的決定', record: '授權決定', version: '本課未實際合併' },
        release_done: { name: '交付與完成', input: '完整檢查紀錄和授權決定', work: '實際合併並完成交付', role: '開發者與授權人', output: '完成交付後才標記本票完成', record: '交付紀錄', version: '本課未實際合併' },
      }[stageKey];
      const { name, input, work, role, output, record, version } = introductions;
      return `<div class="focus-compose stage-intro-compose">${locator(slide)}<div class="diagram-field stage-intro-card"><header><span>目前工作站</span><h2>${esc(name)}</h2></header><div class="stage-intro-flow"><article><span>開始時</span><strong>${esc(input)}</strong></article><i aria-hidden="true">→</i><article class="stage-intro-work"><span>主要工作・${esc(role)}</span><strong>${esc(work)}</strong></article><i aria-hidden="true">→</i><article class="stage-intro-output"><span>留下的紀錄</span><strong>${esc(output)}</strong></article></div><div class="stage-intro-records"><article><b>交接紀錄</b><span>${esc(record)}</span></article><article><b>版本紀錄</b><span>${esc(version)}</span></article></div></div></div>`;
    }
    const notes = slide.querySelector('.notes');
    const detail = document.createElement('p');
    detail.innerHTML = `<strong>工作階段卡補充：</strong>${esc([
      `完整產出：${data.output}`, `狀態變化：${data.stateChange}`,
      `交接：${data.handoff}`, `GitHub：${data.github}`,
      ...(data.outputNote ? [`證據界線：${data.outputNote}`] : []),
    ].join('；'))}`;
    notes.append(detail);
    const stageCopy = {
      brainstorming: { input: '使用者問題、觀察與限制', activity: '釐清要解決的問題與成功訊號', output: '共同確認的產品目標與待決事項', exit: '方向已確認，目標有共同紀錄', next: '需求拆分', record: '產品目標紀錄', state: '問題待釐清 → 產品目標待確認' },
      refinement: { input: '已確認的產品目標與未決問題', activity: '拆成可交接、可檢查的工作票', output: '工作票、範圍、驗收與檢查方法', exit: '工作範圍、條件與阻礙已寫清', next: '接手檢查', record: '工作票與看板狀態', state: '目標已確認 → 工作仍在待整理' },
      ready: { input: '工作內容、驗收條件與依賴', activity: '確認接手者和開工條件', output: '可接手的工作票；尚未開工', exit: '接手者、範圍、檢查方式與依賴明確', next: '開發', record: '工作票與進度欄', state: '待整理 → 可接手；尚未開工' },
      dev: { input: '工作票、核准範圍與現有程式', activity: '依核准範圍修改程式', output: '修改版本、自測紀錄與未完成項', exit: '修改摘要、自測結果與未完成項有紀錄', next: '程式審查', record: '工作票、版本與修改摘要', state: '待接手 → 開發中；留下程式版本' },
      review: { input: '程式修改、工作票與自測紀錄', activity: '比對程式修改與工作範圍', output: '審查意見與處置結果', exit: '重大審查意見已處置，再交品質驗證', next: '測試驗證', record: '送審紀錄與修改意見', state: '開發中 → 待審查；意見要有處置' },
      qa: { input: '可辨識版本、檢查方式與預期結果', activity: '核對預期結果與實際行為', output: '測試結果與尚未檢查項', exit: '實際結果與未測項分開記錄', next: '產品確認', record: '測試結果與未測項', state: '待審查 → 待驗證；結果與未測分開記' },
      product_check: { input: '工作結果、測試紀錄與產品目標', activity: '對照工作結果與產品目標', output: '接受範圍或退回原因', exit: '接受範圍或退回理由已寫清', next: '人決定', record: '產品目標與接受範圍', state: '測試完成 → 產品確認；留下接受或退回結果' },
      human_gate: { input: '工作證據、剩餘風險與交付計畫', activity: '查看證據和剩餘風險', output: '授權、暫停或補驗決定', exit: '取得人類授權後才合併；缺證據先暫停', next: '合併或補驗', record: '授權或補驗決定', state: '產品確認 → 人決定；授權、暫停或補驗' },
      release_done: { input: '工作完成條件與所需證據', activity: '確認條件並留下交付紀錄', output: '交付紀錄；交付後才標為完成', exit: '實際完成交付並留下紀錄後才標為完成', next: '工作票交付', record: '交付結果與完成狀態', state: '符合條件 → 人授權 → 合併並交付 → 完成' },
    }[stageKey] || {};
    const roleNames = {
      Owner: '授權人', PM: '專案經理', PO: '產品負責人', 'UI/UX': '介面設計',
      Dev: '開發者', Reviewer: '程式審查者', QA: '品質驗證', Agent: 'Agent',
    };
    const leads = data.lead.map(person => roleNames[person] || person).join('、');
    const collaborators = data.co.slice(0, 2).map(person => roleNames[person] || person).join('、');
    const roleHandoff = `主責：${leads}${collaborators ? `；協作：${collaborators}${data.co.length > 2 ? '等' : ''}` : ''}`;
    const nextStage = stageCopy.next;
    const conciseOutput = {
      refinement: stageCopy.output,
      release_done: stageCopy.output,
    }[stageKey] || stageCopy.output;
    return `<div class="focus-compose stage-compose">${locator(slide)}
      <div class="diagram-field stage-panel">
        <div class="stage-goal-target">
          <article><span>產品目標</span><strong>${esc(stageKey === 'brainstorming' ? '尚待共同確認' : '互相按讚後，在配對清單找到對方。')}</strong></article>
          <article class="target-card"><span>本站任務</span><strong>${esc(data.target)}</strong></article>
        </div>
        <div class="stage-handoff-flow" aria-label="本次工作的條件、主要工作與留下的紀錄">
          <article class="stage-flow-card stage-input fragment" data-fragment-order="1"><span>已知條件</span><strong>${esc(stageCopy.input)}</strong></article>
          <span class="stage-flow-arrow fragment" data-fragment-order="1" aria-hidden="true">→</span>
          <section class="stage-activities fragment" data-fragment-order="1"><h2>關鍵工作</h2><strong>${esc(stageCopy.activity)}</strong></section>
          <span class="stage-flow-arrow fragment" data-fragment-order="2" aria-hidden="true">→</span>
          <article class="stage-flow-card stage-output fragment" data-fragment-order="2"><span>留下的紀錄</span><strong>${esc(conciseOutput)}</strong></article>
          <div class="stage-next fragment" data-fragment-order="2"><span aria-hidden="true">→</span><strong>${esc(nextStage)}</strong></div>
        </div>
        <div class="stage-transition fragment" data-fragment-order="2"><span>狀態變化</span><strong>${esc(stageCopy.state)}</strong></div>
        <div class="stage-support-strip fragment" data-fragment-order="3">
          <article><b>負責角色</b><span>${esc(roleHandoff)}</span></article>
          <article><b>交接條件</b><span>${esc(stageCopy.exit)}</span></article>
          <article><b>紀錄位置</b><span>${esc(stageCopy.record)}</span></article>
        </div>
      </div>
    </div>`;
  }

  function renderExitCheck(slide) {
    return `<div class="focus-compose pairing-exercise-compose">${locator(slide)}<div class="diagram-field pairing-exercise-field">
      <article class="pairing-exercise-ticket"><header><strong>配對規則工作票</strong><span>教學示意</span></header><p><b>目標</b>：讓互相按讚的兩個人配成一對。</p><p><b>條件</b>：只有一方按讚時，不建立配對。</p><p><b>目前</b>：待整理；檢查方法與接手人還沒補齊。</p></article>
      <ol class="pairing-exercise-questions" aria-label="三個練習問題">
        <li data-exercise-card="0" class="is-current"><div class="exercise-step exercise-prompt fragment visible revealed-once is-current" data-exercise-order="0"><b>問題一</b><strong>在哪一站？</strong></div><p class="exercise-step exercise-answer fragment" data-exercise-order="1"><strong>參考判斷</strong>：待整理，正在拆分工作。</p></li>
        <li data-exercise-card="1"><div class="exercise-step exercise-prompt fragment" data-exercise-order="2"><b>問題二</b><strong>下一步交給誰？</strong></div><p class="exercise-step exercise-answer fragment" data-exercise-order="3"><strong>參考判斷</strong>：產品負責人整理票，開發者和品質驗證者確認工作與檢查方式。</p></li>
        <li data-exercise-card="2"><div class="exercise-step exercise-prompt fragment" data-exercise-order="4"><b>問題三</b><strong>還缺什麼才能往下？</strong></div><p class="exercise-step exercise-answer fragment" data-exercise-order="5"><strong>參考判斷</strong>：補上檢查方法、預期結果和接手人，再確認依賴。</p></li>
      </ol>
    </div></div>`;
  }

  const B2_SCENE_ORDER = [
    'O03', 'B01', 'B02', 'B03', 'B04', 'R01', 'R02', 'R03', 'R04', 'R05',
    'RD01', 'RD02', 'D01', 'D02', 'C08', 'C09', 'D03', 'D04', 'RV01', 'RV02',
    'RV03', 'Q01', 'Q02', 'Q03', 'Q04', 'Q05', 'PC01', 'PC02', 'HG01', 'HG02',
    'O02', 'C10', 'A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08',
    'A09', 'A10', 'A11', 'X01',
  ];
  const B2_MAP_STATE = {
    O03: { docStage: 'backlog', docLabel: '需求草案', docStatus: '待確認' },
    B04: { docStage: 'backlog', docLabel: '產品目標', docStatus: '已建立' },
    R05: { docStage: 'ready', docLabel: '工作票', docStatus: '已拆分・待補' },
    RD02: { docStage: 'ready', docLabel: '工作票', docStatus: '已備妥', ticket: 'ready', previous: 'backlog' },
      D04: {
        docStage: 'dev', docLabel: '工作紀錄', docStatus: '摘要已留',
        versionStage: 'dev', versionStatus: '已開分支', ticket: 'dev', previous: 'ready',
        versionStates: { review: { status: '有修改紀錄' } },
      },
      RV03: {
      docStage: 'review', docLabel: '審查意見', docStatus: '示意・需修改',
      versionStage: 'qa', versionStatus: '示意・需修改', ticket: 'dev', previous: 'review', actualReturn: 'review',
      docStates: { ready: { label: '工作票', status: '已備妥' }, dev: { label: '工作紀錄', status: '摘要已留' } },
      versionStates: { dev: { status: '示意・修正中' }, review: { status: '示意・已提交' } },
      },
      Q05: {
      docStage: 'qa', docLabel: '測試紀錄', docStatus: '補測 PASS',
      versionStage: 'qa', versionStatus: '示意・待合併', ticket: 'qa', previous: 'dev', actualReturn: 'qa',
      docStates: { review: { label: '審查意見', status: '示意・已處置' } },
      versionStates: { dev: { status: '示意・已修正' }, review: { status: '示意・已提交' } },
      },
    PC02: { docStage: 'product-check', docLabel: '目標對照', docStatus: '介面未測', versionStage: 'qa', versionStatus: '示意・待決' },
    HG02: {
      docStage: 'human_gate', docLabel: '授權決定', docStatus: '已授權（示意）',
      versionStage: 'human_gate', versionStatus: '尚未合併', ticket: 'product-check',
      versionStates: { qa: { status: '示意・待合併' } },
    },
  };

  const AGENT_TIMELINE_START = {
    docStage: 'ready', docLabel: '工作票', docStatus: '配對規則票已交辦',
    ticket: 'dev', previous: 'ready',
    docStates: {
      backlog: { label: '產品目標', status: '沿用既有目標' },
      ready: { label: '工作票', status: '配對規則票已交辦' },
      dev: { label: '工作紀錄', status: '尚未產生' },
      review: { label: '審查意見', status: '尚未產生' },
      qa: { label: '測試紀錄', status: '尚未產生' },
      'product-check': { label: '目標對照', status: '尚未核對' },
      human_gate: { label: '授權決定', status: '尚未決定' },
      done: { label: '交付紀錄', status: '尚未產生' },
    },
    versionStage: 'dev', versionStatus: '尚未開分支',
    versionStates: {
      dev: { status: '尚未開分支' },
      review: { status: '尚無修改紀錄' },
      qa: { status: '尚未送審' },
      human_gate: { status: '尚未決定' },
    },
  };

  const AGENT_TIMELINE_AFTER_QA = {
    docStage: 'product-check', docLabel: '目標對照', docStatus: '整體目標仍未測',
    ticket: 'product-check',
    docStates: {
      backlog: { label: '產品目標', status: '沿用既有目標' },
      ready: { label: '工作票', status: '同一張票已交辦' },
      dev: { label: '工作紀錄', status: 'Agent 修改為教學示意' },
      review: { label: '審查意見', status: '示意・已處置' },
      qa: { label: '測試紀錄', status: '三次規則實測可回查' },
      'product-check': { label: '目標對照', status: '介面與完整流程未測' },
      human_gate: { label: '授權決定', status: '尚未決定' },
      done: { label: '交付紀錄', status: '尚未產生' },
    },
    versionStage: 'qa', versionStatus: '示意・待合併',
    versionStates: {
      dev: { status: '示意・已修正' },
      review: { status: '示意・已提交' },
      qa: { status: '示意・待合併' },
      human_gate: { status: '尚未決定' },
    },
  };

  function cumulativeB2Delta(scene) {
    const current = B2_MAP_STATE[scene] || null;
    const sceneIndex = B2_SCENE_ORDER.indexOf(scene);
    if (sceneIndex < 0) return current;
    const docStates = {};
    const versionStates = {};
    B2_SCENE_ORDER.slice(0, sceneIndex + 1).forEach(id => {
      const item = B2_MAP_STATE[id];
      if (!item) return;
      if (item.docStage) docStates[item.docStage] = { label: item.docLabel, status: item.docStatus };
      Object.assign(docStates, item.docStates || {});
      Object.assign(versionStates, item.versionStates || {});
      if (item.versionStage) versionStates[item.versionStage] = { label: item.versionLabel, status: item.versionStatus };
    });
    return { ...(current || {}), docStates, versionStates };
  }

  function agentTimelineDelta(scene, slide) {
    if (scene === 'A11') return AGENT_TIMELINE_AFTER_QA;
    if (scene === 'O02' || scene === 'A01' || slide.dataset.roleCapability) return AGENT_TIMELINE_START;
    return cumulativeB2Delta(scene);
  }

  const QA_STATUS = {
    Q01: { current: '尚未執行', tested: '無規則實測', untested: '單向、雙向、重複按讚' },
    Q02: { current: '第一版', tested: '單向按讚 FAIL', untested: '雙向、重複按讚' },
    Q03: { current: '修正版第一次測', tested: '單向、雙向 PASS', untested: '重複按讚' },
    Q04: {
      current: '修正版補測前', tested: '單向、雙向 PASS', untested: '重複按讚',
      after: { current: '修正版補測後', tested: '單向、雙向、重複按讚 PASS', untested: '介面、完整流程、產品目標' },
    },
    Q05: { current: '修正版補測後', tested: '單向、雙向、重複按讚 PASS', untested: '介面、完整流程、產品目標' },
    PC01: { current: '產品目標核對', tested: '三種規則情境皆有結果', untested: '配對清單、介面、完整流程、產品目標' },
    PC02: { current: '等待人決定', tested: '三種規則情境皆有結果', untested: '配對清單、介面、完整流程、產品目標' },
    HG01: { current: '等待授權決定', tested: '三種規則情境皆有結果', untested: '介面、完整流程、產品目標' },
    HG02: { current: '已授權（示意）・尚未合併', tested: '三種規則情境皆有結果', untested: '介面、完整流程、產品目標' },
  };

  function qaStatusRibbon(scene) {
    const status = QA_STATUS[scene];
    if (!status) return '';
    const after = status.after || status;
    return `<div class="qa-status-ribbon" role="group" aria-label="測試狀態" data-qa-scene="${esc(scene)}" data-qa-current-before="${esc(status.current)}" data-qa-tested-before="${esc(status.tested)}" data-qa-untested-before="${esc(status.untested)}" data-qa-current-after="${esc(after.current)}" data-qa-tested-after="${esc(after.tested)}" data-qa-untested-after="${esc(after.untested)}"><div><b>目前</b><strong data-qa-current>${esc(status.current)}</strong></div><div><b>已測</b><strong data-qa-tested>${esc(status.tested)}</strong></div><div><b>未測</b><strong data-qa-untested>${esc(status.untested)}</strong></div></div>`;
  }

  function updateQaStatus(slide, revealed) {
    const ribbon = slide.querySelector('.qa-status-ribbon');
    if (!ribbon) return;
    const phase = revealed ? 'after' : 'before';
    ribbon.dataset.qaPhase = phase;
    for (const [key, dataKey] of [['current', 'qaCurrent'], ['tested', 'qaTested'], ['untested', 'qaUntested']]) {
      const value = ribbon.dataset[`${dataKey}${revealed ? 'After' : 'Before'}`];
      const target = ribbon.querySelector(`[data-qa-${key}]`);
      if (target && value) target.textContent = value;
    }
  }

  function renderPart2Map(slide) {
    const scene = slide.dataset.rev13SceneId || slide.dataset.rev13MergedScenes?.split(',')[0];
    const delta = agentTimelineDelta(scene, slide);
    const spotlightZones = ['O03', 'A01', 'A11'].includes(scene)
      ? [] : (slide.dataset.focusZones || '').split(',').filter(Boolean);
    const roles = ['O03', 'A01', 'A11'].includes(scene)
      ? [] : (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean);
    const sceneIndex = B2_SCENE_ORDER.indexOf(scene);
    const devIntroIndex = B2_SCENE_ORDER.indexOf('D02');
    const briefVersion = slide.dataset.briefVersion === 'true' || (sceneIndex >= 0 && sceneIndex < devIntroIndex);
    const map = renderMotherMap({
      spotlightZones,
      roles,
      stage: slide.dataset.focusStage || '',
      states: (slide.dataset.stateMarkers || '').split(',').filter(Boolean),
      agent: slide.dataset.agent !== 'false',
      newAgent: scene === 'O02',
      capability: slide.dataset.roleCapability || '',
      page: slide.dataset.page,
      ticketPosition: slide.dataset.ticketPosition || '',
      ticketPrevious: slide.dataset.ticketPrevious || '',
      delta,
      briefVersion,
      workloadCount: scene === 'RD02' ? '0／1' : '',
      actualReturn: delta?.actualReturn || '',
      delegateDevWork: scene === 'A01' || slide.dataset.roleCapability === 'delegate',
      principles: scene === 'A11',
    });
    const keepMapScale = !['O02', 'A01'].includes(scene);
    const progress = slide.dataset.outlinePart && keepMapScale
      ? courseOutlineProgress(Number(slide.dataset.outlinePart)) : '';
    const qaStatus = qaStatusRibbon(scene);
    return `<div class="full-map-wrap b2-full-map${progress ? ' has-course-outline' : ''}${qaStatus ? ' has-qa-status' : ''}">${progress}${qaStatus}${map}</div>`;
  }

  function renderAgentMode(slide) {
    const mode = slide.dataset.agentMode;
    const configurations = {
      single: {
        title: '完整交辦範例：人交辦、Agent 回報、人核對',
        note: '教學示意／架構示意：不代表 Agent 曾實際修改或測試。',
        columns: ['人交辦', 'Agent 修改', 'Agent 回報', '人核對'],
        lanes: [
          ['交辦者／授權人（人）', 'human', [[1, '提供工作票 #3 和停止條件', 'human'], [4, '核對後決定是否授權', 'human']]],
          ['開發 Agent', 'agent', [[2, '依交辦修改配對規則', 'agent'], [3, '回報改了什麼、哪些未測', 'agent']]],
          ['程式審查者（人）', 'review', [[4, '核對修改是否符合工作票', 'review']]],
          ['品質驗證者（人）', 'review', [[4, '依驗收條件獨立檢查', 'review']]],
        ],
        routes: [[[1, 0], [2, 1], [3, 1], [4, 0]]],
        artifacts: [
          '回報示意：已依交辦修改配對規則；測試紀錄尚未產生',
          '同一張票：續記修改摘要；正式授權尚未決定',
        ],
      },
      'multi-chat': {
        title: '多個工作對話之間，由人帶著紀錄交接',
        note: '架構示意，不代表實際多 Agent 協作。',
        columns: ['共用工作票', '開發中', '人帶紀錄', '審查／品質驗證', '授權決定'],
        lanes: [
          ['開發 Agent', 'agent', [[2, '修改已提交（示意），交版本摘要', 'agent']]],
          ['人', 'human', [[1, '提供同一張票與驗收條件', 'human'], [3, '帶版本摘要與未測項，換工作對話', 'relay']]],
          ['程式審查者（人）', 'review', [[4, '核對改動與核准範圍', 'review']]],
          ['品質驗證者（人）', 'review', [[4, '逐條驗收，分開記結果與未測', 'review']]],
          ['授權人', 'human', [[5, '查看共用紀錄，再決定放行', 'human']]],
        ],
        routes: [[[1, 1], [2, 0], [3, 1], [4, 2], [5, 4]], [[3, 1], [4, 3], [5, 4]]],
        artifacts: ['交接內容：同一張工作票、已提交修改摘要（示意）與未測項'],
      },
      orchestrator: {
        title: '協調 Agent 分派工作，人保留正式放行',
        note: '架構示意，不代表實際多 Agent 協作；協調 Agent 收整回報，讓人集中核對。',
        columns: ['人核准', 'Agent 分派', 'Agent 開發修改', '人審查／驗證', 'Agent 彙整', '人決定放行'],
        lanes: [
          ['授權人', 'human', [[1, '核准範圍與停止條件', 'human'], [6, '看證據，決定是否正式放行', 'human']]],
          ['協調 Agent', 'agent', [[2, '依工作邊界分派', 'agent'], [5, '彙整回報並附來源', 'agent']]],
          ['Dev Agent', 'agent', [[3, '修改並交版本摘要', 'agent']]],
          ['程式審查者（人）', 'review', [[4, '檢查改動與核准範圍', 'review']]],
          ['品質驗證者（人）', 'review', [[4, '依條件獨立核對並記錄', 'review']]],
        ],
        routes: [[[1, 0], [2, 1]], [[2, 1], [3, 2]], [[3, 2], [4, 3]], [[3, 2], [4, 4]], [[4, 3], [5, 1]], [[4, 4], [5, 1]], [[5, 1], [6, 0]]],
        artifacts: ['回報來源：各項工作沿同一張票記錄，人保留放行決定'],
      },
    };
    const config = configurations[mode] || configurations.single;
    const axis = `<span class="agent-mode-axis-spacer" aria-hidden="true"></span>${config.columns.map((label, index) => `<div class="agent-mode-step fragment" data-fragment-order="${index + 1}"><span>${index === 0 ? '起點' : `第 ${index + 1} 步`}</span><strong>${esc(label)}</strong></div>`).join('')}`;
    const lanes = config.lanes.map(([name, kind, cells]) => {
      const firstStep = Math.min(...cells.map(([column]) => column));
      return `<div class="agent-mode-lane lane-${kind} fragment" data-fragment-order="${firstStep}"><strong class="agent-mode-lane-name">${esc(name)}</strong>${cells.map(([column, text, type]) => `<article class="agent-mode-cell mode-${type} fragment" data-fragment-order="${column}" style="grid-column:${column + 1}"><b>${esc(text)}</b></article>`).join('')}</div>`;
    }).join('');
    const laneHeight = config.lanes.length > 3 ? 56 : 112;
    const laneGap = config.lanes.length > 3 ? 6 : 10;
    const labelWidth = 180;
    const columnGap = 6;
    const routeId = `agent-route-arrow-${slide.dataset.page}`;
    const cellWidth = (1000 - labelWidth - config.columns.length * columnGap) / config.columns.length;
    const cellLeft = column => labelWidth + columnGap + (column - 1) * (cellWidth + columnGap);
    const cellRight = column => cellLeft(column) + cellWidth;
    const rowCenter = row => row * (laneHeight + laneGap) + laneHeight / 2;
    const routeEdges = (config.routes || []).flatMap(route => route.slice(1).map((point, index) => ({
      from: route[index],
      to: point,
    })));
    const routeGroups = new Map();
    routeEdges.forEach(edge => {
      const key = `${edge.to[0]}:${edge.to[1]}`;
      routeGroups.set(key, [...(routeGroups.get(key) || []), edge]);
    });
    const routePaths = [...routeGroups.values()].flatMap(edges => {
      const [toColumn, toRow] = edges[0].to;
      const endX = cellLeft(toColumn) - 5;
      const endY = rowCenter(toRow);
      if (edges.length === 1 || !edges.every(edge => edge.from[0] === edges[0].from[0])) {
        return edges.map(({ from: [fromColumn, fromRow] }) => {
          const startX = cellRight(fromColumn) + 5;
          const startY = rowCenter(fromRow);
          const channelX = (startX + endX) / 2;
          return `<path class="fragment" data-fragment-order="${toColumn}" d="M${startX} ${startY} H${channelX} V${endY} H${endX}" marker-end="url(#${routeId})"/>`;
        });
      }
      const fromColumn = edges[0].from[0];
      const channelX = (cellRight(fromColumn) + cellLeft(toColumn)) / 2;
      const feeders = edges.map(({ from: [, fromRow] }) => {
        const startX = cellRight(fromColumn) + 5;
        const startY = rowCenter(fromRow);
        return `<path class="fragment" data-fragment-order="${toColumn}" d="M${startX} ${startY} H${channelX} V${endY}"/>`;
      });
      feeders.push(`<path class="fragment" data-fragment-order="${toColumn}" d="M${channelX} ${endY} H${endX}" marker-end="url(#${routeId})"/>`);
      return feeders;
    }).join('');
    const lanesHeight = config.lanes.length * laneHeight + (config.lanes.length - 1) * laneGap;
    const routes = `<svg class="agent-mode-routes mode-${mode}" viewBox="0 0 1000 ${lanesHeight}" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="${routeId}" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L9 4 L0 8 Z"/></marker></defs>${routePaths}</svg>`;
    const artifacts = config.artifacts.map(text => {
      const [label, ...detail] = text.split('：');
      return `<article><b>${esc(label)}</b><span>${esc(detail.join('：'))}</span></article>`;
    }).join('');
    const hasProgress = Boolean(slide.dataset.outlinePart);
    const heading = hasProgress
      ? `<div class="course-outline-heading">${courseOutlineProgress(Number(slide.dataset.outlinePart))}${locator(slide)}</div>`
      : locator(slide);
    return `<div class="focus-compose agent-mode-compose${hasProgress ? ' has-course-outline' : ''}">${heading}<section class="diagram-field agent-mode-field" style="--mode-columns:${config.columns.length};--mode-rows:${config.lanes.length};--mode-lane-height:${laneHeight}px;--mode-lane-gap:${laneGap}px;--mode-lanes-height:${lanesHeight}px"><p class="agent-mode-note">${esc(config.note)}</p><div class="agent-mode-axis" style="--mode-columns:${config.columns.length}">${axis}</div><div class="agent-mode-lanes" style="--mode-columns:${config.columns.length};--mode-rows:${config.lanes.length}">${routes}${lanes}</div><div class="agent-mode-artifacts fragment" data-fragment-order="${config.columns.length + 1}">${artifacts}</div></section></div>`;
  }

  function artifactCard(label, title, content, className = '') {
    return `<article class="b2-card ${className}"><span class="b2-card-label">${esc(label)}</span><strong>${esc(title)}</strong><div>${content}</div></article>`;
  }

  function issueSheet({ title, state = 'Backlog', teaching = true, workItem = 'Ticket #3 · Matching 規則', sections = [], revealSections = false }) {
    return `<article class="issue-sheet">
      <header class="issue-head"><div><span class="issue-symbol">●</span><strong>${esc(title)}</strong></div><span class="status-pill">${esc(state)}</span></header>
      <div class="issue-meta"><span>${teaching ? '教學示意' : '規則層實測'}</span><span>${esc(workItem)}</span><span>責任人可回查</span></div>
      <div class="issue-sections">${sections.map(([label, body, kind = ''], index) => {
        const revealOrder = index < 2 ? 1 : index;
        const revealClass = revealSections ? ' fragment' : '';
        const revealAttribute = revealSections ? ` data-fragment-order="${revealOrder}"` : '';
        return `<section class="issue-section ${kind}${revealClass}"${revealAttribute}><h2>${esc(label)}</h2>${body}</section>`;
      }).join('')}</div>
    </article>`;
  }

  function renderScopeBoundary() {
    return `<div class="scope-boundary-grid"><article class="scope-in"><span>這張票負責</span><strong>只改配對規則</strong><p>兩人互按後，留下一筆配對紀錄。</p></article><i aria-hidden="true">↔</i><article class="scope-out"><span>這張票不處理</span><strong>登入、聊天室、完整介面</strong><p>把範圍外工作先分開記，避免越做越多。</p></article></div>`;
  }

  function qaTable(rows) {
    return `<table class="qa-table"><thead><tr><th>版本</th><th>案例</th><th>預期</th><th>實際</th><th>結果</th></tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td${index === 4 ? ` class="result-cell result-${cell === '未測' ? 'not-run' : String(cell).toLowerCase().replaceAll(' ', '-')}"` : ''}>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  function evidenceReference(version, record) {
    return `<div class="evidence-reference"><span>版本</span><strong>${esc(version)}</strong><span>測試紀錄</span><strong>${esc(record)}</strong></div>`;
  }

  function renderPart2Work(slide) {
    const id = slide.dataset.rev13SceneId;
    const locatorMarkup = locator(slide);
    let body = '';
    switch (id) {
      case 'B01':
        body = `<div class="brainstorm-grid"><article><span>使用者問題</span><strong>「配對功能正常」還不夠明確</strong><p>誰遇到什麼困難？</p></article><i aria-hidden="true">→</i><article><span>要釐清的假設</span><strong>哪個按讚情況才建立配對？</strong><p>單向、雙向與重複按讚</p></article><i aria-hidden="true">→</i><article><span>共同決定 · 示意</span><strong>授權人、專案經理、產品負責人</strong><p>記下選項、未知與方向</p></article></div>`;
        break;
      case 'B02':
        body = `<div class="goal-flow"><article><span>待釐清請求</span><strong>配對功能正常</strong><p>成功條件尚未定義</p></article><i>→</i><article class="goal-result"><span>產品目標 · 示意</span><strong>使用者互相按讚後，能在配對清單找到對方</strong><p>規則訊號：互相按讚後預期只建立一筆配對紀錄。</p></article><article class="goal-open"><span>仍待決定</span><strong>整體產品成效與介面路徑</strong><p>本頁沒有測量這些結果</p></article></div>`;
        break;
      case 'B03':
        body = issueSheet({ title: '產品目標紀錄：配對體驗', state: '待整理', workItem: '產品目標 · 配對體驗', sections: [
          ['希望使用者做到什麼', '<p>兩人互相按讚後，能在配對清單找到對方。</p>'],
          ['目前可檢查的訊號', '<p>雙向按讚預期只建立一筆配對紀錄。</p>'],
          ['待確認', '<p>整體產品範圍、介面與依賴仍待整理。</p>'],
        ] });
        break;
      case 'R01':
        body = `<div class="refinement-board"><div class="refinement-source"><span>輸入 · 示意</span><strong>同一份產品目標紀錄</strong><p>目標、限制、未知事項</p></div><i aria-hidden="true">→</i><div class="refinement-checks"><h2>釐清待回答的問題</h2><ul><li>可行性與風險</li><li>範圍內外</li><li>先後工作與順序</li><li>驗收條件與檢查方法</li></ul></div><i aria-hidden="true">→</i><div class="refinement-handoff"><span>輸出 · 示意</span><strong>可交接的工作票</strong><p>仍在待整理</p></div></div>`;
        break;
      case 'R02':
        body = `<div class="issue-tree"><article class="parent-issue"><span>產品目標 · 示意</span><strong>互相按讚後，在配對清單找到對方</strong><p>三張工作票分開交付；按讚與清單都要等配對規則完成。</p></article><div class="tree-stem"></div><div class="child-issues"><article class="child-primary"><span>工作票 · #3</span><strong>雙向按讚建立配對</strong><small>本課主要工作票</small></article><article><span>工作票 · #1</span><strong>按讚／略過</strong><small>等 #3 配對規則完成</small></article><article><span>工作票 · #2</span><strong>配對清單</strong><small>等 #3 配對規則完成</small></article></div><div class="issue-dependencies" aria-label="工作票間的先後依賴"><svg viewBox="0 0 1000 54" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="issue-dependency-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker></defs><path d="M166 0 V13 H500 V41" marker-end="url(#issue-dependency-arrow)" /><path d="M166 13 H833 V41" marker-end="url(#issue-dependency-arrow)" /></svg><div><span>先完成配對規則票</span><b>→</b><span>再做按讚票</span><i>／</i><span>配對清單票</span></div></div><footer class="issue-tree-note">三張票分開交付；按讚與配對清單票要等 #3 完成。本課先做 #3。</footer></div>`;
        break;
      case 'R03':
        body = renderScopeBoundary();
        break;
      case 'R04':
        body = `<div class="issue-tree issue-tree-updated"><article class="parent-issue"><span>產品目標 · 更新示意</span><strong>互相按讚後，在配對清單找到對方</strong><p>三張工作票與依賴都連回此目標。</p></article><div class="tree-stem"></div><div class="child-issues"><article class="child-primary"><span>工作票 · #3</span><strong>雙向按讚建立配對</strong><small>驗收條件與檢查方法已補</small></article><article><span>工作票 · #1</span><strong>按讚／略過</strong><small>等 #3 配對規則完成</small></article><article><span>工作票 · #2</span><strong>配對清單</strong><small>等 #3 配對規則完成</small></article></div><div class="issue-dependencies" aria-label="配對規則票先於按讚與配對清單票"><svg viewBox="0 0 1000 54" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="updated-issue-dependency-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker></defs><path d="M166 0 V13 H500 V41" marker-end="url(#updated-issue-dependency-arrow)" /><path d="M166 13 H833 V41" marker-end="url(#updated-issue-dependency-arrow)" /></svg><div><span>先完成配對規則票</span><b>→</b><span>再做按讚票</span><i>／</i><span>配對清單票</span></div></div><div class="project-state"><b>看板狀態 · 示意</b><span>#3 目前：待整理</span></div></div>`;
        break;
      case 'RD01':
        body = `<div class="ready-check"><article><b>工作範圍</b><span>單一規則票；包含與排除都清楚</span></article><article><b>驗收條件／檢查方法</b><span>三種情境都有明確預期與做法</span></article><article><b>先後依賴</b><span>必要關係與接手責任已記錄</span></article><article><b>可否檢查</b><span>假資料、紀錄筆數與修改版本可辨認</span></article><div class="ready-result"><strong>開工條件 · 示意</strong><span>可交給開發者；尚無測試通過</span></div></div>`;
        break;
      case 'D01':
        body = `<div class="dev-intake"><article><span>輸入 · 示意</span><strong>已備妥的 #3 工作票</strong><p>工作範圍、三項驗收條件、停止條件</p></article><i>→</i><article class="dev-active"><span>開發者 · 進行中 1／1 張 · 示意</span><strong>在核准範圍內實作</strong><p>開始工作不等於測試已通過</p></article><i>→</i><article><span>接手責任</span><strong>開發者</strong><p>工作票記錄進度與未完成項</p></article></div>`;
        break;
      case 'D03':
        body = `<div class="candidate-card"><header><span>Dev 交接摘要</span><strong>Issue #3 · 雙向按讚規則</strong><em>教學示意</em></header><div><article><b>自測線索</b><span>重設假資料 → 單向按讚 → 查紀錄數</span></article><article><b>版本與修改</b><span>Branch、Commit、PR 連結修改摘要</span></article><article><b>待 QA</b><span>AC1–AC3 逐條記預期、實際與結果；未測保持未測</span></article></div><footer>交接格式示意；不表示本頁有 Matching 實測或真實版本紀錄。</footer></div>`;
        break;
      case 'RV01':
      case 'RV02':
        body = `<article class="pr-sheet"><header><div><span class="pr-symbol">⑂</span><strong>${id === 'RV01' ? '配對規則版本修改' : '範圍外聊天室變更'}</strong></div><em>教學示意</em></header><div class="pr-branch">${id === 'RV01' ? '示意・已提交' : '示意・退回'} <b>→</b> ${id === 'RV01' ? '示意・待審' : '示意・需修改'}</div><div class="pr-columns"><article><span>工作票</span><strong>Issue #3</strong><small>雙向 Like 才建立一筆配對</small></article><article><span>修改內容</span><strong>${id === 'RV01' ? '配對規則 · 規則層測試' : '聊天室 · 介面'}</strong><small>${id === 'RV01' ? '修改與測試摘要' : '超出本票範圍'}</small></article><article class="pr-review-status"><span>Review（示意）</span><strong>${id === 'RV01' ? '示意・待審' : '示意・需修改'}</strong><small>${id === 'RV01' ? '檢查改動、風險與範圍' : '退回 Dev，移除越界改動'}</small></article></div>${id === 'RV02' ? '<div class="review-fix-path"><b>Dev 移除越界改動（示意）</b><i>→</i><b>示意・複查通過</b><i>→</i><b>才交 QA</b></div>' : ''}<footer>${id === 'RV01' ? '送審與審查狀態為教學示意；驗收結果仍由品質驗證者實測。' : '退回與複查狀態為教學示意；先移除越界修改，再交品質驗證。'}</footer></article>`;
        break;
      case 'Q01':
        body = `<div class="qa-evidence-shell qa-method-shell"><header><span>規則層檢查步驟</span><strong>先取得可重做的觀察，再記錄結果</strong><em>步驟示意</em></header><div class="qa-method-steps"><article><b>1 · 準備</b><span>重置假資料</span></article><i>→</i><article><b>2 · 執行</b><span>小安按讚小晴</span></article><i>→</i><article><b>3 · 看結果</b><span>查配對紀錄數</span></article><i>→</i><article><b>4 · 對照預期</b><span>預期 0 筆</span></article></div>${qaTable([['待測','小安按讚小晴','0 筆配對','未執行','未測']])}<p>待測列只示意如何填寫；本頁沒有新增測試結果。</p></div>`;
        break;
      case 'Q02':
        body = `<div class="qa-evidence-shell actual-evidence qa-failure-evidence"><header><span>規則層實測</span><strong>第一版 · 單向 Like</strong><em>FAIL</em></header>${evidenceReference('第一版', '單向 Like 測試紀錄')}${qaTable([['第一版','小安 Like 小晴；尚未互相 Like','0 筆配對','1 筆配對紀錄','FAIL']])}<div class="qa-fail-detail"><article><span>工作票 #3 · AC1 · 單向按讚</span><strong>預期 0 筆；實際 1 筆</strong><small>FAIL：第一版沒有符合 AC1</small></article><div class="qa-return-path"><b>QA</b><i>→</i><b>Dev</b><span>依 AC1 退回修正</span></div></div><p>第一版規則測試失敗；退回線表示修正流程，測試紀錄只保留實際觀察。</p></div>`;
        break;
      case 'Q03':
        body = `<div class="qa-evidence-shell actual-evidence"><header><span>規則層實測</span><strong>修正版・第一次測</strong><em>部分通過</em></header>${evidenceReference('修正版', '單向與雙向測試紀錄')}${qaTable([['修正版・第一次測','單向 Like','0 筆','0 筆','PASS'],['修正版・第一次測','雙向 Like','1 筆','1 筆','PASS'],['修正版・第一次測','重複按讚','仍 1 筆','未執行','未測']])}<p>AC1／AC2 有規則證據；重複按讚尚未驗證。</p></div>`;
        break;
      case 'Q04':
        body = `<div class="qa-evidence-shell reveal-evidence"><header><span>先請學員作答</span><strong>重複按讚還缺哪個輸入與預期？</strong><em>按下一步揭露</em></header><div class="duplicate-prompt"><article><b>補測前重置</b><span>已有一筆配對紀錄的狀態</span></article><i>→</i><article><b>補測動作</b><span>同一對再次 Like</span></article><i>→</i><article><b>預期</b><span>仍只有 1 筆配對紀錄</span></article></div><div class="b2-reveal fragment" data-fragment-order="1"><span>規則層實測 · 修正版・補測</span>${evidenceReference('修正版', '重複按讚測試紀錄')}${qaTable([['修正版・補測','重複按讚','仍 1 筆','仍 1 筆','PASS']])}<p>補測沿用同一份修正版程式；沒有另建版本。</p></div></div>`;
        break;
      case 'PC01':
        body = `<div class="product-check-grid"><article><span>配對規則票 · 可核對</span><strong>單向 0 筆 · 雙向 1 筆 · 重複按讚仍 1 筆</strong><p>只證明配對規則正確；不代表使用者在配對清單看得到對方。</p></article><i>≠</i><article class="goal-gap"><span>產品目標 · 尚未驗證</span><strong>使用者互相按讚後，能在配對清單找到對方</strong><p>登入／介面／完整流程／完整串接：未測</p></article><footer>產品確認 · 教學示意　｜　產品負責人與授權人記錄範圍與未知，不把規則票結果說成產品目標通過。</footer></div>`;
        break;
      case 'HG01':
        body = `<div class="human-gate-card"><header><span>授權決策清單 · 示意</span><strong>決策者：授權人</strong></header><div class="gate-evidence-list"><article><b>✓</b><span>#3 規則證據：第一版 → 修正版・第一次測 → 修正版・補測</span></article><article><b>!</b><span>介面／完整流程／產品目標：未測</span></article><article><b>!</b><span>上線檢查清單、授權紀錄：未建立</span></article></div><footer><strong>可做的決定</strong><span>補證據　·　暫停　·　退回　·　授權（需真實紀錄）</span></footer></div>`;
        break;
      default:
        body = `<div class="b2-generic"><strong>${esc(slide.querySelector('h1').textContent)}</strong><p>${esc(slide.dataset.docRef)}</p><span>${esc(slide.dataset.versionRef)}</span></div>`;
    }
    const qaStatus = qaStatusRibbon(id);
    return `<div class="focus-compose b2-focus-compose">${locatorMarkup}<section class="diagram-field b2-artifact${qaStatus ? ' has-qa-status' : ''}" aria-label="${esc(slide.querySelector('.artwork').getAttribute('aria-label'))}">${qaStatus}${body}</section></div>`;
  }

  const PRINCIPLE_CASES = {
    A06: { risk: '接手者只看到聊天摘要，不知道這張票的範圍、負責人、AC 和目前位置。', decision: '先讀工作票確認目標、範圍、AC 與接手位置；此時修改、測試與授權紀錄尚未產生。' },
    A07: { risk: 'Agent 想順手加聊天室，超出配對規則票的核准範圍。', decision: '超出本票就依停止條件停下，記下變更請求，交給人決定是否另排工作。' },
    A08: { risk: 'Agent 說「我做完了，可以放行」，執行者可能把實作、審查、驗證和決策混在一起。', decision: '做的人交出修改；Reviewer 審查、QA 獨立驗證，授權人最後決定是否放行。' },
    A09: { risk: 'Agent 回報單向、雙向 PASS；仍要逐項核對第一版與修正版的真實測試紀錄。', decision: '核對第一版單向 FAIL、修正版第一次測的單向／雙向 PASS 與重複按讚未測，再核對同一份修正版程式的補測 PASS。' },
    A10: { risk: '配對規則三項測試都有結果，使用者是否能在配對清單找到對方仍未驗。', decision: '回到 Parent Goal 判斷；規則票 PASS 不等於介面、完整流程或產品目標 PASS。' },
  };

  const PRINCIPLE_NAMES = {
    A06: '工作狀態可回查',
    A07: '超出範圍先停',
    A08: '實作、審查、驗證分工',
    A09: '由他人獨立驗證',
    A10: '回看產品目標',
  };

  function renderPrincipleArtifact(id) {
    const artifacts = {
      A06: `<div class="principle-output-sheet"><header><b>配對規則工作票</b><span>開發中・修改已提交（示意）</span></header><ul><li>目前位置：開發中</li><li>修改摘要：示意・已提交</li><li>測試紀錄：尚未產生</li><li>授權決定：尚未決定</li></ul></div>`,
      A07: `<div class="principle-output-sheet"><header><b>Issue #3 · 變更請求</b><span>工作紀錄示意</span></header><ul><li>聊天室：超出本票範圍</li><li>停止條件：先停下</li><li>測試紀錄與授權：尚未產生／決定</li></ul></div>`,
      A08: `<div class="principle-output-records" aria-label="工作票、PR、審查、驗證和授權紀錄卡"><article><b>Issue #3</b><span>核准範圍與 AC</span></article><article><b>PR（示意）</b><span>修改摘要與版本</span></article><article><b>Review（示意）</b><span>示意・已處置</span></article><article><b>QA Evidence</b><span>尚未產生</span></article></div><small class="principle-output-note">現在尚無測試結果；授權尚未決定。紀錄格式為示意。</small>`,
      A09: `<div class="principle-output-timeline" aria-label="三次真實規則測試紀錄"><article><span>第一版</span><strong>單向按讚：預期 0 筆，實際 1 筆，FAIL</strong></article><i aria-hidden="true">↓</i><article><span>修正版・第一次測</span><strong>回報示意：改互按才配對；單向／雙向 PASS；重複按讚未測</strong></article><i aria-hidden="true">↓</i><article><span>修正版・補測</span><strong>重複按讚 PASS；沿用同一份程式</strong></article></div><small class="principle-output-note">規則測試有真實紀錄；Agent 工作仍為教學示意。</small>`,
      A10: `<div class="principle-output-sheet"><header><b>產品目標 · 配對體驗</b><span>產品核對</span></header><ul><li>規則票：單向、雙向、重複按讚均有測試紀錄</li><li>目標：互相按讚後，在配對清單找到對方</li><li>配對清單、介面與完整流程：未測</li></ul></div>`,
    };
    return artifacts[id] || '';
  }

  function renderPrincipleOverview(slide) {
    const cards = [
      ['交辦', 'External Task State', '先讀共享票，再接著工作'],
      ['實作', 'Bounded Execution', '超出範圍就停下交人決定'],
      ['審查', 'Role Separation', '做的人不替自己放行'],
      ['測試', 'Independent Verification', '未測保留未測，要求補驗'],
      ['產品核對', 'Goal Re-anchoring', '回到目標看整體結果'],
    ];
    const hasProgress = Boolean(slide.dataset.outlinePart);
    const heading = hasProgress
      ? `<div class="course-outline-heading">${courseOutlineProgress(Number(slide.dataset.outlinePart))}${locator(slide)}</div>`
      : locator(slide);
    return `<div class="focus-compose b2-focus-compose${hasProgress ? ' has-course-outline' : ''}">${heading}<section class="diagram-field b2-artifact principle-risk-field"><div class="principle-risk-grid">${cards.map(([stage, principle, plain], index) => `<article class="fragment" data-fragment-order="${index + 1}"><b>${index + 1}</b><div><span>${esc(stage)}時</span><strong>${esc(plain)}</strong><small>${esc(principle)}</small></div></article>`).join('')}</div></section></div>`;
  }

  function renderPrincipleCase(slide) {
    const id = slide.dataset.rev13SceneId;
    const item = PRINCIPLE_CASES[id];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact principle-case-field"><div class="principle-case-grid"><article class="case-situation"><span>${PRINCIPLE_NAMES[id]}</span><p>${esc(item.risk)}</p></article><i>→</i><article class="case-decision"><span>白話做法</span><p>${esc(item.decision)}</p></article><i>→</i><article class="case-artifact"><span>工作紀錄</span>${renderPrincipleArtifact(id)}</article></div></section></div>`;
  }

  function renderPart2Exercise(slide) {
    const questions = [
      ['完成條件', '現在可以把這張票標成完成嗎？', '還不可以：授權尚未決定；本課沒有實際執行合併與上線。介面、完整流程與產品目標仍未測。'],
      ['已測範圍', '哪些規則情境已有實測？', '第一版單向按讚 FAIL；修正版第一次測的單向、雙向 PASS。修正版補測的重複按讚 PASS，三項結果都在規則層。'],
      ['產品結果', '功能現在可以宣稱上線嗎？', '不能這樣宣稱：介面、完整配對流程與產品目標尚未測。上線還要另外檢查和決定。'],
    ];
    const context = `<div class="exercise-state-context"><article><b>目前</b><strong>授權尚未決定；本課沒有實際執行合併與上線</strong></article><article><b>已測</b><strong>第一版單向 FAIL；修正版單向、雙向 PASS；補測重複按讚 PASS</strong></article><article><b>未測</b><strong>介面、完整流程、產品目標</strong></article></div>`;
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact exercise-part2"><header><strong>同一張配對規則票的目前狀態</strong><span>先作答，再看判斷</span></header>${context}<ol>${questions.map(([label, question, answer], index) => `<li data-exercise-card="${index}" class="${index === 0 ? 'is-current' : ''}"><div class="exercise-step exercise-prompt fragment${index === 0 ? ' visible revealed-once is-current' : ''}" data-exercise-order="${index * 2}"><b>${esc(label)}</b><span>${esc(question)}</span></div><p class="exercise-step exercise-answer fragment" data-exercise-order="${index * 2 + 1}"><strong>參考判斷</strong>：${esc(answer)}</p></li>`).join('')}</ol><footer>教學練習；本課沒有實際執行合併與上線。</footer></section></div>`;
  }

  function renderArtwork(slide) {
    const art = slide.querySelector('.artwork');
    const key = slide.dataset.art;
    if (key === 'mother-map' && slide.dataset.openingStep) {
      art.innerHTML = renderOpeningMap(slide);
      return;
    }
    if (key === 'mother-map') {
      const agent = slide.dataset.agent === 'true';
      art.innerHTML = `<div class="full-map-wrap">${renderMotherMap({
        agent,
        revealFoundations: slide.dataset.rev13SceneId === 'O01',
        page: slide.dataset.page,
        processOnly: slide.dataset.processOverview === 'true',
        showReturnPaths: slide.dataset.showReturnPaths === 'true',
        roleLegend: slide.dataset.roleLegend === 'true',
        briefVersion: slide.dataset.briefVersion === 'true',
      })}</div>`;
      return;
    }
    if (key === 'course-outline') art.innerHTML = `<div class="course-outline-shell">${courseOutlineProgress(1)}${renderCourseOutline()}</div>`;
    else if (key === 'good-ticket') art.innerHTML = renderGoodTicket(slide);
    else if (key === 'workflow-map') art.innerHTML = renderKanbanDiagram(slide);
    else if (key === 'stage-card-anatomy') art.innerHTML = renderStageAnatomy(slide);
    else if (key === 'roles-overview') art.innerHTML = renderRolesOverview(slide);
    else if (key === 'roles-stages') art.innerHTML = renderRolesStages(slide);
    else if (key === 'document-types') art.innerHTML = renderDocumentTypes(slide);
    else if (key === 'document-lifecycle') art.innerHTML = renderDocumentLifecycle(slide);
    else if (key === 'criteria-boundaries') art.innerHTML = renderCriteria(slide);
    else if (key === 'git-github-map') art.innerHTML = renderGitGithub(slide);
    else if (key === 'version-history') art.innerHTML = renderVersionHistory(slide);
    else if (key === 'agent-primer') art.innerHTML = renderAgentPrimer(slide);
    else if (key === 'stage-card') art.innerHTML = renderStageCard(slide, slide.dataset.stageKey);
    else if (key === 'exit-check') art.innerHTML = renderExitCheck(slide);
    else if (key === 'part2-map') art.innerHTML = renderPart2Map(slide);
    else if (key === 'part2-work') art.innerHTML = renderPart2Work(slide);
    else if (key === 'agent-mode') art.innerHTML = renderAgentMode(slide);
    else if (key === 'part2-principle-overview') art.innerHTML = renderPrincipleOverview(slide);
    else if (key === 'part2-principle-case') art.innerHTML = renderPrincipleCase(slide);
    else if (key === 'part2-exercise') art.innerHTML = renderPart2Exercise(slide);
    else art.innerHTML = '<p class="render-error">Diagram unavailable.</p>';
  }

  slides.forEach(renderArtwork);
  totalPages.textContent = String(slides.length);
  progressTrack.setAttribute('aria-valuemax', String(slides.length));

  function getHashPage() {
    const match = /^#([1-9]\d*)$/.exec(location.hash);
    const page = match ? Number(match[1]) : 0;
    return page >= 1 && page <= slides.length ? page - 1 : null;
  }

  function closeNotes() {
    slides.forEach(slide => {
      const notes = slide.querySelector('.notes');
      if (notes) notes.hidden = true;
    });
    ROOT.classList.remove('notes-open');
    notesButton.setAttribute('aria-pressed', 'false');
  }

  function hasNextFragment(slide) {
    if (slide.dataset.openingStep === '7') return Boolean(slide.querySelector('.opening-return.fragment:not(.revealed-once)'));
    if (slide.dataset.roleCapability === 'assist') return slide.querySelector('.mother-map')?.dataset.assistFocus !== 'qa';
    if (['exit-check', 'part2-exercise'].includes(slide.dataset.art)) {
      const current = Number(slide.dataset.exerciseStep || 0);
      const maximum = Math.max(0, ...[...slide.querySelectorAll('.exercise-step')].map(item => Number(item.dataset.exerciseOrder || 0)));
      return current < maximum;
    }
    const selector = '.fragment:not(.visible)';
    return Boolean(slide.querySelector(selector));
  }

  function syncPage(writeHash = false) {
    slides.forEach((slide, index) => {
      const active = index === pageIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    currentPage.textContent = String(pageIndex + 1);
    progressFill.style.width = `${((pageIndex + 1) / slides.length) * 100}%`;
    progressTrack.setAttribute('aria-valuenow', String(pageIndex + 1));
    previousButton.disabled = pageIndex === 0;
    nextButton.disabled = pageIndex === slides.length - 1 && !hasNextFragment(slides[pageIndex]);
    const activeChapter = chapterLinks.reduce((current, link) => {
      return Number(link.dataset.start) <= pageIndex + 1 ? link : current;
    }, chapterLinks[0]);
    chapterLinks.forEach(link => {
      const active = link === activeChapter;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `${pageIndex + 1}/${slides.length}｜${slides[pageIndex].querySelector('h1').textContent}｜Agent 101 Rev13`;
    if (writeHash && location.hash !== `#${pageIndex + 1}`) location.hash = `#${pageIndex + 1}`;
  }

  function goToPage(page, writeHash = true) {
    pageIndex = Math.max(0, Math.min(slides.length - 1, page));
    closeNotes();
    syncPage(writeHash);
  }

  function nextFragment() {
    const slide = slides[pageIndex];
    if (slide.dataset.openingStep === '7') {
      const next = [...slide.querySelectorAll('.opening-return.fragment:not(.revealed-once)')]
        .sort((a, b) => Number(a.dataset.fragmentOrder) - Number(b.dataset.fragmentOrder))[0];
      if (!next) return false;
      slide.querySelectorAll('.opening-return.visible, .opening-return.is-active').forEach(route => route.classList.remove('visible', 'is-active'));
      next.classList.add('visible', 'revealed-once', 'is-active');
      setOpeningReturnFocus(slide, next.dataset.return);
      return true;
    }
    if (slide.dataset.roleCapability === 'assist') {
      const map = slide.querySelector('.mother-map');
      if (map?.dataset.assistFocus !== 'qa') {
        map.dataset.assistFocus = 'qa';
        return true;
      }
      return false;
    }
    if (['exit-check', 'part2-exercise'].includes(slide.dataset.art)) {
      const current = Number(slide.dataset.exerciseStep || 0);
      const maximum = Math.max(0, ...[...slide.querySelectorAll('.exercise-step')].map(item => Number(item.dataset.exerciseOrder || 0)));
      if (current >= maximum) return false;
      return setExerciseStep(slide, current + 1);
    }
    const hidden = [...slide.querySelectorAll('.fragment:not(.visible)')];
    if (!hidden.length) return false;
    const order = Math.min(...hidden.map(item => Number(item.dataset.fragmentOrder || 1)));
    hidden.filter(item => Number(item.dataset.fragmentOrder || 1) === order).forEach(item => item.classList.add('visible'));
    if (slide.dataset.rev13SceneId === 'Q04') updateQaStatus(slide, Boolean(slide.querySelector('.b2-reveal.visible')));
    if (slide.dataset.art === 'agent-mode') updateAgentModeFocus(slide, order);
    if (slide.dataset.art === 'part2-principle-overview') updatePrincipleOverviewFocus(slide, order);
    nextButton.disabled = pageIndex === slides.length - 1 && !hasNextFragment(slide);
    return true;
  }

  function previousFragment() {
    const slide = slides[pageIndex];
    if (slide.dataset.openingStep === '7') {
      const current = slide.querySelector('.opening-return.fragment.visible');
      if (!current) return false;
      current.classList.remove('visible', 'revealed-once', 'is-active');
      const previous = [...slide.querySelectorAll('.opening-return.fragment.revealed-once')]
        .sort((a, b) => Number(a.dataset.fragmentOrder) - Number(b.dataset.fragmentOrder)).at(-1);
      if (previous) previous.classList.add('visible', 'is-active');
      else slide.querySelector('.opening-return:not(.fragment)')?.classList.add('is-active');
      setOpeningReturnFocus(slide, previous?.dataset.return || slide.querySelector('.opening-return:not(.fragment)')?.dataset.return || '');
      return true;
    }
    if (slide.dataset.roleCapability === 'assist') {
      const map = slide.querySelector('.mother-map');
      if (map?.dataset.assistFocus === 'qa') {
        map.dataset.assistFocus = 'review';
        return true;
      }
      return false;
    }
    if (['exit-check', 'part2-exercise'].includes(slide.dataset.art)) {
      const current = Number(slide.dataset.exerciseStep || 0);
      if (current <= 0) return false;
      return setExerciseStep(slide, current - 1);
    }
    const visible = [...slide.querySelectorAll('.fragment.visible')];
    if (!visible.length) return false;
    const order = Math.max(...visible.map(item => Number(item.dataset.fragmentOrder || 1)));
    visible.filter(item => Number(item.dataset.fragmentOrder || 1) === order).forEach(item => item.classList.remove('visible'));
    if (slide.dataset.rev13SceneId === 'Q04') updateQaStatus(slide, Boolean(slide.querySelector('.b2-reveal.visible')));
    if (slide.dataset.art === 'agent-mode') {
      const currentOrder = Math.max(0, ...[...slide.querySelectorAll('.agent-mode-step.visible')].map(item => Number(item.dataset.fragmentOrder || 0)));
      updateAgentModeFocus(slide, currentOrder);
    }
    if (slide.dataset.art === 'part2-principle-overview') {
      const currentOrder = Math.max(0, ...[...slide.querySelectorAll('.principle-risk-grid article.visible')].map(item => Number(item.dataset.fragmentOrder || 0)));
      updatePrincipleOverviewFocus(slide, currentOrder);
    }
    nextButton.disabled = false;
    return true;
  }

  function setExerciseStep(slide, order) {
    const target = slide.querySelector(`.exercise-step[data-exercise-order="${order}"]`);
    if (!target) return false;
    slide.querySelectorAll('.exercise-step.is-current').forEach(item => item.classList.remove('is-current'));
    slide.querySelectorAll('[data-exercise-card].is-current').forEach(item => item.classList.remove('is-current'));
    slide.querySelectorAll('.exercise-step.visible').forEach(item => item.classList.remove('visible'));
    target.classList.add('visible', 'revealed-once', 'is-current');
    target.closest('[data-exercise-card]')?.classList.add('is-current');
    slide.dataset.exerciseStep = String(order);
    nextButton.disabled = pageIndex === slides.length - 1 && !hasNextFragment(slide);
    return true;
  }

  function updateAgentModeFocus(slide, order) {
    slide.querySelectorAll('.agent-mode-step, .agent-mode-cell, .agent-mode-routes path').forEach(item => {
      const itemOrder = Number(item.dataset.fragmentOrder || 0);
      item.classList.toggle('is-focus', itemOrder === order && order > 0);
      item.classList.toggle('is-context', order > 0 && itemOrder < order);
    });
  }

  function updatePrincipleOverviewFocus(slide, order) {
    slide.querySelectorAll('.principle-risk-grid article').forEach(item => {
      const itemOrder = Number(item.dataset.fragmentOrder || 0);
      item.classList.toggle('is-focus', itemOrder === order && order > 0);
      item.classList.toggle('is-context', order > 0 && itemOrder !== order);
    });
  }

  function setOpeningReturnFocus(slide, kind) {
    const endpoints = {
      qa: [['QA', 'qa'], ['Dev', 'dev']],
      review: [['Reviewer', 'review'], ['Dev', 'review']],
      goal: [['PO', 'product-check'], ['PO', 'backlog']],
    }[kind] || [];
    slide.querySelectorAll('.opening-map .work-card').forEach(card => {
      const selected = endpoints.some(([role, state]) => card.dataset.role === role && card.dataset.state === state);
      card.classList.toggle('is-focus', selected);
      card.classList.toggle('is-context', !selected);
    });
  }

  function toggleNotes() {
    const slide = slides[pageIndex];
    const notes = slide.querySelector('.notes');
    const open = notes.hidden;
    closeNotes();
    if (open) {
      notes.hidden = false;
      ROOT.classList.add('notes-open');
      notesButton.setAttribute('aria-pressed', 'true');
      notes.querySelector('p')?.focus?.();
    }
  }

  previousButton.addEventListener('click', () => {
    if (!previousFragment()) goToPage(pageIndex - 1);
  });
  nextButton.addEventListener('click', () => {
    if (!nextFragment()) goToPage(pageIndex + 1);
  });
  notesButton.addEventListener('click', toggleNotes);
  chapterLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    goToPage(Number(link.dataset.start) - 1);
  }));
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    goToPage(0);
  });
  window.addEventListener('hashchange', () => {
    const page = getHashPage();
    if (page !== null && page !== pageIndex) goToPage(page, false);
  });

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const focused = document.activeElement;
    if (focused && (['INPUT', 'TEXTAREA', 'SELECT'].includes(focused.tagName) || focused.isContentEditable)) return;
    if (event.key.toLowerCase() === 'n') {
      event.preventDefault();
      toggleNotes();
    } else if (event.key === 'Escape' && ROOT.classList.contains('notes-open')) {
      closeNotes();
    } else if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      if (!nextFragment()) goToPage(pageIndex + 1);
    } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      if (!previousFragment()) goToPage(pageIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToPage(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToPage(slides.length - 1);
    }
  });

  function fitCanvas() {
    const scale = Math.min(viewport.clientWidth / 1440, viewport.clientHeight / 810);
    canvas.style.setProperty('--canvas-scale', String(Math.max(0.1, scale)));
  }
  window.addEventListener('resize', fitCanvas, { passive: true });
  fitCanvas();

  const initialPage = getHashPage();
  pageIndex = initialPage ?? 0;
  syncPage(false);
  if (initialPage === null) history.replaceState(null, '', '#1');

  // Reusable shared component for later Part 2 scenes and external authoring.
  window.renderRev13MotherMap = renderMotherMap;
  window.rev13SceneOrder = sceneIds;
})();
