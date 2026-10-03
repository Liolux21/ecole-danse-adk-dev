import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add prof_hours array
js = js.replace("attendance: [],", "attendance: [],\n\n  // ---- HEURES PROFS ----\n  prof_hours: [],")

# Add fetch logic in syncFromFirebase
fetch_logic = """
      // 5. Fetch Prof Hours
      try {
        const phSnap = await getDocs(collection(db, "prof_hours"));
        this.prof_hours = [];
        phSnap.forEach(doc => {
          this.prof_hours.push({ id: doc.id, ...doc.data() });
        });
      } catch (e) {
        console.warn("prof_hours collection missing or error: ", e);
      }
"""

js = js.replace("// 4. Fetch Announcements", fetch_logic + "\n      // 6. Fetch Announcements")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
