import re

def fix_create_bug():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # The buggy lines are:
    #                 setTimeout(() => window.switchChat(newConvRef.id, ''), 300);
    #             }
    #             selectedOtoUser = null;
    #             window.switchChat(newConvRef.id, title);
    #         } catch(e) {
    
    old_code = """                    // Open the chat
                    setTimeout(() => window.switchChat(newConvRef.id, ''), 300);
                }
                selectedOtoUser = null;
                window.switchChat(newConvRef.id, title);
            } catch(e) {"""
            
    new_code = """                    // Open the chat
                    setTimeout(() => window.switchChat(newConvRef.id, ''), 300);
                }
                selectedOtoUser = null;
            } catch(e) {"""

    chat = chat.replace(old_code, new_code)
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed")

fix_create_bug()
