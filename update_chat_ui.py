import re

with open('js/chat.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update disclaimer in the chat UI
html_disclaimer = """
      <!-- Chat Header -->
      <div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h3 id="active-chat-title" style="margin:0; font-size: 1.1rem; color: var(--gold);">Sélectionnez une discussion</h3>
          <span style="font-size: 0.7rem; color: #e74c3c; font-weight: 600; display: inline-block; margin-top: 4px;">&#9888; Les discussions sont modérées et visibles par l'administration.</span>
        </div>
      </div>
"""

# wait I need to update portail.html for the UI changes
