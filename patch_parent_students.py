import re

# Patch app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'const children = DATA.students.filter(s => (user.childrenIds || []).includes(s.id));',
    'const children = DATA.getStudentsForParent(user);'
)

content = content.replace(
    'const children = DATA.students.filter(s => (currentUser.childrenIds || []).includes(s.id));',
    'const children = DATA.getStudentsForParent(currentUser);'
)

# And replace `renderParentDashboard` which probably does the same thing:
# Let's check `renderParentDashboard` in app.js
