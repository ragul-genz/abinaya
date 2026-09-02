document.addEventListener('DOMContentLoaded', () => {
    // Generate floating hearts
    const bgContainer = document.querySelector('.background-animation');
    const numHearts = 15;

    for (let i = 0; i < numHearts; i++) {
        createHeart(bgContainer);
    }
});

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Randomize position, size, and animation duration
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 15; // 10s to 25s
    const delay = Math.random() * 10;
    const scale = 0.5 + Math.random() * 1;
    
    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.transform = `scale(${scale}) rotate(45deg)`;
    
    container.appendChild(heart);
}
