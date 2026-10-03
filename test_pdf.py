import PyPDF2

pdf_path = "C:/Users/lione/.gemini/antigravity/brain/9c6b55f5-9dd1-4d48-87c6-e7c2afa921e4/.user_uploaded/media_1788264199682.pdf"

with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    print("Total pages:", len(reader.pages))
    
    print("--- PAGE 0 ---")
    print(reader.pages[0].extract_text())
    
    print("--- PAGE 12 ---")
    print(reader.pages[12].extract_text())
