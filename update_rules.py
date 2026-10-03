import re

def update_rules():
    with open('firestore.rules', 'r', encoding='utf-8') as f:
        rules = f.read()

    # Fix String
    rules = rules.replace("String(studentId)", "string(studentId)")

    # Update conversation rules
    chat_rules_target = """    // =========================================================
    // MESSAGERIE / CHAT
    // =========================================================
    match /conversations/{conversationId} {
      
      // Fonction pour vǸrifier si l'utilisateur est dans la conversation
      function isConvParticipant() {
        return isAuthenticated() && (request.auth.token.email in resource.data.participants);
      }
      
      allow read: if isConvParticipant() || isAdmin();
      allow create: if isAuthenticated(); 
      allow update: if isConvParticipant() || isAdmin();

      // SOUS-COLLECTION MESSAGES
      match /messages/{messageId} {
      
        // Fonction spǸcifique pour lire les participants dans le document parent
        function isParentConvParticipant() {
          return isAuthenticated() && (request.auth.token.email in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants);
        }
      
        // Lecture, Ajout et Suppression
        allow read: if isParentConvParticipant() || isAdmin();
        allow create: if (isParentConvParticipant() || isAdmin()) && request.resource.data.senderId == request.auth.token.email;
        allow delete: if isAdmin() || resource.data.senderId == request.auth.token.email;
      }
    }"""
    
    new_chat_rules = """    // =========================================================
    // MESSAGERIE / CHAT
    // =========================================================
    match /conversations/{conversationId} {
      
      function isConvParticipant() {
        return isAuthenticated() && (request.auth.token.email in resource.data.participants);
      }
      
      function isAllowedGroup() {
        let tg = resource.data.targetGroup;
        return isAuthenticated() && resource.data.isGroup == true && (
          (tg == 'all') || 
          (tg == 'all_students') || 
          (tg == 'all_profs' && (isProf() || isAdmin())) ||
          (tg.matches('course_.*'))
        );
      }
      
      allow read: if isConvParticipant() || isAdmin() || isAllowedGroup();
      allow create: if isAuthenticated(); 
      allow update: if isConvParticipant() || isAdmin() || isAllowedGroup();

      // SOUS-COLLECTION MESSAGES
      match /messages/{messageId} {
      
        function getParentConv() {
          return get(/databases/$(database)/documents/conversations/$(conversationId)).data;
        }
        
        function isParentConvParticipant() {
          return isAuthenticated() && (request.auth.token.email in getParentConv().participants);
        }
        
        function isParentAllowedGroup() {
          let parentData = getParentConv();
          let tg = parentData.targetGroup;
          return isAuthenticated() && parentData.isGroup == true && (
            (tg == 'all') || 
            (tg == 'all_students') || 
            (tg == 'all_profs' && (isProf() || isAdmin())) ||
            (tg.matches('course_.*'))
          );
        }
      
        allow read: if isParentConvParticipant() || isAdmin() || isParentAllowedGroup();
        allow create: if (isParentConvParticipant() || isAdmin() || isParentAllowedGroup()) && request.resource.data.senderId == request.auth.token.email;
        allow delete: if isAdmin() || resource.data.senderId == request.auth.token.email;
      }
    }"""
    
    # We use regex to replace because of encoding issues with "vǸrifier" vs "v\xe9rifier" in the template
    # I'll just rewrite the file content manually for the whole block
    start_str = "// ========================================================="
    idx = rules.find(start_str, rules.find(start_str) + 10) # Find the second occurrence which is MESSAGERIE / CHAT
    if idx == -1:
        print("Could not find start str")
        return
        
    end_str = "    // Rgle de secours"
    end_idx = rules.find(end_str)
    if end_idx == -1:
        end_str = "    // Règle de secours"
        end_idx = rules.find(end_str)
        if end_idx == -1:
            print("Could not find end str")
            return
            
    rules = rules[:idx] + new_chat_rules + "\n\n" + rules[end_idx:]
    
    with open('firestore.rules', 'w', encoding='utf-8') as f:
        f.write(rules)
    print("Success")

update_rules()
