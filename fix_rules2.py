import re

with open('firestore.rules', 'r', encoding='utf-8') as f:
    content = f.read()

rules = """
    // Collection INSCRIPTIONS
    match /inscriptions/{inscId} {
      allow create: if true; // Tout le monde peut envoyer une demande
      allow read, update, delete: if isAdmin();
    }
"""

content = content.replace("    // Fallback global", rules + "\n    // Fallback global")

with open('firestore.rules', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated firestore.rules safely")
