"""One-off: turn client/tile logos from the old repos into trimmed bone-coloured PNGs
and write src/_data/clients.json with display sizes normalised by visual area."""
import json, math, sys
from PIL import Image
L = "/home/user/joelbryantcreative/lineage-films/public/images/logos/"
C = "/home/user/joelbryantcreative/convert-studios/public/logos/"
OUT = "/home/user/bryant-atelier/src/assets/logos/"
BONE = (245, 241, 232)

# Combined, de-duplicated client strip. Lineage band order first, then Convert's (alphabetical).
clients = [
  ("Koud", L+"Koud.png"), ("The Breath Haus", L+"The Breath Haus.png"),
  ("Convivio", L+"Convivio.png"), ("Kalio", L+"Kalio.png"),
  ("Bytropic", C+"bytropic.png"), ("Rogue Watches", C+"rogue.png"),
  ("Ultimate Ears", C+"ultimate-ears.png"), ("Fat Fish Bikes", C+"fat-fish-bikes.png"),
  ("Salty Cabins", C+"salty-cabins.png"), ("Away at Byron Bay", L+"Away at Byron Bay.png"),
  ("Craved This", C+"craved-this.png"), ("We Forest Earth", L+"We Forest Earth.png"),
  ("Huckberry", C+"huckberry.png"),
  ]
# Brand marks laid over work tiles (Lineage pattern)
tiles = {
  "tile-flowing-wood": L+"Flowing Wood.png", "tile-convivio": L+"Convivio.png",
  "tile-craved-this": L+"Craved This.png", "tile-koud": L+"Koud.png",
  "tile-bytropic": L+"Bytropic.png", "tile-rogue": L+"Rogue.png",
  "tile-good-old-days": L+"Good Old Days.png", "tile-fat-fish-bikes": L+"Fat Fish Bikes.png",
  "tile-we-forest-earth": L+"We Forest Earth.png", "tile-grun-resort": L+"Grun Resort.png",
  "festival-byron": L+"Byron Bay Film Festival.png", "festival-noosa": L+"Noosa Film Festival.png",
}

def slug(s): return "".join(c if c.isalnum() else "-" for c in s.lower()).strip("-").replace("--", "-")

def process(src, dest, max_h=140, max_w=560):
    im = Image.open(src).convert("RGBA")
    a = im.getchannel("A")
    box = a.getbbox()
    a = a.crop(box)
    out = Image.new("RGBA", a.size, BONE + (0,))
    out.putalpha(a)
    s = min(max_h / out.height, max_w / out.width, 1)
    out = out.resize((max(1, round(out.width*s)), max(1, round(out.height*s))), Image.LANCZOS)
    out.save(dest, "WEBP", quality=88, method=6)
    return out.size

data = []
for name, src in clients:
    w, h = process(src, OUT + slug(name) + ".webp")
    aspect = w / h
    # equal visual area: display height shrinks as logos get wider
    dh = max(18, min(48, round(34 / math.sqrt(aspect) * 1.25)))
    data.append({"name": name, "file": slug(name) + ".webp", "w": w, "h": h, "displayH": dh})
for k, src in tiles.items():
    process(src, OUT + k + ".webp", 200, 800)
json.dump(data, open("/home/user/bryant-atelier/src/_data/clients.json", "w"), indent=1)
print(len(data), "clients")
