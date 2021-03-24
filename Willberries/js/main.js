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
const navigationLinks = document.querySelectorAll('.navigation-link'); // Элементы меню
const longGoodsList = document.querySelector('.long-goods-list'); // Товарная лента

const getGoods = async function() {
    urlDB = 'db/db.json';

    const result = await fetch(urlDB);
    if (!result.ok) {
        throw "Ошибочка: " + result.status;
    }
    // console.log('getGoods Ok.');
    return result.json();
}

const createCard = function(objCard) {
        const card = document.createElement('div');
        card.className = 'col-lg-3 col-sm-6';

        card.innerHTML = `
                    <div class="goods-card">
                        ${objCard.label?
                        `<span class="label">${objCard.label}</span>`:``}
                        <img src="db/${objCard.img}" alt="image: ${objCard.name}" class="goods-image">
                        <h3 class="goods-title">${objCard.name}</h3>
                        <p class="goods-description">${objCard.description}</p>
                        <button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
							<span class="button-price">$${objCard.price}</span>
						</button>
                    </div>
    `;

    //console.log(card);
    return card;
};

const renderCards = function(data) {
    longGoodsList.textContent = '';

    const cards = data.map(createCard);

    // cards.forEach(function(card) {
    //     longGoodsList.append(card);
    // });
    longGoodsList.append(...cards);

    document.body.classList.add('show-goods');
};

more.addEventListener('click', function(event){
    event.preventDefault;
    
    getGoods().then(renderCards);

    const id = scrollLinks[i].getAttribute('href');
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

});

const filterCards = function(field, value){
    getGoods().then(function(data){
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

        console.log(link);
        const field = link.dataset.field;
        const value = link.textContent;
        console.log(field);
        console.log(value);
        filterCards(field, value);
    });
});