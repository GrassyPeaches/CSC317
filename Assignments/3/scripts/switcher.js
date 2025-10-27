document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-button');
    const themeStylesheet = document.getElementById('css-theme');

    function setActiveTheme(themeName) {
        // Set stylesheet
        themeStylesheet.href = `styles/${themeName}.css`;

        // Highlight active
        themeButtons.forEach(btn => {
            (btn.dataset.theme === themeName)
                ? btn.classList.add('active')
                : btn.classList.remove('active');
        });

        // Save preference
        localStorage.setItem('preferredTheme', themeName);
    }

    // On click, switch theme
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeName = btn.dataset.theme;
            setActiveTheme(themeName);
        });
    });

    // Load saved theme on refresh
    const saved = localStorage.getItem('preferredTheme');
    if (saved) {
        setActiveTheme(saved);
    }
});
