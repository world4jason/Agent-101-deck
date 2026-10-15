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
  const sceneIds = slides.map(slide => slide.dataset.rev13SceneId);
  let pageIndex = 0;

  const ROLE_DATA = [
    { name: 'Owner', display: 'Owner（授權負責人）', color: 'people', example: '配對 App：決定先做哪一項' },
    { name: 'PM', display: 'PM（專案經理）', color: 'people', example: '配對 App：協調工作與交接' },
    { name: 'PO', display: 'PO（產品負責人）', color: 'people', example: '配對 App：定義單向按讚不配對' },
    { name: 'UI/UX', display: 'UI/UX（介面設計）', color: 'people', example: '配對 App：設計配對清單畫面' },
    { name: 'Dev', display: 'Dev（開發者）', color: 'people', example: '配對 App：實作雙向按讚規則' },
    { name: 'Reviewer', display: 'Reviewer（程式審查）', color: 'people', example: '配對 App：退回範圍外改動' },
    { name: 'QA', display: 'QA（品質驗證）', color: 'people', example: '配對 App：檢查單向按讚後為 0 筆' },
  ];

  const KANBAN = [
    { key: 'backlog', label: 'Backlog' },
    { key: 'ready', label: 'Ready' },
    { key: 'dev', label: 'Dev' },
    { key: 'review', label: 'Review' },
    { key: 'qa', label: 'QA' },
    { key: 'product-check', label: 'Product Check' },
    { key: 'done', label: 'Done' },
  ];
  const LOCATOR_LABELS = {
    backlog: '待整理', ready: '待接手', dev: '開發', review: '審查',
    qa: '驗證', 'product-check': '產品確認', done: '本票完成',
  };

  const STAGE_KANBAN = {
    brainstorming: ['backlog'],
    refinement: ['backlog'],
    ready: ['backlog', 'ready'],
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
      { name: 'Owner', label: '授權人', y: 153 }, { name: 'PM', label: '專案經理', y: 203 },
      { name: 'PO', label: '產品負責人', y: 253 }, { name: 'UI/UX', label: '介面設計', y: 303 },
      { name: 'Dev', label: '開發者', y: 353 }, { name: 'Reviewer', label: '程式審查', y: 403 },
      { name: 'QA', label: '品質驗證', y: 453 }, { name: 'Agent', label: 'Agent', y: 503 },
    ],
    stages: [
      { key: 'backlog', label: 'Backlog', subLabel: '待整理', x: 190, width: 140 },
      { key: 'ready', label: 'Ready', subLabel: '待接手', x: 340, width: 140 },
      { key: 'dev', label: 'Dev', subLabel: '開發中', x: 490, width: 140 },
      { key: 'review', label: 'Review', subLabel: '待審查', x: 640, width: 140 },
      { key: 'qa', label: 'QA', subLabel: '待驗證', x: 790, width: 140 },
      { key: 'product-check', label: 'Product Check', subLabel: '產品確認', x: 940, width: 160 },
      { key: 'human_gate', label: 'Human Gate', subLabel: '欄外決策', x: 1110, width: 130, outside: true },
      { key: 'done', label: 'Done', subLabel: '本票完成', x: 1250, width: 140 },
    ],
  };

  const SWIMLANE_ROLE_TASKS = {
    Owner: { 'human_gate': { decision: '放行？' } },
    PM: { backlog: { lines: ['整理問題方向'] } },
    PO: { backlog: { lines: ['拆分工作票'] }, ready: { decision: '可接手？' }, 'product-check': { decision: '符合目標？' } },
    'UI/UX': { backlog: { lines: ['規劃清單畫面'], co: true } },
    Dev: { dev: { lines: ['修改配對規則'] }, review: { lines: ['依意見修改'], co: true }, qa: { lines: ['協助重現'], co: true } },
    Reviewer: { review: { decision: '可通過？' } },
    QA: { qa: { decision: '相符？' }, 'product-check': { lines: ['核對測試紀錄'], co: true } },
    Agent: { dev: { lines: ['受委託執行'], co: true } },
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

  function renderMotherMap(options = {}) {
    const {
      spotlightZones = [], roles = [], stage = '', states = [], agent = true,
      revealFoundations = false, page = 'map', ticketPosition = '', ticketPrevious = '',
      delta = null, actualReturn = '',
    } = options;
    const uid = String(page).replace(/[^A-Za-z0-9_-]/g, '');
    const focusedRoles = new Set(roles.map(role => role === 'Human' ? 'Owner' : role));
    const focusedZones = new Set(spotlightZones);
    const stateMarkers = new Set(states);
    const stageKey = stage === 'brainstorming' || stage === 'refinement' ? 'backlog'
      : stage === 'release_done' ? 'done' : stage === 'human_gate' ? 'human_gate'
        : stage.replaceAll('_', '-');
    const reveal = order => revealFoundations ? ` fragment" data-fragment-order="${order}` : '';
    const dimZone = zone => focusedZones.size && !focusedZones.has(zone) ? ' is-dim' : '';
    const stageFill = key => key === stageKey || stateMarkers.has(key) ? ' is-focus' : stageKey ? ' is-dim' : '';
    const boardStages = SWIMLANE_LAYOUT.stages.filter(column => !column.outside);
    const stageHeaders = boardStages.map((column, index) => {
      const center = column.x + column.width / 2;
      const classes = `swimlane-stage${stageFill(column.key)}`;
      const header = `${svgRect(column.x + 4, 50, column.width - 8, 53, '#172325', '#3c5550', 4, 'swimlane-stage-box')}<text x="${center}" y="72" class="swimlane-stage-label" text-anchor="middle">${esc(column.label)}</text><text x="${center}" y="94" class="swimlane-stage-note" text-anchor="middle">${esc(column.subLabel)}</text>`;
      const next = boardStages[index + 1];
      const arrow = next ? `<path class="swimlane-forward" d="M${column.x + column.width} 106 H${next.x - 4}" marker-end="url(#swimlane-arrow-${uid})"/>` : '';
      return `<g class="${classes}" data-state="${column.key}">${header}${arrow}</g>`;
    }).join('');
    const gateHeader = `<g class="swimlane-outside-gate${stageKey === 'human_gate' ? ' is-focus' : ''}" data-state="human_gate"><polygon class="swimlane-gate" points="1175,119 1187,132 1175,145 1163,132"/><text x="1194" y="137" class="swimlane-stage-label swimlane-gate-label" text-anchor="start">Human Gate · 欄外授權</text></g>`;

    const activities = `<g class="swimlane-activity"><rect x="190" y="15" width="290" height="30" rx="4"/><text x="335" y="36" text-anchor="middle">問題釐清／拆分工作（活動）</text></g>`;
    const roleGuides = SWIMLANE_LAYOUT.roles.map(({ name, label, y }) => {
      if (name === 'Agent' && !agent) return `<g class="swimlane-lane is-reserved" aria-hidden="true"><path class="swimlane-row-line" d="M170 ${y + 25} H1550"/></g>`;
      const isNew = name === 'Agent' && page === '2';
      const displayLabel = isNew ? 'Agent' : label;
      const roleDim = !!roles.length && !focusedRoles.has(name) && !(name === 'Agent' && focusedZones.has('agent'));
      return `<g class="swimlane-lane lane-${name.replace(/[^A-Za-z0-9]/g, '').toLowerCase()}${roleDim ? ' is-dim' : ''}${isNew ? ' is-new' : ''}" data-role="${esc(name)}"><path class="swimlane-row-line" d="M170 ${y + 25} H1550"/><text class="swimlane-role-label" x="18" y="${y + 6}">${esc(displayLabel)}</text></g>`;
    }).join('');

    const roleContent = SWIMLANE_LAYOUT.roles.map(({ name, y }) => {
      if (name === 'Agent' && !agent) return '';
      const isNew = name === 'Agent' && page === '2';
      const roleDim = !!roles.length && !focusedRoles.has(name) && !(name === 'Agent' && focusedZones.has('agent'));
      const tasks = { ...(SWIMLANE_ROLE_TASKS[name] || {}) };
      if (name === 'Owner') tasks.backlog = { start: ['提出配對點子'] };
      return Object.entries(tasks).map(([key, item]) => {
        const x = item.start ? 190 : SWIMLANE_X[key];
        if (!x) return '';
        if (item.decision) {
          const width = key === 'human_gate' ? 116 : 132;
          const height = 48;
          return `<g class="swimlane-node decision-node${roleDim ? ' is-dim' : ''}${key === 'human_gate' ? ' is-human-gate' : ''}${key === stageKey ? ' is-focus' : ''}" data-role="${esc(name)}" data-decision="${esc(key)}"><polygon points="${x},${y - height / 2} ${x + width / 2},${y} ${x},${y + height / 2} ${x - width / 2},${y}"/><text x="${x}" y="${y + 6}" text-anchor="middle">${esc(item.decision)}</text></g>`;
        }
        if (item.start || item.end) {
          const isEnd = Boolean(item.end);
          const nodeX = isEnd ? x - 64 : x - 64;
          const text = item.start || item.end;
          return `<g class="swimlane-endpoint${roleDim ? ' is-dim' : ''}${isEnd ? ' is-end' : ''}"><rect x="${nodeX}" y="${y - 18}" width="128" height="36" rx="18"/><text x="${x}" y="${y + 5}" text-anchor="middle">${esc(text[0])}</text></g>`;
        }
        const width = 132;
        const height = 38;
        const lead = !item.co;
        const agentArrow = name === 'Agent' && key === 'dev'
          ? `<path class="swimlane-delegation" d="M${x} ${y - 25} V${SWIMLANE_Y.Dev + 25}" marker-end="url(#swimlane-arrow-agent-${uid})"/>`
          : '';
        return `${agentArrow}<g class="swimlane-node ${lead ? 'is-lead' : 'is-co'}${roleDim ? ' is-dim' : ''}${name === 'Agent' && isNew ? ' is-new' : ''}" data-role="${esc(name)}" data-state="${esc(key)}">${svgRect(x - width / 2, y - height / 2, width, height, lead ? '#2b3023' : '#172322', lead ? '#a28755' : '#59746a', 4, 'swimlane-card')}<text x="${x}" y="${y + 6}" text-anchor="middle">${esc(item.lines.join(' · '))}</text></g>`;
      }).join('');
    }).join('');

    const showOverviewReturns = !stage && ['1', '2', '8'].includes(String(page));
    const returnPaths = [
      ...(showOverviewReturns || actualReturn === 'review' ? [`<g class="swimlane-return${actualReturn === 'review' ? ' is-active' : ''}"><path d="M710 427 V466 H690 M490 466 H478 V371 H492" marker-end="url(#swimlane-arrow-return-${uid})"/><rect x="490" y="435" width="200" height="26" rx="3"/><text x="590" y="453" text-anchor="middle">審查要求修改 → Dev</text></g>`] : []),
      ...(showOverviewReturns || actualReturn === 'qa' ? [`<g class="swimlane-return${actualReturn === 'qa' ? ' is-active' : ''}"><path d="M860 477 V518 H850 M640 518 H642 V371 H628" marker-end="url(#swimlane-arrow-return-${uid})"/><rect x="650" y="484" width="200" height="26" rx="3"/><text x="750" y="502" text-anchor="middle">測試 FAIL → Dev</text></g>`] : []),
      ...(showOverviewReturns || actualReturn === 'goal' ? [`<g class="swimlane-return${actualReturn === 'goal' ? ' is-active' : ''}"><path d="M1020 277 V309 H810 M540 309 H344 V253 H328" marker-end="url(#swimlane-arrow-return-${uid})"/><rect x="540" y="278" width="270" height="26" rx="3"/><text x="675" y="296" text-anchor="middle">目標未達 → 回需求釐清</text></g>`] : []),
      ...(actualReturn === 'gate' ? [`<g class="swimlane-return is-active is-human-return"><path d="M1233 153 H1260 V236 H1088" marker-end="url(#swimlane-arrow-return-${uid})"/><rect x="1274" y="250" width="200" height="28" rx="3"/><text x="1374" y="269" text-anchor="middle">指定補做者</text></g>`] : []),
    ].join('');

    const docs = [
      { key: 'backlog', label: '產品目標', status: '待確認' },
      { key: 'ready', label: '工作票', status: '待交接' },
      { key: 'dev', label: '工作紀錄', status: '進行中' },
      { key: 'review', label: '審查意見', status: '待處理' },
      { key: 'qa', label: '測試紀錄', status: '待驗證' },
      { key: 'product-check', label: '目標對照', status: '待確認' },
      { key: 'human_gate', label: '放行決定', status: '待人判斷' },
      { key: 'done', label: '交付紀錄', status: '待完成' },
    ];
    const docStage = delta?.docStage || '';
    const docNodes = docs.map(({ key, label, status }) => {
      const x = SWIMLANE_X[key];
      const isChanged = key === docStage;
      const currentLabel = isChanged ? (delta.docLabel || label) : label;
      const currentStatus = isChanged ? (delta.docStatus || status) : status;
      const stageClass = key === stageKey ? ' is-focus' : stageKey ? ' is-dim' : '';
      const width = key === 'human_gate' ? 118 : key === 'product-check' ? 152 : 132;
      const left = x - width / 2;
      const right = x + width / 2;
      return `<g class="swimlane-doc-node${isChanged ? ' is-changed' : ''}${stageClass}" data-state="${key}"><path class="swimlane-doc-card" d="M${left} 540 H${right - 14} L${right} 554 V584 H${left} Z"/><path class="swimlane-doc-fold" d="M${right - 14} 540 V554 H${right}"/><text class="swimlane-doc-name" x="${x}" y="559" text-anchor="middle">${esc(currentLabel)}</text><text class="swimlane-doc-status" x="${x}" y="578" text-anchor="middle">${esc(currentStatus)}</text></g>`;
    }).join('');
    const versions = [
      { key: 'dev', label: 'Branch', status: '隔離修改' },
      { key: 'review', label: 'Commit', status: '記錄變更' },
      { key: 'qa', label: 'PR', status: '待審／核對' },
      { key: 'human_gate', label: 'Merge', status: '需授權' },
    ];
    const versionStage = delta?.versionStage || '';
    const versionXs = versions.map(item => SWIMLANE_X[item.key]);
    const versionLinks = versionXs.slice(0, -1).map((x, index) => `<path class="swimlane-version-link" d="M${x + 10} 624 H${versionXs[index + 1] - 12}" marker-end="url(#swimlane-arrow-${uid})"/>`).join('');
    const versionNodes = versions.map(({ key, label, status }) => {
      const x = SWIMLANE_X[key];
      const isChanged = key === versionStage;
      const currentLabel = isChanged ? (delta.versionLabel || label) : label;
      const currentStatus = isChanged ? (delta.versionStatus || status) : status;
      const stageClass = key === stageKey ? ' is-focus' : stageKey ? ' is-dim' : '';
      return `<g class="swimlane-version-node${isChanged ? ' is-changed' : ''}${stageClass}" data-state="${key}"><circle class="swimlane-version-dot" cx="${x}" cy="624" r="9"/><text class="swimlane-version-name" x="${x}" y="654" text-anchor="middle">${esc(currentLabel)}</text><text class="swimlane-version-status" x="${x}" y="675" text-anchor="middle">${esc(currentStatus)}</text></g>`;
    }).join('');
    const legend = String(page) === '64' ? '' : `<g class="swimlane-legend"><path d="M18 696 H1582" class="swimlane-legend-rule"/><rect x="26" y="708" width="44" height="24" rx="12" class="swimlane-legend-endpoint"/><text x="80" y="727">起點／終點</text><rect x="250" y="708" width="42" height="24" rx="4" class="swimlane-legend-lead"/><text x="302" y="727">主責</text><rect x="410" y="708" width="42" height="24" rx="4" class="swimlane-legend-co"/><text x="462" y="727">協作</text><polygon points="575,708 590,720 575,732 560,720" class="swimlane-legend-decision"/><text x="602" y="727">判斷</text><path d="M700 720 H754" class="swimlane-legend-forward" marker-end="url(#swimlane-arrow-${uid})"/><text x="764" y="727">前進</text><path d="M870 720 H924" class="swimlane-legend-return" marker-end="url(#swimlane-arrow-return-${uid})"/><text x="934" y="727">退回</text></g>`;
    const principleMarkers = String(page) === '64' ? `<g class="principle-map-markers" aria-label="五項原則在母圖上的對應位置">
      <path class="principle-map-leader" d="M1094 253 H1052"/>
      <path class="principle-map-leader" d="M676 503 H635"/>
      <path class="principle-map-leader" d="M132 378 H94"/>
      <path class="principle-map-leader" d="M778 469 V534 H842"/>
      <g class="principle-map-point"><circle cx="354" cy="550" r="12"/><text x="354" y="556">1</text></g>
      <g class="principle-map-point"><circle cx="692" cy="503" r="12"/><text x="692" y="509">2</text></g>
      <g class="principle-map-point"><circle cx="148" cy="378" r="12"/><text x="148" y="384">3</text></g>
      <g class="principle-map-point"><circle cx="778" cy="453" r="12"/><text x="778" y="459">4</text></g>
      <g class="principle-map-point"><circle cx="1110" cy="253" r="12"/><text x="1110" y="259">5</text></g>
      <path d="M18 696 H1582" class="principle-map-rule"/>
      <g class="principle-map-key"><circle cx="32" cy="723" r="12"/><text x="32" y="729">1</text><text x="52" y="730">工作票：記下進度與未測</text></g>
      <path d="M326 704 V741" class="principle-map-separator"/>
      <g class="principle-map-key"><circle cx="342" cy="723" r="12"/><text x="342" y="729">2</text><text x="362" y="730">Agent：只在核准範圍內執行</text></g>
      <path d="M638 704 V741" class="principle-map-separator"/>
      <g class="principle-map-key"><circle cx="654" cy="723" r="12"/><text x="654" y="729">3</text><text x="674" y="730">角色：實作、審查、驗證分開</text></g>
      <path d="M950 704 V741" class="principle-map-separator"/>
      <g class="principle-map-key"><circle cx="966" cy="723" r="12"/><text x="966" y="729">4</text><text x="986" y="730">QA：獨立核對並留測試紀錄</text></g>
      <path d="M1262 704 V741" class="principle-map-separator"/>
      <g class="principle-map-key"><circle cx="1278" cy="723" r="12"/><text x="1278" y="729">5</text><text x="1298" y="730">產品確認：回到目標再決定</text></g>
    </g>` : '';

    return `<div class="mother-map" data-mother-map-id="rev13-four-foundations" data-stage="${esc(stage)}"><svg class="swimlane-svg" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="swimlane-title-${uid} swimlane-desc-${uid}"><title id="swimlane-title-${uid}">人、流程、文件與版本管理泳道圖</title><desc id="swimlane-desc-${uid}">流程沿橫向七個看板狀態前進；人依責任分泳道，下方依序記錄文件與版本管理。人類授權以欄外菱形表示，三條虛線表示主要退回方向。</desc><defs><marker id="swimlane-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#8faaa1"/></marker><marker id="swimlane-arrow-return-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#85918a"/></marker><marker id="swimlane-arrow-agent-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#d78d78"/></marker></defs><g class="swimlane-process"><text class="swimlane-axis-label" x="18" y="82">流程（X 軸）</text>${activities}${stageHeaders}${gateHeader}<g class="swimlane-axis-line">${SWIMLANE_LAYOUT.stages.filter(item => !item.outside).map(item => `<line x1="${item.x}" y1="110" x2="${item.x + item.width}" y2="110"/>`).join('')}</g></g><g class="swimlane-people${dimZone('people')}${reveal(1)}"><text class="swimlane-group-label" x="18" y="136">人（Y 軸）</text>${roleGuides}${roleContent}${returnPaths}</g><g class="swimlane-documents${dimZone('documents')}${reveal(2)}"><path class="swimlane-section-rule" d="M170 532 H1550"/><text class="swimlane-group-label" x="18" y="562">文件</text>${docNodes}</g><g class="swimlane-version${dimZone('version')}${reveal(3)}"><path class="swimlane-section-rule is-heavy" d="M170 596 H1550"/><text class="swimlane-group-label" x="18" y="632">版本管理</text>${versionLinks}${versionNodes}</g>${legend}${principleMarkers}</svg></div>`;
  }

  function renderOpeningMap(slide) {
    const step = Number(slide.dataset.openingStep || 1);
    const uid = `opening-${slide.dataset.page}`;
    const showProcess = step >= 3;
    const showPeople = step >= 4;
    const showDocuments = step >= 5;
    const showVersions = step >= 6;
    const showCard = step >= 7;
    const showReturns = step >= 8;
    const dim = zone => {
      if (step === 3 && zone !== 'process') return ' is-dim';
      if (step === 4 && zone !== 'people') return ' is-dim';
      if (step === 5 && zone !== 'documents') return ' is-dim';
      if (step === 6 && zone !== 'version') return ' is-dim';
      return '';
    };
    const roleRows = SWIMLANE_LAYOUT.roles
      .filter(({ name }) => step >= 2 || name !== 'Agent')
      .map(({ name, y }) => {
      const isAgent = name === 'Agent';
      const highlightedAgent = step === 2 && isAgent;
      const label = showPeople
        ? ({ Owner: '定方向、授權', PM: '協調節奏', PO: '定需求與驗收', 'UI/UX': '設計介面', Dev: '修改程式', Reviewer: '審查修改', QA: '獨立驗證', Agent: '依交辦執行' }[name])
        : (isAgent && step >= 2 ? 'Agent' : '');
      const roleLabel = { Owner: '授權人', PM: '專案經理', PO: '產品負責人', 'UI/UX': '介面設計', Dev: '開發者', Reviewer: '程式審查', QA: '品質驗證', Agent: 'Agent' }[name];
      const dutyX = { Owner: 1175, PM: 405, PO: 405, 'UI/UX': 260, Dev: 560, Reviewer: 710, QA: 860, Agent: 560 }[name];
      const duty = showPeople && step === 4 ? `<text class="opening-role-duty" x="${dutyX}" y="${y + 6}" text-anchor="middle">${esc(label)}</text>` : '';
      const agentPurpose = highlightedAgent ? `<g class="opening-agent-purpose"><rect x="425" y="${y - 25}" width="270" height="50" rx="5"/><text x="560" y="${y + 7}" text-anchor="middle">接工作票，依交辦執行</text></g>` : '';
      return `<g class="opening-role${highlightedAgent ? ' is-new' : ''}" data-role="${esc(name)}"><path d="M170 ${y + 25} H1550"/><text class="opening-role-name" x="18" y="${y + 6}">${showPeople ? esc(roleLabel) : (isAgent && step >= 2 ? 'Agent' : '')}</text>${duty}${agentPurpose}</g>`;
    }).join('');
    const processStages = SWIMLANE_LAYOUT.stages.filter(item => !item.outside);
    const stageHeaders = showProcess ? processStages.map((column, index) => {
      const center = column.x + column.width / 2;
      const next = processStages[index + 1];
      const arrow = next ? `<path class="opening-forward" d="M${column.x + column.width} 109 H${next.x - 5}" marker-end="url(#opening-arrow-${uid})"/>` : '';
      return `<g class="opening-stage" data-state="${column.key}"><rect x="${column.x + 4}" y="53" width="${column.width - 8}" height="49" rx="4"/><text x="${center}" y="76" text-anchor="middle">${esc(column.label)}</text><text class="opening-stage-note" x="${center}" y="96" text-anchor="middle">${esc(column.subLabel)}</text>${arrow}</g>`;
    }).join('') : '';
    const activity = showProcess ? `<g class="opening-activity"><rect x="190" y="15" width="430" height="30" rx="4"/><text x="405" y="36" text-anchor="middle">Brainstorming／Refinement 活動</text></g>` : '';
    const outsideGate = showProcess ? `<g class="opening-gate"><polygon points="1175,119 1187,132 1175,145 1163,132"/><text x="1195" y="138">Human Gate · 欄外授權</text></g>` : '';
    const docs = [
      { x: SWIMLANE_X.backlog, label: 'Goal Issue', purpose: '待建立' },
      { x: SWIMLANE_X.dev, label: '工作票＋驗收', purpose: '待交接' },
      { x: SWIMLANE_X.qa, label: '測試紀錄', purpose: '待驗證' },
      { x: SWIMLANE_X.done, label: '放行紀錄', purpose: '待決定' },
    ];
    const docNodes = showDocuments ? docs.map(({ x, label, purpose }) => {
      const width = 148, left = x - width / 2, right = x + width / 2;
      const highlight = showCard && x === SWIMLANE_X.dev ? ' is-highlighted' : '';
      return `<g class="opening-doc${highlight}"><path d="M${left} 540 H${right - 13} L${right} 553 V587 H${left} Z"/><path d="M${right - 13} 540 V553 H${right}"/><text x="${x}" y="560" text-anchor="middle">${esc(label)}</text><text class="opening-doc-purpose" x="${x}" y="580" text-anchor="middle">${esc(purpose)}</text></g>`;
    }).join('') : '';
    const versionData = [
      { x: SWIMLANE_X.dev, label: 'Branch', purpose: '隔離修改' },
      { x: 655, label: 'Commit', purpose: '已記變更' },
      { x: 760, label: 'PR', purpose: '待審查' },
      { x: SWIMLANE_X.done, label: 'Merge', purpose: '待授權' },
    ];
    const versionLinks = showVersions ? versionData.slice(0, -1).map((node, index) => `<path class="opening-version-link" d="M${node.x + 10} 625 H${versionData[index + 1].x - 12}" marker-end="url(#opening-arrow-version-${uid})"/>`).join('') : '';
    const versions = showVersions ? versionData.map(({ x, label, purpose }) => `<g class="opening-version-node${showCard && label === 'Branch' ? ' is-highlighted' : ''}"><circle cx="${x}" cy="625" r="10"/><text class="opening-version-name" x="${x}" y="654" text-anchor="middle">${esc(label)}</text><text class="opening-version-purpose" x="${x}" y="678" text-anchor="middle">${esc(purpose)}</text></g>`).join('') : '';
    const card = showCard ? `<g class="opening-work-card"><rect x="${SWIMLANE_X.dev - 72}" y="329" width="144" height="34" rx="4"/><text x="${SWIMLANE_X.dev}" y="351" text-anchor="middle">Dev｜修改配對規則</text></g>` : '';
    const decisions = showReturns ? `<g class="opening-decision"><polygon points="${SWIMLANE_X.review},383 ${SWIMLANE_X.review + 20},403 ${SWIMLANE_X.review},423 ${SWIMLANE_X.review - 20},403"/><text x="${SWIMLANE_X.review}" y="408" text-anchor="middle">修改？</text></g><g class="opening-decision"><polygon points="${SWIMLANE_X.qa},433 ${SWIMLANE_X.qa + 20},453 ${SWIMLANE_X.qa},473 ${SWIMLANE_X.qa - 20},453"/><text x="${SWIMLANE_X.qa}" y="458" text-anchor="middle">FAIL？</text></g><g class="opening-decision"><polygon points="${SWIMLANE_X['product-check']},233 ${SWIMLANE_X['product-check'] + 20},253 ${SWIMLANE_X['product-check']},273 ${SWIMLANE_X['product-check'] - 20},253"/><text x="${SWIMLANE_X['product-check']}" y="258" text-anchor="middle">Goal？</text></g>` : '';
    const workLinks = showCard && !showReturns ? `<g class="opening-work-link"><path d="M${SWIMLANE_X.dev} 363 V532" marker-end="url(#opening-arrow-${uid})"/><path d="M${SWIMLANE_X.dev} 587 V615" marker-end="url(#opening-arrow-version-${uid})"/></g>` : '';
    const returns = showReturns ? `<g class="opening-return">
      <g class="fragment" data-fragment-order="1"><path d="M1020 273 V309 H812 M538 309 H344 V253 H328" marker-end="url(#opening-return-arrow-${uid})"/><rect x="538" y="278" width="274" height="26" rx="3"/><text x="675" y="296" text-anchor="middle">目標未達 → 回需求釐清</text></g>
      <g class="fragment" data-fragment-order="2"><path d="M710 423 V463 H690 M488 463 H478 V371 H492" marker-end="url(#opening-return-arrow-${uid})"/><rect x="488" y="433" width="202" height="26" rx="3"/><text x="589" y="451" text-anchor="middle">審查要求修改 → Dev</text></g>
      <g class="fragment" data-fragment-order="3"><path d="M860 473 V518 H852 M638 518 H642 V371 H628" marker-end="url(#opening-return-arrow-${uid})"/><rect x="638" y="484" width="214" height="26" rx="3"/><text x="745" y="502" text-anchor="middle">測試 FAIL → Dev</text></g>
    </g>` : '';
    const skeletonPrompts = step <= 2 ? `<g class="opening-skeleton-prompts" aria-label="四個區域各自回答的問題">
      <g class="opening-prompt-process"><text class="opening-prompt-name" x="220" y="84">流程</text><text class="opening-prompt-question" x="345" y="84">做到哪？</text></g>
      <g class="opening-prompt-people"><text class="opening-prompt-name" x="220" y="180">人</text><text class="opening-prompt-question" x="275" y="180">誰做？</text></g>
      <g class="opening-prompt-documents"><text class="opening-prompt-name" x="220" y="571">文件</text><text class="opening-prompt-question" x="345" y="571">根據什麼、怎麼驗？</text></g>
      <g class="opening-prompt-version"><text class="opening-prompt-name" x="220" y="655">版本管理</text><text class="opening-prompt-question" x="400" y="655">改的是哪一版？</text></g>
    </g>` : '';
    const personLane = `<g class="opening-map-zone opening-people${dim('people')}"><text class="opening-zone-label" x="18" y="136">人（泳道）</text>${roleRows}${card}${workLinks}${decisions}${returns}</g>`;
    const processLane = `<g class="opening-map-zone opening-process${dim('process')}"><text class="opening-zone-label" x="18" y="82">流程（X 軸）</text>${activity}${stageHeaders}${outsideGate}<g class="opening-axis-guides">${processStages.map(item => `<line x1="${item.x}" y1="112" x2="${item.x + item.width}" y2="112"/>`).join('')}</g></g>`;
    const documentsLane = `<g class="opening-map-zone opening-documents${dim('documents')}"><path class="opening-divider" d="M170 532 H1550"/><text class="opening-zone-label" x="18" y="562">文件</text>${docNodes}</g>`;
    const versionLane = `<g class="opening-map-zone opening-version${dim('version')}"><path class="opening-divider is-strong" d="M170 596 H1550"/><text class="opening-zone-label" x="18" y="632">版本管理</text>${versionLinks}${versions}</g>`;
    return `<div class="full-map-wrap opening-map"><svg class="swimlane-svg" viewBox="0 0 1600 780" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">同一張泳道骨架逐步展開</title><desc id="${uid}-desc">流程、人、文件和版本管理依序加入；卡片與下方文件、版本節點對齊，判斷以欄外菱形和退回路徑表示。</desc><defs><marker id="opening-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#8ba69c"/></marker><marker id="opening-return-arrow-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#e6aa8f"/></marker><marker id="opening-arrow-version-${uid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0 L10 4 L0 8 Z" fill="#92a9d4"/></marker></defs><rect class="opening-panel opening-panel-process" x="170" y="15" width="1380" height="105" rx="5"/><rect class="opening-panel opening-panel-people" x="170" y="130" width="1380" height="393" rx="5"/><rect class="opening-panel opening-panel-documents" x="170" y="540" width="1380" height="48" rx="3"/><rect class="opening-panel opening-panel-version" x="170" y="600" width="1380" height="95" rx="3"/>${processLane}${personLane}${documentsLane}${versionLane}${skeletonPrompts}</svg></div>`;
  }

  function locator(slide) {
    const stage = slide.dataset.focusStage || '';
    const page = Number(slide.dataset.page);
    const rewindSegment = page >= 54 && page <= 63;
    const roleNames = (slide.dataset.focusRolesMap || slide.dataset.focusRoles || '').split(',').map(role => role.trim()).filter(Boolean).map(role => role === 'Human' ? 'Owner' : role);
    const roleSummary = roleNames.length > 4 ? '本頁角色' : (roleNames.length ? roleNames.join(' · ') : '所有泳道');
    const selected = new Set(STAGE_KANBAN[stage] || []);
    const markers = new Set((slide.dataset.stateMarkers || '').split(',').filter(Boolean));
    const stateMarkup = item => {
      const active = selected.has(item.key) || markers.has(item.key) || (stage === 'release_done' && item.key === 'done');
      const previous = slide.dataset.ticketPrevious === item.key;
      const currentTicket = slide.dataset.ticketPosition === item.key;
      return `<span class="locator-state${active ? ' is-current' : ''}${previous ? ' is-ghost' : ''}${currentTicket ? ' has-ticket' : ''}" data-state="${item.key}"${active ? ' aria-current="step"' : ''}>${esc(LOCATOR_LABELS[item.key] || item.label)}</span>`;
    };
    const stageStates = KANBAN.map((item, index) => `${index === 6 ? `<span class="locator-gate${stage === 'human_gate' ? ' is-current' : ''}" data-state="human_gate"><i aria-hidden="true"></i><b>授權決定</b></span>` : ''}${stateMarkup(item)}`).join('');
    const rewind = rewindSegment ? '<span class="locator-rewind">回看第一次測時</span>' : '';
    return `<aside class="map-locator" aria-label="流程泳道定位" data-mother-map-id="rev13-four-foundations"><span class="locator-heading">流程</span><div class="locator-board" role="list" aria-label="七欄看板與欄外 Human Gate">${stageStates}</div><span class="locator-focus"><b>焦點泳道</b><span>${esc(roleSummary)}</span><i class="locator-focus-band" aria-hidden="true"></i>${rewind}</span></aside>`;
  }

  function renderKanbanDiagram(slide) {
    return `<div class="full-map-wrap">${renderMotherMap({ stage: slide.dataset.focusStage || 'refinement', roles: (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean), page: slide.dataset.page, agent: true })}</div>`;
  }

  function renderStageAnatomy(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field anatomy-field">
        <div class="goal-target">
          <article class="fragment" data-fragment-order="1"><span>Goal · 配對 App 想達到什麼？</span><strong>互相按讚後，在配對清單找到對方。</strong></article>
          <span class="goal-target-separator fragment" data-fragment-order="2" aria-hidden="true">≠</span>
          <article class="fragment" data-fragment-order="2"><span>Stage Target · 本站要完成什麼？</span><strong>釐清單向按讚會不會建立配對。</strong></article>
        </div>
        <div class="contract-flow">
          <article class="contract-node fragment" data-fragment-order="3"><span>Input · 已知什麼？</span><strong>小安按 Like，小晴尚未按。</strong></article>
          <span class="diagram-arrow fragment" data-fragment-order="4" aria-hidden="true">→</span>
          <article class="contract-node active fragment" data-fragment-order="4"><span>Activities · 要做什麼？</span><strong>比較單向、互按與重複按讚。</strong><div class="app-like-mock" aria-label="配對 App 按讚畫面示意"><span>小晴</span><b>♡ Like</b><em>尚未配對</em></div></article>
          <span class="diagram-arrow fragment" data-fragment-order="5" aria-hidden="true">→</span>
          <article class="contract-node fragment" data-fragment-order="5"><span>Output · 留下什麼？</span><strong>規則工作票、驗收條件與測法。</strong></article>
        </div>
        <div class="anatomy-bottom">
          <article class="exit-node fragment" data-fragment-order="6"><span>Exit Criteria · 何時能交棒？</span><strong>PO 寫清工作與條件，Dev、QA 能接手。</strong></article>
          <article class="people-github-node fragment" data-fragment-order="7"><span>People · 誰負責？</span><strong>PO 寫條件；產物留在 Issue，版本之後連到 Branch／PR。</strong></article>
        </div>
      </div>
    </div>`;
  }

  function renderRolesOverview(slide) {
    const cards = ROLE_DATA.map((role, index) => `
      <article class="role-card role-card-${index + 1}" data-role="${esc(role.name)}">
        <span class="role-orbit" aria-hidden="true"></span>
        <strong>${esc(role.display)}</strong><p><span>${esc(RESPONSIBILITY[role.name])}</span><span>${esc(role.example)}</span></p>
      </article>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field roles-field">
        <div class="workflow-anchor"><span>一張工作票</span><strong>目標 → 工作 → 證據 → 人的決策</strong></div>
        <div class="role-constellation">
          <svg class="role-spokes" viewBox="0 0 1100 330" preserveAspectRatio="none" aria-hidden="true">
          <path d="M550 0 V12 M137 12 H962 M137 12 V18 M412 12 V18 M687 12 V18 M962 12 V18" />
          </svg>
          ${cards}
        </div>
        <div class="role-distinction"><b>角色 ≠ 人員</b><span>一人可兼任多職能；實作者不自行驗收，放行由授權人決定。</span></div>
      </div>
    </div>`;
  }

  function renderRolesStages(slide) {
    return `<div class="full-map-wrap">${renderMotherMap({
      spotlightZones: (slide.dataset.focusZones || '').split(',').filter(Boolean),
      stage: slide.dataset.focusStage || 'refinement',
      roles: (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean),
      page: slide.dataset.page,
      agent: true,
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
        <div class="relation-lane github-collab-lane">
          <span class="lane-label">GitHub 協作軌</span>
          <article><b>Issue</b><small>需求、決議、工作票</small></article>
          <article><b>Project</b><small>看板欄位與工作狀態</small></article>
          <article class="pr-bridge"><b>Pull Request</b><small>版本差異、Review、Checks</small></article>
          <article><b>Review</b><small>審查意見與處置</small></article>
        </div>
        <div class="track-intersection" aria-label="Pull Request 連到Commit">
          <span class="track-link" aria-hidden="true"></span>
          <span class="track-link-label">PR 對照Commit</span>
        </div>
        <div class="relation-lane git-version-lane">
          <span class="lane-label">Git 版本軌</span>
          <article><b>Git Repo</b><small>檔案版本歷史</small></article>
          <article><b>Branch</b><small>隔離版本修改</small></article>
          <article><b>Commit</b><small>保存修改節點</small></article>
          <article><b>Merge</b><small>整合核准變更</small></article>
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
          <text x="110" y="335" text-anchor="middle">Repo 主線</text><text x="250" y="335" text-anchor="middle">Branch</text>
          <text x="420" y="111" text-anchor="middle">Commit</text><text x="540" y="111" text-anchor="middle">更多修改</text>
          <text x="650" y="78" text-anchor="middle">PR／Review</text><text x="735" y="335" text-anchor="middle">Merge</text>
          <text class="recovery-node-label" x="870" y="255" text-anchor="middle">回復紀錄</text>
          <text class="recovery-label" x="870" y="402" text-anchor="middle">新增回復紀錄，保留既有版本歷史</text>
        </svg>
        <div class="history-legend"><span><i class="legend-main"></i>既有版本</span><span><i class="legend-branch"></i>改動分支</span><span><i class="legend-pr"></i>PR／Review</span><span><i class="legend-recovery"></i>回復路徑</span></div>
      </div>
    </div>`;
  }

  function renderAgentPrimer(slide) {
    const terms = [
      { title: 'Chat', text: '互動介面' },
      { title: 'Session', text: '一次工作脈絡' },
      { title: 'Agent', text: '依指示使用工具的執行者' },
      { title: 'Workflow', text: '多步工作流程' },
    ];
    const termCards = terms.map(term => `<article class="agent-term"><strong>${term.title}</strong><span>${term.text}</span></article>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field agent-primer-field">
        <div class="agent-terms fragment" data-fragment-order="1" aria-label="四個不同概念">${termCards}</div>
        <div class="agent-work-path fragment" data-fragment-order="2">
          <article><span>人類交辦</span><strong>票／範圍／停止條件</strong></article>
          <i aria-hidden="true">→</i><article class="agent-executor"><span>Agent 執行／協調</span><strong>在授權內完成指定工作</strong></article>
          <i aria-hidden="true">→</i><article><span>人類判斷</span><strong>審查、驗證與放行</strong></article>
        </div>
      </div>
    </div>`;
  }

  function renderStageCard(slide, stageKey) {
    const data = STAGES[stageKey];
    if (!data) return '<p class="render-error">Stage data unavailable.</p>';
    const notes = slide.querySelector('.notes');
    const detail = document.createElement('p');
    detail.innerHTML = `<strong>Stage Card 補充：</strong>${esc([
      `完整產出：${data.output}`, `狀態變化：${data.stateChange}`,
      `交接：${data.交接}`, `GitHub：${data.github}`,
      ...(data.outputNote ? [`證據界線：${data.outputNote}`] : []),
    ].join('；'))}`;
    notes.append(detail);
    const activities = data.activities.map(activity => `<li>${esc(activity)}</li>`).join('');
    const leads = data.lead.map(person => `<span class="role-chip is-lead" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const collaborators = data.co.map(person => `<span class="role-chip is-co" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const nextStage = data.nextStage || 'Done';
    const conciseOutput = {
      refinement: 'Parent／Child Tickets、Scope、AC／AT、預期 Evidence',
      release_done: '完成交付的紀錄；實際交付後才標 Done',
    }[stageKey] || data.output;
    return `<div class="focus-compose stage-compose">${locator(slide)}
      <div class="diagram-field stage-panel">
        <div class="stage-goal-target">
          <article><span>Product Goal reference</span><strong>${esc(data.goal)}</strong></article>
          <article class="target-card"><span>Stage Target</span><strong>${esc(data.target)}</strong></article>
        </div>
        <div class="stage-handoff-flow" aria-label="Input、本站 Activities、Output 與下一站">
          <article class="stage-flow-card stage-input fragment" data-fragment-order="1"><span>Input</span><strong>${esc(data.input)}</strong></article>
          <span class="stage-flow-arrow fragment" data-fragment-order="1" aria-hidden="true">→</span>
          <section class="stage-activities fragment" data-fragment-order="1"><h2>Activities</h2><ul>${activities}</ul></section>
          <span class="stage-flow-arrow fragment" data-fragment-order="2" aria-hidden="true">→</span>
          <article class="stage-flow-card stage-output fragment" data-fragment-order="2"><span>Output</span><strong>${esc(conciseOutput)}</strong></article>
          <div class="stage-next fragment" data-fragment-order="2"><span aria-hidden="true">→</span><strong>${esc(nextStage)}</strong></div>
        </div>
        <div class="stage-transition fragment" data-fragment-order="2"><span>狀態變化</span><strong>${esc(data.stateChange)}</strong></div>
        <div class="stage-bottom-row">
          <section class="stage-people fragment" data-fragment-order="3"><h2>People</h2><div class="role-chip-list">${leads}${collaborators}</div><p><span class="people-key lead-key">主責</span><span class="people-key co-key">協作</span></p></section>
          <article class="stage-exit fragment" data-fragment-order="3"><span>Exit Criteria</span><strong>${esc(data.exit)}</strong></article>
          <article class="stage-github fragment" data-fragment-order="3"><span class="github-heading"><svg viewBox="0 0 24 24" role="img" aria-label="GitHub"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.02c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.68.92.68 1.86v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg><b>GitHub</b></span><strong>${esc(data.githubObjects || data.github)}</strong></article>
        </div>
      </div>
    </div>`;
  }

  function renderExitCheck(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field exercise-field">
        <div class="exercise-card">
          <article class="exercise-ticket" aria-label="陌生工作票原始內容">
            <h2>在清單列顯示資料更新時間</h2>
            <section><b>描述</b><p>使用者查看資料清單時，需要知道每筆資料最後更新日期，以判斷資訊是否夠新。</p></section>
            <section><b>已有 AC</b><p>Given 一筆資料有更新時間，When 清單載入，Then 該列顯示最後更新日期。</p></section>
            <section class="ticket-column"><b>目前看板欄</b><strong>Backlog</strong></section>
            <section><b>留言</b><ul><li>小螢幕上也要能看到更新日期；詳細頁目前沒有相關修改。</li><li>如果資料沒有更新時間，畫面要顯示什麼？</li></ul></section>
          </article>
          <ol class="exercise-question" aria-label="作答問題與逐題參考判斷">
            <li><b>Goal</b><span>從票面能否找到它要推進的產品結果？還缺哪些連結或背景？</span><p class="exercise-answer fragment" data-fragment-order="1"><b>參考：</b>未連 Parent Goal，先補連結或確認；目前在 Backlog。</p></li>
            <li><b>Stage Target</b><span>目前有哪些工作已明確，哪些仍待界定？</span><p class="exercise-answer fragment" data-fragment-order="2"><b>參考：</b>釐清範圍、例外行為與依賴，整理成可交接工作票。</p></li>
            <li><b>AC／留言</b><span>現有 AC 可如何檢查？兩則留言帶來哪些範圍或例外問題？</span><p class="exercise-answer fragment" data-fragment-order="3"><b>參考：</b>主路徑可檢查；小螢幕呈現與缺少更新時間的結果待定。</p></li>
            <li><b>People／Exit</b><span>下一站前要確認哪些責任與交接條件？</span><p class="exercise-answer fragment" data-fragment-order="4"><b>參考：</b>PO／Dev 主責、QA 協作；接手者、範圍、可測性與依賴先定案。</p></li>
            <li><b>GitHub／版本</b><span>哪些資訊更新在 Issue 或 Project？何時才需要連結 PR 與版本？</span><p class="exercise-answer fragment" data-fragment-order="5"><b>參考：</b>Issue 留契約、Project 記狀態；有程式修改再連 Branch／Commit／PR，票面無版本。</p></li>
          </ol>
        </div>
      </div>
    </div>`;
  }

  const B2_MAP_STATE = {
    O03: { docStage: 'backlog', docLabel: '需求草案', docStatus: '待確認' },
    B04: { docStage: 'backlog', docLabel: '產品目標', docStatus: '已建立' },
    R05: { docStage: 'backlog', docLabel: '產品目標', docStatus: '三票待整理' },
    RD02: { docStage: 'ready', docLabel: '工作票', docStatus: '已備妥', ticket: 'ready', previous: 'backlog' },
    D04: { docStage: 'dev', docLabel: '工作紀錄', docStatus: '實作摘要', versionStage: 'dev', versionLabel: 'Branch', versionStatus: '修改已提交', ticket: 'dev', previous: 'ready' },
    RV03: { docStage: 'review', docLabel: '審查意見', docStatus: '要求修改', versionStage: 'review', versionLabel: 'PR', versionStatus: '尚未合併', ticket: 'dev', previous: 'review', actualReturn: 'review' },
    Q05: { docStage: 'qa', docLabel: '測試紀錄', docStatus: '三次已記錄', versionStage: 'qa', versionLabel: 'PR', versionStatus: '結果可回查', ticket: 'qa', previous: 'dev', actualReturn: 'qa' },
    PC02: { docStage: 'product-check', docLabel: '目標對照', docStatus: '規則範圍可審', versionStage: 'qa', versionLabel: 'PR', versionStatus: '目標仍未驗' },
    HG02: { docStage: 'human_gate', docLabel: '放行決定', docStatus: '功能暫不上線', versionStage: 'human_gate', versionLabel: 'Merge', versionStatus: '已授權・未執行', ticket: 'product-check', actualReturn: 'gate' },
    A01: { docStage: 'qa', docLabel: '第一次測', docStatus: 'AC1／2通過', versionStage: 'qa', versionLabel: 'PR', versionStatus: '沿用同一程式', ticket: 'qa' },
    A11: { docStage: 'product-check', docLabel: '目標對照', docStatus: '目標未測', versionStage: 'qa', versionLabel: 'PR', versionStatus: '首測 → 補測' },
  };

  function renderPart2Map(slide) {
    const scene = slide.dataset.rev13SceneId;
    const delta = B2_MAP_STATE[scene] || null;
    const spotlightZones = ['O03', 'A01', 'A11'].includes(scene)
      ? [] : (slide.dataset.focusZones || '').split(',').filter(Boolean);
    const roles = ['O03', 'A01', 'A11'].includes(scene)
      ? [] : (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean);
    const map = renderMotherMap({
      spotlightZones,
      roles,
      stage: slide.dataset.focusStage || '',
      states: (slide.dataset.stateMarkers || '').split(',').filter(Boolean),
      agent: true,
      page: slide.dataset.page,
      ticketPosition: slide.dataset.ticketPosition || '',
      ticketPrevious: slide.dataset.ticketPrevious || '',
      delta,
      actualReturn: delta?.actualReturn || '',
    });
    return `<div class="full-map-wrap b2-full-map">${map}</div>`;
  }

  function renderAgentMode(slide) {
    const mode = slide.dataset.agentMode;
    const configurations = {
      single: {
        title: '一個 Agent 依票工作，人另行核對',
        note: '教學示意：不代表 Agent 曾實際修改或測試。',
        columns: ['人交辦', 'Agent 修改', 'Agent 回報', 'QA 核對', '人檢查'],
        lanes: [
          ['人（QA／授權）', 'human', [[1, 'Issue #3：只改配對規則；列 AC1–AC3 與停止條件', 'human'], [4, '獨立核對工作票、版本與測試紀錄', 'review'], [5, '核對範圍、證據對版、未測仍明列後決定放行', 'human']]],
          ['Agent', 'agent', [[2, '依核准範圍修改配對規則，摘要改動', 'agent'], [3, '逐條 AC 列輸入、預期、實際與結果；未測另列', 'agent']]],
        ],
        routes: [[[1, 0], [2, 1], [3, 1], [4, 2], [5, 0]]],
        artifacts: ['Issue：#3 配對規則 · AC1–AC3', 'PR：修改摘要與版本連結（示意）', 'Evidence：預期、實際、結果與未測項'],
      },
      'multi-chat': {
        title: '多個工作對話之間，由人帶著紀錄交接',
        note: '架構示意，不代表實際多 Agent 協作。',
        columns: ['共用工作票', 'Dev 對話', '人帶紀錄', 'Reviewer／QA', 'Human Gate'],
        lanes: [
          ['開發 Agent', 'agent', [[2, '依工作票修改，交版本摘要', 'agent']]],
          ['人', 'human', [[1, '提供同一張票與驗收條件', 'human'], [3, '帶版本、審查意見與未測項', 'relay']]],
          ['審查者', 'review', [[4, '核對改動與核准範圍', 'review']]],
          ['QA', 'review', [[4, '逐條驗收，分開記結果與未測', 'review']]],
          ['授權人', 'human', [[5, '查看共用紀錄，再決定放行', 'human']]],
        ],
        routes: [[[1, 1], [2, 0], [3, 1], [4, 2], [5, 4]], [[3, 1], [4, 3], [5, 4]]],
        artifacts: ['Issue：範圍與 AC 留在同一張票', 'PR：改動摘要帶到下一段對話', 'Evidence：審查與 QA 分開記'],
      },
      orchestrator: {
        title: '協調 Agent 分派工作，人保留正式放行',
        note: '架構示意，不代表實際多 Agent 協作。',
        columns: ['人核准', 'Agent 分派', 'Dev 修改', '審查／QA', 'Agent 彙整', '人決定放行'],
        lanes: [
          ['授權人', 'human', [[1, '核准範圍與停止條件', 'human'], [6, '看證據，決定是否正式放行', 'human']]],
          ['協調 Agent', 'agent', [[2, '依工作邊界分派', 'agent'], [5, '彙整回報並附來源', 'agent']]],
          ['Dev Agent', 'agent', [[3, '修改並交版本摘要', 'agent']]],
          ['審查者', 'review', [[4, '檢查改動與核准範圍', 'review']]],
          ['QA', 'review', [[4, '依條件獨立核對並記錄', 'review']]],
        ],
        routes: [[[1, 0], [2, 1]], [[2, 1], [3, 2]], [[3, 2], [4, 3]], [[3, 2], [4, 4]], [[4, 3], [5, 1]], [[4, 4], [5, 1]], [[5, 1], [6, 0]]],
        artifacts: ['Issue：一張票記分工與範圍', 'PR：改動與審查結果連回版本', 'Evidence：各項回報附來源'],
      },
    };
    const config = configurations[mode] || configurations.single;
    const axis = `<span class="agent-mode-axis-spacer" aria-hidden="true"></span>${config.columns.map((label, index) => `<div class="agent-mode-step fragment" data-fragment-order="${index + 1}"><span>${index === 0 ? '起點' : `第 ${index + 1} 步`}</span><strong>${esc(label)}</strong></div>`).join('')}`;
    const lanes = config.lanes.map(([name, kind, cells]) => {
      const firstStep = Math.min(...cells.map(([column]) => column));
      return `<div class="agent-mode-lane lane-${kind} fragment" data-fragment-order="${firstStep}"><strong class="agent-mode-lane-name">${esc(name)}</strong>${cells.map(([column, text, type]) => `<article class="agent-mode-cell mode-${type} fragment" data-fragment-order="${column}" style="grid-column:${column + 1}"><b>${esc(text)}</b></article>`).join('')}</div>`;
    }).join('');
    const laneHeight = config.lanes.length > 3 ? 64 : 90;
    const laneGap = config.lanes.length > 3 ? 6 : 10;
    const labelWidth = 140;
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
      const endX = cellLeft(toColumn) - 3;
      const endY = rowCenter(toRow);
      if (edges.length === 1 || !edges.every(edge => edge.from[0] === edges[0].from[0])) {
        return edges.map(({ from: [fromColumn, fromRow] }) => {
          const startX = cellRight(fromColumn) + 3;
          const startY = rowCenter(fromRow);
          const channelX = (startX + endX) / 2;
          return `<path class="fragment" data-fragment-order="${toColumn}" d="M${startX} ${startY} H${channelX} V${endY} H${endX}" marker-end="url(#${routeId})"/>`;
        });
      }
      const fromColumn = edges[0].from[0];
      const channelX = (cellRight(fromColumn) + cellLeft(toColumn)) / 2;
      const feeders = edges.map(({ from: [, fromRow] }) => {
        const startX = cellRight(fromColumn) + 3;
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
    return `<div class="focus-compose agent-mode-compose">${locator(slide)}<section class="diagram-field agent-mode-field" style="--mode-columns:${config.columns.length};--mode-rows:${config.lanes.length};--mode-lane-height:${laneHeight}px;--mode-lane-gap:${laneGap}px;--mode-lanes-height:${lanesHeight}px"><p class="agent-mode-note">${esc(config.note)}</p><div class="agent-mode-axis" style="--mode-columns:${config.columns.length}">${axis}</div><div class="agent-mode-lanes" style="--mode-columns:${config.columns.length};--mode-rows:${config.lanes.length}">${routes}${lanes}</div><div class="agent-mode-artifacts fragment" data-fragment-order="${config.columns.length + 1}">${artifacts}</div></section></div>`;
  }

  function artifactCard(label, title, content, className = '') {
    return `<article class="b2-card ${className}"><span class="b2-card-label">${esc(label)}</span><strong>${esc(title)}</strong><div>${content}</div></article>`;
  }

  function issueSheet({ title, state = 'Backlog', teaching = true, workItem = 'Ticket #3 · Matching 規則', sections = [], revealSections = false }) {
    return `<article class="issue-sheet">
      <header class="issue-head"><div><span class="issue-symbol">●</span><strong>${esc(title)}</strong></div><span class="status-pill">${esc(state)}</span></header>
      <div class="issue-meta"><span>${teaching ? '教學示意' : '規則層實測'}</span><span>${esc(workItem)}</span><span>Owner／PO 可回查</span></div>
      <div class="issue-sections">${sections.map(([label, body, kind = ''], index) => {
        const revealOrder = index < 2 ? 1 : index;
        const revealClass = revealSections ? ' fragment' : '';
        const revealAttribute = revealSections ? ` data-fragment-order="${revealOrder}"` : '';
        return `<section class="issue-section ${kind}${revealClass}"${revealAttribute}><h2>${esc(label)}</h2>${body}</section>`;
      }).join('')}</div>
    </article>`;
  }

  function renderTicketDefinition() {
    return issueSheet({
      title: '雙向 Like 才建立配對',
      revealSections: true,
      sections: [
        ['Scope', '<p>只處理配對規則與配對紀錄。</p>'],
        ['範圍外', '<p>UI、登入、網路服務、資料庫、完整產品串接。</p>'],
        ['Acceptance Criteria', '<ul><li>AC1：單向 Like，配對紀錄數為 0。</li><li>AC2：互相 Like，只建立一筆配對紀錄。</li><li>AC3：已有一筆配對紀錄再 Like，仍只有一筆。</li></ul>', 'ac'],
        ['Acceptance Tests', '<ul><li>單向 Like → 預期 0 筆。</li><li>雙向 Like → 預期 1 筆。</li><li>重複 Like → 預期仍為 1 筆。</li><li>每個案例用同一份假資料重置。</li></ul>'],
        ['Definition of Done', '<p>AC／AT 全符合並留獨立驗證紀錄；符合 DoD 才能申請合併。需人授權、實際合併並交付後，才能標本票 Done；功能上線另行判斷。</p>'],
      ],
    });
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
        body = `<div class="brainstorm-grid"><article><span>使用者問題</span><strong>「配對功能正常」還不夠明確</strong><p>誰遇到什麼困難？</p></article><i aria-hidden="true">→</i><article><span>要釐清的假設</span><strong>哪個 Like 情境才建立配對？</strong><p>單向、雙向與重複輸入</p></article><i aria-hidden="true">→</i><article><span>共同決定 · 示意</span><strong>Owner · PM · PO</strong><p>記下選項、未知與方向</p></article></div>`;
        break;
      case 'B02':
        body = `<div class="goal-flow"><article><span>待釐清請求</span><strong>配對功能正常</strong><p>成功條件尚未定義</p></article><i>→</i><article class="goal-result"><span>Parent Goal · 示意</span><strong>使用者 Like 彼此後，能在配對清單找到對方</strong><p>成功訊號：雙向按讚後預期建立一筆配對紀錄。</p></article><article class="goal-open"><span>仍待決定</span><strong>整體產品成效與介面路徑</strong><p>本頁沒有測量這些結果</p></article></div>`;
        break;
      case 'B03':
        body = issueSheet({ title: 'Goal／Proposal：配對體驗', workItem: 'Parent Goal · 配對體驗', sections: [
          ['Outcome Goal', '<p>使用者 Like 彼此後，能在配對清單找到對方。</p>'],
          ['成功訊號', '<p>雙向 Like 預期只建立一筆配對紀錄。</p>'],
          ['待確認', '<p>整體產品範圍、介面與依賴留待 Refinement。</p>'],
        ] });
        break;
      case 'R01':
        body = `<div class="refinement-board"><div class="refinement-source"><span>輸入 · 教學示意</span><strong>同一張 Goal Issue</strong><p>目標、限制、未知事項</p></div><i aria-hidden="true">→</i><div class="refinement-checks"><h2>釐清待回答的問題</h2><ul><li>可行性與風險</li><li>範圍內外</li><li>相依工作與順序</li><li>驗收條件與測法</li></ul></div><i aria-hidden="true">→</i><div class="refinement-handoff"><span>輸出 · 教學示意</span><strong>可交接的 Parent／Child Issues</strong><p>仍在 Backlog</p></div></div>`;
        break;
      case 'R02':
        body = `<div class="issue-tree"><article class="parent-issue"><span>產品目標 · 教學示意</span><strong>互相按讚後，在配對清單找到對方</strong><p>三張工作票分開交付；按讚與清單都依賴配對規則。</p></article><div class="tree-stem"></div><div class="child-issues"><article class="child-primary"><span>工作票 · #3</span><strong>雙向按讚建立配對</strong><small>本課主要工作票</small></article><article><span>工作票 · #1</span><strong>按讚／略過</strong><small>依賴配對規則</small></article><article><span>工作票 · #2</span><strong>配對清單</strong><small>依賴配對規則</small></article></div><div class="issue-dependencies" aria-label="配對規則工作票連到按讚與配對清單工作票"><svg viewBox="0 0 1000 54" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="issue-dependency-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker></defs><path d="M166 0 V13 H500 V41" marker-end="url(#issue-dependency-arrow)" /><path d="M166 13 H833 V41" marker-end="url(#issue-dependency-arrow)" /></svg><div><span>配對規則票</span><b>→</b><span>按讚票</span><i>／</i><span>配對清單票</span></div></div></div>`;
        break;
      case 'R03':
        body = renderTicketDefinition();
        break;
      case 'R04':
        body = `<div class="issue-tree issue-tree-updated"><article class="parent-issue"><span>產品目標 · 更新示意</span><strong>互相按讚後，在配對清單找到對方</strong><p>三張工作票與依賴都連回此目標。</p></article><div class="tree-stem"></div><div class="child-issues"><article class="child-primary"><span>工作票 · #3</span><strong>雙向按讚建立配對</strong><small>驗收條件與測法已補</small></article><article><span>工作票 · #1</span><strong>按讚／略過</strong><small>依賴配對規則</small></article><article><span>工作票 · #2</span><strong>配對清單</strong><small>依賴配對規則</small></article></div><div class="issue-dependencies" aria-label="配對規則票先於按讚與配對清單票"><svg viewBox="0 0 1000 54" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="updated-issue-dependency-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker></defs><path d="M166 0 V13 H500 V41" marker-end="url(#updated-issue-dependency-arrow)" /><path d="M166 13 H833 V41" marker-end="url(#updated-issue-dependency-arrow)" /></svg><div><span>配對規則票</span><b>→</b><span>按讚票</span><i>／</i><span>配對清單票</span></div></div><div class="project-state"><b>Project · 示意</b><span>#3 Status · Backlog</span></div></div>`;
        break;
      case 'RD01':
        body = `<div class="ready-check"><article><b>Scope</b><span>單一規則票；範圍與排除事項清楚</span></article><article><b>AC／AT</b><span>三種情境都有明確預期與測法</span></article><article><b>依賴</b><span>必要關係與接手責任已記錄</span></article><article><b>可測性</b><span>假資料、紀錄筆數與版本可識別</span></article><div class="ready-result"><strong>Ready Check · 示意</strong><span>可交 Dev 開工；尚無測試 PASS</span></div></div>`;
        break;
      case 'D01':
        body = `<div class="dev-intake"><article><span>Input · 示意</span><strong>Ready Ticket #3</strong><p>Scope · AC1–AC3 · 停止條件</p></article><i>→</i><article class="dev-active"><span>Dev · 進行中 1／1 張 · 示意</span><strong>在核准範圍內實作</strong><p>開始工作不等於已有 PASS</p></article><i>→</i><article><span>接手責任</span><strong>Dev</strong><p>Ticket 記錄進度與未完成項</p></article></div>`;
        break;
      case 'D02':
        body = `<div class="git-flow"><span>Git／GitHub 關係 · 示意</span><div class="git-chain"><article class="git-ticket"><span>工作契約</span><strong>Issue #3</strong><small>Scope · AC · AT</small></article><i>→</i><article><span>隔離修改</span><strong>Branch</strong><small>同一 Repo</small></article><i>→</i><article><span>版本節點</span><strong>Commit</strong><small>記錄變更</small></article><i>→</i><article class="git-pr"><span>協作送審</span><strong>GitHub PR</strong><small>差異連回 Issue</small></article></div></div>`;
        break;
      case 'D03':
        body = `<div class="candidate-card"><header><span>Dev 交接摘要</span><strong>Issue #3 · 雙向按讚規則</strong><em>教學示意</em></header><div><article><b>自測線索</b><span>重設假資料 → 單向按讚 → 查紀錄數</span></article><article><b>版本與修改</b><span>Branch、Commit、PR 連結修改摘要</span></article><article><b>待 QA</b><span>AC1–AC3 逐條記預期、實際與結果；未測保持未測</span></article></div><footer>交接格式示意；不表示本頁有 Matching 實測或真實版本紀錄。</footer></div>`;
        break;
      case 'RV01':
      case 'RV02':
        body = `<article class="pr-sheet"><header><div><span class="pr-symbol">⑂</span><strong>${id === 'RV01' ? '配對規則版本修改' : '範圍外聊天室變更'}</strong></div><em>教學示意</em></header><div class="pr-branch">工作分支 <b>→</b> 整合至主版本</div><div class="pr-columns"><article><span>工作票</span><strong>Issue #3</strong><small>雙向 Like 才建立一筆配對</small></article><article><span>修改內容</span><strong>${id === 'RV01' ? '配對規則 · 規則測試' : '聊天室 · 介面'}</strong><small>${id === 'RV01' ? '修改與測試摘要' : '超出本票範圍'}</small></article><article class="pr-review-status"><span>Review</span><strong>${id === 'RV01' ? '待審查' : '要求修改'}</strong><small>${id === 'RV01' ? '檢查改動、風險與範圍' : '退回 Dev，移除越界改動'}</small></article></div>${id === 'RV02' ? '<div class="review-fix-path"><b>Dev 移除越界改動</b><i>→</i><b>Reviewer 再審通過</b><i>→</i><b>才交 QA</b></div>' : ''}<footer>${id === 'RV01' ? 'PR 關聯票與版本差異；AC 結果仍由 QA 實測。' : '退回後先移除越界修改，再審查通過才進 QA；流程示意。'}</footer></article>`;
        break;
      case 'Q01':
        body = `<div class="qa-evidence-shell qa-method-shell"><header><span>規則層實測步驟</span><strong>先取得可重跑的觀察，再記錄結果</strong><em>步驟示意</em></header><div class="qa-method-steps"><article><b>1 · 準備</b><span>重置假資料</span></article><i>→</i><article><b>2 · 執行</b><span>小安按讚小晴</span></article><i>→</i><article><b>3 · 看結果</b><span>查配對紀錄數</span></article><i>→</i><article><b>4 · 對照預期</b><span>預期 0 筆</span></article></div>${qaTable([['版本','AC 對應案例','規則預期','實際觀察','PASS／FAIL／未測']])}<p>本頁只說明取得規則層觀察的方法；沒有新增測試結果。</p></div>`;
        break;
      case 'Q02':
        body = `<div class="qa-evidence-shell actual-evidence qa-failure-evidence"><header><span>規則層實測</span><strong>第一版 · 單向 Like</strong><em>FAIL</em></header>${evidenceReference('第一版', '單向 Like 測試紀錄')}${qaTable([['第一版','小安 Like 小晴；尚未互相 Like','0 筆配對','1 筆配對紀錄','FAIL']])}<div class="qa-fail-detail"><article><span>工作票 #3 · AC1 · 單向按讚</span><strong>預期 0 筆；實際 1 筆</strong><small>FAIL：第一版沒有符合 AC1</small></article><div class="qa-return-path"><b>QA</b><i>→</i><b>Dev</b><span>依 AC1 退回修正</span></div></div><p>第一版規則測試失敗；退回線表示修正流程，測試紀錄只保留實際觀察。</p></div>`;
        break;
      case 'Q03':
        body = `<div class="qa-evidence-shell actual-evidence"><header><span>規則層實測</span><strong>修正版・第一次測</strong><em>部分通過</em></header>${evidenceReference('修正版', '單向與雙向測試紀錄')}${qaTable([['修正版・第一次測','單向 Like','0 筆','0 筆','PASS'],['修正版・第一次測','雙向 Like','1 筆','1 筆','PASS'],['修正版・第一次測','重複按讚','仍 1 筆','未執行','未測']])}<p>AC1／AC2 有規則證據；重複按讚尚未驗證。</p></div>`;
        break;
      case 'Q04':
        body = `<div class="qa-evidence-shell reveal-evidence"><header><span>先請學員作答</span><strong>重複按讚還缺哪個輸入與預期？</strong><em>按下一步揭露</em></header><div class="duplicate-prompt"><article><b>前置狀態</b><span>同一份修正版程式已有 1 筆配對紀錄</span></article><i>→</i><article><b>補測動作</b><span>同一對再次 Like</span></article><i>→</i><article><b>預期</b><span>仍只有 1 筆配對紀錄</span></article></div><div class="b2-reveal fragment" data-fragment-order="1"><span>規則層實測 · 修正版・補測</span>${evidenceReference('修正版', '重複按讚測試紀錄')}${qaTable([['修正版・補測','重複按讚','仍 1 筆','仍 1 筆','PASS']])}<p>補測沿用同一份修正版程式；沒有另建版本。</p></div></div>`;
        break;
      case 'PC01':
        body = `<div class="product-check-grid"><article><span>配對規則票 · 可核對</span><strong>單向 0 筆 · 雙向 1 筆 · 重複按讚仍 1 筆</strong><p>只證明配對規則正確；不代表使用者在配對清單看得到對方。</p></article><i>≠</i><article class="goal-gap"><span>Parent Goal · 尚未驗證</span><strong>使用者 Like 彼此後，能在配對清單找到對方</strong><p>登入／介面／完整流程／完整串接：未測</p></article><footer>Product Check · 教學示意　｜　PO／Owner 記錄範圍與未知，不把單票結果升格成 Goal PASS。</footer></div>`;
        break;
      case 'HG01':
        body = `<div class="human-gate-card"><header><span>Human Gate · 決策清單示意</span><strong>決策者：Owner／授權人</strong></header><div class="gate-evidence-list"><article><b>✓</b><span>#3 規則證據：第一版 → 修正版・第一次測 → 修正版・補測</span></article><article><b>!</b><span>介面／完整流程／產品目標：未測</span></article><article><b>!</b><span>上線檢查清單、授權紀錄：未建立</span></article></div><footer><strong>可做的決定</strong><span>補證據　·　暫停　·　退回　·　授權（需真實紀錄）</span></footer></div>`;
        break;
      default:
        body = `<div class="b2-generic"><strong>${esc(slide.querySelector('h1').textContent)}</strong><p>${esc(slide.dataset.docRef)}</p><span>${esc(slide.dataset.versionRef)}</span></div>`;
    }
    return `<div class="focus-compose b2-focus-compose">${locatorMarkup}<section class="diagram-field b2-artifact" aria-label="${esc(slide.querySelector('.artwork').getAttribute('aria-label'))}">${body}</section></div>`;
  }

  const PRINCIPLE_CASES = {
    A06: { risk: '接手者只看到一段聊天摘要；不知道規則票在哪個流程、哪個 AC 尚未測。', decision: '先讀共享 Issue／Project，核對核准範圍、AC、Owner、目前工作數與第一次測結果。' },
    A07: { risk: '執行時有人提議順便新增聊天室，會改變本票範圍。', decision: '超出核准範圍就依停止條件停下，不自行加入新功能。' },
    A08: { risk: '實作者說完成後，自己也替變更與測試按下放行。', decision: '把 PO、Dev、Reviewer、QA、Owner 的責任分開，保留 Human Gate。' },
    A09: { risk: '第一次測的單向和雙向都 PASS，但重複按讚仍未測；不能因此說所有 AC 都完成。', decision: '逐條比對 AC、版本、輸入、預期與實際；重複按讚維持未測，直到補測。' },
    A10: { risk: '第一次測的 AC1／AC2 PASS，但重複按讚未測；不能把規則票或產品目標說成全部完成。', decision: '保留重複按讚未測；再核對 Parent Goal 與依賴。目標問題回 Backlog／Refinement，實作問題回 Dev。' },
  };

  function renderPrincipleArtifact(id) {
    const artifacts = {
      A06: `<div class="principle-output-sheet"><header><b>Issue #3 · 配對規則</b><span>工作進度</span></header><ul><li>AC1／AC2：第一次測 PASS</li><li>重複按讚：未測</li><li>下一步：提出補測要求</li></ul></div>`,
      A07: `<div class="principle-output-sheet"><header><b>Issue #3 · 變更請求</b><span>情境示意</span></header><ul><li>聊天室功能：範圍外</li><li>停止條件：先停止執行</li><li>由人決定是否重排</li></ul></div>`,
      A08: `<div class="principle-output-records" aria-label="Issue、Pull Request、Review、Evidence 和授權紀錄卡"><article><b>Issue #3</b><span>核准範圍與 AC</span></article><article><b>Pull Request</b><span>程式修改摘要</span></article><article><b>Review</b><span>審查意見與處置</span></article><article><b>Evidence</b><span>QA 結果與未測項</span></article></div><small class="principle-output-note">分開保存不同紀錄；此處為格式示意。</small>`,
      A09: `<div class="principle-output-timeline" aria-label="修正版兩個測試時點的紀錄"><article><span>修正版・第一次測</span><strong>單向／雙向 PASS<br>重複按讚未測</strong></article><i aria-hidden="true">→</i><article><span>修正版・補測，同一程式</span><strong>重複按讚 PASS</strong></article></div><small class="principle-output-note">介面、完整流程、上線與產品目標仍未測</small>`,
      A10: `<div class="principle-output-sheet"><header><b>目標與工作票</b><span>關聯示意</span></header><ul><li>產品目標：互相按讚後找到對方</li><li>規則工作票 #3：AC1／AC2 有紀錄</li><li>介面、完整流程與整體成效：未測</li></ul></div>`,
    };
    return artifacts[id] || '';
  }

  function renderPrincipleOverview(slide) {
    const cards = [
      ['聊天失去任務進度', '工作狀態記在 Issue'],
      ['工作越過核准範圍', '只在核准範圍內工作'],
      ['同一角色包辦所有檢查', '不同角色各負其責'],
      ['未測被描述成通過', '另外核對測試結果'],
      ['子票結果偏離產品目標', '回頭核對產品目標'],
    ];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact principle-risk-field"><div class="principle-risk-header"><strong>工作票 #3 · 配對規則</strong><span>第一次測時：重複按讚未測</span></div><div class="principle-risk-grid">${cards.map(([risk, principle], index) => `<article class="fragment" data-fragment-order="${index + 1}"><b>${index+1}</b><div><span>風險</span><strong>${esc(risk)}</strong></div><i>→</i><div><span>做法</span><strong>${esc(principle)}</strong></div></article>`).join('')}</div></section></div>`;
  }

  function renderPrincipleCase(slide) {
    const id = slide.dataset.rev13SceneId;
    const item = PRINCIPLE_CASES[id];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact principle-case-field"><div class="principle-case-grid"><article class="case-situation"><span>情境</span><p>${esc(item.risk)}</p></article><i>→</i><article class="case-decision"><span>處理方式</span><p>${esc(item.decision)}</p></article><i>→</i><article class="case-artifact"><span>產物</span>${renderPrincipleArtifact(id)}</article></div></section></div>`;
  }

  function renderPart2Exercise(slide) {
    const questions = [
      ['Ticket／AC', '你會把哪個範圍、AC 與停止條件寫進 Issue？', '寫清楚單向 0、雙向 1 筆、重複仍 1 筆；介面／登入／服務／資料庫排除，超範圍需求先停並交人決定。'],
      ['協作方式', '什麼時候需要協調 Agent？', '按任務邊界選方式；每站都回寫 Issue、版本與證據，角色仍分開，Human Gate 仍由人負責。'],
      ['補測與完成', '什麼時候才算完成？', 'DoD 全部滿足，並留獨立驗證紀錄；未測仍標未測。人授權、實際合併並完成交付後，才標本票 Done。本課未執行合併，也不代表功能已上線。'],
    ];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact exercise-part2"><header><strong>同一張 Ticket #3 · 修正版・第一次測 → 修正版・補測</strong><span>先寫下你的答案</span></header><ol>${questions.map(([label, question, answer], index) => `<li><b>${esc(label)}</b><span>${esc(question)}</span><p class="exercise-answer fragment" data-fragment-order="${index+1}"><strong>參考</strong>：${esc(answer)}</p></li>`).join('')}</ol><footer>參考答案依序揭露；不是新測試，也不表示 上線／產品目標完成。</footer></section></div>`;
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
      })}</div>`;
      return;
    }
    if (key === 'workflow-map') art.innerHTML = renderKanbanDiagram(slide);
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
    const selector = ['exit-check', 'part2-exercise'].includes(slide.dataset.art)
      ? '.exercise-answer.fragment:not(.revealed-once)'
      : '.fragment:not(.visible)';
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
    if (['exit-check', 'part2-exercise'].includes(slide.dataset.art)) {
      const next = slide.querySelector('.exercise-answer.fragment:not(.revealed-once)');
      if (!next) return false;
      slide.querySelectorAll('.exercise-answer.fragment.visible').forEach(answer => answer.classList.remove('visible'));
      next.classList.add('visible', 'revealed-once');
      nextButton.disabled = pageIndex === slides.length - 1 && !hasNextFragment(slide);
      return true;
    }
    const hidden = [...slide.querySelectorAll('.fragment:not(.visible)')];
    if (!hidden.length) return false;
    const order = Math.min(...hidden.map(item => Number(item.dataset.fragmentOrder || 1)));
    hidden.filter(item => Number(item.dataset.fragmentOrder || 1) === order).forEach(item => item.classList.add('visible'));
    nextButton.disabled = pageIndex === slides.length - 1 && !hasNextFragment(slide);
    return true;
  }

  function previousFragment() {
    const slide = slides[pageIndex];
    if (['exit-check', 'part2-exercise'].includes(slide.dataset.art)) {
      const current = slide.querySelector('.exercise-answer.fragment.visible');
      if (!current) return false;
      current.classList.remove('visible', 'revealed-once');
      const revealed = [...slide.querySelectorAll('.exercise-answer.fragment.revealed-once')];
      revealed.at(-1)?.classList.add('visible');
      nextButton.disabled = false;
      return true;
    }
    const visible = [...slide.querySelectorAll('.fragment.visible')];
    if (!visible.length) return false;
    const order = Math.max(...visible.map(item => Number(item.dataset.fragmentOrder || 1)));
    visible.filter(item => Number(item.dataset.fragmentOrder || 1) === order).forEach(item => item.classList.remove('visible'));
    nextButton.disabled = false;
    return true;
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
