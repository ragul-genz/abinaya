document.getElementById('predictorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Gather inputs
    const n1 = document.getElementById('name1').value.toLowerCase().trim();
    const d1 = document.getElementById('dob1').value;
    const t1 = document.getElementById('time1').value;
    
    const n2 = document.getElementById('name2').value.toLowerCase().trim();
    const d2 = document.getElementById('dob2').value;
    const t2 = document.getElementById('time2').value;
    
    if(!n1 || !d1 || !t1 || !n2 || !d2 || !t2) return;
    
    // Deterministic hash based on inputs so same inputs always give same output
    // Sort so Person 1 and Person 2 order doesn't matter
    const combinedString = [n1, d1, t1, n2, d2, t2].sort().join('');
    
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        const char = combinedString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    // Normalize hash to a percentage between 10 and 100
    const seed = Math.abs(hash);
    const percentage = 15 + (seed % 86); // 15 to 100
    
    showResult(percentage);
});

function showResult(percentage) {
    const form = document.getElementById('predictorForm');
    const resultSection = document.getElementById('resultSection');
    
    form.style.display = 'none';
    resultSection.classList.remove('hidden');
    
    const circle = document.getElementById('progressCircle');
    const text = document.getElementById('percentageText');
    const verdict = document.getElementById('verdictText');
    const desc = document.getElementById('descriptionText');
    
    // Reset
    circle.style.strokeDashoffset = 283;
    circle.style.stroke = '#cbd5e1';
    text.textContent = '0%';
    text.style.color = '#ffffff';
    verdict.textContent = 'Consulting the Stars... ✨';
    verdict.className = '';
    verdict.style.color = '#ffffff';
    desc.textContent = '';
    
    // Animate percentage
    setTimeout(() => {
        const targetOffset = 283 - (283 * percentage) / 100;
        circle.style.strokeDashoffset = targetOffset;
        
        // Color transition
        if(percentage >= 70) circle.style.stroke = '#4ade80';
        else if (percentage >= 40) circle.style.stroke = '#fbbf24';
        else circle.style.stroke = '#f87171';
        
        let current = 0;
        const interval = setInterval(() => {
            current += 1;
            text.textContent = `${current}%`;
            
            if(percentage >= 70) text.style.color = '#4ade80';
            else if (percentage >= 40) text.style.color = '#fbbf24';
            else text.style.color = '#f87171';
            
            if(current >= percentage) {
                clearInterval(interval);
                showFinalVerdict(percentage, verdict, desc);
            }
        }, 2000 / percentage); // 2 seconds total animation
    }, 100);
}

function showFinalVerdict(percentage, verdict, desc) {
    if (percentage >= 70) {
        verdict.textContent = 'Marriage is Highly Likely! 💍';
        verdict.className = 'verdict-yes';
        desc.textContent = 'The stars perfectly align for both of you. A strong, lifelong connection binds your destinies together.';
        triggerConfetti();
    } else if (percentage >= 40) {
        verdict.textContent = 'Maybe / Needs Work 🤔';
        verdict.className = 'verdict-maybe';
        desc.textContent = 'There is potential, but it will require understanding, patience, and effort from both sides.';
    } else {
        verdict.textContent = 'Marriage is Unlikely 💔';
        verdict.className = 'verdict-no';
        desc.textContent = 'Your astrological paths point in different directions. Destiny might have other plans for you both.';
    }
}

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('predictorForm').style.display = 'flex';
    document.getElementById('resultSection').classList.add('hidden');
    // Clear inputs optional, keeping them is usually better for "Try Another" tweaks
});

function triggerConfetti() {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff416c', '#ff4b2b', '#ffffff', '#4ade80'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 1000
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 1000
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
