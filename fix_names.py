content = open('js/app.js', 'r', encoding='utf-8').read()

# Fix PROF_FULL_NAMES
content = content.replace("'Florence': 'Florence', 'Adam': 'Adam'", "'Florence': 'Florence Leyens', 'Adam': 'Adam Binoua'")

# Fix data.js references in app.js (the student import block embeds data inline, so no change needed there)
open('js/app.js', 'w', encoding='utf-8').write(content)

content2 = open('js/data.js', 'r', encoding='utf-8').read()
content2 = content2.replace("prof: 'Florence'", "prof: 'Florence Leyens'")
content2 = content2.replace("prof: 'Adam'", "prof: 'Adam Binoua'")
open('js/data.js', 'w', encoding='utf-8').write(content2)

print("Done!")
