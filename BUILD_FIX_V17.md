# FateCard.today v17 build fix

## Fixed

The v15/v16 build could fail with:

`Type '{ en: ...; ko: ... }' is missing the following properties from type 'Record<Lang, any>': ja, zh, es, fr...`

Cause:
`FEATURE_UI` was declared as `Record<Lang, any>` while only `en` and `ko` were initialized immediately.
Other languages were assigned afterwards (`FEATURE_UI.ja = ...`), which is valid at runtime but too strict for TypeScript.

Fix:
`const FEATURE_UI: any = { ... }`

This preserves runtime behavior and allows the later language assignments.
