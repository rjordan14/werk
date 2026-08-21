# Handoff: $WERK Landing Page

## Overview

A single-page marketing site for $WERK, a meme coin whose brand is a green ostrich in a pinstripe suit who twerks for profit. The page is deliberately minimal: hero with the wordmark and mascot, a scrolling ticker, one "mission" section with joke stats, a whitepaper gag modal, and a disclaimer footer. Tone is crypto-Twitter shitposter — lowercase, self-aware, not corporate.

Sections that were explicitly cut and should NOT be added: Tokenomics, How To Buy, Roadmap, Join The Flock (as a section — the nav CTA stays).

## About the Design Files

`$WERK Landing.dc.html` in this bundle is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. It uses a custom streaming-template runtime (`<x-dc>`, `{{ }}` holes, `<sc-for>`, `<sc-if>`) that will not exist in your codebase, and it will not render standalone without that runtime.

Two prototype-only artifacts to ignore when porting: `data-r="…"` attributes (hooks the runtime needs to attach responsive overrides — replace with normal responsive styling) and the `{{ }}` template holes (replace with your own bindings).

The task is to **recreate this design in the target codebase's existing environment** (React/Next, Vue, Astro, whatever the project uses) with its established patterns, component library, and styling approach. If no codebase exists yet, pick the most appropriate framework — a static-site or single-page React setup is plenty for this — and implement there. Read the HTML for exact values, structure, and copy; don't port the runtime.

## Fidelity

**High-fidelity.** Colors, typography, spacing, copy, and animation timings below are final. Recreate the UI pixel-accurately using the codebase's own primitives. All copy is final and should be used verbatim — the jokes are the product.

## Screens / Views

Single page, one viewport-width column of stacked sections. Page background `#0b0d0b`, body text color `#f2f4ef`, base font `'Space Grotesk', sans-serif`.

Content sections are constrained to `max-width: 1240px; margin: 0 auto;` with `padding: 0 48px`.

### 1. Nav (sticky)

- `display: flex; align-items: center; justify-content: space-between; padding: 18px 48px`
- `position: sticky; top: 0; z-index: 10`
- Background `rgba(11,13,11,0.92)`, `backdrop-filter: blur(8px)`, bottom border `1px solid #1e2a1e`
- **Left — wordmark**: text `$WERK`, `font-family: 'Anton'`, `font-size: 34px`, `letter-spacing: 1px`, `transform: skewX(-6deg)`
- **Right — link group**: `display: flex; align-items: center; gap: 28px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px`
  - `WHITEPAPER` — color `#f2f4ef`, no underline. Click opens the whitepaper modal (see Interactions); prevents default.
  - `JOIN THE FLOCK` — background `#2ea44f`, color `#0b0d0b`, `padding: 10px 18px`, `border-radius: 6px`. Currently `href="#"`; wire to the community link.

### 2. Hero

- `position: relative; overflow: hidden; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 24px; padding: 64px 48px 0`
- **Candle backdrop** (decorative): absolutely positioned `inset: 0`, `display: flex; align-items: flex-end; gap: 10px; opacity: 0.18; padding: 0 24px; pointer-events: none`. 18 bars, each `flex: 1; border-radius: 2px 2px 0 0`, heights (as % of container, in order): 22, 34, 28, 46, 40, 58, 50, 72, 64, 86, 78, 60, 92, 104, 96, 120, 112, 134. Color: every index where `i % 4 === 2` is `#e91e8c` (pink), all others `#2ea44f` (green). Note heights above 100% intentionally overflow and are clipped.
- **Left column** (`position: relative; padding-bottom: 72px`):
  - Wordmark: `$WERK`, `font-family: 'Anton'`, `font-size: 150px`, `line-height: 0.9`, `letter-spacing: 2px`, `transform: skewX(-6deg)`, `text-shadow: 6px 6px 0 #1e2a1e`
  - Tagline: `margin: 40px 0 0`, `font-family: 'Permanent Marker'`, `font-size: 34px`, `line-height: 1.3`, color `#c8d0c4`, `max-width: 520px`. Two lines separated by `<br>`:
    - line 1: `We don't just make money.`
    - line 2 (wrapped in a span, color `#2ea44f`, `text-shadow: 0 0 40px rgba(46,164,79,0.35)`): `We make money moves.`
  - Button row: `display: flex; gap: 14px; margin-top: 32px`. Both buttons `font-weight: 700; font-size: 15px; letter-spacing: 1px; padding: 16px 32px; border-radius: 8px`.
    - `BUY $WERK` — background `#2ea44f`, color `#0b0d0b`; hover background `#38c05e`
    - `CHART` — `border: 1px solid #3a4a3a`, color `#f2f4ef`; hover border-color `#8fce00`
  - Contract-address button: `margin-top: 20px; background: none; border: 1px dashed #3a4a3a; color: #7d8a78; font-family: monospace; font-size: 12px; padding: 8px 14px; border-radius: 6px; cursor: pointer`. Hover: color `#b4f03a`, border-color `#8fce00`. Label `CA: <address>`; on click copies the address to clipboard and swaps the label to `COPIED!` for 1500ms. Placeholder address in the prototype: `WERKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpump` — replace with the real CA.
- **Right column**: mascot image, centered. `assets/mascot-crown.png`, `width: 100%; max-width: 400px; display: block`, `filter: drop-shadow(0 24px 60px rgba(46,164,79,0.35))`, `transform-origin: 50% 100%`, `animation: twerk 0.55s ease-in-out infinite`.

### 3. Ticker strip

- Full-bleed band: background `#8fce00`, `padding: 10px 0`, `overflow: hidden`, `transform: rotate(-1deg)`, `margin: -8px -8px 0` (so the rotated ends bleed past the viewport edges)
- Inner track: `display: flex; width: max-content; animation: marquee 18s linear infinite`
- Items: 16 repetitions of the string `YOU BETTER $WERK`, each `font-family: 'Anton'; color: #0b0d0b; font-size: 18px; letter-spacing: 2px; padding: 0 28px; white-space: nowrap`
- `marquee` translates the track from `0` to `-50%`, so the item list must be duplicated enough to fill 2× the viewport for a seamless loop. Ticker duration is a tunable value (range 6s–40s, default 18s).
- **Required:** the `-8px` horizontal bleed pushes the document 8px wider than the viewport and creates a sideways drag-scroll at every width unless it's clipped. Set `overflow-x: hidden` on the page root element (a `body` reset alone is not reliable — `html` can still scroll). Verify with `document.documentElement.scrollWidth === clientWidth`.

### 4. Mission ("Green candles only")

- `padding: 110px 48px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center`
- **Left column**:
  - Eyebrow: `Our mission` — `font-family: 'Permanent Marker'`, color `#e91e8c`, `font-size: 20px`
  - Heading: `GREEN CANDLES ONLY` (source text `Green candles only` with `text-transform: uppercase`) — `font-family: 'Anton'`, `font-size: 52px`, `margin: 8px 0 20px`, `transform: skewX(-4deg)`
  - Body paragraphs, both `font-size: 17px; line-height: 1.65; color: #c8d0c4` (first has `margin: 0 0 16px`, second `margin: 0`). Verbatim copy:

    > ser. it's a bird in a suit shaking cake for the culture. he doesn't read charts, he IS the chart. every candle is just him hitting it at a different speed and angles. this is the most bullish thing you will see all week and deep down you know it.

    > utility? the utility is you laughing. roadmap? cheeks up and to the right. your favorite coin has a whitepaper. ours has a dress code. the bird clocks in at 10:20am sharp and twerks until close. NFA. but also… look at him.

  - Stat row: `display: flex; gap: 32px; margin-top: 36px`. Each stat is a value (`font-family: 'Anton'; font-size: 32px; color: #8fce00`) above a label (`font-size: 13px; color: #7d8a78; letter-spacing: 1px`). Four stats, in order:
    | value | label |
    |---|---|
    | `24/7` | `DANCE FLOOR HOURS` |
    | `sure` | `LP BURNED` |
    | `∞` | `TWERKS / DAY` |
    | `0` | `DAYS SINCE INCIDENT` |
- **Right column**: mascot image, centered. `assets/mascot-thug.png`, `width: 100%; max-width: 420px`, `filter: drop-shadow(0 24px 60px rgba(46,164,79,0.25))`, `transform-origin: 50% 100%`, `animation: twerk 0.7s ease-in-out infinite` (slower than the hero, so the two birds fall out of sync).

### 5. Whitepaper modal (gag)

Hidden by default; conditionally rendered when open.

- **Backdrop**: `position: fixed; inset: 0; background: rgba(4,6,4,0.85); backdrop-filter: blur(6px); z-index: 50; display: flex; align-items: center; justify-content: center; cursor: pointer`. Click anywhere closes it.
- **Card**: background `#f2f0e8`, color `#1a1c1a`, `border-radius: 6px`, `padding: 72px 64px`, `max-width: 520px`, `text-align: center`, `transform: rotate(-1deg)`, `box-shadow: 0 40px 120px rgba(0,0,0,0.6)`
  - Kicker: `$WERK OFFICIAL WHITEPAPER — V1.0 — PAGE 1 OF 1` — `font-family: monospace; font-size: 12px; letter-spacing: 3px; color: #8a877c`
  - Punchline: `YOU SERIOUS RN?` — `font-family: 'Permanent Marker'; font-size: 42px; margin-top: 36px; line-height: 1.25` (mobile: 30px)
  - Body (two lines split by `<br>`): `you wanna read a whitepaper for a twerking ostrich?` / `the bird is the thesis.` — `font-size: 15px; color: #5c594e; margin-top: 32px; line-height: 1.6`
  - Footer hint: `[ tap anywhere to return to making money moves ]` — `font-family: monospace; font-size: 12px; color: #8a877c; margin-top: 44px`
  - Close button: `GOT IT` — `margin-top: 24px; background: #1a1c1a; color: #f2f0e8; border: none; font-family: 'Space Grotesk'; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; padding: 12px 24px; border-radius: 6px`; hover background `#2ea44f`, color `#0b0d0b`. This is the dialog's only focusable child and the focus-trap target.
- **Accessibility contract** (implemented and runtime-verified in the prototype, keep all of it): backdrop carries `role="dialog"`, `aria-modal="true"`, `aria-label="$WERK whitepaper"`, `tabindex="-1"`, `outline: none`.
  - **On open** — store the currently focused element (falling back to the click's trigger element if focus is on `body`), set `body { overflow: hidden }`, then move focus to the GOT IT button.
  - **On close** — restore `body` overflow and return focus to the stored trigger.
  - **Escape** closes the dialog. Register the key handler at the **document** level (capture phase), not on the dialog element — a handler bound only to the dialog misses the event whenever focus hasn't landed inside it, which silently breaks Escape.
  - **Tab / Shift+Tab** are intercepted with `preventDefault()` and focus is re-pinned to the close button (the dialog's only focusable child), so focus never escapes.
  - **Cleanup** — remove the document listener and release the body-overflow lock on unmount.

### 6. Footer

- `border-top: 1px solid #1e2a1e; padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; max-width: 1240px; margin: 0 auto`
- Left: `$WERK` — `font-family: 'Anton'; font-size: 18px; transform: skewX(-6deg)`
- Right: disclaimer, `font-size: 12px; color: #5c675a; max-width: 520px; text-align: right; line-height: 1.5`, verbatim:

  > $WERK is a meme coin with no intrinsic value or expectation of financial return. For entertainment purposes only. The bird is not a financial advisor.

## Interactions & Behavior

- **WHITEPAPER nav link** — `preventDefault()`, sets modal open. Closes on backdrop click, on GOT IT, and on `Escape`. Focus trap, focus restore, and body scroll lock are all specified above and implemented in the prototype — port them, don't drop them. If your codebase has a Dialog primitive (Radix, Headless UI, etc.), use it: it gives you the same contract for free.
- **Contract-address button** — writes the CA to `navigator.clipboard`, label becomes `COPIED!`, reverts after 1500ms. Clear any pending timer on repeat clicks. Guard for browsers without clipboard access.
- **Ticker marquee** — `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`, `18s linear infinite`.
- **Mascot twerk loop** — the whole personality of the page. Exact keyframes:

  ```css
  @keyframes twerk {
    0%, 100% { transform: rotate(-1.5deg) translateY(0)   scaleY(1);    }
    25%      { transform: rotate(1deg)    translateY(7px) scaleY(0.97); }
    50%      { transform: rotate(-1deg)   translateY(0)   scaleY(1);    }
    75%      { transform: rotate(1.5deg)  translateY(7px) scaleY(0.97); }
  }
  ```
  Applied with `transform-origin: 50% 100%` (pivots at the feet). Hero 0.55s, mission 0.7s, both `ease-in-out infinite`.
- **Sticker hover wiggle** — `@keyframes wiggle { 0%,100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) } }`, `0.4s ease infinite`, used on hover for small image tiles. Currently unused (the sticker strip was removed) — keep it if you re-add sticker tiles.
- **Links** — default `a` color `#8fce00`, hover `#b4f03a`, `text-decoration: none`.
- **Responsive** — one breakpoint at `max-width: 900px`; see "Mobile layout" below for every override. The prototype expresses these as `!important` overrides on `data-r="…"` hooks purely because its runtime is inline-style-only — in your codebase use ordinary responsive utilities or media queries and delete the `data-r` attributes.
- **Reduced motion** — implemented: `@media (prefers-reduced-motion: reduce)` sets `animation: none` on both mascots and the ticker track. Keep this. The candle backdrop is decorative — mark it `aria-hidden`.

## Mobile layout

Single breakpoint: `@media (max-width: 900px)`. Page gutter drops from 48px to **20px** throughout. Every override, by region:

**Nav** — padding `14px 20px`; wordmark `26px`; link group `gap: 16px`, `font-size: 11px`. The two links stay on one row with the wordmark; no hamburger (there are only two items).

**Hero** — `grid-template-columns: 1fr` (single column), `padding: 36px 20px 0`, `gap: 0`. Order is unchanged: wordmark and copy first, mascot below.
- Left column `padding-bottom: 24px`
- Wordmark `font-size: clamp(64px, 18vw, 120px)`
- Tagline `font-size: 24px`, `margin-top: 24px`
- Button row `margin-top: 24px` (buttons keep their 16px/32px padding — both stay comfortably above a 44px touch target)
- Mascot `max-width: 280px`
- The candle backdrop is unchanged (still `inset: 0`, clipped by the section)

**Ticker** — unchanged. The `rotate(-1deg)` band and `-8px` negative margins work at any width; item padding stays 28px. The negative margins bleed 8px past the viewport, so the page root must clip them — see the overflow note under Ticker strip.

**Mission** — `grid-template-columns: 1fr`, `padding: 64px 20px 0`, `gap: 36px`. Heading drops to `38px`. Stat row becomes `flex-wrap: wrap` with `gap: 24px 28px` (wraps to two rows of two). Mascot `max-width: 300px`.

**Whitepaper modal** — card `padding: 44px 28px`, `margin: 20px` (so it never touches the screen edge); punchline `font-size: 30px`. Backdrop, blur, and rotation unchanged.

**Footer** — `flex-direction: column`, `align-items: flex-start`, `gap: 16px`, `padding: 28px 20px`; disclaimer `text-align: left`.

Reference captures: `screenshots/04-mobile-hero.png`, `screenshots/05-mobile-whitepaper-modal.png` (430px wide).

Not yet specified: tablet (900–1240px) currently gets the desktop two-column layout at reduced width, which holds up but is untested. Flag it if it looks cramped.

## State Management

Three pieces of local component state, no data fetching:

- `wpOpen: boolean` — whitepaper modal visibility. `false` → `true` on WHITEPAPER click; `true` → `false` on backdrop click (and `Esc`, if added).
- `copied: boolean` — contract-address button label. `false` → `true` on click, auto-reverts after 1500ms via timeout (clear on unmount and on repeat clicks).
- Configurable inputs, not runtime state: ticker duration (default 18s) and contract address string. In production these are config/env values, not props on a component.

## Design Tokens

**Colors**
| Token | Hex | Use |
|---|---|---|
| ink | `#0b0d0b` | page background, text on green |
| surface | `#101510` | raised card background (unused after the cut sections; keep for future cards) |
| hairline | `#1e2a1e` | borders, dividers, wordmark drop shadow |
| border-strong | `#3a4a3a` | secondary button border |
| green | `#2ea44f` | primary CTA, accent text, candles |
| green-hover | `#38c05e` | primary CTA hover |
| lime | `#8fce00` | ticker background, stat values, link color |
| lime-bright | `#b4f03a` | link/hover accent |
| pink | `#e91e8c` | eyebrow text, alternating candles |
| text | `#f2f4ef` | primary text |
| text-muted | `#c8d0c4` | body copy |
| text-dim | `#7d8a78` | stat labels, CA button |
| text-faint | `#5c675a` | footer disclaimer |
| paper | `#f2f0e8` | whitepaper modal card |
| paper-ink | `#1a1c1a` | modal heading text |
| paper-muted | `#5c594e` | modal body text |
| paper-faint | `#8a877c` | modal monospace lines |
| scrim | `rgba(4,6,4,0.85)` | modal backdrop |

**Typography** — Google Fonts: `Anton` (400), `Permanent Marker` (400), `Space Grotesk` (400/500/700).
- Display / wordmark: Anton, `skewX(-6deg)` on the wordmark, `skewX(-4deg)` on section headings, uppercase
- Handwritten accents (tagline, eyebrow, modal punchline): Permanent Marker
- Body / UI: Space Grotesk
- Sizes in use: 150 (hero wordmark), 52 (section h2), 42 (modal punchline), 34 (nav wordmark, tagline), 32 (stat value), 20 (eyebrow), 18 (ticker, footer wordmark), 17 (body), 15 (buttons, modal body), 13 (nav links, stat labels), 12 (mono lines, disclaimer)

**Spacing** — 8px-ish scale in practice: 8, 10, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 64, 72, 110. Section vertical rhythm is `110px` top padding; page gutter `48px`; content max-width `1240px`.

**Radius** — 6px (nav CTA, modal card, CA button), 8px (hero buttons), `2px 2px 0 0` (candles), 14px (sticker tiles, if re-added).

**Shadows / filters**
- Mascot glow: `drop-shadow(0 24px 60px rgba(46,164,79,0.35))` (hero) / `0.25` alpha (mission)
- Wordmark: `text-shadow: 6px 6px 0 #1e2a1e`
- Green text glow: `text-shadow: 0 0 40px rgba(46,164,79,0.35)`
- Modal card: `box-shadow: 0 40px 120px rgba(0,0,0,0.6)`
- Nav blur: `backdrop-filter: blur(8px)`; modal backdrop blur: `6px`

## Assets

In `assets/`:

- `mascot-crown.png` (1024×1536, transparent PNG) — mascot with lime crown and `$` sunglasses. Hero.
- `mascot-thug.png` (1214×1295, transparent PNG) — mascot with checkered pixel shades and pink tie. Mission section.
- `brand-brief.png` — the original brand brief board the design was built from (mascot versions, palette, expression sheet, website concept). Reference only; not used on the page.

Both mascots were supplied by the client as pre-cut transparent PNGs. They're large — compress and serve responsive sizes (WebP/AVIF plus PNG fallback) in production. No icon set is used; the social row was removed with the Join The Flock section.

## Files

- `$WERK Landing.dc.html` — the full design reference: markup, all inline styles, keyframes, and the logic class holding copy, stats, and the ticker/modal/clipboard behavior. Everything above is derived from this file; read it for anything this README doesn't spell out.
- `assets/` — mascot art and the brand brief, as listed above.
- `screenshots/` — rendered reference captures:
  - `01-desktop-hero.png` — hero, desktop
  - `02-desktop-mission-footer.png` — mission stats and footer, desktop
  - `03-desktop-whitepaper-modal.png` — whitepaper modal open, desktop
  - `04-mobile-hero.png` — hero at 430px
  - `05-mobile-whitepaper-modal.png` — whitepaper modal at 430px

  Note: mascots animate continuously, so any capture is one frame of the twerk loop. Match the keyframes, not the frame.
