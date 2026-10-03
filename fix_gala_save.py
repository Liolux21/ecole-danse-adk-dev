import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

helper = r'''window.saveGalaToFirebase = async function() {
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'gala'), {
      repets: DATA.galaRepets || [],
      infos: DATA.galaInfos || [],
      notes: DATA.galaNotes || []
    }, { merge: true });
  } catch(err) {
    console.error("Gala save error", err);
    showToast("Erreur de sauvegarde Gala", "error");
  }
};
'''

# Add helper after `if (!DATA.galaNotes) DATA.galaNotes = [];`
pattern_init = r'(if \(!DATA\.galaNotes\) DATA\.galaNotes = \[\];)'
js = re.sub(pattern_init, r'\1\n' + helper, js)


def add_save_call(pattern):
    return re.sub(pattern, r'\1\n  saveGalaToFirebase();', js)

# 1. saveGalaRep
js = add_save_call(r'(window\.saveGalaRep = .*?closeModal\(\'modal-gala-rep\'\);\n\s*renderGalaTables\(\);)')
js = add_save_call(r'(window\.deleteGalaRep = .*?renderGalaTables\(\);)')

# 2. saveGalaInfo
js = add_save_call(r'(window\.saveGalaInfo = .*?closeModal\(\'modal-gala-info\'\);\n\s*renderGalaTables\(\);)')
js = add_save_call(r'(window\.deleteGalaInfo = .*?renderGalaTables\(\);)')

# 3. saveGalaNote
js = add_save_call(r'(window\.saveGalaNote = .*?closeModal\(\'modal-gala-note\'\);\n\s*renderGalaTables\(\);)')
js = add_save_call(r'(window\.deleteGalaNote = .*?renderGalaTables\(\);)')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
