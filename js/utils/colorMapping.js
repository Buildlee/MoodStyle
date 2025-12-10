// Define Namespace
window.MoodApp = window.MoodApp || {};
window.MoodApp.Utils = {};

const MOODS = {
    HAPPY: 'happy',
    CALM: 'calm',
    SAD: 'sad',
    CONFIDENT: 'confident',
    CHILL: 'chill'
};

const MOOD_PALETTES = {
    [MOODS.HAPPY]: {
        label: 'Happy / Energetic',
        description: 'Dopamine Dressing',
        primary: '#FFD700', // Yellow
        secondary: '#FFA500', // Orange
        accent: '#FF4500', // Red
        bgGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        keywords: ['vibrant', 'bright', 'yellow', 'orange']
    },
    [MOODS.CALM]: {
        label: 'Calm / Focus',
        description: 'Clean Fit',
        primary: '#4682B4', // Steel Blue
        secondary: '#FFFFFF', // White
        accent: '#A9A9A9', // Dark Gray
        bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #4682B4 100%)',
        keywords: ['minimal', 'blue', 'white', 'clean']
    },
    [MOODS.SAD]: {
        label: 'Melancholy / Low',
        description: 'Comfort & Wrap',
        primary: '#2F4F4F', // Dark Slate Gray (Deep Greenish)
        secondary: '#000000', // Black
        accent: '#5F9EA0', // Cadet Blue (Haze Blue)
        bgGradient: 'linear-gradient(135deg, #2C3E50 0%, #000000 100%)',
        keywords: ['dark', 'cozy', 'oversized', 'black']
    },
    [MOODS.CONFIDENT]: {
        label: 'Confident / Date',
        description: 'Power Dressing',
        primary: '#800020', // Burgundy
        secondary: '#000000', // Black
        accent: '#800080', // Purple
        bgGradient: 'linear-gradient(135deg, #430000 0%, #800020 100%)',
        keywords: ['elegant', 'sexy', 'red', 'black']
    },
    [MOODS.CHILL]: {
        label: 'Chill / Lazy',
        description: 'Mori / Earthy',
        primary: '#8B4513', // Saddle Brown (Earth)
        secondary: '#E0DCC8', // Oatmeal
        accent: '#9DC183', // Sage Green
        bgGradient: 'linear-gradient(135deg, #D7CCC8 0%, #8B4513 100%)',
        keywords: ['earthy', 'natural', 'beige', 'green']
    }
};

window.MoodApp.Utils.MOODS = MOODS;

window.MoodApp.Utils.getColorsByMood = function (moodKey) {
    return MOOD_PALETTES[moodKey] || MOOD_PALETTES[MOODS.HAPPY];
};

window.MoodApp.Utils.getAllMoods = function () {
    return Object.keys(MOODS).map(key => ({
        key: MOODS[key],
        ...MOOD_PALETTES[MOODS[key]]
    }));
};
