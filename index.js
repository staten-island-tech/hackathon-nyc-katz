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
//ETC
const textbox = document.querySelector('.textbox');
const textboxDiv = document.querySelector('.textboxDiv');
const text = document.querySelector('.text');
const textboxBtn = document.querySelector('.textboxBtn');
const fadeOverlay = document.querySelector('.fadeOverlay');
const timeoutTime = 10000;

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
    }, 200);
})
function scene1(){
    const scene1Lines = [
    "This is Detective Pussycat. Right now I am in front of a recently murdered cat's house. This murder occurred in upper east Paw City.",
    "Her name was Catricia Calligan, and she owned a flower shop in mid Paw City. She was an active member of the Cathatten country club.",
    "We are about to enter her house, where the crime has been reported by her neighbor, Pawshley Catsmith."]
    
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
            typewriter(text, scene1Lines[currentLine], 45, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        } else {
            textboxBtn.style.display = 'none';
            scene2();
        } 
    }

    nextLine();
    textboxBtn.addEventListener('click', nextLine);
}
function scene2(){
    fadeOverlay.style.display = 'block';
    fadeOverlay.style.opacity = '1';
    
    setTimeout(() => {
       context.clearRect(0, 0, canvas.width, canvas.height);
        textboxDiv.style.display = 'none';
        textbox.style.display = 'none';
        text.style.display = 'none';
        textboxBtn.style.display = 'none';
        context.drawImage(scene2Bg, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
            fadeOverlay.style.opacity = '.5';
        }, 400)

        fadeOverlay.style.opacity = '0';

        setTimeout(() => {
            fadeOverlay.style.display = 'none';
        }, 400)
    }, 200);

    
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