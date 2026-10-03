import re

def fix_scope():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # We need to change:
    #     let q;
    #     if (currentUser.role === 'admin') {
    #         q = query(collection(db, 'conversations'));
    #     } else {
    #         let myGroups = ['all'];
    
    old_block = """    let q;
    if (currentUser.role === 'admin') {
        q = query(collection(db, 'conversations'));
    } else {
        let myGroups = ['all'];"""
        
    new_block = """    let q = query(collection(db, 'conversations'));
    let myGroups = ['all'];
    
    if (currentUser.role !== 'admin') {"""
    
    # Wait, if I replace this, the `}` at the end of the `else` block is still there!
    # Let me just use regex to fix `let myGroups` to `var myGroups` which is function-scoped!
    
    chat = chat.replace("let myGroups = ['all'];", "var myGroups = ['all'];")
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("chat.js scope fixed")

fix_scope()
