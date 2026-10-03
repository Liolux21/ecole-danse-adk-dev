import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'''(const settingsSnap = await getDocs\(collection\(db, "settings"\)\);\n\s*settingsSnap\.forEach\(doc => \{\n\s*if \(doc\.id === 'general'\) \{\n\s*this\.settings = doc\.data\(\);\n\s*if \(!this\.settings\.holidays\) this\.settings\.holidays = \[\];\n\s*\}\n\s*)(\}\);)'''
replacement = r'''\1if (doc.id === 'gala') {
                const galaData = doc.data();
                this.galaRepets = galaData.repets || [];
                this.galaInfos = galaData.infos || [];
                this.galaNotes = galaData.notes || [];
              }
            \2'''
js = re.sub(pattern, replacement, js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
