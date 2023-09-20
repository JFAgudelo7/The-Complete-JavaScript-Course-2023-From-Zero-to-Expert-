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


///////////////////////////////////////
// Creating Elements
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies fot improve functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>`;

header.append(message);

///////////////////////////////////////
// Delete Elements
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});

///////////////////////////////////////
// Styles
message.style.backgroundColor = '#37383d';
message.style.widht = '120%';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
logo.alt = "Beautiful minimalist logo";

///////////////////////////////////////
// 
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



})

