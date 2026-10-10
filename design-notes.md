# Design notes — shrrynsh.github.io redesign

Measured from the live HTML/CSS of the two reference sites on 2026-10-10
(`fredhohman.com/styles.css`, `timothybrooks.com/_astro/Base.B3WHaZwm.css`).
These notes describe the *system*; the implementation is written from scratch
and copies no source files, images or text.

---

## 1. fredhohman.com: layout and colour

### Grid
- `main`, `header` and `footer` are each a CSS grid with named lines:
  `screen | 1fr | page (12 × minmax(min-content, 3.5rem)) | 1fr | screen`,
  `column-gap: 1.5rem`.
  - **text column** = the middle 8 tracks = 8 × 3.5 + 7 × 1.5 = **38.5rem (~616px)**
  - **page column** = all 12 tracks = **58.5rem (~936px)**; the card grid spans this.
- ≤768px: 8 equal tracks, 8px outer gutters, `0.5rem` gaps; text and page collapse to the same width.
- ≤1100px: the intro, section titles and card grid widen from *text* to *page*.
- Root size is `16px`, dropping to `14px` at ≤768px. `line-height: 1.5`.

### Spacing (rem)
`0.25 · 0.5 · 0.75 · 1 · 1.5 · 2.5 · 3`. Paragraph margin `0.75rem`; `hr.home-hr` margin `2.5rem 0`;
intro `margin-top: 3rem`; footer padding `3rem 0`.

### Palette (exact hex values from the CSS)
| Role | Value | Contrast on white |
|---|---|---|
| Body text | `#414141` | 10.2 ✅ |
| Intro title | `#111` | ✅ |
| Card/project titles | `#313131` | ✅ |
| Secondary text (card subtitle, venue) | `rgba(0,0,0,.6)` ≈ `#666` | 5.45 on `#f9f9f9` ✅ |
| Subtitle under name | `#999` | **2.85 ❌** |
| Link | `#357edd` | **4.05 ❌ (AA needs 4.5)** |
| Link hover/focus | `#00449e`, underline colour `#aaa` | 9.05 ✅ |
| Rules (`hr`, masthead border) | `#ddd` | — |
| Card / pill background | `rgba(0,0,0,.025)` ≈ `#f9f9f9`; hover `rgba(0,0,0,.05)` ≈ `#f2f2f2` | — |
| Small-button background | `#f4f4f4` (text `#777`) | **4.07 ❌** |
| CV call-out box | `#e4f2ff` | — |
| Award label | `#ffb700` | **1.75 ❌** |
| Footer | bg `#1E1E24`, text `#e6e6e6` | 13.3 ✅ |

### Components
- **Masthead:** name on the left, pill nav on the right, `border-bottom: 1px solid #ddd`.
  Nav pills: `rgba(0,0,0,.025)` background, `border-radius: 5rem`, padding `.5rem .75rem`, weight 500;
  on hover the background darkens and the pill scales by `1.03`.
- **Intro:** round portrait (`8rem`, `5rem` on mobile) beside the name (`2.5rem`/600), a subtitle (`1.57rem`)
  and a row of round icon buttons (`2.5rem` circles, same pill background, `gap: .5rem`).
  Below that is a light-blue call-out (`#e4f2ff`, radius `.5rem`, padding `1rem`) holding the CV link.
- **Section header:** `h2.feature-title` (`2rem`/600), with part of the title as a link
  ("Featured *Research Publications*"), followed by a one-line `p.feature-text` at `1.2rem`.
- **Publication card (`.cover`):** 3-column grid, `gap: 1rem`; background `rgba(0,0,0,.025)`,
  `border-radius: 1.5rem`, fixed height `405px`. On hover the background darkens and the card scales by `1.03` (`.2s ease-in-out`).
  - Image wrapper padding `.5rem`; image `border-radius: 1rem`, `1px solid rgba(0,0,0,.05)`.
  - Inner padding `.5rem 1rem 1rem`. Title `1.4rem`/600/`#313131`/lh 1.3. Tagline `.875rem` at `.6` alpha.
    Venue `.75rem`/500 at `.6` alpha.
  - Buttons (`.pub-misc a`): small white pills, radius `1rem`, padding `.25rem .55rem`, `.75rem` text.
    On hover they turn `#357edd` with white text.
- **Footer:** full-bleed dark band, left and right columns on the page grid, icon links in `#e6e6e6`.
- **Type:** system sans stack only (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …`).
  Icons come from Font Awesome 5 CSS. We won't use it, because it is a heavy dependency. Inline SVG instead.

---

## 2. timothybrooks.com: typography

### Families
- **Prose:** `Newsreader Variable` (weights 200–800), self-hosted woff2, `font-display: optional`, preloaded.
  It has a metric-matched Georgia fallback (`size-adjust: 96.06%`, `ascent-override: 77.03%`, `descent-override: 27.07%`).
- **UI/labels:** system sans stack (`ui-sans-serif, -apple-system, "Segoe UI", Helvetica, Arial`).
- **Licence:** Newsreader (Production Type) is SIL Open Font License and is on Google Fonts,
  so **no substitute is needed**. We'll load it from Google Fonts with the same Georgia fallback trick.

### Scale
| Token | Value |
|---|---|
| `--text-body` | `1.1rem` (17.6px) |
| `--text-lede` | `clamp(1.3rem, 1.1rem + .8vw, 1.65rem)` |
| `--text-title` | `clamp(1.9rem, 1.4rem + 2.2vw, 2.9rem)` |
| `--text-label` | `.7rem` |
| `--leading-body` | `1.62` |
| `--leading-snug` | `1.4` (lede) |
| `--leading-tight` | `1.16` (h1–h3) |
| `--tracking-title` | `-0.018em` (headings and lede) |
| `--tracking-label` | `0.13em`, uppercase |
| Weights | headings and lede **500**; labels 500 (wordmark 600); body 400 |
| `--measure` | **`33rem`** (~60–65 characters per line at 17.6px) |
| Page | `max-width: 84rem`, side padding `clamp(1.25rem, .6rem + 2.6vw, 3rem)` |
| Spacing | base `1rem` × `.25 / .5 / .875 / 1.5 / 2.5 / 4 / 6.5` |

### The opening statement
- An `h1.lede` holding one short first-person sentence ("I build AI that makes images and videos.").
- Set at the **lede** size (max 1.65rem), weight 500, lh 1.4, `-0.018em`, `text-wrap: balance/pretty`, colour `--ink`.
  It is large through weight and position rather than raw size.
- The paragraphs below it use `--ink-soft` and 1.5rem paragraph spacing. Links inside them are `--ink` (darker than the surrounding text).
- Masthead layout: `grid-template-columns: minmax(0, 33rem) 1fr; gap: 2.5rem`. Text sits on the left and the image on the right.
  Below 56rem the columns stack.

### Links, focus and colour
- Links inherit text colour, with `text-underline-offset: .18em`, `text-decoration-thickness: 1px`, and an underline at
  32% of the text colour that goes to 100% on hover (`.26s cubic-bezier(.2,0,.1,1)`).
- `:focus-visible` → `outline: 2px solid ink; outline-offset: 3px`. Includes a "Skip to content" link.
- Palette: paper `#fff`, ink `#14140f`, ink-soft `#55554e` (7.5 ✅), ink-faint `#8b8b83` (3.43 ❌ for body text), rule `#e7e7e1`.
- `prefers-reduced-motion` shortens all transitions.

---

## 3. Proposed synthesis (what I'll build)

**Stack:** keep Jekyll 4 + the existing GitHub Actions deploy. The homepage stays a hand-written static
`index.html`, but its styles move into `assets/css/site.css` (plain CSS, no Sass, no JS framework).
Icons will be inline SVG. The only JavaScript is the existing optional theme toggle.

**Layout (Hohman):** the 12-track named grid with text column ≈ 38.5rem and page column ≈ 58.5rem.
Cards are 3-up on the page column, 2-up at ≤1100px and 1-up at ≤768px. The footer is a dark full-bleed band.

**Type (Brooks):**
- Newsreader for the statement, body, section titles and card titles. System sans for labels, venue, buttons and nav.
- Body `1.1rem/1.62` with prose capped at `33rem`.
- Opening statement: Brooks' lede treatment (500, lh 1.4, −0.018em, balanced wrap) but one step larger,
  `clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)`, because it replaces the name hero and sits beside the portrait.
  *Deviation from Brooks; say if you want the exact 1.65rem cap.*
- Section titles at the `--text-title` scale capped lower (`clamp(1.5rem, 1.2rem + 1.2vw, 2rem)`)
  to stay closer to Hohman's 2rem; intro sentence `1.1rem` in ink-soft.

**Colour (Hohman, AA-corrected):**
| Role | Hohman | Ours | Contrast |
|---|---|---|---|
| Text | `#414141` | `#414141` | 10.2 on white |
| Headings | `#111` / `#313131` | `#14140f` / `#313131` | ✅ |
| Secondary | `#999` / `.6` alpha | `#666` | 5.45 on card bg |
| Link | `#357edd` | **`#2b6cc4`** | 5.19 on white, 4.93 on `#f9f9f9` |
| Link hover | `#00449e` | `#00449e` | 9.05 |
| Button hover | `#357edd` bg / white | `#2b6cc4` bg / white | 5.19 |
| Button text | `#777` on `#f4f4f4` | `#555` on `#f4f4f4` | 6.78 |
| Award chip | `#ffb700` text | `#8a5a00` on `#fff4d6` | 5.41 |
| Card bg / hover | `.025` / `.05` alpha | `#f9f9f9` / `#f2f2f2` | — |
| Rules | `#ddd` | `#ddd` | — |
| CV call-out | `#e4f2ff` | `#e4f2ff` (link 4.56) | ✅ |
| Footer | `#1E1E24` / `#e6e6e6` | same; links `#9ec5ff` | 13.3 / 9.4 |

**Accessibility:** skip link, `:focus-visible` outline on every link/button, alt text on every image,
`prefers-reduced-motion` turns off the card scale, and no information is conveyed by colour alone.

**Images:** portrait re-encoded to WebP (current `img/me.jpeg` is 342 KB) at 2× display size. Paper thumbnails in WebP
with `width`/`height` set and `loading="lazy"`. Papers without a thumbnail get a neutral placeholder tile.
