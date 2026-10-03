import re

def rewrite_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # 1. Update imports
    chat = chat.replace(
        "import { db, storage, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, serverTimestamp, storageRef, uploadBytes, getDownloadURL, arrayUnion, arrayRemove } from './firebase-config.js';",
        "import { db, storage, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, or, serverTimestamp, storageRef, uploadBytes, getDownloadURL, arrayUnion, arrayRemove } from './firebase-config.js';"
    )
    
    # 2. Update query in loadConversations
    old_query = """    let q;
    if (currentUser.role === 'admin') {
        q = query(collection(db, 'conversations'));
    } else {
        q = query(collection(db, 'conversations'), where('participants', 'array-contains', currentUser.email));
    }"""
    
    new_query = """    let q;
    if (currentUser.role === 'admin') {
        q = query(collection(db, 'conversations'));
    } else {
        let myGroups = ['all'];
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

        // We split myGroups into chunks of 10 if necessary, but typically a user is not in 30+ groups.
        // For safety, we will just use up to 10 groups in the 'in' query.
        // A better approach would be to fetch all groups and filter locally if there are many, 
        // but 'or' with 'array-contains' and 'in' is perfect for this scope.
        const limitedGroups = myGroups.slice(0, 30); 
        
        q = query(
            collection(db, 'conversations'),
            or(
                where('participants', 'array-contains', currentUser.email),
                where('targetGroup', 'in', limitedGroups)
            )
        );
    }"""
    
    chat = chat.replace(old_query, new_query)
    
    # Write back
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
    print("Success")

rewrite_chat()
