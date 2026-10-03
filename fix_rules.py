import re

with open('firestore.rules', 'r', encoding='utf-8') as f:
    content = f.read()

rules = """
    // Collection INSCRIPTIONS
    match /inscriptions/{inscId} {
      allow create: if true; // Tout le monde peut envoyer une demande d'inscription
      allow read, update, delete: if isAdmin();
    }
"""

content = content.replace("  }", rules + "\n  }")

with open('firestore.rules', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated firestore.rules")
