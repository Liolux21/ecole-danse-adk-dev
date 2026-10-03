import re

def update_rules():
    with open('firestore.rules', 'r', encoding='utf-8') as f:
        rules = f.read()

    chat_rules_target = """    // =========================================================
    // MESSAGERIE / CHAT
    // =========================================================
    match /conversations/{conversationId} {
      
      function isConvParticipant() {
        return isAuthenticated() && (request.auth.token.email in resource.data.participants);
      }
      
      allow read: if isConvParticipant() || isAdmin() || (isAuthenticated() && resource.data.isGroup == true);
      allow create: if isAuthenticated(); 
      allow update: if isConvParticipant() || isAdmin() || (isAuthenticated() && resource.data.isGroup == true);

      // SOUS-COLLECTION MESSAGES
      match /messages/{messageId} {
      
        function getParentConv() {
          return get(/databases/$(database)/documents/conversations/$(conversationId)).data;
        }
        
        function isParentConvParticipant() {
          return isAuthenticated() && (request.auth.token.email in getParentConv().participants);
        }
        
        allow read: if isParentConvParticipant() || isAdmin() || (isAuthenticated() && getParentConv().isGroup == true);
        allow create: if (isParentConvParticipant() || isAdmin() || (isAuthenticated() && getParentConv().isGroup == true)) && request.resource.data.senderId == request.auth.token.email;
        allow delete: if isAdmin() || resource.data.senderId == request.auth.token.email;
      }
    }"""
    
    start_str = "// ========================================================="
    idx = rules.find(start_str, rules.find(start_str) + 10)
    if idx == -1:
        print("Could not find start str")
        return
        
    end_str = "    // Règle de secours"
    end_idx = rules.find(end_str)
    if end_idx == -1:
        end_str = "    // Rgle de secours"
        end_idx = rules.find(end_str)
        if end_idx == -1:
            print("Could not find end str")
            return
            
    rules = rules[:idx] + chat_rules_target + "\n\n" + rules[end_idx:]
    
    with open('firestore.rules', 'w', encoding='utf-8') as f:
        f.write(rules)
    print("Success")

update_rules()
