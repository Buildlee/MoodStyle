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
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues

            // 1. Visual Cleanup: Hide tooltip immediately
            const tooltip = item.querySelector('.mood-tooltip');
            if (tooltip) tooltip.style.display = 'none';

            // 2. Animate Container (Fade out text/other elements)
            const container = document.querySelector('.mood-wheel-container');
            container.classList.add('exiting');

            const wheelWrapper = document.querySelector('.wheel-wrapper');
            wheelWrapper.classList.add('fade-out');

            // 3. Animate Selected Item (Expand to fill screen)
            // We need to promote this specific item to be fixed/top level to expand correctly
            // But simply adding the class might work if z-index is handled.
            // A trick is to clone it to body to ensure it's on top of everything, 
            // but for simplicity, let's try modifying the existing one first.
            // We need to break it out of the 'transform' parent context if possible, 
            // but since parent is just a div with translation, fixed positioning on child overrides it.

            item.classList.add('expanding');

            // 4. Trigger Navigation after animation
            setTimeout(() => {
                onMoodSelect(mood.key);
            }, 750); // Slightly less than CSS transition to avoid flash
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
