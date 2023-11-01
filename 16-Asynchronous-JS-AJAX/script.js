'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
const RenderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {

    // AJAX Call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
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
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener('load', function(){
            const data2 = JSON.parse(this.responseText);
            console.log(data2);
            RenderCountry(data2, 'neighbour');
        })
    });
};
getCountryAndNeighbour('portugal');