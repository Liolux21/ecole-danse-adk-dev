import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add new variables
vars_to_add = r'''  --primary: #9C5858;
  --danger: #DC6464;
'''
if '--primary:' not in css:
    css = css.replace('--gold: #CAA9A9;', vars_to_add + '  --gold: #CAA9A9;')

# Normalize colors
css = css.replace('#9C5858', 'var(--primary)')
css = css.replace('#CAA9A9', 'var(--gold)')
css = css.replace('#DC6464', 'var(--danger)')
css = css.replace('#e74c3c', 'var(--danger)')
css = css.replace('#ffffff', 'var(--dark)') # Wait, white is used in backgrounds. No, #ffffff should just be #ffffff or white.

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('style.css normalized')
