# victerhugobasurco.com

Author site for **Victer Hugo Basurco** — Next.js 15 (App Router) · TypeScript · Tailwind CSS · EmailJS.

---

## 1. Run it locally

```bash
npm install
cp .env.local.example .env.local   # then fill in the EmailJS keys (step 2)
npm run dev                        # http://localhost:3000
```

## 2. EmailJS (both forms)

1. Create a free account at https://dashboard.emailjs.com
2. **Email Services** → add the author's inbox (Gmail works) → copy the **Service ID**.
3. **Email Templates** → create two templates and copy each **Template ID**.

   **Template A — Contact** (reader mail). Set *Reply-To* to `{{reply_to}}`.
   ```
   Subject: New message from {{from_name}} — {{subject}}

   From:    {{from_name}} <{{reply_to}}>
   About:   {{subject}}
   Sent:    {{submitted_at}}

   {{message}}
   ```

   **Template B — Announcement signup.**
   ```
   Subject: New announcement signup — {{from_name}}

   Name:  {{from_name}}
   Email: {{subscriber_email}}
   List:  {{list}}
   Sent:  {{submitted_at}}
   ```
4. **Account → General** → copy the **Public Key**.
5. **Account → Security** → add `victerhugobasurco.com`, `www.victerhugobasurco.com` and
   `localhost` to the allowed origins. This is what stops other sites using the key.
6. Paste all four values into `.env.local`.

Until the keys are set, both forms fail gracefully with a visible message instead of pretending to send.

## 3. Deploy

**Recommended — Vercel (free), domain stays at Hostinger.**

1. Push this folder to GitHub.
2. vercel.com → New Project → import the repo → add the four `NEXT_PUBLIC_*` env vars → Deploy.
3. Vercel → Project → Settings → Domains → add `victerhugobasurco.com` and `www.…`.
4. Hostinger → Domains → DNS Zone:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`
   (Vercel shows the exact values to use — copy them from that screen, not from here.)
   DNS takes 15 minutes to a few hours.

**Alternative — static files on Hostinger hosting.**

```bash
npm run export      # writes ./out
```
Upload everything inside `out/` into `public_html` via hPanel → File Manager. Nothing on this
site needs a server, so this works fully — you just lose Next.js image optimisation.

## 4. Where to edit content

Everything the client can change lives in `src/data/`:

| File | Holds |
|---|---|
| `site.ts` | name, tagline, social links, nav items |
| `books.ts` | all three books — jacket copy, status, covers, buy links |
| `news.ts` | news items and appearance dates |
| `author.ts` | biography and fact list |
| `faq.ts` | FAQ questions and answers |

Search the codebase for `TODO(client)` to see every item still waiting on the author.

## 5. Structure

```
src/
├── app/                 route = folder (App Router)
│   ├── layout.tsx       fonts, metadata, nav + footer shell
│   ├── page.tsx         home
│   ├── works/           index + /works/[slug] book pages
│   ├── upcoming/  news/  the-author/  faq/  contact/
│   └── not-found.tsx
├── components/
│   ├── layout/          Navbar, Footer, Logo, EmberTree
│   ├── home/            one file per homepage section
│   ├── ui/              Reveal, BookCover, BookCard, NewsCard, …
│   └── forms/           ContactForm, AnnouncementForm (EmailJS)
├── data/                all editable content
└── lib/emailjs.ts       send wrapper: validation, throttle, error copy
```
