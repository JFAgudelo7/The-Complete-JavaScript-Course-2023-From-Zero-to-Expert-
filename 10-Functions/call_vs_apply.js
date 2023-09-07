'use strict';

const lufthansa = {
    airline: 'lufthansa',
    iataCode: 'LH',
    bookings: [],

    book(flightNum, name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name});
    },    
};

lufthansa.book(239, 'Jonas S');
lufthansa.book(123, 'James Min');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}

const book = lufthansa.book;

//*************Call Method */
book.call(eurowings,23, 'Sarah W'); // Here we are passing the object, with the the context for this will be this object instead of the this parent object
console.log(eurowings);

book.call(lufthansa, 23, 'Sarah W');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 583, 'Mary C');
console.log(swiss);

//*************Apply Method */
const flightData = [583, 'Geroge'];
book.apply(swiss, flightData);
console.log(swiss);

// Apply method is not used in modern JS, instead of use apply, we can use the following structure
book.call(swiss, ...flightData);

//***********Bind */

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);


bookEW(23, 'Steven');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Juse');
bookEW23('Martha');


console.log(lufthansa);
console.log(eurowings);
console.log(swiss);


//With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function(){
    console.log(this);

    this.planes++;
    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); /* Without the bind and the argument, the this will priont the button called in the 
add Event Listener. Definig like this, we pass the context of the object*/

// Partial application
const addTax = (rate,value) => value + value * rate;
console.log(addTax(0.1,200));

const addVAT = addTax.bind(null, 0.23);
//const addVAT = value => value + value * 0.23; Above expressions is equals to this

console.log(addVAT(100));
console.log(addVAT(23));

// Other wat to do it

const addTaxRate = function (rate){
    return function (value){
        return value + value * rate;
    };

};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
