import sys

filepath = r'C:\Users\lione\OneDrive\Documents\ADK-VITRINE\js\data.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

target = "results[2].value.forEach(doc => this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() }));"
replacement = """results[2].value.forEach(doc => {
            let c = { docId: doc.id, id: doc.id, ...doc.data() };
            if (c.name === 'COMPAGNIE MOOVE') c.name = 'ADK MOOVE';
            if (c.name === 'COMPAGNIE UNITY') c.name = 'ADK UNITY';
            if (c.name === 'COMPAGNIE TEAM') c.name = 'ADK TEAM';
            this.courses.push(c);
          });"""

if target in content:
    content = content.replace(target, replacement)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched successfully!")
else:
    print("Target not found. It may have already been modified.")
