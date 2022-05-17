    // Tabs (кнопки таба + видемость текста и клик на свап)

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabsContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabsContent()
    showTabsContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent()
                    showTabsContent(i)
                }
            })
        }
    });

    // Timer

    const deadline = '2022-04-20';

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60) % 24 ),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }      
    };

    function getZero(num) {
        if(num < 10) {
            return `0${num}`
        }else{
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
            const timeInterval = setInterval(updateClock, 1000)    

            updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }          
        };
    };
    setClock('.timer', deadline);

    //Modal 
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
      
        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = "hidden";
            clearInterval(modalTimerId)
        }

      modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
      });   
      

      function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ""
      }

      modalCloseBtn.addEventListener('click', closeModal);

      modal.addEventListener('click', (e) => {
          if(e.target === modal) {
            closeModal()
          }
      })

      document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal()
        }
      })

    //   const modalTimerId = setTimeout(openModal, 5000);
  
      function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
          }
      }
          window.addEventListener('scroll', showModalByScroll);   

    // Используем класси для карточек

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.ChangeToUAH()
        } 
        ChangeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div')
            element.innerHTML = `
                <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container'
    // ).render()

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container'
    // ).render()

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21,
    //     '.menu .container'
    // ).render()

    //forms callme submit on server

    
        const forms = document.querySelectorAll('form');

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal_dialog');

            prevModalDialog.classList.add('hide');
            openModal()
            const thanksModal =  document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__dialog">
                    <div> class="modal__close" data-close>x</div>
                    <div class="modal__tittle">${message}</div>
                </div>
            `
            document.querySelector('.modal').append(thanksModal)
        }

        const message = {
            loading:'Загрузка',
            success: 'Спасибо! Успех',
            failure: ' error sorry , try again )лол'
        }

        forms.forEach(item => {
            bindPostData(item);
        })

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            })
            return await res.json();
        }

        function bindPostData(form){

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                

                const formData = new FormData(form);
                const object = {};
                formData.forEach(function(value, key) {
                    object[key] = value;
                })

                postData('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success)
                })
                .catch(() => {
                    showThanksModal(message.failure)
                }).finally(() => {
                    form.reset();
                })
            });
    
        }


    // fetch('http://localhost:3000/requests')

    //menu with AXIOS

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // slider 
    const sliders = document.querySelectorAll('.offer__slide'),
          slides = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector('.offer__slider-inner');

    let slideIndex = 1,
        offset = 0;

    if(sliders.length < 10) {
        total.textContent = `0${sliders.length}`
        current.textContent = `0${slideIndex}`
    }else{
        total.textContent = sliders.length
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    sliders.forEach(slide => {
        slide.style.width = width;
    });

    slides.style.position = 'relative';

    const indicators = document.createElement('ol');
    let dots = []
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slides.append(indicators)

    for ( let i = 0; i < sliders.length; i++ ) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0){
            dot.style.opacity = 1
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {

        if(offset == +width.replace(/\D/g, '') * (sliders.length - 1)) {
            offset = 0;
        }else {
            offset += +width.replace(/\D/g, '') 
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if(slideIndex == sliders.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

       if(sliders.length < 10){
           current.textContent = `0${slideIndex}`
       } else {
           current.textContent = slideIndex
       }

       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {

        if(offset == 0) {
            offset = +width.replace(/\D/g, '')  * (sliders.length - 1)
        }else {
            offset -= +width.replace(/\D/g, '') 
        }

        slidesField.style.transform = `translateX(${-offset}px)`

        if(slideIndex == 1) {
            slideIndex = sliders.length
        } else {
            slideIndex--
        }

       if(sliders.length < 10){
           current.textContent = `0${slideIndex}`
       } else {
           current.textContent = slideIndex
       }

       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
    
            slideIndex = slideTo
            offset = +width.replace(/\D/g, '')  * (slideTo - 1);
    
            slidesField.style.transform = `translateX(${-offset}px)`
    
            if(sliders.length < 10){
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex
            }
    
            dots.forEach(dot => dot.style.opacity = '.5');
           dots[slideIndex - 1].style.opacity = '1';   
        }); 
    });

    // showSlide(slideIndex)

    // if(sliders.length < 10) {
    //     total.textContent = `0${sliders.length}`
    // }else{
    //     sliders.length
    // }
    
    // function showSlide(n){
    //     if(n > sliders.length){
    //         slideIndex = 1
    //     }

    //     if(n < 1) {
    //         slideIndex = sliders.length
    //     }

    //     sliders.forEach(slide => {slide.style.display = 'none'})

    //     sliders[slideIndex - 1].style.display = 'block'

    //     if(slideIndex < 10){
    //         current.textContent = `0${slideIndex}`
    //     }else {
    //         current.textContent = slideIndex
    //     }
    
    // }

    // function plusSlide(n) {
    //     showSlide(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlide(-1)
    // })

    // next.addEventListener('click', () => {
    //     plusSlide(1)
    // })

    // menu calculator calorii

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    };

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    };

    function initLocalSettings(selector, activeClass) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = "Заповніть таблицю...";
            return;
        }

        if(!sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal()

    function getStatcInformation(selector, activeClass) {
        const element = document.querySelectorAll(selector);

        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
    
                console.log(ratio, sex)
    
                element.forEach(elem => {
                    elem.classList.remove(activeClass)
                })
    
                e.target.classList.add(activeClass)
    
                calcTotal()
            });
        });
    };
    
    getStatcInformation('#gender div', 'calculating__choose-item_active')
    getStatcInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = "1px solid red"
            } else {
                input.style.border = "none"
            }

            switch(input.getAttribute('id')) {
                case 'height':
                height = +input.value
                break
                case 'weight':
                weight = +input.value
                break
                case 'age':
                age = +input.value
                break
            }
            calcTotal()
        })

        
    };

    getDinamicInformation('#height')
    getDinamicInformation('#weight')
    getDinamicInformation('#age')

