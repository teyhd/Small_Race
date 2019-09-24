var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

var arr = [];//Поле
let speed = 1000;
let last_speed; //Отслеживание обновление скорости
var score; //Очки
var counter=0; //Увеличение скорости
const MaxY = 500;
const MaxX = 300;
const step = 20; //Размер клетки
let CarX = 7;
let CarY = 20;
let drawed = []; //Стек отрисовки
let car = [0,1,-1,1,1,1,0,2,1,3,-1,3];
let boards = [
    [1,0,2,0,3,0],
    [1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0],
    [1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0],
    [1,0,2,0,3,0,4,0,5,0,6,0,7,0],
    [1,0,2,0,3,0,4,0,5,0,6,0],
    [0,1,-1,1,1,1,0,2,1,3,-1,3],
    [1,0,2,0,3,0,4,0],
    [1,0,2,0,3,0],
    [1,0,2,0],
    [1,0,2,0,3,0,4,0,5,0],
    [1,0,2,0,2,1],
];//Координаты препятствий 

var div=$(".score_div");// элемент отслеживание очков
var num=$("#sc_n"); // числовое значение очков
var but = $("#button-name");
div.offset({top:515, left:120});
but.offset({top:235, left:130});

$(document).ready(function() { 

 but.on('click', function() {
    start_game();
    but.hide();
});

});