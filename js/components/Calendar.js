window.MoodApp = window.MoodApp || {};
window.MoodApp.Components = window.MoodApp.Components || {};

window.MoodApp.Components.renderCalendar = function (container, onBack) {
    const moods = window.MoodApp.Utils.getAllMoods();

    // Generate mock history
    const days = [];
    for (let i = 1; i <= 30; i++) {
        // Random mood for visual demo
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        days.push({ day: i, mood: randomMood });
    }

    container.innerHTML = `
        <div class="calendar-container fade-in">
            <header class="lookbook-header">
                <button class="btn-back" id="btnBackCal">← Back</button>
                <div class="mood-info">
                    <h2 class="mood-title">Mood Spectrum</h2>
                    <p class="mood-desc">Your monthly emotional palette</p>
                </div>
            </header>
            
            <div class="calendar-grid">
                ${days.map(d => `
                    <div class="calendar-day" style="background: ${d.mood.primary}">
                        <span class="day-number">${d.day}</span>
                        <span class="day-mood-label">${d.mood.key}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="calendar-stats">
                <h3>This Month's Vibe</h3>
                <p>You've been mostly <strong>Happy / Energetic</strong> this month!</p>
            </div>
        </div>
    `;

    container.querySelector('#btnBackCal').addEventListener('click', onBack);
};
