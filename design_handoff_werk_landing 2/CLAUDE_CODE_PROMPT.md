# Claude Code prompt

Copy everything below into Claude Code, from the repo root, with the handoff folder available.

---

Build the $WERK landing page from the design handoff in `design_handoff_werk_landing/`.

**Read first:** `design_handoff_werk_landing/README.md`. It is the spec — exact colors, typography, spacing, copy, animation keyframes, state behavior, and the full mobile breakpoint. The screenshots in `design_handoff_werk_landing/screenshots/` are rendered references. `$WERK Landing.dc.html` is the design prototype: read it for anything the README leaves ambiguous, but do not port it — it depends on a custom template runtime (`<x-dc>`, `{{ }}` holes, `<sc-for>`, `<sc-if>`, `data-r` attributes) that must not appear in the final code.

**Stack:** use this repo's existing framework, styling approach, and component conventions. If the repo is empty, use Vite + React + TypeScript with plain CSS Modules — this is one static page and does not need more than that.

**Scope — build exactly these, in order:**
1. Sticky nav (wordmark, WHITEPAPER link, JOIN THE FLOCK button)
2. Hero (giant `$WERK` wordmark, tagline, BUY/CHART buttons, click-to-copy contract address, animated candle backdrop, mascot)
3. Ticker strip (`YOU BETTER $WERK` marquee)
4. Mission section (`GREEN CANDLES ONLY`, two paragraphs, four stats, second mascot)
5. Whitepaper modal (the gag, with the full accessibility contract)
6. Footer (wordmark + disclaimer)

Do not add sections. Tokenomics, How To Buy, Roadmap, and a Join The Flock section were explicitly cut from this design.

**Non-negotiables:**
- **All copy verbatim from the README.** The jokes are the product. Do not rewrite, "improve," capitalize, or fix the intentionally lowercase crypto-Twitter voice. No em-dash cleanup, no grammar corrections.
- **The `twerk` keyframes exactly as specified**, with `transform-origin: 50% 100%`, hero at 0.55s and mission mascot at 0.7s. The desync between the two birds is intentional.
- **The whitepaper modal's accessibility contract in full**: `role="dialog"`, `aria-modal`, focus moved to the close button on open, focus restored to the trigger on close, body scroll locked while open, `Escape` closes, Tab trapped inside. Bind the key handler at the document level, not the dialog element. If the repo has a Dialog primitive (Radix, Headless UI), use it instead of hand-rolling — and verify by keyboard, not by reading the code.
- **`@media (prefers-reduced-motion: reduce)`** disables the mascot animations and the ticker.
- **One breakpoint at 900px**, per the Mobile layout section. Match it.
- **No horizontal scroll.** The ticker band bleeds 8px past the viewport by design; clip it with `overflow-x: hidden` on the page root and check `document.documentElement.scrollWidth === clientWidth` at both 1440px and 390px.
- Extract the design tokens (colors, type scale, spacing) into whatever the repo uses for tokens — CSS custom properties, a theme file, Tailwind config. Do not scatter hex values through components.

**Placeholders to wire up (leave clearly marked TODO):**
- Contract address is `WERKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpump` — a placeholder. Make it a single config value.
- `BUY $WERK`, `CHART`, and `JOIN THE FLOCK` all point to `#`. Make the URLs config values too.

**Assets:** copy the two mascot PNGs from `design_handoff_werk_landing/assets/`. They are large (1–2MB) — generate WebP/AVIF with PNG fallback and serve responsive sizes. `brand-brief.png` is reference only; do not ship it.

**Fonts:** Anton, Permanent Marker, Space Grotesk (Google Fonts). Self-host or preconnect and preload; don't let the display type flash.

**When done:** run the dev server, confirm the page renders at 1440px and 390px wide, tab through the nav into the modal to verify the trap and the Escape key, and tell me anything in the README that was ambiguous or that you had to decide yourself.
