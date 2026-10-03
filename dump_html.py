import re
with open(r'C:\Users\lione\.gemini\antigravity\brain\9c6b55f5-9dd1-4d48-87c6-e7c2afa921e4\.system_generated\steps\1318\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

images = re.findall(r'<img[^>]+src=["\'](gallery[^"\']+)["\']', html)
names = re.findall(r'<h[45][^>]*>(.*?)</h[45]>', html)

for n in names:
    clean = re.sub(r'<[^>]+>', '', n).strip()
    if 'Mon Equipe' not in clean and 'ADK' not in clean:
        print('Name:', clean)

for img in images:
    print('Img:', img)
