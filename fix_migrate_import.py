import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add import before first use
content = content.replace(
    'const snap = await firebase.getDocs(firebase.collection(firebase.db, "courses"));',
    "const firebase = await import('./firebase-config.js');\n    const snap = await firebase.getDocs(firebase.collection(firebase.db, \"courses\"));"
)

# Fix 2: Add import before second use (in the IIFE)
content = content.replace(
    'const originalCourses = window.DATA.courses;',
    "const firebase = await import('./firebase-config.js');\n      const originalCourses = window.DATA.courses;"
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
