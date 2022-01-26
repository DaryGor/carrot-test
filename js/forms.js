// Маска для телефона

var selector = document.querySelectorAll("input[type='tel']");

var im = new Inputmask("+7(999)-999-99-99");

im.mask(selector);

// Валидация формы

function formValidate(form) {
    let error = 0;
    const formReq = document.querySelectorAll('.form__input--req');

    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.getAttribute('type') === 'tel') {
            if (!validatePhone(input.value.replace(/[^\d]/g, ''))) {
                formAddError(input);
                error++;
            } else {
                error = 0;
            }
        };

        if (error === 0) {
            formAddDone(input);
        }
    }
    return error;
}

function formAddError(input) {
    input.classList.add('form__input--error');
}

function formAddDone(input) {
    input.classList.add('form__input--done');
}

function formRemoveError(input) {
    input.classList.remove('form__input--error');
}

function validatePhone(item) {
    let reg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\.\0-9]*$/g;
    return reg.test(item) && item.length === 11
}

// Отправка формы

function sandForm() {
    const form = document.querySelector('.modal__form');
    let error = formValidate(form);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (error === 0) {
            console.log('Пользователь ответил в попап');
        } else {
            console.log('Пользователь некорректно заполнил форму');
        }
    });
}

sandForm();