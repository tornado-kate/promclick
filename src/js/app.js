import {Swiper, SwiperSlide } from 'swiper'
import { Pagination, Autoplay, Thumbs } from 'swiper/modules'
import 'swiper/css/free-mode'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/controller'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { initForms, initFancyForm } from './components/form-helper'
window.Fancybox = Fancybox

document.addEventListener('DOMContentLoaded', () => {
    let forms = document.querySelectorAll('.form-validation')
    forms.forEach((form) => initForms(form))

    document.querySelectorAll('[data-fancybox-ajax]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            initFancyForm(e.currentTarget.href)
        })
    })

    const body = document.body
    const toggleMegaMenu = document.querySelector('.header__toggle-menu')
    const megaMenu = document.querySelector('.mega-menu')
    const headerBtnSearch = document.querySelector('.header__btn-search')
    const topSearch = document.querySelector('.top-search')
    const topSearchClose = document.querySelector('.top-search__close')
    const topSearchInput = document.querySelector('.form-search__input')
    const topSearchBtn = document.querySelector('.form-search__btn')
    const filterOpenBtn = document.querySelector('.catalog-filter__btn-open')
    const filterCloseBtn = document.querySelector('.catalog-filter__mobile-close')
    const tabs = document.querySelectorAll('.nav-tabs__item')
    const tabsContents = document.querySelectorAll('.tab-content')


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

// Работа с пунктами меню
    const menuWrappers = document.querySelectorAll('.mm-navbar__item')

// Инициализация - первый пункт активен
    if (menuWrappers.length > 0) {
        menuWrappers[0].classList.add('is-active')
    }

// Обработчики событий
    menuWrappers.forEach(wrapper => {
        const link = wrapper.querySelector('.mm-navbar__link')

        // Наведение мыши
        wrapper.addEventListener('mouseenter', () => {
            menuWrappers.forEach(w => w.classList.remove('is-active'))
            wrapper.classList.add('is-active');
        });

        // Клик (для мобильных устройств)
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Если уже активен - скрываем
            if (wrapper.classList.contains('is-active')) {
                wrapper.classList.remove('is-active');
            } else {
                // Иначе показываем только этот пункт
                menuWrappers.forEach(w => w.classList.remove('is-active'));
                wrapper.classList.add('is-active');
            }
        });
    });

    // toggleMegaMenu.addEventListener('click', () => {
    //     toggleMegaMenu.classList.toggle('is-active')
    //     megaMenu.classList.toggle('is-active')
    //     body.classList.toggle('no-scroll')
    //     document.documentElement.classList.toggle('no-scroll')
    // })
    //
    // const menuItems = document.querySelectorAll('.mm-navbar__item')
    // const contentItems = document.querySelectorAll('.mega-menu__item')
    //
    // if (menuItems.length > 0 && contentItems.length > 0) {
    //     menuItems[0].classList.add('is-active')
    //     contentItems.forEach(content => {
    //         if (content.getAttribute('data-content') === menuItems[0].getAttribute('data-navbar')) {
    //             content.style.display = 'block'
    //         } else {
    //             content.style.display = 'none'
    //         }
    //     });
    // }
    //
    // menuItems.forEach(item => {
    //     item.addEventListener('mouseenter', () => {
    //         const targetTab = item.getAttribute('data-navbar')
    //
    //         // Удаляем активный класс у всех пунктов (если есть)
    //         menuItems.forEach(i => i.classList.remove('is-active'))
    //         // Добавляем активный класс текущему
    //         item.classList.add('is-active')
    //
    //         // Переключение контентов
    //         contentItems.forEach(content => {
    //             if (content.getAttribute('data-content') === targetTab) {
    //                 content.style.display = 'block' // показываем нужный
    //             } else {
    //                 content.style.display = 'none' // скрываем остальные
    //             }
    //         })
    //     })
    // })

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

    if (filterOpenBtn) {
        filterOpenBtn.addEventListener('click', () => {
            document.querySelector('.catalog-filter__items').classList.toggle('is-active')
            body.classList.toggle('body-is-hidden')
        })

        filterCloseBtn.addEventListener('click', () => {
            document.querySelector('.catalog-filter__items').classList.remove('is-active')
            body.classList.remove('body-is-hidden')
        })
    }

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


    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab')

            tabs.forEach(t => t.classList.remove('is-active'))
            tabsContents.forEach(c => c.classList.remove('is-active'))

            tab.classList.add('is-active')

            document.getElementById(target).classList.add('is-active')
        })
    })
})