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
const buttonClose = document.querySelector('.modal-close');
const modalCart = document.querySelector('#modal-cart');

const openModal = function() {
    console.log('-- давай корзину!');
    modalCart.classList.add('show');
}

const closeModal = function() {
    console.log('-- спрячь корзину!');
    modalCart.classList.remove('show');
}

buttonCart.addEventListener('click', openModal);
buttonClose.addEventListener('click', closeModal);


// ДЗ (день 1) закрытие корзины 
document.querySelector('body').addEventListener('click', function(event) {
    console.log(event.target);
    if (event.target.classList.contains('overlay')) {
        closeModal();
    }
});


// Плавный скролл
(function() {
    const scrollLinks = document.querySelectorAll('a.scroll-link');

    for (let i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', function(event) {

            event.preventDefault();

            const id = scrollLinks[i].getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

        });
    }
})()