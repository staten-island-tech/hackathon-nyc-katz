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
const textbox = document.querySelector('.textbox');
const textboxDiv = document.querySelector('.textboxDiv');
const text = document.querySelector('.text');

const fadeOverlay = document.querySelector('.fadeOverlay');
const timeoutTime = 5000;

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
    let line1 = "Her name was Catricia Calligan, and she owned a flower shop in mid Paw City. She was an active member of the Cathatten country club.";
    let line2 = "We are about to enter her house, where the crime has been reported by her neighbor, Pawshley Catsmith.";
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.35) + 'px';

    typeWriter(text, "This is Detective Pussycat. Right now I am in front of a recently murdered cat's house. This murder occurred in upper east Paw City.", 35, () => {
        setTimeout(() => {
            typeWriter(text, line1, 35);
        }, 500);
    });
    typeWriter(text, line2, 35, () => {
        setTimeout(() => {
            typeWriter(text, line2, 35);
        }, 1000);
    });

    /*setTimeout(()=>{
        text.innerText =
    }, timeoutTime);
    setTimeout(()=>{
        text.innerText = 
    }, timeoutTime * 2);*/
}
function typeWriter(element, text, speed = 50, callback = null) {
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