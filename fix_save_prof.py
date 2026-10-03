import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_loop = """    // Update courses prof string
    // Here we make a simple synchronous loop to update the local object,
    // but in a real system you'd also update the course docs in Firebase.
    // For simplicity, we assume courses just hold the name locally and are saved if edited.
    for (let c of DATA.courses) {
      if (selectedTaughtIds.includes(String(c.id))) {
        if (!c.prof) {
          c.prof = fullName;
        } else if (!c.prof.includes(fullName)) {
          c.prof = c.prof + ' - ' + fullName;
        }
      } else {
        if (c.prof && c.prof.includes(fullName)) {
          c.prof = c.prof.split('-').map(p => p.trim()).filter(p => p !== fullName).join(' - ');
        }
      }
      
      // Update the course in Firebase too if we have time, but let's just do it directly:
      await firebase.updateDoc(firebase.doc(firebase.db, 'courses', String(c.id)), { prof: c.prof });
    }"""

new_loop = """    // Update courses prof string
    for (let c of DATA.courses) {
      let profChanged = false;
      let newProfString = c.prof || '';
      
      if (selectedTaughtIds.includes(String(c.id))) {
        if (!newProfString) {
          newProfString = fullName;
          profChanged = true;
        } else if (!newProfString.includes(fullName)) {
          newProfString = newProfString + ' - ' + fullName;
          profChanged = true;
        }
      } else {
        if (newProfString && newProfString.includes(fullName)) {
          newProfString = newProfString.split('-').map(p => p.trim()).filter(p => p !== fullName).join(' - ');
          profChanged = true;
        }
      }
      
      if (profChanged) {
        c.prof = newProfString;
        try {
          await firebase.updateDoc(firebase.doc(firebase.db, 'courses', String(c.id)), { prof: c.prof });
        } catch (e) {
          console.warn("Could not update course in Firebase: ", c.id, e);
          // If it doesn't exist, we could create it, but usually courses should exist.
        }
      }
    }"""

js = js.replace(old_loop, new_loop)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
