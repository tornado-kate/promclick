import {Swiper, SwiperSlide } from 'swiper';
import { Pagination, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/controller'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css';

window.Fancybox = Fancybox

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body
    const toggleMegaMenu = document.querySelector('.header__toggle-menu')
    const megaMenu = document.querySelector('.mega-menu')
    const headerBtnSearch = document.querySelector('.header__btn-search')
    const topSearch = document.querySelector('.top-search')
    const topSearchClose = document.querySelector('.top-search__close')
    const topSearchInput = document.querySelector('.form-search__input')
    const topSearchBtn = document.querySelector('.form-search__btn')

    document.querySelectorAll("[data-fancybox-ajax]").forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault()
            console.log(element.getAttribute('href'))

            Fancybox.show([{
                src: element.getAttribute('href'),
                type: 'ajax',
                //preload: false, // отключает предварительную загрузку
                //groupAttr: false,
                //mainClass: 'popup',
                //autoFocus: false,
                //dragToClose: false,
                //closeButton: false,
                // Можно указать дополнительные опции, например, обработчики событий
                on: {
                    reveal: (fancybox, slide) => {
                        console.log("Fancybox открылся")
                    }
                }
            }])
        })
    })

    topSearchInput.addEventListener('focus', () => {
        topSearchBtn.classList.add('is-focused')
    })

    headerBtnSearch.addEventListener('click', () => {
        topSearch.classList.add('is-active')
    })

    topSearchClose.addEventListener('click', () => {
        topSearch.classList.remove('is-active')
        topSearchBtn.classList.remove('is-focused')
    })

    toggleMegaMenu.addEventListener('click', () => {
        toggleMegaMenu.classList.toggle('is-active')
        megaMenu.classList.toggle('is-active')
        body.classList.toggle('no-scroll')
        document.documentElement.classList.toggle('no-scroll')
    })

    const menuItems = document.querySelectorAll('.mm-navbar__item')
    const contentItems = document.querySelectorAll('.mega-menu__item')

    if (menuItems.length > 0 && contentItems.length > 0) {
        menuItems[0].classList.add('is-active')
        contentItems.forEach(content => {
            if (content.getAttribute('data-content') === menuItems[0].getAttribute('data-navbar')) {
                content.style.display = 'block'
            } else {
                content.style.display = 'none'
            }
        });
    }
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const targetTab = item.getAttribute('data-navbar')

            // Удаляем активный класс у всех пунктов (если есть)
            menuItems.forEach(i => i.classList.remove('is-active'))
            // Добавляем активный класс текущему
            item.classList.add('is-active')

            // Переключение контентов
            contentItems.forEach(content => {
                if (content.getAttribute('data-content') === targetTab) {
                    content.style.display = 'block' // показываем нужный
                } else {
                    content.style.display = 'none' // скрываем остальные
                }
            })
        })
    })

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

    const mainNewsSlider = new Swiper('.main-news-slider', {
        slidesPerView: "auto",
        spaceBetween: 12,
    })

    const mainPromoSlider = new Swiper('.main-promo-slider', {
        slidesPerView: "auto",
        spaceBetween: 12,
    })

    const catalogGalleryThumbs = new Swiper(".catalog-gallery-thumbs", {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        //watchSlidesProgress: true,
        slideToClickedSlide: true
    })
    const catalogGallery = new Swiper('.catalog-gallery', {
        slidesPerView: 1,
        spaceBetween: 0,
        modules: [Thumbs],
        thumbs: {
            swiper: catalogGalleryThumbs,
        },
    })


    document.querySelectorAll('.catalog-section__items').forEach((list) => {
        const items = list.querySelectorAll('li')
        const showMoreLink = list.querySelector('.catalog-section__show-more')

        if (items.length > 3 && showMoreLink) {
            const totalCount = items.length
            const remainingCount = totalCount - 4
            const initialText = `Ещё ${remainingCount}`
            showMoreLink.textContent = initialText

            // Изначально скрываем все, начиная с 4-го
            for (let i = 3; i < totalCount; i++) {
                if (!items[i].classList.contains('catalog-section__item-show-more')) {
                    items[i].style.display = 'none'
                }
            }

            let expanded = false

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
                        if (!items[i].classList.contains('catalog-section__item-show-more')) {
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


    const tabs = document.querySelectorAll('.nav-tabs__item')
    const contents = document.querySelectorAll('.tab-content')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab')

            tabs.forEach(t => t.classList.remove('is-active'))
            contents.forEach(c => c.classList.remove('is-active'))

            tab.classList.add('is-active')

            document.getElementById(target).classList.add('is-active')
        })
    })
})