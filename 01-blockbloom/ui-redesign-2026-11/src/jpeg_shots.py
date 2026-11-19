# Makes light JPEG copies of the eight current-UI screenshots for the PDF (the PNGs stay as the originals):
# width capped at 600 px (they print at most ~280 px wide), quality 84. Run: python jpeg_shots.py
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "assets", "current")
for name in sorted(f for f in os.listdir(SRC) if f.endswith(".png")):
    im = Image.open(os.path.join(SRC, name)).convert("RGB")
    if im.width > 600:
        im = im.resize((600, round(im.height * 600 / im.width)), Image.LANCZOS)
    out = os.path.join(SRC, name[:-4] + ".jpg")
    im.save(out, "JPEG", quality=84, optimize=True, progressive=True)
    print(name, "->", os.path.basename(out), im.size, round(os.path.getsize(out) / 1024), "KB")
