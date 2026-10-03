import re

def fix_imports_exact():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        chat = f.read()

    # The line is:
    # import { db, storage, collection, addDoc, doc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, or, serverTimestamp, storageRef, uploadBytes, getDownloadURL, arrayUnion, arrayRemove } from './firebase-config.js';
    
    chat = chat.replace('doc, getDocs,', 'doc, getDoc, getDocs,')
    
    with open('js/chat.js', 'w', encoding='utf-8') as f:
        f.write(chat)
        
    print("Fixed")

fix_imports_exact()
