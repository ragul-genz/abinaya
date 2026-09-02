const lettersData = [
    {
        id: 1,
        title: "Open this first",
        emoji: "💖",
        content: "Hi Abinaya! You are the most beautiful thing that ever happened to me. Every moment with you is magic. Keep smiling always, because your smile is my world!"
    },
    {
        id: 2,
        title: "Open when you miss me",
        emoji: "🥺",
        content: "I know we are not together right now, but close your eyes and you'll feel my hug. I am always with you, in your heart. I miss you a million times more!"
    },
    {
        id: 3,
        title: "Open when you feel sad",
        emoji: "🌧️",
        content: "Hey beautiful! My princess shouldn't be sad. Whatever is bothering you will pass. Remember I am always here to listen and hold your hand. Cheer up!"
    },
    {
        id: 4,
        title: "Open when you're angry with me",
        emoji: "😡",
        content: "Okay, I know I can be stupid sometimes, but please forgive me na? (Pulls your cheeks). I love you so much and I can't bear seeing you angry at me."
    },
    {
        id: 5,
        title: "Open when you can't sleep",
        emoji: "🌙",
        content: "Thinking about me? Haha! Count the stars tonight, and remember I love you more than all of them combined. Close those beautiful eyes and have sweet dreams, Abinaya!"
    },
    {
        id: 6,
        title: "Open when you feel stressed",
        emoji: "😫",
        content: "Take a deep breath, Abinaya. You are doing great. You are so strong and smart. I believe in you completely, and I am so proud of you. Relax, you've got this!"
    },
    {
        id: 7,
        title: "Open when you doubt my love",
        emoji: "🤨",
        content: "Are you crazy? Look at this website I made just to see you smile! You are my everything, my past, present, and future. I love you more than words can say."
    },
    {
        id: 8,
        title: "Open just to smile",
        emoji: "😊",
        content: "I love your smile. It brightens my darkest days. Never let anyone take it away. You look absolutely gorgeous when you smile, Abinaya!"
    },
    {
        id: 9,
        title: "Open when you feel alone",
        emoji: "🫂",
        content: "You are never alone. I am just a call or a message away. I will always be your safe space and your biggest cheerleader. I'm here for you, always."
    },
    {
        id: 10,
        title: "Open on our special day",
        emoji: "🎉",
        content: "Happy Anniversary / Special Day! Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control. I love you!"
    },
    {
        id: 11,
        title: "5 Years of Us ❤️",
        emoji: "🥂",
        content: "September 15! Five beautiful years since our journey started. Half a decade of tolerating each other, and I still fall for you every single day. Here's to a lifetime of togetherness. I love you Abinaya!"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('letters-container');
    const modal = document.getElementById('letter-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const titleEl = document.getElementById('letter-title');
    const bodyEl = document.getElementById('letter-body');

    // Create floating background hearts
    createFloatingHearts();

    // Render Letters
    lettersData.forEach(letter => {
        const envelopeWrapper = document.createElement('div');
        envelopeWrapper.className = 'envelope-wrapper';
        
        envelopeWrapper.innerHTML = `
            <div class="envelope">
                <div class="envelope-label">
                    <span class="emoji">${letter.emoji}</span>
                    <span>${letter.title}</span>
                </div>
            </div>
        `;

        envelopeWrapper.addEventListener('click', () => {
            openLetter(letter, envelopeWrapper);
        });

        container.appendChild(envelopeWrapper);
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            modal.classList.add('hidden');
        }
    });

    function openLetter(letter, element) {
        // Simple flap animation effect
        element.classList.add('opened');
        
        setTimeout(() => {
            titleEl.textContent = letter.title;
            bodyEl.textContent = letter.content;
            modal.classList.remove('hidden');
            
            // Pop some hearts when a letter is opened
            burstHearts();
            
            // Remove the opened class after modal is shown so it resets for next time
            setTimeout(() => {
                element.classList.remove('opened');
            }, 500);
        }, 300);
    }

    function createFloatingHearts() {
        const bg = document.getElementById('hearts-bg');
        const heartIcons = ['❤️', '💖', '💕', '✨'];
        
        for(let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            // Random properties
            const left = Math.random() * 100;
            const size = Math.random() * 1.5 + 0.5;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 15;
            
            heart.style.left = `${left}%`;
            heart.style.fontSize = `${size}rem`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            bg.appendChild(heart);
        }
    }

    function burstHearts() {
        // Using native DOM elements for a custom burst since we don't have confetti imported here
        // Wait, we can just use the DOM to create a quick fountain of hearts on the screen
        const burstCount = 15;
        for(let i=0; i<burstCount; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.zIndex = '2000';
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(heart);
            
            // Force reflow
            heart.getBoundingClientRect();
            
            // Scatter
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 100; // slightly upward
            
            heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${Math.random() + 0.5})`;
            heart.style.opacity = '0';
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }

    // --- Love Counter Logic ---
    const startDate = new Date('2021-09-15T00:00:00');
    const counterBox = document.getElementById('loveCounter');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        // If the date hasn't arrived yet (edge case)
        if (diff < 0) return;

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let d = now.getDate() - startDate.getDate();

        if (d < 0) {
            months -= 1;
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }
        
        let tempDate = new Date(now.getFullYear(), now.getMonth(), startDate.getDate());
        if(now < tempDate) {
           tempDate.setMonth(tempDate.getMonth() - 1);
        }
        let remainingDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));

        counterBox.innerHTML = `
            <div class="time-unit"><span class="num">${years}</span><span class="label">Years</span></div>
            <div class="time-unit"><span class="num">${months}</span><span class="label">Months</span></div>
            <div class="time-unit"><span class="num">${remainingDays}</span><span class="label">Days</span></div>
            <div class="time-unit"><span class="num">${hours}</span><span class="label">Hours</span></div>
            <div class="time-unit"><span class="num">${minutes}</span><span class="label">Mins</span></div>
            <div class="time-unit"><span class="num">${seconds}</span><span class="label">Secs</span></div>
        `;
    }

    setInterval(updateCounter, 1000);
    updateCounter();

});
