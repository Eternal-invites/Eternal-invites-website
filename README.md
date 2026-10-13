# Eternal Invites — Business Website

A complete, elegant, luxury static website for **Eternal Invites** — a creative
invitation design studio offering **physical invitation cards** and **digital
invitations** for weddings, birthdays, graduations, baptisms, engagements,
anniversaries, baby showers and other special occasions.

**Tagline:** *Your Story, Beautifully Invited.*

---

## 1. Technologies Used

- HTML5, CSS3, Vanilla JavaScript (no build step, no framework)
- Google Fonts — Cormorant Garamond (headings), Lato (body), Great Vibes (script accents)
- [Lucide](https://lucide.dev) icons (pinned version `0.454.0`, loaded from CDN)
- External form service (Formspree / Web3Forms) for order & contact submissions — **must be configured, see §6**

---

## 2. Project Structure

```
eternal-invites/
├── index.html          # Home
├── services.html       # Services (physical, digital, custom)
├── gallery.html        # Filterable & searchable design gallery
├── order.html          # Order request form with live summary
├── about.html          # About Us
├── contact.html        # Contact form + FAQ
├── css/
│   ├── style.css       # Design system & components
│   ├── animations.css  # Motion (respects prefers-reduced-motion)
│   └── responsive.css  # Tablet & mobile breakpoints
├── js/
│   ├── config.js       # ★ CENTRAL CONFIGURATION — edit business info here
│   ├── data.js         # ★ DESIGN CATALOG — add new designs here
│   ├── main.js         # Navigation, animations, packages, modal, footer
│   ├── gallery.js      # Gallery filters & search
│   ├── order.js        # Order form logic & submission
│   └── contact.js      # Contact form logic & submission
├── assets/
│   └── images/
│       ├── logo/                  # Official logo (also used as favicon)
│       ├── hero/                  # Hero/about imagery
│       ├── physical-invitations/  # Real physical card photos
│       ├── digital-invitations/   # Digital invitation previews
│       └── occasions/             # Occasion category photography
└── README.md
```

---

## 3. Run the Website Locally

Because the site loads images and scripts with relative paths, open it through a
local server rather than double-clicking the HTML file:

```bash
# Option A — Python (no installation needed on most machines)
python -m http.server 8000

# Option B — Node.js
npx serve .
```

Then open **http://localhost:8000** in your browser.

---

## 4. Most Common Customizations

### Replace the logo
1. Export the new logo as `logo.png` (square works best, e.g. 500×500 px).
2. Overwrite `assets/images/logo/logo.png`.
3. Done — the header, footer and favicon update automatically.

### Change phone number / add email, location, Telegram, social URLs
Everything lives in **`js/config.js`** at the top of the file:

```js
phone: "0941187172",
email: "",                    // add e.g. "hello@eternalinvites.com"
location: "",                 // add e.g. "Addis Ababa, Ethiopia"
social: {
    tiktok:    { username: "eternal_invites", url: "https://www.tiktok.com/@eternal_invites" },
    instagram: { username: "eternal_invites", url: "https://www.instagram.com/eternal_invites" },
    telegram:  { username: "", url: "" }      // fill in to show Telegram links
}
```

> The TikTok/Instagram URLs use the platforms' standard format built from the
> verified usernames. Confirm they open the correct profiles and replace them
> with the exact profile URLs if they differ.

Leaving `email`, `location` or `telegram.url` empty hides those rows everywhere.

### Change digital package prices
Edit the `packages` array in **`js/config.js`**. The price and feature list are
used everywhere automatically: the home page, services page, gallery design
details and the order form.

⚠️ Current verified prices — change only with the business owner's confirmation:

| Package | Price | Features |
| --- | --- | --- |
| Basic | 4,500 birr | Basic information, 4 photos, location, countdown |
| Premium | 5,500 birr | Basic information, 8 photos, location, event program, countdown |
| Deluxe | 7,000 birr | Basic information, 10 photos, location, event program, countdown, RSVP, guests' wishes, background music |

### Add a new invitation design
1. Add the preview image to `assets/images/physical-invitations/` or
   `assets/images/digital-invitations/` (max ~1400 px wide, JPG).
2. Open **`js/data.js`** and copy an existing entry, then edit:
   - `id` — unique short code
   - `type` — `"physical"` or `"digital"`
   - `occasion` — `wedding | birthday | graduation | baptism | engagement | anniversary | baby-shower | other`
   - `styles` — tags used by the gallery style filter
   - `liveUrl` — for digital designs, the link to the live invitation
   - `concept` — set `true` while real artwork for this occasion is being
     prepared; it shows a clearly labeled "Concept" badge
3. The design appears automatically in the gallery, filters, search,
   featured grid and order form.

Physical designs automatically show **Request a Quote** (no invented prices).

---

## 5. Configure the Order & Contact Forms (REQUIRED)

This is a **static website** — a browser alone cannot send an email. All form
data is routed through an external form service. **Until configured, the forms
do not pretend to work** — they show a clear notice with the phone contact
(`0941187172`) and a "copy my order details" button.

### Recommended: Formspree (free tier is enough)

1. Go to <https://formspree.io> and sign up (free).
2. Click **+ New form**, name it e.g. *Eternal Invites Orders*, and set the
   notification email to your business email.
3. Copy the endpoint URL, e.g. `https://formspree.io/f/abcdwxyz`.
4. Paste it into **`js/config.js`**:

```js
orderFormEndpoint:   "https://formspree.io/f/abcdwxyz",
contactFormEndpoint: "https://formspree.io/f/efghstuv",   // separate form, same steps
```

5. Commit and redeploy. Submissions now arrive in your email.

[Web3Forms](https://web3forms.com) works the same way — paste the
`https://api.web3forms.com/submit` endpoint together with your access key
(in that case also add `data.append("access_key", "YOUR_KEY")` in `js/order.js`
and `js/contact.js`).

### Reference image uploads
The *Order Now* page includes a file input for reference images. It is enabled
as soon as an endpoint is configured.

- **Formspree free** does not accept file uploads (paid feature). The input
  will still be sent but files may be rejected by the service.
- **Web3Forms free** supports file uploads up to 25 MB per submission.

Either way, customers can always share photos with you via phone/Telegram
directly. The form never claims images were uploaded when no service is active.

> **Never commit** private API keys or credentials. The config above only
> contains a public form URL (which is safe), not a secret key. If you switch
> to Web3Forms, the access key is a public identifier intended for client-side
> use.

---

## 6. Publish Online (GitHub Pages)

### Create the repository

```bash
git init
git add -A
git commit -m "Eternal Invites website"
git branch -M main
git remote add origin https://github.com/eternal-invites/eternal-invites.github.io.git
git push -u origin main
```

Tip: naming the repo **`eternal-invites.github.io`** makes the site available at
`https://eternal-invites.github.io` directly. A project-named repo (e.g.
`website`) works too — it will be available at
`https://eternal-invites.github.io/website/` and all relative asset paths keep
working automatically.

### Enable GitHub Pages

1. Open the repository on GitHub → **Settings** → **Pages**.
2. **Source:** *Deploy from a branch* → **Branch:** `main` / folder: `/ (root)` → **Save**.
3. Wait 1–2 minutes. Your site is live at the URL shown on that page.

### After going live

- [ ] Configure form endpoints (§5) and place a real test order.
- [ ] Verify the TikTok/Instagram URLs open the correct profiles; adjust in `js/config.js` if needed.
- [ ] Replace the three sample testimonials on the home page with real client reviews.
- [ ] Replace "Concept"-badged gallery items with real artwork when ready.

---

## 7. Known Limitations

- **No backend on GitHub Pages.** Order/contact forms and any future dynamic
  features (e.g. live guest wish lists) require external services. The wish
  wall and RSVP features inside the digital invitations themselves are separate
  projects and are configured there.
- Images in `assets/images/occasions/` are stock photography used as
  placeholders — replace with your own photos whenever available.
- The testimonials shown are clearly-labelled **samples** until real reviews
  are supplied.

---

## 8. Verified Business Details

| Item | Value |
| --- | --- |
| Business | Eternal Invites |
| Phone | 0941187172 |
| TikTok | @eternal_invites |
| Instagram | @eternal_invites |
| Tagline | Your Story, Beautifully Invited. |
| Closing line | Let's Make Your Moments Last Forever. |

Live digital invitation samples featured in the gallery:

- <https://eternal-invites.github.io/Feven-and-Dn-Endriyas/>
- <https://eternal-invites.github.io/minas-and-tsion>
- <https://eternal-invites.github.io/lidiyad-grad/>
- <https://eternal-invites.github.io/baptism/>
