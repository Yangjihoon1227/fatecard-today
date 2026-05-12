# FateCard.today v34

## Problem

The public-domain RWS image files contain a cream/white card border. On mobile, that border looked like a white photo background, making the card feel like a photographed image pasted into the UI.

## Fix

v34 changes the card rendering to an art-only crop:

- Crops into the illustration area.
- Hides the cream/white scan/card border.
- Removes extra mat/framing from prior attempts.
- Applies to:
  - selected result cards
  - card-by-card interpretation thumbnails
  - 78-card guide
  - selected card strip

This keeps the same public-domain source but changes display/cropping only.
