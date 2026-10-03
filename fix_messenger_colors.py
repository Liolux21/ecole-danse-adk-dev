import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix .conv-avatar
old_avatar = """.conv-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gold-light);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}"""
new_avatar = """.conv-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E8D0C3 !important;
  color: #4A3E3E !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}"""
css = css.replace(old_avatar, new_avatar)

# Fix .msg-bubble background
old_bubble_me = """.msg-row.me .msg-bubble {
  background: var(--gold);
  color: #fff;
  border-bottom-right-radius: 2px;
}"""
new_bubble_me = """.msg-row.me .msg-bubble {
  background: #CAA9A9 !important;
  color: #fff !important;
  border-bottom-right-radius: 2px;
}"""
css = css.replace(old_bubble_me, new_bubble_me)

old_bubble_other = """.msg-row.other .msg-bubble {
  background: #fff;
  border: 1px solid var(--border);
  color: var(--white);
  border-bottom-left-radius: 2px;
}"""
new_bubble_other = """.msg-row.other .msg-bubble {
  background: #fff !important;
  border: 1px solid rgba(202, 169, 169, 0.4) !important;
  color: #4A3E3E !important;
  border-bottom-left-radius: 2px;
}"""
css = css.replace(old_bubble_other, new_bubble_other)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
