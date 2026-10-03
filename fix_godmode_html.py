lines = open('portail.html', 'r', encoding='utf-8').readlines()

# find god mode line
god_mode_idx = -1
for i, line in enumerate(lines):
    if '<div id="god-mode-settings"' in line:
        god_mode_idx = i
        break

if god_mode_idx != -1:
    # swap god mode line with the white box line right after it
    # wait, the white box line is at god_mode_idx + 1
    god_mode_line = lines[god_mode_idx]
    white_box_line = lines[god_mode_idx + 1]
    
    lines[god_mode_idx] = white_box_line
    lines[god_mode_idx + 1] = god_mode_line
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed!")
else:
    print("Not found")
