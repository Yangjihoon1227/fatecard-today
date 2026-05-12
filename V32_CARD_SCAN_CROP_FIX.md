# FateCard.today v32

## Fix

The public-domain tarot image files had visible white scan/photo margins, making cards look like photos placed on a white background.

v32 changes the rendering layer only:
- Removes the extra decorative mat/background around the card image.
- Crops inside the scan using object-fit and scale.
- Keeps the public-domain card artwork.
- Shows only the tarot card face inside the UI.
- Applies the same fix to:
  - selected result cards
  - card-by-card interpretation thumbnails
  - 78-card guide

## Legal note

This does not add new copyrighted artwork. It only changes CSS rendering/cropping of the existing public-domain card source.
