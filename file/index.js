const canvas = document.querySelector('.gameCanvas');
const context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const startBg = document.querySelector('.startBg');
const scene1Bg = document.querySelector('.scene1Bg');

window.onload = function(){
    context.drawImage(startBg, 0, 0, canvas.width, canvas.height);
}