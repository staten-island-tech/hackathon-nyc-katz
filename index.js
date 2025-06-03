//STARTING PAGE VARS
const canvas = document.querySelector('.gameCanvas');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
const startBg = document.querySelector('.startBg');
const playBtn = document.querySelector('.playBtn');
const playSpan = document.querySelector('.playSpan');
const playBtnBg = document.querySelector('.playBtnBg');
//SCENE 1 VARS
const scene1Bg = document.querySelector('.scene1Bg');
//SCENE 2 VARS
const scene2Bg = document.querySelector('.scene2Bg');
const catFront = document.querySelector('.catFront');
const catRight = document.querySelector('.catRight');
const catLeft = document.querySelector('.catLeft');
const catBack = document.querySelector('.catBack');
let currentDirection = '';
let moving = false;
let collisonObjs;
const scale = 2;
let cat = {
    speed: 3,
    x: 260,
    y: 300,
    width: 32 * scale,
    height: 32 * scale
};
fetch('scene2.json')
.then(res => res.json())
.then(mapData => {
const objectLayer = mapData.layers.find(layer => layer.name === "Object Layer 1");
    if (objectLayer && objectLayer.objects) {
        collisonObjs = objectLayer.objects;    
    }
});

//ETC
const textbox = document.querySelector('.textbox');
const textboxDiv = document.querySelector('.textboxDiv');
const text = document.querySelector('.text');
const textboxBtn = document.querySelector('.textboxBtn');
const fadeOverlay = document.querySelector('.fadeOverlay');
const timeoutTime = 10000;
let overlayCount = 0;

window.onload = function(){
    context.drawImage(startBg, 0, 0, canvas.width, canvas.height);
    playBtn.style.display = 'block';
    playSpan.style.display = 'inline-block';
    playBtnBg.style.display = 'block';
    playBtn.style.left = (canvas.width / 2) + 'px';
    playBtn.style.top = (canvas.height / 1.73) + 'px';
}
playBtn.addEventListener('click', () => {
    fadeOverlay.style.display = 'block';
    fadeOverlay.style.opacity = '1';

    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        playBtn.style.display = 'none';
        playSpan.style.display = 'none';
        playBtnBg.style.display = 'none';
        context.drawImage(scene1Bg, 0, 0, canvas.width, canvas.height);
        scene1();

        setTimeout(() => {
            fadeOverlay.style.opacity = '.5';
        }, 400)

        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.display = 'none';
        }, 400)

        overlayCount++;
    }, 200);
})
function scene1(){
    const scene1Lines = [
    "This is Detective Pussycat. Right now I am in front of a recently murdered cat's house. This murder occurred in upper east Paw City.",
    "Her name was Catricia Calligan, and she owned a flower shop in mid Paw City. She was an active member of the Cathatten country club.",
    "We are about to enter her house, where the crime has been reported by her neighbor, Pawshley Catsmith."
    ];
    
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    
    textboxBtn.style.left = textboxDiv.offsetWidth + 45 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 75) + 'px';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    let currentLine = 0;
    function nextLine(){
        if(currentLine < scene1Lines.length){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene1Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        } else {
            textboxBtn.style.display = 'none';
            fadeOverlay.style.display = 'block';
            fadeOverlay.style.opacity = '1';
            
            setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
            context.drawImage(scene2Bg, 0, 0, canvas.width, canvas.height);
            context.drawImage(catFront, cat.x, cat.y, cat.width, cat.width);
            scene2();

            setTimeout(() => {
                fadeOverlay.style.opacity = '.5';
            }, 400)

            fadeOverlay.style.opacity = '0';

            setTimeout(() => {
                fadeOverlay.style.display = 'none';
            }, 400)

            overlayCount++;
        }, 200);
           
        } 
    }

    nextLine();
    textboxBtn.addEventListener('click', nextLine);
}
function scene2(){
    window.addEventListener('keydown', direction);
}
function direction(e){
    switch(e.key){
        case "ArrowUp":
            if(currentDirection !== 'ArrowDown') {
                currentDirection = 'up';
                move(0, -1);
            }
            break;
        case "ArrowDown":
            if(currentDirection !== 'ArrowUp') {
                currentDirection = 'down';
                move(0, 1);
            }
            break;
        case "ArrowLeft":
            if(currentDirection !== 'ArrowRight') {
                currentDirection = 'left';
                move(-1, 0);
            }
            break;
        case "ArrowRight":
            if(currentDirection !== 'ArrowLeft'){
                currentDirection = 'right';
                move(1, 0); 
            } 
            break;
    }
}
function move(x, y){
    console.log(collisonObjs);
    let newX = cat.x + x * cat.speed;
    let newY = cat.y + y * cat.speed;

    if (newX < 0 || newX > canvas.width - cat.width) return;
    if (newY < 0 || newY > canvas.height - cat.height) return;
    
    const collision = collisonObjs.some(obj =>
        newX < obj.x + obj.width &&
        newX + cat.width > obj.x &&
        newY < obj.y + obj.height &&
        newY + cat.height > obj.y
    );

    if (!collision) {
        cat.x = newX;
        cat.y = newY;
        drawScene2(newX, newY);
    }
    else {
    console.log("Blocked by object:", collision);
    console.log("Cat bounds:", {
        left: newX,
        right: newX + cat.width,
        top: newY,
        bottom: newY + cat.height
    });
}
}
function drawScene2(x, y){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(scene2Bg, 0, 0, canvas.width, canvas.height);
    switch(currentDirection){
        case 'up':
            context.drawImage(catBack, x, y, cat.width, cat.height);
            console.log(x, y);
            break;
        case 'left':
            context.drawImage(catLeft, x, y, cat.width, cat.height);
            console.log(x, y);
            break;
        case 'right':
            context.drawImage(catRight, x, y, cat.width, cat.height);
            console.log(x, y);
            break;
        case 'down':
            context.drawImage(catFront, x, y, cat.width, cat.height);
            console.log(x, y);
            break
    }
}
function typewriter(element, text, speed, callback) {
    let i = 0;
    element.innerText = "";
    const interval = setInterval(() => {
        element.innerText += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}