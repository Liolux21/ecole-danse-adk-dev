import subprocess

def extract_file():
    result = subprocess.run(['git', 'show', '36388f6:portail.html'], capture_output=True)
    with open('portail_clean.html', 'wb') as f:
        f.write(result.stdout)
        
    print("Extracted clean file")

extract_file()
