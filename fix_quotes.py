import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("onclick=\"adminApprove()\"", "onclick=\"adminApprove('')\"")
content = content.replace("onclick=\"adminReject()\"", "onclick=\"adminReject('')\"")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated app.js quotes")
