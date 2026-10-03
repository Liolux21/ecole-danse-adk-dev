import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I don't need to bump chat.js or style.css since this is purely a portail.html change,
# but the browser caches portail.html too. No cache buster for HTML itself, user just uses F5.
