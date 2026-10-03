import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'''    if \(isNew\) \{\n\s*DATA\.courses\.push\(\{ docId: targetDocId, \.\.\.courseData \}\);\n\s*\} else \{\n\s*const existing = DATA\.getCourseById\(id\);\n\s*if \(existing\) Object\.assign\(existing, courseData\);\n\s*\}\n\};\n\nwindow\.deleteAnnonce'''

replacement = r'''    if (isNew) {
      DATA.courses.push({ docId: targetDocId, ...courseData });
    } else {
      const existing = DATA.getCourseById(id);
      if (existing) Object.assign(existing, courseData);
    }
    
    closeModal('modal-admin-course');
    renderAdminCourses();
    showToast('Cours sauvegardé', 'success');
  } catch(err) {
    console.error(err);
    showToast('❌ Erreur lors de la sauvegarde', 'error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};

window.deleteAnnonce'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
