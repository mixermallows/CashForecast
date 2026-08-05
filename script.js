// 🔥 ข้อมูล Supabase ของคุณ
const SUPABASE_URL = 'https://qgvvvuqugwnarrxzqbsr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndnZ2dXF1Z3duYXJyeHpxYnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTkxNjksImV4cCI6MjEwMTQ5NTE2OX0.8wS2ol6DTZYVRLZWHOBNzctuGrEO9OY0xyqRsE8neUo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const i18n = { th: { overview:"ภาพรวม", freeCash:"เงินอิสระที่ใช้ได้จริง", safe:"สบายๆ ยังพอผ่อนของได้", healthScore:"สุขภาพการเงิน", crit1:"50 คะแนน: กระแสเงินสดเป็นบวก", crit2:"30 คะแนน: ออม ≥ 10% ของรายได้", crit3:"20 คะแนน: หนี้สิน ≤ 20% ของรายได้", criteriaTitle:"เกณฑ์การให้คะแนน", cashFlow4m:"กระแสเงินสดล่วงหน้า 4 เดือน", select:"เลือก", incTotal:"รายรับรวม", expTotal:"รายจ่ายคงที่", debtTotal:"หนี้สิน/ผ่อน", saveTotal:"เงินเก็บ/ลงทุน", freeCashTotal:"เงินอิสระที่ใช้ได้จริง", income:"รายรับ", expense:"รายจ่าย", debt:"หนี้สิน", savings:"เงินเก็บ", itemName:"ชื่อรายการ", catBank:"หมวดหมู่ / ธนาคาร", totalPrice:"ยอดสินค้ารวม", months:"เดือน", interestRate:"ดอกเบี้ย (%) ต่อปี", monthlyCalc:"ยอดผ่อนต่อเดือน (คำนวณอัตโนมัติ)", amount:"ยอดเงิน", occurrenceType:"ประเภทการเกิดขึ้น", recurring:"ทุกเดือน", installment:"ผ่อนสินค้า", once:"ครั้งเดียว", save:"บันทึก", deleteItem:"ลบรายการนี้", deleteSelected:"ลบรายการที่เลือก", scenario:"Scenario", scenarioDesc:"จำลองสถานการณ์ก่อนตัดสินใจ", simBuy:"ซื้อของผ่อน", simPayoff:"ปิดหนี้ก้อนนี้", simAdjust:"ปรับงบประมาณ", simPriceLabel:"ราคาของที่จะผ่อน", trend4m:"เทียบกระแสเงินสด 4 เดือนข้างหน้า", beforeSim:"ก่อนผ่อน", afterSim:"หลังผ่อน", currentBal:"เงินอิสระปัจจุบัน", afterSimBal:"หลังผ่อนของ (ต่อเดือน)", cancel:"ยกเลิก", saveToReal:"บันทึกเป็นจริง", home:"Home", planner:"Planner", back:"ย้อนกลับ", guestUser:"ผู้ใช้ทั่วไป", notLoggedIn:"ยังไม่ได้เข้าสู่ระบบ", loginPrompt:"สมัครสมาชิกหรือเข้าสู่ระบบเพื่อบันทึกข้อมูลของคุณอย่างถาวร", darkMode:"โหมดมืด (Dark Mode)", splashSlogan:"วางแผนล่วงหน้า ตัดสินใจอย่างมั่นใจ" }, en: { overview:"Overview", freeCash:"True Free Cash Flow", safe:"Safe to spend", healthScore:"Financial Health", crit1:"50 pts: Positive Cash Flow", crit2:"30 pts: Save ≥ 10% of Income", crit3:"20 pts: Debt ≤ 20% of Income", criteriaTitle:"Scoring Criteria", cashFlow4m:"Cash Flow Forecast (4 Months)", select:"Select", incTotal:"Total Income", expTotal:"Fixed Expenses", debtTotal:"Debt/Installment", saveTotal:"Savings/Invest", freeCashTotal:"True Free Cash Flow", income:"Income", expense:"Expense", debt:"Debt", savings:"Savings", itemName:"Item Name", catBank:"Category / Bank", totalPrice:"Total Price", months:"Months", interestRate:"Interest Rate (%) / Year", monthlyCalc:"Monthly Payment (Auto-Calculated)", amount:"Amount", occurrenceType:"Occurrence", recurring:"Recurring", installment:"Installment", once:"One-time", save:"Save", deleteItem:"Delete Item", deleteSelected:"Delete Selected", scenario:"Scenario", scenarioDesc:"Simulate before deciding", simBuy:"Buy Installment", simPayoff:"Pay off Debt", simAdjust:"Adjust Budget", simPriceLabel:"Item Price", trend4m:"Cash Flow Trend (4 Months)", beforeSim:"Before", afterSim:"After", currentBal:"Current Free Cash", afterSimBal:"After Installment (Monthly)", cancel:"Cancel", saveToReal:"Save to Planner", home:"Home", planner:"Planner", back:"Back", guestUser:"Guest User", notLoggedIn:"Not logged in", loginPrompt:"Sign up or log in to save your data permanently", darkMode:"Dark Mode", splashSlogan:"Plan ahead, decide with confidence" } };
let currentLang = 'th';

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (i18n[currentLang][key]) elem.innerText = i18n[currentLang][key];
  });
  document.getElementById('lang-btn').innerText = currentLang.toUpperCase();
  if (document.getElementById('app').style.display !== 'none') {
    renderHome(); renderPlanner();
  }
}
function toggleLang() { currentLang = currentLang === 'th' ? 'en' : 'th'; applyLang(); }

const monthNamesTh = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthOrder = [];
let currentMonth = "";
const useBE = true;

function generateMonths() {
  let now = new Date();
  monthOrder = [];
  for(let i=0; i<6; i++) {
    let d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    let year = useBE ? d.getFullYear() + 543 : d.getFullYear();
    let mName = currentLang === 'th' ? monthNamesTh[d.getMonth()] : monthNamesEn[d.getMonth()];
    monthOrder.push(`${mName} ${year}`);
  }
  currentMonth = monthOrder[0];
}
generateMonths();

let monthsData = {}; 
let isGuest = false; // เพิ่มตัวแปรเช็คสถานะ Guest
setTimeout(() => { document.getElementById('splash').classList.add('hide'); }, 2000); 
let currentSheetType = 'income', selectedCategory = '', currentOccurrence = 'recurring', isSelectMode = false, selectedItems = new Set(), currentScenarioType = 'buy', plannerMonth = "";

// --- AUTHENTICATION ---
function showOnboarding() {
  document.getElementById('screen-onboarding').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

async function handleAuth(type) {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  if(!email || !password) { alert('กรุณากรอกอีเมลและรหัสผ่าน'); return; }

  try {
    if(type === 'signup') {
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) throw error;
      alert('สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...');
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }
    checkAuthState();
  } catch (error) {
    alert("เกิดข้อผิดพลาด: " + error.message);
  }
}

async function handleLogout() {
  await supabaseClient.auth.signOut();
  isGuest = false; // เปลี่ยนสถานะกลับ
  document.getElementById('profile-name').innerText = i18n[currentLang].guestUser;
  document.getElementById('profile-email').innerText = i18n[currentLang].notLoggedIn;
  document.getElementById('btn-logout').style.display = 'none';
  document.getElementById('login-prompt-box').style.display = 'block';
  monthsData = {};
  renderHome(); renderPlanner();
  showOnboarding();
}

function continueAsGuest() {
  isGuest = true; // ตั้งค่าว่าเป็น Guest
  monthsData = {}; // ล้างข้อมูลเดิมในหน่วยความจำ
  document.getElementById('screen-onboarding').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.querySelector('.nav-btn').classList.add('active');
  plannerMonth = currentMonth;
  applyLang();
  renderHome(); renderPlanner(); // โหลดหน้าแอปเปล่าๆ
}

async function checkAuthState() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    isGuest = false;
    document.getElementById('screen-onboarding').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.querySelector('.nav-btn').classList.add('active');
    plannerMonth = currentMonth;
    document.getElementById('profile-name').innerText = session.user.email || "User";
    document.getElementById('profile-email').innerText = "ล็อกอินแล้ว";
    document.getElementById('btn-logout').style.display = 'block';
    document.getElementById('login-prompt-box').style.display = 'none';
    applyLang();
    fetchTransactions();
  } else {
    isGuest = false;
    document.getElementById('screen-onboarding').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  }
}
checkAuthState();

// --- DATABASE & LOGIC ---
async function fetchTransactions() {
  if (isGuest) return; // ถ้าเป็น Guest ไม่ต้องดึงข้อมูลจากฐานข้อมูล

  const { data: { session } } = await supabaseClient.auth.getSession();
  let query = supabaseClient.from('transactions').select('*');
  
  if (session) {
    query = query.eq('user_id', session.user.id);
  } else {
    query = query.is('user_id', null);
  }

  const { data, error } = await query;
  if (error) { console.error(error); return; }
  
  monthsData = {};
  data.forEach(item => {
    if (!monthsData[item.month_key]) monthsData[item.month_key] = [];
    monthsData[item.month_key].push({
      id: item.id, name: item.name, amount: parseFloat(item.amount), type: item.type, occurrence: item.occurrence, cat: item.category, totalDebt: parseFloat(item.total_debt || 0)
    });
  });

  // กระจายรายการทุกเดือน
  let firstMonthWithData = Object.keys(monthsData).find(key => monthsData[key].length > 0);
  if (firstMonthWithData) {
    let recurringItems = monthsData[firstMonthWithData].filter(i => i.occurrence === 'recurring');
    monthOrder.forEach(mName => {
      if (!monthsData[mName]) monthsData[mName] = [];
      recurringItems.forEach(recItem => {
        let exists = monthsData[mName].some(i => i.name === recItem.name && i.type === recItem.type && i.cat === recItem.cat);
        if (!exists) {
          monthsData[mName].push({ ...recItem, id: recItem.id + '_' + mName });
        }
      });
    });
  }
  renderHome(); renderPlanner();
}

function parseNumber(str) { if (!str) return 0; return parseInt(str.toString().replace(/[^0-9]/g, '')) || 0; }

function getTotals(month) {
  if (!monthsData[month]) return { in_: 0, out: 0, debt: 0, save: 0 };
  let t = { in_: 0, out: 0, debt: 0, save: 0 };
  monthsData[month].forEach(item => { 
    if(item.type==='income') t.in_+=item.amount; 
    else if(item.type==='expense') t.out+=item.amount; 
    else if(item.type==='debt') t.debt+=item.amount; 
    else if(item.type==='savings') t.save+=item.amount; 
  });
  return t;
}
function getProjectedCash(i) { return getTotals(monthOrder[i]).in_ - getTotals(monthOrder[i]).out - getTotals(monthOrder[i]).debt - getTotals(monthOrder[i]).save; }

function renderHome() {
  const t = getTotals(currentMonth);
  const freeCash = t.in_ - t.out - t.debt - t.save;
  document.getElementById('home-free-cash').innerHTML = freeCash.toLocaleString() + '<span>฿</span>';
  const badge = document.getElementById('home-badge');
  if (freeCash < 0) { badge.className = 'badge red'; badge.innerText = currentLang==='th'?'ระวัง! กระแสเงินสดติดลบ':'Warning! Negative Cash Flow'; } 
  else if (freeCash < 5000) { badge.className = 'badge orange'; badge.innerText = currentLang==='th'?'เหลือน้อย ควรระวัง':'Low balance, be careful'; } 
  else { badge.className = 'badge green'; badge.innerText = i18n[currentLang].safe; }

  let score = 0;
  if (freeCash > 0) score += 50; else if (freeCash === 0) score += 25;
  if (t.in_ > 0) {
    let saveRate = (t.save / t.in_) * 100; if (saveRate >= 10) score += 30; else if (saveRate > 0) score += 15;
    let debtRate = (t.debt / t.in_) * 100; if (debtRate <= 20) score += 20; else if (debtRate <= 40) score += 10;
  }
  const circle = document.getElementById('ring-fg');
  const offset = 314.16 - (score / 100) * 314.16;
  circle.style.strokeDashoffset = offset;
  if (score >= 80) circle.style.stroke = '#30D158'; else if (score >= 50) circle.style.stroke = '#FF9F0A'; else circle.style.stroke = '#FF453A';
  let currentScore = 0; const scoreElem = document.getElementById('score-num');
  const interval = setInterval(() => { if (currentScore >= score) { currentScore = score; clearInterval(interval); } else { currentScore++; } scoreElem.innerText = currentScore; }, 20);

  let chartHtml = '';
  for(let i=0; i<4; i++) {
    let val = getProjectedCash(i);
    let height = Math.max(5, Math.min(100, (val / 20000) * 100)); if(val < 0) height = 5;
    let shortName = monthOrder[i].split(" ")[0].substring(0, 3);
    chartHtml += `<div class="bar-group"><div class="bar" style="height: ${height}%; background: ${val < 0 ? '#FF453A' : '#0A84FF'};"><span>${val.toLocaleString()}</span></div><div class="bar-label">${shortName}</div></div>`;
  }
  document.getElementById('home-chart').innerHTML = chartHtml;
}

function renderPlanner() {
  document.getElementById('month-title').innerText = plannerMonth;
  const t = getTotals(plannerMonth);
  document.getElementById('total-income').innerText = t.in_.toLocaleString() + ' ฿';
  document.getElementById('total-expense').innerText = t.out.toLocaleString() + ' ฿';
  document.getElementById('total-debt').innerText = t.debt.toLocaleString() + ' ฿';
  document.getElementById('total-save').innerText = t.save.toLocaleString() + ' ฿';
  document.getElementById('total-balance').innerText = (t.in_ - t.out - t.debt - t.save).toLocaleString() + ' ฿';
  if (t.in_ > 0) { document.getElementById('pct-expense').innerText = `(${((t.out/t.in_)*100).toFixed(1)}%)`; document.getElementById('pct-debt').innerText = `(${((t.debt/t.in_)*100).toFixed(1)}%)`; document.getElementById('pct-save').innerText = `(${((t.save/t.in_)*100).toFixed(1)}%)`; } 
  else { document.getElementById('pct-expense').innerText=''; document.getElementById('pct-debt').innerText=''; document.getElementById('pct-save').innerText=''; }

  const data = monthsData[plannerMonth] || [];
  let html = '';
  if (data.length === 0) html = `<div class="glass-card" style="padding: 32px 24px; text-align: center; margin-top: 24px;"><h3 style="font-size: 18px;">No Items</h3><p style="font-size: 14px; color: var(--text-muted);">Tap + to start planning</p></div>`;

  const types = [{key:'income',title:i18n[currentLang].income,class:'in'},{key:'expense',title:i18n[currentLang].expense,class:'out'},{key:'debt',title:i18n[currentLang].debt,class:'debt'},{key:'savings',title:i18n[currentLang].savings,class:'save'}];
  types.forEach(type => {
    const items = data.filter(item => item.type === type.key);
    if (items.length > 0) {
      html += `<div class="section-title">${type.title}</div>`;
      items.forEach(item => {
        let icon = type.key === 'income' ? '💰' : type.key === 'expense' ? '🏠' : type.key === 'debt' ? '💳' : '🐷';
        let tagHtml = `<span class="tag ${item.occurrence}">${i18n[currentLang][item.occurrence]}</span>`;
        let subText = item.cat || 'General'; if (item.totalDebt > 0) subText += ` | ${currentLang==='th'?'เหลือ':'Left'} ${item.totalDebt.toLocaleString()} ฿`;
        let checkboxHtml = isSelectMode ? `<div class="custom-checkbox ${selectedItems.has(item.id) ? 'checked' : ''}" onclick="event.stopPropagation(); toggleSelect('${item.id}')"></div>` : '';
        html += `<div class="list-item" onclick="openSheetForEdit('${item.id}')">${checkboxHtml}<div class="list-left" style="${isSelectMode?'margin-left:8px;':''}"><div class="icon-circle">${icon}</div><div class="list-text"><p>${item.name} ${tagHtml}</p><span class="sub">${subText}</span></div></div><div class="amount ${type.class}">${type.key === 'income' ? '+' : '-'}${item.amount.toLocaleString()} ฿</div></div>`;
      });
    }
  });
  document.getElementById('data-container').innerHTML = html;
}

function toggleSelectMode() { 
  isSelectMode = !isSelectMode; 
  selectedItems.clear(); 
  document.getElementById('edit-btn').innerText = isSelectMode ? (currentLang==='th'?'เสร็จสิ้น':'Done') : i18n[currentLang].select; 
  document.getElementById('edit-btn').classList.toggle('danger', isSelectMode); 
  document.getElementById('fab-btn').style.display = isSelectMode ? 'none' : 'block'; 
  document.getElementById('delete-bar').classList.toggle('active', isSelectMode); 
  renderPlanner(); 
  document.getElementById('select-count').innerText = '0'; 
}

function toggleSelect(id) { 
  if (selectedItems.has(id)) selectedItems.delete(id); 
  else selectedItems.add(id); 
  renderPlanner(); 
  document.getElementById('select-count').innerText = selectedItems.size; 
}

async function deleteSelected() {
  if (selectedItems.size === 0) return;

  // ถ้าเป็น Guest ให้ลบแค่ใน Memory
  if (isGuest) {
    selectedItems.forEach(fullId => {
      let baseId = fullId.split('_')[0];
      Object.keys(monthsData).forEach(m => {
        monthsData[m] = monthsData[m].filter(i => !i.id.startsWith(baseId));
      });
    });
    toggleSelectMode(); renderHome(); renderPlanner();
    return;
  }

  // ถ้า Login แล้วลบในฐานข้อมูล
  const realIds = Array.from(selectedItems).map(id => id.split('_')[0]);
  await supabaseClient.from('transactions').delete().in('id', realIds);
  toggleSelectMode(); fetchTransactions();
}

async function deleteSingleItem() {
  const fullId = document.getElementById('editing-id').value; 
  if (!fullId) return;

  // ถ้าเป็น Guest ให้ลบแค่ใน Memory
  if (isGuest) {
    let baseId = fullId.split('_')[0];
    Object.keys(monthsData).forEach(m => {
      monthsData[m] = monthsData[m].filter(i => !i.id.startsWith(baseId));
    });
    closeSheet(); renderHome(); renderPlanner();
    return;
  }

  // ถ้า Login แล้วลบในฐานข้อมูล
  const realId = fullId.split('_')[0]; 
  await supabaseClient.from('transactions').delete().eq('id', realId);
  closeSheet(); fetchTransactions();
}

function switchScreen(screenName, event) {
  document.querySelectorAll('#app .screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenName).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('bottom-nav').style.display = (screenName === 'profile') ? 'none' : 'flex';
  if(event && event.currentTarget && event.currentTarget.classList.contains('nav-btn')) event.currentTarget.classList.add('active');
  else if (screenName === 'home') document.querySelector('.nav-btn').classList.add('active');
  document.getElementById('app').style.backgroundColor = screenName === 'scenario' ? '#2d1b69' : 'var(--bg-color)';
  if (screenName === 'home') renderHome(); if (screenName === 'planner') renderPlanner(); if (screenName === 'scenario') updateScenario();
}

function navigateMonth(direction) {
  let index = monthOrder.indexOf(plannerMonth); let newIndex = index + direction;
  if (newIndex >= 0 && newIndex < monthOrder.length) { plannerMonth = monthOrder[newIndex]; renderPlanner(); }
}

const categories = { income: ['เงินเดือน','รายได้เสริม','โบนัส'], expense: ['สาธารณูปโภค','Subscription','ที่อยู่อาศัย','ช้อปปิ้ง'], debt: ['KTC','SCB','KBank','BBL','สินเชื่อ','ผ่อนของ'], savings: ['กองทุนฉุกเฉิน','ลงทุน','เป้าหมาย'] };
function openSheetForAdd() { document.getElementById('editing-id').value=''; document.getElementById('form-name').value=''; document.getElementById('form-amount').value=''; document.getElementById('form-total-debt').value=''; document.getElementById('form-months').value=''; document.getElementById('form-interest').value=''; document.getElementById('btn-delete').style.display='none'; document.getElementById('calc-result').classList.remove('show'); switchSheetType('income'); toggleSheet(true); }
function openSheetForEdit(itemId) { if(isSelectMode) return; const item = (monthsData[plannerMonth]||[]).find(i => i.id === itemId); if(!item) return; document.getElementById('editing-id').value=item.id; document.getElementById('form-name').value=item.name; document.getElementById('form-amount').value=item.amount.toLocaleString(); document.getElementById('form-total-debt').value=item.totalDebt>0?item.totalDebt.toLocaleString():''; document.getElementById('btn-delete').style.display='block'; setOccurrence(item.occurrence||'recurring'); switchSheetType(item.type, item.cat); toggleSheet(true); }
function switchSheetType(type, preselectCat=null) { currentSheetType=type; document.querySelectorAll('.sheet-seg-btn').forEach(btn => { btn.classList.remove('active','income','expense','debt','savings'); if(btn.getAttribute('data-i18n')===type) btn.classList.add('active',type); }); document.getElementById('amount-label').innerText = type==='debt'?(currentLang==='th'?'ยอดผ่อนต่อเดือน':'Monthly Payment'):i18n[currentLang].amount; document.getElementById('installment-group').style.display = type==='debt'?'block':'none'; document.getElementById('tg-installment').style.display = type==='debt'?'block':'none'; if(type!=='debt'&&currentOccurrence==='installment') setOccurrence('recurring'); selectedCategory = preselectCat||categories[type][0]; document.getElementById('chips-container').innerHTML = categories[type].map(cat => `<div class="chip ${cat===selectedCategory?'active':''}" onclick="selectChip(this,'${cat}')">${cat}</div>`).join(''); if(!document.getElementById('form-name').value) document.getElementById('form-name').value=selectedCategory; }
function selectChip(elem, cat) { elem.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active')); elem.classList.add('active'); selectedCategory=cat; document.getElementById('form-name').value=cat; }
function setOccurrence(type) { currentOccurrence=type; document.querySelectorAll('.toggle-card').forEach(c => c.classList.remove('active')); document.getElementById('tg-'+type).classList.add('active'); }

function calcInstallment() {
  const p = parseNumber(document.getElementById('form-total-debt').value); 
  const n = parseInt(document.getElementById('form-months').value) || 0; 
  const r = parseFloat(document.getElementById('form-interest').value) || 0; 
  
  if (p > 0 && n > 0) {
    let monthly = 0;
    if (r === 0) {
      monthly = p / n; 
    } else {
      let i = (r / 100) / 12; 
      monthly = p * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
    }
    let totalPay = monthly * n; 
    let totalInterest = totalPay - p; 
    
    document.getElementById('calc-monthly').innerHTML = 
      `${Math.round(monthly).toLocaleString()} ฿ /เดือน` + 
      `<br><span style="font-size:12px; color:#636366; font-weight:400;">ดอกเบี้ยรวม: ${Math.round(totalInterest).toLocaleString()} ฿</span>`;
    document.getElementById('form-amount').value = Math.round(monthly).toLocaleString();
    document.getElementById('calc-result').classList.add('show');
  } else {
    document.getElementById('calc-result').classList.remove('show');
  }
}

async function saveItem() {
  const fullId = document.getElementById('editing-id').value; 
  const realId = fullId ? fullId.split('_')[0] : null; 
  const name = document.getElementById('form-name').value.trim(); 
  const amount = parseNumber(document.getElementById('form-amount').value); 
  const totalDebt = parseNumber(document.getElementById('form-total-debt').value);
  
  if(!name || amount <= 0){alert('กรุณากรอกชื่อรายการและยอดเงินให้ถูกต้อง');return;}
  
  let targetMonth = (currentOccurrence === 'recurring') ? currentMonth : plannerMonth;
  const payload = { name, amount, type: currentSheetType, cat: selectedCategory, totalDebt, occurrence: currentOccurrence };

  // ถ้าเป็น Guest ให้เก็บใน Memory อย่างเดียว ไม่ยิงฐานข้อมูล
  if (isGuest) {
    const newId = 'guest' + Date.now();
    if (!monthsData[targetMonth]) monthsData[targetMonth] = [];
    monthsData[targetMonth].push({ id: newId, ...payload });

    if (currentOccurrence === 'recurring') {
      monthOrder.forEach(mName => {
        if (!monthsData[mName]) monthsData[mName] = [];
        let exists = monthsData[mName].some(i => i.name === name && i.type === currentSheetType && i.cat === selectedCategory);
        if (!exists) {
          monthsData[mName].push({ id: newId + '_' + mName, ...payload });
        }
      });
    }

    toggleSheet(false); 
    renderHome(); renderPlanner();
    return;
  }

  // ถ้า Login แล้วบันทึกลงฐานข้อมูล
  try {
    const { data: { session } } = await supabaseClient.auth.getSession(); 
    payload.user_id = session?.user?.id || null; 
    payload.month_key = targetMonth;
    payload.category = selectedCategory;
    payload.total_debt = totalDebt;
    
    if(realId) { 
      const { error } = await supabaseClient.from('transactions').update(payload).eq('id', realId); 
      if(error) throw error; 
    } else { 
      const { error } = await supabaseClient.from('transactions').insert(payload); 
      if(error) throw error; 
    }
    toggleSheet(false); 
    fetchTransactions();
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการบันทึก: " + error.message);
  }
}
function toggleSheet(show) { document.getElementById('sheet').classList.toggle('active',show); document.getElementById('overlay').classList.toggle('active',show); }
function closeSheet() { toggleSheet(false); }
function formatPriceInput(elem) { let val=parseNumber(elem.value); elem.value=val.toLocaleString(); updateScenario(); }
function switchScenarioType(type) { currentScenarioType=type; document.querySelectorAll('.sc-chip').forEach(c=>c.classList.remove('active')); event.currentTarget.classList.add('active'); const lp=document.getElementById('sc-label-price'), mu=document.getElementById('sc-month-ui'), iu=document.getElementById('sc-interest-ui'), nl=document.getElementById('sc-new-label'); if(type==='buy'){lp.innerText=i18n[currentLang].simPriceLabel;mu.style.display='block';iu.style.display='block';document.getElementById('sc-price').value='30,000';nl.innerText=i18n[currentLang].afterSimBal;} else if(type==='payoff'){lp.innerText=i18n[currentLang].simPayoff;mu.style.display='none';iu.style.display='none';document.getElementById('sc-price').value='50,000';nl.innerText=i18n[currentLang].simPayoff;} else {lp.innerText=i18n[currentLang].simAdjust;mu.style.display='none';iu.style.display='none';document.getElementById('sc-price').value='2,000';nl.innerText=i18n[currentLang].simAdjust;} updateScenario(); }
function updateScenario() { const cBal=getTotals(currentMonth).in_-getTotals(currentMonth).out-getTotals(currentMonth).debt-getTotals(currentMonth).save; document.getElementById('sc-current-bal').innerText=cBal.toLocaleString()+' ฿'; const price=parseNumber(document.getElementById('sc-price').value); const months=parseInt(document.getElementById('sc-month-slider').value); const interest=parseInt(document.getElementById('sc-interest-slider').value); document.getElementById('sc-month-label').innerText=months+(currentLang==='th'?' เดือน':' Months'); document.getElementById('sc-interest-label').innerText=interest+'%'; let mImp=0, bD=[], aD=[]; for(let i=0;i<4;i++){ let bB=getProjectedCash(i); bD.push(bB); if(currentScenarioType==='buy'){ let i_r=(interest/100)/12; mImp=interest===0?price/months:(price*i_r*Math.pow(1+i_r,months))/(Math.pow(1+i_r,months)-1); aD.push(bB-mImp); } else if(currentScenarioType==='payoff'){ mImp=8500; aD.push(bB+mImp); } else { mImp=price; aD.push(bB+mImp); } } let allV=[...bD,...aD]; let minV=Math.min(...allV); let maxV=Math.max(...allV); let range=maxV-minV||1; let pB="M0,"+(90-((bD[0]-minV)/range)*80); let pA="M0,"+(90-((aD[0]-minV)/range)*80); let lH=""; for(let i=0;i<4;i++){ let x=i*100; let yB=90-((bD[i]-minV)/range)*80; let yA=90-((aD[i]-minV)/range)*80; if(i>0){pB+=` L${x},${yB}`;pA+=` L${x},${yA}`;} let lYB=yB+12; let lYA=yA-5; if(Math.abs(lYB-lYA)<12){lYB=yB+15;lYA=yA-15;} lH+=`<text x="${x}" y="${lYA}" class="chart-val" text-anchor="middle">${Math.round(aD[i]).toLocaleString()}</text>`; lH+=`<text x="${x}" y="${lYB}" class="chart-val muted" text-anchor="middle">${Math.round(bD[i]).toLocaleString()}</text>`; } document.getElementById('chart-lines').innerHTML=`<path d="${pB}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4" /><path d="${pA}" fill="none" stroke="#ffffff" stroke-width="3" />`; document.getElementById('chart-labels').innerHTML=lH; const nBal=currentScenarioType==='buy'?cBal-mImp:cBal+mImp; const nE=document.getElementById('sc-new-bal'); nE.innerText=Math.round(nBal).toLocaleString()+' ฿'; if(nBal<0)nE.style.color='#FF453A'; else if(nBal<2000)nE.style.color='#FF9F0A'; else nE.style.color='#30D158'; }

async function confirmScenario() { 
  const price=parseNumber(document.getElementById('sc-price').value); const months=parseInt(document.getElementById('sc-month-slider').value); const interest=parseInt(document.getElementById('sc-interest-slider').value); 
  let payload={}; 
  if(currentScenarioType==='buy'){let i=(interest/100)/12;let m=interest===0?price/months:(price*i*Math.pow(1+i,months))/(Math.pow(1+i,months)-1);payload={name:'ผ่อนของ (Scenario)',amount:Math.round(m),type:'debt',cat:'ผ่อนของ',totalDebt:price,occurrence:'installment'};} 
  else if(currentScenarioType==='payoff'){payload={name:'เงินอิสระ (ปิดหนี้)',amount:8500,type:'income',cat:'ปิดหนี้',occurrence:'recurring',totalDebt:0};} 
  else {payload={name:'งบประหยัด (Scenario)',amount:price,type:'savings',cat:'ปรับงบ',occurrence:'recurring',totalDebt:0};} 
  payload.month_key = currentMonth;

  // ถ้าเป็น Guest ให้เก็บใน Memory
  if (isGuest) {
    const newId = 'guest' + Date.now();
    if (!monthsData[currentMonth]) monthsData[currentMonth] = [];
    monthsData[currentMonth].push({ id: newId, ...payload });
    if (payload.occurrence === 'recurring') {
      monthOrder.forEach(mName => {
        if (!monthsData[mName]) monthsData[mName] = [];
        let exists = monthsData[mName].some(i => i.name === payload.name && i.type === payload.type && i.cat === payload.cat);
        if (!exists) monthsData[mName].push({ id: newId + '_' + mName, ...payload });
      });
    }
    switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] });
    renderHome(); renderPlanner();
    return;
  }

  // ถ้า Login ให้เก็บลงฐานข้อมูล
  const { data: { session } } = await supabaseClient.auth.getSession(); payload.user_id = session?.user?.id || null; 
  await supabaseClient.from('transactions').insert(payload); 
  switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); fetchTransactions(); 
}
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); const isD=document.body.classList.contains('dark-mode'); document.getElementById('dark-mode-toggle').style.background=isD?'#30D158':'#d1d1d6'; document.getElementById('dark-knob').style.transform=isD?'translateX(20px)':'translateX(0)'; }