# EcoMate — Home Dashboard (Page 3)

**Deliverable A · Draft 1 · 28 October 2026**

A mobile-first, standalone implementation of **only page 3** of the supplied EcoMate wireframe, using HTML, CSS, and vanilla JavaScript. The interface follows the supplied colored reference image (370 × 805 px).

## Run locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, **or** from the extracted directory run:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000` if running the local server.
4. Use your browser's mobile device emulation to preview at **370 × 805**. The supplied screenshot is a mobile reference, so desktop view intentionally preserves a centered app-like layout.

**No build command, package installation, backend, CDN, external icon library, account, or database is required.** All illustrations/icons are inline SVG markup.

## What's included

- EcoMate masthead and user avatar
- Greeting and supporting copy
- Eco score panel (125 points, four-day streak)
- Four quick-action cards (Which bin?, Food tracker, Leaderboard, House team)
- Food expiry reminder with View all and Check item actions
- Fixed five-item bottom navigation with the Home state clearly selected
- Responsive layout and mobile safe-area support
- Keyboard focus and accessible button/dialog behavior
- Honest interactions: controls for unbuilt pages open an informational preview dialog rather than a broken or misleading link

## Scope boundary and data

This is a **frontend-only Home Dashboard**. The values shown (`A`, `125 points`, `4 days`, `Spinach expires today`) are **reference/mock data from the wireframe**, not authenticated user data. No other pages, sign-in, Flask API, MySQL database, points engine, reminder service, or native Android/iOS package are included.

Buttons leading to the wider app display a clear destination dialog. The **Home** tab scrolls to the top. This is intentional and avoids suggesting the other screens exist.

## Project structure

```text
ecomate-home-draft1/
├── index.html          # Page 3 markup and SVG icons
├── css/styles.css      # Design tokens, mobile-first layout and responsive styling
├── js/app.js           # Mock data binding, interactions and integration hooks
├── preview/            # Captured screenshots (desktop/mobile if present)
└── README.md
```

## Integration with the team's Flask project

The group technical specification identifies **HTML/CSS/JavaScript** for the frontend, **Python/Flask** for the backend, and **MySQL** for persistence. This draft is compatible with that direction but deliberately does not introduce a second backend or a speculative data schema.

1. Put `index.html` under your Flask `templates/` directory (for example, `templates/home.html`). Move the `css` and `js` files under `static/`.
2. Change the stylesheet and script references from `css/styles.css` and `js/app.js` to the team's actual Flask `url_for('static', filename=...)` references.
3. Register the team's Home route and use the team's existing authentication/session strategy.
4. When real data exists, pass the following fields to `window.EcoMateHome.updateDashboard({...})`:
   ```js
   window.EcoMateHome.updateDashboard({
     initial: 'A',
     greeting: 'Good afternoon!',
     score: 125,
     streakDays: 4,
     reminderTitle: 'Spinach expires today',
     reminderDescription: 'Use it in a salad or freeze it.'
   });
   ```
   Render the data only from trusted, authorized APIs. The current handler writes via `textContent` rather than injecting HTML.
5. After the other teammates' pages/routes exist, connect navigation:
   ```js
   window.EcoMateHome.configureRoutes({
     search: '/which-bin',
     food: '/food',
     ranks: '/leaderboard',
     team: '/house-team',
     profile: '/profile'
   });
   ```
   **These paths are examples**, not claims about the actual team's route names. Use the agreed URLs.
6. Only if requested, add authenticated Flask API endpoints and MySQL queries according to the group's shared schema. Backend implementation is not part of this deliverable.

## Deployment

This is a static website and can be hosted on any static host (for example, GitHub Pages, Netlify, or an existing team web server). Upload the **contents of this directory** while preserving relative `css/` and `js/` paths. The homepage is `index.html`. For integrated Flask deployment, use the team's Flask hosting process instead.

**Note:** Deploying the static page publishes this **preview only**; it does not automatically publish the rest of EcoMate or make the demo data live.

## QA checklist

- [x] All six dashboard regions present and ordered like the provided Page 3 reference
- [x] No framework, external assets or external dependency required
- [x] Interactive action cards, avatar, reminder actions and navigation
- [x] Destination previews explicitly identify unbuilt screens
- [x] CSS responsive behavior at narrow and wide viewport sizes
- [x] Mobile bottom bar safe-area padding, content clearance, visible focus treatment
- [ ] Confirm actual destination URLs with the client's team
- [ ] Connect live authenticated data if the team later assigns backend integration

## Handoff notes

- Screen assigned: **Page 3 — Home Dashboard**.
- Reference: Page 3 of `Wireframe (1).docx` plus the provided color screenshot.
- Not included: Pages 1–2, 4–10, Flask/MySQL functionality, or actual user accounts.
- Status: Standalone first-draft frontend, ready to preview and share; integration remains dependent on the team's other pages and APIs.
