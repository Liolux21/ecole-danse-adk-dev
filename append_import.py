import json

# Read the generated JS function
fn_code = open('student_import_fn.js', encoding='utf-8').read()

# Append to app.js
with open('js/app.js', 'a', encoding='utf-8') as f:
    f.write('\n\n' + fn_code)

print("Done! Function appended to app.js")
