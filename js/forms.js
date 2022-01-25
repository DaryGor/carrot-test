// Маска для телефона

var selector = document.querySelectorAll("input[type='tel']");

var im = new Inputmask("+7(999)-999-99-99");

im.mask(selector);


// Валидация формы

function Validation() {
    const form = document.querySelectorAll('.form')

    form.forEach(e => {
        const reqInputs = e.querySelectorAll('.form__input--req');
        reqInputs.forEach(element => {
            element.addEventListener('change', () => {
                formValidate(e);
            })
        })
    })

    function formValidate(form) {
        let error = 0;
        const formReq = form.querySelectorAll('.form__input--req');
        const spanReq = form.querySelectorAll('.form__tooltip');
        const button = form.querySelector('.form-modal__btn');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            const span = spanReq[i];
            formRemoveError(input);
            formRemoveTooltip(span);

            if (input === '' || error === 0) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }

            if(input.getAttribute('name') === 'name') {
                if (!validateText(input.value)) {
                    formAddError(input);
                    formAddTooltip(span);
                    error++;
                } 
            };

            if (input.getAttribute('type') === 'tel') {
                if (!validatePhone(input.value.replace(/[^\d]/g, ''))) {
                    formAddError(input);
                    formAddTooltip(span);
                    error++;
                } 
            };

            if (input.getAttribute('type') === 'mailto') {
                if (!validateEmail(input.value)) {
                    formAddError(input);
                    formAddTooltip(span);
                    error++;
                } 
            };
        }
        return error;
    }
}

    function formAddError(input) {
        input.classList.add('form__input--error');
    }

    function formRemoveError(input) {
        input.classList.remove('form__input--error');
    }

    function formAddTooltip(span) {
        span.classList.add('form__tooltip--error');
    }

    function formRemoveTooltip(span) {
        span.classList.remove('form__tooltip--error');
    }

    function validateText(item) {
        let reg = /(?:[a-zA-Zа-яА-Я']\s?)+$/u;
        return reg.test(item);
    }

    function validatePhone(item) {
        let reg =/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\.\0-9]*$/g;
        return reg.test(item) && item.length === 11
    }

    function validateEmail(item) {
        let reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/;
        return reg.test(item);
    }

Validation();
