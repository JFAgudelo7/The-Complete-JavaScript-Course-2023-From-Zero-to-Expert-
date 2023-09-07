"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__value">${mov} $</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

// COMPUTING USERNAMES
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });

};
createUsernames(accounts);
console.log(accounts);

const updateUI = function(acc){
      //Display movements
      displayMovements(acc.movements);
    
      //Display balance
      calcDisplayBalance(acc);
  
      //Display summary
      calcDisplaySummary(acc);
}

// Adding balance with the Recuce function
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} $`;
};
//calcDisplayBalance(account1.movements);

// Chain Nethods section
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} $`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >=1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} $`;
};
//calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
// Login Section
/////////////////////////////////////////////////
let currentAccount;

btnLogin.addEventListener('click', function(e){
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Clean input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);

  }else{
    console.log("Not Valid Credentials");
  }
});


/////////////////////////////////////////////////
// Transfer Section
/////////////////////////////////////////////////
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  //console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);    
    updateUI(currentAccount);
  } else{
    console.log("Transfer Invalid");
  }
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
console.warn(":::::::::MAP FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
// Map Function --------------------------------
const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movements);
console.log(movementsUSD);

// Map function <- Using loop
const movementsUSDFor = [];
for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);
console.log(movementsUSDFor);

// Map function <- Using Arrow function
const movementsUSDArrow = movements.map((mov) => mov * eurToUsd);
console.log(movementsUSDArrow);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);


// Filter Function
console.warn(":::::::::FILTER FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
console.warn(".....deposits with filter");
const deposits = movements.filter(function (mov){
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.warn(".....deposits with loop");
console.log(depositsFor);

console.warn(".....withdrews with filter");
const withdrews = movements.filter(mov => mov < 0);
console.log(withdrews);

const withdrewFor = [];
for (const mov of movements) if (mov < 0) withdrewFor.push(mov);
console.warn(".....withdrew with loop");
console.log(withdrewFor);

// Reduce Function
console.warn(":::::::::REDUCE FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
console.warn("..... with arrow function");
const balance = movements.reduce((acc,cur) => acc + cur, 0);
console.log(balance);
console.warn("..... with loop");
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Maximum value
const max = movements.reduce((acc, mov) =>{
  if (acc > mov)
    return acc;
  else 
    return mov;
}, movements[0]); // This portion is the first value of the array
console.log(max);

// Chain methods
const totalDepositUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);


// Filter Function
console.warn(":::::::::FIND FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
// Returns the first element in the array that match the condition
const firstWithdrawak = movements.find(mov => mov < 0);
console.log(movements);
console.warn("..... Find in an array");
console.log(firstWithdrawak);
console.log(accounts);

console.warn("..... Find in an object");
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


