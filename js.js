 
var button = document.querySelector('#donate-btn');

if (button) {
    button.addEventListener('click', function() {
        console.log('Выведи этот текст в консоль если кнопка нажмется');
        alert('Благодарю за службу!');
    });
} else {
    console.error('Ошибка: кнопка не найдена. Проверь id в HTML.');
}