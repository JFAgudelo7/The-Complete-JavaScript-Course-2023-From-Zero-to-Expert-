"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// --------------------------------------------------------------------------------------------
// Scrolling

btnScrollTo.addEventListener("click", function (e) {
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
  section1.scrollIntoView({ behavior: "smooth" });
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
document.querySelector(".nav__links").addEventListener("click", function (e) {
  //console.log(e.target);
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// --------------------------------------------------------------------------------------------
// Tabbed Component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //Active tab
  clicked.classList.add("operations__tab--active");

  //Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// --------------------------------------------------------------------------------------------
// Menu Fade Animation

const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// We need to pass a function, not the result of calling a function, to the addEventListener, for that we need to use the following structure, or the bind structure
/*nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function(e){
  handleHover(e, 1);
});*/

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// ----------------------------------------------
// Sticky Navigation
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function(e){
  console.log(window.scrollY);

  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky') 
  else nav.classList.remove('sticky');
})*/

// Now the sticky navigation using the Intersection Observer API
/*
const obsCallback = function(entries, observer){
  entries.forEach(entry => {
    console.log(entry)
  })
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2]
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);*/

const _header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries){
  const [entry] = entries; //This is the same that use entries[0];

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const _headerObservver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

_headerObservver.observe(_header);

// Reveal Section
const allSectins = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
   const [entry] = entries;

   if(!entry.isIntersecting) return;

   entry.target.classList.remove('section--hidden');
   observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSectins.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// ----------------------------------------------
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]'); //Seelctin only the images that have the propert data-src

const loadImg = function(entries, observer){
  const [entry] = entries;  

  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// ----------------------------------------------
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};




//--------------------------------------------------------------------------------------------
//----------------------------------------------SECTIONS

// ----------------------------------------------
// Creating Elements
const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies fot improve functionality and analytics, <button class="btn btn--close-cookie">Got it!</button>`;

header.append(message);


// ----------------------------------------------
// Delete Elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// ----------------------------------------------
// Styles
message.style.backgroundColor = "#37383d";
message.style.widht = "120%";

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector(".nav__logo");
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
