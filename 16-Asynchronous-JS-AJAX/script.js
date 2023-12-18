"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

/*---------------------------------------------------------
Old School Way
---------------------------------------------------------*/

/* CODE ADJUSTMENT
The first solution is to use REST Countries v2, which is still available, but not covered in the documentation anymore. The URL is slightly different now — it ends with .com, instead of .eu, and it doesn't have the /rest part in the path anymore. The rest is the same as in the course.

To get the country by name, use this URL

https://restcountries.com/v2/name/${country}
For example, to get data about Portugal, you would send a request to

https://restcountries.com/v2/name/portugal
To get the country by alpha code, use this URL

https://restcountries.com/v2/alpha/${neighbour}
For example, to get data about Portugal (PT), you would send a request to

https://restcountries.com/v2/alpha/pt
Please note that ${country} and ${neighbour} depend on the variable names that you used in your code.
*/
const RenderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// Render error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX Call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    //console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //
    RenderCountry(data);

    //Get neoighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //AJAX Call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      RenderCountry(data2, "neighbour");
    });
  });
};
//getCountryAndNeighbour('portugal');

/*---------------------------------------------------------
AJAX
---------------------------------------------------------*/
/*
const getCountryData = function (country){
    fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        console.log(data);
        RenderCountry(data)
    })
}*/

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json;
  });
};

/* Option 1
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => {
      console.log(response);
    })
    .then((data) => {
      RenderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Country nof found ${response.status}`);
      return response.json();
    })
    .then((data) => RenderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err} 🔥🔥`);
      renderError(`Something wen wrong 🔥🔥🔥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};*/

// Option 2
const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country nof found")
    .then((data) => {
      RenderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error("No neighbour found!");

      //Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country nof found"
      );
    })
    .then((data) => RenderCountry(data, "neighbour"))
    .catch((err) => {
      console.error(`${err} 🔥🔥`);
      renderError(`Something wen wrong 🔥🔥🔥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("australia");
});

/*---------------------------------------------------------
CODING CHALLENGE 1
---------------------------------------------------------*/

/*
const whereAmI = function (lat, lng) {
  fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })

    .then((data) => RenderCountry(data[0], "neighbour"))
    .catch((err) => console.error(`${err.message} 🐌`));
};

whereAmI(52.508, 13.381);*/

/*---------------------------------------------------------
Promises
---------------------------------------------------------*/

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening 🔮");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You win 🤑");
    } else {
      reject(new Error("You lost your money 👎"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

/*---------------------------------------------------------
Promisifying the Geolocation API
---------------------------------------------------------*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /* position => resolve(position),
    err => console.error(err)*/
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })

    .then((data) => RenderCountry(data[0], "neighbour"))
    .catch((err) => console.error(`${err.message} 🐌`));
};

btn.addEventListener("click", whereAmI);

/*---------------------------------------------------------
CODING CHALLENGE 2
---------------------------------------------------------*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("Image 1 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.error(err));


  /*---------------------------------------------------------
SYNC/AWAIT
---------------------------------------------------------*/
const whereAmI_2 = async function(){
  try{
    //Geolocation
    const pos = await getPosition();
    const { latitute: lat, longitude: lng} = pos.coords;

    //Reverse geocoding
    const resGeo = await fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGEo = await resGeo.json();
    console.log(dataGEo);

    //Country data
    const res = await fetch(`https://restcountries.com/v2/name/${dataGEo.country}`);
    //console.log(res);
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    //console.log(data);
    RenderCountry(data[0]);

    /*Use async and await like above it's equivalent to the following:
    fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));
    */ 
  } catch(err){
    console.log(err.message);
  }

  
}

whereAmI_2();
console.log("First");


  /*---------------------------------------------------------
Promises in Parallel
---------------------------------------------------------*/
/*
console.log(":::::::::::::::::::::Promises in Parallel:::::::::::::::::::::::::::");
const get3Countries = async function (c1, c2, c3) {
  try {
    const data1 = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const data2 = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const data3 = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

  /*---------------------------------------------------------
Promises: Race, allSettled, any
---------------------------------------------------------*/

(async function(){
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/france`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
console.log(res[0]);
})();

const timeout = function(sec){
  return new Promise(function(_, reject){
    setTimeout(function(){
      reject(new Error('Request took too long'));
    }, sec)
  });
} ;

