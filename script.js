// Select Elements

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");

const addExpenseBtn = document.getElementById("add-expense");
const resetBtn = document.getElementById("reset");

const expenseList = document.getElementById("expense-list");
const expenseCount = document.getElementById("expense-count");

const totalDisplay = document.getElementById("total");
const budgetStatus = document.getElementById("budget-status");

const message = document.getElementById("message");

// Store Expenses

let expenses = [];

// Event Listeners

addExpenseBtn.addEventListener("click", addExpense);
resetBtn.addEventListener("click", resetApplication);

// Add Expense

function addExpense() {
  message.textContent = "";
  message.className = "message";

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;

  // Validation

  if (description === "") {
    message.textContent = "Please enter a description.";
    message.classList.add("error");
    return;
  }

  if (amountInput.value === "") {
    message.textContent = "Please enter an amount.";
    message.classList.add("error");
    return;
  }

  if (isNaN(amount)) {
    message.textContent = "Amount must be a valid number.";
    message.classList.add("error");
    return;
  }

  if (amount <= 0) {
    message.textContent = "Amount must be greater than zero.";
    message.classList.add("error");
    return;
  }

  // Create Expense Object

  const expense = {
    description: description,
    amount: amount,
    category: category,
  };

  // Store Expense

  expenses.push(expense);

  message.textContent = "Expense added successfully!";
  message.classList.add("success");

  // Update Page

  displayExpenses();

  const total = calculateTotal();
  totalDisplay.textContent = `$${total.toFixed(2)}`;

  checkBudget();

  // Clear Form

  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
}

// Display Expenses

function displayExpenses() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML =
      '<p class="empty-message">No expenses have been added yet.</p>';
  } else {
    expenses.forEach(function (expense) {
      const expenseItem = document.createElement("div");
      expenseItem.classList.add("expense-item");

      expenseItem.innerHTML = `
        <span class="expense-description">${expense.description}</span>
        <span class="expense-category">${expense.category}</span>
        <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
      `;

      expenseList.appendChild(expenseItem);
    });
  }

  expenseCount.textContent = `${expenses.length} Expenses`;
}

// Calculate Total

function calculateTotal() {
  let total = 0;

  expenses.forEach(function (expense) {
    total += expense.amount;
  });

  return total;
}

// Check Budget

function checkBudget() {
  const total = calculateTotal();

  if (total <= 500) {
    budgetStatus.textContent = "You are under budget.";

    budgetStatus.classList.remove("over-budget");
    budgetStatus.classList.add("under-budget");
  } else {
    budgetStatus.textContent = "You are over budget.";

    budgetStatus.classList.remove("under-budget");
    budgetStatus.classList.add("over-budget");
  }
}

// Reset Application

function resetApplication() {
  expenses = [];

  expenseList.innerHTML =
    '<p class="empty-message">No expenses have been added yet.</p>';

  expenseCount.textContent = "0 Expenses";

  totalDisplay.textContent = "$0.00";

  budgetStatus.textContent = "You are under budget.";
  budgetStatus.classList.remove("over-budget");
  budgetStatus.classList.add("under-budget");

  message.textContent = "";
  message.className = "message";

  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
}