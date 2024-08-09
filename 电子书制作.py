from PIL import Image,ImageFont, ImageDraw
TEXT=input("输入文本:\n")
def split_text(text, chunk_size):
    # 使用列表推导式分割文本
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
chunks=split_text(TEXT, 218)
def makePng():
    g=1
    for i in chunks:
        p=1
        image = Image.new('1', (16*12, 16*17), 0)  # '1' 表示单色模式，255为白色背景
        for j in i: 
            
            font_size = 16 # 字体大小，需要根据图片大小和字体进行调整
            font = ImageFont.truetype("simsun.ttc", font_size)
            draw = ImageDraw.Draw(image)
            draw.text(((p%12)*16,int((p/12))*16),j, font=font, fill=255)
            p+=1

        image.save(f'PAGE{g}.png')
        g+=1
makePng()

