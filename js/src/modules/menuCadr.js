function menuCard() {
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
};

export default menuCard;