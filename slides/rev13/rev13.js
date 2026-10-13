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
    { name: 'Owner', short: '方向／授權', color: 'people' },
    { name: 'PM', short: '協作／節奏', color: 'people' },
    { name: 'PO', short: '需求／驗收', color: 'people' },
    { name: 'UI/UX', short: '介面／互動', color: 'people' },
    { name: 'Dev', short: '實作／修正', color: 'people' },
    { name: 'Reviewer', short: '改動審查', color: 'people' },
    { name: 'QA', short: '行為驗證', color: 'people' },
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
      goal: '只做核准的 Ticket／AC',
      target: '在核准範圍內實作並留下候選版本',
      input: 'Ready Ticket、設計／AC、共同 Repo 與 Stop Rules',
      activities: ['建立 Branch', '實作並 Commit', '自測與記錄未完成項'],
      output: '候選版本、修改摘要、自測紀錄與未驗清單',
      stateChange: 'Ready → Dev；形成候選版本',
      handoff: '候選版本與自測紀錄交 Reviewer',
      exit: '候選變更與自測可供審查；自測不等於 QA 完成。',
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
      goal: '候選變更不得偏離本票範圍',
      target: '檢查修改、風險與範圍邊界',
      input: 'PR 差異、Ticket／AC、版本與自測摘要',
      activities: ['比對差異', '提出審查意見', '處置重大問題'],
      output: 'Review findings、approved 或 changes requested',
      stateChange: 'Dev → Review；重大 findings 須有處置',
      handoff: '重大問題已處置才交 QA；否則回 Dev',
      outputNote: '概念示意；不代表真實 PR 或 Review 紀錄',
      exit: '重大問題已有處置，候選變更可交付 QA；PR 尚不必然 Merge。',
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
      goal: '驗證既定 AC，不推定 Goal 完成',
      target: '用可重跑證據檢查候選版行為',
      input: '可識別候選版、AC／AT、測試資料與環境',
      activities: ['執行測試', '記錄預期與實際', '標記結果與未測項'],
      output: '測試紀錄、發現／缺漏與補驗請求',
      stateChange: 'Review → QA；留下實際結果與未測項',
      handoff: '證據與未測項交 PO 作 Product Check',
      outputNote: '概念示意；未執行項維持 NOT RUN',
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
      goal: '對回 Parent Goal、依賴與產品需求',
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
      goal: '產品與風險仍由人負責',
      target: '由授權的人決定整合／發布或要求補驗',
      input: '候選版、Review／QA Evidence、剩餘風險與發布計畫',
      activities: ['檢查證據', '評估剩餘風險', '決定 Go／No-Go'],
      output: '可回查的授權、暫停或退回紀錄',
      stateChange: 'Product Check → 欄外授權、暫停或退回',
      handoff: '授權後才進 Merge／Release；No-Go 則暫停或補驗',
      outputNote: '條件式輸出；沒有真實授權紀錄',
      exit: '明確授權且後續 Release／DoD 條件可檢查；不自動 Done。',
      lead: ['Owner'],
      co: ['PO', 'QA', 'Dev'],
      nextStage: 'Merge / Release / Done',
      githubObjects: 'Pull Request · Issue decision log',
      github: 'PR／Issue decision log；尚未直接等於 Merge',
    },
    release_done: {
      label: 'Merge / Release / Done',
      activity: '授權後的交付工作',
      kanban: 'Product Check → Done（條件成立後）',
      goal: '單票完成與整體 Goal 成效分開衡量',
      target: '完成整合、發布與 DoD 證據',
      input: '已獲 Human Gate 授權的候選版與 Release／DoD Checklist',
      activities: ['整合變更', '發布版本', '檢查部署與 DoD'],
      output: 'Merged Commit、Release 記錄、檢查結果與 Ticket Done（有證據時）',
      stateChange: 'Product Check → Done（授權、Release 與 DoD 證據成立後）',
      handoff: '僅在 Merge、Release 與 DoD 實證齊備時標記 Done',
      outputNote: '條件式輸出；未證明 Merge、Release 或 Done 檢查',
      exit: '本課 DoD 與上線檢查具備實證，才可 Done；整體 Goal 另行衡量。',
      lead: ['Dev'],
      co: ['Owner', 'PO', 'QA'],
      nextStage: 'Done · 本流程終點',
      githubObjects: 'Pull Request · Commit · Release · Issue',
      github: 'PR Merge、Commit、Release 與 Issue／Project Done',
    },
  };

  const ROLE_STAGE_MAP = {
    Owner: { primary: ['brainstorming', 'human_gate'], collaborate: ['refinement', 'product_check', 'release_done'] },
    PM: { primary: ['brainstorming', 'refinement'], collaborate: ['ready'] },
    PO: { primary: ['refinement', 'ready', 'product_check'], collaborate: ['brainstorming', 'review', 'human_gate'] },
    'UI/UX': { primary: [], collaborate: ['refinement', 'dev'] },
    Dev: { primary: ['dev', 'release_done'], collaborate: ['refinement', 'ready', 'review', 'qa', 'product_check'] },
    Reviewer: { primary: ['review'], collaborate: [] },
    QA: { primary: ['qa'], collaborate: ['refinement', 'ready', 'product_check', 'human_gate', 'release_done'] },
  };

  const RESPONSIBILITY = {
    Owner: '定方向、作正式授權',
    PM: '促進協作、風險與節奏',
    PO: '整理需求、AC 與產品判斷',
    'UI/UX': '在介面與互動需要時協作',
    Dev: '實作、自測、修正並交版本',
    Reviewer: '檢查改動、範圍與風險',
    QA: '依 AC 與證據驗證行為',
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
  }

  function renderMotherMap(options = {}) {
    const {
      spotlightZones = [], roles = [], stage = '', states = [],
      agent = true, compact = false, revealAgent = false,
    } = options;
    const zoneSet = new Set(spotlightZones);
    const roleSet = new Set(roles);
    const stateSet = new Set(states);
    const mapClass = `mother-map${compact ? ' is-compact' : ''}`;
    const zoneClass = zone => spotlightZones.length && !zoneSet.has(zone) ? 'map-zone is-dim' : 'map-zone';
    const roleClass = role => roles.length && !roleSet.has(role) ? 'role-node is-muted' : 'role-node';

    const roleMarkup = ROLE_DATA.map(role => `
      <div class="${roleClass(role.name)}" data-role="${esc(role.name)}">
        <span class="role-dot" aria-hidden="true"></span>
        <strong>${esc(role.name)}</strong><span class="role-desc">${esc(role.short)}</span>
      </div>`).join('');

    const stageStates = new Set(STAGE_KANBAN[stage] || []);
    const statuses = KANBAN.map((item, index) => {
      const active = stateSet.has(item.key) || stageStates.has(item.key);
      const accessibleLabel = `${item.label}${active ? '，本頁流程焦點' : ''}`;
      return `<div class="map-status${active ? ' is-current' : ''}" data-state="${item.key}" data-step="${index + 1}"${active ? ' data-stage-focus="true"' : ''} role="listitem" aria-label="${esc(accessibleLabel)}"><span>${esc(item.label)}</span></div>`;
    }).join('');

    const activities = `
      <div class="activity-node${stage === 'brainstorming' ? ' is-current' : ''}" data-stage="brainstorming">
        <span class="activity-mark" aria-hidden="true">↗</span><strong>Brainstorming</strong><small>活動</small>
      </div>
      <div class="activity-node${stage === 'refinement' ? ' is-current' : ''}" data-stage="refinement">
        <span class="activity-mark" aria-hidden="true">↔</span><strong>Refinement</strong><small>在 Backlog 進行</small>
      </div>`;

    let agentMarkup = '';
    if (agent) {
      agentMarkup = `<div class="agent-layer${revealAgent ? ' fragment' : ''}" role="group" aria-label="Agent：受委派執行／協調；範圍、責任與 Human Gate 仍連回原四區"${revealAgent ? ' data-fragment-order="1"' : ''}>
        <span class="agent-mark" aria-hidden="true">A</span>
        <strong>Agent</strong>
        <span>受委派執行／協調；範圍、責任與 Human Gate 仍連回原四區</span>
      </div>`;
    } else {
      agentMarkup = '<div class="agent-layer is-empty" aria-hidden="true"></div>';
    }

    return `
      <div class="${mapClass}" data-mother-map-id="rev13-four-foundations" data-stage="${esc(stage)}">
        <div class="map-grid">
          <section class="${zoneClass('people')} zone-people" data-zone="people" aria-label="People 人">
            <header class="zone-heading"><span class="zone-symbol">P</span><h2><span class="zone-name-full">People</span><em>人</em></h2></header>
            <div class="role-cloud" role="group" aria-label="角色：Owner、PM、PO、UI/UX、Dev、Reviewer、QA">${roleMarkup}</div>
          </section>
          <section class="${zoneClass('process')} zone-process" data-zone="process" aria-label="Process 流程">
            <header class="zone-heading"><span class="zone-symbol">→</span><h2><span class="zone-name-full">Process</span><em>流程</em></h2></header>
            <div class="activity-rail" role="group" aria-label="活動：Brainstorming；Refinement 在 Backlog 進行">${activities}</div>
            <div class="kanban-row" role="list" aria-label="七個 Kanban 狀態">${statuses}</div>
            <div class="gate-rail${stage === 'human_gate' ? ' is-current' : ''}" role="group" aria-label="Human Gate：Product Check 後、Done 前的欄外人類決策">
              <span class="gate-line" aria-hidden="true"></span><strong>Human Gate</strong>
              <span>欄外決策：Product Check 後、Done 前</span><span class="gate-line" aria-hidden="true"></span>
            </div>
          </section>
          <section class="${zoneClass('documents')} zone-documents" data-zone="documents" aria-label="Documents 文件">
            <header class="zone-heading"><span class="zone-symbol">▤</span><h2><span class="zone-name-full">Documents</span><em>文件</em></h2></header>
            <div class="doc-stack" role="group" aria-label="文件：Goal／Proposal、Epic／Story／Task、Scope／AC／AT／DoD、Review／Evidence">
              <div class="doc-piece"><b>Goal／Proposal</b><span>為什麼做</span></div>
              <div class="doc-piece"><b>Epic · Story · Task</b><span>如何拆成工作</span></div>
              <div class="doc-piece"><b>Scope · AC · AT · DoD</b><span>做什麼、如何驗</span></div>
              <div class="doc-piece"><b>Review · Evidence</b><span>改動與驗證紀錄</span></div>
            </div>
          </section>
          <section class="${zoneClass('version')} zone-version" data-zone="version" aria-label="Version Control 版本管理">
            <header class="zone-heading"><span class="zone-symbol">⎇</span><h2><span class="zone-name-full">Version Control</span><em>版本管理</em></h2></header>
            <div class="version-path" role="group" aria-label="版本路徑：Git、Branch、Commit、PR、Merge">
              <div class="version-node"><b>Git</b></div><i>→</i>
              <div class="version-node"><b>Branch</b></div><i>→</i>
              <div class="version-node"><b>Commit</b></div><i>→</i>
              <div class="version-node"><b>PR</b></div><i>→</i>
              <div class="version-node"><b>Merge</b></div>
            </div>
          </section>
        </div>
        <div class="github-bridge" role="group" aria-label="GitHub 橫跨文件協作與版本審查">
          <span class="bridge-end">Issues／Project</span>
          <span class="bridge-track"><i></i><b><span class="bridge-name-full">GitHub 協作</span><span class="bridge-name-compact" aria-hidden="true">GitHub</span></b><i></i></span>
          <span class="bridge-end">PR／Review</span>
        </div>
        ${agentMarkup}
      </div>`;
  }

  function locator(slide) {
    const focusZones = new Set((slide.dataset.focusZones || '').split(',').filter(Boolean));
    const focusRoles = new Set((slide.dataset.focusRolesMap || '').split(',').filter(Boolean));
    const scene = slide.dataset.rev13SceneId || '';
    const conceptsWithoutStageFocus = /^C(?:0[3-9]|10)$/.test(scene);
    const stage = conceptsWithoutStageFocus ? '' : (slide.dataset.focusStage || '');
    const activeStates = new Set([
      ...(STAGE_KANBAN[stage] || []),
      ...(slide.dataset.stateMarkers || '').split(',').filter(Boolean),
    ]);
    const conditionalStates = new Set(stage === 'release_done' ? ['done'] : []);
    const pillars = [
      ['people', '人', 'people'],
      ['process', '流程', 'process'],
      ['documents', '文件', 'documents'],
      ['version', '版本管理', 'version'],
    ].map(([key, label, color]) => `<span class="locator-pillar pillar-${color}${focusZones.size && !focusZones.has(key) ? ' is-dim' : ' is-focused'}">${label}</span>`).join('');
    const agentFocused = focusZones.has('agent') || focusRoles.has('Agent');
    const board = KANBAN.map((item, index) => {
      const active = activeStates.has(item.key);
      const conditional = conditionalStates.has(item.key);
      const label = esc(item.label);
      return `<span class="locator-state${active ? ' is-current' : ''}${conditional ? ' is-conditional' : ''}" data-state="${item.key}"${active ? ' aria-current="step"' : ''}><span>${label}</span></span>`;
    }).join('');
    const activities = `<div class="locator-activity-stack">
      <span class="locator-activity${stage === 'brainstorming' ? ' is-current' : ''}">Brainstorming</span>
      <span class="locator-activity${stage === 'refinement' ? ' is-current' : ''}">Refinement</span>
    </div>`;
    return `<aside class="map-locator" aria-label="四要素與七欄流程定位">
      <div class="locator-pillars" role="group" aria-label="People、Process、Documents、Version Control 與 Agent">
        ${pillars}<span class="locator-pillar pillar-agent${agentFocused ? ' is-focused' : ' is-dim'}">+Agent</span>
      </div>
      <div class="locator-process" role="group" aria-label="七欄 Kanban 與欄外 Human Gate">
        <div class="locator-activities">${activities}</div>
        <div class="locator-board" role="list" aria-label="Backlog、Ready、Dev、Review、QA、Product Check、Done">${board}</div>
        <span class="locator-gate${stage === 'human_gate' ? ' is-current' : ''}" aria-label="Human Gate，Product Check 與 Done 之間的欄外決策"${stage === 'human_gate' ? ' aria-current="step"' : ''}><i aria-hidden="true"></i><b>Human Gate</b></span>
      </div>
    </aside>`;
  }

  function renderKanbanDiagram(slide) {
    const columns = KANBAN.map((column, index) => `
      <div class="board-column" data-state="${column.key}">
        <span class="board-index">${String(index + 1).padStart(2, '0')}</span>
        <strong>${esc(column.label)}</strong>
        <span class="board-rule">${[
          '待釐清工作', '可接手', '正在實作', '檢查差異', '驗證行為', '核對需求', '符合 DoD',
        ][index]}</span>
      </div>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field workflow-field">
        <div class="activity-strip">
          <div><span>活動</span><strong>Brainstorming</strong><small>先整理問題與方向</small></div>
          <div><span>活動</span><strong>Refinement</strong><small>在 Backlog 梳理與拆票</small></div>
        </div>
        <div class="board-sequence" aria-label="Backlog、Ready、Dev、Review、QA、Product Check、Done 七欄">${columns}</div>
        <div class="gate-sequence">
          <span class="gate-connector"></span><strong>Human Gate</strong>
          <span>人類在 Product Check 後決定是否授權</span><span class="gate-connector"></span>
        </div>
      </div>
    </div>`;
  }

  function renderStageAnatomy(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field anatomy-field">
        <div class="goal-target">
          <article><span>Product Goal</span><strong>使用者要達成的產品結果</strong></article>
          <span class="goal-target-separator" aria-hidden="true">≠</span>
          <article><span>Stage Target</span><strong>這一站要完成的工作</strong></article>
        </div>
        <div class="contract-flow">
          <article class="contract-node"><span>Input</span><strong>已有的工作依據</strong></article>
          <span class="diagram-arrow" aria-hidden="true">→</span>
          <article class="contract-node active"><span>Activities</span><strong>本站實際要做的事</strong></article>
          <span class="diagram-arrow" aria-hidden="true">→</span>
          <article class="contract-node"><span>Output</span><strong>交給下一站的產物</strong></article>
        </div>
        <div class="anatomy-bottom">
          <article class="exit-node"><span>Exit Criteria</span><strong>條件成立，下一站才能接手</strong></article>
          <article class="people-github-node"><span>People · GitHub mapping</span><strong>誰主責／協作？產物記在 Issue、Project、Branch 或 PR 的哪裡？</strong></article>
        </div>
      </div>
    </div>`;
  }

  function renderRolesOverview(slide) {
    const cards = ROLE_DATA.map((role, index) => `
      <article class="role-card role-card-${index + 1}" data-role="${esc(role.name)}">
        <span class="role-orbit" aria-hidden="true"></span>
        <strong>${esc(role.name)}</strong><p>${esc(RESPONSIBILITY[role.name])}</p>
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
        <div class="role-distinction"><b>職能 ≠ 人數 ≠ Agent 數</b><span>一人可承擔多職能；審查、驗證與放行仍保留各自責任。</span></div>
      </div>
    </div>`;
  }

  function renderRolesStages(slide) {
    const width = 1440;
    const height = 520;
    const left = 210;
    const gap = 144;
    const topY = 82;
    const rowStart = 158;
    const rowGap = 53;
    const columns = [
      { key: 'backlog', label: 'Backlog', stageKeys: ['brainstorming', 'refinement'], activity: true },
      { key: 'ready', label: 'Ready', stageKeys: ['ready'] },
      { key: 'dev', label: 'Dev', stageKeys: ['dev'] },
      { key: 'review', label: 'Review', stageKeys: ['review'] },
      { key: 'qa', label: 'QA', stageKeys: ['qa'] },
      { key: 'product-check', label: 'Product Check', stageKeys: ['product_check'] },
      { key: 'human-gate', label: 'Human Gate', stageKeys: ['human_gate'], outside: true },
      { key: 'done', label: 'Done', stageKeys: ['release_done'] },
    ];
    const columnX = index => left + index * gap;
    const stageNodes = columns.map((column, index) => {
      const x = columnX(index);
      let labelMarkup;
      if (column.activity) {
        labelMarkup = `<text class="matrix-activity" x="${x}" y="21" text-anchor="middle">Brainstorming</text><text class="matrix-activity" x="${x}" y="39" text-anchor="middle">Refinement</text><text x="${x}" y="59" text-anchor="middle">Backlog</text>`;
      } else if (column.label === 'Product Check') {
        labelMarkup = `<text text-anchor="middle"><tspan x="${x}" y="42">Product</tspan><tspan x="${x}" y="62">Check</tspan></text>`;
      } else if (column.outside) {
        labelMarkup = `<text x="${x}" y="51" text-anchor="middle">Human Gate</text><text class="matrix-outside-note" x="${x}" y="108" text-anchor="middle">欄外決策</text>`;
      } else {
        labelMarkup = `<text x="${x}" y="55" text-anchor="middle">${esc(column.label)}</text>`;
      }
      const shape = column.outside
        ? `<polygon class="matrix-gate-diamond" points="${x},${topY - 17} ${x + 17},${topY} ${x},${topY + 17} ${x - 17},${topY}" />`
        : `<circle cx="${x}" cy="${topY}" r="15" />`;
      return `<g class="matrix-stage${column.outside ? ' is-outside' : ''}" data-stage="${column.key}">${shape}${labelMarkup}</g>`;
    }).join('');
    const checkX = columnX(5);
    const gateX = columnX(6);
    const doneX = columnX(7);
    const stageLine = `<path class="matrix-timeline" d="M${left} ${topY} H${checkX} M${gateX + 22} ${topY} H${doneX}" />`;
    const rows = ROLE_DATA.map((role, r) => {
      const y = rowStart + r * rowGap;
      const mapping = ROLE_STAGE_MAP[role.name];
      const cells = columns.map((column, i) => {
        const x = columnX(i);
        const primary = column.stageKeys.some(stageKey => mapping.primary.includes(stageKey));
        const co = !primary && column.stageKeys.some(stageKey => mapping.collaborate.includes(stageKey));
        if (!primary && !co) return '';
        const className = `matrix-role-dot ${primary ? 'is-lead' : 'is-co'}${column.outside ? ' is-outside' : ''}`;
        const mark = column.outside
          ? `<rect class="${className}" x="${x - 10}" y="${y - 10}" width="20" height="20" />`
          : `<circle class="${className}" cx="${x}" cy="${y}" r="${primary ? 18 : 13}" />`;
        return `<path class="matrix-link ${primary ? 'is-lead' : 'is-co'}" d="M${x} ${topY + 17} V${y - 9}" />${mark}`;
      }).join('');
      const rowLine = `<path class="matrix-rowline" d="M${left} ${y} H${gateX - 19} M${gateX + 19} ${y} H${doneX}" />`;
      return `<g class="matrix-row" data-role="${esc(role.name)}">
        ${rowLine}<text class="matrix-role-label" x="12" y="${y + 7}">${esc(role.name)}</text>${cells}
      </g>`;
    }).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field matrix-field">
        <svg class="roles-matrix" viewBox="0 0 ${width} ${height}" role="img" aria-label="七種角色連到各階段的主責與協作矩陣">
          ${stageLine}${stageNodes}${rows}
        </svg>
        <div class="matrix-legend"><span><i class="legend-lead"></i>主責</span><span><i class="legend-co"></i>協作</span><span>Human Gate 菱形為欄外決策</span></div>
      </div>
    </div>`;
  }

  function renderDocumentTypes(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field doc-type-field">
        <div class="doc-tree-root"><span>為什麼做</span><strong>Goal／Proposal</strong></div>
        <div class="tree-trunk" aria-hidden="true"></div>
        <div class="ticket-tree">
          <div class="ticket-node epic"><strong>Epic</strong><span>一組相關工作</span></div>
          <span class="tree-arrow" aria-hidden="true">→</span>
          <div class="ticket-node story"><strong>Story</strong><span>可驗收的使用者結果</span></div>
          <span class="tree-arrow" aria-hidden="true">→</span>
          <div class="ticket-node task"><strong>Task</strong><span>可交辦的工作</span></div>
        </div>
        <div class="ticket-caption">Ticket 是追蹤工作契約的紀錄；Epic／Story／Task 分類依團隊設定。</div>
        <div class="doc-branch-line" aria-hidden="true"></div>
        <div class="contract-artifacts">
          <article><b>Scope</b><span>界定做與不做</span></article>
          <article><b>AC</b><span>說明要符合什麼</span></article>
          <article><b>AT</b><span>描述如何檢查</span></article>
          <article><b>DoD</b><span>共享完成條件</span></article>
        </div>
      </div>
    </div>`;
  }

  function renderDocumentLifecycle(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field lifecycle-field">
        <div class="lifecycle-heading"><strong>同一張教學示意 Issue 的工作契約</strong><span>Backlog → Ready → Dev → Review → QA → Product Check → Done</span></div>
        <div class="lifecycle-compare">
          <article class="lifecycle-snapshot lifecycle-before">
            <header><span>BEFORE · Backlog</span><strong>工作契約形成</strong></header>
            <div><b>Ticket 內容</b><span>Parent Goal、Scope、AC／AT、依賴</span></div>
            <div><b>可追溯位置</b><span>Issue 描述；Project 狀態為 Backlog</span></div>
          </article>
          <span class="lifecycle-change" aria-hidden="true">→</span>
          <article class="lifecycle-snapshot lifecycle-after">
            <header><span>AFTER · QA／Product Check</span><strong>原契約保留，補上版本與檢查指向</strong></header>
            <div><b>Ticket 內容</b><span>原 AC／範圍可回查；實際 findings 與 Evidence 依執行補記</span></div>
            <div><b>可追溯位置</b><span>Project 記錄各站狀態；Issue ↔ PR 差異與 Review ↔ 候選 Commit／Evidence</span></div>
          </article>
        </div>
        <div class="lifecycle-trace" aria-label="工作紀錄與版本的追溯位置">
          <span>Issue · 契約</span><i>↔</i><span>Project · 狀態</span><i>→</i><span>PR · 差異／Review</span><i>→</i><span>Commit · 版本</span><i>＋</i><span>Evidence · 實際檢查</span>
        </div>
        <div class="lifecycle-note"><b>示意流程</b><span>只記錄實際發生的 Review、測試與 Evidence；Issue／PR 不等於 Git Commit。</span></div>
      </div>
    </div>`;
  }

  function renderCriteria(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field criteria-field">
        <div class="criteria-scope">
          <article class="criteria-level goal-level"><span>產品結果</span><strong>Product Goal</strong><small>上線後另量整體 Outcome</small></article>
          <div class="criteria-down" aria-hidden="true">↓</div>
          <article class="criteria-level stage-level"><span>本站工作與交接</span><strong>Stage Target → Exit Criteria</strong><small>本站做什麼？什麼條件才可交棒？</small></article>
          <div class="criteria-down" aria-hidden="true">↓</div>
          <article class="criteria-level ticket-level"><span>單張工作票</span><strong>Scope → AC</strong><small>範圍內要呈現什麼行為？</small></article>
        </div>
        <div class="criteria-checks">
          <article class="criteria-card"><span>驗證情境</span><strong>AT</strong><small>如何檢查 AC</small></article>
          <i class="criteria-link" aria-hidden="true">↓</i>
          <article class="criteria-card"><span>跨階段共識</span><strong>DoD</strong><small>適用各相關階段，不聚焦單一工作站</small></article>
          <i class="criteria-link" aria-hidden="true">↓</i>
          <article class="criteria-card evidence-node"><span>實際觀察</span><strong>Evidence</strong><small>對上候選版本與測試範圍</small></article>
        </div>
      </div>
    </div>`;
  }

  function renderGitGithub(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field git-github-field">
        <div class="relation-lane document-lane">
          <span class="lane-label">工作紀錄／文件</span>
          <article><b>Issue</b><small>需求、決議、工作票</small></article>
          <article><b>Project</b><small>跨工作項目狀態</small></article>
          <article><b>Repo docs</b><small>規格與設計文件</small></article>
        </div>
        <div class="github-spine"><span></span><strong>GitHub</strong><span></span><small>協作平台，連接工作與版本審查</small></div>
        <div class="relation-lane version-lane">
          <span class="lane-label">程式版本／審查</span>
          <article><b>Git Repo</b><small>受追蹤的檔案歷史</small></article>
          <article><b>Branch</b><small>隔離候選修改</small></article>
          <article class="pr-bridge"><b>Pull Request</b><small>版本差異＋文字討論</small></article>
          <article><b>Commit／Merge</b><small>節點與整合</small></article>
        </div>
        <div class="cross-relation"><span>工作契約引用版本差異</span><i aria-hidden="true">↕</i><span>PR 連回 Issue 與候選 Commit</span></div>
      </div>
    </div>`;
  }

  function renderVersionHistory(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field version-history-field">
        <svg class="git-history" viewBox="0 0 1000 450" role="img" aria-label="Branch、Commit、PR、Merge 與回復路徑的版本關係">
          <defs>
            <marker id="arrow-version" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" /></marker>
            <marker id="arrow-rollback" markerWidth="10" markerHeight="10" refX="2" refY="5" orient="auto"><path d="M10,0 L0,5 L10,10 Z" /></marker>
          </defs>
          <path class="git-track main-track" d="M76 290 H930" />
          <path class="git-track branch-track" d="M250 290 C320 290 330 150 420 150 H675 C745 150 745 290 820 290" />
          <path class="git-track review-track" d="M675 150 C730 158 782 218 820 280" marker-end="url(#arrow-version)" />
          <path class="git-track rollback-track" d="M820 310 C850 340 850 385 790 385 H430 C398 385 390 354 390 310" marker-end="url(#arrow-rollback)" />
          <circle class="git-dot" cx="110" cy="290" r="13" /><circle class="git-dot" cx="250" cy="290" r="13" /><circle class="git-dot recovery-dot" cx="390" cy="290" r="13" />
          <circle class="git-dot branch-dot" cx="420" cy="150" r="13" /><circle class="git-dot branch-dot" cx="560" cy="150" r="13" />
          <circle class="git-dot pr-dot" cx="675" cy="150" r="15" /><circle class="git-dot merge-dot" cx="820" cy="290" r="15" />
          <text x="110" y="335" text-anchor="middle">Repo 主線</text><text x="250" y="335" text-anchor="middle">Branch</text>
          <text class="recovery-node-label" x="390" y="250" text-anchor="middle">Revert Commit</text>
          <text x="420" y="111" text-anchor="middle">Commit</text><text x="560" y="111" text-anchor="middle">更多修改</text>
          <text x="675" y="111" text-anchor="middle">PR／Review</text><text x="820" y="250" text-anchor="middle">Merge</text>
          <text class="recovery-label" x="590" y="356" text-anchor="middle">回復以新增 Revert Commit，保留既有歷史</text>
        </svg>
        <div class="history-legend"><span><i class="legend-main"></i>既有版本</span><span><i class="legend-branch"></i>候選分支</span><span><i class="legend-pr"></i>PR／Review</span><span><i class="legend-recovery"></i>回復路徑</span></div>
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
    const principles = [
      'External Task State', 'Bounded Execution', 'Role Separation',
      'Independent Verification', 'Goal Re-anchoring',
    ].map((name, index) => `<li><b>${index + 1}</b><span>${name}</span></li>`).join('');
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field agent-primer-field">
        <div class="agent-work-path">
          <article><span>人類交辦</span><strong>票／範圍／停止條件</strong></article>
          <i aria-hidden="true">→</i><article class="agent-executor"><span>Agent 執行／協調</span><strong>在授權內完成指定工作</strong></article>
          <i aria-hidden="true">→</i><article><span>人類判斷</span><strong>審查、驗證與放行</strong></article>
        </div>
        <div class="agent-terms" aria-label="四個不同概念">${termCards}</div>
        <div class="principle-preview"><strong>五項守則，後半完整示範</strong><ol>${principles}</ol></div>
        <div class="matching-preview">有人想做配對</div>
      </div>
    </div>`;
  }

  function renderStageCard(slide, stageKey) {
    const data = STAGES[stageKey];
    if (!data) return '<p class="render-error">Stage data unavailable.</p>';
    const activities = data.activities.map(activity => `<li>${esc(activity)}</li>`).join('');
    const leads = data.lead.map(person => `<span class="role-chip is-lead" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const collaborators = data.co.map(person => `<span class="role-chip is-co" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const nextStage = data.nextStage || 'Done';
    return `<div class="focus-compose stage-compose">${locator(slide)}
      <div class="diagram-field stage-panel">
        <div class="stage-goal-target">
          <article><span>Product Goal reference</span><strong>${esc(data.goal)}</strong></article>
          <article class="target-card"><span>Stage Target</span><strong>${esc(data.target)}</strong></article>
        </div>
        <div class="stage-handoff-flow" aria-label="Input、本站 Activities、Output 與下一站">
          <article class="stage-flow-card stage-input"><span>Input</span><strong>${esc(data.input)}</strong></article>
          <span class="stage-flow-arrow" aria-hidden="true">→</span>
          <section class="stage-activities"><h2>Activities</h2><ul>${activities}</ul><p class="stage-state-delta">狀態：${esc(data.stateChange)}</p></section>
          <span class="stage-flow-arrow" aria-hidden="true">→</span>
          <article class="stage-flow-card stage-output"><span>Output</span><strong>${esc(data.output)}</strong>${data.outputNote ? `<small>${esc(data.outputNote)}</small>` : ''}<p class="stage-handoff">${esc(data.handoff)}</p></article>
          <div class="stage-next"><span aria-hidden="true">→</span><strong>${esc(nextStage)}</strong></div>
        </div>
        <div class="stage-bottom-row">
          <section class="stage-people"><h2>People</h2><div class="role-chip-list">${leads}${collaborators}</div><p><span class="people-key lead-key">主責</span><span class="people-key co-key">協作</span></p></section>
          <article class="stage-exit"><span>Exit Criteria</span><strong>${esc(data.exit)}</strong></article>
          <article class="stage-github"><span class="github-heading"><svg viewBox="0 0 24 24" role="img" aria-label="GitHub"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.36 1.08 2.94.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.02c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.36.31.68.92.68 1.86v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg><b>GitHub</b></span><strong>${esc(data.githubObjects || data.github)}</strong><p>${esc(data.github)}</p></article>
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
          <ol class="exercise-question" aria-label="作答問題">
            <li><b>Goal</b><span>從票面能否找到它要推進的產品結果？還缺哪些連結或背景？</span></li>
            <li><b>Stage Target</b><span>目前有哪些工作已明確，哪些仍待界定？</span></li>
            <li><b>AC／留言</b><span>現有 AC 可如何檢查？兩則留言帶來哪些範圍或例外問題？</span></li>
            <li><b>People／Exit</b><span>下一站前要確認哪些責任與交接條件？</span></li>
            <li><b>GitHub／版本</b><span>哪些資訊更新在 Issue 或 Project？何時才需要連結 PR 與版本？</span></li>
          </ol>
          <div class="exercise-answer fragment" data-fragment-order="1">
            <h2>參考判斷</h2>
            <p><b>Goal／Target：</b>票面沒有 Parent Goal 連結，需先補上或確認；目前在 Backlog，本站釐清範圍、AC、例外行為與依賴，整理成可交接的票。</p>
            <p><b>AC／留言：</b>AC 有可檢查的主路徑，仍需定義小螢幕呈現與缺少更新時間時的結果。</p>
            <p><b>People／Exit：</b>由 PO 與 Dev 主責 Ready Check、QA 協作；責任人與接手 Dev 需明確，範圍、可測性與依賴需有結論後才交接。</p>
            <p><b>GitHub／版本：</b>Issue 保留工作契約，Project 記錄看板狀態；有候選程式修改時再連 Branch／Commit／PR。票面尚未提供版本資訊，不據此推定其狀態。</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderArtwork(slide) {
    const art = slide.querySelector('.artwork');
    const key = slide.dataset.art;
    if (key === 'mother-map') {
      const agent = slide.dataset.agent === 'true';
      art.innerHTML = `<div class="full-map-wrap">${renderMotherMap({
        compact: false,
        agent,
        revealAgent: slide.dataset.rev13SceneId === 'O02',
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
    nextButton.disabled = pageIndex === slides.length - 1;
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
    const hidden = [...slides[pageIndex].querySelectorAll('.fragment:not(.visible)')];
    const next = hidden.sort((a, b) => Number(a.dataset.fragmentOrder || 1) - Number(b.dataset.fragmentOrder || 1))[0];
    if (!next) return false;
    next.classList.add('visible');
    return true;
  }

  function previousFragment() {
    const visible = [...slides[pageIndex].querySelectorAll('.fragment.visible')];
    if (!visible.length) return false;
    visible.sort((a, b) => Number(a.dataset.fragmentOrder || 1) - Number(b.dataset.fragmentOrder || 1));
    const last = visible.at(-1);
    last.classList.remove('visible');
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
