# Dao Tuan Dat Vo — AI Research Portfolio

A single-page portfolio in a cartoon style with thick outlines and offset shadows.
No framework, no build step — just HTML, CSS and vanilla JavaScript.

**Live:** https://<username>.github.io/github-portfolio/

---

## ⚠️ Three things to set up

### 1. Contact form — so messages actually reach you

The form currently opens the visitor's email app, which fails if they don't
have one configured. To receive messages straight in your inbox:

1. Go to **https://formspree.io** and sign up (free tier is fine)
2. Create a new form, pointed at `tuandat1102004@gmail.com`
3. Copy the endpoint it gives you — it looks like `https://formspree.io/f/xabcdefg`
4. Open `script.js`, find this line near the top of section 7, and paste it in:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';  // ← replace
```

Formspree emails you every submission and stores them in a dashboard.
Until you replace it, the button falls back to `mailto:` and still works —
just less reliably.

### 2. Social links

Open `index.html` and search for `SOCIAL LINKS`. You'll find a clearly marked
block inside the "Beyond the Research" section:

```html
<!-- ==================================================================
     SOCIAL LINKS — REPLACE THE href VALUES BELOW WITH YOUR OWN
     Delete any whole <a>...</a> block for a platform you don't use.
     ================================================================== -->
```

Three links need your username:

| Placeholder | Replace with |
|---|---|
| `YOUR_FACEBOOK_USERNAME` | the part after `facebook.com/` on your profile |
| `YOUR_INSTAGRAM_USERNAME` | your IG handle, no `@` |
| `YOUR_TIKTOK_USERNAME` | your TikTok handle, no `@` (the `@` is already in the URL) |

LinkedIn and GitHub are already filled in. Each button uses the platform's real
logo as inline SVG — no icon library to load.

The same icons appear in the Contact card and footer. Those are GitHub, LinkedIn,
IEEE Xplore, email, and CV download.

### 3. Photos

Two images go in `images/`:

| File | Where | Suggested size |
|---|---|---|
| `avatar.jpg` | Hero card, portrait | 800×1000, portrait orientation |
| `about.jpg` | Beyond the Research section | 800×800, square |

Neither is required. Without `avatar.jpg` the hero shows "DAT" in large type;
without `about.jpg` the Beyond section shows a four-tile illustration of your
interests. Add a real photo whenever you have one — football, volleyball, or
just you at the lab — and it takes over automatically.

The hero photo is a large rounded rectangle rather than a small circle, so a
portrait-orientation shot fills it best. If the crop sits too high or low, adjust
`object-position` on `.avatar-img` in `style.css` (currently `center 30%`).

---

## Folder structure

```
github-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── images/
│   ├── avatar.jpg      # hero portrait — portrait orientation, 800×1000
│   └── about.jpg       # beyond section — square, 800×800
├── fonts/
└── assets/
    └── CV_DAT.pdf
```

Missing images won't break anything — the page falls back to "DAT" text and a 🔬 icon.

**Tip on the avatar:** the hero circle crops toward the top of the image
(`object-position: center 22%`) so faces sit correctly. If your crop looks off,
adjust that value in `style.css` under `.avatar-img`.

---

## Page sections

| Section | Content |
|---|---|
| Hero | Bento grid — intro, portrait, current work at ISLAB, publication highlight, philosophy |
| Research | 3 projects with embedded video demos |
| Papers | 1 journal + 4 conference papers |
| Expertise | 5 areas, ordered by focus |
| Process | 5-step research workflow |
| Experience | Research roles and project work |
| Education | Degree, separated from experience |
| Awards | Contest results and certifications |
| References | Two academic referees |
| Beyond the Research | Interests, how you work with people, social links |
| Skills | Frameworks, embedded, programming |
| FAQ | 5 questions |
| Contact | Form + direct info |

---

## Features

- Dark / light theme, follows OS preference on first load
- Fluid typography — the whole page scales with viewport via `clamp()` on root font size
- Scroll progress bar under the navbar
- Navbar hides on scroll down, returns on scroll up
- Reveal animations on scroll
- Underline swipe animation on hero headline
- No-backend contact form (opens email client)
- One-tap email copy
- Responsive from 4K down to 360px
- Respects `prefers-reduced-motion`
- Visible keyboard focus rings

---

## Run locally

```bash
git clone https://github.com/<username>/github-portfolio.git
cd github-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Deploy to GitHub Pages

```bash
git add .
git commit -m "feat: portfolio"
git push origin main
```

Then **Settings → Pages → Source: `main` / `root` → Save**. Live in about a minute.

---

## Customising

Content lives in `index.html`. Colours are CSS variables at the top of `style.css`:

```css
:root{
  font-size: clamp(14px, 0.55vw + 11.5px, 18px);  /* global scale */
  --pink:   #FF6B9D;
  --yellow: #F5B944;
  --blue:   #5B9FF5;
  --purple: #A78BFA;
  --green:  #6EE7A8;
}
```

Want everything bigger or smaller? Change the `font-size` line — the entire
layout is sized in `rem`, so it scales together.

---

## Before going public

- [ ] Paste your Formspree endpoint into `script.js`
- [ ] Replace `YOUR_FACEBOOK`, `YOUR_INSTAGRAM`, `YOUR_TIKTOK` in `index.html`
- [ ] Add `images/avatar.jpg` and `images/about.jpg` (optional)
- [ ] Verify the GitHub link: `https://github.com/Tuandat-110`
- [ ] Verify the LinkedIn link
- [ ] Update the Live URL at the top of this README

---

© 2026 Dao Tuan Dat Vo
