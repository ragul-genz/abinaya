const reasonsList = [];

const genericReasons = [
    "Your beautiful eyes", "The sound of your laugh", "How you always know how to cheer me up",
    "Your warmth when we hug", "The way you say my name", "Your endless kindness",
    "How you make ordinary moments feel special", "Your sense of humor", "The way you hold my hand",
    "Your passion for life", "How you inspire me to be better", "Your beautiful soul",
    "The cute faces you make", "Your voice", "How safe I feel with you",
    "Your thoughtfulness", "The way you look at me", "How we can talk for hours",
    "Your honesty", "The way you support my dreams", "Your beautiful hair",
    "How you always make time for me", "Your intelligence", "The way you comfort me",
    "Your endless patience", "How you forgive easily", "Your creativity",
    "The way you make me feel loved every single day", "Your gentle touch", "How you understand my silence",
    "Your beautiful mind", "The way you always believe in me", "Your adventurous spirit",
    "How you make me laugh until my stomach hurts", "Your unconditional love", "The way you protect me",
    "Your sweet kisses", "How you never give up on us", "Your unique perspective on life",
    "The way you always put a smile on my face", "Your loyalty", "How you make me feel like the luckiest person",
    "Your incredible strength", "The way you always know what to say", "Your warm hugs",
    "How you make the bad days better", "Your beautiful heart", "The way you listen to me",
    "Your endless support", "How you make me feel complete"
];

for(let i = 1; i <= 100; i++) {
    let reasonText = genericReasons[(i - 1) % genericReasons.length];
    
    // User requested specific ones
    if (i === 1) reasonText = "Your smile";
    if (i === 17) reasonText = "The way you care";
    if (i === 42) reasonText = "The way you understand me";
    if (i === 100) reasonText = "Because you're you. ❤️";

    reasonsList.push(reasonText);
}

const counterEl = document.getElementById("counter");
const reasonTextEl = document.getElementById("reason-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const autoBtn = document.getElementById("auto-btn");
const reasonCard = document.querySelector(".reason-card");

let currentIndex = 0;
let autoPlayInterval = null;

function updateDisplay() {
    // Fade out
    reasonCard.style.opacity = 0;
    reasonCard.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        counterEl.textContent = `#${String(currentIndex + 1).padStart(2, '0')}`;
        reasonTextEl.textContent = reasonsList[currentIndex];
        
        // Fade in
        reasonCard.style.opacity = 1;
        reasonCard.style.transform = "scale(1)";
    }, 300); // Wait for transition to finish
}

prevBtn.addEventListener("click", () => {
    stopAutoPlay();
    if (currentIndex > 0) {
        currentIndex--;
        updateDisplay();
    }
});

nextBtn.addEventListener("click", () => {
    stopAutoPlay();
    goToNext();
});

function goToNext() {
    if (currentIndex < 99) {
        currentIndex++;
        updateDisplay();
    } else {
        stopAutoPlay(); // Stop when reaching the end
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoBtn.textContent = "▶ Auto Play";
    }
}

autoBtn.addEventListener("click", () => {
    if (autoPlayInterval) {
        stopAutoPlay();
    } else {
        autoBtn.textContent = "❚❚ Pause";
        autoPlayInterval = setInterval(goToNext, 3000); // 3 seconds per reason
        // Immediately go to next so user doesn't wait 3s for the first change
        if (currentIndex < 99) {
             goToNext();
        }
    }
});

// Initialize first display
updateDisplay();
