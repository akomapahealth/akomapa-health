# Fonts for generated social cards

TTF copies of the site's web fonts, used only by the `/og/*` image routes.
`next/og` (Satori) cannot read WOFF2, so these are converted from the
`../chillax` and `../plus-jakarta-sans` sources with fontTools; Plus Jakarta
Sans is instanced from the variable font at the two weights the cards use.

- **Chillax** — Indian Type Foundry via Fontshare. Fontshare's free licence
  permits use in web, app, and server-rendered graphics for personal and
  commercial projects. https://www.fontshare.com/licenses/itf-ffl
- **Plus Jakarta Sans** — Tokotype, SIL Open Font License 1.1.
  https://github.com/tokotype/PlusJakartaSans

Regenerate (requires `pip install "fonttools[woff]" brotli`):

```py
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
for name in ["Chillax-Bold", "Chillax-Semibold"]:
    f = TTFont(f"src/fonts/chillax/{name}.woff2"); f.flavor = None
    f.save(f"src/fonts/social-cards/{name}.ttf")
pj = "src/fonts/plus-jakarta-sans/PlusJakartaSans-Latin.woff2"
for weight, name in [(400, "Regular"), (600, "SemiBold")]:
    instantiateVariableFont(TTFont(pj), {"wght": weight}).save(
        f"src/fonts/social-cards/PlusJakartaSans-{name}.ttf")
```
