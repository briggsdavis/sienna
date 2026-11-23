# Sienna Mercato Build Plan

Covers everything in the SOW that the current site doesn't do yet. Launch deadline: **Dec 10, 2026**.

## Architecture

- **Frontend:** the existing Vite + React + Tailwind site, deployed on Vercel.
- **Backend:** Convex for data, file storage (images), auth, scheduled jobs and email actions.
- **Admin:** a `/admin` area in the same app. Convex Auth Password login, limited to an allowlist of admin emails. Every admin query and mutation checks the role on the server.
- **Email:** Resend through the `@convex-dev/resend` component. Sends to one notification recipient, which is editable in settings.
- **Spam:** Cloudflare Turnstile on public forms, `@convex-dev/rate-limiter`, server-side validation and a hidden honeypot field.
- **Defaults:** the current `src/content/*.ts` files become seed data, so nothing on the live site is blank at launch.

## Data model (Convex tables)

| Table                      | Purpose                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `admins`                   | allowlisted emails and roles                                   |
| `menuSections`             | restaurant (tetto/mezzo/emporio/catering), title, image, order |
| `menuItems`                | section, name, desc, price(s), order, available, hidden        |
| `specials`                 | restaurant, day of week, name, desc, price, image, active      |
| `events`                   | title, date, time, desc, image, button text/link, recurrence   |
| `pageContent`              | page + slot key, text / image / link value                     |
| `cateringInquiries`        | contact, event details, line items snapshot, subtotal          |
| `contactInquiries`         | name, email, phone, message                                    |
| `privateEventInquiries`    | restaurant, contact, date, party size, notes                   |
| `subscribers`              | email, source (popup/footer), consent flag + timestamp         |
| `popup`, `announcement`    | single-row settings: content, CTA, active, display rules       |
| `pageViews`, `conversions` | path, referrer/source, visitor id, timestamp, event type       |
| `dailyStats`               | rollups filled by a cron job, for fast 1w/1m/3m/6m reports     |
| `settings`                 | notification email, reservation links/widgets, gift card URL   |

## Work items

### 1. Structure and nav (B.1 to B.4)

- Add `/contact`, `/menus/tetto`, `/menus/mezzo` and `/menus/emporio`.
- Nav: Home, Il Tetto, Mezzo, Emporio, Catering, Events, Contact, plus a Menus dropdown (desktop and mobile).
- Move menu content off the restaurant pages and onto the menu pages. Each restaurant page links to its menu.
- Ask the agency whether `/order` (not in the SOW) stays as a footer/CTA link or gets removed.

### 2. Menus (C.1, C.2, L.8)

- Admin menu editor per restaurant: sections and items with drag-to-reorder, one image per section.
- The catering menu uses the same editor, plus half/full pricing, kitchen and category, and Available / Hidden toggles.

### 3. Daily specials (B.5)

- Admin: create, edit, toggle and assign to a day of week for each restaurant.
- Public: a "Today's Specials" block on each restaurant page, using Pittsburgh time.

### 4. Reservations and gift cards (B.6, L.10)

- A reservation button or embed for each restaurant, all configured in `settings`.
- A gift card link in the nav/footer.
- All clicks are tracked as conversions.

### 5. Catering shop (D.1 to D.5)

- Cart state lives in React context and persists to `localStorage`.
- Checkout form: name, email, phone, date/time, pickup or delivery, notes, plus an itemized estimate.
- Clear "request, not a confirmed order" wording.
- On submit, the mutation re-prices items on the server, saves an inquiry snapshot and schedules the email.
- Duplicate submissions are blocked with an idempotency key and a disabled submit button.
- Admin: an inquiry list with search, filters, a detail view and delete.

### 6. Contact and private events (E.1, L.5)

- Two forms that share one form component. Both store the submission, send an email alert and show success/error states.
- Admin inbox views with search, filters and delete.

### 7. Events calendar (F.1, F.2)

- Admin: event CRUD, including weekly or monthly recurrence.
- Public: a month-grid calendar (an agenda list on mobile). Selecting an event shows its details and ticket link.
- Recurring events are expanded in the query for the visible month.

### 8. Content editing (G.1, G.2)

- Every editable element on Home and the three restaurant pages reads from `pageContent`, falling back to the seed default.
- When an admin is signed in, an "Edit page" toggle turns on inline editing: click text to edit, click an image to replace it, click a button to change its label and link.
- Layout can't be changed.

### 9. Marketing (H.1 to H.4, L.4)

- **Popup editor:** headline, copy, fields, delay, how often it shows, and which pages it appears on.
- **Announcement bar editor:** message, CTA, active flag, and dismissal.
- **Signup:** a footer email form with a consent checkbox. Marketing consent is stored apart from inquiries.
- **Subscribers:** an admin list with CSV export.
- **Privacy:** a privacy policy link and a cookie/analytics consent banner, following agency direction.

### 10. Analytics (I.2, L.9)

- On each route change, the site records the path, referrer source (direct / search / social / referral, plus UTM) and an anonymous visitor id.
- Conversions recorded: catering inquiry, reservation click, private-event inquiry, gift card click and signup.
- An hourly cron updates `dailyStats`.
- Dashboard: views, visitors, sources and conversions, with 1w / 1m / 3m / 6m ranges.

### 11. SEO (L.1)

- Per-route title and description set in the admin, rendered with React 19 `<title>`/`<meta>`.
- Canonical tags, `robots.txt`, a generated `sitemap.xml`, and Restaurant JSON-LD for each venue.
- Old site URLs are crawled and mapped to `vercel.json` redirects.
- Risk: this is a client-rendered SPA. If the agency needs meta tags present without JavaScript, add build-time prerendering for the public routes.

### 12. Backups (L.3)

- A nightly GitHub Action runs `convex export` and keeps 30 days of exports in a private bucket.
- Alternative: Convex Pro scheduled backups (paid, needs agency approval).
- Restore steps go in the handoff docs.

### 13. Launch and handoff (J.1 to J.6, section 7)

- QA checklist covering every J.1 item on Chrome, Safari, Firefox and Edge, desktop and mobile.
- Steps: Vercel production deploy, Convex production deployment, domain/DNS cutover, SSL, redirects, and Resend domain verification (SPF/DKIM).
- Handoff: repo access, admin logins, Vercel/Convex/Resend/domain access, env var list, backup/restore guide and an admin user guide.

## Schedule

| Dates           | Work                                                                                   | Review                                   |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------------------------- |
| Nov 18 to 21    | Schema, admin auth + shell, seed data, new pages + nav, menus in Convex                | **Round 1:** visual design (Nov 21)      |
| Nov 22 to 28    | Menu/catering editors, specials, catering cart + checkout, forms + email, reservations | Thanksgiving Nov 26                      |
| Nov 29 to Dec 3 | Events calendar, marketing tools, analytics, content editing                           | **Round 2:** visual refinement (Dec 1)   |
| Dec 4 to 7      | SEO, spam controls, backups, full QA pass, DNS prep                                    | **Round 3:** final functionality (Dec 5) |
| Dec 8 to 9      | Fix round 3 feedback, J.5 demo, production setup                                       | Agency acceptance                        |
| **Dec 10**      | **Launch**                                                                             | 45-day support starts                    |

## Needed from the agency (request on day 1)

- [ ] Reservation platform and widget code for each restaurant (only Mezzo's OpenTable link is known)
- [ ] Gift card provider URL
- [ ] Notification email recipient
- [ ] Current menus and pricing for all three restaurants and catering
- [ ] Final photos (the site currently uses stock placeholders) and access to the brand assets
- [ ] Privacy policy, signup consent wording and cookie consent direction
- [ ] Domain registrar and DNS access, plus the current site's URL list
- [ ] Approval for paid services: Resend (free tier is likely enough), Convex plan, Vercel plan, backup storage
- [ ] Admin user emails
- [ ] Decision on `/order`

## Risks

- **Tight timeline:** 3 weeks, including a holiday. Content editing and analytics carry the most risk, so build them on simple patterns and don't add features beyond them.
- **Late materials:** reservation widgets and DNS access can block launch. Ask for them on day 1 and send written notice under MSA 4.1 if they're late.
- **SEO depends on JavaScript rendering:** see item 11.
