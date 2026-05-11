# FateCard.today v9 card rendering verification

## Deck coverage
- Base card count: 6
- Language count: 8
- Expected localized card bodies: 48
- Missing localized entries: 0

## Card IDs
- danger-genius: en, ko, ja, zh, es, fr, de, pt
- silent-profit: en, ko, ja, zh, es, fr, de, pt
- soft-heart: en, ko, ja, zh, es, fr, de, pt
- clean-sword: en, ko, ja, zh, es, fr, de, pt
- golden-delay: en, ko, ja, zh, es, fr, de, pt
- storm-runner: en, ko, ja, zh, es, fr, de, pt

## Rendering fixes
- The visible duplicate share-preview canvas was removed from the UI and kept as an off-screen canvas only for PNG/Web Share generation.
- The 3D flip transform was replaced with opacity/visibility switching to avoid mobile/remote-browser double-face rendering.
- The card front now supports vertical scrolling, so longer translations are not clipped.
- The main card remains a single visible card after reveal.

## Result
PASS