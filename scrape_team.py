import urllib.request
import re
import html as html_lib

url = 'https://annedkdanse.be/Equipe-ADK'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    
    # Extract blocks that contain both a name and an image
    # In LWS SiteBuilder, usually they are in some container. 
    # Let's just find all h4, h5 and img.
    
    parts = re.split(r'(<h[45][^>]*>.*?</h[45]>|<img[^>]+src=["\']gallery[^"\']+["\'][^>]*>)', html)
    for p in parts:
        if p.startswith('<h'):
            name = re.sub(r'<[^>]+>', '', p).strip()
            name = html_lib.unescape(name)
            if 'Equipe' not in name and 'ADK' not in name and name and len(name) < 50:
                print('NAME:', name)
        elif p.startswith('<img'):
            m = re.search(r'src=["\'](gallery[^"\']+)["\']', p)
            if m:
                print('IMG:', m.group(1))
except Exception as e:
    print('Error:', e)
