with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re

old_block = re.search(r'\.custom-select-container \{.*?.option-meta \{.*?\}', css, re.DOTALL)
if old_block:
    old_css = old_block.group(0)
    new_css = \"\"\"\.custom-select-container { position: relative; width: 100%; }
.custom-select-header { background: #ffffff; border: 1px solid rgba(0,0,0,0.2); border-radius: var(--radius-sm); padding: 0.6rem 1rem; min-height: 48px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: var(--transition); color: #333333; }
.custom-select-header:hover { border-color: #9C5858; }
.custom-select-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; flex: 1; }
.custom-select-tags .placeholder { color: rgba(0,0,0,0.4); font-size: 0.9rem; margin-top: 2px; }
.course-tag-pill { background: rgba(156,88,88,0.15); color: #9C5858; border: 1px solid rgba(156,88,88,0.3); border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.75rem; display: flex; align-items: center; gap: 0.4rem; }
.course-tag-pill .remove { cursor: pointer; opacity: 0.7; font-weight: bold; font-size: 1rem; line-height: 1; }
.course-tag-pill .remove:hover { opacity: 1; color: #9C5858; }
.custom-select-dropdown { position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: #ffffff; border: 1px solid rgba(0,0,0,0.2); border-radius: var(--radius-sm); z-index: 100; display: none; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.15); max-height: 300px; }
.custom-select-container.open .custom-select-dropdown { display: flex; }
.custom-select-container.open .dropdown-icon { transform: rotate(180deg); }
.custom-select-search { padding: 0.5rem; border-bottom: 1px solid rgba(0,0,0,0.1); }
.custom-select-search input { width: 100%; background: #f9f9f9; border: 1px solid rgba(0,0,0,0.2); border-radius: 4px; padding: 0.5rem 0.75rem; color: #333333; font-size: 0.85rem; outline: none; }
.custom-select-search input:focus { border-color: #9C5858; box-shadow: 0 0 0 3px rgba(156, 88, 88, 0.25); }
.custom-select-list { overflow-y: auto; flex: 1; padding: 0.5rem 0; }
.custom-select-option { padding: 0.5rem 1rem; display: flex; align-items: flex-start; gap: 0.6rem; cursor: pointer; transition: background 0.2s; font-size: 0.85rem; color: #333333; }
.custom-select-option:hover { background: rgba(0,0,0,0.05); }
.custom-select-option.selected { background: rgba(156,88,88,0.1); }
.custom-select-option input[type=\"checkbox\"] { pointer-events: none; accent-color: #9C5858; margin-top: 3px; }
.custom-select-option .option-meta { font-size: 0.7rem; color: #666666; display: block; margin-top: 0.2rem; }\"\"\"
    
    css = css.replace(old_css, new_css)
    with open('css/style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print(\"Replaced CSS!\")
else:
    print(\"Not found!\")
