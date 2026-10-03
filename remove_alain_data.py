import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove user Alain
js = re.sub(r"\s*\{ id: 17, email: 'alain@adk.be',.*?prof: 'Alain'.*?courseIds: \[26\] \},", "", js)

# Remove course Line Dance (id 26)
js = re.sub(r"\s*\{ id: 26, style: 'jazz',.*?prof: 'Alain',.*?\},", "", js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
