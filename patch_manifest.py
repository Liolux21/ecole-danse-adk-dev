import json

with open('manifest.json', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Check for BOM
if content.startswith('\ufeff') or content.startswith('\ufffe'):
    content = content[1:]

content = content.replace('"start_url": "./portail.html"', '"start_url": "./"')
content = content.replace('"start_url": ".\\/portail.html"', '"start_url": "./"')

with open('manifest.json', 'w', encoding='utf-8') as f:
    f.write(content)
