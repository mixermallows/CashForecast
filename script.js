// 🔥 ข้อมูล Supabase ของคุณ
const SUPABASE_URL = 'https://qgvvvuqugwnarrxzqbsr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndnZ2dXF1Z3duYXJyeHpxYnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTkxNjksImV4cCI6MjEwMTQ5NTE2OX0.8wS2ol6DTZYVRLZWHOBNzctuGrEO9OY0xyqRsE8neUo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const i18n = { th: { overview:"ภาพรวม", freeCash:"เงินอิสระที่ใช้ได้จริง", safe:"สบายๆ ยังพอผ่อนของได้", healthScore:"สุขภาพการเงิน", emptyHealth:"* เริ่มวางแผนเงินเดือนนี้เพื่อดูคะแนนสุขภาพการเงิน *", cashFlow6m:"แนวโน้มกระแสเงินสด 6 เดือน", waterfallTitle:"เงินหายไปไหน?", select:"เลือก", incTotal:"รายรับรวม", expTotal:"รายจ่ายคงที่", debtTotal:"หนี้สิน/ผ่อน", saveTotal:"เงินเก็บ/ลงทุน", freeCashTotal:"เงินอิสระที่ใช้ได้จริง", income:"รายรับ", expense:"รายจ่าย", debt:"หนี้สิน", savings:"เงินเก็บ", catBank:"หมวดหมู่", totalPrice:"เงินต้น", months:"จำนวนงวด", interestRate:"ดอกเบี้ย (%) ต่อปี", monthlyCalc:"ยอดผ่อนต่อเดือน (คำนวณอัตโนมัติ)", amount:"ยอดเงิน", occurrenceType:"ประเภทการเกิดขึ้น", recurring:"ทุกเดือน", installment:"ผ่อนสินค้า", once:"ครั้งเดียว", save:"บันทึก", deleteItem:"ลบรายการนี้", deleteSelected:"ลบรายการที่เลือก", simulator:"Simulator", scenarioDesc:"จำลองสถานการณ์ก่อนตัดสินใจ", simBuy:"ซื้อของผ่อน", simPayoff:"ปิดหนี้ก้อนนี้", simAdjust:"ปรับงบประมาณ", simPriceLabel:"ราคาของ (เงินต้น)", trend6m:"เทียบกระแสเงินสด 6 เดือนข้างหน้า", beforeSim:"ก่อนผ่อน", afterSim:"หลังผ่อน", currentBal:"เงินอิสระปัจจุบัน", afterSimBal:"หลังผ่อนของ (ต่อเดือน)", cancel:"ยกเลิก", saveToReal:"บันทึกเป็นจริง", back:"ย้อนกลับ", guestUser:"ผู้ใช้ทั่วไป", notLoggedIn:"ยังไม่ได้เข้าสู่ระบบ", loginPrompt:"สมัครสมาชิกหรือเข้าสู่ระบบเพื่อบันทึกข้อมูลของคุณอย่างถาวร", darkMode:"โหมดมืด (Dark Mode)", deductions:"รายการหัก (Optional)" }, en: { overview:"Overview", freeCash:"True Free Cash Flow", safe:"Safe to spend", healthScore:"Financial Health", emptyHealth:"* Start planning this month to see your financial health score *", cashFlow6m:"Cash Flow Trend (6 Months)", waterfallTitle:"Where did money go?", select:"Select", incTotal:"Total Income", expTotal:"Fixed Expenses", debtTotal:"Debt/Installment", saveTotal:"Savings/Invest", freeCashTotal:"True Free Cash Flow", income:"Income", expense:"Expense", debt:"Debt", savings:"Savings", catBank:"Category", totalPrice:"Principal", months:"Months", interestRate:"Interest Rate (%) / Year", monthlyCalc:"Monthly Payment (Auto)", amount:"Amount", occurrenceType:"Occurrence", recurring:"Recurring", installment:"Installment", once:"One-time", save:"Save", deleteItem:"Delete Item", deleteSelected:"Delete Selected", simulator:"Simulator", scenarioDesc:"Simulate before deciding", simBuy:"Buy Installment", simPayoff:"Pay off Debt", simAdjust:"Adjust Budget", simPriceLabel:"Item Price (Principal)", trend6m:"Cash Flow Trend (6 Months)", beforeSim:"Before", afterSim:"After", currentBal:"Current Free Cash", afterSimBal:"After Installment", cancel:"Cancel", saveToReal:"Save to Planner", back:"Back", guestUser:"Guest User", notLoggedIn:"Not logged in", loginPrompt:"Sign up or log in to save your data permanently", darkMode:"Dark Mode", deductions:"Deductions (Optional)" } };
let currentLang = 'th';

const monthNamesTh = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthAbbrTh = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const monthAbbrEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthOrder = []; 
let currentMonthId = "";
const useBE = true;

function generateMonths() {
  let now = new Date();
  monthOrder = [];
  for(let i=0; i<6; i++) {
    let d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    let yAd = d.getFullYear();
    let yBe = yAd + 543;
    let id = `${yAd}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthOrder.push({ id, th: `${monthNamesTh[d.getMonth()]} ${yBe}`, en: `${monthNamesEn[d.getMonth()]} ${yAd}`, abbrTh: monthAbbrTh[d.getMonth()], abbrEn: monthAbbrEn[d.getMonth()] });
  }
  currentMonthId = monthOrder[0].id;
}
generateMonths();

let monthsData = {}; 
let isGuest = false;
setTimeout(() => { document.getElementById('splash').classList.add('hide'); }, 2000); 
let currentSheetType = 'expense', selectedCategory = '', selectedCategoryIcon = '🏠', currentOccurrence = 'recurring', isSelectMode = false, selectedItems = new Set(), currentScenarioType = 'buy', plannerMonthId = "", selectedScenarioMonthId = "";

// --- AUTH ---
function showOnboarding() { document.getElementById('screen-onboarding').style.display = 'flex'; document.getElementById('app').style.display = 'none'; }
async function handleAuth(type) { const email = document.getElementById('auth-email').value; const password = document.getElementById('auth-password').value; if(!email || !password) { alert('กรุณากรอกอีเมลและรหัสผ่าน'); return; } try { if(type === 'signup') { const { data, error } = await supabaseClient.auth.signUp({ email, password }); if (error) throw error; alert('สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...'); } else { const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password }); if (error) throw error; } checkAuthState(); } catch (error) { alert("เกิดข้อผิดพลาด: " + error.message); } }
async function handleLogout() { await supabaseClient.auth.signOut(); isGuest = false; document.getElementById('profile-name').innerText = i18n[currentLang].guestUser; document.getElementById('profile-email').innerText = i18n[currentLang].notLoggedIn; document.getElementById('btn-logout').style.display = 'none'; document.getElementById('login-prompt-box').style.display = 'block'; document.getElementById('profile-edit-group').style.display = 'none'; monthsData = {}; renderHome(); renderPlanner(); showOnboarding(); }
function continueAsGuest() { isGuest = true; monthsData = {}; document.getElementById('screen-onboarding').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.querySelector('.nav-btn').classList.add('active'); plannerMonthId = currentMonthId; applyLang(); renderHome(); renderPlanner(); }
async function checkAuthState() { const { data: { session } } = await supabaseClient.auth.getSession(); if (session) { isGuest = false; document.getElementById('screen-onboarding').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.querySelector('.nav-btn').classList.add('active'); plannerMonthId = currentMonthId; document.getElementById('profile-edit-group').style.display = 'block'; updateProfileUI(session.user); applyLang(); fetchTransactions(); } else { isGuest = false; document.getElementById('screen-onboarding').style.display = 'flex'; document.getElementById('app').style.display = 'none'; } }
checkAuthState();

function updateProfileUI(user) {
  const name = user.user_metadata?.name || user.email || "User";
  const avatar = user.user_metadata?.avatar_url;
  document.getElementById('profile-name').innerText = name;
  document.getElementById('profile-email').innerText = user.email;
  document.getElementById('btn-logout').style.display = 'block';
  document.getElementById('login-prompt-box').style.display = 'none';
  document.getElementById('profile-edit-name').value = name;
  document.getElementById('profile-edit-avatar').value = avatar || '';
  const avatarElem = document.getElementById('profile-avatar');
  if (avatar) { avatarElem.innerHTML = `<img src="${avatar}" style="width:100%; height:100%; border-radius:50%;">`; } else { avatarElem.innerText = name.charAt(0).toUpperCase(); }
}

async function saveProfile() {
  const name = document.getElementById('profile-edit-name').value;
  const avatar = document.getElementById('profile-edit-avatar').value;
  const { data, error } = await supabaseClient.auth.updateUser({ data: { name, avatar_url: avatar } });
  if (error) { alert("เกิดข้อผิดพลาด: " + error.message); return; }
  updateProfileUI(data.user);
  alert("บันทึกโปรไฟล์เรียบร้อยแล้ว");
}

// --- CATEGORIES ---
const categories = {
  income: [{name: 'เงินเดือน', icon: '💰', hint: ''}, {name: 'รายได้เสริม', icon: '💼', hint: 'เช่น ค่าสปอนเซอร์, ขายของ'}, {name: 'โบนัส', icon: '🎁', hint: 'เช่น โบนัสปีใหม่, ค่าคอมมิชชั่น'}],
  expense: [
    {name: 'ที่อยู่อาศัย', icon: '🏠', hint: 'เช่น ค่าเช่า, ค่าส่วนกลาง'}, {name: 'สาธารณูปโภค', icon: '💡', hint: 'เช่น ค่าไฟ, ค่าน้ำ, ค่าแก๊ส'}, {name: 'เน็ต&มือถือ', icon: '📶', hint: 'เช่น AIS, TrueMove, เน็ตบ้าน'}, {name: 'Subscription', icon: '📺', hint: 'เช่น Netflix, Spotify, iCloud'}, {name: 'อาหาร', icon: '🍔', hint: 'เช่น ข้าวกล่อง, กาแฟ, ซูเปอร์'},
    {name: 'เดินทาง', icon: '🚗', hint: 'เช่น ค่าน้ำมัน, ค่ารถไฟ, ค่า BTS'}, {name: 'สุขภาพ', icon: '💊', hint: 'เช่น ค่าประกัน, ค่าหมอ, ยา'}, {name: 'ของใช้', icon: '🧴', hint: 'เช่น น้ำยาล้างจาน, สบู่'}, {name: 'ช้อปปิ้ง', icon: '🛍️', hint: 'เช่น เสื้อผ้า, ของตกแต่ง'}, {name: 'อื่นๆ', icon: '📦', hint: 'รายจ่ายทั่วไปอื่นๆ'}
  ],
  debt: [{name: 'บัตรเครดิต', icon: '💳', hint: 'ใส่ยอดประมาณการณ์ก่อน แล้วค่อยมาแก้เป็นยอดจริงตอนบิลออก'}, {name: 'เงินสด', icon: '💵', hint: 'เช่น เงินกู้ญาติ, แบงก์'}, {name: 'สินเชื่อ', icon: '🏦', hint: 'เช่น สินเชื่อบุคคล, ผ่อนรถมอเตอร์ไซค์'}, {name: 'ผ่อน', icon: '🛒', hint: 'เช่น ผ่อน iPhone, ผ่อนเครื่องใช้ไฟฟ้า'}],
  savings: [{name: 'เงินเก็บฉุกเฉิน', icon: '🚨', hint: 'เก็บสำรองไว้ใช้ยามจำเป็น'}, {name: 'ลงทุน', icon: '📈', hint: 'เช่น หุ้น, กองทุนรวม'}, {name: 'เป้าหมาย', icon: '🎯', hint: 'เช่น เก็บเงินท่องเที่ยว'}]
};

// --- DB & LOGIC ---
async function fetchTransactions() {
  if (isGuest) return; 
  const { data: { session } } = await supabaseClient.auth.getSession();
  let query = supabaseClient.from('transactions').select('*');
  if (session) query = query.eq('user_id', session.user.id);
  else query = query.is('user_id', null);
  const { data, error } = await query;
  if (error) { console.error(error); return; }
  
  monthsData = {};
  monthOrder.forEach(m => monthsData[m.id] = []);

  data.forEach(item => {
    let startIdx = monthOrder.findIndex(m => m.id === (item.start_month || item.month_key));
    if (startIdx === -1) startIdx = 0;
    let endIdx = item.end_month ? monthOrder.findIndex(m => m.id === item.end_month) : 99;
    if (endIdx === -1) endIdx = 99;

    if (item.occurrence === 'recurring') {
      for (let i = startIdx; i <= endIdx && i < monthOrder.length; i++) {
        monthsData[monthOrder[i].id].push({ id: item.id + '_' + monthOrder[i].id, name: item.notes || item.category, amount: parseFloat(item.amount), type: item.type, occurrence: item.occurrence, category: item.category, icon: item.icon || '💰', total_debt: parseFloat(item.total_debt || 0), months: item.months || 0 });
      }
    } else if (item.occurrence === 'once') {
      if (monthsData[item.month_key]) monthsData[item.month_key].push({ id: item.id + '_' + item.month_key, name: item.notes || item.category, amount: parseFloat(item.amount), type: item.type, occurrence: item.occurrence, category: item.category, icon: item.icon || '💰', total_debt: parseFloat(item.total_debt || 0), months: 0 });
    } else if (item.occurrence === 'installment') {
      let totalMonths = item.months || 0;
      for (let i = 0; i < totalMonths; i++) {
        let targetIdx = startIdx + i;
        if (targetIdx <= endIdx && targetIdx < monthOrder.length) {
          let principal = parseFloat(item.total_debt || 0);
          let monthlyPay = parseFloat(item.amount);
          let remaining = principal - (monthlyPay * i); if (remaining < 0) remaining = 0;
          let remainingMonths = totalMonths - i;
          monthsData[monthOrder[targetIdx].id].push({ id: item.id + '_' + monthOrder[targetIdx].id, name: item.notes || item.category, amount: monthlyPay, type: item.type, occurrence: item.occurrence, category: item.category, icon: item.icon || '💳', total_debt: remaining, months: remainingMonths });
        }
      }
    }
  });
  renderHome(); renderPlanner();
}

function parseNumber(str) { if (!str) return 0; return parseInt(str.toString().replace(/[^0-9]/g, '')) || 0; }
function parseDecimal(str) { if (!str) return 0; return parseFloat(str.toString().replace(/[^0-9.]/g, '')) || 0; }

// Auto-Comma Format
function formatAmountInput(elem, callback) {
  let cursorPosition = elem.selectionStart;
  let originalLength = elem.value.length;
  let val = parseNumber(elem.value);
  let formattedVal = val > 0 ? val.toLocaleString() : '';
  elem.value = formattedVal;
  
  // คำนวณตำแหน่ง Cursor ใหม่
  let lengthDiff = formattedVal.length - originalLength;
  let newCursorPos = cursorPosition + lengthDiff;
  if (newCursorPos < 0) newCursorPos = 0;
  if (newCursorPos > formattedVal.length) newCursorPos = formattedVal.length;
  
  try { elem.setSelectionRange(newCursorPos, newCursorPos); } catch(e) {}
  
  if (typeof callback === 'function') {
    callback();
  }
}

function getTotals(monthId) { if (!monthsData[monthId]) return { in_: 0, out: 0, debt: 0, save: 0 }; let t = { in_: 0, out: 0, debt: 0, save: 0 }; monthsData[monthId].forEach(item => { if(item.type==='income') t.in_+=item.amount; else if(item.type==='expense') t.out+=item.amount; else if(item.type==='debt') t.debt+=item.amount; else if(item.type==='savings') t.save+=item.amount; }); return t; }
function getProjectedCash(i) { return getTotals(monthOrder[i].id).in_ - getTotals(monthOrder[i].id).out - getTotals(monthOrder[i].id).debt - getTotals(monthOrder[i].id).save; }

function applyLang() { document.querySelectorAll('[data-i18n]').forEach(elem => { const key = elem.getAttribute('data-i18n'); if (i18n[currentLang][key]) elem.innerText = i18n[currentLang][key]; }); document.getElementById('lang-btn').innerText = currentLang.toUpperCase(); if (document.getElementById('app').style.display !== 'none') { renderHome(); renderPlanner(); renderScenarioMonthChips(); } }
function toggleLang() { currentLang = currentLang === 'th' ? 'en' : 'th'; applyLang(); }

function renderHome() {
  const t = getTotals(currentMonthId);
  const freeCash = t.in_ - t.out - t.debt - t.save;
  const freeCashElem = document.getElementById('home-free-cash');
  const heroElem = document.querySelector('.hero');
  freeCashElem.innerHTML = freeCash.toLocaleString() + '<span>฿</span>';
  if (freeCash < 0) heroElem.classList.add('negative'); else heroElem.classList.remove('negative');

  const badge = document.getElementById('home-badge');
  if (freeCash < 0) { badge.className = 'badge red'; badge.innerText = currentLang==='th'?'ระวัง! กระแสเงินสดติดลบ':'Warning! Negative Cash Flow'; } 
  else if (freeCash < 5000) { badge.className = 'badge orange'; badge.innerText = currentLang==='th'?'เหลือน้อย ควรระวัง':'Low balance, be careful'; } 
  else { badge.className = 'badge green'; badge.innerText = i18n[currentLang].safe; }

  let score = 0;
  const emptyState = t.in_ === 0 && t.out === 0 && t.debt === 0 && t.save === 0;
  if (!emptyState) {
    if (freeCash > 0) score += 50; else if (freeCash === 0) score += 25;
    if (t.in_ > 0) { let saveRate = (t.save / t.in_) * 100; if (saveRate >= 10) score += 30; else if (saveRate > 0) score += 15; let debtRate = (t.debt / t.in_) * 100; if (debtRate <= 20) score += 20; else if (debtRate <= 40) score += 10; }
  }
  const barFg = document.getElementById('health-bar-fg');
  barFg.style.width = score + '%';
  document.getElementById('score-num').innerText = score + '/100';
  if (score >= 80) barFg.style.background = '#30D158'; else if (score >= 50) barFg.style.background = '#FF9F0A'; else barFg.style.background = '#FF453A';
  document.getElementById('health-empty-text').style.display = emptyState ? 'block' : 'none';

  // Line Chart 6 Months
  let points = []; let maxV = 0, minV = 0;
  for(let i=0; i<6; i++) { let val = getProjectedCash(i); points.push(val); if(val > maxV) maxV = val; if(val < minV) minV = val; }
  if (maxV === minV) { maxV += 1; minV -= 1; }
  let range = maxV - minV || 1;
  let pathD = ""; let areaD = ""; let overlayHtml = "";
  points.forEach((val, i) => {
      let x = (i / 5) * 100; 
      let y = 90 - ((val - minV) / range) * 80;
      if(i === 0) { pathD += `M${x},${y}`; areaD += `M${x},90 L${x},${y}`; } 
      else { pathD += ` L${x},${y}`; areaD += ` L${x},${y}`; }
      let color = val < 0 ? '#FF453A' : val < 5000 ? '#FF9F0A' : '#0A84FF';
      overlayHtml += `<div style="position:absolute; left:${x}%; top:${y}%; transform:translate(-50%, -50%); pointer-events:auto; cursor:pointer;" onclick="goToPlannerMonth(${i})">`;
      overlayHtml += `<div style="width:8px; height:8px; background:${color}; border-radius:50%; border: 1.5px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"></div>`;
      overlayHtml += `<div style="position:absolute; left:50%; top:-16px; transform:translateX(-50%); font-size:9px; font-weight:600; color:var(--text-secondary); white-space:nowrap;">${val.toLocaleString()}</div>`;
      overlayHtml += `</div>`;
  });
  areaD += ` L100,90 Z`;
  document.getElementById('home-line-chart').innerHTML = `<path d="${areaD}" class="line-area"/><path d="${pathD}" class="line-path"/>`;
  document.getElementById('home-chart-overlay').innerHTML = overlayHtml;
  let xLabelsHtml = monthOrder.slice(0, 6).map(m => `<span>${currentLang === 'th' ? m.abbrTh : m.abbrEn}</span>`).join('');
  if (document.getElementById('home-chart-xaxis')) document.getElementById('home-chart-xaxis').innerHTML = xLabelsHtml;

  // Waterfall Chart (Fixed Negative)
  let inc = t.in_, exp = t.out, debt = t.debt, save = t.save, bal = inc - exp - debt - save;
  let allVals = [inc, exp, debt, save, bal].filter(v => v !== 0);
  let maxBar = Math.max(...allVals, 0); let minBar = Math.min(...allVals, 0); let barRange = maxBar - minBar || 1;
  let zeroY = (maxBar / barRange) * 100;
  let y1 = zeroY - (inc / barRange) * 100; let h1 = Math.abs((inc / barRange) * 100);
  let y2 = zeroY - ((inc - exp) / barRange) * 100; let h2 = Math.abs((exp / barRange) * 100);
  let y3 = zeroY - ((inc - exp - debt) / barRange) * 100; let h3 = Math.abs((debt / barRange) * 100);
  let y4 = zeroY - ((inc - exp - debt - save) / barRange) * 100; let h4 = Math.abs((save / barRange) * 100);
  let y5 = Math.min(zeroY, zeroY - (bal / barRange) * 100); let h5 = Math.abs((bal / barRange) * 100);

  document.getElementById('waterfall-chart').innerHTML = `
    <rect x="0" y="${y1}" width="15" height="${h1}" fill="#30D158" class="wf-bar" rx="2"/>
    <line x1="15" y1="${y1}" x2="20" y2="${y1}" class="wf-line"/>
    <rect x="20" y="${y2}" width="15" height="${h2}" fill="#FF9F0A" class="wf-bar" rx="2"/>
    <line x1="35" y1="${y2}" x2="40" y2="${y2}" class="wf-line"/>
    <rect x="40" y="${y3}" width="15" height="${h3}" fill="#FF453A" class="wf-bar" rx="2"/>
    <line x1="55" y1="${y3}" x2="60" y2="${y3}" class="wf-line"/>
    <rect x="60" y="${y4}" width="15" height="${h4}" fill="#BF5AF2" class="wf-bar" rx="2"/>
    <line x1="75" y1="${y4}" x2="80" y2="${y4}" class="wf-line"/>
    <rect x="80" y="${y5}" width="15" height="${h5}" fill="#0A84FF" class="wf-bar" rx="2"/>
  `;
  document.getElementById('waterfall-labels').innerHTML = `<span style="color:#30D158">+${inc.toLocaleString()}</span><span style="color:#FF9F0A">-${exp.toLocaleString()}</span><span style="color:#FF453A">-${debt.toLocaleString()}</span><span style="color:#BF5AF2">-${save.toLocaleString()}</span><span style="color:#0A84FF">=${bal.toLocaleString()}</span>`;
}

function goToPlannerMonth(index) { switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); navigateMonthTo(index); }
function navigateMonthTo(index) { if (index >= 0 && index < monthOrder.length) { plannerMonthId = monthOrder[index].id; renderPlanner(); } }

function renderPlanner() {
  const mObj = monthOrder.find(m => m.id === plannerMonthId);
  document.getElementById('month-title').innerText = currentLang === 'th' ? mObj.th : mObj.en;
  const t = getTotals(plannerMonthId);
  document.getElementById('total-income').innerText = t.in_.toLocaleString() + ' ฿';
  document.getElementById('total-expense').innerText = t.out.toLocaleString() + ' ฿';
  document.getElementById('total-debt').innerText = t.debt.toLocaleString() + ' ฿';
  document.getElementById('total-save').innerText = t.save.toLocaleString() + ' ฿';
  const balance = t.in_ - t.out - t.debt - t.save; const balElem = document.getElementById('total-balance'); const sumCard = document.getElementById('summary-card');
  balElem.innerText = balance.toLocaleString() + ' ฿'; if (balance < 0) sumCard.classList.add('negative'); else sumCard.classList.remove('negative');
  if (t.in_ > 0) { document.getElementById('pct-expense').innerText = `(${((t.out/t.in_)*100).toFixed(1)}%)`; document.getElementById('pct-debt').innerText = `(${((t.debt/t.in_)*100).toFixed(1)}%)`; document.getElementById('pct-save').innerText = `(${((t.save/t.in_)*100).toFixed(1)}%)`; } else { document.getElementById('pct-expense').innerText=''; document.getElementById('pct-debt').innerText=''; document.getElementById('pct-save').innerText=''; }
  const data = monthsData[plannerMonthId] || []; let html = '';
  if (data.length === 0) html = `<div class="glass-card" style="padding: 32px 24px; text-align: center; margin-top: 24px;"><h3 style="font-size: 18px;">No Items</h3><p style="font-size: 14px; color: var(--text-muted);">Tap + to start planning</p></div>`;
  const types = [{key:'income',title:i18n[currentLang].income,class:'in'},{key:'expense',title:i18n[currentLang].expense,class:'out'},{key:'debt',title:i18n[currentLang].debt,class:'debt'},{key:'savings',title:i18n[currentLang].savings,class:'save'}];
  types.forEach(type => { const items = data.filter(item => item.type === type.key); if (items.length > 0) { html += `<div class="section-title">${type.title}</div>`; items.forEach(item => { let icon = item.icon || '💰'; let tagHtml = `<span class="tag ${item.occurrence}">${i18n[currentLang][item.occurrence]}</span>`; let subText = item.category || 'General'; if (item.total_debt > 0 && item.occurrence === 'installment') subText += ` | ${currentLang==='th'?'เหลือ':'Left'} ${item.total_debt.toLocaleString()} ฿ / ${item.months} ${currentLang==='th'?'งวด':'mo'}`; else if (item.total_debt > 0) subText += ` | ${currentLang==='th'?'เหลือ':'Left'} ${item.total_debt.toLocaleString()} ฿`; let checkboxHtml = isSelectMode ? `<div class="custom-checkbox ${selectedItems.has(item.id) ? 'checked' : ''}" onclick="event.stopPropagation(); toggleSelect('${item.id}')"></div>` : ''; html += `<div class="list-item" onclick="openSheetForEdit('${item.id}')">${checkboxHtml}<div class="list-left" style="${isSelectMode?'margin-left:8px;':''}"><div class="icon-circle">${icon}</div><div class="list-text"><p>${item.name} ${tagHtml}</p><span class="sub">${subText}</span></div></div><div class="amount ${type.class}">${type.key === 'income' ? '+' : '-'}${item.amount.toLocaleString()} ฿</div></div>`; }); } });
  document.getElementById('data-container').innerHTML = html;
}

function toggleSelectMode() { isSelectMode = !isSelectMode; selectedItems.clear(); document.getElementById('edit-btn').innerText = isSelectMode ? (currentLang==='th'?'เสร็จสิ้น':'Done') : i18n[currentLang].select; document.getElementById('edit-btn').classList.toggle('danger', isSelectMode); document.getElementById('fab-btn').style.display = isSelectMode ? 'none' : 'block'; document.getElementById('delete-bar').classList.toggle('active', isSelectMode); renderPlanner(); document.getElementById('select-count').innerText = '0'; }
function toggleSelect(id) { if (selectedItems.has(id)) selectedItems.delete(id); else selectedItems.add(id); renderPlanner(); document.getElementById('select-count').innerText = selectedItems.size; }
async function deleteSelected() { if (selectedItems.size === 0) return; if (isGuest) { selectedItems.forEach(fullId => { let baseId = fullId.split('_')[0]; Object.keys(monthsData).forEach(m => { monthsData[m] = monthsData[m].filter(i => !i.id.startsWith(baseId)); }); }); toggleSelectMode(); renderHome(); renderPlanner(); return; } const realIds = Array.from(selectedItems).map(id => id.split('_')[0]); await supabaseClient.from('transactions').delete().in('id', realIds); toggleSelectMode(); fetchTransactions(); }
async function deleteSingleItem() { const fullId = document.getElementById('editing-id').value; if (!fullId) return; if (isGuest) { let baseId = fullId.split('_')[0]; Object.keys(monthsData).forEach(m => { monthsData[m] = monthsData[m].filter(i => !i.id.startsWith(baseId)); }); closeSheet(); renderHome(); renderPlanner(); return; } const realId = fullId.split('_')[0]; await supabaseClient.from('transactions').delete().eq('id', realId); closeSheet(); fetchTransactions(); }
function switchScreen(screenName, event) { document.querySelectorAll('#app .screen').forEach(s => s.classList.remove('active')); document.getElementById('screen-' + screenName).classList.add('active'); document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')); document.getElementById('bottom-nav').style.display = (screenName === 'profile') ? 'none' : 'flex'; if(event && event.currentTarget && event.currentTarget.classList.contains('nav-btn')) event.currentTarget.classList.add('active'); else if (screenName === 'home') document.querySelector('.nav-btn').classList.add('active'); document.getElementById('app').style.backgroundColor = screenName === 'scenario' ? '#2d1b69' : 'var(--bg-color)'; if (screenName === 'home') renderHome(); if (screenName === 'planner') renderPlanner(); if (screenName === 'scenario') { populateSimulatorSelects(); renderScenarioMonthChips(); updateScenario(); } }
function navigateMonth(direction) { let index = monthOrder.findIndex(m => m.id === plannerMonthId); let newIndex = index + direction; if (newIndex >= 0 && newIndex < monthOrder.length) { plannerMonthId = monthOrder[newIndex].id; renderPlanner(); } }

// --- FORM LOGIC ---
function openSheetForAdd() { document.getElementById('editing-id').value=''; document.getElementById('form-amount').value=''; document.getElementById('form-total-debt').value=''; document.getElementById('form-months').value=''; document.getElementById('form-interest').value=''; document.getElementById('form-notes').value=''; document.getElementById('btn-delete').style.display='none'; document.getElementById('calc-result').classList.remove('show'); document.getElementById('net-income-val').innerText = '0 ฿'; document.getElementById('form-gross').value=''; document.getElementById('form-other-income').value=''; document.getElementById('form-tax').value=''; document.getElementById('form-ss').value=''; document.getElementById('form-pvd').value=''; document.getElementById('form-student-loan').value=''; switchSheetType('expense'); toggleSheet(true); }
function openSheetForEdit(itemId) { 
  if(isSelectMode) return; 
  const item = (monthsData[plannerMonthId]||[]).find(i => i.id === itemId); 
  if(!item) return; 
  document.getElementById('editing-id').value=item.id; 
  document.getElementById('form-amount').value=item.amount.toLocaleString(); 
  document.getElementById('form-total-debt').value=item.total_debt>0?item.total_debt.toLocaleString():''; 
  document.getElementById('form-notes').value = item.name === item.category ? '' : item.name;
  document.getElementById('form-months').value = item.months > 0 ? item.months : ''; 
  document.getElementById('form-interest').value = ''; 
  document.getElementById('btn-delete').style.display='block'; 
  setOccurrence(item.occurrence||'recurring'); 
  switchSheetType(item.type, item.category, item.icon); 
  toggleSheet(true); 
}
function switchSheetType(type, preselectCat=null, preselectIcon=null) {
  currentSheetType = type;
  document.querySelectorAll('.sheet-seg-btn').forEach(btn => { btn.classList.remove('active','income','expense','debt','savings'); if(btn.getAttribute('data-i18n')===type) btn.classList.add('active',type); });
  document.getElementById('notes-group').style.display = 'block';
  if (type === 'income') { document.getElementById('income-group').style.display = 'block'; document.getElementById('amount-group').style.display = 'none'; document.getElementById('installment-group').style.display = 'none'; document.getElementById('occurrence-group').style.display = 'block'; } 
  else if (type === 'debt') { document.getElementById('income-group').style.display = 'none'; document.getElementById('amount-group').style.display = 'none'; document.getElementById('installment-group').style.display = 'none'; document.getElementById('occurrence-group').style.display = 'none'; } 
  else { document.getElementById('income-group').style.display = 'none'; document.getElementById('amount-group').style.display = 'block'; document.getElementById('installment-group').style.display = 'none'; document.getElementById('occurrence-group').style.display = 'block'; }
  const cats = categories[type];
  let gridHtml = cats.map(c => `<div class="cat-btn" onclick="selectCategory(this, '${c.name}', '${c.icon}')"><span class="icon">${c.icon}</span><span class="label">${c.name}</span></div>`).join('');
  document.getElementById('category-grid-container').innerHTML = gridHtml;
  let targetCat = preselectCat || cats[0].name; let targetIcon = preselectIcon || cats[0].icon;
  let btns = document.querySelectorAll('.cat-btn');
  for (let i = 0; i < btns.length; i++) { if (btns[i].querySelector('.label').innerText === targetCat) { selectCategory(btns[i], targetCat, targetIcon); break; } }
}
function selectCategory(elem, catName, icon) {
  document.querySelectorAll('.cat-btn').forEach(c => c.classList.remove('active')); elem.classList.add('active'); selectedCategory = catName; selectedCategoryIcon = icon;
  let catData = categories[currentSheetType].find(c => c.name === catName);
  document.getElementById('form-notes').placeholder = catData && catData.hint ? catData.hint : 'รายละเอียดเพิ่มเติม';
  let hintElem = document.getElementById('cat-hint');
  if (catData && catData.hint) { hintElem.style.display = 'block'; hintElem.innerText = catData.hint; } else { hintElem.style.display = 'none'; }

  if (currentSheetType === 'income') {
    if (catName !== 'เงินเดือน') { 
      document.getElementById('income-group').style.display = 'none'; 
      document.getElementById('amount-group').style.display = 'block'; 
      document.getElementById('form-amount').value = ''; 
    } else { 
      document.getElementById('income-group').style.display = 'block'; 
      document.getElementById('amount-group').style.display = 'none'; 
    }
  }
  if (currentSheetType === 'debt') {
    if (catName === 'สินเชื่อ' || catName === 'ผ่อน') { 
      document.getElementById('installment-group').style.display = 'block'; 
      document.getElementById('amount-group').style.display = 'none'; 
      currentOccurrence = 'installment'; 
    } else { 
      document.getElementById('installment-group').style.display = 'none'; 
      document.getElementById('amount-group').style.display = 'block'; 
      document.getElementById('occurrence-group').style.display = 'block'; 
      setOccurrence('recurring'); 
    }
  }
}
function setOccurrence(type) { currentOccurrence = type; document.querySelectorAll('.toggle-card').forEach(c => c.classList.remove('active')); if (document.getElementById('tg-'+type)) document.getElementById('tg-'+type).classList.add('active'); }
function calcNetIncome() { const gross = parseNumber(document.getElementById('form-gross').value); const other = parseNumber(document.getElementById('form-other-income').value); const tax = parseNumber(document.getElementById('form-tax').value); const ss = parseNumber(document.getElementById('form-ss').value); const pvd = parseNumber(document.getElementById('form-pvd').value); const studentLoan = parseNumber(document.getElementById('form-student-loan').value); const net = gross + other - tax - ss - pvd - studentLoan; document.getElementById('net-income-val').innerText = net.toLocaleString() + ' ฿'; document.getElementById('form-amount').value = net.toLocaleString(); }
function calcInstallment() { const p = parseNumber(document.getElementById('form-total-debt').value); const n = parseInt(document.getElementById('form-months').value) || 0; const r = parseDecimal(document.getElementById('form-interest').value); if (p > 0 && n > 0) { let monthly = 0; if (r === 0) { monthly = p / n; } else { let i = (r / 100) / 12; monthly = p * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1); } let totalPay = monthly * n; let totalInterest = totalPay - p; document.getElementById('calc-monthly').innerHTML = `${Math.round(monthly).toLocaleString()} ฿ /เดือน<br><span style="font-size:12px; color:#636366; font-weight:400;">ดอกเบี้ยรวม: ${Math.round(totalInterest).toLocaleString()} ฿</span>`; document.getElementById('form-amount').value = Math.round(monthly).toLocaleString(); document.getElementById('calc-result').classList.add('show'); } else { document.getElementById('calc-result').classList.remove('show'); } }
async function saveItem() {
  const fullId = document.getElementById('editing-id').value; const realId = fullId ? fullId.split('_')[0] : null; const notes = document.getElementById('form-notes').value.trim(); const amount = parseNumber(document.getElementById('form-amount').value); const totalDebt = parseNumber(document.getElementById('form-total-debt').value); const months = parseInt(document.getElementById('form-months').value) || 0;
  if(amount <= 0){alert('กรุณาใส่ยอดเงินให้ถูกต้อง');return;}
  const saveBtn = document.querySelector('.btn-primary'); saveBtn.innerText = 'กำลังบันทึก...'; saveBtn.style.opacity = '0.5'; saveBtn.style.pointerEvents = 'none';
  let targetMonthId = plannerMonthId;
  if (isGuest) {
    if (realId) { Object.keys(monthsData).forEach(m => { monthsData[m] = monthsData[m].filter(i => !i.id.startsWith(realId)); }); }
    const newId = 'guest' + Date.now();
    if (currentOccurrence === 'recurring') { let startIdx = monthOrder.findIndex(m => m.id === targetMonthId); for (let i = startIdx; i < monthOrder.length; i++) { if (!monthsData[monthOrder[i].id]) monthsData[monthOrder[i].id] = []; monthsData[monthOrder[i].id].push({ id: newId + '_' + monthOrder[i].id, name: notes || selectedCategory, amount, type: currentSheetType, category: selectedCategory, icon: selectedCategoryIcon, total_debt: totalDebt, occurrence: currentOccurrence, months: 0 }); } } else if (currentOccurrence === 'installment') { let startIdx = monthOrder.findIndex(m => m.id === targetMonthId); for (let i = 0; i < months; i++) { let tIdx = startIdx + i; if (tIdx < monthOrder.length) { if (!monthsData[monthOrder[tIdx].id]) monthsData[monthOrder[tIdx].id] = []; let remaining = totalDebt - (amount * i); if (remaining < 0) remaining = 0; let remMonths = months - i; monthsData[monthOrder[tIdx].id].push({ id: newId + '_' + monthOrder[tIdx].id, name: notes || selectedCategory, amount, type: currentSheetType, category: selectedCategory, icon: selectedCategoryIcon, total_debt: remaining, occurrence: currentOccurrence, months: remMonths }); } } } else { if (!monthsData[targetMonthId]) monthsData[targetMonthId] = []; monthsData[targetMonthId].push({ id: newId + '_' + targetMonthId, name: notes || selectedCategory, amount, type: currentSheetType, category: selectedCategory, icon: selectedCategoryIcon, total_debt: totalDebt, occurrence: currentOccurrence, months: 0 }); }
    toggleSheet(false); renderHome(); renderPlanner();
    saveBtn.innerText = i18n[currentLang].save; saveBtn.style.opacity = '1'; saveBtn.style.pointerEvents = 'auto';
    return;
  }
  try { const { data: { session } } = await supabaseClient.auth.getSession(); const payload = { month_key: targetMonthId, name: notes || selectedCategory, notes: notes, amount, type: currentSheetType, category: selectedCategory, icon: selectedCategoryIcon, occurrence: currentOccurrence, total_debt: totalDebt, user_id: session?.user?.id || null, start_month: targetMonthId, months: currentOccurrence === 'installment' ? months : null };
  if(realId) { const { error } = await supabaseClient.from('transactions').update(payload).eq('id', realId); if(error) throw error; } else { const { error } = await supabaseClient.from('transactions').insert(payload); if(error) throw error; }
  toggleSheet(false); fetchTransactions(); } catch (error) { alert("เกิดข้อผิดพลาดในการบันทึก: " + error.message); } finally { saveBtn.innerText = i18n[currentLang].save; saveBtn.style.opacity = '1'; saveBtn.style.pointerEvents = 'auto'; }
}
function toggleSheet(show) { document.getElementById('sheet').classList.toggle('active',show); document.getElementById('overlay').classList.toggle('active',show); }
function closeSheet() { toggleSheet(false); }

// --- SIMULATOR LOGIC ---
function populateSimulatorSelects() {
  let debts = (monthsData[currentMonthId] || []).filter(i => i.type === 'debt');
  let expenses = (monthsData[currentMonthId] || []).filter(i => i.type === 'expense');
  document.getElementById('sc-payoff-select').innerHTML = debts.length > 0 ? debts.map(d => `<option value="${d.id}|${d.amount}">${d.name} (${d.amount} ฿/เดือน)</option>`).join('') : '<option value="">ยังไม่มีรายการหนี้สิน</option>';
  document.getElementById('sc-adjust-select').innerHTML = expenses.length > 0 ? expenses.map(e => `<option value="${e.id}|${e.amount}">${e.name} (${e.amount} ฿/เดือน)</option>`).join('') : '<option value="">ยังไม่มีรายจ่าย</option>';
}
function formatPriceInput(elem) { let val = parseNumber(elem.value); elem.value = val > 0 ? val.toLocaleString() : ''; updateScenario(); }
function switchScenarioType(type) { 
  currentScenarioType=type; document.querySelectorAll('.sc-chip').forEach(c=>c.classList.remove('active')); event.currentTarget.classList.add('active'); 
  document.getElementById('sc-buy-ui').style.display = type === 'buy' ? 'block' : 'none';
  document.getElementById('sc-payoff-ui').style.display = type === 'payoff' ? 'block' : 'none';
  document.getElementById('sc-adjust-ui').style.display = type === 'adjust' ? 'block' : 'none';
  document.getElementById('sc-start-month-ui').style.display = type === 'buy' ? 'block' : 'none';
  const nl=document.getElementById('sc-new-label'); 
  if(type==='buy') nl.innerText = i18n[currentLang].afterSimBal; else if(type==='payoff') nl.innerText = "เงินอิสระเพิ่มขึ้น"; else nl.innerText = "เงินอิสระเปลี่ยนแปลง"; 
  updateScenario(); 
}
function renderScenarioMonthChips() { const container = document.getElementById('sc-month-chips'); if(!container) return; container.innerHTML = monthOrder.map(m => { let name = currentLang === 'th' ? m.abbrTh + ' ' + m.th.split(' ')[1].substring(2) : m.abbrEn + ' ' + m.en.split(' ')[1].substring(2); let active = m.id === selectedScenarioMonthId ? 'active' : ''; return `<div class="month-chip ${active}" onclick="selectScenarioMonth('${m.id}')">${name}</div>`; }).join(''); }
function selectScenarioMonth(id) { selectedScenarioMonthId = id; renderScenarioMonthChips(); updateScenario(); }
function updateScenario() { 
  const cBal=getTotals(currentMonthId).in_-getTotals(currentMonthId).out-getTotals(currentMonthId).debt-getTotals(currentMonthId).save; 
  document.getElementById('sc-current-bal').innerText=cBal.toLocaleString()+' ฿'; 
  let mImp=0, bD=[], aD=[]; for(let i=0;i<6;i++){ let bB=getProjectedCash(i); bD.push(bB); } 
  
  if(currentScenarioType==='buy'){ 
    const price=parseNumber(document.getElementById('sc-price').value); const months=parseInt(document.getElementById('sc-months').value)||0; const interest=parseDecimal(document.getElementById('sc-interest').value); 
    if(interest===0) mImp=price/months; else { let i_r=(interest/100)/12; mImp=(price*i_r*Math.pow(1+i_r,months))/(Math.pow(1+i_r,months)-1); } 
    let startIdx = monthOrder.findIndex(m => m.id === selectedScenarioMonthId); if (startIdx === -1) startIdx = 0; 
    for(let i=0;i<6;i++){ if(i >= startIdx) aD.push(bD[i]-mImp); else aD.push(bD[i]); } 
  } else if(currentScenarioType==='payoff'){ 
    let selectVal = document.getElementById('sc-payoff-select').value; 
    mImp = selectVal ? parseFloat(selectVal.split('|')[1]) : 0; 
    for(let i=0;i<6;i++) aD.push(bD[i]+mImp); 
  } else { 
    let selectVal = document.getElementById('sc-adjust-select').value; 
    let oldAmt = selectVal ? parseFloat(selectVal.split('|')[1]) : 0; 
    let newAmt = parseNumber(document.getElementById('sc-adjust-amount').value); 
    mImp = oldAmt - newAmt; 
    for(let i=0;i<6;i++) aD.push(bD[i]+mImp); 
  }
  
  let allV=[...bD,...aD]; let minV=Math.min(...allV); let maxV=Math.max(...allV); let range=maxV-minV||1; 
  let pB="M0,"+(90-((bD[0]-minV)/range)*80); let pA="M0,"+(90-((aD[0]-minV)/range)*80); let lH=""; 
  for(let i=0;i<6;i++){ let x=(i/5)*100; let yB=90-((bD[i]-minV)/range)*80; let yA=90-((aD[i]-minV)/range)*80; if(i>0){pB+=` L${x},${yB}`;pA+=` L${x},${yA}`;} lH+=`<div class="chart-label-overlay" style="left:${x}%; top:${yA}%;">${Math.round(aD[i]).toLocaleString()}</div>`; } 
  document.getElementById('chart-lines').innerHTML=`<path d="${pB}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4" vector-effect="non-scaling-stroke"/><path d="${pA}" fill="none" stroke="#ffffff" stroke-width="3" vector-effect="non-scaling-stroke"/>`; 
  document.getElementById('chart-labels-overlay').innerHTML=lH; 
  const nBal = currentScenarioType === 'buy' ? cBal - mImp : cBal + mImp; const nE=document.getElementById('sc-new-bal'); nE.innerText=Math.round(nBal).toLocaleString()+' ฿'; if(nBal<0)nE.style.color='#FF453A'; else if(nBal<2000)nE.style.color='#FF9F0A'; else nE.style.color='#30D158'; 
}
function showPreview() {
  let previewHtml = `<input type="text" id="preview-name" class="input-field" value="ผ่อนของ (Simulator)" style="margin-bottom:12px;">`;
  if(currentScenarioType==='buy'){ 
    const price=parseNumber(document.getElementById('sc-price').value); const months=parseInt(document.getElementById('sc-months').value); const interest=parseDecimal(document.getElementById('sc-interest').value); 
    let monthly=0, totalInterest=0; if(interest===0) monthly=price/months; else { let i=(interest/100)/12; monthly=price*i*Math.pow(1+i,months)/(Math.pow(1+i,months)-1); totalInterest=(monthly*months)-price; } 
    const mObj = monthOrder.find(m => m.id === selectedScenarioMonthId); const startMonthName = currentLang === 'th' ? mObj.th : mObj.en; 
    previewHtml += `<p><strong>ยอดผ่อนต่อเดือน:</strong> ${Math.round(monthly).toLocaleString()} ฿</p><p><strong>จำนวนงวด:</strong> ${months} เดือน</p><p><strong>เงินต้นทั้งหมด:</strong> ${price.toLocaleString()} ฿</p><p><strong>ดอกเบี้ยรวม:</strong> ${Math.round(totalInterest).toLocaleString()} ฿</p><p style="margin-top:12px; color:#636366; font-size:14px;">เริ่มหักยอดเงินต้นในเดือน <strong>${startMonthName}</strong> จนครบ ${months} งวด</p>`; 
  } else if(currentScenarioType==='payoff'){ 
    let selectVal = document.getElementById('sc-payoff-select').value; let name = selectVal ? document.getElementById('sc-payoff-select').selectedOptions[0].text.split(' (')[0] : 'ปิดหนี้'; document.getElementById('preview-name').value = `ปิดหนี้: ${name}`; 
    previewHtml += `<p style="color:#636366; font-size:14px;">รายการหนี้นี้จะถูกปิด และจะไม่ถูกหักออกในเดือนถัดไป ทำให้เงินอิสระของคุณเพิ่มขึ้น</p>`; 
  } else { 
    let selectVal = document.getElementById('sc-adjust-select').value; let name = selectVal ? document.getElementById('sc-adjust-select').selectedOptions[0].text.split(' (')[0] : 'ปรับงบ'; document.getElementById('preview-name').value = `ปรับงบ: ${name}`; 
    let oldAmt = selectVal ? parseFloat(selectVal.split('|')[1]) : 0; let newAmt = parseNumber(document.getElementById('sc-adjust-amount').value); 
    previewHtml += `<p><strong>ยอดเดิม:</strong> ${oldAmt.toLocaleString()} ฿</p><p><strong>ยอดใหม่:</strong> ${newAmt.toLocaleString()} ฿</p><p style="margin-top:12px; color:#636366; font-size:14px;">เงินอิสระของคุณจะเปลี่ยนแปลงไปทุกเดือนถัดไป</p>`; 
  }
  document.getElementById('preview-content').innerHTML = previewHtml;
  document.getElementById('preview-overlay').classList.add('active'); document.getElementById('preview-sheet').classList.add('active');
}
function closePreview() { document.getElementById('preview-overlay').classList.remove('active'); document.getElementById('preview-sheet').classList.remove('active'); }
async function confirmScenario() { 
  closePreview();
  const customName = document.getElementById('preview-name').value || 'ผ่อนของ (Simulator)';
  let payload = { name: customName, notes: customName, icon: '🛒', occurrence: 'recurring', month_key: selectedScenarioMonthId, start_month: selectedScenarioMonthId, category: 'Simulator' };

  if(currentScenarioType==='buy'){ 
    const price=parseNumber(document.getElementById('sc-price').value); const months=parseInt(document.getElementById('sc-months').value); const interest=parseDecimal(document.getElementById('sc-interest').value); 
    let i=(interest/100)/12; let m=interest===0?price/months:(price*i*Math.pow(1+i,months))/(Math.pow(1+i,months)-1); 
    payload.amount = Math.round(m); payload.total_debt = price; payload.type = 'debt'; payload.occurrence = 'installment'; payload.category = 'ผ่อน'; payload.icon = '🛒'; payload.months = months; 
  } else if(currentScenarioType==='payoff'){ 
    let selectVal = document.getElementById('sc-payoff-select').value; let oldId = selectVal ? selectVal.split('|')[0] : null; let oldAmt = selectVal ? parseFloat(selectVal.split('|')[1]) : 0; 
    if (isGuest) {
      Object.keys(monthsData).forEach(m => { monthsData[m].forEach(item => { if (item.id.startsWith(oldId.split('_')[0])) { item.occurrence = 'once'; } }); });
    } else {
      await supabaseClient.from('transactions').update({ end_month: currentMonthId }).eq('id', oldId.split('_')[0]);
    }
    switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); fetchTransactions(); return;
  } else { 
    let selectVal = document.getElementById('sc-adjust-select').value; let oldId = selectVal ? selectVal.split('|')[0] : null; let oldAmt = selectVal ? parseFloat(selectVal.split('|')[1]) : 0; let newAmt = parseNumber(document.getElementById('sc-adjust-amount').value); 
    if (isGuest) {
      Object.keys(monthsData).forEach(m => { monthsData[m].forEach(item => { if (item.id.startsWith(oldId.split('_')[0])) { item.amount = newAmt; } }); });
    } else {
      await supabaseClient.from('transactions').update({ amount: newAmt }).eq('id', oldId.split('_')[0]);
    }
    switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); fetchTransactions(); return;
  }

  if (isGuest) { 
    const newId = 'guest' + Date.now(); let startIdx = monthOrder.findIndex(m => m.id === selectedScenarioMonthId); 
    for (let i = startIdx; i < monthOrder.length; i++) { if (!monthsData[monthOrder[i].id]) monthsData[monthOrder[i].id] = []; monthsData[monthOrder[i].id].push({ id: newId + '_' + monthOrder[i].id, name: payload.name, amount: payload.amount, type: payload.type, category: payload.category, icon: payload.icon, total_debt: payload.total_debt || 0, occurrence: payload.occurrence, months: payload.months || 0 }); } 
    switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); renderHome(); renderPlanner(); return; 
  }
  try { const { data: { session } } = await supabaseClient.auth.getSession(); payload.user_id = session?.user?.id || null; await supabaseClient.from('transactions').insert(payload); switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] }); fetchTransactions(); } catch(e) { alert('Error: ' + e.message); } 
}
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); const isD=document.body.classList.contains('dark-mode'); document.getElementById('dark-mode-toggle').style.background=isD?'#30D158':'#d1d1d6'; document.getElementById('dark-knob').style.transform=isD?'translateX(20px)':'translateX(0)'; }

// Init
selectedScenarioMonthId = currentMonthId;
