# AI_HANDOFF — הפינה המתוקה (Sweet Corner)

Handoff doc so a fresh Claude Code chat can continue this project with full context. Read this top to bottom before editing. There is also a `PROJECT_STATUS.md` in the root — this file supersedes it where they differ.

---

## 1. Project goal / what the site is

A Hebrew, **right-to-left (RTL)** e-commerce website for **"הפינה המתוקה"** — an ice-cream / frozen-sweets shop in the Galilee, Israel. Branches: נצרת, נוף הגליל, יפיע, כפר כנא, עראבה, ביר אלמכסור.

Visitors browse products and **freezer deals (מבצעים)**, add items to a cart, and place an order. There are owner-only admin panels for managing products and viewing orders. The site is **mobile-first** — most visitors use phones — but must also look great full-screen on desktop.

Real business info (already in the code, safe to show): phone **04-9836313**, Instagram **@hapina.hamitoka** (https://www.instagram.com/hapina.hamitoka/), hours **כל יום 10:00–23:00**.

---

## 2. Tech stack & how to run

- **React 18 + Vite 5**, `react-router-dom` v6.
- Plain CSS — per-component `.css` files + `src/styles/global.css` (design tokens). **No CSS framework.**
- State: React Context (`CartContext`, `ProductsContext`, `OrdersContext`) persisted to `localStorage`.
- No backend. Orders live in `localStorage` only.

```bash
npm install
npm run dev      # http://localhost:5173  (may fall back to another port if busy)
npm run build    # production build — the FASTEST way to check for errors
```

**Hosting:** GitHub → Vercel, auto-deploys on every push to `main`.
- Repo: `https://github.com/metanissarji/sweet-corner` (private). Collaborators: `metanissarji` (owner), `Johnlawen` (write).
- Live: `https://sweet-corner-nexoraproduction.vercel.app` (public). `vercel.json` has SPA rewrites.
- Commit message convention: end with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

**Verification workflow:** The in-app browser-preview tools are unreliable in this environment. Use **Playwright via Node** for visual checks (Python is NOT installed; ffmpeg is NOT installed). Pattern used all along: install `playwright` in a scratch dir, `npx playwright install chromium`, start `npm run dev`, then a small `.mjs` script screenshots desktop (e.g. 1440×810) + iPhone 12 viewports and asserts DOM state. Always `npm run build` before pushing.

---

## 3. Folder / file structure

```
sweet-corner/
  index.html            # RTL <html dir="rtl" lang="he">, Google Fonts (Rubik, Secular One, Karantina)
  vite.config.js, vercel.json
  public/
    images/             # hero/product/section images (see §11) + README listing expected filenames
    audio/intro.mp3     # intro music (see §9)
  src/
    main.jsx            # React root
    App.jsx             # Router + providers; decides when Navbar/Footer/Cart show
    styles/global.css   # ★ design tokens (palette), buttons, cards, chips, forms
    hooks/
      useHomePhoto.js   # exports HOME_PHOTO, BAG_PHOTO, BAG_CLOSED consts + image-exists checks
      useMediaQuery.js  # responsive hook (isMobile etc.)
    context/            # CartContext, ProductsContext (products + freezer CRUD), OrdersContext
    data/products.js    # ★ ALL sample data + contact constants (edit here to change catalog/prices)
    components/         # see §4
    pages/              # see §4
```

Routes (`App.jsx`): `/`, `/flavors`, `/deals`, `/deals/catalog/:id`, `/deals/freezer/:id`, `/packages`, `/about`, `/contact`, `/branches`, `/admin`, `/orders-panel`.

---

## 4. Main pages & components

**Pages (`src/pages/`)**
- `Home.jsx` ★ — homepage. Renders `<IntroOverlay>` (first visit) then `<HomeFreezers>` + `<FlavorsPreview>` + `<FeatureStrip>`. Contains the `FlavorsPreview` (best-sellers horizontal scroller) and `HomeFreezers` (all freezer deals) section components.
- `Deals.jsx` + `FreezerDeals.css` ★ — the מבצעים page: 15 freezer ("מקפיא") cards, each `qty × price`, clickable → `/deals/freezer/:id`.
- `FreezerCatalog.jsx` — `/deals/freezer/:id`: one deal "opened", lists the ice creams inside it (`freezerDeals[].products`, mostly empty).
- `CatalogProducts.jsx` — `/deals/catalog/:id` (older deal-catalog concept from Johnlawen).
- `Flavors.jsx`, `Packages.jsx`, `About.jsx`, `Contact.jsx`, `Branches.jsx` — standard pages.
- `Admin.jsx` + `AdminOrdersTab.jsx` + `OrdersPanel.jsx` — **PIN-gated** back office (product & order management). PIN is `1234` (hardcoded — see §10).

**Components (`src/components/`)**
- `IntroOverlay.jsx/.css` ★ NEW — the intro splash (see §8).
- `BagHero.jsx/.css` ★ — the poster hero engine + `POSTER_NAV` / `POSTER_NAV_PC` hotspot coordinates and the `.poster-nav-spot` styles (gradient-underline hover/tap). Still used as a fallback; the intro reuses its images/idea.
- `Navbar.jsx/.css` ★ — top nav. Logo is now the **character** (`/images/character.png`). Links: דף הבית, הטעמים שלנו, מבצעים, מארזים, אודות, צור קשר + a `סניפים` button. No search bar, no hamburger (removed). On mobile the links wrap to rows; active link + hover show a blue→yellow gradient underline.
- `CartDrawer.jsx/.css` ★ — floating cart button (bottom-right on mobile), drawer/bottom-sheet, checkout form, **order minimum ₪10**, free-delivery progress at **₪250**, confetti on order.
- `AddToCart.jsx/.css` — `+1` stepper, fly-to-cart animation, `showCartToast` (exported).
- `FreezerCard.jsx` — shared freezer card (used by `Deals` and `HomeFreezers`), imports `FreezerDeals.css`.
- `ProductImage.jsx` — shows an image, or a styled placeholder with the expected filename when the file is missing (this is why many cards show `mivtza-XX.png` text — real photos not added yet).
- `FeatureStrip`, `LabelTag`, `WaveDivider`, `PhotoHero` — supporting.

---

## 5. Important files changed and what they do (this project's work)

- `src/styles/global.css` — the **summer blue/white palette** as CSS tokens (see §6). Legacy token names aliased so old styles keep working.
- `src/components/BagHero.jsx/.css` — poster hero: full uncropped poster, clickable nav hotspots, gradient-underline hover/tap on `.poster-nav-spot`.
- `src/components/Navbar.jsx/.css` — character logo; removed search/hamburger; gradient-underline nav effect; mobile wrapping.
- `src/components/IntroOverlay.jsx/.css` — the 5-second intro (poster + flying mascot + 6s music), then fade to reveal content.
- `src/pages/Home.jsx/.css` — intro → freezers + best-sellers + features; `FlavorsPreview` (horizontal best-sellers scroller) and `HomeFreezers`.
- `src/pages/Deals.jsx` + `FreezerDeals.css` — 15 freezer deal cards (qty×price), yellow "מבצע" ribbon.
- `src/components/FreezerCard.jsx` — extracted shared freezer card.
- `src/components/CartDrawer.jsx` — order minimum + free-delivery threshold (last set by Johnlawen).
- `src/App.jsx` — now shows `<Navbar>` on the homepage too (persistent nav); hides nav/footer/cart only on `/admin` and `/orders-panel`.
- `src/hooks/useHomePhoto.js` — `HOME_PHOTO` currently points to `/images/home-hero-mobile.png` (changed by Johnlawen).
- `public/audio/intro.mp3` — intro music (was `bena metoka.mpeg`, actually an MP3).
- `public/images/character.png` — the mascot (from `dancing photo.png`).
- `PROJECT_STATUS.md`, `AI_HANDOFF.md` — docs.

---

## 6. Design direction, colors, layout, animation, responsive

**Palette = "summer poolside" (blue & white)** — defined ONCE in `global.css :root`:
```
--bg:#eaf6fe (icy page bg)   --bg-deep:#d6ecfb   --surface:#ffffff (cards)
--primary:#1699e0 (pool blue, all CTAs/active)   --primary-dark:#0f79c2
--primary-soft:#dceffb   --primary-splash:#a9d7f4
--ink:#0d3b66 (navy text)   --ink-soft:#4a7aa5   --sun:#ffce3a (yellow accent)
```
Legacy names (`--pink`,`--brown`,`--cream`,`--yellow`,`--paper`…) are **aliased** to these. To restyle the whole site, edit the tokens — do NOT hunt down individual colors.

**Fonts:** Rubik (body), Secular One (headings), Karantina (brush display). RTL throughout.

**Layout rules:** white cards on the icy background; rounded corners (`--radius:18px`); pill buttons; freezer cards are blue "fridge" shapes with a glass window, yellow "מבצע" ribbon, big `qty ב־ ₪price`.

**Signature animations:**
- **Intro splash** (see §8): mascot flies from top and lands on the bag's logo; light flash; poster slow-zoom; then fades to reveal content.
- **Nav gradient underline** (blue→yellow) springs in on hover (desktop) and on `:active`/tap (mobile) — for both the real navbar links and the poster's `.poster-nav-spot` hotspots.
- Cart: fly-to-cart, confetti, free-delivery celebration.
- **Rule:** transient JS animations must use **timers, not `finish` events** (finish events proved unreliable across browsers and left stuck DOM nodes). Respect `prefers-reduced-motion`.

**Responsive / desktop vs mobile (important):**
- **Two different homepage hero images.** Desktop uses a **landscape 16:9** poster (`home-hero-pc.jpg`, 1672×941) that fills the whole screen. Mobile uses a **portrait** poster. `useMediaQuery('(max-width: 768px)')` picks which. This split exists specifically because a portrait poster looked like a narrow column on desktop — the landscape one fills the screen.
- Each poster has its own hotspot coordinate array (`POSTER_NAV` for portrait 863×1823, `POSTER_NAV_PC` for landscape 1672×941). If you swap a hero image, you MUST re-measure these % coordinates and re-verify clicks with Playwright.
- Cart is a bottom-right floating button + bottom-sheet on mobile; a side drawer on desktop.

---

## 7. Collaboration model (READ THIS)

- The **owner edits from VS Code** (sometimes with the friend `Johnlawen`); this Claude edits from the CLI. Both push to `main`; Vercel auto-deploys.
- **Two people editing the same file at once causes merge conflicts.** Before editing: `git fetch` + `git status` + `git pull`. After: commit + push promptly.
- When you find **uncommitted changes you didn't make**, they are the owner's/friend's VS Code work — **commit them first (preserve them), then build on top.** This has already happened several times (e.g. Johnlawen removed the search bar, added the order minimum, added freezer-product admin CRUD, renamed the hero image, added `section-bg-*`/`ice.jpeg`). All of that is intentional — do not revert it.

---

## 8. The intro splash (newest feature) — exact behavior

`IntroOverlay.jsx`: on the homepage, first visit per browser session (`sessionStorage 'introSeen'`):
1. Fixed full-screen overlay (`z-index:9999`) shows the poster (desktop landscape / mobile portrait) with a slow zoom.
2. The **mascot** (`character.png`) flies in from the top in an arc and **lands on the bag's center logo** (~34vh), with a white flash on landing.
3. `intro.mp3` plays ~6 seconds (fades out near the end). Autoplay-with-sound is browser-blocked until a user gesture, so it also `play()`s on the first `pointerdown` — expect it may not sound until the first tap/click. This is a browser limitation, not a bug.
4. After **5 seconds** the overlay fades (0.65s) and calls `onDone`, revealing the real content beneath.
5. A **"דלג ←" skip button** lets users skip.
Behind the overlay, `<Navbar>` + the home sections are already mounted, so revealing is instant/smooth. The persistent navbar (with the character logo) stays after the intro — keeping דף הבית / הטעמים שלנו / מבצעים / צור קשר always reachable.

---

## 9. Assets (where things live)

`public/images/`:
- `character.png` — mascot (nav logo + intro flyer). ~1254×1254, opaque beige background.
- `home-hero-pc.jpg` (1672×941, ~573KB q94) — **desktop** homepage poster (landscape).
- `home-hero.jpg` (863×1823) — portrait homepage poster (used by the intro on mobile).
- `home-hero-mobile.png` — Johnlawen's mobile hero; `HOME_PHOTO` currently points here.
- `logo.png` — the old round logo (no longer the nav logo; still referenced in a couple places).
- `bag-hero.jpg`, `bag-closed.jpg` — earlier bag-animation assets (BagHero fallback path).
- `section-bg-*`, `ice.jpeg`, `back ground.png`, `BACK GROUND PHONEE.png` — Johnlawen's section backgrounds.
- `mivtza-01..15.png`, `flavor-*.png`, `package-*.png`, `deal-*.png` — **product photos NOT added yet** → placeholders show the filename.
`public/audio/intro.mp3` — intro music.

---

## 10. Current state, known issues, things NOT to change

**Working now:** live, public, mobile-first blue/white theme; intro splash with flying mascot + music; persistent nav with character logo; desktop full-screen landscape hero with hover underline; mobile portrait hero; deals/freezers, best-sellers scroller, cart + checkout + order minimum, admin/orders panels, real branch/contact info. Latest commit `d233671`. `npm run build` passes; no console errors in last Playwright run.

**Known issues / open items:**
- Most **product images are placeholders** — add real files to `public/images/` with the exact expected names (see `public/images/README.md`).
- **Admin/Orders PIN is `1234`**, hardcoded in `Admin.jsx` / `OrdersPanel.jsx` — should be changed.
- **Audio autoplay** may not sound until the first user tap (browser policy) — expected.
- `freezerDeals[].products` (ice creams inside each deal) are mostly empty; prices for flavors/packages are sample data (`data/products.js`); freezer qty×price are the real ones (4×20 … 3×17).
- Some **dead CSS** remains in `BagHero.css` (old `.combo-*`, `.bag-cutout`, burst/treat rules) — harmless, prunable.
- The homepage freezers section layout has changed hands between a 2-column vertical grid and a horizontal scroller during merges — confirm the current look before "fixing" it, and check with the owner which they want.

**Do NOT change without asking:**
- The palette token names/aliases in `global.css` (whole site depends on them).
- Johnlawen's work: order minimum (₪10) / free-delivery (₪250) in `CartDrawer`, the freezer-product admin CRUD in `ProductsContext`, the `section-bg-*` assets, and `HOME_PHOTO = home-hero-mobile.png`.
- The two-image desktop/mobile hero split and the hotspot coordinate arrays — unless you re-measure and re-verify.
- Don't add heavy dependencies; keep it plain React + CSS.
- Never commit secrets/tokens (Vercel/GitHub auth lives outside the repo).

---

## 11. Exact next steps (suggested)

1. Add the **real product photos** (`mivtza-01..15.png`, `flavor-*`, `package-*`) so placeholders disappear.
2. Change the **admin PIN** off `1234`.
3. Populate `freezerDeals[].products` so each opened freezer lists its ice creams (owner can do this via `/admin`).
4. Consider wiring orders to WhatsApp/email (currently localStorage only).
5. Optional: fine-tune intro timing/positions if the owner wants; confirm the freezers-section layout with the owner.
Always: `git pull` → edit → `npm run build` → Playwright check → commit (with the co-author trailer) → push.
