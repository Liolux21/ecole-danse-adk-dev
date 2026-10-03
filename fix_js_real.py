import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Let's fix the broken backticks. First revert everything to double quotes:
# But we might have used backticks on purpose before? No, it was double quotes originally.
# To be safe, let's just find the exact content block for cours and fix it.
# Actually, the simplest way is to manually extract the JSON part, use Python to json.loads it
# Oh wait, json.loads won't work because of the unescaped newlines!
# So let's write a python regex that replaces \n inside double-quoted strings!
# Actually, since it's only in VITRINE_DATA.cours, let's find the content properties and convert them properly.

# Let's just find lines 65, 317 etc and fix them.
lines = js.split('\n')
for i in range(len(lines)):
    # Fix Anne:
    if 'Anne a créé l\'école' in lines[i] and lines[i].endswith('`'):
        lines[i] = lines[i][:-1] + '"'
    if 'Anne a créé l\'école' in lines[i] and lines[i].endswith('",'):
        pass # OK
        
    if '"content": "' in lines[i] and '`' in lines[i]:
        lines[i] = lines[i].replace('`', '"')
        
    # If line has unescaped newline (i.e. string doesn't end with quote)
    # Actually, Javascript template literal (backtick) is perfect. Let's just use backticks.
    # The problem was my naive replace `lines[i].replace('"content": "', '"content": `')`
    # changed `"content": "Anne..."` to `"content": `Anne..."` but didn't change the end quote because it ended with `",` instead of `"`
    
    # Let's do a better replace for ALL lines:
    if '"content": `' in lines[i]:
        lines[i] = lines[i].replace('"content": `', '"content": "')
        
    if lines[i].endswith('`,'):
        lines[i] = lines[i][:-2] + '",'
    if lines[i].endswith('`}'):
        lines[i] = lines[i][:-2] + '"}'

# Now all are double quotes again. 
# Let's find multiline strings and escape their newlines!
js = '\n'.join(lines)

# Find all "content": " ... " where there are newlines inside.
# Since it's hard, let's just fix the categories we added: 
# poledance, pomdance, girly, breakdance, streetjazz, hiphop, ragga

for key in ['poledance', 'pomdance', 'girly', 'breakdance', 'streetjazz', 'hiphop', 'ragga']:
    pattern = r'(\"' + key + r'\"[\s\S]*?\"content\":\s*\")([\s\S]*?)(\"[\s\S]*?\})'
    match = re.search(pattern, js)
    if match:
        content = match.group(2)
        # Escape newlines
        content = content.replace('\n', '\\n')
        js = js[:match.start(2)] + content + js[match.end(2):]

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
