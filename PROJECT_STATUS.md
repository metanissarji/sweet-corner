# PROJECT STATUS — הפינה המתוקה (Sweet Corner)

Living status doc for the ice-cream shop website. Keep it updated as work continues.

---

## 1. Goal

A Hebrew (RTL) e-commerce site for **"הפינה המתוקה"** — an ice-cream / frozen-sweets shop in the Galilee (branches: נצרת, נוף הגליל, יפיע, כפר כנא, עראבה, ביר אלמכסור). Customers browse products and freezer **deals (מבצעים)**, add to a cart, and place an order. Owner-facing admin panels manage products and orders. Mobile-first — most visitors are on phones.

- **Real contact:** phone `04-9836313`, Instagram `@hapina.hamitoka` (https://www.instagram.com/hapina.hamitoka/), hours `כל יום 10:00–23:00`.

---

## 2. Stack

- **React 18 + Vite 5**, `react-router-dom` v6 (client-side routing).
- Plain CSS (per-component `.css` files + `src/styles/global.css` design tokens). No CSS framework.
- State via React Context (cart, products, orders) with `localStorage` persistence.
- **Hosting:** Vercel, auto-deploys on every push to `main`.
  - Live URL: **https://sweet-corner-nexoraproduction.vercel.app**
  - Project: `prj_lBgels553LDw8Ij39eLmLVYpcXHo`, team `team_YEe3z2G6BsiVk67Y0jScQAmS`. SPA rewrites in `vercel.json`. Deployment protection is OFF (public).
- **GitHub:** https://github.com/metanissarji/sweet-corner (private). Collaborators: `metanissarji` (owner), `Johnlawen` (write).

---

## 3. How to run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build (also the fastest correctness check)
```

---

## 4. Structure

```
sweet-corner/
  index.html                 # RTL, Google Fonts (Rubik, Secular One, Karantina)
  vercel.json                # SPA rewrites
  public/images/             # product/hero images + README listing expected filenames
    home-hero.jpg            # ★ homepage poster (icy-blue, 863×1823) — the design "reference"
    bag-hero.jpg, bag-closed.jpg, logo.png, mivtza-01..15 (deal photos, mostly not added yet)
  src/
    main.jsx, App.jsx        # routes; hides site navbar on "/" (poster has its own nav)
    styles/global.css        # ★ design tokens (palette), buttons, cards, forms, chips
    context/
      CartContext.jsx        # cart items, localStorage
      ProductsContext.jsx    # flavors/favorites/deals/packages/freezerDeals + admin CRUD
      OrdersContext.jsx      # orders placed via checkout
    data/products.js         # ★ all sample data + contact constants (edit here)
    components/
      BagHero.jsx/.css       # ★ homepage hero: full poster + clickable baked-nav hotspots
      Navbar.jsx/.css        # site nav (no search, no hamburger — wraps on mobile)
      Footer.jsx/.css        # contact + quick links
      CartDrawer.jsx/.css    # ★ cart drawer/bottom-sheet, checkout form, min-order, confetti
      AddToCart.jsx/.css     # +1 stepper, fly-to-cart, toast (exports showCartToast)
      ProductImage.jsx       # image with graceful placeholder when file missing
      FeatureStrip, LabelTag, WaveDivider, PhotoHero  # supporting
    pages/
      Home.jsx/.css          # ★ poster hero + "הכי נמכרים" horizontal scroller
      Flavors, Deals, Packages, About, Contact, Branches
      Deals.jsx + FreezerDeals.css  # ★ 15 freezer (מקפיא) deal cards, qty×price
      FreezerCatalog.jsx     # /deals/freezer/:id — one deal opened, lists its ice creams
      CatalogProducts.jsx    # /deals/catalog/:id (Johnlawen's deal catalogs)
      Admin.jsx, OrdersPanel.jsx  # PIN-gated (1234) back office
```

Routes: `/`, `/flavors`, `/deals`, `/deals/catalog/:id`, `/deals/freezer/:id`, `/packages`, `/about`, `/contact`, `/branches`, `/admin`, `/orders-panel`.

---

## 5. Design decisions

- **Palette = "summer poolside" (blue & white).** Defined once in `global.css` `:root` as semantic tokens (`--primary` pool-blue `#1699e0`, `--ink` navy `#0d3b66`, `--bg` icy `#eaf6fe`, `--sun` yellow `#ffce3a`, white surfaces). Legacy names (`--pink`, `--brown`, `--cream`…) are **aliased** to the new tokens so older styles keep working. To restyle the whole site, edit these tokens.
- **Homepage hero = the poster image shown IN FULL** (`home-hero.jpg`), treated as the design reference (no cropping). The site navbar is hidden on `/`; transparent **click hotspots** (`POSTER_NAV` in `BagHero.jsx`, % coords for an 863×1823 image) sit over the poster's drawn menu. Desktop: height-capped, centered, deep-blue gradient fills the sides seamlessly. Mobile: full-width.
- **Nav:** search bar and hamburger were removed. On other pages the real navbar shows all words (wraps to rows on mobile, blue active pill).
- **"הכי נמכרים"** on home = single-row **horizontal scroller** with arrow buttons + swipe (RTL: "show more" scrolls `scrollLeft` negative).
- **Freezer deals** render as CSS "מקפיא" cards (blue body, glass window, yellow "מבצע" ribbon, qty×price); clicking opens `/deals/freezer/:id`.
- **Animations** are CSS-first; transient JS animations use **timers, not `finish` events** (finish events proved unreliable across browsers and left stuck elements).
- **Deploy verification uses the `webapp-testing` skill (Playwright, Node)** since the in-app preview tools are flaky. Screenshots are taken on desktop + iPhone viewports before pushing. Skills installed under `~/.claude/skills`: frontend-design, webapp-testing, theme-factory, canvas-design, algorithmic-art.

---

## 6. Collaboration model (IMPORTANT)

- Owner edits from **VS Code** (with the friend `Johnlawen`); Claude edits from this CLI. Both push to `main`; Vercel auto-deploys.
- **Risk:** two people editing the same file at once → merge conflicts. Rule: `git pull` before editing, `git push` right after. Claude commits others' uncommitted VS Code work as its own commit before building on top, to avoid losing it.
- Recent local (VS Code) edits already merged: removed SearchBar + hamburger; added **order minimum ₪10** with a delivery note; free-delivery threshold raised to **₪250**; logo overlay experiment.

---

## 7. Current status / open items

- ✅ Live, public, mobile-first, blue/white summer theme, full-poster homepage with working hotspot nav, horizontal best-sellers, cart + checkout + order minimum, admin/orders panels, real branch/contact info.
- ⚠️ **Placeholder product images.** Most `public/images/*.png` (flavors, `mivtza-01..15`) are not present yet — cards show styled placeholders with the expected filename. Drop real photos in with those names to upgrade automatically (see `public/images/README.md`).
- ⚠️ **Admin/Orders PIN is `1234`** (hardcoded in `Admin.jsx` / `OrdersPanel.jsx`) — change it.
- ⚠️ Prices are sample data (`data/products.js`); freezer deal quantities/prices are real (4×20, 3×21, … 3×17) but the ice creams inside each deal (`freezerDeals[].products`) are empty.
- ℹ️ Some dead CSS remains in `BagHero.css` (old `.combo-*`, `.bag-cutout`, burst/treat rules) from superseded hero animations — harmless, safe to prune later.

---

## 8. Next steps (requested, not yet done)

The last request (in progress — pausing due to session limit):
1. **Remove the "הזמינו עכשיו" button** (the `poster-cta-band` under the poster in `BagHero.jsx`).
2. **Add a section on the home page (below the best-sellers) showing ALL the freezer deals** (`freezerDeals`, 15 items) in a **2-column vertical grid** ("two freezers side by side, continuing down").
3. **Make the freezer cards a bit smaller** for that home grid.
   - Plan: create a shared `FreezerCard.jsx` (reuse the card markup from `Deals.jsx`, imports `FreezerDeals.css`); add a `HomeFreezers` section in `Home.jsx`; style `.home-freezers-grid` as 2 columns with reduced `--freezer` font/padding; keep it clickable → `/deals/freezer/:id`. Verify with Playwright on mobile + desktop, then commit + push.

Later ideas: real product photos; change admin PIN; connect orders to WhatsApp/email; optional custom domain.

---

## 9. Git

- Branch `main`. Latest commit: `743432b` (full-poster homepage + best-sellers scroller). Working tree clean, up to date with origin at time of writing.
- Commit convention: end messages with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
