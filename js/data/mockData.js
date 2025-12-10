// Define Namespace
window.MoodApp = window.MoodApp || {};
window.MoodApp.Data = {};

window.MoodApp.Data.getMockOutfits = function (moodKey) {
    const palette = window.MoodApp.Utils.getColorsByMood(moodKey);
    const count = 6; // Number of items to generate
    const outfits = [];

    for (let i = 1; i <= count; i++) {
        // Generate a hex color without '#' for the url
        const primaryHex = palette.primary.replace('#', '');
        const secondaryHex = palette.secondary.replace('#', '');
        const accentHex = palette.accent.replace('#', '');

        // Rotate colors for variety
        const bgColors = [primaryHex, secondaryHex, accentHex];
        const mainColor = bgColors[i % 3];
        const textColor = i % 3 === 1 ? '000000' : 'FFFFFF'; // Simple contrast logic

        outfits.push({
            id: `${moodKey}-${i}`,
            title: `${palette.description} Look ${i}`,
            image: `https://placehold.co/600x800/${mainColor}/${textColor}?text=${palette.keywords[i % palette.keywords.length]}+Style`,
            colorAnalysis: {
                primary: palette.primary,
                secondary: palette.secondary,
                accent: palette.accent,
                percentages: [50, 30, 20] // Mock breakdown
            },
            shopLink: '#'
        });
    }

    return outfits;
};
