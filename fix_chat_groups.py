import re

def fix_chat():
    with open('js/chat.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = """                if (!conv.isGroup && Array.isArray(conv.participants)) {
                    const others = conv.participants.filter(p => p !== currentUser.email);
                    if (others.length > 0) {
                        const otherNames = others.map(email => {
                            if (window.DATA) {
                                const prof = (window.DATA.users || []).find(u => (u.email || u.id) === email);
                                if (prof) return prof.name || `${prof.firstname || ''} ${prof.lastname || ''}`.trim() || email;
                                const student = (window.DATA.students || []).find(s => (s.contactEmail || s.parentId) === email);
                                if (student) return `${student.firstname || ''} ${student.lastname || ''}`.trim() || student.name || email;
                            }
                            return email;
                        });
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">👥 ${otherNames.join(', ')}</div>`;
                        chatTitleParam += ` (avec ${otherNames.join(', ')})`;
                    }
                }"""
    
    replacement = """                if (!conv.isGroup && Array.isArray(conv.participants)) {
                    const others = conv.participants.filter(p => p !== currentUser.email);
                    if (others.length > 0) {
                        const otherNames = others.map(email => {
                            if (window.DATA) {
                                const prof = (window.DATA.users || []).find(u => (u.email || u.id) === email);
                                if (prof) return prof.name || `${prof.firstname || ''} ${prof.lastname || ''}`.trim() || email;
                                const student = (window.DATA.students || []).find(s => (s.contactEmail || s.parentId) === email);
                                if (student) return `${student.firstname || ''} ${student.lastname || ''}`.trim() || student.name || email;
                            }
                            return email;
                        });
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">👥 ${otherNames.join(', ')}</div>`;
                        chatTitleParam += ` (avec ${otherNames.join(', ')})`;
                    }
                } else if (conv.isGroup && conv.targetGroup) {
                    if (conv.targetGroup.startsWith('course_')) {
                        const courseId = conv.targetGroup.replace('course_', '');
                        if (window.DATA && window.DATA.courses) {
                            const course = window.DATA.courses.find(c => c.id === courseId);
                            if (course) {
                                participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">🎵 ${course.name} (${course.prof})</div>`;
                                chatTitleParam += ` (${course.name})`;
                            }
                        }
                    } else if (conv.targetGroup === 'admin') {
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">🛡️ Administration (Anne)</div>`;
                        chatTitleParam += ` (avec Anne)`;
                    } else if (conv.targetGroup === 'all') {
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">📢 Tous (Élèves et Profs)</div>`;
                        chatTitleParam += ` (Tous)`;
                    } else if (conv.targetGroup === 'all_students') {
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">🎓 Tous les élèves</div>`;
                        chatTitleParam += ` (Tous les élèves)`;
                    } else if (conv.targetGroup === 'all_profs') {
                        participantNames = `<div style="font-size: 0.75rem; color: var(--primary); margin-top: -2px; margin-bottom: 2px;">👩‍🏫 Tous les profs</div>`;
                        chatTitleParam += ` (Tous les profs)`;
                    }
                }"""

    if target in content:
        content = content.replace(target, replacement)
        with open('js/chat.js', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Target not found")

fix_chat()
