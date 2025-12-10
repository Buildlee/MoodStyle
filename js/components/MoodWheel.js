window.MoodApp = window.MoodApp || {};
window.MoodApp.Components = window.MoodApp.Components || {};

window.MoodApp.Components.renderMoodWheel = function (container, onMoodSelect) {
    container.innerHTML = `
        <div class="mood-wheel-container fade-in">
            <h1 class="title-xl">How are you feeling today?</h1>
            <p class="subtitle">Select your mood to discover your style.</p>
            
            <div class="wheel-wrapper">
                <div class="wheel" id="moodWheel">
                    <!-- Mood items injected here -->
                    <div class="center-knob">MOOD</div>
                </div>
            </div>
        </div>
    `;

    const wheel = container.querySelector('#moodWheel');
    const moods = window.MoodApp.Utils.getAllMoods();
    const count = moods.length;
    const radius = 160; // Distance from center

    moods.forEach((mood, index) => {
        // Wrapper for positioning
        const itemPos = document.createElement('div');
        itemPos.className = 'mood-item-pos';

        // Actual visual item
        const item = document.createElement('div');
        item.className = 'mood-item';
        item.style.backgroundColor = mood.primary;
        item.textContent = mood.key;
        item.dataset.mood = mood.key;

        // Calculate position
        const angle = (index / count) * 2 * Math.PI;
        const x = Math.cos(angle - Math.PI / 2) * radius;
        const y = Math.sin(angle - Math.PI / 2) * radius;

        // Apply position to wrapper
        itemPos.style.transform = `translate(${x}px, ${y}px)`;

        // Interaction
        item.addEventListener('click', () => {
            onMoodSelect(mood.key);
        });

        // Add tooltip to item
        const tooltip = document.createElement('span');
        tooltip.className = 'mood-tooltip';
        tooltip.textContent = mood.label;
        item.appendChild(tooltip);

        itemPos.appendChild(item);
        wheel.appendChild(itemPos);
    });
};
