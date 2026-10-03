with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add missing tag colors
new_tags = """
.tag-adultes           { background: #8c92ac; color: #ffffff; border: 1px solid #8c92ac; }
.tag-poledance         { background: #E8A2B9; color: #ffffff; border: 1px solid #E8A2B9; }
.tag-pomdance          { background: #FF9999; color: #ffffff; border: 1px solid #FF9999; }
.tag-girly             { background: #F28CDB; color: #ffffff; border: 1px solid #F28CDB; }
.tag-breakdance        { background: #5C8ABF; color: #ffffff; border: 1px solid #5C8ABF; }
.tag-streetjazz        { background: #A66352; color: #ffffff; border: 1px solid #A66352; }
.tag-ballet_pointes    { background: #D48CBF; color: #ffffff; border: 1px solid #D48CBF; }
.tag-jazz_contemporain { background: #C9A84C; color: #ffffff; border: 1px solid #C9A84C; }
"""

css = css.replace('.tag-special     { background: #DC8C50; color: #ffffff; border: 1px solid #DC8C50; }', 
                  '.tag-special     { background: #DC8C50; color: #ffffff; border: 1px solid #DC8C50; }\n' + new_tags)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
