document.addEventListener("DOMContentLoaded", () => {
    const lines = [
        document.getElementById("line-1"),
        document.getElementById("line-2"),
        document.getElementById("line-3"),
        document.getElementById("line-4")
    ];
    
    const forgiveBtn = document.getElementById("forgive-btn");

    // Fade in text lines one by one
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add("visible");
        }, index * 2500); // 2.5 seconds between each line
    });

    // Show forgive button after all lines
    setTimeout(() => {
        forgiveBtn.classList.add("visible");
    }, lines.length * 2500 + 1000);

    // Forgive button click event
    forgiveBtn.addEventListener("click", () => {
        document.body.classList.add("happy-active");
        createHeartBurst();
    });

    function createHeartBurst() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.classList.add("floating-heart");
                heart.innerHTML = ["❤️", "💖", "💕", "🥰"][Math.floor(Math.random() * 4)];
                
                // Random position across width
                heart.style.left = Math.random() * 100 + "vw";
                // Random size
                heart.style.transform = `scale(${Math.random() * 1 + 0.5})`;
                
                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
    }
});
