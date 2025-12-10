window.MoodApp = window.MoodApp || {};
window.MoodApp.Components = window.MoodApp.Components || {};

window.MoodApp.Components.renderLookbook = function (container, moodKey, onBack) {
    const palette = window.MoodApp.Utils.getColorsByMood(moodKey);
    const outfits = window.MoodApp.Data.getMockOutfits(moodKey);

    container.innerHTML = `
        <div class="lookbook-container fade-in" style="--theme-primary: ${palette.primary}; --theme-bg: ${palette.bgGradient}">
            <header class="lookbook-header">
                <button class="btn-back" id="btnBack">← Back</button>
                <div class="mood-info">
                    <h2 class="mood-title">${palette.label}</h2>
                    <p class="mood-desc">${palette.description}</p>
                </div>
            </header>
            
            <section class="color-palette-display">
                <div class="color-control">
                    <label for="vibeRange">Vibe Intensity</label>
                    <input type="range" id="vibeRange" min="0.5" max="1.5" step="0.1" value="1">
                </div>
                
                <div class="color-swatch" style="background-color: ${palette.primary}"><span>Primary</span></div>
                <div class="color-swatch" style="background-color: ${palette.secondary}; border: 1px solid #eee;"><span>Secondary</span></div>
                <div class="color-swatch" style="background-color: ${palette.accent}"><span>Accent</span></div>
            </section>

            <section class="outfit-grid" id="outfitGrid">
                ${outfits.map(outfit => `
                    <div class="outfit-card">
                        <div class="image-wrapper">
                            <img src="${outfit.image}" alt="${outfit.title}" loading="lazy" />
                            <div class="color-overlay">
                                <div class="overlay-content">
                                    <p>Match Analysis</p>
                                    <div class="bar-chart">
                                        <div class="bar" style="width: ${outfit.colorAnalysis.percentages[0]}%; background: ${outfit.colorAnalysis.primary}"></div>
                                        <div class="bar" style="width: ${outfit.colorAnalysis.percentages[1]}%; background: ${outfit.colorAnalysis.secondary}"></div>
                                        <div class="bar" style="width: ${outfit.colorAnalysis.percentages[2]}%; background: ${outfit.colorAnalysis.accent}"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h3>${outfit.title}</h3>
                            <a href="${outfit.shopLink}" class="shop-link">View Item →</a>
                        </div>
                    </div>
                `).join('')}
            </section>
        </div>
    `;

    // Bind Back Button
    container.querySelector('#btnBack').addEventListener('click', onBack);

    // Bind Vibe Slider
    const grid = container.querySelector('#outfitGrid');
    container.querySelector('#vibeRange').addEventListener('input', (e) => {
        const val = e.target.value;
        // Adjust saturation based on slider
        grid.style.filter = `saturate(${val})`;
    });
};
