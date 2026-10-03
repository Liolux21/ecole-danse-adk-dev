import re

def bump():
    with open('portail.html', 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace("js/chat.js?v=28", "js/chat.js?v=29")
    html = html.replace("css/style.css?v=204", "css/style.css?v=205")

    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Success")

bump()
