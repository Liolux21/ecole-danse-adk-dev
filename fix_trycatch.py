import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace initInscription call with try-catch
content = content.replace("  initInscription();", "  try { initInscription(); } catch(e) { console.error('Error in initInscription:', e); }")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Added try-catch to initInscription")
