import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_reject = \"\"\"  async rejectInscription(id)         { 
    const i = this.inscriptions.find(i => String(i.id) === String(id)); 
    if (i) { 
      i.status = 'rejected'; 
      try {
        const { doc, updateDoc } = await import('./firebase-config.js');
        await updateDoc(doc(db, \"inscriptions\", String(id)), { status: 'rejected' });
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },\"\"\"

new_reject = \"\"\"  async rejectInscription(id)         { 
    const idx = this.inscriptions.findIndex(i => String(i.id) === String(id)); 
    if (idx !== -1) { 
      try {
        const { doc, deleteDoc } = await import('./firebase-config.js');
        await deleteDoc(doc(db, \"inscriptions\", String(id)));
        this.inscriptions.splice(idx, 1);
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },\"\"\"

js = js.replace(old_reject, new_reject)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated reject logic!")
