'use strict';

// The early head script sets the initial theme before the stylesheet is painted.
const themeButton = document.querySelector('#theme-toggle');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
let themeExplicit = false;
try { themeExplicit = ['light', 'dark'].includes(localStorage.getItem('portfolio-theme')); } catch (_) {}
function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const dark = theme === 'dark';
  const action = dark ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton.setAttribute('aria-label', action);
  themeButton.setAttribute('title', action);
  themeButton.setAttribute('aria-pressed', String(dark));
  document.querySelector('#theme-label').textContent = dark ? 'Light' : 'Dark';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#0a100d' : '#f5f8f2';
  if (persist) {
    themeExplicit = true;
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }
}
applyTheme(document.documentElement.dataset.theme || 'light');
themeButton.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));
themeMedia.addEventListener('change', event => {
  if (!themeExplicit) applyTheme(event.matches ? 'dark' : 'light');
});

// Source and scope are kept explicit for each project.
const projects = {
  "delivery": {
    "number": "01",
    "title": "Dockerized Python app & CI",
    "repositoryUrl": "https://github.com/sirDmitryj/devops-docker-ci-demo",
    "summary": "A small Flask service, packaged with Docker and built automatically with GitHub Actions.",
    "technologies": [
      "Python",
      "Flask",
      "Docker",
      "GitHub Actions",
      "Git"
    ],
    "overview": "<div class=\"overview-grid\"><div><h3>The problem</h3><p>A small service needs a repeatable way to run, and a basic check that its Docker image can still build after a change.</p><h3>What I built</h3><p>A Flask application with a homepage and a JSON health endpoint, plus a Dockerfile and a GitHub Actions workflow for image builds.</p></div><div><h3>In the repository</h3><ul><li><code>app.py</code>: / and /health routes.</li><li><code>Dockerfile</code>: Python base image, dependencies, and startup command.</li><li>Port 5000 exposed for the local service.</li><li>CI builds on pushes and pull requests to main.</li><li>A README with Docker commands and endpoint examples.</li></ul></div></div><div class=\"learning-outcomes\"><span>Container basics</span><span>Build automation</span><span>Version control</span></div><div class=\"status-box\"><p><strong>Current scope:</strong> a personal learning project. The configured CI checks that the image builds; it does not currently run a unit-test suite or deploy to production. The interactive demo is a simulation.</p></div>",
    "workflow": "<p class=\"workflow-intro\">The first path reflects the repository’s CI configuration. The second shows how to run and check the service locally.</p><div class=\"workflow-lane\"><span class=\"lane-label\">01 / IMPLEMENTED CI WORKFLOW</span><div class=\"workflow-steps\"><div class=\"workflow-step\"><b>Push or PR</b><small>main branch</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>Checkout</b><small>GitHub Actions</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>Build image</b><small>docker build</small></div></div></div><div class=\"workflow-lane\"><span class=\"lane-label\">02 / LOCAL VALIDATION</span><div class=\"workflow-steps\"><div class=\"workflow-step\"><b>Run container</b><small>Port 5000</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>GET /health</b><small>localhost:5000</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>JSON response</b><small>status: ok</small></div></div></div><p class=\"workflow-caption\"><strong>Next improvements:</strong> endpoint tests, dependency checks, and a production-ready server configuration. Automatic deployment is outside the current project scope.</p>",
    "demo": "<div class=\"demo-notice\"><span aria-hidden=\"true\">i</span><span>Browser simulation with sample data. No real CI job, container, or server is running.</span></div><div class=\"demo-controls\"><label for=\"pipeline-scenario\">Try an image build<select id=\"pipeline-scenario\"><option value=\"passing\">Successful image build</option><option value=\"failing\">Dependency installation fails</option></select></label><button class=\"demo-button\" id=\"run-pipeline\">Run simulation <span aria-hidden=\"true\">▷</span></button></div><div class=\"pipeline-stages\" aria-label=\"Simulated pipeline stages\"><div class=\"pipeline-stage\" data-stage=\"0\">Checkout<span>Ready</span></div><div class=\"pipeline-stage\" data-stage=\"1\">Build image<span>Ready</span></div><div class=\"pipeline-stage\" data-stage=\"2\">Start container<span>Ready</span></div><div class=\"pipeline-stage\" data-stage=\"3\">Health check<span>Ready</span></div></div><pre class=\"demo-console\" id=\"pipeline-console\" aria-label=\"Simulated pipeline output\">$ run-example-workflow\nChoose a scenario, then run the simulation.</pre><p class=\"demo-result\" id=\"pipeline-result\" role=\"status\">The first two steps represent CI; the last two illustrate separate local validation.</p>",
    "stage": "Personal project · source code available"
  },
  "linux": {
    "number": "02",
    "title": "Linux operations lab",
    "repositoryUrl": null,
    "summary": "Daily Fedora administration and troubleshooting, with an illustrative lab for understanding basic system health signals.",
    "technologies": [
      "Linux",
      "Bash",
      "systemd",
      "Shell scripting"
    ],
    "overview": "<div class=\"overview-grid\"><div><h3>My Linux practice</h3><p>I use Fedora daily and work with command-line configuration, package management, services, processes, and system settings.</p><h3>The learning lab</h3><p>This interactive example turns three signals—memory, disk space, and a service state—into a readable status report.</p></div><div><h3>What I’m practicing</h3><ul><li>Investigating system and service behavior.</li><li>Reading memory and disk usage.</li><li>Understanding systemd service status.</li><li>Using Bash to make repeatable checks.</li><li>Interpreting exit codes and documenting findings.</li></ul></div></div><div class=\"learning-outcomes\"><span>Linux administration</span><span>Service troubleshooting</span><span>Automation fundamentals</span></div><div class=\"status-box\"><p><strong>Demo scope:</strong> the health-check tool uses sample inputs in this browser. A standalone health-check script has not been linked, and no real machine is inspected or changed.</p></div>",
    "workflow": "<p class=\"workflow-intro\">Proposed workflow for a Linux machine using systemd. These checks are a small learning exercise, not a complete monitoring system.</p><div class=\"workflow-lane\"><span class=\"lane-label\">01 / COLLECT LOCAL SIGNALS</span><div class=\"workflow-steps\"><div class=\"workflow-step\"><b>Memory</b><small>free</small></div><div class=\"workflow-step\"><b>Root disk</b><small>df</small></div><div class=\"workflow-step\"><b>Service</b><small>systemctl</small></div></div></div><div class=\"workflow-lane\"><span class=\"lane-label\">02 / EVALUATE & REPORT</span><div class=\"workflow-steps\"><div class=\"workflow-step\"><b>Bash script</b><small>Parse values</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>Check rules</b><small>Thresholds</small></div><span class=\"workflow-arrow\" aria-hidden=\"true\">→</span><div class=\"workflow-step\"><b>Status report</b><small>Exit 0 or 1</small></div></div></div><p class=\"workflow-caption\"><strong>Demo rules:</strong> warn when memory or disk usage is at least 80%, or when the example service is inactive. A production-ready script would also handle command errors and missing services explicitly.</p>",
    "demo": "<div class=\"demo-notice\"><span aria-hidden=\"true\">i</span><span>Illustrative inputs only. This demo does not inspect or change any real machine.</span></div><div class=\"demo-controls\"><label for=\"health-scenario\">Sample scenario<select id=\"health-scenario\"><option value=\"healthy\">Healthy machine</option><option value=\"disk\">Disk pressure</option><option value=\"service\">Service stopped</option><option value=\"custom\" hidden>Custom inputs</option></select></label><button class=\"demo-button\" id=\"run-health\">Run health check <span aria-hidden=\"true\">▷</span></button></div><div class=\"metric-controls\"><div><label class=\"range-label\" for=\"memory-range\">Memory usage <output id=\"memory-output\" for=\"memory-range\">42%</output></label><input id=\"memory-range\" type=\"range\" min=\"0\" max=\"100\" value=\"42\"><span class=\"threshold-hint\">Warning at ≥ 80%</span></div><div><label class=\"range-label\" for=\"disk-range\">Disk usage <output id=\"disk-output\" for=\"disk-range\">38%</output></label><input id=\"disk-range\" type=\"range\" min=\"0\" max=\"100\" value=\"38\"><span class=\"threshold-hint\">Warning at ≥ 80%</span></div></div><div class=\"demo-controls health-controls\"><label class=\"service-toggle\"><input id=\"service-active\" type=\"checkbox\" checked> Example service is active</label><span class=\"threshold-hint\">Change inputs, then run a check</span></div><pre class=\"demo-console\" id=\"health-console\" aria-label=\"Simulated health check output\">$ ./health-check.sh\nSample inputs ready. Run a check to generate the report.</pre><p class=\"demo-result\" id=\"health-result\" role=\"status\">Healthy: exit 0. Any warning: exit 1.</p>",
    "stage": "Hands-on practice · simulated health check"
  }
};

const dialog = document.querySelector('#project-dialog');
let activeProject = null;
let lastTrigger = null;
let runGeneration = 0;

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    document.querySelector('.result-count').textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  });
});

function selectTab(tab, moveFocus = false) {
  document.querySelectorAll('[data-tab]').forEach(button => {
    const selected = button.dataset.tab === tab;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    document.querySelector(`#panel-${button.dataset.tab}`).hidden = !selected;
    if (selected && moveFocus) button.focus();
  });
  document.querySelector('#try-demo').hidden = tab === 'demo';
}

function openProject(key, trigger) {
  const project = projects[key];
  runGeneration++;
  activeProject = key;
  lastTrigger = trigger;
  document.querySelector('#dialog-number').textContent = `PROJECT ${project.number} / LEARNING LAB`;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-stage').textContent = project.stage;
  document.querySelector('#dialog-subtitle').textContent = project.summary;
  document.querySelector('#dialog-tags').replaceChildren(...project.technologies.map(technology => {
    const tag = document.createElement('span'); tag.textContent = technology; return tag;
  }));
  for (const tab of ['overview', 'workflow', 'demo']) document.querySelector(`#panel-${tab}`).innerHTML = project[tab];
  const repoSlot = document.querySelector('.repo-slot');
  if (project.repositoryUrl && /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\/?$/.test(project.repositoryUrl)) {
    const link = document.createElement('a');
    link.href = project.repositoryUrl; link.textContent = 'View GitHub repository ↗';
    link.target = '_blank'; link.rel = 'noopener noreferrer'; repoSlot.replaceChildren(link);
  } else {
    repoSlot.innerHTML = 'GitHub repository <span>Link to be added</span>';
  }
  selectTab('overview');
  if (key === 'delivery') document.querySelector('#run-pipeline').addEventListener('click', runPipeline);
  else setupHealthDemo();
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  document.querySelector('.close-dialog').focus({preventScroll:true});
}

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  runGeneration++;
  activeProject = null;
  document.body.classList.remove('dialog-open');
  lastTrigger?.focus({preventScroll:true});
});
document.querySelectorAll('[data-tab]').forEach(button => {
  button.addEventListener('click', () => selectTab(button.dataset.tab));
  button.addEventListener('keydown', event => {
    const tabs = [...document.querySelectorAll('[data-tab]')];
    const index = tabs.indexOf(button);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
  });
});
document.querySelector('#try-demo').addEventListener('click', () => {
  selectTab('demo', true);
  document.querySelector('.detail-tabs').scrollIntoView({block:'nearest'});
});

const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
async function runPipeline() {
  const generation = ++runGeneration;
  const runButton = document.querySelector('#run-pipeline');
  const selector = document.querySelector('#pipeline-scenario');
  const fail = selector.value === 'failing';
  const consoleElement = document.querySelector('#pipeline-console');
  const result = document.querySelector('#pipeline-result');
  const stages = [...document.querySelectorAll('[data-stage]')];
  runButton.disabled = true; selector.disabled = true;
  runButton.textContent = 'Simulating…';
  result.textContent = 'Running the example workflow…';
  consoleElement.textContent = '$ run-example-workflow\n[SIMULATION] All output below is illustrative.\n';
  stages.forEach(stage => { stage.className = 'pipeline-stage'; stage.querySelector('span').textContent = 'Waiting'; });
  const lines = ['✓ Example repository checked out', '✓ Docker image built: devops-docker-demo', '✓ Example container started on localhost:5000', '✓ Local GET /health → 200 {"status":"ok"}'];
  for (let i = 0; i < stages.length; i++) {
    if (generation !== runGeneration || !dialog.open || activeProject !== 'delivery') return;
    stages[i].classList.add('running'); stages[i].querySelector('span').textContent = 'Running…';
    await pause(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 430);
    if (generation !== runGeneration || !dialog.open || activeProject !== 'delivery') return;
    stages[i].classList.remove('running');
    if (fail && i === 1) {
      stages[i].classList.add('failed'); stages[i].querySelector('span').textContent = 'Failed';
      stages.slice(2).forEach(stage => stage.querySelector('span').textContent = 'Skipped');
      consoleElement.textContent += '✗ docker build: dependency installation failed\n— No new image available\n— Container start and local health check skipped\n';
      result.textContent = 'Example failed: inspect the dependency error and fix the build before running the container. No deployment occurred.';
      break;
    }
    stages[i].classList.add('passed'); stages[i].querySelector('span').textContent = 'Passed';
    consoleElement.textContent += `${lines[i]}\n`;
    if (i === stages.length - 1) result.textContent = 'Example passed. Image-build CI is followed by illustrative local validation; this demo did not run an actual build or deployment.';
  }
  runButton.disabled = false; selector.disabled = false; runButton.textContent = 'Run again ▷';
}

function setupHealthDemo() {
  const scenario = document.querySelector('#health-scenario');
  const memory = document.querySelector('#memory-range');
  const disk = document.querySelector('#disk-range');
  const service = document.querySelector('#service-active');
  const result = document.querySelector('#health-result');
  const output = document.querySelector('#health-console');
  function refreshInputs(custom = true) {
    document.querySelector('#memory-output').textContent = `${memory.value}%`;
    document.querySelector('#disk-output').textContent = `${disk.value}%`;
    if (custom) { scenario.querySelector('[value="custom"]').hidden = false; scenario.value = 'custom'; }
    output.textContent = '$ ./health-check.sh\nInputs changed. Run a check to generate a new report.';
    result.textContent = 'Inputs updated. Previous results have been cleared.';
  }
  [memory, disk, service].forEach(input => input.addEventListener('input', () => refreshInputs()));
  scenario.addEventListener('change', () => {
    if (scenario.value === 'custom') return;
    memory.value = '42'; disk.value = scenario.value === 'disk' ? '92' : '38';
    service.checked = scenario.value !== 'service'; refreshInputs(false);
  });
  document.querySelector('#run-health').addEventListener('click', () => {
    const memoryWarn = Number(memory.value) >= 80;
    const diskWarn = Number(disk.value) >= 80;
    const serviceWarn = !service.checked;
    const warnings = [memoryWarn, diskWarn, serviceWarn].filter(Boolean).length;
    output.textContent = `$ ./health-check.sh\n[SIMULATION] Sample inputs; no system access\n${memoryWarn ? '[WARN]' : '[OK]  '} Memory usage: ${memory.value}% (threshold: 80%)\n${diskWarn ? '[WARN]' : '[OK]  '} Root disk usage: ${disk.value}% (threshold: 80%)\n${serviceWarn ? '[WARN]' : '[OK]  '} Example service: ${service.checked ? 'active' : 'inactive'}\n\n${warnings ? `${warnings} warning${warnings > 1 ? 's' : ''} found` : 'All checks passed'} · exit code ${warnings ? '1' : '0'}`;
    result.textContent = warnings ? `Example report: ${warnings} warning${warnings > 1 ? 's' : ''}. ${diskWarn ? 'Investigate disk usage. ' : ''}${memoryWarn ? 'Investigate memory usage. ' : ''}${serviceWarn ? 'Inspect service logs and configuration.' : ''}` : 'Example report: all checks are healthy. Exit code 0 can signal success to another script.';
  });
}
