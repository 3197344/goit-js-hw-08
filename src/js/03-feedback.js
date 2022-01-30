// Задание 3 - форма обратной связи
// В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей
//  в локальное хранилище когда пользователь что - то печатает.

// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект 
//    с полями email и message, в которых сохраняй текущие значения полей формы.


//    Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
//     заполняй ими поля формы.В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email,
//     message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
//    Для этого добавь в проект и используй библиотеку lodash.throttle.
import throttle from 'lodash.throttle';

const inputEmailEl = document.querySelector('input');
const inputMessageEl = document.querySelector('textarea');
const formEl = document.querySelector('form');


formEl.addEventListener('input', throttle(inLocalStoradge, 500));
formEl.addEventListener('submit', onSubmitForm);

// Проверяем localStorage на наличие данных

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = JSON.parse(savedData);

if (parsedData) {
  inputEmailEl.value = parsedData.email;
  inputMessageEl.value = parsedData.message;
}

console.log(localStorage);

// записываем данные, введенные пользователем в localStorage

function inLocalStoradge() {
    const email = inputEmailEl.value;
    const message = inputMessageEl.value;
    localStorage.setItem('feedback-form-state', JSON.stringify({ email, message }));
}

function onSubmitForm(event) {
    event.preventDefault();
    const email = event.currentTarget.elements.email.value;
    const message = event.currentTarget.elements.message.value;
    
    // console.log(event.currentTarget.elements.email.value);
    // console.log(event.currentTarget.elements.message.value);

    // если есть незаполненное поле - надо вывести сообщение пользователю
    if (email === "" || message === "") {
    return alert('Пожалуйста, заполните все поля');
}

    const objectData = {
    message,
    email,
    };
    console.log(objectData);

  // Очищаем localStorage и форму от данных
    localStorage.removeItem('feedback-form-state');
    formEl.reset();
}