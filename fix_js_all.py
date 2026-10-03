import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace "content": "..." with "content": `...` for every property in cours.
# First extract the cours object.
match = re.search(r'("cours":\s*\{)(.*?)(\},\n  "professeurs":)', js, re.DOTALL)
if match:
    cours_str = match.group(2)
    
    # regex to match "content": "..."
    # The string might contain newlines, so we use [\s\S]*?
    # but we must stop at the next "},
    
    # An easier way is just find all instances of "content": "..." and replace with backticks
    # since we know the content string ends with "\n    }
    cours_str = re.sub(r'("content":\s*)\"([\s\S]*?)\"\n\s*\}', r'\1`\2`\n    }', cours_str)
    
    # re-assemble
    js = js[:match.start(2)] + cours_str + js[match.end(2):]

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
