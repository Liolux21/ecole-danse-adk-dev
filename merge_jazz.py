import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Change all remaining jazz and contemporain to jazz_contemporain
js = re.sub(r"style:\s*'jazz'", r"style: 'jazz_contemporain'", js)
js = re.sub(r"style:\s*'contemporain'", r"style: 'jazz_contemporain'", js)

# Also let's rename Jazz 3 and Jazz 4 correctly
js = re.sub(r"name:\s*'Jazz 3.*?'", r"name: 'Jazz Contemporain 3'", js)
js = re.sub(r"name:\s*'Jazz 4.*?'", r"name: 'Jazz Contemporain 4'", js)

# Remove the old jazz and contemporain categories from VITRINE_DATA.cours
js = re.sub(r'\"jazz\": \{.*?\},', '', js, flags=re.DOTALL)
js = re.sub(r'\"contemporain\": \{.*?\},', '', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
