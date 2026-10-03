import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will find all instances of "content": "..." and replace with backticks
# But ONLY if the content doesn't already use backticks.
# We will do this by finding "content": and the following string.
# Since it's hard to parse JSON with regex, let's just find the exact lines
# The error was at line 317. Let's look at the lines around there and replace the quotes.

lines = js.split('\n')
in_content = False
for i, line in enumerate(lines):
    if '"content": "' in line and not in_content:
        # Check if the string closes on the same line
        # But wait, it spans multiple lines!
        # So we replace the starting quote:
        lines[i] = line.replace('"content": "', '"content": `')
        in_content = True
        # If it closes on the same line:
        if line.endswith('",') or line.endswith('"}') or line.endswith('"'):
            # wait, if it closes on the same line, the replace won't touch the closing quote
            # Let's just do a naive replace: replace the LAST double quote of the line with a backtick?
            # Actually, it's easier to just find the closing quote.
            pass
            
    if in_content:
        # Check if this line has the closing quote
        if line.endswith('",'):
            lines[i] = line[:-2] + '`,'
            in_content = False
        elif line.endswith('"}'):
            lines[i] = line[:-2] + '`}'
            in_content = False
        elif line.endswith('"') and not line.endswith('`'):
            lines[i] = line[:-1] + '`'
            in_content = False

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
