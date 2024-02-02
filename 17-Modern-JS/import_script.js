import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";



console.log("Importing module");

addToCart("bread", 5);
console.log(price, tq);


/*
//Import everyting
import * as ShopingCart from "./shoppingCart.js";
ShopingCart.addToCart("bread", 5);
*/