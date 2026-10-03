import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace image for id: 1
js = re.sub(
    r"({ id: 1,.*?image:\s*)'assets/images/eveil_kids.png'(\s*})",
    r"\1'assets/images/eveil_3_4_ans.png'\2",
    js
)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
