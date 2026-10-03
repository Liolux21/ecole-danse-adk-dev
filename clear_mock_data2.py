import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will find the block from "students: [" to "]," and replace it with "students: [],"
def clear_array(name, content):
    pattern = rf"{name}: \[.*?^\s*\],"
    return re.sub(pattern, f"{name}: [],", content, flags=re.MULTILINE | re.DOTALL)

js = clear_array("users", js)
js = clear_array("students", js)
js = clear_array("attendance", js)
js = clear_array("inscriptions", js)
js = clear_array("announcements", js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
