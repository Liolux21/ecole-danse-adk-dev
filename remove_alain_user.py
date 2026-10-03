with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "alain@adk.be" in line:
        continue
    new_lines.append(line)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
