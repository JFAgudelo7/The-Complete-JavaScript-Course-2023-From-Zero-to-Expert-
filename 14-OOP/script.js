'use strict';

const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;

    /* NEVER ADD METHODS IN THE CLASS. This will create a copy for every new objet, so -> less performance
    this.calcAge = function(){
        console.log(2097 - birthYear);
    }*/
};

const Jonas = new Person('Jonas',1991);

//Prototypes
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
}

Jonas.calcAge();


//ProtoypeOfLinkedObjects
Person.prototype.species = 'Homo Sapiens';
console.log(Jonas.species);


//*********************************************************** */
// Code Challenge #1
//*********************************************************** */

const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function(){
    this.speed -= 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

const EV = function(make,speed,charge){
    Car.call(this, make, speed);
    this.charge = speed;
}

// Link the prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
}

const Tesla = new EV('Tesla',120,23);
Tesla.chargeBattery(90);
console.log(Tesla);
Tesla.brake();



//*********************************************************** */
//***********************Encapsulation********************** */

class Account{
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.locale = navigator.language;

        //Protected Properties
        this._pin = pin;
        this._movements = [];
        

        console.log(`Thanks for openin an account, ${owner}`);
    }

    //Public Interface
    getMovements(){
        return this._movements;
    }

    deposit(val){
        this._movements.push(val);
    }

    withdraw(val){
        this.deposit(-val);
    }

    //Protected method
    _approveLoan(val){
        return true;
    }

    requestLoan(val){
        if (this._approveLoan(val)){
            this.deposit(val);
            console.log(`Loan Approved`);
        }
    }
}

const acc1 = new Account('Jonas','EUR', 1111);