import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'const annSnap = await getDocs\(collection\(db, "announcements"\)\);\n\s*this\.announcements = \[\];\n\s*annSnap\.forEach\(doc => \{\n\s*this\.announcements\.push\(\{ id: doc\.id, \.\.\.doc\.data\(\) \}\);\n\s*\}\);'

replacement = r'''const annSnap = await getDocs(collection(db, "announcements"));
        this.announcements = [];
        annSnap.forEach(doc => {
          this.announcements.push({ id: doc.id, ...doc.data() });
        });
        
        try {
          const settingsSnap = await getDocs(collection(db, "settings"));
          settingsSnap.forEach(doc => {
            if (doc.id === 'general') {
              this.settings = doc.data();
              if (!this.settings.holidays) this.settings.holidays = [];
            }
          });
        } catch(e) {
          console.warn("Settings fetch failed", e);
        }'''

js = re.sub(pattern, replacement, js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
