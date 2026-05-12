# FateCard.today v36

## Change

The bottom AI area is no longer just a submitted-question box.

It now behaves like a conversation:
- User sends a message.
- The message appears as a user bubble.
- The app immediately generates an AI Tarot reply bubble.
- Multiple turns are preserved in the visible chat.
- Enter sends, Shift+Enter creates a newline.
- If cards are already revealed, the answer uses selected cards as context.
- If cards are not revealed yet, the AI tells the user to reveal cards first for a more precise answer.

Note: this is still a local symbolic answer engine, not an external LLM API call.
