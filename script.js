const i18n = {
  th: {
    overview: "ภาพรวม", freeCash: "เงินอิสระที่ใช้ได้จริง", safe: "สบายๆ ยังพอผ่อนของได้", healthScore: "สุขภาพการเงิน",
    crit1: "50 คะแนน: กระแสเงินสดเป็นบวก", crit2: "30 คะแนน: ออม ≥ 10% ของรายได้", crit3: "20 คะแนน: หนี้สิน ≤ 20% ของรายได้", criteriaTitle: "เกณฑ์การให้คะแนน",
    cashFlow4m: "กระแสเงินสดล่วงหน้า 4 เดือน", select: "เลือก", incTotal: "รายรับรวม", expTotal: "รายจ่ายคงที่", debtTotal: "หนี้สิน/ผ่อน", saveTotal: "เงินเก็บ/ลงทุน", freeCashTotal: "เงินอิสระที่ใช้ได้จริง",
    income: "รายรับ", expense: "รายจ่าย", debt: "หนี้สิน", savings: "เงินเก็บ", itemName: "ชื่อรายการ", catBank: "หมวดหมู่ / ธนาคาร", totalPrice: "ยอดสินค้ารวม", months: "เดือน", interestRate: "ดอกเบี้ย (%) ต่อปี", monthlyCalc: "ยอดผ่อนต่อเดือน (คำนวณอัตโนมัติ)",
    amount: "ยอดเงิน", occurrenceType: "ประเภทการเกิดขึ้น", recurring: "ทุกเดือน", installment: "ผ่อนสินค้า", once: "ครั้งเดียว", save: "บันทึก", deleteItem: "ลบรายการนี้", deleteSelected: "ลบรายการที่เลือก",
    scenario: "Scenario", scenarioDesc: "จำลองสถานการณ์ก่อนตัดสินใจ", simBuy: "ซื้อของผ่อน", simPayoff: "ปิดหนี้ก้อนนี้", simAdjust: "ปรับงบประมาณ", simPriceLabel: "ราคาของที่จะผ่อน", trend4m: "เทียบกระแสเงินสด 4 เดือนข้างหน้า",
    beforeSim: "ก่อนผ่อน", afterSim: "หลังผ่อน", currentBal: "เงินอิสระปัจจุบัน", afterSimBal: "หลังผ่อนของ (ต่อเดือน)", cancel: "ยกเลิก", saveToReal: "บันทึกเป็นจริง", home: "Home", planner: "Planner",
    back: "ย้อนกลับ", guestUser: "ผู้ใช้ทั่วไป", notLoggedIn: "ยังไม่ได้เข้าสู่ระบบ", loginPrompt: "เข้าสู่ระบบเพื่อซิงค์ข้อมูลการวางแผนการเงินของคุณ", darkMode: "โหมดมืด (Dark Mode)", splashSlogan: "วางแผนล่วงหน้า ตัดสินใจอย่างมั่นใจ"
  },
  en: {
    overview: "Overview", freeCash: "True Free Cash Flow", safe: "Safe to spend", healthScore: "Financial Health",
    crit1: "50 pts: Positive Cash Flow", crit2: "30 pts: Save ≥ 10% of Income", crit3: "20 pts: Debt ≤ 20% of Income", criteriaTitle: "Scoring Criteria",
    cashFlow4m: "Cash Flow Forecast (4 Months)", select: "Select", incTotal: "Total Income", expTotal: "Fixed Expenses", debtTotal: "Debt/Installment", saveTotal: "Savings/Invest", freeCashTotal: "True Free Cash Flow",
    income: "Income", expense: "Expense", debt: "Debt", savings: "Savings", itemName: "Item Name", catBank: "Category / Bank", totalPrice: "Total Price", months: "Months", interestRate: "Interest Rate (%) / Year", monthlyCalc: "Monthly Payment (Auto-Calculated)",
    amount: "Amount", occurrenceType: "Occurrence", recurring: "Recurring", installment: "Installment", once: "One-time", save: "Save", deleteItem: "Delete Item", deleteSelected: "Delete Selected",
    scenario: "Scenario", scenarioDesc: "Simulate before deciding", simBuy: "Buy Installment", simPayoff: "Pay off Debt", simAdjust: "Adjust Budget", simPriceLabel: "Item Price", trend4m: "Cash Flow Trend (4 Months)",
    beforeSim: "Before", afterSim: "After", currentBal: "Current Free Cash", afterSimBal: "After Installment (Monthly)", cancel: "Cancel", saveToReal: "Save to Planner", home: "Home", planner: "Planner",
    back: "Back", guestUser: "Guest User", notLoggedIn: "Not logged in", loginPrompt: "Sign in to sync your financial plans", darkMode: "Dark Mode", splashSlogan: "Plan ahead, decide with confidence"
  }
};
let currentLang = 'th';

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (i18n[currentLang][key]) elem.innerText = i18n[currentLang][key];
  });
  document.getElementById('lang-btn').innerText = currentLang.toUpperCase();
  renderHome();
  renderPlanner();
}

function toggleLang() {
  currentLang = currentLang === 'th' ? 'en' : 'th';
  applyLang();
}

const monthNamesTh = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthOrder = [];
let currentMonth = "";
const useBE = true;

function generateMonths() {
  let now = new Date();
  for(let i=0; i<12; i++) {
    let d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    let year = useBE ? d.getFullYear() + 543 : d.getFullYear();
    let mName = currentLang === 'th' ? monthNamesTh[d.getMonth()] : monthNamesEn[d.getMonth()];
    monthOrder.push(`${mName} ${year}`);
  }
  currentMonth = monthOrder[0];
}
generateMonths();

let monthsData = {
  [currentMonth]: [
    { id: '1', name: 'เงินเดือน', amount: 30000, type: 'in', occurrence: 'recurring', cat: 'เงินเดือน', totalDebt: 0 },
    { id: '2', name: 'ค่าเช่า', amount: 8000, type: 'out', occurrence: 'recurring', cat: 'ที่อยู่อาศัย', totalDebt: 0 },
    { id: '3', name: 'บัตร KTC', amount: 8500, type: 'debt', occurrence: 'recurring', cat: 'KTC', totalDebt: 50000 },
    { id: '4', name: 'ผ่อนมือถือ', amount: 2500, type: 'debt', occurrence: 'installment', cat: 'ผ่อนของ', totalDebt: 20000 }
  ]
};

let currentSheetType = 'income';
let selectedCategory = '';
let currentOccurrence = 'recurring';
let isSelectMode = false;
let selectedItems = new Set();
let currentScenarioType = 'buy';
let plannerMonth = currentMonth;

setTimeout(() => { document.getElementById('splash').classList.add('hide'); }, 2000);

function getFreeCashFlow(month) {
  if (!monthsData[month]) return 0;
  let in_ = 0, out = 0, debt = 0, save = 0;
  monthsData[month].forEach(item => {
    if (item.type === 'in') in_ += item.amount;
    else if (item.type === 'out') out += item.amount;
    else if (item.type === 'debt') debt += item.amount;
    else if (item.type === 'save') save += item.amount;
  });
  return in_ - out - debt - save;
}

function getTotals(month) {
  if (!monthsData[month]) return { in_: 0, out: 0, debt: 0, save: 0 };
  let in_ = 0, out = 0, debt = 0, save = 0;
  monthsData[month].forEach(item => {
    if (item.type === 'in') in_ += item.amount;
    else if (item.type === 'out') out += item.amount;
    else if (item.type === 'debt') debt += item.amount;
    else if (item.type === 'save') save += item.amount;
  });
  return { in_, out, debt, save };
}

function getProjectedCash(monthIndex) {
  let baseData = monthsData[currentMonth] || [];
  let projected = baseData.filter(i => i.occurrence === 'recurring' || i.occurrence === 'installment');
  let in_ = 0, out = 0, debt = 0, save = 0;
  projected.forEach(item => {
    if (item.type === 'in') in_ += item.amount;
    else if (item.type === 'out') out += item.amount;
    else if (item.type === 'debt') debt += item.amount;
    else if (item.type === 'save') save += item.amount;
  });
  return in_ - out - debt - save;
}

function parseNumber(str) {
  if (!str) return 0;
  return parseInt(str.toString().replace(/[^0-9]/g, '')) || 0;
}

function renderHome() {
  const t = getTotals(currentMonth);
  const freeCash = t.in_ - t.out - t.debt - t.save;
  
  document.getElementById('home-free-cash').innerHTML = freeCash.toLocaleString() + '<span>฿</span>';
  const badge = document.getElementById('home-badge');
  if (freeCash < 0) { badge.className = 'badge red'; badge.innerText = i18n[currentLang].safe === 'Safe to spend' ? 'Warning! Negative Cash Flow' : 'ระวัง! กระแสเงินสดติดลบ'; } 
  else if (freeCash < 5000) { badge.className = 'badge orange'; badge.innerText = i18n[currentLang].safe === 'Safe to spend' ? 'Low balance, be careful' : 'เหลือน้อย ควรระวังการใช้จ่าย'; } 
  else { badge.className = 'badge green'; badge.innerText = i18n[currentLang].safe; }

  let score = 0;
  if (freeCash > 0) score += 50; else if (freeCash === 0) score += 25;
  if (t.in_ > 0) {
    let saveRate = (t.save / t.in_) * 100;
    if (saveRate >= 10) score += 30; else if (saveRate > 0) score += 15;
    let debtRate = (t.debt / t.in_) * 100;
    if (debtRate <= 20) score += 20; else if (debtRate <= 40) score += 10;
  }

  const circle = document.getElementById('ring-fg');
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  
  if (score >= 80) circle.style.stroke = '#30D158';
  else if (score >= 50) circle.style.stroke = '#FF9F0A';
  else circle.style.stroke = '#FF453A';

  let currentScore = 0;
  const scoreElem = document.getElementById('score-num');
  const interval = setInterval(() => {
    if (currentScore >= score) { currentScore = score; clearInterval(interval); }
    else { currentScore++; }
    scoreElem.innerText = currentScore;
  }, 20);

  let chartHtml = '';
  for(let i=0; i<4; i++) {
    let val = getProjectedCash(i);
    let height = Math.max(5, Math.min(100, (val / 20000) * 100));
    if(val < 0) height = 5;
    let shortName = monthOrder[i].split(" ")[0].substring(0, 3);
    chartHtml += `<div class="bar-group"><div class="bar" style="height: ${height}%; background: ${val < 0 ? '#FF453A' : '#0A84FF'};"><span>${val.toLocaleString()}</span></div><div class="bar-label">${shortName}</div></div>`;
  }
  document.getElementById('home-chart').innerHTML = chartHtml;
}

function renderPlanner() {
  document.getElementById('month-title').innerText = plannerMonth;
  const container = document.getElementById('data-container');
  const t = getTotals(plannerMonth);
  
  document.getElementById('total-income').innerText = t.in_.toLocaleString() + ' ฿';
  document.getElementById('total-expense').innerText = t.out.toLocaleString() + ' ฿';
  document.getElementById('total-debt').innerText = t.debt.toLocaleString() + ' ฿';
  document.getElementById('total-save').innerText = t.save.toLocaleString() + ' ฿';
  document.getElementById('total-balance').innerText = (t.in_ - t.out - t.debt - t.save).toLocaleString() + ' ฿';

  if (t.in_ > 0) {
    document.getElementById('pct-expense').innerText = `(${((t.out/t.in_)*100).toFixed(1)}%)`;
    document.getElementById('pct-debt').innerText = `(${((t.debt/t.in_)*100).toFixed(1)}%)`;
    document.getElementById('pct-save').innerText = `(${((t.save/t.in_)*100).toFixed(1)}%)`;
  } else {
    document.getElementById('pct-expense').innerText = '';
    document.getElementById('pct-debt').innerText = '';
    document.getElementById('pct-save').innerText = '';
  }
  
  if (!monthsData[plannerMonth] || monthsData[plannerMonth].length === 0) {
    container.innerHTML = `<div class="glass-card" style="padding: 32px 24px; text-align: center; margin-top: 24px;"><h3 style="font-size: 18px;">No Items</h3><p style="font-size: 14px; color: var(--text-muted);">Tap + to start planning</p></div>`;
    return;
  }

  const data = monthsData[plannerMonth];
  let html = '';
  const types = [
    { key: 'in', title: i18n[currentLang].income, class: 'in' }, 
    { key: 'out', title: i18n[currentLang].expense, class: 'out' },
    { key: 'debt', title: i18n[currentLang].debt, class: 'debt' }, 
    { key: 'save', title: i18n[currentLang].savings, class: 'save' }
  ];

  types.forEach(type => {
    const items = data.filter(item => item.type === type.key);
    if (items.length > 0) {
      html += `<div class="section-title">${type.title}</div>`;
      items.forEach(item => {
        let icon = type.key === 'in' ? '💰' : type.key === 'out' ? '🏠' : type.key === 'debt' ? '💳' : '🐷';
        let tagHtml = item.occurrence === 'recurring' ? `<span class="tag recurring">${i18n[currentLang].recurring}</span>` : item.occurrence === 'installment' ? `<span class="tag installment">${i18n[currentLang].installment}</span>` : `<span class="tag once">${i18n[currentLang].once}</span>`;
        let subText = item.cat || 'General';
        if (item.totalDebt > 0) subText += ` | ${i18n[currentLang].beforeSim === 'Before' ? 'Left' : 'เหลือ'} ${item.totalDebt.toLocaleString()} ฿`;

        let clickAction = isSelectMode ? `toggleSelect('${item.id}')` : `openSheetForEdit('${item.id}')`;
        let checkboxHtml = isSelectMode ? `<div class="custom-checkbox ${selectedItems.has(item.id) ? 'checked' : ''}" onclick="event.stopPropagation(); toggleSelect('${item.id}')"></div>` : '';

        html += `
          <div class="list-item" onclick="${clickAction}">
            ${checkboxHtml}
            <div class="list-left" style="${isSelectMode ? 'margin-left: 8px;' : ''}">
              <div class="icon-circle">${icon}</div>
              <div class="list-text">
                <p>${item.name} ${tagHtml}</p>
                <span class="sub">${subText}</span>
              </div>
            </div>
            <div class="amount ${type.class}">${type.key === 'in' ? '+' : '-'}${item.amount.toLocaleString()} ฿</div>
          </div>
        `;
      });
    }
  });
  container.innerHTML = html;
}

function toggleSelectMode() {
  isSelectMode = !isSelectMode;
  selectedItems.clear();
  document.getElementById('edit-btn').innerText = isSelectMode ? (currentLang === 'th' ? 'เสร็จสิ้น' : 'Done') : i18n[currentLang].select;
  document.getElementById('edit-btn').classList.toggle('danger', isSelectMode);
  document.getElementById('fab-btn').style.display = isSelectMode ? 'none' : 'block';
  document.getElementById('delete-bar').classList.toggle('active', isSelectMode);
  renderPlanner();
  updateSelectCount();
}

function toggleSelect(id) {
  if (selectedItems.has(id)) selectedItems.delete(id);
  else selectedItems.add(id);
  renderPlanner();
  updateSelectCount();
}

function updateSelectCount() { document.getElementById('select-count').innerText = selectedItems.size; }

function deleteSelected() {
  if (selectedItems.size === 0) return;
  monthsData[plannerMonth] = monthsData[plannerMonth].filter(i => !selectedItems.has(i.id));
  toggleSelectMode();
}

function deleteSingleItem() {
  const id = document.getElementById('editing-id').value;
  if (!id) return;
  monthsData[plannerMonth] = monthsData[plannerMonth].filter(i => i.id !== id);
  closeSheet();
  renderPlanner();
}

function switchScreen(screenName, event) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenName).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById('bottom-nav').style.display = (screenName === 'profile') ? 'none' : 'flex';
  
  if(event && event.currentTarget && event.currentTarget.classList.contains('nav-btn')) {
    event.currentTarget.classList.add('active');
  } else if (screenName === 'home') {
    document.querySelector('.nav-btn').classList.add('active');
  }

  const app = document.getElementById('app');
  if (screenName === 'scenario') {
    app.style.backgroundColor = '#2d1b69';
    updateScenario();
  } else {
    app.style.backgroundColor = 'var(--bg-color)';
  }

  if (screenName === 'home') renderHome();
  if (screenName === 'planner') renderPlanner();
}

function navigateMonth(direction) {
  let index = monthOrder.indexOf(plannerMonth);
  let newIndex = index + direction;
  if (newIndex >= 0 && newIndex < monthOrder.length) {
    plannerMonth = monthOrder[newIndex];
    if (!monthsData[plannerMonth] || monthsData[plannerMonth].length === 0) {
      let prevMonthData = monthsData[monthOrder[index]] || [];
      monthsData[plannerMonth] = prevMonthData
        .filter(item => item.occurrence === 'recurring' || item.occurrence === 'installment')
        .map(item => {
          let newItem = { ...item, id: Date.now().toString() + Math.random() };
          if (newItem.occurrence === 'installment' && newItem.totalDebt > 0) {
            newItem.totalDebt = Math.max(0, newItem.totalDebt - newItem.amount);
            if (newItem.totalDebt === 0) newItem.occurrence = 'once';
          }
          return newItem;
        });
    }
    renderPlanner();
  }
}

const categories = {
  income: ['เงินเดือน', 'รายได้เสริม', 'โบนัส'],
  expense: ['สาธารณูปโภค', 'Subscription', 'ที่อยู่อาศัย', 'ช้อปปิ้ง'],
  debt: ['KTC', 'SCB', 'KBank', 'BBL', 'สินเชื่อ', 'ผ่อนของ'],
  savings: ['กองทุนฉุกเฉิน', 'ลงทุน', 'เป้าหมาย']
};

function openSheetForAdd() {
  document.getElementById('editing-id').value = '';
  document.getElementById('form-name').value = '';
  document.getElementById('form-amount').value = '';
  document.getElementById('form-total-debt').value = '';
  document.getElementById('form-months').value = '';
  document.getElementById('form-interest').value = '';
  document.getElementById('btn-delete').style.display = 'none';
  document.getElementById('calc-result').classList.remove('show');
  switchSheetType('income');
  toggleSheet(true);
}

function openSheetForEdit(itemId) {
  if (isSelectMode) return;
  const item = monthsData[plannerMonth].find(i => i.id === itemId);
  if (!item) return;
  document.getElementById('editing-id').value = item.id;
  document.getElementById('form-name').value = item.name;
  document.getElementById('form-amount').value = item.amount.toLocaleString();
  document.getElementById('form-total-debt').value = item.totalDebt > 0 ? item.totalDebt.toLocaleString() : '';
  document.getElementById('btn-delete').style.display = 'block';
  setOccurrence(item.occurrence || 'recurring');
  switchSheetType(item.type, item.cat);
  toggleSheet(true);
}

function switchSheetType(type, preselectCat = null) {
  currentSheetType = type;
  document.querySelectorAll('.sheet-seg-btn').forEach(btn => {
    btn.classList.remove('active', 'income', 'expense', 'debt', 'savings');
    if (btn.getAttribute('data-i18n') === type) btn.classList.add('active', type);
  });
  
  document.getElementById('amount-label').innerText = type === 'debt' ? (currentLang === 'th' ? 'ยอดผ่อนต่อเดือน' : 'Monthly Payment') : i18n[currentLang].amount;
  document.getElementById('installment-group').style.display = type === 'debt' ? 'block' : 'none';
  document.getElementById('tg-installment').style.display = type === 'debt' ? 'block' : 'none';
  if(type !== 'debt' && currentOccurrence === 'installment') setOccurrence('recurring');

  const chipsContainer = document.getElementById('chips-container');
  selectedCategory = preselectCat || categories[type][0];
  chipsContainer.innerHTML = categories[type].map(cat => 
    `<div class="chip ${cat === selectedCategory ? 'active' : ''}" onclick="selectChip(this, '${cat}')">${cat}</div>`
  ).join('');
  
  if (!document.getElementById('form-name').value) {
    document.getElementById('form-name').value = selectedCategory;
  }
}

function selectChip(elem, cat) {
  elem.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  elem.classList.add('active');
  selectedCategory = cat;
  document.getElementById('form-name').value = cat;
}

function setOccurrence(type) {
  currentOccurrence = type;
  document.querySelectorAll('.toggle-card').forEach(c => c.classList.remove('active'));
  document.getElementById('tg-' + type).classList.add('active');
}

function calcInstallment() {
  const p = parseNumber(document.getElementById('form-total-debt').value);
  const n = parseInt(document.getElementById('form-months').value) || 0;
  const r = parseFloat(document.getElementById('form-interest').value) || 0;
  if (p > 0 && n > 0) {
    let monthly = 0;
    if (r === 0) monthly = p / n;
    else {
      let i = (r / 100) / 12;
      monthly = p * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
    }
    document.getElementById('calc-monthly').innerText = Math.round(monthly).toLocaleString() + ' ฿';
    document.getElementById('form-amount').value = Math.round(monthly).toLocaleString();
    document.getElementById('calc-result').classList.add('show');
  } else {
    document.getElementById('calc-result').classList.remove('show');
  }
}

function saveItem() {
  const id = document.getElementById('editing-id').value;
  const name = document.getElementById('form-name').value.trim();
  const amount = parseNumber(document.getElementById('form-amount').value);
  const totalDebt = parseNumber(document.getElementById('form-total-debt').value);
  if (!name || amount <= 0) { alert('Please fill data'); return; }
  if (!monthsData[plannerMonth]) monthsData[plannerMonth] = [];
  if (id) {
    const index = monthsData[plannerMonth].findIndex(i => i.id === id);
    if (index !== -1) monthsData[plannerMonth][index] = { ...monthsData[plannerMonth][index], name, amount, type: currentSheetType, cat: selectedCategory, totalDebt, occurrence: currentOccurrence };
  } else {
    monthsData[plannerMonth].push({ id: Date.now().toString() + Math.random(), name, amount, type: currentSheetType, cat: selectedCategory, totalDebt, occurrence: currentOccurrence });
  }
  toggleSheet(false);
  renderPlanner();
}

function toggleSheet(show) {
  document.getElementById('sheet').classList.toggle('active', show);
  document.getElementById('overlay').classList.toggle('active', show);
}
function closeSheet() { toggleSheet(false); }

function formatPriceInput(elem) {
  let val = parseNumber(elem.value);
  elem.value = val.toLocaleString();
  updateScenario();
}

function switchScenarioType(type) {
  currentScenarioType = type;
  document.querySelectorAll('.sc-chip').forEach(c => c.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  const labelPrice = document.getElementById('sc-label-price');
  const monthUi = document.getElementById('sc-month-ui');
  const interestUi = document.getElementById('sc-interest-ui');
  const newLabel = document.getElementById('sc-new-label');
  
  if(type === 'buy') {
    labelPrice.innerText = i18n[currentLang].simPriceLabel;
    monthUi.style.display = 'block';
    interestUi.style.display = 'block';
    document.getElementById('sc-price').value = '30,000';
    newLabel.innerText = i18n[currentLang].afterSimBal;
  } else if(type === 'payoff') {
    labelPrice.innerText = i18n[currentLang].simPayoff;
    monthUi.style.display = 'none';
    interestUi.style.display = 'none';
    document.getElementById('sc-price').value = '50,000';
    newLabel.innerText = i18n[currentLang].simPayoff;
  } else {
    labelPrice.innerText = i18n[currentLang].simAdjust;
    monthUi.style.display = 'none';
    interestUi.style.display = 'none';
    document.getElementById('sc-price').value = '2,000';
    newLabel.innerText = i18n[currentLang].simAdjust;
  }
  updateScenario();
}

function updateScenario() {
  const currentBal = getFreeCashFlow(currentMonth);
  document.getElementById('sc-current-bal').innerText = currentBal.toLocaleString() + ' ฿';
  const price = parseNumber(document.getElementById('sc-price').value);
  const months = parseInt(document.getElementById('sc-month-slider').value);
  const interest = parseInt(document.getElementById('sc-interest-slider').value);
  
  document.getElementById('sc-month-label').innerText = months + (currentLang === 'th' ? ' เดือน' : ' Months');
  document.getElementById('sc-interest-label').innerText = interest + '%';
  
  let monthlyImpact = 0;
  let beforeData = [];
  let afterData = [];

  for(let i=0; i<4; i++) {
    let baseBal = getProjectedCash(i);
    beforeData.push(baseBal);
    if(currentScenarioType === 'buy') {
      let i_rate = (interest / 100) / 12;
      monthlyImpact = interest === 0 ? price / months : (price * i_rate * Math.pow(1 + i_rate, months)) / (Math.pow(1 + i_rate, months) - 1);
      afterData.push(baseBal - monthlyImpact);
    } else if(currentScenarioType === 'payoff') {
      monthlyImpact = 8500;
      afterData.push(baseBal + monthlyImpact);
    } else {
      monthlyImpact = price;
      afterData.push(baseBal + monthlyImpact);
    }
  }

  let allVals = [...beforeData, ...afterData];
  let minVal = Math.min(...allVals);
  let maxVal = Math.max(...allVals);
  let range = maxVal - minVal || 1;
  
  let pathBefore = "M0," + (90 - ((beforeData[0] - minVal) / range) * 80);
  let pathAfter = "M0," + (90 - ((afterData[0] - minVal) / range) * 80);
  let labelsHtml = "";

  for(let i=0; i<4; i++) {
    let x = i * 100;
    let yBefore = 90 - ((beforeData[i] - minVal) / range) * 80;
    let yAfter = 90 - ((afterData[i] - minVal) / range) * 80;
    if(i>0) {
      pathBefore += ` L${x},${yBefore}`;
      pathAfter += ` L${x},${yAfter}`;
    }
    
    let labelYBefore = yBefore + 12;
    let labelYAfter = yAfter - 5;
    if(Math.abs(labelYBefore - labelYAfter) < 12) {
      labelYBefore = yBefore + 15;
      labelYAfter = yAfter - 15;
    }

    labelsHtml += `<text x="${x}" y="${labelYAfter}" class="chart-val" text-anchor="middle">${Math.round(afterData[i]).toLocaleString()}</text>`;
    labelsHtml += `<text x="${x}" y="${labelYBefore}" class="chart-val muted" text-anchor="middle">${Math.round(beforeData[i]).toLocaleString()}</text>`;
  }

  document.getElementById('chart-lines').innerHTML = `
    <path d="${pathBefore}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="4" />
    <path d="${pathAfter}" fill="none" stroke="#ffffff" stroke-width="3" />
  `;
  document.getElementById('chart-labels').innerHTML = labelsHtml;

  const newBal = currentScenarioType === 'buy' ? currentBal - monthlyImpact : currentBal + monthlyImpact;
  const newBalElem = document.getElementById('sc-new-bal');
  newBalElem.innerText = Math.round(newBal).toLocaleString() + ' ฿';
  if (newBal < 0) newBalElem.style.color = '#FF453A';
  else if (newBal < 2000) newBalElem.style.color = '#FF9F0A';
  else newBalElem.style.color = '#30D158';
}

function confirmScenario() {
  const price = parseNumber(document.getElementById('sc-price').value);
  const months = parseInt(document.getElementById('sc-month-slider').value);
  const interest = parseInt(document.getElementById('sc-interest-slider').value);
  let newItem = {};

  if(currentScenarioType === 'buy') {
    let i = (interest/100)/12;
    let monthly = interest === 0 ? price / months : (price * i * Math.pow(1+i, months)) / (Math.pow(1+i, months) - 1);
    newItem = { id: Date.now().toString(), name: 'ผ่อนของ (Scenario)', amount: Math.round(monthly), type: 'debt', cat: 'ผ่อนของ', totalDebt: price, occurrence: 'installment' };
  } else if(currentScenarioType === 'payoff') {
    newItem = { id: Date.now().toString(), name: 'เงินอิสระ (ปิดหนี้)', amount: 8500, type: 'in', cat: 'ปิดหนี้', occurrence: 'recurring', totalDebt: 0 };
  } else {
    newItem = { id: Date.now().toString(), name: 'งบประหยัด (Scenario)', amount: price, type: 'save', cat: 'ปรับงบ', occurrence: 'recurring', totalDebt: 0 };
  }

  if (!monthsData[plannerMonth]) monthsData[plannerMonth] = [];
  monthsData[plannerMonth].push(newItem);
  switchScreen('planner', { currentTarget: document.querySelectorAll('.nav-btn')[1] });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('dark-mode-toggle').style.background = isDark ? '#30D158' : '#d1d1d6';
  document.getElementById('dark-knob').style.transform = isDark ? 'translateX(20px)' : 'translateX(0)';
}

applyLang();