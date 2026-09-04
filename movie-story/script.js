document.addEventListener("DOMContentLoaded", () => {
    const intro1 = document.getElementById("intro-1");
    const intro2 = document.getElementById("intro-2");
    const intro3 = document.getElementById("intro-3");
    const introContainer = document.getElementById("intro-container");
    const scrollingContainer = document.getElementById("scrolling-container");
    const nextBtn = document.querySelector(".next-btn");
    const musicBtn = document.getElementById("music-btn");
    const bgm = document.getElementById("bgm");

    let isPlaying = false;

    // Optional music toggle
    if (musicBtn && bgm) {
        musicBtn.addEventListener("click", () => {
            if (isPlaying) {
                bgm.pause();
                musicBtn.textContent = "🎵 Play Music";
                isPlaying = false;
            } else {
                bgm.play().catch(e => console.log("Audio play failed", e));
                musicBtn.textContent = "⏸ Pause Music";
                isPlaying = true;
            }
        });
    }

    const sequence = [
        { el: intro1, delay: 1000, duration: 4000 },
        { el: intro2, delay: 6000, duration: 4000 },
        { el: intro3, delay: 11000, duration: 4000 }
    ];

    sequence.forEach(item => {
        setTimeout(() => {
            item.el.classList.add("visible");
            setTimeout(() => {
                item.el.classList.remove("visible");
            }, item.duration);
        }, item.delay);
    });

    // Start scrolling after intro finishes
    setTimeout(() => {
        introContainer.style.opacity = 0;
        setTimeout(() => {
            introContainer.classList.add("hidden");
            scrollingContainer.classList.remove("hidden");
            
            // Fade in scrolling container
            setTimeout(() => {
                scrollingContainer.classList.add("visible");
                startScrolling();
            }, 100);
        }, 1000); // Wait for intro container fade out
    }, 17000); // 11000 + 4000 + 2000 margin

    function startScrolling() {
        let maxScroll = scrollingContainer.scrollHeight - scrollingContainer.clientHeight;
        let currentScroll = 0;
        
        let scrollInterval = setInterval(() => {
            // Adjust scroll speed here
            currentScroll += 1.5; 
            scrollingContainer.scrollTop = currentScroll;
            
            if (currentScroll >= maxScroll) {
                clearInterval(scrollInterval);
                // Show button after reaching bottom
                setTimeout(() => {
                    nextBtn.classList.add("show");
                }, 1000);
            }
        }, 20); // 50fps smooth scrolling
    }
});
