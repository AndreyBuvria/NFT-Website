const btnMenu = document.querySelector('.menu-btn');
const headerBanner = document.querySelector('.header-top__end');
const cardItems = document.querySelector('.card-list__items');

btnMenu.addEventListener('click', () => {
    headerBanner.classList.toggle('banner-active');
});

window.addEventListener('resize', (event) => {
   /* if(window.innerWidth < 480 && !cardItems.classList.contains('justify-content-center')) {
        cardItems.classList.add('justify-content-center');
        cardItems.classList.remove('justify-content-between');
    } else if(window.innerWidth > 480) {
        cardItems.classList.remove('justify-content-center');
        cardItems.classList.add('justify-content-between');
    }*/
});