"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};


const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  //Slice is used to create a copy of the original array
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2,0); // This padStart block is to add the 0 for the day and 01, 02...
    const month = `${date.getMonth() + 1}`.padStart(2,0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)} $</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1);

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

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

// Adding balance with the Recuce function
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} $`;
};
//calcDisplayBalance(account1.movements);

// Chain Nethods section
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}$`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} $`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} $`;
};
//calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
// Login Section
/////////////////////////////////////////////////
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Create Current Date
    const _now = new Date();
    const day = `${_now.getDate()}`.padStart(2,0); // This padStart block is to add the 0 for the day and 01, 02...
    const month = `${_now.getMonth() + 1}`.padStart(2,0);
    const year = _now.getFullYear();
    const hour = `${_now.getHours()}`.padStart(2,0);
    const min = `${_now.getMinutes()}`.padStart(2,0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

    //Clean input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  } else {
    console.log("Not Valid Credentials");
  }
});

// *********************************************************************************************************************
// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// *********************************************************************************************************************


/////////////////////////////////////////////////
// Transfer Section
/////////////////////////////////////////////////
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  //console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    //Update UI
    updateUI(currentAccount);
  } else {
    console.log("Transfer Invalid");
  }
});

/////////////////////////////////////////////////
// findIndex Section
/////////////////////////////////////////////////
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

/////////////////////////////////////////////////
// findIndex Section
/////////////////////////////////////////////////
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

/////////////////////////////////////////////////
// Some  Section
/////////////////////////////////////////////////
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date());

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

/////////////////////////////////////////////////
// Sort  Section
/////////////////////////////////////////////////
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});




/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
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
console.warn(
  ":::::::::MAP FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
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
console.warn(
  ":::::::::FILTER FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
console.warn(".....deposits with filter");
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.warn(".....deposits with loop");
console.log(depositsFor);

console.warn(".....withdrews with filter");
const withdrews = movements.filter((mov) => mov < 0);
console.log(withdrews);

const withdrewFor = [];
for (const mov of movements) if (mov < 0) withdrewFor.push(mov);
console.warn(".....withdrew with loop");
console.log(withdrewFor);

// Reduce Function
console.warn(
  ":::::::::REDUCE FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
console.warn("..... with arrow function");
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
console.warn("..... with loop");
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]); // This portion is the first value of the array
console.log(max);

// Chain methods
const totalDepositUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

// Filter Function
console.warn(
  ":::::::::FIND FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
// Returns the first element in the array that match the condition
const firstWithdrawak = movements.find((mov) => mov < 0);
console.log(movements);
console.warn("..... Find in an array");
console.log(firstWithdrawak);
console.log(accounts);

console.warn("..... Find in an object");
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

// Flat and Flatmap Function
console.warn(
  ":::::::::Flatmap FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
const arr = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(arr.flat());

const arrDeep = [
  [[1, 2], 3],
  [4, [5, 6], 7, 8],
];
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log("overallBalance: " + overallBalance);

console.warn(
  "::::::::: Flatmap FUNCTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
const overallBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log("overallBalance2: " + overallBalance2);

// Sorting Arrays
console.warn(
  ":::::::::Sorting Arrays::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);

//sort works for strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners); //Sort affects the original array

//For numbers
//Ascending... for descending, just inver the return values
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);
//fORM 2
movements.sort((a, b) => a - b);
console.log(movements);

// Filing Arrays
console.warn(
  ":::::::::Filling Arrays::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
const x = new Array(7);
console.log(x);

x.fill(1);
console.log(x);

//Begin to fill in position 3
x.fill(1, 3);

const arr2 = [1, 2, 3, 4, 5, 6, 7];
arr2.fill(23, 2, 6);
console.log(arr2);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log("Y: " + y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log("z: " + z);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("E", ""))
  );
  console.log(movementsUI);
});

//Array Method Practice
console.warn(
  ":::::::::Array Method Practice::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// Forma 1
const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(sums);

// Forma 2
const { deposits2, withdrawls} = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? "deposits2" : "withdrawls"] += cur;
      return sums;
    },
    { deposits2: 0, withdrawls: 0 }
  );
console.log(deposits2, withdrawls);



console.warn(
  ":::::::::Remaining Operator::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
labelBalance.addEventListener('click',function(){
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i){
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  })
})


console.warn(
  ":::::::::Numeric Separators::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
const diameter = 268_912_123_312_854;
console.log(diameter);

const price = 345_99;
console.log(price);

//This doesn't work for string and functions
console.log((Number('230_000')));


console.warn(
  "::::::::::::::::::BigInt ::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);

console.log(2**53-1); //Max number accurately represented in JS
console.log((Number.MAX_SAFE_INTEGER));

console.log(526230316845320310320635482303126260303126230303);
console.log(526230316845320310320635482303126260303126230303n);
console.log(BigInt(5262303));

//Operations
console.log(100000n + 100000n);

const huge = 512301303061023345645563103216;
const num = 23;
//console.log(huge + BigInt(num));

//Divisions
console.log(11n/3n);
console.log(10/3);


console.warn(
  "::::::::::::::::::Date ::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
);
//Create a date
const now = new Date();
console.log(now);
console.log(new Date('Sept 11 2023 18:05:41'));
console.log(new Date('September 10, 2023'));
console.log(new Date(0));
console.log(new Date(3*24*60*60*1000));

//Workinbg with dates
const future = new Date(2037,10,19,15,23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); //timestampt from Jan 03 1970

console.log(Date.now()); // Current timestamp

future.setFullYear(2040);
console.log(future);
