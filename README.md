# fractional-closer

One-page landing site for the **Fractional Closer** offer (Google Ads test). Plain static HTML: no build step, no framework.

- `index.html` - the page. Prices, copy and the Calendly link live here.
- `privacy.html` - required once Google Ads conversion tracking is on.

## Go live (once)
1. Buy `fractionalcloser.eu` (it was available on 2026-09-24).
2. Host the two files anywhere static. The simplest option is Netlify Drop or Cloudflare Pages: drag the folder in, attach the domain, and HTTPS is automatic.
3. In Google Ads, create a conversion ("Book call click"), paste the gtag snippet where the `GOOGLE ADS TAG` comment is, and set `ADS_SEND_TO` at the bottom of `index.html`.

Ads plan and sales kit (vault): `projects/reinvention/closer/`.
