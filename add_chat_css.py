import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

chat_css = """
/* --- MESSENGER CSS --- */
.conv-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}
.conv-item:hover, .conv-item.active {
  background: rgba(202, 169, 169, 0.1);
}
.conv-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gold-light);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.conv-info {
  flex: 1;
  overflow: hidden;
}
.conv-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}
.conv-name {
  font-weight: 600;
  color: var(--white);
  font-size: 0.95rem;
}
.conv-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.conv-preview {
  font-size: 0.85rem;
  color: var(--text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.msg-row {
  display: flex;
  width: 100%;
}
.msg-row.me {
  justify-content: flex-end;
}
.msg-row.other {
  justify-content: flex-start;
}
.msg-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
  position: relative;
}
.msg-row.me .msg-bubble {
  background: var(--gold);
  color: #fff;
  border-bottom-right-radius: 2px;
}
.msg-row.other .msg-bubble {
  background: #fff;
  border: 1px solid var(--border);
  color: var(--white);
  border-bottom-left-radius: 2px;
}
.msg-meta {
  font-size: 0.7rem;
  text-align: right;
  margin-top: 5px;
  opacity: 0.8;
}
"""

if "/* --- MESSENGER CSS --- */" not in css:
    with open('css/style.css', 'a', encoding='utf-8') as f:
        f.write('\n' + chat_css)
