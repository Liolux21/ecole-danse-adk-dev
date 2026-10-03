import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update title for jazz_contemporain
js = re.sub(r'("jazz_contemporain":\s*\{\s*"title":\s*)"Contemporain / Jazz"', r'\1"Jazz Contemporain"', js)

# Update title for hiphop
js = re.sub(r'("hiphop":\s*\{\s*"title":\s*)"Hip-Hop & Break"', r'\1"Hip-Hop"', js)

# Update title for ragga
js = re.sub(r'("ragga":\s*\{\s*"title":\s*)"Ragga & Girly"', r'\1"Ragga"', js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
