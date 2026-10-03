from PIL import Image, ImageDraw, ImageFont
import os

base_img_path = 'img/apple-touch-icon.png'
out_dir = 'img'

def create_course_img(label_text, filename):
    img = Image.open(base_img_path).convert('RGBA')
    width, height = img.size
    
    # Create an overlay for the bottom part
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Draw a dark blue solid rectangle at the bottom (same blue as the ADK logo)
    rect_height = 400
    blue_color = (11, 54, 115, 255)
    draw.rectangle([(0, height - rect_height), (width, height)], fill=blue_color)
    
    # Merge overlay with image
    img = Image.alpha_composite(img, overlay)
    
    # Draw text
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('C:\\Windows\\Fonts\\georgiab.ttf', 280)
    except:
        font = ImageFont.load_default()
        
    # Get text size using textbbox (Pillow 10+)
    bbox = draw.textbbox((0, 0), label_text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) / 2
    # Vertically center text in the blue band
    y = height - rect_height + (rect_height - text_height) / 2 - 55
    
    # Gold color: #CAA9A9 -> rgb(202, 169, 169)
    gold_color = (202, 169, 169, 255)
    draw.text((x, y), label_text, font=font, fill=gold_color)
    
    img.save(os.path.join(out_dir, filename))

create_course_img("PRO", "adk_pro.png")
create_course_img("STAGE", "adk_stage.png")
create_course_img("SHOW", "adk_show.png")

print("Images generated successfully with larger font and no ADK prefix.")
