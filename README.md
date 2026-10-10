# C++ Handwriting Converter

Turn typed C++ code (or any text) into realistic handwritten pages: ruled paper, ink colours, baseline wobble, fold creases, phone-scan / flash effects, multi-question mode and one-click PDF export.

Runs 100% in the browser. No build step, no dependencies to install.

## Run it

**Option 1: GitHub Pages**
1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

**Option 2: Locally**
Double-click `index.html`. It also works straight from the file explorer, no server needed.

## Project structure

```
.
├── index.html            # page markup
├── css/style.css         # styles + @font-face for the personal font
├── js/app.js             # all the logic (plain script, no modules)
├── fonts/
│   └── Personal-Font.ttf # ← the "My Handwriting" font (replace with yours)
├── .nojekyll             # tells GitHub Pages to serve files as-is
└── README.md
```

## Use your own handwriting font

The **"My Handwriting — personal font"** option in the dropdown uses whatever file is at:

```
fonts/Personal-Font.ttf
```

To use your own font:

1. Make or download a `.ttf` of your handwriting (for example from [Calligraphr](https://www.calligraphr.com/) or [FontForge](https://fontforge.org/)).
2. **Rename it to `Personal-Font.ttf`.**
3. Put it in the `fonts/` folder, replacing the existing file.
4. Hard-refresh the page (`Ctrl + Shift + R`) so the browser doesn't use a cached copy.
5. Pick **My Handwriting** in the *Font style* dropdown and click **Generate**.

No code changes are needed as long as the file name stays the same. If your font is in another format (`.otf`, `.woff2`), convert it to `.ttf`, or edit the `src: url(...)` line in `css/style.css`.

### If the words cross the ruled lines

Every handwriting font has different vertical metrics, so the app measures where your font's baseline sits and places the ruled lines right under it automatically. You can fine-tune it in the **Paper** section of the side panel:

- **Line spacing** (24-48 px) changes the gap between ruled lines. The text uses the same spacing, so each text line stays on one ruled line. A bigger gap means fewer lines per page, and the slider shows the count.
- **Move lines up / down** (-12 to +12 px) nudges the ruled lines relative to the handwriting. Use it if your font sits a little above or below the line.

Tip: if your handwriting is large, raise the line spacing. If it is small, lower it.

## Make the margin and indentation look hand-written

Typed code has perfect indentation and a perfectly straight left edge, and real handwriting doesn't. These sliders fix that:

| Slider | Where | What it does |
|---|---|---|
| **Left margin position** | Paper | Moves the red margin line **and** the start of the text left or right (-30 to +40 px) |
| **Indent width** | Handwriting | Makes every indent wider or narrower (50-150% of normal) |
| **Indent unevenness** | Handwriting | Each indent level gets slightly random, so nested blocks don't line up perfectly |
| **Line start drift** | Handwriting | Each line starts a little left or right of where it should, like a real hand |

Press **Generate** again for a different random result each time.

## Notes

- Google Fonts (Kalam, Caveat, etc.) and the PDF libraries (html2canvas, jsPDF) load from the internet. Your personal font does not, because it's bundled in `fonts/`.
- **Print / Save as PDF** renders each page to an image and builds an A4 PDF.
- Only commit a font you have the right to redistribute, since the font file is public in the repo.

## Troubleshooting

| Problem | Fix |
|---|---|
| Personal font shows as a generic cursive | Check the file is exactly `fonts/Personal-Font.ttf` (case-sensitive on GitHub Pages) and hard-refresh |
| Works locally but not on GitHub Pages | Make sure `fonts/` was actually committed and Pages is set to the `main` branch root |
| Old font still showing after replacing | Browser cache: hard-refresh or open in a private window |
