import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace Pauline avatar
js = re.sub(r'("Pauline": \{.*?"avatar": ").*?(",)', r'\1assets/images/hiphop_dancer.png\2', js, flags=re.DOTALL)
js = re.sub(r'("Pauline": \{.*?"modalImage": ").*?(",)', r'\1assets/images/hiphop_dancer.png\2', js, flags=re.DOTALL)

# Replace Alain avatar
js = re.sub(r'("Alain": \{.*?"avatar": ").*?(",)', r'\1assets/images/dance_jazz.png\2', js, flags=re.DOTALL)
js = re.sub(r'("Alain": \{.*?"modalImage": ").*?(",)', r'\1assets/images/dance_jazz.png\2', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
