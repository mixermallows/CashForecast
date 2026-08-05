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
  for(let i=0; i<6; i++) { // 6 เดือนล่วงหน้า
    let d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    let year = useBE ? d.getFullYear() + 543 : d.getFullYear();
    let mName = currentLang === 'th' ? monthNamesTh[d.getMonth()] : monthNamesEn[d.getMonth()];
    monthOrder.push(`${mName} ${year}`);
  }
  currentMonth = monthOrder[0];
}
generateMonths();

let monthsData = {}; 
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
  document.getElementById('profile-name').innerText = i18n[currentLang].guestUser;
  document.getElementById('profile-email').innerText = i18n[currentLang].notLoggedIn;
  document.getElementById('btn-logout').style.display = 'none';
  document.getElementById('login-prompt-box').style.display = 'block';
  monthsData = {};
  renderHome(); renderPlanner();
  showOnboarding();
}

function continueAsGuest() {
  document.getElementById('screen-onboarding').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.querySelector('.nav-btn').classList.add('active');
  plannerMonth = currentMonth;
  applyLang();
  fetchTransactions();
}

async function checkAuthState() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
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
    document.getElementById('screen-onboarding').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
  }
}
checkAuthState();

// --- DATABASE & LOGIC ---
async function fetchTransactions() {
  const { data, error } = await supabaseClient.from('transactions').select('*');
  if (error) { console.error(error); return; }
  
  monthsData = {};
  data.forEach(item => {
    if (!monthsData[item.month_key]) monthsData[item.month_key] = [];
    monthsData[item.month_key].push({
      id: item.id, name: item.name, amount: parseFloat(item.amount), type: item.type, occurrence: item.occurrence, cat: item.category, totalDebt: parseFloat(item.total_debt || 0)
    });
  });

  // กระจายรายการทุกเดือนไป 6 เดือน
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

function toggleSelectMode() { isSelectMode = !isSelectMode; selectedItems.clear(); document.getElementById('edit-btn').innerText = isSelectMode ? (currentLang==='th'?'เสร็จสิ้น':'Done') : i18n[currentLang].select; document.getElementById('edit-btn').classList.toggle('danger', isSelectMode); document