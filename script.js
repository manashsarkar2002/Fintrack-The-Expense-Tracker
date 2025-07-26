const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const balanceEl = document.getElementById('balance');
const historyList = document.getElementById('historyList');
const dateInfo = document.getElementById('dateInfo');
const addBtn = document.getElementById('addBtn');
const resetBtn = document.getElementById('resetBtn');

let balance = 0;

function formatCurrency(value) {
  return parseFloat(value).toFixed(2);
}

function updateBalance(amount, type) {
  if (type === 'income') {
    balance += amount;
  } else {
    balance -= amount;
  }
  balanceEl.textContent = formatCurrency(balance);
}

function addTransaction() {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (!desc || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  updateBalance(amount, type);

  const li = document.createElement('li');
  li.classList.add(type);
  li.innerHTML = `${desc} <span>${type === 'income' ? '+' : '-'} ₹${formatCurrency(amount)}</span>`;
  historyList.insertBefore(li, historyList.firstChild);

  descInput.value = '';
  amountInput.value = '';
}

function resetTracker() {
  balance = 0;
  balanceEl.textContent = "0.00";
  historyList.innerHTML = '';
  descInput.value = '';
  amountInput.value = '';
  typeSelect.value = 'income';
}

function loadDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateInfo.textContent = now.toLocaleDateString('en-IN', options);
}

addBtn.addEventListener('click', addTransaction);
resetBtn.addEventListener('click', resetTracker);

loadDate();
