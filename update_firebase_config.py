import re

with open('js/firebase-config.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add orderBy and serverTimestamp to import
js = js.replace(
    'import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";',
    'import { getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";'
)

# Add them to export
js = js.replace(
    '  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot,',
    '  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc, query, where, onSnapshot, orderBy, serverTimestamp,'
)

with open('js/firebase-config.js', 'w', encoding='utf-8') as f:
    f.write(js)
