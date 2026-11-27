"""
Regenerates the floor fill shapes in src/components/building-tour.tsx from the line art.

  rsvg-convert -w 2460 -h 2220 -b white public/images/home/sienna-mercato-building.svg -o /tmp/building.png
  python3 scripts/trace-building-floors.py /tmp/building.png

Prints one SVG path per floor (in the drawing's 1230 x 1110 coordinates) plus its top and
bottom, to paste into FLOOR_SHAPES. Needs numpy and opencv-python.

How it works: the outside of the building is flooded from the image border (after closing
tiny gaps in the outline), so everything else is the building. Each enclosed area inside it
goes to the floor its centre sits in, so the floor edges follow the drawn lines; only large
areas that clearly span a floor line are cut straight. Each floor is then grown over the
surrounding strokes, pulled in by half a stroke from the outside edge, and simplified.
"""
import sys
import cv2
import numpy as np

S = 2  # the render is 2x the drawing coordinates
BANDS = {"tetto": (0, 300), "mezzo": (436, 700), "emporio": (700, 1110)}
CUTS = [300, 436, 700]


def disc(r):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


image = cv2.imread(sys.argv[1], cv2.IMREAD_GRAYSCALE)
ink = (image < 200).astype(np.uint8)

# Outside: flood from the border with gaps closed, then undo the closing.
free = (cv2.dilate(ink, disc(3)) == 0).astype(np.uint8)
_, labels = cv2.connectedComponents(free, connectivity=4)
edge = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))) - {0}
outside = np.isin(labels, list(edge)).astype(np.uint8)
inside = 1 - cv2.dilate(outside, disc(3))
n, labels, stats, _ = cv2.connectedComponentsWithStats(inside, connectivity=8)
inside = (labels == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
contours, _ = cv2.findContours(inside, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
solid = np.zeros_like(inside)
cv2.drawContours(solid, contours, -1, 1, -1)
solid = cv2.erode(solid, disc(2))

# Assign each enclosed area to a floor.
areas = ((ink == 0) & (solid == 1)).astype(np.uint8)
n, labels, stats, centres = cv2.connectedComponentsWithStats(areas, connectivity=4)
rows = np.arange(areas.shape[0])[:, None] / S
floors = {k: np.zeros_like(areas) for k in BANDS}
for i in range(1, n):
    _, y, _, h, area = stats[i]
    if area < 4:
        continue
    region = labels == i
    top, bottom = y / S, (y + h) / S
    if any(top + 15 < c < bottom - 15 for c in CUTS):
        for k, (a, b) in BANDS.items():
            floors[k] |= (region & (rows >= a) & (rows < b)).astype(np.uint8)
    else:
        cy = centres[i][1] / S
        for k, (a, b) in BANDS.items():
            if a <= cy < b:
                floors[k] |= region.astype(np.uint8)

for k in ["emporio", "mezzo", "tetto"]:
    m = cv2.dilate(floors[k], disc(4)) & solid
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, disc(4)) & solid
    contours, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    parts, ys = [], []
    for c in contours:
        if cv2.contourArea(c) < 40:
            continue
        pts = np.round(cv2.approxPolyDP(c, 0.8, True).reshape(-1, 2) / S, 1)
        ys += list(pts[:, 1])
        parts.append("M" + " L".join(f"{x:g} {y:g}" for x, y in pts) + "Z")
    print(f"{k}: top {min(ys):g}, bottom {max(ys):g}")
    print("".join(parts))
