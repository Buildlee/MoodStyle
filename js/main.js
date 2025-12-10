// Initialize Namespace
window.MoodApp = window.MoodApp || {};

const app = document.getElementById('app');

/**
 * Main Application State
 */
const state = {
    currentMood: null,
    view: 'HOME' // 'HOME' | 'LOOKBOOK' | 'CALENDAR'
};

/**
 * Transitions to the Lookbook view with the selected mood.
 */
function handleMoodSelect(moodKey) {
    state.currentMood = moodKey;
    state.view = 'LOOKBOOK';
    render();
}

/**
 * Transitions back to the Home view.
 */
function handleBack() {
    state.currentMood = null;
    state.view = 'HOME';
    render();
}

/**
 * Transitions to Calendar view.
 */
function handleOpenCalendar() {
    state.view = 'CALENDAR';
    render();
}

/**
 * Main Render Function
 */
function render() {
    app.innerHTML = ''; // Clear

    // Access Components via Namespace
    const { renderMoodWheel, renderLookbook, renderCalendar } = window.MoodApp.Components;

    if (state.view === 'HOME') {
        const homeContainer = document.createElement('div');
        homeContainer.className = 'screen container active';

        // Render Mood Wheel
        renderMoodWheel(homeContainer, handleMoodSelect);

        // Append Calendar Button manually
        const calBtn = document.createElement('button');
        calBtn.className = 'btn-calendar-floating';
        calBtn.textContent = '📅 Mood Diary';
        calBtn.onclick = handleOpenCalendar;
        homeContainer.appendChild(calBtn);

        app.appendChild(homeContainer);
    } else if (state.view === 'LOOKBOOK') {
        const lookbookContainer = document.createElement('div');
        lookbookContainer.className = 'screen-full active';
        renderLookbook(lookbookContainer, state.currentMood, handleBack);
        app.appendChild(lookbookContainer);
    } else if (state.view === 'CALENDAR') {
        const calContainer = document.createElement('div');
        calContainer.className = 'screen-full active';
        renderCalendar(calContainer, handleBack);
        app.appendChild(calContainer);
    }
}

// Initialize
function init() {
    console.log('MoodStyle App Initialized');
    render();
}

// Start
init();
