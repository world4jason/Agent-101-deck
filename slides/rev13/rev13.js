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
      agentMode = '', mapFooter = '',
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
        <strong>${esc(role.name)}</strong>
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

    const agentRoutes = {
      delegate: '<span class="agent-route"><b>executor</b><i>→</i><strong>Dev</strong></span><span class="agent-route human-route"><b>Human</b><i>→</i><strong>範圍／Gate</strong></span>',
      single: '<span class="agent-route"><b>Agent executor</b><i>→</i><strong>Dev 工作</strong></span><span class="agent-route human-route"><b>QA／Owner</b><i>→</i><strong>驗證／授權</strong></span>',
      'multi-chat': '<span class="agent-route"><b>Dev Chat</b><i>→</i><strong>Ticket handoff</strong><i>→</i><b>Reviewer／QA Chat</b></span><span class="agent-route human-route"><b>Human</b><i>→</i><strong>交接決定</strong></span>',
      orchestrator: '<span class="agent-route"><b>Orchestrator</b><i>→</i><strong>Dev · Reviewer · QA</strong></span><span class="agent-route human-route"><b>Human Owner</b><i>→</i><strong>Human Gate</strong></span>',
    };
    let agentMarkup = '';
    if (agent) {
      agentMarkup = `<div class="agent-layer${revealAgent ? ' fragment' : ''}${agentMode ? ' has-routing' : ''}" role="group" aria-label="Agent：受委派執行／協調；範圍、責任與 Human Gate 仍連回原四區"${revealAgent ? ' data-fragment-order="1"' : ''}>
        <span class="agent-identity"><span class="agent-mark" aria-hidden="true">A</span><strong>Agent</strong></span>
        ${agentMode ? `<div class="agent-routing">${agentRoutes[agentMode] || agentRoutes.delegate}</div>` : '<span>受委派執行／協調；人決定範圍與放行</span>'}
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
              <span>Product Check 後的人類授權</span><span class="gate-line" aria-hidden="true"></span>
            </div>
          </section>
          <section class="${zoneClass('documents')} zone-documents" data-zone="documents" aria-label="Documents 文件">
            <header class="zone-heading"><span class="zone-symbol">▤</span><h2><span class="zone-name-full">Documents</span><em>文件</em></h2></header>
            <div class="doc-stack" role="group" aria-label="文件：Goal／Proposal、Epic／Story／Task、Scope／AC／AT／DoD、Review／Evidence">
              <div class="doc-piece"><b>Goal／Proposal</b><span>為何做</span></div>
              <div class="doc-piece"><b>Epic · Story · Task</b><span>拆分工作</span></div>
              <div class="doc-piece"><b>Scope · AC · AT · DoD</b><span>做與驗</span></div>
              <div class="doc-piece"><b>Review · Evidence</b><span>審查與證據</span></div>
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
        ${mapFooter}
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
    const topY = 105;
    const rowStart = 166;
    const rowGap = 50;
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
        labelMarkup = `<rect class="matrix-activity-pill" x="${x - 94}" y="6" width="188" height="27" rx="5" /><text class="matrix-activity" x="${x}" y="25" text-anchor="middle">↗ Brainstorming</text><rect class="matrix-activity-pill" x="${x - 94}" y="37" width="188" height="27" rx="5" /><text class="matrix-activity" x="${x}" y="56" text-anchor="middle">↔ Refinement</text><text class="matrix-backlog-label" x="${x}" y="88" text-anchor="middle">Backlog</text>`;
      } else if (column.label === 'Product Check') {
        labelMarkup = `<text text-anchor="middle"><tspan x="${x}" y="50">Product</tspan><tspan x="${x}" y="72">Check</tspan></text>`;
      } else if (column.outside) {
        labelMarkup = `<text x="${x}" y="78" text-anchor="middle">Human Gate</text>`;
      } else {
        labelMarkup = `<text x="${x}" y="64" text-anchor="middle">${esc(column.label)}</text>`;
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
      const cells = columns.map((column, i) => {
        const x = columnX(i);
        const primary = column.stageKeys.some(stageKey => STAGES[stageKey].lead.includes(role.name));
        const co = !primary && column.stageKeys.some(stageKey => STAGES[stageKey].co.includes(role.name));
        if (!primary && !co) return '';
        const className = `matrix-role-dot ${primary ? 'is-lead' : 'is-co'}${column.outside ? ' is-outside' : ''}`;
        const mark = column.outside && primary
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
        <div class="matrix-legend"><span><i class="legend-lead"></i>主責</span><span><i class="legend-co"></i>協作</span><span><i class="legend-gate"></i>欄外決策</span></div>
      </div>
    </div>`;
  }

  function renderDocumentTypes(slide) {
    return `<div class="focus-compose">${locator(slide)}
      <div class="diagram-field doc-type-field">
        <div class="doc-tree-root"><span>為什麼做</span><strong>Goal／Proposal</strong></div>
        <div class="tree-trunk" aria-hidden="true"></div>
        <section class="ticket-cluster" aria-label="Ticket／工作票可依團隊分類為 Epic、Story 或 Task">
          <header><strong>Ticket／工作票</strong><span>承載工作契約；分類依團隊設定</span></header>
          <div class="ticket-tree">
            <div class="ticket-node epic"><strong>Epic</strong><span>一組相關工作</span></div>
            <span class="tree-arrow" aria-hidden="true">→</span>
            <div class="ticket-node story"><strong>Story</strong><span>可驗收的使用者結果</span></div>
            <span class="tree-arrow" aria-hidden="true">→</span>
            <div class="ticket-node task"><strong>Task</strong><span>可交辦的工作</span></div>
          </div>
        </div>
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
        <div class="lifecycle-heading"><strong>同一張示意 Issue，沿流程逐步補記</strong><span>原工作契約持續保留</span></div>
        <div class="lifecycle-contract"><b>Issue：</b>Parent Goal · Scope · AC／AT · 依賴</div>
        <div class="lifecycle-flow" aria-label="需求拆票、交付、Review、Evidence 與放行記錄的六步生命週期">
          <article class="lifecycle-step" data-step="1"><span>Backlog · 需求／拆票</span><strong>把工作變成可交辦契約</strong><small>Parent Goal、Scope、AC／AT</small></article>
          <article class="lifecycle-step" data-step="2"><span>Ready · 交接條件</span><strong>確認責任與可驗證性</strong><small>接手者、依賴、Exit 條件</small></article>
          <article class="lifecycle-step" data-step="3"><span>Dev · 交付候選版</span><strong>連結程式修改</strong><small>Branch、Commit、PR 差異</small></article>
          <article class="lifecycle-step" data-step="4"><span>Review · 審查更新</span><strong>保留發現與處置</strong><small>PR Review findings；未處置項回到 Dev</small></article>
          <article class="lifecycle-step" data-step="5"><span>QA／Product Check · Evidence</span><strong>把結果對回 AC 與版本</strong><small>結果連到候選 Commit；未測項：NOT RUN</small></article>
          <article class="lifecycle-step" data-step="6"><span>Human Gate · 放行記錄</span><strong>留下 Go／No-Go 與理由</strong><small>只在授權後進入後續 Merge／Release</small></article>
        </div>
        <div class="lifecycle-note"><b>示意流程</b><span>Review、測試、Evidence 與放行只在實際發生時補記；本圖不代表 Matching 文件已建立。</span></div>
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
        <div class="relation-lane github-collab-lane">
          <span class="lane-label">GitHub 協作軌</span>
          <article><b>Issue</b><small>需求、決議、工作票</small></article>
          <article><b>Project</b><small>看板欄位與工作狀態</small></article>
          <article class="pr-bridge"><b>Pull Request</b><small>版本差異、Review、Checks</small></article>
          <article><b>Review</b><small>審查意見與處置</small></article>
        </div>
        <div class="track-intersection" aria-label="Pull Request 連到候選 Commit">
          <span class="track-link" aria-hidden="true"></span>
          <span class="track-link-label">PR 對照候選 Commit</span>
        </div>
        <div class="relation-lane git-version-lane">
          <span class="lane-label">Git 版本軌</span>
          <article><b>Git Repo</b><small>檔案版本歷史</small></article>
          <article><b>Branch</b><small>隔離候選修改</small></article>
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
          <path class="git-track rollback-track" d="M744 304 C770 350 820 350 855 304" marker-end="url(#arrow-rollback)" />
          <circle class="git-dot" cx="110" cy="290" r="13" /><circle class="git-dot" cx="250" cy="290" r="13" />
          <circle class="git-dot branch-dot" cx="420" cy="150" r="13" /><circle class="git-dot branch-dot" cx="540" cy="150" r="13" />
          <circle class="git-dot pr-dot" cx="650" cy="150" r="15" /><circle class="git-dot merge-dot" cx="735" cy="290" r="15" />
          <circle class="git-dot recovery-dot" cx="870" cy="290" r="13" />
          <text x="110" y="335" text-anchor="middle">Repo 主線</text><text x="250" y="335" text-anchor="middle">Branch</text>
          <text x="420" y="111" text-anchor="middle">Commit</text><text x="540" y="111" text-anchor="middle">更多修改</text>
          <text x="650" y="78" text-anchor="middle">PR／Review</text><text x="735" y="252" text-anchor="middle">Merge</text>
          <text class="recovery-node-label" x="870" y="255" text-anchor="middle">Revert Commit</text>
          <text class="recovery-label" x="870" y="402" text-anchor="middle">回復以新增 Revert Commit，保留既有歷史</text>
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
    const notes = slide.querySelector('.notes');
    const detail = document.createElement('p');
    detail.innerHTML = `<strong>Stage Card 補充：</strong>${esc([
      `完整產出：${data.output}`, `狀態變化：${data.stateChange}`,
      `交接：${data.handoff}`, `GitHub：${data.github}`,
      ...(data.outputNote ? [`證據界線：${data.outputNote}`] : []),
    ].join('；'))}`;
    notes.append(detail);
    const activities = data.activities.map(activity => `<li>${esc(activity)}</li>`).join('');
    const leads = data.lead.map(person => `<span class="role-chip is-lead" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const collaborators = data.co.map(person => `<span class="role-chip is-co" data-role="${esc(person)}">${esc(person)}</span>`).join('');
    const nextStage = data.nextStage || 'Done';
    const conciseOutput = {
      refinement: 'Parent／Child Tickets、Scope、AC／AT、預期 Evidence',
      release_done: 'Merged Commit、Release 紀錄與 DoD 證據',
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
            <li><b>GitHub／版本</b><span>哪些資訊更新在 Issue 或 Project？何時才需要連結 PR 與版本？</span><p class="exercise-answer fragment" data-fragment-order="5"><b>參考：</b>Issue 留契約、Project 記狀態；有程式修改再連 Branch／Commit／PR，票面無候選版本。</p></li>
          </ol>
        </div>
      </div>
    </div>`;
  }

  const B2_MAP_STATE = {
    B04: { badges: [['documents', 'NEW · Goal Issue · 教學示意', 'documents']], footer: '<span class="delta-mark">NEW</span><strong>Goal Issue 已建立</strong><span>仍在 Brainstorming／Backlog · 示意</span>' },
    R05: { badges: [['documents', 'Parent + 3 子票 · 示意', 'documents']], ticket: 'backlog', footer: '<span class="delta-mark">NEW</span><strong>Parent → #1／#3／#2</strong><span>#3 在 Backlog · WIP 0/1 · 示意</span>' },
    RD02: { ticket: 'ready', previous: 'backlog', footer: '<span class="delta-mark">MOVE</span><strong>Backlog (#3) → Ready (#3)</strong><span>WIP 0/1 · 教學流程示意</span>' },
    D04: { badges: [['documents', 'Candidate A · 示意', 'version'], ['version', 'Branch → Commit · 示意', 'version']], ticket: 'dev', previous: 'ready', footer: '<span class="delta-mark">MOVE</span><strong>Ready → Dev</strong><span>WIP 0/1 → 1/1 · Candidate A 為示意</span>' },
    RV03: { badges: [['version', 'PR · Changes requested · 示意', 'agent'], ['process', '回 Dev 修正 · 示意', 'process']], ticket: 'dev', previous: 'review', footer: '<span class="delta-mark">RETURN</span><strong>Review → Dev</strong><span>PR 未 Merge；QA 尚未開始 · 示意</span>' },
    Q05: { badges: [['documents', 'A → B-pre → B-post', 'documents'], ['version', 'UI／E2E · NOT RUN', 'gate']], ticket: 'qa', previous: 'dev', footer: '<span class="delta-mark">EVIDENCE</span><strong>A FAIL → B-pre partial PASS → B-post duplicate PASS</strong><span>規則層實測；流程位置示意；UI／E2E／Release／Goal NOT RUN</span>' },
    PC02: { badges: [['documents', '#3 規則 Evidence · 可審', 'documents'], ['version', 'UI／E2E／Goal · NOT RUN', 'gate']], ticket: 'product-check', footer: '<span class="delta-mark">SCOPE</span><strong>單票規則 Evidence 可審</strong><span>Product Check 流程示意；整體 Goal 未驗</span>' },
    HG02: { badges: [['process', 'Human Gate · 暫停 · 示意', 'gate'], ['documents', 'Release Checklist · NOT RUN', 'gate']], ticket: 'product-check', footer: '<span class="delta-mark is-hold">HOLD</span><strong>Product Check → Human Gate 暫停</strong><span>教學推演；無 Merge／Release／Done 證據</span>' },
    A01: { footer: '<span class="delta-mark">AGENT</span><strong>第五層加入 executor／coordinator</strong><span>協作模式示意；原四區與 Human Gate 保持</span>' },
    A02: { footer: '<span class="delta-mark">MODE 1 · 示意</span><strong>Agent executor → Dev；QA／Owner → 驗證／授權</strong><span>同一 #3 Ticket 與 AC；Human Gate 仍由人負責</span>' },
    A03: { footer: '<span class="delta-mark">架構示意</span><strong>非真實 multi-agent run</strong><span>Dev Chat → Ticket handoff → Reviewer／QA Chat</span>' },
    A04: { footer: '<span class="delta-mark">架構示意</span><strong>非真實 multi-agent run</strong><span>Orchestrator → Dev／Reviewer／QA；Human Gate 仍由人負責</span>' },
    A11: { badges: [['documents', '1 External Task State · 5 Goal Re-anchoring', 'documents'], ['process', '2 Bounded Execution', 'process'], ['people', '3 Role Separation', 'people'], ['version', '4 Independent Verification', 'version']], footer: '<span class="principle-pin"><b>1</b> External Task State → Issue</span><span class="principle-pin"><b>2</b> Bounded Execution → Scope</span><span class="principle-pin"><b>3</b> Role Separation → Human Gate</span><span class="principle-pin"><b>4</b> Independent Verification → Evidence</span><span class="principle-pin"><b>5</b> Goal Re-anchoring → Parent</span>' },
  };

  function addMapMarkers(markup, delta, slide) {
    let output = markup;
    (delta?.badges || []).forEach(([zone, label, type]) => {
      const section = new RegExp(`(<section class="[^"]*zone-${zone}"[^>]*>)`);
      output = output.replace(section, `$1<span class="map-zone-badge badge-${type}">${esc(label)}</span>`);
    });
    const position = slide.dataset.ticketPosition;
    const previous = slide.dataset.ticketPrevious;
    if (position) {
      const target = new RegExp(`(data-state="${position}"[^>]*>\\s*<span>[^<]+<\\/span>)`);
      output = output.replace(target, '$1<span class="map-ticket map-ticket-current">#3</span>');
    }
    if (previous) {
      const source = new RegExp(`(data-state="${previous}"[^>]*>\\s*<span>[^<]+<\\/span>)`);
      output = output.replace(source, '$1<span class="map-ticket map-ticket-ghost">#3</span>');
    }
    return output;
  }

  function renderPart2Map(slide) {
    const scene = slide.dataset.rev13SceneId;
    const delta = B2_MAP_STATE[scene];
    const footer = delta?.footer ? `<div class="map-delta${scene === 'A11' ? ' principle-pin-row' : ''}" aria-label="本頁狀態差">${delta.footer}</div>` : '';
    const zones = (slide.dataset.focusZones || '').split(',').filter(Boolean);
    const roles = (slide.dataset.focusRolesMap || '').split(',').map(role => role.trim()).filter(Boolean);
    const map = renderMotherMap({
      spotlightZones: ['O03', 'A01', 'A02', 'A03', 'A04', 'A11'].includes(scene) ? [] : zones,
      roles: ['O03', 'A01', 'A02', 'A03', 'A04', 'A11'].includes(scene) ? [] : roles,
      stage: slide.dataset.focusStage || '',
      states: (slide.dataset.stateMarkers || '').split(',').filter(Boolean),
      agent: true,
      agentMode: slide.dataset.agentMode || '',
      mapFooter: footer,
    });
    return `<div class="full-map-wrap b2-full-map">${addMapMarkers(map, delta, slide)}</div>`;
  }

  function artifactCard(label, title, content, className = '') {
    return `<article class="b2-card ${className}"><span class="b2-card-label">${esc(label)}</span><strong>${esc(title)}</strong><div>${content}</div></article>`;
  }

  function issueSheet({ title, state = 'Backlog', teaching = true, workItem = 'Ticket #3 · Matching 規則', sections = [] }) {
    return `<article class="issue-sheet">
      <header class="issue-head"><div><span class="issue-symbol">●</span><strong>${esc(title)}</strong></div><span class="status-pill">${esc(state)}</span></header>
      <div class="issue-meta"><span>${teaching ? '教學示意' : '規則層實測'}</span><span>${esc(workItem)}</span><span>Owner／PO 可回查</span></div>
      <div class="issue-sections">${sections.map(([label, body, kind = '']) => `<section class="issue-section ${kind}"><h2>${esc(label)}</h2>${body}</section>`).join('')}</div>
    </article>`;
  }

  function renderTicketDefinition() {
    return issueSheet({
      title: '雙向 Like 才建立配對',
      sections: [
        ['Scope', '<p>只處理配對規則與配對紀錄。</p>'],
        ['Out-of-scope', '<p>UI、登入、網路服務、資料庫、完整產品串接。</p>'],
        ['Acceptance Criteria', '<ul><li>AC1：單向 Like，配對紀錄數為 0。</li><li>AC2：互相 Like，只建立一筆 M01，成員為兩人。</li><li>AC3：已有 M01 再 Like，仍只有一筆。</li></ul>', 'ac'],
        ['Acceptance Tests', '<ul><li>單向 Like → 預期 0 筆。</li><li>雙向 Like → 預期 1 筆 M01。</li><li>重複 Like → 預期仍為 1 筆 M01。</li><li>每個案例用同一份假資料重置。</li></ul>'],
        ['Definition of Done', '<p>每個已執行案例都記錄版本、預期、實際、筆數與 artifact SHA-256；未執行項維持 NOT RUN。</p>'],
      ],
    });
  }

  function qaTable(rows) {
    return `<table class="qa-table"><thead><tr><th>版本</th><th>案例</th><th>預期</th><th>實際</th><th>結果</th></tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => `<td${index === 4 ? ` class="result-cell result-${String(cell).toLowerCase().replaceAll(' ', '-')}"` : ''}>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  function renderPart2Work(slide) {
    const id = slide.dataset.rev13SceneId;
    const locatorMarkup = locator(slide);
    let body = '';
    switch (id) {
      case 'B01':
        body = `<div class="brainstorm-grid"><article><span>使用者問題</span><strong>「配對功能正常」還不夠明確</strong><p>誰遇到什麼困難？</p></article><article><span>要釐清的假設</span><strong>哪個 Like 情境才建立配對？</strong><p>單向、雙向與重複輸入</p></article><article><span>共同決定 · 示意</span><strong>Owner · PM · PO</strong><p>記下選項、未知與方向</p></article></div>`;
        break;
      case 'B02':
        body = `<div class="goal-flow"><article><span>待釐清請求</span><strong>配對功能正常</strong><p>成功條件尚未定義</p></article><i>→</i><article class="goal-result"><span>Outcome Goal · 示意</span><strong>雙方互相 Like 時，配對紀錄只出現一次</strong><p>成功訊號：對照規則案例的配對紀錄數</p></article><article class="goal-open"><span>仍待決定</span><strong>整體產品成效與介面路徑</strong><p>本頁沒有測量這些結果</p></article></div>`;
        break;
      case 'B03':
        body = issueSheet({ title: 'Goal／Proposal：配對規則方向', workItem: 'Parent Goal · 配對體驗', sections: [
          ['Outcome Goal', '<p>把使用者問題與預期結果記在同一份紀錄。</p>'],
          ['成功訊號', '<p>規則案例可核對預期與實際配對紀錄數。</p>'],
          ['待確認', '<p>整體產品範圍、介面與依賴留待 Refinement。</p>'],
        ] });
        break;
      case 'R01':
        body = `<div class="refinement-board"><div class="refinement-source"><span>輸入 · 教學示意</span><strong>同一張 Goal Issue</strong><p>目標、限制、未知事項</p></div><div class="refinement-checks"><h2>Refinement 要回答</h2><ul><li>可行性與風險</li><li>Scope 與 Out-of-scope</li><li>相依工作與順序</li><li>AC、AT 與 Evidence</li></ul></div><div class="refinement-handoff"><span>輸出 · 教學示意</span><strong>可交接的 Parent／Child Issues</strong><p>仍在 Backlog</p></div></div>`;
        break;
      case 'R02':
        body = `<div class="issue-tree"><article class="parent-issue"><span>Parent Goal · 教學示意</span><strong>配對體驗</strong><p>依賴與順序記回 Parent</p></article><div class="tree-stem"></div><div class="child-issues"><article><span>#1</span><strong>Like／Pass</strong></article><article class="child-primary"><span>#3</span><strong>雙向 Like → 配對紀錄</strong><small>本課 lead example</small></article><article><span>#2</span><strong>配對清單</strong></article></div></div>`;
        break;
      case 'R03':
        body = renderTicketDefinition();
        break;
      case 'R04':
        body = `<div class="issue-tree issue-tree-updated"><article class="parent-issue"><span>Parent Issue · 更新 · 示意</span><strong>配對體驗</strong><p>子票、依賴、順序與 Project 狀態</p></article><div class="tree-stem"></div><div class="child-issues"><article><span>#1</span><strong>Like／Pass</strong><small>連回 Parent</small></article><article class="child-primary"><span>#3</span><strong>配對規則</strong><small>AC／AT／DoD 已補</small></article><article><span>#2</span><strong>配對清單</strong><small>連回 Parent</small></article></div><div class="project-state"><b>Project · 示意</b><span>#3 Status · Backlog</span></div></div>`;
        break;
      case 'RD01':
        body = `<div class="ready-check"><article><b>Scope</b><span>單一規則票；範圍與排除事項清楚</span></article><article><b>AC／AT</b><span>三種情境都有明確預期與測法</span></article><article><b>依賴</b><span>必要關係與接手責任已記錄</span></article><article><b>可測性</b><span>假資料、紀錄筆數與版本可識別</span></article><div class="ready-result"><strong>Ready Check · 示意</strong><span>可交 Dev 開工；尚無測試 PASS</span></div></div>`;
        break;
      case 'D01':
        body = `<div class="dev-intake"><article><span>Input · 示意</span><strong>Ready Ticket #3</strong><p>Scope · AC1–AC3 · Stop Rule</p></article><i>→</i><article class="dev-active"><span>Dev · WIP 1/1 · 示意</span><strong>在核准範圍內實作</strong><p>開始工作不等於已有 PASS</p></article><article><span>接手責任</span><strong>Dev</strong><p>Ticket 記錄進度與未完成項</p></article></div>`;
        break;
      case 'D02':
        body = `<div class="git-flow"><span>Git／GitHub 關係 · 示意</span><div class="git-chain"><article class="git-ticket"><span>工作契約</span><strong>Issue #3</strong><small>Scope · AC · AT</small></article><i>→</i><article><span>隔離修改</span><strong>Branch</strong><small>同一 Repo</small></article><i>→</i><article><span>版本節點</span><strong>Commit</strong><small>記錄變更</small></article><i>→</i><article class="git-pr"><span>協作送審</span><strong>GitHub PR</strong><small>差異連回 Issue</small></article></div></div>`;
        break;
      case 'D03':
        body = `<div class="candidate-card"><header><span>候選版本</span><strong>Candidate A</strong><em>教學示意</em></header><div><article><b>修改摘要</b><span>配對規則變更</span></article><article><b>自測紀錄</b><span>交付內容待獨立 QA 核對</span></article><article><b>未完成項</b><span>逐條 AC Evidence 交 QA 補驗</span></article></div><footer>Candidate ≠ PASS　 ·　PR ≠ Ticket　 ·　Issue #3 保留工作範圍</footer></div>`;
        break;
      case 'RV01':
      case 'RV02':
        body = `<article class="pr-sheet"><header><div><span class="pr-symbol">⑂</span><strong>${id === 'RV01' ? '配對規則候選修改' : '範圍外聊天室變更'}</strong></div><em>教學示意</em></header><div class="pr-branch">branch/matching-rule <b>→</b> main</div><div class="pr-columns"><article><span>Linked issue</span><strong>Issue #3</strong><small>雙向 Like 才建立一筆配對</small></article><article><span>Files changed</span><strong>${id === 'RV01' ? '配對規則 · rule tests' : '聊天室 · UI'}</strong><small>${id === 'RV01' ? '修改與測試摘要' : '超出本票 Out-of-scope'}</small></article><article class="pr-review-status"><span>Review</span><strong>${id === 'RV01' ? '待審查' : 'Changes requested'}</strong><small>${id === 'RV01' ? '檢查改動、風險與範圍' : '退回 Dev，刪除越界改動'}</small></article></div><footer>${id === 'RV01' ? 'PR 關聯票與版本差異；AC 結果仍由 QA 實測。' : '模擬 Reviewer finding；PR 尚未 Merge。'}</footer></article>`;
        break;
      case 'Q01':
        body = `<div class="qa-evidence-shell"><header><span>Test Evidence</span><strong>同一個候選版本 × Ticket #3 AC</strong><em>欄位範例</em></header>${qaTable([['候選版本','AC 對應案例','規則預期','實際觀察','PASS／FAIL／NOT RUN']])}<p>保存 artifact 識別、測試輸入與可回查輸出；尚未執行項保持 NOT RUN。</p></div>`;
        break;
      case 'Q02':
        body = `<div class="qa-evidence-shell actual-evidence"><header><span>規則層實測</span><strong>Version A · 單向 Like</strong><em>FAIL</em></header>${qaTable([['Version A','小安 Like 小晴；尚未互相 Like','0 筆配對','1 筆：M01','FAIL']])}<p>預期 0　→　實際 1　｜　規則層案例失敗，回 Dev 修正。</p></div>`;
        break;
      case 'Q03':
        body = `<div class="qa-evidence-shell actual-evidence"><header><span>規則層實測</span><strong>Version B-pre · 修正後同一候選</strong><em>部分通過</em></header>${qaTable([['B-pre','單向 Like','0 筆','0 筆','PASS'],['B-pre','雙向 Like','1 筆 M01','1 筆 M01','PASS'],['B-pre','既有 M01 後重複 Like','仍 1 筆 M01','未執行','NOT RUN']])}<p>AC1／AC2 有規則證據；AC3 尚未驗證。</p></div>`;
        break;
      case 'Q04':
        body = `<div class="qa-evidence-shell reveal-evidence"><header><span>先請學員作答</span><strong>duplicate 還缺哪個輸入與預期？</strong><em>按下一步揭露</em></header><div class="duplicate-prompt"><article><b>前置狀態</b><span>同一 B artifact 已有 1 筆 M01</span></article><i>→</i><article><b>補驗動作</b><span>同一對再次 Like</span></article><i>→</i><article><b>預期</b><span>仍只有 1 筆 M01</span></article></div><div class="b2-reveal fragment" data-fragment-order="1"><span>規則層實測 · B-post</span>${qaTable([['B-post（同一 B）','duplicate Like','仍 1 筆 M01','仍 1 筆 M01','PASS']])}<p>補驗沿用相同 B artifact；沒有另建版本。</p></div></div>`;
        break;
      case 'PC01':
        body = `<div class="product-check-grid"><article><span>Ticket #3 · 可核對</span><strong>單向 0 · 雙向 1 M01 · duplicate 仍 1 M01</strong><p>規則層範圍與各案例結果</p></article><i>≠</i><article class="goal-gap"><span>Parent Goal · 未證明</span><strong>UI／E2E／登入／完整產品串接</strong><p>仍需產品路徑與整體目標證據</p></article><footer>Product Check · 教學示意　｜　PO／Owner 記錄範圍與未知，不把單票結果升格成 Goal PASS。</footer></div>`;
        break;
      case 'HG01':
        body = `<div class="human-gate-card"><header><span>Human Gate · 決策清單示意</span><strong>決策者：Owner／授權人</strong></header><div class="gate-evidence-list"><article><b>✓</b><span>#3 規則 Evidence：A → B-pre → B-post</span></article><article><b>!</b><span>UI／E2E／整體 Goal：NOT RUN</span></article><article><b>!</b><span>Release Checklist、授權紀錄：未建立</span></article></div><footer><strong>可做的決定</strong><span>補證據　·　暫停　·　退回　·　授權（需真實紀錄）</span></footer></div>`;
        break;
      case 'A02':
        body = `<div class="agent-mode-flow"><header><span>同一張教學 #3 Ticket</span><em>單 Agent 模式示意</em></header><div><article><b>Human</b><span>定範圍、指定 AC 與停機條件</span></article><i>→</i><article class="agent-active"><b>Single Agent</b><span>在核准範圍內處理工作並交付摘要</span></article><i>→</i><article><b>QA／Owner</b><span>獨立核對 Evidence／作授權決定</span></article></div><footer>Ticket、候選版本、QA Evidence 與 Human Gate 保持原流程位置。</footer></div>`;
        break;
      case 'A03':
        body = `<div class="chat-handoff"><header><span>架構示意，非真實 multi-agent run</span><strong>人決定每次交接與證據來源</strong></header><div><article><b>Dev Chat</b><span>Issue #3 · Scope／AC</span><small>候選版本摘要</small></article><i>→</i><article class="handoff-state"><b>外部工作狀態</b><span>Ticket · Branch／Commit</span><small>最新 Evidence 與下一步</small></article><i>→</i><article><b>Reviewer／QA Chat</b><span>檢查差異與測試</span><small>回寫 findings／結果</small></article></div><footer>Chat ≠ Session ≠ Workflow；交接記錄回到 Issue 與版本。</footer></div>`;
        break;
      case 'A04':
        body = `<div class="orchestrator-flow"><header><span>架構示意，非真實 multi-agent run</span><strong>分派與彙整不會轉移人類放行權</strong></header><div class="orchestrator-top"><article><b>Orchestrator</b><span>讀取核准範圍 · 分派任務 · 彙整回報</span></article></div><div class="orchestrator-branches"><i></i><i></i><i></i></div><div class="subagent-row"><article>Dev Sub-agent<span>Candidate</span></article><article>Reviewer Sub-agent<span>Findings</span></article><article>QA Sub-agent<span>Evidence</span></article></div><footer><b>Human Owner → Human Gate</b><span>授權／暫停仍由人決定。</span></footer></div>`;
        break;
      default:
        body = `<div class="b2-generic"><strong>${esc(slide.querySelector('h1').textContent)}</strong><p>${esc(slide.dataset.docRef)}</p><span>${esc(slide.dataset.versionRef)}</span></div>`;
    }
    return `<div class="focus-compose b2-focus-compose">${locatorMarkup}<section class="diagram-field b2-artifact" aria-label="${esc(slide.querySelector('.artwork').getAttribute('aria-label'))}">${body}</section></div>`;
  }

  const PRINCIPLE_CASES = {
    A06: { risk: '接手者只看到一段聊天摘要；不知道 #3 現在在哪、哪個 AC 尚未測。', decision: '先讀共享 Issue／Project，核對 Scope、AC、Owner、WIP 與 B-pre duplicate NOT RUN。', artifact: 'Issue #3 handoff：同一 B 版本、已知結果、下一步補驗要求。' },
    A07: { risk: '執行時有人提議順便新增聊天室，會改變本票範圍。', decision: '依 Out-of-scope 與 Stop Rule 停下，不自行加入新功能。', artifact: 'Issue 變更請求 → 人類 Refinement；WIP=1 不擴張。' },
    A08: { risk: '實作者說完成後，自己也替變更與測試按下放行。', decision: '把 PO、Dev、Reviewer、QA、Owner 的責任分開，保留 Human Gate。', artifact: 'PR 修改摘要 → Reviewer findings → QA Evidence → Owner 授權紀錄。' },
    A09: { risk: 'B-pre 單向和雙向都 PASS，就把所有 AC 一起當成完成。', decision: '獨立逐條比對 AC、版本、輸入、預期與實際；duplicate 留 NOT RUN，直到補測。', artifact: 'B-pre partial PASS + NOT RUN；同一 B 的 B-post duplicate PASS；UI／E2E 仍 NOT RUN。' },
    A10: { risk: '子票 AC 綠燈，但 Parent Goal 或依賴方向已經改變。', decision: '回看 Parent Goal 與 #1／#2 依賴；目標問題回 Backlog／Refinement，實作問題回 Dev。', artifact: 'Parent Issue 記優先級、風險、未驗 UI／E2E 與下一個決策。' },
  };

  function renderPrincipleOverview(slide) {
    const cards = [
      ['聊天失去任務進度', 'External Task State'],
      ['工作越過核准範圍', 'Bounded Execution'],
      ['同一角色包辦所有檢查', 'Role Separation'],
      ['未測被描述成通過', 'Independent Verification'],
      ['子票結果偏離產品目標', 'Goal Re-anchoring'],
    ];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact principle-risk-field"><div class="principle-risk-header"><strong>同一張教學 #3 Ticket · B-pre snapshot</strong><span>五原則框架示意 · duplicate NOT RUN</span></div><div class="principle-risk-grid">${cards.map(([risk, principle], index) => `<article><b>${index+1}</b><div><span>風險</span><strong>${esc(risk)}</strong></div><i>→</i><div><span>原則</span><strong>${esc(principle)}</strong></div></article>`).join('')}</div></section></div>`;
  }

  function renderPrincipleCase(slide) {
    const id = slide.dataset.rev13SceneId;
    const item = PRINCIPLE_CASES[id];
    const title = slide.querySelector('h1').textContent.split('：')[0];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact principle-case-field"><header><strong>${esc(title)}</strong><span>同一張教學 #3 Ticket · B-pre 當下</span></header><div class="principle-case-grid"><article class="case-situation"><span>情境</span><p>${esc(item.risk)}</p></article><i>→</i><article class="case-decision"><span>原則決策</span><p>${esc(item.decision)}</p></article><i>→</i><article class="case-artifact"><span>產物</span><p>${esc(item.artifact)}</p></article></div></section></div>`;
  }

  function renderPart2Exercise(slide) {
    const questions = [
      ['Ticket／AC', '你會把哪個 Scope、AC 與 Stop Rule 寫進 Issue？', '寫清楚單向 0、雙向 1 筆、重複仍 1 筆；UI／登入／服務／資料庫排除，超範圍需求先停並交人類 Refinement。'],
      ['協作模式', '何時可用單 Agent、多 Chat 或 Orchestrator？', '按任務邊界選模式；每站都回寫外部 Issue／版本／Evidence，角色仍分開，Human Gate 仍由人負責。'],
      ['補驗要求', 'B-pre 還有 NOT RUN 時，什麼證據才能補齊？', '對同一 B artifact 重跑 duplicate：已有 1 筆 M01，再 Like 後仍為 1 筆；UI／E2E／Release／Goal 仍標 NOT RUN。'],
    ];
    return `<div class="focus-compose b2-focus-compose">${locator(slide)}<section class="diagram-field b2-artifact exercise-part2"><header><strong>同一張 Ticket #3 · B-pre → B-post</strong><span>先寫下你的答案</span></header><ol>${questions.map(([label, question, answer], index) => `<li><b>${esc(label)}</b><span>${esc(question)}</span><p class="exercise-answer fragment" data-fragment-order="${index+1}"><strong>參考</strong>：${esc(answer)}</p></li>`).join('')}</ol><footer>參考答案依序揭露；不是新測試，也不表示 Release／Goal 完成。</footer></section></div>`;
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
    else if (key === 'part2-map') art.innerHTML = renderPart2Map(slide);
    else if (key === 'part2-work') art.innerHTML = renderPart2Work(slide);
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
    const selector = slide.dataset.art === 'exit-check'
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
    if (slide.dataset.art === 'exit-check') {
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
    if (slide.dataset.art === 'exit-check') {
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
