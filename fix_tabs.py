import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix data-tabs for messagerie
html = html.replace(
    '<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>\n            <button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>',
    '<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>\n            <button class="dash-tab" data-tab="admin-messagerie">💬 Messagerie</button>'
)

html = html.replace(
    '<button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="prof-notifications">',
    '<button class="dash-tab" data-tab="prof-messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="prof-notifications">'
)

html = html.replace(
    '<button class="dash-tab" data-tab="messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="parent-notifications">',
    '<button class="dash-tab" data-tab="parent-messagerie">💬 Messagerie</button>\n            <button class="dash-tab" data-tab="parent-notifications">'
)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
