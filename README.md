# Selva Tours and Travels

A responsive informational website for Selva Tours and Travels, based in Coimbatore, Tamil Nadu. Built with React, Vite, React Router, and Lucide icons.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

```sh
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Production build

```sh
npm run build
npm run preview
```

The production site is emitted to `dist/`.

## Business configuration

Update `src/config/business.js` with the confirmed business phone, WhatsApp number (international format, digits only), email, street address, map link, operating hours, and whether corporate cab bookings are offered. The enquiry form prepares a WhatsApp message or email draft; it does not send data to a server. At least a verified WhatsApp number or email address is needed to activate form messaging.

Suggested destinations and supported trip durations are maintained in `src/data/destinations.js`. Tariff categories and vehicle types are maintained in `src/data/tariffs.js`. They are enquiry prompts, not confirmed package offers or published rates. Confirm destinations, vehicle capacities, availability, tariff rules, inclusions, and route details with the business before presenting them as final offers. No prices, customer reviews, or business statistics have been fabricated.

Tour duration routes, illustrative destinations, vehicle categories, and editable pricing fields are maintained in `src/data/tourPackages.js`. The eight duration pages share one page and dialog implementation. Routes are suggestions only, and all vehicle rates and availability remain unconfirmed until business-approved details are added.

## SEO and deployment

The production origin is configured as `https://selvatoursandtravels.com` in `src/config/business.js`. Page titles, descriptions, canonical links, social metadata, and JSON-LD are updated for each clean route. The production build generates route-specific HTML snapshots and clean-route rewrites, plus the sitemap and robots file, from `src/config/seo.js`. Update that route list when indexable routes change. `/reviews` stays out of the sitemap and is marked `noindex` until genuine, permission-approved reviews are available. Private booking summaries and not-found pages are also excluded from indexing.

The site uses `BrowserRouter` so each page has a clean URL. `public/_redirects` supplies the SPA rewrite for Netlify-compatible static hosting; configure the equivalent fallback on other hosts. Legacy `#/...` links are converted to their clean path on load. The SPA fallback renders an in-app 404 page but may return HTTP 200 on static hosts; configure a host-level 404 response if true 404 status codes are required.

Submit `https://selvatoursandtravels.com/sitemap.xml` in Google Search Console after verifying ownership. No Google verification token or Analytics ID is embedded; add the real values only when provided by the business owner.

## Business details required before launch

- Verified phone number and WhatsApp number
- Verified business email address
- Full business address and map URL, if the business wants these published
- Business hours, if they should be displayed
- Confirmed availability for each travel and tour service, including corporate cab bookings
- Vehicle types, seating capacities, tariff rates, and applicable pricing policies
- Approved destination offerings, itinerary details, inclusions, exclusions, and availability
- Confirmed production domain and approved brand logo

## Project structure

- `src/components/` — shared navigation, footer, enquiry form, and destination components
- `src/config/` — central business details and contact link helpers
- `src/data/` — editable destination, duration, tour route, and tariff prompt data
- `src/pages/` — separate routed page components
- `src/styles/` — global theme and page/component styles
- `public/` — static SEO and branding assets
