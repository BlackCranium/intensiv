const mySwiper = new Swiper('.swiper-container', {
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
    },
});

// Корзина

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');

const openModal = function() {
    modalCart.classList.add('show');
}

const closeModal = function() {
    modalCart.classList.remove('show');
}

buttonCart.addEventListener('click', openModal);


// ДЗ (день 1) закрытие корзины
modalCart.addEventListener('click', function(event) {
    //console.log(event.target);
    if (event.target.classList.contains('overlay') ||
        event.target.classList.contains('modal-close')) {
        closeModal();
    }
});


// Плавный скролл
(function() {
    const scrollLinks = document.querySelectorAll('a.scroll-link');

    for (scrollLink of scrollLinks) {
        scrollLink.addEventListener('click', function(event) {

            event.preventDefault();

            const id = scrollLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

        });
    }
})()

// товарка

const more = document.querySelector('.more'); // кнопка "View All"
const acsessories = document.querySelector('.view-acsessories'); // кнопка "View All" на банере
const clothing = document.querySelector('.view-clothing'); // кнопка "View All" на банере
const navigationLinks = document.querySelectorAll('.navigation-link'); // Элементы меню
const longGoodsList = document.querySelector('.long-goods-list'); // Товарная лента

let urlDB = 'db/db.json';

const getGoods = async function(url) {
    const result = await fetch(url);
    if (!result.ok) {
        throw "Ошибочка: " + result.status;
    }
    return result.json();
}

const createCard = function({ id, label, img, name, description, price, }) {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-sm-6';

        card.innerHTML = `
                <div class="goods-card">
                    ${label?
                    `<span class="label">${label}</span>`:
                    ``}
                    <img src="db/${img}" alt="image: ${name}" class="goods-image">
                    <h3 class="goods-title">${name}</h3>
                    <p class="goods-description">${description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${id}">
                        <span class="button-price">$${price}</span>
                    </button>
                </div>
        `;
        return card;
};

const renderCards = function(data) {
    longGoodsList.textContent = '';

    const cards = data.map(createCard);

    longGoodsList.append(...cards);

    document.body.classList.add('show-goods');
};

more.addEventListener('click', function(event){
    event.preventDefault;
    getGoods(urlDB).then(renderCards);

    const id = scrollLinks[i].getAttribute('href');
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

});

const filterCards = function(field, value){
    getGoods(urlDB).then(function(data){
        const filteredGoods = data.filter(function(good){
            return good[field]===value;
        });
        return filteredGoods;
    })
    .then(renderCards);
};

navigationLinks.forEach(function(link){
    link.addEventListener('click', function(event){
        event.preventDefault;
        const field = link.dataset.field;
        const value = link.textContent;
        !field?filterCards():filterCards(field, value);
    });
});

acsessories.addEventListener('click', event=>{
    event.preventDefault;
    filterCards('category', 'Accessories');
});

clothing.addEventListener('click', event=>{
    event.preventDefault;
    filterCards('category', 'Clothing');
});