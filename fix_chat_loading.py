import re

def rewrite_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # Fix the crash
    chat = chat.replace("document.getElementById('new-chat-title').value = '';", "")
    
    # Fix the query issue
    start_str = "    let q;"
    end_str = "    onSnapshot(q, (snapshot) => {"
    
    start_idx = chat.find(start_str)
    end_idx = chat.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find query block")
        return

    replacement = """    let myGroups = ['all'];
    if (currentUser.role === 'prof') {
        myGroups.push('all_profs');
        if (currentUser.courseIds) {
            currentUser.courseIds.forEach(cid => myGroups.push(`course_${cid}`));
        }
    } else if (currentUser.role === 'parent' || currentUser.role === 'student' || currentUser.role === 'élève') {
        myGroups.push('all_students');
        if (window.DATA && window.DATA.students) {
            const children = window.DATA.students.filter(s => (currentUser.childrenIds || []).includes(s.id) || s.id === currentUser.id);
            children.forEach(ch => {
                if (ch.courseIds) {
                    ch.courseIds.forEach(cid => {
                        const tg = `course_${cid}`;
                        if (!myGroups.includes(tg)) myGroups.push(tg);
                    });
                }
            });
        }
    }

    // We keep track of active queries
    let activeSnapshots = [];
    let combinedResults = new Map();

    const renderCombined = () => {
        let allConvs = Array.from(combinedResults.values());
        
        // Sort and filter exactly like before
        allConvs = allConvs.filter(conv => {
            if (currentUser.role === 'admin') return true;
            if (!conv.isGroup) {
                return conv.participants && conv.participants.includes(currentUser.email);
            } else {
                return myGroups.includes(conv.targetGroup);
            }
        });

        allConvs.sort((a, b) => b.lastMessageAt - a.lastMessageAt);

        // ... we need to inject the rendering logic here, but it's easier to just call a function.
        window.renderConvsList(allConvs);
    };

    // To avoid rewriting the huge onSnapshot body, we will declare a function
    window.renderConvsList = function(allConvs) {
        convListEl.innerHTML = '';
        if (allConvs.length === 0) {
            convListEl.innerHTML = '<div style="padding: 1rem; color: var(--text-light); text-align: center;">Aucune conversation</div>';
            return;
        }
"""
    # Wait, replacing `onSnapshot(q, (snapshot) => { ... })` with this requires rewriting the end too.
    # It's better to just do this:
    
    # We will replace the entire loadConversations method because it's safer.
    print("Will replace whole function via another script")

rewrite_chat()
