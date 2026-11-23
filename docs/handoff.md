# Handoff

## Admin guide

Sign in at `/admin`. The first time, choose "Create your account" with an email on the admin list. Owners in `ADMIN_EMAILS` can add more admins in Settings.

| Section        | What it does                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview       | Page views, daily visitors, traffic sources, conversions and top pages for 1 week, 1 month, 3 months or 6 months                                                          |
| Inquiries      | Catering requests, private event inquiries and contact messages. Search, filter by status, mark reviewed or archived, delete                                              |
| Menus          | Sections and items for each restaurant menu and the catering shop. Reorder with the arrows. Catering items have sizes and prices, and can be marked unavailable or hidden |
| Daily specials | Specials per restaurant, scheduled by day of week, shown on the restaurant page and on the home page for today                                                            |
| Events         | Calendar entries, including weekly or monthly repeats, with optional image and ticket button                                                                              |
| Pages & SEO    | Opens a page in edit mode, and sets the search title and description for each page                                                                                        |
| Popup & banner | Email signup popup and the sitewide announcement bar                                                                                                                      |
| Subscribers    | Opted-in emails with the consent text each person agreed to. Export to CSV                                                                                                |
| Settings       | Notification email, reservation setup per restaurant, ordering and gift card links, consent and privacy text, admin users                                                 |

**Editing a page:** on Home, Il Tetto, Mezzo, Emporio or Catering, use the "Edit page" button at the bottom left while signed in. Click outlined text to type, "Replace image" to upload, or a button to change its label and link. Changes save when you click away. Clearing a text restores the original.

**Reservations:** each restaurant is walk-in, a link to a booking site, or an embedded booking iframe. Reservation link clicks are counted as conversions. Clicks inside an embedded iframe can't be counted.

**Catering requests** are never payments or confirmed orders. Prices are re-checked on the server when a request is sent.

## Launch checklist

1. Create the Convex production deployment and set the environment variables listed in the README. Generate auth keys with `bun x @convex-dev/auth` against production.
2. In Resend, verify the sending domain (SPF and DKIM DNS records) and set `RESEND_API_KEY` and `EMAIL_FROM`.
3. Seed production once: `bun x convex run --prod seed:run`. Then replace stock photos and check menus and prices in the dashboard.
4. In Vercel, import the repo, set `CONVEX_DEPLOY_KEY` (production deploy key) and optionally `VITE_SITE_URL`. `vercel.json` runs `convex deploy` and the Vite build together.
5. Point the domain at Vercel and confirm SSL. Redirects from the old site's URLs are in `vercel.json`.
6. In Settings: set the notification email, each restaurant's reservation setup, the gift card URL, the consent text and the privacy policy.
7. Submit `https://www.siennamercato.com/sitemap.xml` in Google Search Console.
8. Test: a catering request, a private event inquiry, a contact message and a signup. Each should show up in the dashboard, and the first three should send an email.

## Backups

`.github/workflows/backup.yml` exports all production data and uploaded files every night at 07:30 UTC. It keeps each export as a GitHub Actions artifact for 30 days. It needs a `CONVEX_DEPLOY_KEY` repository secret, and it can also be run by hand from the Actions tab.

To restore, download an artifact and run:

```sh
bun x convex import --prod --replace backup-YYYY-MM-DD.zip
```

Convex Pro also offers scheduled backups in the Convex dashboard, which costs extra.

## Spam and abuse

All public forms use a hidden honeypot field, a minimum fill time, server-side validation, and rate limits per email and site-wide (`convex/lib.ts`). Duplicate submits are ignored using a per-form submission id.

## Known limits

- The site is a single-page app. Page titles, descriptions and structured data are set in the browser, which Google renders. Other crawlers see the defaults in `index.html`.
- Visitor counts are unique per day. A multi-day range adds up daily visitors, so one person visiting on two days counts twice.
