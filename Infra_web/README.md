# Square One Infra — 3D Parallax Website (Starter)

This project is a static, SEO-friendly, 3D parallax-style website built with vanilla HTML, CSS and JS. It contains dummy content and sample projects ready to edit.

## Files included
- `index.html` — landing page with 3D parallax hero and featured projects
- `about.html`, `services.html`, `projects.html`, `project-detail.html` — content pages
- `contact.html` — lead capture form (uses Formspree by default)
- `styles.css`, `script.js` — styling and JS

## How to preview locally
1. Save all files into a folder (e.g. `squareone-3dparallax`).
2. Open `index.html` in your browser. For live reload, open folder in VS Code and use Live Server extension or `npx http-server`.

## Replace images
- Images use Unsplash URLs by default. To use local images, create an `assets/` folder and replace `src`/`background-image` with `assets/hero.jpg`, etc.

## Contact form
- Form action points to `https://formspree.io/f/{your-id}`. Replace `{your-id}` with your Formspree form ID or point to your API endpoint.
- The form uses fetch API; if you prefer a direct post, adjust the `form` element action and remove JS interception.

## SEO & metadata
- Edit `<title>`, `<meta name="description">`, canonical URL and Open Graph tags in each file before publishing.
- JSON-LD LocalBusiness is included in `index.html` — update address, phone and url placeholders.

## Accessibility & performance notes
- All images include alt text. Ensure alt text is meaningful for final images.
- Focus outlines are visible; interactive elements are keyboard accessible.
- Parallax uses pointer and scroll transforms; mobile fallback avoids heavy background-attachment usage.

## Deploying to Netlify
1. Create a new site and connect to your repo or drag-and-drop the project folder into Netlify's UI.
2. Add a `_redirects` file if you need redirect rules. For SPA behavior, redirect `/* /index.html 200`.

## Next steps (recommended)
- Replace dummy project text with real case studies and add real images.
- Integrate real analytics (add GA4 id) and set up Search Console.
- Hook the contact form to your CRM if needed (HubSpot, Zoho, etc.).
