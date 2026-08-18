import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# I need to add initReveal() after initFooter(); in DOMContentLoaded
old_code = '''    initGalerie();
    initContact();
    initFooter();
    setTimeout(() => document.querySelector('.loader-wrapper')?.classList.add('hidden'), 500);'''

new_code = '''    initGalerie();
    initContact();
    initFooter();
    initReveal();
    setTimeout(() => document.querySelector('.loader-wrapper')?.classList.add('hidden'), 500);'''

if old_code in text:
    text = text.replace(old_code, new_code)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Fixed!")
else:
    print("Not found!")
