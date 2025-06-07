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
const taxPapers = document.querySelector('.taxpapers');
let deadCatObj;
//SCENE 3 VARS
const scene3Bg = document.querySelector('.scene3Bg');
const weddingPortrait = document.querySelector('.weddingPortrait');
let rightSideTable;
let leftSideTable;

let currentDirection = '';
let moving = false;
let currentScene;
let collisionObjsScene2;
let collisionObjsScene3;
const scale = 3.5;
let cat = {
    speed: 5,
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
        collisionObjsScene2 = objectLayer.objects;
        deadCatObj = objectLayer.objects[2];
        LivingRoomDrawerObj = objectLayer.objects[5];
    }
});
fetch('scene3.json')
.then(res=>res.json())
.then(mapData => {
    const objectLayer = mapData.layers.find(layer => layer.name === 'Object Layer 1');
    if (objectLayer && objectLayer.objects){
        collisionObjsScene3 = objectLayer.objects;
        rightSideTable = objectLayer.objects[4];
        leftSideTable = objectLayer.objects[5];
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
        context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
        //context.drawImage(scene1Bg, 0, 0, canvas.width, canvas.height);
        //scene1();
        //context.drawImage(catFront, cat.x, cat.y, cat.width, cat.width);
        ///context.drawImage(catFront, 580, 660, cat.width, cat.height);

        scene3();

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
    ]
    currentScene = 1;

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
            typewriter(text, scene1Lines[currentLine], 1, () => {
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
    const scene2Lines = [
        "Gosh, the living room smells of death. May Catricia rest in peace.",
        "Let's go investigate the body.",
        "From the looks of it, it seems as if she died from a slit throat. Minimal damage everywhere else.",
        "...",
        "Oh a gun! Hmm, it's registered under Catricia Calligan, perhaps she used it to defend herself?",
        "Let's look around the room a bit more.",
        "OMG... look what's in here.",
        "These seem to be tax evasion papers. Maybe the police officer Phatty was after her for the crime and went a little overboard.",
        "Let's go check the bedroom next."
    ]
    currentScene = 2;
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';

    textboxDiv.style.left = (canvas.width - 385) + 'px';
    textboxDiv.style.top = (canvas.offsetTop + canvas.height - textbox.offsetHeight) - 10 + 'px';
    textbox.style.width = '350px';
    textbox.style.height = '150px';
    text.style.width = '275px';
    text.style.height = '100px';
    text.style.bottom = '29px';
    text.style.fontSize = '19px';
    textboxBtn.style.left = ((textboxDiv.offsetWidth * 2) - 20) + 'px';
    textboxBtn.style.top = ((textboxDiv.offsetHeight * 2.5) + 25) + 'px';
    
    currentLine = 0;
    let checkDeadCatInterval;

    function nextLine(){
        if(currentLine <= 1){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        } 

        if(currentLine === 2) {
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none'; 
            window.addEventListener('keydown', direction); 

            checkDeadCatInterval = setInterval(() => {
                if (
                    cat.y == 455 && 
                    cat.x > deadCatObj.x &&
                    cat.x < deadCatObj.x + deadCatObj.width                    
                ) {
                    window.removeEventListener('keydown', direction); 
                    clearInterval(checkDeadCatInterval);
                    //LINE 2
                    textboxDiv.style.display = 'block';
                    textbox.style.display = 'block';
                    text.style.display = 'inline-block';

                    typewriter(text, scene2Lines[currentLine], 10, () => {
                        textboxBtn.style.display = 'block'; 
                        currentLine++; 
                    });  
                } 
            }, 10);
            return;
        }

        if(currentLine === 3 || currentLine === 4 || currentLine === 5){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            }); 
            return;
        }

        let checkAtDrawerInterval;
        if(currentLine === 6){
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            window.addEventListener('keydown', direction); 

            checkAtDrawerInterval = setInterval(() => {
                if (
                    cat.y == 225 && 
                    cat.x > 390 &&
                    cat.x < 500                
                ) {
                    window.removeEventListener('keydown', direction); 
                    clearInterval(checkAtDrawerInterval);
        
                    context.drawImage(taxPapers, 200, 200, 400, 400);
                    textboxDiv.style.display = 'block';
                    textbox.style.display = 'block';
                    text.style.display = 'inline-block';

                    typewriter(text, scene2Lines[currentLine], 10, () => {
                        textboxBtn.style.display = 'block'; 
                        currentLine++; 
                    });  
                }
            }, 10);
            return;
        }

        if(currentLine === 7){
            textboxBtn.style.display = 'none';
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(scene2Bg, 0, 0, canvas.width, canvas.height);
            context.drawImage(catFront, 400, 225, cat.width, cat.height);
            typewriter(text, scene2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            return;
        }

        if(currentLine === 8){
            textboxBtn.style.display = 'none';
            typewriter(text, scene2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            return;
        }

        fadeOverlay.style.display = 'block';
        fadeOverlay.style.opacity = '1';
        
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            text.innerText = '';
            textboxBtn.style.display = 'none';
            window.removeEventListener('keydown', direction); 
            context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
            context.drawImage(catFront, cat.x, cat.y, cat.width, cat.width);
            scene3();

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

    nextLine();
    textboxBtn.addEventListener('click', nextLine);
}
function scene3(){
    const scene3Lines = [
        'What a pleasant bedroom and wedding portrait.',
        'This seems to be her and her husband, Leonardo di Meowci, on their wedding day.',
        'However, recent files show that they divorced a year ago.',
        "Let's explore around a bit more, to the side table on the right.",
        'Looks like a newspaper article titled "di Meowci goes insane after wife gains success".',
        'Maybe her husband is still out there.',
        "Let's go to the left bedside table.",
        'OMG this must be the knife that the killer used to kill Patricia. Wonder why he left it here.',
        'aslfjwr'
    ];

    currentScene = 3;
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxDiv.style.width = '317px';
    textboxDiv.style.height = '350px';
    textboxDiv.style.left = '230px';
    textboxDiv.style.top = '370px';
    textbox.style.width = '350px';
    textbox.style.height = '150px';
    text.style.textAlign = 'center';
    text.style.top = '30%';
    text.style.width = '270px';
    text.style.height = '0px';
    text.style.fontSize = '19px';
    textboxBtn.style.display = 'block';
    textboxBtn.style.left = (textboxDiv.offsetWidth + 175) + 'px';
    textboxBtn.style.top = (textboxDiv.offsetHeight + 100) + 'px';

    currentLine = 0
    function nextLine(){
        if(currentLine === 0){
            textboxBtn.style.display = 'none';
            typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
                
        });  
            return;
        }
    if (currentLine === 1){
        setTimeout(()=>{
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
            context.drawImage(weddingPortrait, 200, 200, 400, 400);
        }, 1);

        setTimeout(()=>{
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
            cat.x = canvas.width - 220;
            cat.y = canvas.height - 140;
            cat.width = 90;
            cat.height = 90;
            context.drawImage(catFront, cat.x, cat.y, cat.width, cat.height); 
            textboxDiv.style.display = 'block';
            textbox.style.display = 'block';
            text.style.display = 'inline-block';
            textboxBtn.style.display = 'block'; 

            typewriter(text, scene3Lines[currentLine], 10, () => {
            textboxBtn.style.display = 'block'; 
            currentLine++; 
        });  
        }, 500);
            return;
        }

        if(currentLine === 2 || currentLine === 3){
            typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            }); 
            return;
        }

        if(currentLine === 4){
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
           
            window.addEventListener('keydown', direction);

            let rightSideTableInterval;
            rightSideTableInterval = setInterval(() => {
                if (
                    cat.y == 310 && 
                    cat.x > 580 &&
                    cat.x < 685                   
                ) {
                    window.removeEventListener('keydown', direction); 
                    clearInterval(rightSideTableInterval);
                    textboxDiv.style.display = 'block';
                    textbox.style.display = 'block';
                    text.style.display = 'inline-block';

                    typewriter(text, scene3Lines[currentLine], 10, () => {
                        textboxBtn.style.display = 'block'; 
                        currentLine++; 
                    });  
                } 
            }, 10);
            return;
        }

        if(currentLine === 5 || currentLine === 6){
            typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            return;
        }

        if(currentLine === 7){
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            textboxBtn.style.display = 'none';
           
            window.addEventListener('keydown', direction);

            let leftSideTableInterval;
            leftSideTableInterval = setInterval(() => {
                if (
                    cat.y == 310 && 
                    cat.x > 15 &&
                    cat.x < 105                 
                ) {
                    window.removeEventListener('keydown', direction); 
                    clearInterval(leftSideTableInterval);
                    textboxDiv.style.display = 'block';
                    textbox.style.display = 'block';
                    text.style.display = 'inline-block';

                    typewriter(text, scene3Lines[currentLine], 10, () => {
                        textboxBtn.style.display = 'block'; 
                        currentLine++; 
                    });  
                } 
            }, 10);
            return;
        }

        if(currentLine === 8){
            typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            return;
        }

        fadeOverlay.style.display = 'block';
        fadeOverlay.style.opacity = '1';
        
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            text.innerText = '';
            textboxBtn.style.display = 'none';
            window.removeEventListener('keydown', direction); 
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
    
    nextLine();
    textboxBtn.addEventListener('click', nextLine);
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
    let newX = cat.x + x * cat.speed;
    let newY = cat.y + y * cat.speed;

    if (newX < 0 || newX > canvas.width - cat.width) return;
    if (newY < 0 || newY > canvas.height - cat.height) return;
    
    let collisionObjs;
    let drawFunction;
    
    if(currentScene === 2){
        collisionObjs = collisionObjsScene2;
        drawFunction = drawScene2;
    }
    if(currentScene === 3){
        collisionObjs = collisionObjsScene3;
        drawFunction = drawScene3;
    }

    const collision = collisionObjs.some(obj =>
        newX < obj.x + obj.width &&
        newX + cat.width > obj.x &&
        newY < (obj.y + obj.height) - 30 &&
        newY + cat.height > obj.y
    );
    console.log(collision)
    if (!collision) {
        cat.x = newX;
        cat.y = newY;
        drawFunction(newX, newY);
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
function drawScene3(x, y){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
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
            break;
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