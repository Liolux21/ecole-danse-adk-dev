import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Add announcements array
if 'announcements: []' not in data:
    data = data.replace("messages: [],", "messages: [], announcements: [],")

# Add fetch logic in syncFromFirebase
fetch_logic = """
      // 4. Fetch Announcements
      try {
        const annSnap = await getDocs(collection(db, "announcements"));
        this.announcements = [];
        annSnap.forEach(doc => {
          this.announcements.push({ id: doc.id, ...doc.data() });
        });
        // Sort by timestamp desc
        this.announcements.sort((a, b) => b.timestamp - a.timestamp);
      } catch (err) {
        console.error("Error fetching announcements", err);
      }
"""
if 'Fetch Announcements' not in data:
    data = re.sub(r'(console\.log\([^\)]*synchronis.*?succ.*?\);)', fetch_logic + r'\n      \1', data, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data)

print('js/data.js updated')
