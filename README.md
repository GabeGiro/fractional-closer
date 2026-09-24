# fractional-closer

One-page landing site for the **Fractional Closer** offer (Google Ads test). Plain static HTML: no build step, no framework.

- `index.html` - the page. Prices, copy and the Calendly link live here.
- `privacy.html` - required once Google Ads conversion tracking is on.

## Hosting

GitHub Pages via GitHub Actions: every push to `main` runs `.github/workflows/deploy.yml`, which runs sanity checks and then publishes. A failed check blocks the deploy. The custom domain is `fractionalcloser.eu` (Pages settings + `CNAME`); DNS records live at Namecheap:
- `A @` → 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153
- `CNAME www` → gabegiro.github.io

## Ads tracking
 In Google Ads, create a conversion ("Book call click"), paste the gtag snippet where the `GOOGLE ADS TAG` comment is, and set `ADS_SEND_TO` at the bottom of `index.html`.

