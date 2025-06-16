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
const knife = document.querySelector('.knife');
const newspaper = document.querySelector('.newspaper');
let rightSideTable;
let leftSideTable;
//SCENE 4 VARS
const scene4Bg = document.querySelector('.scene4Bg');
//SCENE 5 VARS
const scene5Bg = document.querySelector('.scene5Bg');
//SCENE 6 VARS
const scene6Bg = document.querySelector('.scene6Bg');
const scene6HalfBg = document.querySelector('.scene6HalfBg');
//SCENE 7 VARS
const scene7Bg = document.querySelector('.scene7Bg');
const scene7HalfBg = document.querySelector('.scene7HalfBg');
const subwayBg = document.querySelector('.subwayBg');
const subwayImg = document.querySelector('.subwayImg');
const Leonardo = document.querySelector('.leonardo');
//SCENE 7 VARS
const scene8Bg = document.querySelector('.scene8Bg');
const whiteBg = document.querySelector('.whiteBg');
const suspect1Btn = document.querySelector('.suspectBtn1')
const suspect1Bg = document.querySelector('.suspect1Bg');
const suspect1HS = document.querySelector('.suspect1Headshot');
const suspect1Span = document.querySelector('.suspect1Span');
const suspect2Btn = document.querySelector('.suspectBtn2');
const suspect2Bg = document.querySelector('.suspect2Bg');
const suspect2HS = document.querySelector('.suspect2Headshot');
const suspect2Span = document.querySelector('.suspect2Span');
const suspect3Btn = document.querySelector('.suspectBtn3')
const suspect3Bg = document.querySelector('.suspect3Bg');
const suspect3HS = document.querySelector('.suspect3Headshot');
const suspect3Span = document.querySelector('.suspect3Span');
const suspectChoose1 = document.querySelector('#suspect1');
const suspectChoose2 = document.querySelector('#suspect2');
const suspectChoose3 = document.querySelector('#suspect3');
const suspect1JailBg = document.querySelector('.suspect1Jail');
const suspect2JailBg = document.querySelector('.suspect2Jail');
const suspect3JailBg = document.querySelector('.suspect3Jail');
const blackBg = document.querySelector('.blackScreen');
const endText = document.querySelector('.endText');
const endDiv = document.querySelector('.endDiv');
//ETC
const sound = new Howl({
    src: ['static/music.mp3'],
    volume: 0.1
});

function playMusic(){ sound.play(); }
const textbox = document.querySelector('.textbox');
const textboxDiv = document.querySelector('.textboxDiv');
const text = document.querySelector('.text');
const textboxBtn = document.querySelector('.textboxBtn');
const fadeOverlay = document.querySelector('.fadeOverlay');
const timeoutTime = 10000;
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

window.onload = function(){
    context.drawImage(startBg, 0, 0, canvas.width, canvas.height);
    playBtn.style.display = 'block';
    playSpan.style.display = 'inline-block';
    playBtnBg.style.display = 'block';
    playBtn.style.left = (canvas.width / 2) + 'px';
    playBtn.style.top = (canvas.height / 1.73) + 'px';
}
playBtn.addEventListener('click', () => {
    transitionToScene(scene8, scene8Bg);
    playMusic();
    playBtn.style.display = 'none';
})
function transitionToScene(sceneFunction, sceneBackground) {
  fadeOverlay.style.display = 'block';
  fadeOverlay.style.opacity = '1';

  setTimeout(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(sceneBackground, 0, 0, canvas.width, canvas.height);
    sceneFunction();

    setTimeout(() => {
      fadeOverlay.style.opacity = '.5';
    }, 400);

    fadeOverlay.style.opacity = '0';

    setTimeout(() => {
      fadeOverlay.style.display = 'none';
      
    }, 400);

  }, 200);
}
function scene1(){
    let currentLine = 0;
    const scene1Lines = [
    "This is Detective Pussycat. Right now I am in front of a recently murdered cat's house. This murder occurred in upper east Cat City.",
    "Her name was Catricia Calligan, and she owned a flower shop in mid Cat City. She was an active member of the Cathatten country club.",
    "We are about to enter her house, where the crime has been reported by her neighbor, Catfinny Catsmith."
    ]
    currentScene = 1;
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    
    textboxBtn.style.left = textboxDiv.offsetWidth + 50 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 190) + 'px';
    text.style.top = '30%';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    function nextLine(){
        if(currentLine === 0 || currentLine === 1 || currentLine === 2){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene1Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        } else {
            textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene2, scene2Bg);
        } 
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene2(){
    context.drawImage(catFront, 260, 300, cat.width, cat.height);
    let currentLine = 0;
    text.innerText = '';
    currentScene = 2;
    const scene2Lines = [
        "Gosh, the living room smells of death. May Catricia rest in peace.",
        "Let's go investigate the body.",
        "From the looks of it, she died from a slit throat. Minimal damage everywhere else.",
        "...",
        "Oh a gun! Hmm, it's registered under Catricia Calligan, perhaps she used it to defend herself?",
        "Let's look around the room a bit more.",
        "OMG... look what's in here.",
        "These seem to be tax evasion papers. Maybe the police officer Phatty was after her for the crime and went a little overboard.",
        "Let's go check the bedroom next."
    ];
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';

    textboxDiv.style.left = (canvas.width - 385) + 'px';
    textboxDiv.style.top = (canvas.offsetTop + canvas.height - textbox.offsetHeight) - 10 + 'px';
    textbox.style.width = '350px';
    textbox.style.height = '150px';
    text.style.width = '275px';
    text.style.height = '100px';
    text.style.fontSize = '20px';
    text.style.top = '45%';
    textboxBtn.style.left = ((textboxDiv.offsetWidth * 2) - 20) + 'px';
    textboxBtn.style.top = ((textboxDiv.offsetHeight * 2.5) + 15) + 'px';
    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    let checkDeadCatInterval;

    function nextLine(){
        textboxBtn.style.display = 'none';

        if(currentLine === 0){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        } 
        if(currentLine === 1){
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
                    cat.y <= 235 && 
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
        if(currentLine >= scene2Lines.length){
           textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene3, scene3Bg);
        } 
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine()
}
function scene3(){
    let currentLine = 0;
    const scene3Lines = [
        'What a pleasant bedroom and wedding portrait.',
        'This seems to be her and her husband, Leonardo da Meowci, on their wedding day.',
        'However, recent files show that they divorced a year ago.',
        "Let's explore around a bit more, to the side table on the right.",
        'Looks like a newspaper article. It says how "da Meowci goes insane after his wife gains success".',
        'Maybe her husband is still out there.',
        "Let's go to the left bedside table.",
        'OMG this must be the knife that the killer used to kill Patricia. Wonder who this belongs to.',
        "Let's go investigate her flower shop next."
    ];

    currentScene = 3;
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxDiv.style.width = '317px';
    textboxDiv.style.height = '350px';
    textboxDiv.style.left = '230px';
    textboxDiv.style.top = '370px';
    text.style.top = '35%';
    text.style.left = '55%';
    textbox.style.width = '350px';
    textbox.style.height = '150px';
    text.style.width = '275px';
    text.style.height = '100px';
    text.style.fontSize = '20px';
    textboxBtn.style.display = 'block';
    textboxBtn.style.left = (textboxDiv.offsetWidth + 175) + 'px';
    textboxBtn.style.top = (textboxDiv.offsetHeight + 100) + 'px';

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
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
                textboxBtn.style.display = 'none';
                typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            }, 1500);
                return;
            }
        if(currentLine === 2 || currentLine === 3){
            textboxBtn.style.display = 'none';
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

                    setTimeout(()=>{
                        textboxDiv.style.display = 'none';
                        textbox.style.display = 'none';
                        text.style.display = 'none';
                        textboxBtn.style.display = 'none';
                        context.drawImage(newspaper, 200, 200, 400, 400);
                    }, 1);

                    setTimeout(()=>{
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
                        cat.width = 90;
                        cat.height = 90;
                        context.drawImage(catFront, 596, 310, cat.width, cat.height); 
                        textboxDiv.style.display = 'block';
                        textbox.style.display = 'block';
                        text.style.display = 'inline-block';
                        textboxBtn.style.display = 'block'; 
                        textboxBtn.style.display = 'none';
                        typewriter(text, scene3Lines[currentLine], 10, () => {
                            textboxBtn.style.display = 'block'; 
                            currentLine++; 
                        });  
                    }, 1500);
                } 
            }, 10);
            return;
        }
        if(currentLine === 5 || currentLine === 6){
            textboxBtn.style.display = 'none';
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
                    cat.y <= 315 && 
                    cat.x > 15 &&
                    cat.x < 115                 
                ) {
                    window.removeEventListener('keydown', direction); 
                    clearInterval(leftSideTableInterval);

                    setTimeout(()=>{
                        textboxDiv.style.display = 'none';
                        textbox.style.display = 'none';
                        text.style.display = 'none';
                        textboxBtn.style.display = 'none';
                        context.drawImage(knife, 200, 200, 400, 400);
                    }, 1);

                    setTimeout(()=>{
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(scene3Bg, 0, 0, canvas.width, canvas.height);
                        cat.x = canvas.width - 220;
                        cat.y = canvas.height - 140;
                        cat.width = 90;
                        cat.height = 90;
                        context.drawImage(catFront, 55, 310, cat.width, cat.height); 
                        textboxDiv.style.display = 'block';
                        textbox.style.display = 'block';
                        text.style.display = 'inline-block';
                        textboxBtn.style.display = 'block'; 
                        textboxBtn.style.display = 'none';
                        typewriter(text, scene3Lines[currentLine], 10, () => {
                            textboxBtn.style.display = 'block'; 
                            currentLine++; 
                        });  
                    }, 1500);
                } 
            }, 10);
            return;
        }
        if(currentLine === 8){
            textboxBtn.style.display = 'none';
            typewriter(text, scene3Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });  
            return;
        }
        if(currentLine >= scene3Lines.length){
            textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene4, scene4Bg);
        }
    }
    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene4(){
    let currentLine = 0;
    const scene4Lines = [
        'Yikes, looks like someone went overboard here.',
        "Alright, I dusted fingerprints off of the knife and the broken pots.",
        "The knife's fingerprints belong to Leonardo da Meowci, and the broken pots fingerprints' belong to...",
        "Catfinny?",
        "What's her involvement in this? Looks like we should question her."
    ];

    currentScene = 4;
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxDiv.style.left = (canvas.width - 385) + 'px';
    textboxDiv.style.top = (canvas.height - 185) + 'px';
    textbox.style.width = '350px';
    textbox.style.height = '150px';
    text.style.width = '275px';
    text.style.height = '100px';
    text.style.fontSize = '20px';
    text.style.top = '32%';
    textboxBtn.style.left = ((317 + 370)) + 'px';
    textboxBtn.style.top = (canvas.height - 100) + 'px';

    context.drawImage(catFront, 175, 600, 160, 160);
    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    function nextLine(){
        if(currentLine === 0 || currentLine === 1 || currentLine === 2 || currentLine === 3 || currentLine === 4){
            textboxBtn.style.display = 'none'; 
            typewriter(text, scene4Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        } else {
            textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene5, scene5Bg);
        } 
    }
    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene5(){
    let currentLine = 0;
    const scene5Lines = [
        "Hello, I'm Detective Pussycat. I heard you reported the death of Catricia Calligan.",
        "Oh, yes, Catricia was a dear friend of mine, we often had tea together at the country club.",
        "I was just reading my daily cat newspaper, when I suddenly heard a loud thud and a screeching yell.",
        "I immediately called the Cat York Police Department, I swear!",
        "Did you see anyone leave the house?",
        "I thought I saw a trace of a brown tail slipping around the house, but it was too dark and I was scared to follow.",
        "I see. Well, we believe that you're the one that created a mess in Catricia's flower shop, is that true?",
        "... That wasn't me.",
        "Really? Then can you explain why your fingerprints were on the broken flower pots in her flower shop?",
        "Fess up already. We have video evidence of you breaking in and destroying the plants.",
        "Aw, shucks! This whole time I thought Catricia was too poor to buy surveillance cameras!",
        "Okay, looks like we'll have to take you up to the station for now."
    ];

    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    
    textboxBtn.style.left = textboxDiv.offsetWidth + 240 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 220) + 'px';
    text.style.top = '30%';
    text.style.left = '79.5%';
    text.style.fontSize = '25px';
    textbox.style.width = '500px';
    textbox.style.height = '200px';
    text.style.width = '420px';
    text.style.height = '50px';
    text.style.fontSize = '25px';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);

    function nextLine(){
        if(currentLine === 0){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 1 || currentLine === 2 || currentLine === 3){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 4){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 5){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 6){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 7){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 8 || currentLine === 9){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 10){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 11){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene5Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine >= scene5Lines.length){
            textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene6, scene6Bg);
        }
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene6(){
    let currentLine = 0;
    const scene6Lines = [
        "Fine day, Mr. Phatty, sir. On behalf of the Cat's Investigation Agency (CIA), I have some questions for you regarding a new murder case.",
        "Who, Catricia Calligan?",
        "Wait... I never mentioned her. How did you know?",
        "...",
        "...",
        "Anyway, multiple surveillance cameras have seen you sneakin' 'round her residence.",
        "So? Got anything to say for yerself?",
        "Fineee I confess, that new catnip-flavored candy was tempting and I couldn't wait for the release date.",
        "...",
        "...",
        "You're lying.",
        "No! No!",
        "Then explain this:",
        "So what? You can't even tell that's me, and that doesn't tie me to crime.",
        "* Hmm... looks like he's right. We don't have enough evidence against that Phatty. *",
        "* Unfortunately, we'll have to let him go for now, but we can still detain him overnight. *",
        "* I'll get the captain now, and we can start investigating the last suspect of the day. *"
    ];
 
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';

    textboxBtn.style.left = textboxDiv.offsetWidth + 240 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 220) + 'px';
    text.style.top = '30%';
    text.style.left = '79.5%';
    text.style.fontSize = '25px';
    textbox.style.width = '500px';
    textbox.style.height = '200px';
    text.style.width = '420px';
    text.style.height = '50px';
    text.style.fontSize = '25px';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);

    function nextLine(){
        if(currentLine === 0){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 1){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 2){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 3){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 4 || currentLine === 5 || currentLine === 6){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 7){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 8){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 9){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 10){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 11){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'black';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 12){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 13){
            text.style.color = 'black';
            context.clearRect(0, 0, canvas.width, canvas.height);
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
            context.drawImage(scene6HalfBg, 0, 0, canvas.width, canvas.height);
            
            textboxBtn.removeEventListener('click', nextLine);
            textboxBtn.addEventListener('click', nextLine);
            setTimeout(() => {
                textboxDiv.style.display = 'block';
                textbox.style.display = 'block';
                text.style.display = 'inline-block';
                textboxBtn.style.display = 'block';
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(scene6Bg, 0, 0, canvas.width, canvas.height);
                
                typewriter(text, scene6Lines[currentLine], 10, () => {
                    textboxBtn.style.display = 'block'; 
                    currentLine++; 
                });
            }, 2000);
            return;
        }
        if(currentLine === 14 || currentLine === 15 || currentLine === 16){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene6Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }

        if(currentLine >= scene6Lines.length){
            textboxBtn.removeEventListener('click', nextLine);
            transitionToScene(scene7, scene7Bg);       
        }
    }

    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene7(){
    let currentLine = 0;
    currentScene = 7;
    const scene7Lines = [
        "Is this Leonardo da Meowci?",
        "Yar, yas, wat ya want eh?",
        "I've some questions I'd like to ask you about your ex-wife, Catricia Calligan.",
        "I don't know whur that is burd",
        "Really? Seems like you had quite the vendetta against her after she gained all the success.",
        "Her? Successss?! Yur crazy mate, if you think she actually deserved it",
        "It was supposed to be MY success, ya hear? MINE. MY SUCCESS. MY WEALTH!! ARGHHHHH",
        "Welp, off he goes.",
        "Let's go chase after that crazy fella.",
        ""
    ];

    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';

    textboxBtn.style.left = textboxDiv.offsetWidth + 240 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 220) + 'px';
    text.style.top = '30%';
    text.style.left = '79.5%';
    text.style.fontSize = '25px';
    textbox.style.width = '500px';
    textbox.style.height = '200px';
    text.style.width = '420px';
    text.style.height = '50px';
    text.style.fontSize = '25px';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);

    function nextLine(){
        if(currentLine === 0){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 1){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'brown';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 2){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 3){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'brown';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 4){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 5 || currentLine === 6){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'brown';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentLine === 7){
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
            text.style.color = 'orange';
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(scene7HalfBg, 0, 0, canvas.width, canvas.height);
            textboxBtn.removeEventListener('click', nextLine);
            textboxBtn.addEventListener('click', nextLine);
            setTimeout(() => {
                textboxDiv.style.display = 'block';
                textbox.style.display = 'block';
                text.style.display = 'inline-block';
                textboxBtn.style.display = 'block';
                typewriter(text, scene7Lines[currentLine], 10, () => {
                    textboxBtn.style.display = 'block'; 
                    currentLine++; 
                });
            }, 250);
            return;
        }
        if(currentLine === 8){
            textboxBtn.style.display = 'none'; 
            text.style.color = 'orange';
            typewriter(text, scene7Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }
        if(currentScene === 7 && currentLine === 9){
            textboxBtn.removeEventListener('click', nextLine);
            currentScene = null;             
            subway();
        }
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function scene8(){
    let currentLine = 0;
    const scene8Lines = [
        "Now that we got everyone in here, it's time to pick out who the actual killer is.",
        "Select the killer based off the evidence we have thus collected."
    ];
    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';

    suspect1Btn.style.display = 'none';
    suspect2Btn.style.display = 'none';
    suspect3Btn.style.display = 'none';
    suspect1Bg.style.display = 'none';
    suspect2Bg.style.display = 'none';
    suspect3Bg.style.display = 'none';
    suspect1Span.style.display = 'none';
    suspect2Span.style.display = 'none';
    suspect3Span.style.display = 'none';

    textboxBtn.style.left = textboxDiv.offsetWidth + 240 + 'px';
    textboxBtn.style.top = (canvas.height - textboxDiv.offsetHeight + 220) + 'px';
    text.style.top = '30%';
    text.style.left = '79.5%';
    text.style.fontSize = '25px';
    textbox.style.width = '500px';
    textbox.style.height = '200px';
    text.style.width = '420px';
    text.style.height = '50px';
    text.style.fontSize = '25px';
    textboxDiv.style.left = ((canvas.width - 500) / 2) + 'px';
    textboxDiv.style.top = ((canvas.height) / 1.45) + 'px';

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);

    function nextLine(){
        if(currentLine === 0){
            typewriter(text, scene8Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
            return;
        }

        if(currentLine === 1){
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';
            textboxBtn.style.display = 'none';
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(whiteBg, 0, 0, canvas.width, canvas.height);

            suspect1Btn.style.display = 'block';
            suspect1Btn.style.top = (canvas.height - canvas.height) + 'px';
            suspect1Btn.style.left = (canvas.width - 750) + 'px';
            suspect1Bg.style.display = 'block';
            suspect1Span.style.display = 'block';

            suspect2Btn.style.display = 'block';
            suspect2Bg.style.display = 'block';
            suspect2Span.style.display = 'block';
            suspect2Btn.style.top = (canvas.height - 550) + 'px';
            suspect2Btn.style.left = (canvas.width - 750) + 'px';
            
            suspect3Btn.style.display = 'block';
            suspect3Bg.style.display = 'block';
            suspect3Span.style.display = 'block';
            suspect3Btn.style.top = (canvas.height - 300) + 'px';
            suspect3Btn.style.left = (canvas.width - 750) + 'px';

            
            suspectChoose1.addEventListener('click', ()=>{
                fadeOverlay.style.display = 'block';
                suspect2Btn.style.display = 'none';
                suspect3Btn.style.display = 'none';
                suspect1Btn.style.display = 'none';

                transitionToScene(suspect1, suspect1JailBg);
            });
            suspectChoose2.addEventListener('click', ()=>{
                fadeOverlay.style.display = 'block';
                suspect2Btn.style.display = 'none';
                suspect3Btn.style.display = 'none';
                suspect1Btn.style.display = 'none';

                transitionToScene(suspect2, suspect2JailBg);
            });
            suspectChoose3.addEventListener('click', ()=>{
                fadeOverlay.style.display = 'block';
                suspect2Btn.style.display = 'none';
                suspect3Btn.style.display = 'none';
                suspect1Btn.style.display = 'none';

                transitionToScene(suspect3, suspect3JailBg);
            });

        }
    }
   // textboxBtn.removeEventListener('click', nextLine);
   // textboxBtn.addEventListener('click', nextLine);
    nextLine();
}
function suspect1(){
    currentLine = 0;
    const suspect1Lines = [
        "Congrats, player. You have successfully caught the killer, Leonardo da Meowci.",
        "Detective Pussycat has once again successfully completed an investigation.",
        "Thank you for playing this game. I spent the last 2 weeks coding this thing for hours and it's still quite mediocre. I think I'm gonna stop coding now... forever.",
        `Credits:
        Hailey Lan - coding everything and 90% of the script
        Phoebe Zou - inspiration for the name Officer Phatty and making amazing art
        Chatgpt - don't you guys love the AI art </3
        Beila Hu - making me mad`,
       "MR. WHALEN GIB ME DONUTS NOW 👽🤡🙈😈🤬👹👺🤖👾👻"
    ];

    textboxDiv.style.display = 'none';
    textbox.style.display = 'none';
    text.style.display = 'none';
    textboxBtn.style.display = 'none';

    suspect1Btn.style.display = 'none';
    suspect2Btn.style.display = 'none';
    suspect3Btn.style.display = 'none';
    suspect1Bg.style.display = 'none';
    suspect2Bg.style.display = 'none';
    suspect3Bg.style.display = 'none';
    suspect1Span.style.display = 'none';
    suspect2Span.style.display = 'none';
    suspect3Span.style.display = 'none';

    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);   

    function nextLine(){
        if(currentLine === 0){
            typewriter(text, suspect1Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        }
        if(currentLine === 1){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(blackBg, 0, 0, canvas.width, canvas.height);
            suspect2Btn.style.display = 'none';
            suspect3Btn.style.display = 'none';
            suspect1Btn.style.display = 'none';
            endText.style.display = 'inline-block';
            endDiv.style.display = 'block';
            endDiv.style.top = (canvas.height / 2) + 'px';
            endDiv.style.left = (canvas.width - 600) + 'px';

            typewriter(endText, suspect1Lines[currentLine], 10, () => {
                currentLine++; 
            });

            setTimeout(() => {
                typewriter(endText, suspect1Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 3500);

            setTimeout(() => {
                typewriter(endText, suspect1Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 7000);

            setTimeout(() => {
                typewriter(endText, suspect1Lines[currentLine], 10, () => {
                });
            }, 12000);
        }
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);   
    nextLine();
}
function suspect2(){
    currentLine = 0;
    const suspect2Lines = [
        "... How could you.",
        "After an investigation by another, clearly better, detective, it was found that officer Phatty was indeed innocent.",
        "Everyone in Cat York started to resent detective Pussycat, even his boss.",
        'And so, he lost his job and was forced to go into hiding for the rest of his life.',
        "Oh and his wife divorced him. Imagine he becomes like Leonardo da Meowci... MWAHAHAHA",
        "Thank you for playing this game. I spent the last 2 weeks coding this thing for hours and it's still quite mediocre. I think I'm gonna stop coding now... forever.",
        `Credits:
        Hailey Lan - coding everything and 90% of the script
        Phoebe Zou - inspiration for the name Officer Phatty and making amazing art
        Chatgpt - don't you guys love the AI art </3
        Beila Hu - making me mad`,
       "MR. WHALEN GIB ME DONUTS NOW 👽🤡🙈😈🤬👹👺🤖👾👻"
    ];

    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);   

    function nextLine(){
        if(currentLine === 0){
            typewriter(text, suspect2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        }

        if(currentLine === 1){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(blackBg, 0, 0, canvas.width, canvas.height);
            suspect2Btn.style.display = 'none';
            suspect3Btn.style.display = 'none';
            suspect1Btn.style.display = 'none';
            endText.style.display = 'inline-block';
            endDiv.style.display = 'block';
            endDiv.style.top = (canvas.height / 2) + 'px';
            endDiv.style.left = (canvas.width - 600) + 'px';

            typewriter(endText, suspect2Lines[currentLine], 10, () => {
                currentLine++; 
            });

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 2500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 5000);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 7500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 11500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 14500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 22000);
        }
    }

    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);  
    nextLine(); 
}
function suspect3(){
    currentLine = 0;
    const suspect2Lines = [
        "... How could you.",
        "After an investigation by another, clearly better, detective, it was found that Catfinny Catsmith was indeed innocent.",
        "Everyone in Cat York started to resent detective Pussycat, even his boss.",
        "And so, he lost his job and was forced to go into hiding for the rest of his life.",
        "Oh and his wife divorced him. Imagine he becomes like Leonardo da Meowci... MWAHAHAHA",
        "Thank you for playing this game. I spent the last 2 weeks coding this thing for hours and it's still quite mediocre. I think I'm gonna stop coding now... forever.",
        `Credits:
        Hailey Lan - coding everything and 90% of the script
        Phoebe Zou - inspiration for the name Officer Phatty and making amazing art
        Chatgpt - don't you guys love the AI art </3
        Beila Hu - making me mad`,
       "MR. WHALEN GIB ME DONUTS NOW 👽🤡🙈😈🤬👹👺🤖👾👻"
    ];

    textboxDiv.style.display = 'block';
    textbox.style.display = 'block';
    text.style.display = 'inline-block';
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);   

    function nextLine(){
        if(currentLine === 0){
            typewriter(text, suspect2Lines[currentLine], 10, () => {
                textboxBtn.style.display = 'block'; 
                currentLine++; 
            });
        }

        if(currentLine === 1){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(blackBg, 0, 0, canvas.width, canvas.height);
            suspect2Btn.style.display = 'none';
            suspect3Btn.style.display = 'none';
            suspect1Btn.style.display = 'none';
            endText.style.display = 'inline-block';
            endDiv.style.display = 'block';
            endDiv.style.top = (canvas.height / 2) + 'px';
            endDiv.style.left = (canvas.width - 600) + 'px';

            typewriter(endText, suspect2Lines[currentLine], 10, () => {
                currentLine++; 
            });

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 2500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 5000);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 7500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 11500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 14500);

            setTimeout(() => {
                typewriter(endText, suspect2Lines[currentLine], 10, () => {
                    currentLine++; 
                });
            }, 22000);
        }
    }
    
    textboxBtn.removeEventListener('click', nextLine);
    textboxBtn.addEventListener('click', nextLine);    
    nextLine();
}
let gameSpeed;
let gameRunning = false;
let playerLane;
const lanes = [150, 400, 650];
let playerX = lanes[playerLane];
let playerY = canvas.height - 150;
const obstacleWidth = 200;
const obstacleHeight = 500;
let obstacles = [];
currentScene = 7;
if(currentScene === 7) document.addEventListener('keydown', handlePlayerMove);
function subway(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    textboxDiv.style.display = 'none';
    textbox.style.display = 'none';
    text.style.display = 'none';
    textboxBtn.style.display = 'none';
    startSubwayGame(); 

    function startSubwayGame(){
        playerLane = 1;
        playerX = lanes[playerLane];
        playerY = canvas.height - 150;
        obstacles = [];
        gameSpeed = 5;
        gameRunning = true;

        updateSubway();
    }
    function updateSubway() {
        if (!gameRunning) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(subwayBg, 0, 0, canvas.width, canvas.height);
        context.drawImage(catBack, playerX - 100, 575, 200, 200);

        if (obstacles.length === 0) {
            const lane = Math.floor(Math.random() * lanes.length);
            obstacles.push({ lane: lane, y: -obstacleHeight });
        }   
        
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].y += gameSpeed;
            const obsX = lanes[obstacles[i].lane] - obstacleWidth / 2;
            context.drawImage(subwayImg, obsX, obstacles[i].y, obstacleWidth, obstacleHeight);

            const playerRect = {
                x: playerX - 200 / 2,
                y: playerY,
                width: 200,
                height: 200
            };
            const obsRect = {
                x: obsX,
                y: obstacles[i].y,
                width: obstacleWidth,
                height: obstacleHeight
            };

        if (rectIntersect(playerRect, obsRect)) { 
            gameRunning = false;
            document.removeEventListener('keydown', handlePlayerMove);

            suspect1Btn.style.display = 'none';
            suspect2Btn.style.display = 'none';
            suspect3Btn.style.display = 'none';

            suspect1Span.style.display = 'none';
            suspect2Span.style.display = 'none';
            suspect3Span.style.display = 'none';

            suspect1Bg.style.display = 'none';
            suspect2Bg.style.display = 'none';
            suspect3Bg.style.display = 'none';

            textboxBtn.style.display = 'none';
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';

            transitionToScene(scene8, scene8Bg);
            return;
            }
        }

        obstacles = obstacles.filter(obs => obs.y < canvas.height + 100);
        gameSpeed += .005;

        requestAnimationFrame(updateSubway);
    }

    function rectIntersect(r1, r2) {
        return (
            r1.x < r2.x + r2.width &&
            r1.x + r1.width > r2.x &&
            r1.y < r2.y + r2.height &&
            r1.y + r1.height > r2.y
        );
    }
}
function handlePlayerMove(e) {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && playerLane > 0) {
        playerLane--;
        playerX = lanes[playerLane];
    }
    if (e.key === "ArrowRight" && playerLane < lanes.length - 1) {
        playerLane++;
        playerX = lanes[playerLane];
    }

    for (let i = 0; i < obstacles.length; i++) {
        const obsX = lanes[obstacles[i].lane] - obstacleWidth / 2;
        const playerRect = {
            x: playerX - 200 / 2,
            y: playerY,
            width: 200,
            height: 200
        };
        const obsRect = {
            x: obsX,
            y: obstacles[i].y,
            width: obstacleWidth,
            height: obstacleHeight
        };

        if (rectIntersect(playerRect, obsRect)) {
            gameRunning = false;
            document.removeEventListener('keydown', handlePlayerMove);

            suspect1Btn.style.display = 'none';
            suspect2Btn.style.display = 'none';
            suspect3Btn.style.display = 'none';

            suspect1Span.style.display = 'none';
            suspect2Span.style.display = 'none';
            suspect3Span.style.display = 'none';

            suspect1Bg.style.display = 'none';
            suspect2Bg.style.display = 'none';
            suspect3Bg.style.display = 'none';

            textboxBtn.style.display = 'none';
            textboxDiv.style.display = 'none';
            textbox.style.display = 'none';
            text.style.display = 'none';

            transitionToScene(scene8, scene8Bg);
            return;
        }
    }
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