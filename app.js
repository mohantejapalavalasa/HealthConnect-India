// HealthConnect Enterprise - Integrated Health Core v13.0
// Bidirectional Ecosystem: Citizens + Professionals + AI Synthesis

const TranslationDB = {
    en: {
        ministry: "MINISTRY OF HEALTH &<br>FAMILY WELFARE",
        gov: "GOVERNMENT OF INDIA",
        welcome: "National Gateway",
        sub_welcome: "Integrated Hub for Citizens and Professionals.",
        id_label: "Verification Identifier",
        login_btn: "Request Access",
        no_account: "New Repository?",
        register_link: "Create National ID",
        verify_title: "Verification Key",
        verify_btn: "Proceed into Vault",
        reg_title: "Universal Enrollment",
        role_patient: "Citizen",
        role_doctor: "Doctor",
        role_lab: "Laboratory",
        role_pharmacy: "Pharmacy",
        enroll_btn: "Register Identity",
        back_login: "Back to Gateway",
        nav_gov: "Citizen Repository",
        nav_pro: "Professional Terminals",
        tab_dash: "My Dashboard",
        tab_records: "My Health Vault",
        tab_docs: "Documents Hub",
        tab_identity: "Legal Identity",
        tab_ai: "AI Clinician",
        tab_privacy: "Security & Privacy",
        tab_dr: "Clinician Hub",
        tab_lab: "Diagnostic Node",
        tab_pharmacy: "Pharmacy Node",
        tab_surv: "My Surveillance",
        logout: "Secure Exit",
        search_ph: "Search national records...",
        btn_allow: "Allow Access",
        btn_block: "Block Access",
        ai_btn: "Initiate Clinical Reasoning",
        ai_result_illness: "Anticipated Illness",
        ai_result_rx: "Suggested Protocol",
        ai_result_routine: "Routine Advice"
    },
    te: {
        ministry: "ఆరోగ్య & కుటుంబ సంక్షేమ<br>మంత్రిత్వ శాఖ",
        gov: "భారత ప్రభుత్వం",
        welcome: "జాతీయ గేట్‌వే",
        sub_welcome: "పౌరులు మరియు నిపుణుల కోసం ఇంటిగ్రేటెడ్ హబ్.",
        id_label: "ధృవీకరణ ఐడెంటిఫైయర్",
        login_btn: "యాక్సెస్ అభ్యర్థించండి",
        no_account: "కొత్త రిపోజిటరీ?",
        register_link: "జాతీయ IDని సృష్టించండి",
        verify_title: "ధృవీకరణ కీ",
        verify_btn: "వాల్ట్‌లోకి వెళ్లండి",
        reg_title: "యూనివర్సల్ నమోదు",
        role_patient: "పౌరుడు",
        role_doctor: "డాక్టర్",
        role_lab: "ప్రయోగశాల",
        role_pharmacy: "ఫార్మసీ",
        enroll_btn: "గుర్తింపును నమోదు చేయండి",
        back_login: "గేట్‌వేకి తిరిగి వెళ్లండి",
        nav_gov: "సిటిజన్ రిపోజిటరీ",
        nav_pro: "వృత్తిపరమైన టెర్మినల్స్",
        tab_dash: "నా డాష్‌బోర్డ్",
        tab_records: "నా ఆరోగ్య వాల్ట్",
        tab_docs: "డాక్యుమెంట్స్ హబ్",
        tab_identity: "చట్టపరమైన గుర్తింపు",
        tab_ai: "AI క్లినిషియన్",
        tab_privacy: "భద్రత & గోప్యత",
        tab_dr: "క్లినిషియన్ హబ్",
        tab_lab: "డయాగ్నస్టిక్ నోడ్",
        tab_pharmacy: "ఫార్మసీ నోడ్",
        tab_surv: "నా నిఘా",
        logout: "సురక్షిత నిష్క్రమణ",
        search_ph: "జాతీయ రికార్డులను శోధించండి...",
        btn_allow: "అనుమతించు",
        btn_block: "బ్లాక్ చేయండి",
        ai_btn: "క్లినికల్ రీజనింగ్‌ను ప్రారంభించండి",
        ai_result_illness: "అంచనా వేసిన అనారోగ్యం",
        ai_result_rx: "సూచించిన ప్రోటోకాల్",
        ai_result_routine: "రూటిన్ సలహా"
    }
};

// --- DATA REPOSITORIES ---
let CurrentLang = localStorage.getItem('hc_lang') || 'en';
let CurrentRole = localStorage.getItem('hc_role') || 'patient';
let CurrentUser = localStorage.getItem('hc_user') || 'Rajesh Kumar';

let GlobalRecords = JSON.parse(localStorage.getItem('hc_records')) || [
    { id: "REC-9901", type: "prescription", title: "Metformin 500mg", source: "AIIMS New Delhi", date: "12 Apr 2026", details: "Dosage: 1-0-1 | Duration: 90 Days" },
    { id: "REC-8822", type: "report", title: "Complete Blood Count", source: "Apollo Diagnostics", date: "02 Mar 2026", details: "Hb: 14.2 g/dL | WBC: 7500 mm3" },
    { id: "REC-7711", type: "document", title: "X-Ray Chest (Posterior)", source: "Max Healthcare", date: "20 Jan 2026", details: "No active pleuro-parenchymal lesions." }
];

let GlobalDocuments = JSON.parse(localStorage.getItem('hc_docs')) || [
    { id: "DOC-101", name: "Aadhaar_Card_Self.pdf", size: "1.2 MB", date: "15 Jan 2026" },
    { id: "DOC-102", name: "Pan_Card_Self.jpg", size: "850 KB", date: "15 Jan 2026" }
];

let EntityPermissions = JSON.parse(localStorage.getItem('hc_perms')) || [
    { id: "ENT-01", name: "Dr. Anjali (AIIMS)", type: "doctor", status: true },
    { id: "ENT-02", name: "Apollo Diagnostics", type: "lab", status: true },
    { id: "ENT-03", name: "City Pharmacy Node", type: "pharmacy", status: true },
    { id: "ENT-04", name: "Dr. Sameer (Max)", type: "doctor", status: false }
];

let GlobalVitals = JSON.parse(localStorage.getItem('hc_vitals')) || [
    { date: "Apr 01", bp: "120/80", weight: 72 },
    { date: "Apr 05", bp: "125/82", weight: 71.5 },
    { date: "Apr 10", bp: "118/78", weight: 71.2 },
    { date: "Today", bp: "120/80", weight: 71.0 }
];

let GlobalFamily = JSON.parse(localStorage.getItem('hc_family')) || [
    { id: "FAM-01", name: "Meera Kumar", relation: "Spouse", status: "Healthy" },
    { id: "FAM-02", name: "Aarav Kumar", relation: "Son", status: "Syncing" },
    { id: "FAM-03", name: "S.P. Kumar", relation: "Father", status: "Monitoring" }
];

let GlobalInsurance = JSON.parse(localStorage.getItem('hc_insurance')) || {
    provider: "Ayushman Bharat National Health",
    policyNum: "AB-ID-990-221",
    status: "Active",
    coverage: "₹5,00,000"
};

document.addEventListener('DOMContentLoaded', () => {
    initPersistence();
    initSidebar();
    applyLanguage(CurrentLang);
    document.getElementById('language-registry').value = CurrentLang;
    if (localStorage.getItem('hc_session') === 'true') loginSuccess();
    lucide.createIcons();
});

function applyLanguage(lang) {
    CurrentLang = lang;
    localStorage.setItem('hc_lang', lang);
    const s = TranslationDB[lang] || TranslationDB['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (s[k]) el.innerHTML = s[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const k = el.getAttribute('data-i18n-placeholder');
        if (s[k]) el.placeholder = s[k];
    });
}

function changeLanguage(lang) {
    applyLanguage(lang);
    if (localStorage.getItem('hc_session') === 'true') {
        if (document.getElementById('dashboard-view').style.display === 'block') renderDashboard();
        else renderTabContent(window.CurrentActiveTab || 'records');
    }
    showToast("Ecosystem Sync Complete", "success");
}

// --- AUTH CORE ---
function toggleAuthView(v) {
    document.getElementById('login-view').style.display = (v==='login'?'block':'none');
    document.getElementById('register-view').style.display = (v==='register'?'block':'none');
    document.getElementById('otp-step').style.display = 'none';
}

function selectRole(r, el) {
    window.SelectedRoleSelection = r;
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
}

function handleRegistration() {
    const n = document.getElementById('reg-name').value;
    if (!n) return showToast("Identify required", "error");
    CurrentRole = window.SelectedRoleSelection || 'patient';
    CurrentUser = n;
    localStorage.setItem('hc_role', CurrentRole);
    localStorage.setItem('hc_user', CurrentUser);
    toggleAuthView('login');
}

function sendOTP() {
    document.getElementById('login-view').style.display='none';
    document.getElementById('otp-step').style.display='block';
}

function verifyOTP() {
    localStorage.setItem('hc_session','true');
    loginSuccess();
}

function loginSuccess() {
    document.getElementById('auth-overlay').style.display='none';
    document.getElementById('user-display-name').textContent = CurrentUser;
    document.getElementById('user-role-badge').textContent = (TranslationDB[CurrentLang][`role_${CurrentRole}`] || CurrentRole).toUpperCase();
    if (CurrentRole !== 'patient') switchRole(CurrentRole);
    else renderDashboard();
}

function logout() { localStorage.removeItem('hc_session'); location.reload(); }

// --- DASHBOARD (PATIENT) ---
function renderDashboard() {
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('portal-view').style.display = 'none';
    const cont = document.getElementById('dashboard-payload');
    const s = TranslationDB[CurrentLang] || TranslationDB['en'];

    cont.innerHTML = `
        <div class="stats-grid">
            <div class="card stat-card"><div class="stat-icon" style="background:rgba(16,185,129,0.1);"><i data-lucide="heart"></i></div><div class="stat-info"><h4>${s.tab_surv}</h4><p>Healthy</p></div></div>
            <div class="card stat-card"><div class="stat-icon" style="background:rgba(99,102,241,0.1);"><i data-lucide="shield"></i></div><div class="stat-info"><h4>Active Permissions</h4><p>${EntityPermissions.filter(p=>p.status).length}</p></div></div>
            <div class="card stat-card"><div class="stat-icon" style="background:rgba(245,158,11,0.1);"><i data-lucide="file-check"></i></div><div class="stat-info"><h4>Total Records</h4><p>${GlobalRecords.length}</p></div></div>
        </div>
        
        <div class="grid-main" style="margin-top:2.5rem;">
            <div style="display:flex; flex-direction:column; gap:2.5rem;">
                <!-- Timeline Section -->
                <div class="card" style="border-left:6px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                        <h3><i data-lucide="history"></i> Timeline</h3>
                        <span class="badge badge-success">ABDM Synchronized</span>
                    </div>
                    <div style="display:grid; gap:1rem;">
                        ${GlobalRecords.slice(0, 3).map(r => `
                            <div class="card" style="background:var(--bg-sub); padding:1rem; border:1px solid var(--border); display:flex; gap:1.5rem; align-items:center;">
                                <div style="background:#fff; padding:0.75rem; border-radius:12px;"><i data-lucide="${r.type==='prescription'?'pill':r.type==='report'?'microscope':'file-text'}"></i></div>
                                <div><h4 style="font-weight:800;">${r.title}</h4><p style="font-size:0.8rem; color:var(--text-dim);">${r.source} | ${r.date}</p></div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Family Circle Expansion -->
                <div class="card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h3><i data-lucide="users"></i> Family Health Circle</h3>
                        <button class="btn-ghost" style="padding:0.4rem 0.8rem; font-size:0.75rem;">Manage Group</button>
                    </div>
                    <div style="display:flex; gap:1.25rem;">
                        ${GlobalFamily.map(m => `
                            <div class="family-member" style="text-align:center; cursor:pointer;" onclick="showToast('Viewing ${m.name}\\'s profile','info')">
                                <div class="avatar-circle family-avatar" style="width:56px; height:56px; margin:0 auto 0.5rem; position:relative; border:2px solid ${m.status==='Healthy'?'var(--primary)':'var(--warning)'};">
                                    <i data-lucide="user"></i>
                                    <div style="position:absolute; bottom:0; right:0; width:14px; height:14px; background:${m.status==='Healthy'?'var(--primary)':'var(--warning)'}; border-radius:50%; border:2px solid #fff;"></div>
                                </div>
                                <p style="font-size:0.75rem; font-weight:800;">${m.name.split(' ')[0]}</p>
                            </div>
                        `).join('')}
                        <div class="family-member" style="text-align:center; opacity:0.5; cursor:pointer;">
                            <div class="avatar-circle" style="width:56px; height:56px; border:2px dashed var(--border); display:flex; align-items:center; justify-content:center; margin-bottom:0.5rem;"><i data-lucide="plus"></i></div>
                            <p style="font-size:0.75rem; font-weight:800;">Add</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:2.5rem;">
                <!-- National Health Pass -->
                <div class="card" style="background:var(--primary-deep); color:#fff; border-radius:32px;">
                    <p style="font-size:0.6rem; letter-spacing:2px; font-weight:800; opacity:0.7;">NATIONAL HEALTH PASS</p>
                    <h2 style="font-size:1.8rem; margin-top:2rem;">${CurrentUser}</h2>
                    <p class="mono" style="margin-top:0.5rem; letter-spacing:1px; font-size:1.1rem;">91-2384-9122-0012</p>
                </div>

                <!-- Insurance Module -->
                <div class="card" style="border-top:5px solid var(--secondary);">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <p style="font-size:0.65rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Health Insurance</p>
                            <h4 style="margin-top:0.25rem;">${GlobalInsurance.provider}</h4>
                        </div>
                        <i data-lucide="shield-check" color="var(--secondary)"></i>
                    </div>
                    <div style="margin-top:1.5rem; display:flex; justify-content:space-between; align-items:flex-end;">
                        <div>
                            <p class="mono" style="font-size:0.9rem; color:var(--text-dim);">${GlobalInsurance.policyNum}</p>
                            <p style="font-size:1.1rem; font-weight:800; color:var(--primary-deep); margin-top:0.2rem;">${GlobalInsurance.coverage}</p>
                        </div>
                        <span class="badge" style="background:var(--primary-soft); color:var(--primary-deep); border-radius:8px;">${GlobalInsurance.status}</span>
                    </div>
                </div>

                <!-- Mini Vitals Dashboard -->
                <div class="card" style="padding:1.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h4 style="font-size:0.9rem;"><i data-lucide="activity"></i> Vital Pulse</h4>
                        <span style="font-size:0.7rem; color:var(--text-muted);">Last 7 Days</span>
                    </div>
                    <canvas id="mini-vitals-chart" height="100"></canvas>
                </div>
            </div>
        </div>`;
    
    lucide.createIcons();
    renderMiniVitalsChart();
}

function renderMiniVitalsChart() {
    const ctx = document.getElementById('mini-vitals-chart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: GlobalVitals.map(v => v.date),
            datasets: [{
                data: GlobalVitals.map(v => v.weight),
                borderColor: 'var(--primary)',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
                backgroundColor: 'rgba(16,185,129,0.05)'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            maintainAspectRatio: false
        }
    });
}

// --- TABS HUB ---
function switchTab(t) {
    if (t === 'dashboard') { window.CurrentActiveTab = 'dashboard'; renderDashboard(); return; }
    window.CurrentActiveTab = t;
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('portal-view').style.display = 'block';
    renderTabContent(t);
}

function renderTabContent(t) {
    const cont = document.getElementById('portal-container');
    const s = TranslationDB[CurrentLang] || TranslationDB['en'];
    const heading = (title, icon) => `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3rem;"><div style="display:flex; align-items:center; gap:1.25rem;"><div style="background:var(--primary-soft); padding:1rem; border-radius:16px;"><i data-lucide="${icon}" color="var(--primary)" size="28"></i></div><h1 class="heading-font">${title}</h1></div></div>`;
    
    let html = "";
    if (t === 'records') {
        html = `${heading(s.tab_records, 'folder-heart')}
            <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap:1.5rem;">
                ${GlobalRecords.map(r => `
                    <div class="card" style="border-left:4px solid var(--primary); display:flex; gap:1.5rem; align-items:center;">
                        <div style="background:var(--bg-sub); padding:1.25rem; border-radius:18px;"><i data-lucide="${r.type==='prescription'?'pill':'file-text'}"></i></div>
                        <div style="flex:1">
                            <h4 style="font-weight:800; font-size:1.1rem;">${r.title}</h4>
                            <p style="font-size:0.85rem; color:var(--text-dim);">${r.source} | ${r.date}</p>
                            <p style="font-size:0.75rem; margin-top:0.5rem; color:var(--text-muted);">${r.details}</p>
                        </div>
                    </div>
                `).join('')}
            </div>`;
    } else if (t === 'documents') {
        html = `${heading(s.tab_docs, 'file-text')}
            <div class="card" style="border:2.5px dashed var(--border); text-align:center; padding:4rem; margin-bottom:2rem; cursor:pointer;" onclick="uploadFilePrompt()">
                <i data-lucide="upload-cloud" size="48" color="var(--text-muted)" style="margin-bottom:1.5rem;"></i>
                <h3 style="color:var(--text-dim);">Drop Personal Medical Documents Here</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">PDF, JPG, PNG supported (Max 10MB)</p>
            </div>
            <div style="display:grid; gap:1rem;">
                ${GlobalDocuments.map(d => `<div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:1.5rem;">
                    <div style="display:flex; gap:1rem; align-items:center;"><i data-lucide="file" color="var(--secondary)"></i><div><p style="font-weight:800;">${d.name}</p><p style="font-size:0.7rem; color:var(--text-muted);">${d.size} | ${d.date}</p></div></div>
                    <button class="btn-ghost" onclick="showToast('Downloading document...','info')"><i data-lucide="download" size="18"></i></button>
                </div>`).join('')}
            </div>`;
    } else if (t === 'ai') {
        html = `${heading(s.tab_ai, 'cpu')}
            <div style="display:grid; grid-template-columns: 1fr 400px; gap:3rem;">
                <div class="card">
                    <h3 style="margin-bottom:1.5rem;">Symptom Reasoning Engine</h3>
                    <textarea id="ai-input" style="width:100%; height:180px; padding:1.5rem; border-radius:16px; border:1.5px solid var(--border); font-family:inherit;" placeholder="Describe how you feel (e.g. Headache, high fever since yesterday, nausea...)"></textarea>
                    <button class="btn-primary" style="width:100%; margin-top:2.5rem; height:64px;" onclick="executeAIv3()">${s.ai_btn}</button>
                </div>
                <div id="ai-result-panel" class="card" style="border:2px dashed var(--border); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:4rem; color:var(--text-muted);">
                    <i data-lucide="sparkles" size="48" style="opacity:0.2; margin-bottom:1.5rem;"></i>
                    <p>Enter clinical parameters to synthesize insights.</p>
                </div>
            </div>`;
    } else if (t === 'consent') {
        html = `${heading(s.tab_privacy, 'user-check')}
            <div style="display:grid; gap:1.5rem;">
                ${EntityPermissions.map(p => `
                    <div class="permission-card">
                        <div style="display:flex; gap:1.5rem; align-items:center;">
                            <div style="background:var(--bg-sub); padding:1rem; border-radius:14px;"><i data-lucide="${p.type==='doctor'?'user':'microscope'}"></i></div>
                            <div>
                                <h4 style="font-weight:800; font-size:1.1rem;">${p.name}</h4>
                                <p style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase;">${p.type}</p>
                            </div>
                        </div>
                        <div class="toggle-switch ${p.status?'active':''}" onclick="togglePermission('${p.id}')"></div>
                    </div>
                `).join('')}
            </div>`;
    } else if (t === 'surveillance') {
        html = `${heading(s.tab_surv, 'activity')}
            <div class="card" style="margin-bottom:2rem;">
                <h3>Personal Vital Trends</h3>
                <canvas id="personal-surv-chart" height="150" style="margin-top:2rem;"></canvas>
            </div>
            <div class="stats-grid">
                <div class="card"><h4>Blood Pressure Analytics</h4><p>120/80 μm</p></div>
                <div class="card"><h4>BMI Index</h4><p>22.4 (Optimal)</p></div>
            </div>`;
        setTimeout(() => {
            const ctx = document.getElementById('personal-surv-chart');
            new Chart(ctx, { type: 'line', data: { labels: GlobalVitals.map(v=>v.date), datasets: [{ label: 'Systolic BP', data: [120, 125, 118, 120], borderColor: 'var(--primary)', tension:0.4, fill:true, backgroundColor:'rgba(16,185,129,0.05)' }, { label: 'Diastolic BP', data: [80, 82, 78, 80], borderColor: 'var(--secondary)', tension:0.4 }] } });
        }, 100);
    } else if (t === 'identity') {
        html = `${heading(s.tab_identity, 'venn-diagram')}
            <div class="abha-card-compact" style="background:linear-gradient(135deg, #1e293b, #0f172a); color:#fff; padding:3rem; border-radius:40px; max-width:550px; margin:0 auto;">
                <h2 style="font-size:2.5rem;">${CurrentUser}</h2>
                <p class="mono" style="font-size:1.8rem; margin-top:1rem; opacity:0.8;">91-2384-9122-0012</p>
                <div style="margin-top:5rem; display:flex; justify-content:space-between; align-items:flex-end;">
                    <i data-lucide="qr-code" size="80" color="white"></i>
                    <div style="text-align:right;"><span class="badge" style="background:rgba(255,255,255,0.2); color:#fff; font-size:1rem;">ABDM CERTIFIED</span><p style="font-size:0.6rem; opacity:0.6; margin-top:0.5rem;">VALID UNTIL 2030</p></div>
                </div>
            </div>`;
    }
    cont.innerHTML = html;
    lucide.createIcons();
}

// --- PROFESSIONAL INTERACTION (Bidirectional) ---
function switchRole(role) {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('portal-view').style.display = 'block';
    const cont = document.getElementById('portal-container');
    const s = TranslationDB[CurrentLang] || TranslationDB['en'];
    
    let html = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3rem;"><div style="display:flex; align-items:center; gap:1rem;"><i data-lucide="${role==='doctor'?'stethoscope':role==='lab'?'microscope':'pill'}" color="var(--primary)" size="32"></i><h1 class="heading-font">${TranslationDB[CurrentLang]['tab_'+(role==='doctor'?'dr':role==='lab'?'lab':'pharmacy')]}</h1></div><div class="badge" style="background:var(--primary-deep); color:#fff;">AUTHORIZED TERMINAL</div></div>`;
    
    if (role === 'doctor') {
        html += `<div style="display:grid; grid-template-columns: 350px 1fr; gap:3rem;">
            <aside>
                <div class="card" style="text-align:center;"><div class="avatar-circle" style="width:80px; height:80px; margin:0 auto 1.5rem;"><i data-lucide="user"></i></div><h4>Rajesh Kumar</h4><p style="font-size:0.8rem; color:var(--text-muted);">91-2384-XXXX-0012</p></div>
                <div class="card" style="margin-top:2rem;"><h3>Clinical Summary</h3><p style="font-size:0.85rem; margin-top:1rem; color:var(--text-dim);">Patient with history of Metformin treatment for Glucose stability. No active cardiac distress.</p></div>
            </aside>
            <div class="card">
                <h3>Submit Digital Prescription</h3>
                <div class="pro-form-group">
                    <input type="text" id="dr-rx-title" placeholder="Medication Name (e.g. Paracetamol 650mg)">
                    <textarea id="dr-rx-details" placeholder="Dosage & Instructions (e.g. 1-0-1 for 5 days)"></textarea>
                    <button class="btn-primary" onclick="submitProfessionalRecord('prescription')">Sign & Push to Vault</button>
                </div>
            </div>
        </div>`;
    } else if (role === 'lab') {
        html += `<div class="card">
            <h3>Digitize Diagnostic Report</h3>
            <div class="pro-form-group">
                <input type="text" id="lab-report-title" placeholder="Test Name (e.g. Lipid Profile)">
                <textarea id="lab-report-details" placeholder="Observation Details (e.g. LDL: 120 mg/dL, HDL: 45 mg/dL)"></textarea>
                <button class="btn-primary" onclick="submitProfessionalRecord('report')">Authorize & Upload</button>
            </div>
        </div>`;
    } else if (role === 'pharmacy') {
        html += `<div class="card">
            <h3>Record Medication Dispensing</h3>
            <div class="pro-form-group">
                <input type="text" id="ph-doc-title" placeholder="Dispensed Items">
                <textarea id="ph-doc-details" placeholder="Bill Reference & Schedule"></textarea>
                <button class="btn-primary" onclick="submitProfessionalRecord('document')">Upload Dispensing Record</button>
            </div>
        </div>`;
    }
    cont.innerHTML = html;
    lucide.createIcons();
}

function submitProfessionalRecord(type) {
    const title = document.getElementById(type==='prescription'?'dr-rx-title':type==='report'?'lab-report-title':'ph-doc-title').value;
    const details = document.getElementById(type==='prescription'?'dr-rx-details':type==='report'?'lab-report-details':'ph-doc-details').value;
    
    if (!title || !details) return showToast("Clinical Data Required", "error");
    
    const newRecord = {
        id: "REC-" + Date.now(),
        type: type,
        title: title,
        source: CurrentUser + " (Professional)",
        date: "Just Now",
        details: details
    };
    
    GlobalRecords.unshift(newRecord);
    syncDB();
    showToast("Record Pushed to Citizen Vault", "success");
    location.reload(); // Refresh to see changes
}

// --- AI SYMPTOMS CORE v3.0 ---
function executeAIv3() {
    const input = document.getElementById('ai-input').value;
    if (!input || input.length < 5) return showToast("Symptom context missing", "error");
    
    const panel = document.getElementById('ai-result-panel');
    const s = TranslationDB[CurrentLang] || TranslationDB['en'];
    
    panel.innerHTML = `<div class="spinner" style="border:4px solid #f1f5f9; border-top:4px solid var(--primary); width:40px; height:40px; border-radius:50%; animation:spin 1s infinite; margin:0 auto 2rem;"></div><p>Performing Multi-Layer Clinical Synthesis...</p>`;
    
    setTimeout(() => {
        const query = input.toLowerCase();
        let illness = "General Viral Pathogenesis";
        let protocol = "Rest, Hydration & Symptomatic relief";
        let routine = "Monitor Temp 4x daily, avoid cold beverages.";

        if (query.includes('headache') && query.includes('light')) {
            illness = "Acute Migraine Episode"; protocol = "Sumatriptan 50mg S.O.S"; routine = "Dark room rest, avoid digital screens.";
        } else if (query.includes('sugar') || query.includes('thirst')) {
            illness = "Hyperglycemic Shift"; protocol = "Blood Glucose Monitoring (QID)"; routine = "Strict zero-sugar intake, 30m light walk.";
        } else if (query.includes('cough') && query.includes('throat')) {
            illness = "Pharyngitis / Laryngitis"; protocol = "Amoxicillin 500mg BID"; routine = "Warm saline gargles, steam inhalation.";
        }

        panel.innerHTML = `
            <div class="card" style="background:var(--primary-soft); border:2px solid var(--primary); text-align:left; padding:2rem; animation:slideIn 0.5s ease-out;">
                <h3 style="color:var(--primary-deep); margin-bottom:1.5rem;"><i data-lucide="sparkles"></i> ${s.ai_synthesis}</h3>
                <div style="display:grid; gap:1.25rem;">
                    <div><small style="color:var(--primary-deep); font-weight:800; text-transform:uppercase;">${s.ai_result_illness}</small><p style="font-size:1.25rem; font-weight:800;">${illness}</p></div>
                    <div><small style="color:var(--primary-deep); font-weight:800; text-transform:uppercase;">${s.ai_result_rx}</small><p>${protocol}</p></div>
                    <div style="background:#fff; padding:1rem; border-radius:12px; border-left:4px solid var(--warning);"><small style="font-weight:800;">${s.ai_result_routine}</small><p style="font-size:0.85rem; margin-top:0.25rem;">${routine}</p></div>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:2rem;" onclick="switchTab('records')">Audit History Sync</button>
            </div>
        `;
        lucide.createIcons();
    }, 3000);
}

// --- UTILS & SYNC ---
function uploadFilePrompt() {
    const name = prompt("Enter Document Name:");
    if (!name) return;
    GlobalDocuments.unshift({ id: "DOC-"+Date.now(), name: name + ".pdf", size: "Unknown", date: "Today" });
    syncDB();
    renderTabContent('documents');
    showToast("Document Encrypted & Saved", "success");
}

function togglePermission(id) {
    const p = EntityPermissions.find(p=>p.id===id);
    if (p) p.status = !p.status;
    syncDB();
    renderTabContent('consent');
    showToast(p.status ? "Entity Authorized" : "Entity Revoked", p.status ? "success" : "error");
}

function syncDB() {
    localStorage.setItem('hc_records', JSON.stringify(GlobalRecords));
    localStorage.setItem('hc_docs', JSON.stringify(GlobalDocuments));
    localStorage.setItem('hc_perms', JSON.stringify(EntityPermissions));
    localStorage.setItem('hc_vitals', JSON.stringify(GlobalVitals));
}

function initPersistence() { syncDB(); }
function initSidebar() { document.querySelectorAll('.nav-item').forEach(item => { item.addEventListener('click', function() { document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active')); this.classList.add('active'); }); }); }
function showToast(m, t) {
    const cont = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'card';
    toast.style.cssText = `padding: 1rem 2rem; border-left: 6px solid ${t==='success'?'#10b981':t==='error'?'#ef4444':'#6366f1'}; font-weight:800; animation:slideIn 0.3s ease-out; box-shadow:var(--shadow-xl);`;
    toast.textContent = m;
    cont.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
