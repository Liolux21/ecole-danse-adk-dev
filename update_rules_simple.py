import re

def update_rules():
    with open('firestore.rules', 'r', encoding='utf-8') as f:
        rules = f.read()

    # We will replace the read rule for conversations
    old_rule = "allow read: if isConvParticipant() || isAdmin() || (isAuthenticated() && resource.data.isGroup == true);"
    new_rule = "allow read: if isAuthenticated();"
    
    rules = rules.replace(old_rule, new_rule)
    
    old_msg_rule = "allow read: if isParentConvParticipant() || isAdmin() || (isAuthenticated() && getParentConv().isGroup == true);"
    new_msg_rule = "allow read: if isAuthenticated();"
    
    rules = rules.replace(old_msg_rule, new_msg_rule)
    
    with open('firestore.rules', 'w', encoding='utf-8') as f:
        f.write(rules)
    print("Success")

update_rules()
