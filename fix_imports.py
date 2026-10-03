import re

def fix_imports():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # Find the import line
    import_line_pattern = r"import \{ (.*?) \} from '\./firebase-config\.js';"
    match = re.search(import_line_pattern, chat)
    if match:
        imports = match.group(1)
        if "getDoc" not in imports:
            new_imports = imports.replace("getDocs", "getDoc, getDocs")
            new_line = f"import {{ {new_imports} }} from './firebase-config.js';"
            chat = chat.replace(match.group(0), new_line)

    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed")

fix_imports()
