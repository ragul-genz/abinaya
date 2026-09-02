document.addEventListener('DOMContentLoaded', () => {
    const lock = document.getElementById('promiseLock');
    const instruction = document.getElementById('instructionText');
    const container = document.querySelector('.lock-container');
    
    // Start unlocked
    lock.classList.add('unlocked');
    
    let isLocked = false;
    
    lock.addEventListener('click', () => {
        if (!isLocked) {
            // Lock it
            lock.classList.remove('unlocked');
            isLocked = true;
            
            instruction.textContent = "Locked forever! ❤️";
            instruction.style.color = "#ff4b72";
            instruction.style.fontWeight = "bold";
            
            // Sparkle effect
            createSparkles(container);
        } else {
            // Add a little shake effect if they try to unlock
            lock.style.animation = "shake 0.5s ease";
            instruction.textContent = "True love can never be unlocked!";
            
            setTimeout(() => {
                lock.style.animation = "";
            }, 500);
        }
    });
    
    // Add shake animation style dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
    
    function createSparkles(parent) {
        const colors = ['#ff4b72', '#ff8fa3', '#FFD700', '#fff'];
        
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Random color
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            
            // Center in lock
            sparkle.style.left = '140px';
            sparkle.style.top = '150px';
            
            parent.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
});
