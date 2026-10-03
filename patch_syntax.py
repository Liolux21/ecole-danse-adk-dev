import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken line
old_line = "dobVal = ${parts[2]}--;"
new_line = "dobVal = `${parts[2]}-${parts[1]}-${parts[0]}`;"
content = content.replace(old_line, new_line)

# Also there might be a broken part if the powershell evaluated parts[1] and parts[0] ?
# Wait, powershell swallowed the backticks, but did it evaluate ${parts[1]}?
# In powershell, ${parts[1]} is not a valid variable unless $parts exists, so it evaluates to empty string?
# Let's just rewrite that entire if block robustly.

old_block = '''    let dobVal = student.dob || '';
    if (dobVal && dobVal.includes('/')) {
        const parts = dobVal.split('/');
        if (parts.length === 3) {
            dobVal = ${parts[2]}--;
        }
    }'''

new_block = '''    let dobVal = student.dob || '';
    if (dobVal && dobVal.includes('/')) {
        const parts = dobVal.split('/');
        if (parts.length === 3) {
            dobVal = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }'''

content = content.replace(old_block, new_block)

# Since I don't know exactly what PowerShell produced, I'll use regex to fix it.
content = re.sub(
    r"dobVal = \$\{parts\[2\]\}.*?;",
    r"dobVal = `${parts[2]}-${parts[1]}-${parts[0]}`;",
    content
)


with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Syntax fixed")
