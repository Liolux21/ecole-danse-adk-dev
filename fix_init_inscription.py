import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

submit_code = """
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    try {
      const { db, collection, addDoc, doc, setDoc } = await import('./firebase-config.js');
      const coursesNames = Array.from(selectedCourses).map(id => {
        const c = DATA.getCourseById(id);
        return c ? c.name : null;
      }).filter(Boolean);

      const insData = {
        childName: document.getElementById('child-firstname').value + ' ' + document.getElementById('child-lastname').value,
        age: (new Date().getFullYear()) - (new Date(document.getElementById('child-birth').value).getFullYear()),
        level: document.getElementById('child-level').value,
        parentName: document.getElementById('parent-firstname').value + ' ' + document.getElementById('parent-lastname').value,
        email: document.getElementById('parent-email-form').value,
        phone: document.getElementById('parent-phone').value,
        message: document.getElementById('form-message').value,
        courses: coursesNames,
        status: 'pending',
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: Date.now()
      };

      const docRef = doc(collection(db, "inscriptions"));
      await setDoc(docRef, insData);

      form.style.display = 'none';
      success.style.display = 'block';
    } catch(err) {
      console.error(err);
      alert("Erreur lors de l'envoi de l'inscription.");
      btn.textContent = 'Envoyer ma demande d\\'inscription';
      btn.disabled = false;
    }
  });
"""

# Replace the old form.addEventListener('submit', ...
content = re.sub(r"form\.addEventListener\('submit', e => \{.*?\setTimeout.*?\}\);\n", submit_code, content, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated app.js")
