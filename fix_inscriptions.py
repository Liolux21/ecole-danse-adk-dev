import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update syncFromFirebase to fetch inscriptions
fetch_code = """
      // 3. Fetch Courses
      const coursesSnap = await getDocs(collection(db, "courses"));
      this.courses = [];
      coursesSnap.forEach(doc => {
        this.courses.push({ id: doc.id, ...doc.data() });
      });

      // 4. Fetch Inscriptions
      const inscSnap = await getDocs(collection(db, "inscriptions"));
      this.inscriptions = [];
      inscSnap.forEach(doc => {
        this.inscriptions.push({ id: doc.id, ...doc.data() });
      });
"""
content = re.sub(r'\s*// 3\. Fetch Courses.*?(?=\s*// 4\. Fetch Announcements)', fetch_code, content, flags=re.DOTALL)

# 2. Update approveInscription to update Firebase
approve_code = """
  async approveInscription(id)        { 
    const i = this.inscriptions.find(i => i.id === id); 
    if (i) { 
      i.status = 'approved'; 
      try {
        const { doc, updateDoc } = await import('./firebase-config.js');
        await updateDoc(doc(db, "inscriptions", String(id)), { status: 'approved' });
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },
  async rejectInscription(id)         { 
    const i = this.inscriptions.find(i => i.id === id); 
    if (i) { 
      i.status = 'rejected'; 
      try {
        const { doc, updateDoc } = await import('./firebase-config.js');
        await updateDoc(doc(db, "inscriptions", String(id)), { status: 'rejected' });
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },
"""
content = re.sub(r'\s*approveInscription\(id\).*?rejectInscription\(id\)[^\n]*\n', approve_code, content, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated data.js")
