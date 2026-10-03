import os

with open('js/chat.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = "currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'élève'"
target_corrupted = "currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'lve'"

replacement = "currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'élève' || currentUser.role === 'eleve'"

if target in content:
    content = content.replace(target, replacement)
elif target_corrupted in content:
    content = content.replace(target_corrupted, replacement)
elif "currentUser.role === 'parent' || currentUser.role === 'student'" in content:
    # generic fallback if exact string isn't matched due to encoding
    content = content.replace("currentUser.role === 'parent' || currentUser.role === 'student'", "currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'eleve' || currentUser.role === 'élève'")

with open('js/chat.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched js/chat.js for eleve role.")
