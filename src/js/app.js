import {Swiper, SwiperSlide } from 'swiper';
import { Pagination, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
//import { Fancybox } from "@fancyapps/ui";
//window.Fancybox = Fancybox;
//import "@fancyapps/ui/dist/fancybox.css";

document.addEventListener('DOMContentLoaded', () => {

    const mainSlider = new Swiper('.main-slider', {
        modules: [Pagination, Autoplay],
        //slidesPerView: "auto",
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 24,
        //loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        // touchRatio: 0.2,
        /*on: {
            slideChangeTransitionStart: function() {
                // Удаляем стили масштабирования
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                    slide.style.transform = 'scale(1)';
                });
                // Добавляем стили масштабирования для текущего слайда
                this.slides[this.activeIndex].style.transform = 'scale(1.2)'; // Увеличиваем активный слайд
            },
        },*/
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        // }
    })

    const catalogGallery = new Swiper(".catalog-gallery-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    const catalogGalleryThumbs = new Swiper(".catalog-gallery", {
        spaceBetween: 10,
        thumbs: {
            swiper: catalogGallery,
        },
    })


    document.querySelectorAll('.catalog-list__items').forEach((list) => {
        const items = list.querySelectorAll('li')
        const showMoreLink = list.querySelector('.catalog-list__show-more')

        if (items.length > 3 && showMoreLink) {
            const totalCount = items.length
            const remainingCount = totalCount - 3
            showMoreLink.textContent = `Ещё +${remainingCount}`

            // Изначально скрываем все, начиная с 4-го
            for (let i = 3; i < totalCount; i++) {
                if (!items[i].classList.contains('catalog-list__item-show-more')) {
                    items[i].style.display = 'none'
                }
            }

            showMoreLink.addEventListener('click', (e) => {
                e.preventDefault();

                if (!expanded) {
                    // Раскрываем все элементы
                    for (let i = 3; i < totalCount; i++) {
                        items[i].style.display = '';
                    }
                    // Меняем текст на "Свернуть"
                    showMoreLink.textContent = 'Свернуть';
                    expanded = true;
                } else {
                    // Снова скрываем все, кроме элементов с классом .catalog-list__item-show-more
                    for (let i = 3; i < totalCount; i++) {
                        if (!items[i].classList.contains('catalog-list__item-show-more')) {
                            items[i].style.display = 'none';
                        }
                    }
                    // Возвращаем исходный текст
                    showMoreLink.textContent = initialText;
                    expanded = false;
                }
            });
        }
    })
})