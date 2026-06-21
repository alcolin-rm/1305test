#! pip install Pillow ! 
from PIL import Image
import os
from pathlib import Path

def batch_convert_to_jpg(input_folder, output_folder, width=50, height=100, quality=85, mode='resize'):

    if output_folder is None:
        output_folder = input_folder + '_jpg'

    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    extensions = {
        '.png', '.webp', '.bmp', '.gif', '.tiff', '.tif', 
        '.jpg', '.jpeg', '.ico', '.jfif', '.pjpeg', '.pjp'
    }
    
    image_files = []
    for file in os.listdir(input_folder):
        file_path = os.path.join(input_folder, file)
        if os.path.isfile(file_path) and Path(file).suffix.lower() in extensions:
            image_files.append(file)
    
    if not image_files:
        print(f"No image files found in {input_folder}")
        return
    
    print(f"Found {len(image_files)} image files")
    print("-" * 50)
    
    converted = 0
    failed = 0
    
    for filename in image_files:
        input_path = os.path.join(input_folder, filename)
        output_name = Path(filename).stem + '.png'
        output_path = os.path.join(output_folder, output_name)
        
        try:
            with Image.open(input_path) as img:
                # Handle transparency for PNG, WebP, GIF, etc.
                if img.mode in ('RGBA', 'LA', 'P'):
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    if img.mode == 'RGBA':
                        background.paste(img, mask=img.split()[-1])
                    elif img.mode == 'LA':
                        background.paste(img, mask=img.split()[-1])
                    else:
                        background.paste(img)
                    img = background
                else:
                    img = img.convert('RGB')
                
                # Resize based on mode
                if mode == 'resize':
                    resized = img.resize((width, height), Image.LANCZOS)
                    
                elif mode == 'fit':
                    img_ratio = img.width / img.height
                    target_ratio = width / height
                    
                    if img_ratio > target_ratio:
                        new_width = width
                        new_height = int(width / img_ratio)
                    else:
                        new_height = height
                        new_width = int(height * img_ratio)
                    
                    resized = img.resize((new_width, new_height), Image.LANCZOS)
                    canvas = Image.new('RGB', (width, height), (255, 255, 255))
                    x = (width - new_width) // 2
                    y = (height - new_height) // 2
                    canvas.paste(resized, (x, y))
                    resized = canvas
                    
                elif mode == 'crop':
                    img_ratio = img.width / img.height
                    target_ratio = width / height
                    
                    if img_ratio > target_ratio:
                        new_width = int(img.height * target_ratio)
                        left = (img.width - new_width) // 2
                        img = img.crop((left, 0, left + new_width, img.height))
                    else:
                        new_height = int(img.width / target_ratio)
                        top = (img.height - new_height) // 2
                        img = img.crop((0, top, img.width, top + new_height))
                    
                    resized = img.resize((width, height), Image.LANCZOS)
                
                resized.save(output_path, format='PNG', quality=quality, optimize=True)
                print(f"done {filename} → {output_name}")
                converted += 1
                
        except Exception as e:
            print(f"fuckkkkkkkkkkkkkkkkkkkk error processing {filename}: {e}")
            failed += 1
    
    print("-" * 50)
    print(f"converted: {converted} files")
    if failed > 0:
        print(f"failed: {failed} files")


batch_convert_to_jpg('C:/Users/alcolin/Desktop/pyt/git/1305test/src/assets/posters','C:/Users/alcolin/Desktop/pyt/git/1305test/src/assets/posters/output/' )
