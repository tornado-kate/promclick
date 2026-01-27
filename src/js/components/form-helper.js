import IMask from 'imask'

export function initFancyForm(link = '') {
    Fancybox.show(
        [
            {
                src: link,
                type: 'ajax'
            },
        ],
        {
            //preload: false, // отключает предварительную загрузку
            //groupAttr: false,
            //mainClass: 'popup',
            autoFocus: false,
            //dragToClose: false,
            closeButton: false,
            on: {
                "Carousel.contentReady": (fancyboxRef, carouselRef, slide) => {
                    const form = slide.el.querySelector('form')

                    initForms(form, function () {
                        fancyboxRef.close()
                    })
                }
            }
        }
    )
}
export function initForms(form) {
    //initFormValidation(form)

    initPhoneMask('[data-field=phone]')
    initInnMask('[data-field=inn]')

    toggleContactFields()
}

function initFormValidation(form) {
    if (!form) return

    const requiredFields = form.querySelectorAll('[required]')
    const submitBtn = form.querySelector('button[type="submit"]')

    // Функция проверки одного поля
    function validateField(field) {
        const value = field.value.trim()
        const isValid = value !== ''

        // Убираем старые классы ошибок
        field.classList.remove('form-error')

        // Добавляем соответствующий класс
        if (!isValid && field.required) {
            field.classList.add('form-error')
            return false
        }

        return isValid
    }

    // Функция проверки всей формы
    function validateForm() {
        let isValid = true

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false
            }
        })

        return isValid
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        // Проверяем всю форму
        const isValid = validateForm()

        if (isValid) {
            console.log('Форма валидна, отправляем...')
        }
    })
}


function initPhoneMask(el) {
    const phones = document.querySelectorAll(el)

    phones.forEach(phone => {
        return IMask(phone, {
            mask: '+7 000 000-00-00',
            prepare: (val, masked) => !masked.value && val === '8' ? "" : val
        })
    })
}


function initInnMask(el) {
    if (!el) return

    const inns = document.querySelectorAll(el)

    inns.forEach(inn => {
        return IMask(inn, {
            mask: '00000000',
            prepare: function (value, masked) {
                return value.replace(/\D/g, '')
            }
        })
    })
}


function toggleContactFields() {
    const phoneInput = document.getElementById('phone')
    const emailInput = document.getElementById('email')
    const phoneGroup = document.querySelector('.form-group--phone')
    const emailGroup = document.querySelector('.form-group--email')
    const radios = document.querySelectorAll('input[name="type"]')

    if (!phoneInput || !emailInput || !radios.length) return

    function updateFields(isPhone) {
        phoneGroup.classList.toggle('is-active', isPhone)
        emailGroup.classList.toggle('is-active', !isPhone)

        // Required
        phoneInput.required = isPhone
        emailInput.required = !isPhone

        if (isPhone) {
            emailInput.value = ''
            emailInput.setCustomValidity('')
            emailInput.classList.remove('error', 'valid')
        } else {
            phoneInput.value = ''
            phoneInput.setCustomValidity('')
            phoneInput.classList.remove('error', 'valid')
        }
    }

    function onRadioChange(e) {
        const isPhone = e.target.closest('label').textContent.includes('телефон')
        updateFields(isPhone)

        // Фокус после переключения
        setTimeout(() => {
            (isPhone ? phoneInput : emailInput).focus()
        }, 100)
    }

    radios.forEach(radio => {
        radio.addEventListener('change', onRadioChange)
    })
}