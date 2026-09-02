// Placeholder date - Set to January 1, 2024 for demo purposes
// Replace with the actual date (Format: YYYY-MM-DDTHH:MM:SS)
const startDate = new Date("2024-01-01T00:00:00");

function updateTimer() {
    const now = new Date();
    const difference = now - startDate;

    // Calculate time values
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Update DOM
    document.getElementById('days').innerText = formatTime(days);
    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Initial call
updateTimer();

// Update every second
setInterval(updateTimer, 1000);
