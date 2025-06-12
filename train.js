const character = document.getElementById('character');
const image = document.querySelector('.detective');
const block = document.getElementById('block');

const trackPositions = [0, 290, 580]; // 3 tracks in 800px width

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
});

function moveLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let index = trackPositions.indexOf(left);
    if (index > 0) {
        character.style.left = trackPositions[index - 1] + 'px';
    }
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    let index = trackPositions.indexOf(left);
    if (index < trackPositions.length - 1) {
        character.style.left = trackPositions[index + 1] + 'px';
    }
}

// Change track randomly each animation cycle
block.addEventListener('animationiteration', () => {
    const random = Math.floor(Math.random() * trackPositions.length);
    block.style.left = trackPositions[random] + 'px';
});

// Collision detection interval
const gameInterval = setInterval(() => {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    const blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));

    // Approximate collision detection (allow ±10px horizontal tolerance)
    if (Math.abs(characterLeft - blockLeft) < 10 && blockTop < 600 && blockTop > 200) {
        console.log('GAME OVER: collision detected');
        block.style.animation = 'none';
        clearInterval(gameInterval);
    }
}, 10);

document.getElementById('right').addEventListener('touchstart', moveRight);
document.getElementById('left').addEventListener('touchstart', moveLeft);
