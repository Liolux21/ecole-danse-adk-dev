import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern_data = r'export const DATA = \{\n\s*users: \[\],\n\s*students: \[\],\n\s*courses: \[\],\n\s*inscriptions: \[\],\n\s*profHours: \[\],\n\s*announcements: \[\],'
replacement_data = r'''export const DATA = {
  users: [],
  students: [],
  courses: [],
  inscriptions: [],
  profHours: [],
  announcements: [],
  settings: { season: {}, holidays: [] },'''

js = re.sub(pattern_data, replacement_data, js)

pattern_fetch = r'const annSnap = await getDocs\(collection\(db, "announcements"\)\);\n\s*DATA\.announcements = annSnap\.docs\.map\(d => \(\{ id: d\.id, \.\.\.d\.data\(\) \}\)\);'
replacement_fetch = r'''const annSnap = await getDocs(collection(db, "announcements"));
      DATA.announcements = annSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      try {
        const settingsSnap = await getDocs(collection(db, "settings"));
        settingsSnap.forEach(doc => {
          if (doc.id === 'general') {
            DATA.settings = doc.data();
            if (!DATA.settings.holidays) DATA.settings.holidays = [];
          }
        });
      } catch(e) {
        console.warn("Could not fetch settings: ", e);
      }'''

js = re.sub(pattern_fetch, replacement_fetch, js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
