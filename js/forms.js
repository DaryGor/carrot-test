// Маска для телефона

var selector = document.querySelectorAll("input[type='tel']");

var im = new Inputmask("+7(999)-999-99-99");

im.mask(selector);

// Валидация формы

function formValidate() {
    let error = 0;
    let array = [];
    const formReq = document.querySelectorAll('.form__input--req');

    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);
        formRemoveDone(input);
        
        input.addEventListener('input', function() {
            if (input.getAttribute('type') === 'tel') {
                if (!validatePhone(input.value.replace(/[^\d]/g, ''))) {
                    formRemoveDone(input);
                    formAddError(input);
                    error++;
                } else {
                    formRemoveError(input);
                    formAddDone(input);
                }
            };
        })
        array = [error, input.value];
        return array;
    }
    return array;
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

function formRemoveDone(input) {
    input.classList.remove('form__input--done');
}

function validatePhone(item) {
    let reg = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\.\0-9]*$/g;
    return reg.test(item) && item.length === 11
}

// Отрисовка нового контента - состояние Спасибо
const newContent = () => {
    let container = document.querySelector('.modal__wrapper');
    let form = document.querySelector('.modal__form')
    let title = document.querySelector('.modal__title');
    let text = document.querySelector('.modal__text');

    form.innerHTML = '';
    container.classList.add('modal__wrapper--center')
    title.textContent = 'Спасибо!';
    text.textContent = 'В будете первым кто узнает о новой коллекции!';
}

// Отправка формы

const formSubmit = () => {
    let array;
    const form = document.getElementById('form');
    const modal = document.getElementById('modal');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        array = formValidate();
        let error = array[0];
        let inputValue = array[1];

        if (error === 0) {
            // Здесь я не учитываю, что окно будет открываться повторно и не возвращаю форму назад
            newContent();

            setTimeout(function (){
                modal.classList.remove('modal--active');
            }, 5000)

            console.log(`Пользователь отправил форму! ${inputValue}`);
        } else {
            error = 0;
        }
    })
}


formSubmit();
formValidate();