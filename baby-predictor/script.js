const cube = document.getElementById('cube');
const rollBtn = document.getElementById('rollBtn');
const resultDiv = document.getElementById('result');

// Add idle animation initially
cube.classList.add('idle');

let isRolling = false;
let currentX = 0;
let currentY = 0;

const faces = [
    { name: 'Boy', rx: 0, ry: 0, class: 'boy-text', colors: ['#38bdf8', '#0ea5e9', '#ffffff'] },
    { name: 'Girl', rx: 0, ry: -90, class: 'girl-text', colors: ['#f472b6', '#ec4899', '#ffffff'] },
    { name: 'Twins', rx: 0, ry: -180, class: 'twins-text', colors: ['#c084fc', '#a855f7', '#ffffff'] },
    { name: 'Boy', rx: 0, ry: 90, class: 'boy-text', colors: ['#38bdf8', '#0ea5e9', '#ffffff'] },
    { name: 'Girl', rx: -90, ry: 0, class: 'girl-text', colors: ['#f472b6', '#ec4899', '#ffffff'] },
    { name: 'Twins', rx: 90, ry: 0, class: 'twins-text', colors: ['#c084fc', '#a855f7', '#ffffff'] }
];

rollBtn.addEventListener('click', () => {
    if (isRolling) return;
    
    isRolling = true;
    rollBtn.disabled = true;
    resultDiv.classList.remove('show');
    cube.classList.remove('idle');
    
    const spinX_count = Math.floor(Math.random() * 4 + 5); // 5 to 8 extra spins
    const spinY_count = Math.floor(Math.random() * 4 + 5);
    
    const winnerIndex = Math.floor(Math.random() * 6);
    const winner = faces[winnerIndex];
    
    currentX += spinX_count * 360;
    currentY += spinY_count * 360;
    
    // Add a slight tilt to the final result for a nice 3D resting state
    const tiltX = -10;
    const tiltY = 10;
    
    const targetX = winner.rx + currentX;
    const targetY = winner.ry + currentY;
    
    cube.style.transform = `translateZ(-90px) rotateX(${targetX + tiltX}deg) rotateY(${targetY + tiltY}deg)`;
    
    setTimeout(() => {
        isRolling = false;
        rollBtn.disabled = false;
        
        resultDiv.textContent = winner.name;
        resultDiv.className = `result show ${winner.class}`;
        
        // High quality confetti
        const end = Date.now() + 1.5 * 1000;
        const confettiColors = winner.colors;

        (function frame() {
            confetti({
                particleCount: 8,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: confettiColors,
                zIndex: 1000
            });
            confetti({
                particleCount: 8,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: confettiColors,
                zIndex: 1000
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
        
    }, 3500); // Matches transition duration
});
