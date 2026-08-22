const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // 1. Add theme.js to <head>
    if (!content.includes('theme.js')) {
        content = content.replace('</head>', '<script src="theme.js"></script></head>');
        modified = true;
    }
    
    // 2. Update Tailwind config
    if (content.includes('tailwind.config={theme:') && !content.includes("darkMode:")) {
        content = content.replace('tailwind.config={theme:', 'tailwind.config={darkMode: "class",theme:');
        modified = true;
    }

    // 3. Update body classes
    if (content.match(/<body class="[^"]*"/)) {
        content = content.replace(/<body class="[^"]*"/, '<body class="bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300"');
        modified = true;
    }

    // 4. Replace WhatsApp button with Theme Toggle
    const themeToggleHtml = `<!-- Theme Toggle Button -->
<a href="#" id="theme-toggle" class="fixed bottom-6 right-6 z-[99] bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:scale-110 transition-all duration-300 border border-slate-200 dark:border-slate-700">
    <i class="fas fa-moon"></i>
</a>`;

    if (content.includes('<!-- Floating WhatsApp Button -->')) {
        content = content.replace(/<!-- Floating WhatsApp Button -->[\s\S]*?<\/a>/, themeToggleHtml);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");
