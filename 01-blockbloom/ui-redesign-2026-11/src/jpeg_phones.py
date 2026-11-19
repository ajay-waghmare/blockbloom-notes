# Crops the 2x phone renders (out/shots/*.png, phone at 0,0, 390 x 844 CSS px) and saves JPEGs for the PDF.
# Run after: node build.js shots + render.js shot ... 500 844 2  (see README.md)
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(HERE, "..", "out", "shots")
total = 0
for name in sorted(f for f in os.listdir(DIR) if f.endswith(".png")):
    im = Image.open(os.path.join(DIR, name)).convert("RGB")
    im = im.crop((0, 0, 780, 1688))
    out = os.path.join(DIR, name[:-4] + ".jpg")
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
    total += os.path.getsize(out)
print("jpegs", len([f for f in os.listdir(DIR) if f.endswith(".jpg")]), "total", round(total / 1048576, 1), "MB")
