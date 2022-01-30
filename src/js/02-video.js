// 7. Добавь в проект бибилотеку lodash.throttle и сделай так, 
// чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

//1.Ознакомься с документацией библиотеки Vimeo плеера. 
    // player.on('play', function() {
    //     console.log('played the video!');
    // });

    // player.getVideoTitle().then(function(title) {
    //     console.log('title:', title);
    // });

// Разбери документацию метода on() и начни отслеживать событие timeupdate - 
// обновление времени воспроизведения.

// Сохраняй время воспроизведения в локальное хранилище. 
// Пусть ключом для хранилища будет строка.

const onPlayTime = function (data) {
localStorage.setItem("videoplayer-current-time", JSON.stringify(data));
};

console.log(onPlayTime);
// При перезагрузке страницы воспользуйся методом setCurrentTime() 
// для того чтобы возобновить воспроизведение с сохраненной позиции.
    player.on('timeupdate', throttle(onPlayTime, 1000)); // обновление 1 раз в 1 секунду

const savedTime = localStorage.getItem("videoplayer-current-time");
// console.log(savedTime);
const parsedTime = JSON.parse(savedTime);
// console.log(parsedTime);
//  

if (parsedTime.seconds === 571.563) {
    localStorage.removeItem('videoplayer-current-time'); //  удаляем с локалстор
} else {
    player
    .setCurrentTime(parsedTime.seconds)
        .then(function (seconds) {
        console.log("seconds = the actual time that the player seeked to") 
    })
    .catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            console.log("RangeError")
            break;

        default:
            console.log("some other error occurred") 
            break;
        }
    });
}
//  пример setCurrentTime(seconds: number): Promise<number, (RangeError|Error)>
// player.setCurrentTime(30.456).then(function(seconds) {
//     // seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//             // the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//             // some other error occurred
//             break;
//     }
// });