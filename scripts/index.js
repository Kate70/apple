import Swiper from '../libs/swiper-bundle.esm.browser.min.js'
new Swiper('.goods__block', {
    slidesPerView:1,
    spaceBetween:20,
    breakpoints:{
        320:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:2
        },
        1024:{
            slidesPerView:2,
            spaceBetween:24,
        },
        1440:{
            slidesPerView:3,
            spaceBetween:24,
        }
    },
    navigation: {
        nextEl: '.goods__arrow_prev',
        prevEl: '.goods__arrow_next',
      },
      preventClicks: true,
      a11y: false
});

new SimpleBar(document.querySelector('.country__list'), {
    classNames: {
        scrollbar: 'country__scrollbar',
        track: 'country__track'

    }
})

const productMore = document.querySelectorAll(".product__more");
const modal = document.querySelector(".modal");

productMore.forEach((btn) =>{
btn.addEventListener('click', ()=>{
    modal.classList.add("modal_open")
})
})
modal.addEventListener('click',(event)=>{
    if(event.target===modal){
        modal.classList.remove("modal_open")
    }
})
const formPlaceholder = document.querySelectorAll(".form__placeholder");
const formInput = document.querySelectorAll(".form__input");
formInput.forEach((input, i)=>{
    input.addEventListener('focus', ()=>{
        formPlaceholder[i].classList.add("form__placeholder_active")
    })
})

formInput.forEach((input, i)=>{
    input.addEventListener('blur', ()=>{
        if(input.value===''){
            formPlaceholder[i].classList.remove("form__placeholder_active")
        }       
    })
});



const dataCurrency = {};

const formatCurrency = (value, currency) =>{
return new Intl.NumberFormat('EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
}).format(value)
}

const showPrice = (currency = 'USD')=>{
    const priceElems = document.querySelectorAll('[data-price]');
    priceElems.forEach(elem=>{
        elem.textContent= formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
}


const myHeaders = new Headers();
myHeaders.append("apikey", "r2l6wSlKukIDlSOy3BD8kUVR64Dh1mPy");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates);
    console.log(dataCurrency);
    showPrice();
  })
  .catch(error => console.log('error', error));

 
  const countryBtn = document.querySelector(".country__btn");
const countryWrapper = document.querySelector(".country__wrapper");

countryBtn.addEventListener("click", ()=>{
    countryWrapper.classList.toggle('country__wrapper_open')
});

countryWrapper.addEventListener("click",({target})=>{
    if (target.classList.contains("country__choise")){
        countryWrapper.classList.remove('country__wrapper_open');
        showPrice(target.dataset.currency)
    }
});

const timer = deadline => {
const unitDay = document.querySelector('.timer__unit_day')
const unitHour = document.querySelector('.timer__unit_hour')
const unitMinute = document.querySelector('.timer__unit_minute');

const descDay = document.querySelector('.timer__unit-description_day')
const descHour = document.querySelector('.timer__unit-description_hour')
const descMinute = document.querySelector('.timer__unit-description_minute');


    const getTimeRemaning=()=>{
        const dateStop = new Date(deadline).getTime()
        console.log("datestop", dateStop);
        const dateNow=Date.now();
        const timeRemaming = dateStop - dateNow;      
        const m = Math.floor(timeRemaming / 1000 / 60 % 60);
        const h = Math.floor(timeRemaming /1000/ 60 / 60 % 24);
        const d = Math.floor(timeRemaming /1000 / 60/ 60 / 24) ;
        return{timeRemaming,
            m,
            h,
            d,
        }
      
    }
    const start = () => {
        const timer = getTimeRemaning();
        unitDay.textContent = timer.d;
        unitHour.textContent = timer.h;
        unitMinute.textContent = timer.m;       

        const timerId = setInterval(start, 40000);

    }
    start();
   
}
timer('2023/09/07 20:00');