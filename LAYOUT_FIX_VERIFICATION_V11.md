# FateCard.today v11 layout verification

## Fixed issue
The result card no longer shares a two-column area with the share buttons.

## Changes
- Share controls are rendered only after a card exists.
- Share controls are moved below the card.
- `.cardZone` is forced into a single vertical column.
- Result card width/height are capped for remote/mobile displays.
- Share panel receives a higher z-index than the card.
- The hidden canvas remains off-screen for PNG/Web Share generation only.

## Expected screen behavior
- Before draw: card back only, no disabled share buttons cluttering the page.
- After draw: one card result, then `Share` and `Save share card` below it.
- Clicking `Share`: opens the clean SNS icon modal.
- No buttons should appear behind the card.
