import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
new_meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'

if old_meta in content:
    content = content.replace(old_meta, new_meta)
    
    # Also add a CSS rule just in case the meta tag is ignored by some iOS versions
    css_to_add = """
    /* Prevent iOS auto-zoom on inputs */
    @media screen and (max-width: 768px) {
      input, select, textarea {
        font-size: 16px !important;
      }
    }
    """
    # Insert before </style>
    style_end = content.find('</style>')
    if style_end != -1:
        content = content[:style_end] + css_to_add + content[style_end:]

    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Viewport meta tag updated successfully.")
else:
    print("Meta tag not found.")
