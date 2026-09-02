const reasons = [
    "I love your beautiful smile that brightens my day.",
    "I love the way you care for me even in the little things.",
    "I love how we can talk for hours and never get bored.",
    "I love the way your eyes light up when you're happy.",
    "I love your voice, it's my favorite sound in the world.",
    "I love how you understand me even when I don't say a word.",
    "I love how safe and peaceful I feel when I'm with you.",
    "I love your sense of humor and how you make me laugh.",
    "I love the way you support my dreams and goals.",
    "I love how you make every ordinary moment feel special.",
    "I love your kindness and your beautiful heart.",
    "I love the way you hold my hand.",
    "I love how you are my best friend and my soulmate.",
    "I love you just because you are you, perfectly you."
];

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const reasonDisplay = document.getElementById('reasonDisplay');
    const reasonText = reasonDisplay.querySelector('p');
    const heartsContainer = document.getElementById('floating-hearts-container');

    let previousIndex = -1;

    generateBtn.addEventListener('click', (e) => {
        // Button animation
        generateBtn.classList.add('clicked');
        setTimeout(() => generateBtn.classList.remove('clicked'), 300);

        // Spawn floating hearts
        createFloatingHearts(e.clientX, e.clientY);

        // Change text with fade effect
        reasonDisplay.classList.remove('fade-in');
        reasonDisplay.classList.add('fade-out');

        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * reasons.length);
            } while (randomIndex === previousIndex && reasons.length > 1);
            
            previousIndex = randomIndex;
            reasonText.textContent = reasons[randomIndex];
            
            reasonDisplay.classList.remove('fade-out');
            reasonDisplay.classList.add('fade-in');
        }, 300); // Wait for fade out
    });

    function createFloatingHearts(x, y) {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            
            // Randomize position slightly around the click
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 40;
            
            heart.style.left = `${x + offsetX}px`;
            heart.style.top = `${y + offsetY}px`;
            
            // Randomize size
            const size = 16 + Math.random() * 16;
            heart.style.fontSize = `${size}px`;
            
            heartsContainer.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }
});
