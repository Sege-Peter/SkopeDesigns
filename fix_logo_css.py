import os
import glob
import re

html_files = glob.glob('c:\\xampp\\htdocs\\SkopeDesigns-main\\*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix logo bolding and coloring
    # The logo appears in the header and the footer
    # Usually: <span class="font-bold text-lg tracking-wide gradient-text">SKOPE DESIGNS</span>
    # Or in footer: <span class="block font-bold text-xl tracking-wider gradient-text">SKOPE DESIGNS</span>
    
    # We'll use regex to find and replace it
    pattern_logo = r'(<span class="[^"]*font-bold[^"]*gradient-text">)SKOPE DESIGNS(</span>)'
    def replace_logo(match):
        cls_str = match.group(1).replace('font-bold', 'font-black text-[22px]')
        # Remove gradient-text from the outer span since we'll put it on DESIGNS
        cls_str = cls_str.replace('gradient-text', '')
        return f'{cls_str}<span class="text-secondary">SKOPE</span> <span class="gradient-text">DESIGNS</span>{match.group(2)}'
    
    content = re.sub(pattern_logo, replace_logo, content)

    # Fix CSS syntax error 1
    #       100% {
    #         background-position: 300% 50%;
    #       }
    #     }
    #     #header.scrolled 
    #     /* Animated background for cards */
    
    err_pattern1 = r'100%\s*\{\s*background-position:\s*300%\s*50%;\s*\}\s*\}\s*#header\.scrolled\s*/\* Animated background for cards \*/'
    content = re.sub(err_pattern1, '/* Animated background for cards */', content)
    
    # Fix CSS syntax error 2
    #       100% { transform: translateY(200%); opacity: 0; }
    #     }
    #   html { scroll-behavior: smooth; overflow-x: hidden; }
    err_pattern2 = r'100%\s*\{\s*transform:\s*translateY\(200%\);\s*opacity:\s*0;\s*\}\s*\}\s*html\s*\{'
    content = re.sub(err_pattern2, 'html {', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Logo and CSS fixes applied.")
