'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// --------------------------------------------------------------------------------------------
// Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // Scrolling
  //window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY); --> Old school 1

  // Old school 2
  /*window.scrollTo({
    left: s1coords.left + window.scrollX, 
    top: s1coords.top + window.scrollY,
    behavior: 'smooth'
  });*/

  // SCROLLING----------------------------------------------
  section1.scrollIntoView({behavior: 'smooth'});
  // ----------------------------------------------

});

// --------------------------------------------------------------------------------------------
// Page Navigation

/* This portion works perfectly but if we have a lot of elements, is not the best option. Better to use Event Delegation.
document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id =this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});

  });
});
*/

/*
Page Navigation with Event Delegation
1. Add Event listener to common parent element -> nav__links is the container of the nav links
2. Determine what element originated the event
*/
document.querySelector('.nav__links').addEventListener('click', function(e){
  //console.log(e.target);
  e.preventDefault();

  //Matching strategy
  if(e.target.classList.contains('nav__link')){    
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})


// --------------------------------------------------------------------------------------------
// Tabbed Component 
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //Guard clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//--------------------------------------------------------------------------------------------
//----------------------------------------------SECTIONS

  // ----------------------------------------------
// Creating Elements
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies fot improve functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>`;

header.append(message);

  // ----------------------------------------------
// Delete Elements
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});

  // ----------------------------------------------
// Styles
message.style.backgroundColor = '#37383d';
message.style.widht = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
logo.alt = "Beautiful minimalist logo";


// ----------------------------------------------
// Event Propagation
/*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
//console.log(randomColor(0,255));

document.querySelector('.nav__link').addEventListener('click',function(e){
  console.log('LINK', e.target);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});

document.querySelector('.nav').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});*/