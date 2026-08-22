// theme.js
document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const isDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Add event listener to the toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        // Update icon based on initial state
        updateToggleIcon(isDark);
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentlyDark = document.documentElement.classList.contains('dark');
            
            if (currentlyDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateToggleIcon(false);
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcon(true);
            }
        });
    }
});

function updateToggleIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        if (isDark) {
            // Dark Mode -> Show Sun icon to switch to light
            icon.className = 'fas fa-sun';
            icon.style.color = '#f59e0b'; // Amber for sun
        } else {
            // Light Mode -> Show Moon icon to switch to dark
            icon.className = 'fas fa-moon';
            icon.style.color = '#3b82f6'; // Blue for moon
        }
    }
}
