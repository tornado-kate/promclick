import {Swiper, SwiperSlide } from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
})