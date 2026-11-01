# Kanika & Pranay – wedding invitation

Static site (no build step). Works on GitHub Pages as-is.

```
index.html      content + markup
css/style.css   all styling and scroll animations
js/main.js      countdown, scroll reveal, parallax, progress bar
images/         your photos (referenced from index.html)
```

## Run locally
    python -m http.server 8000      # then open http://localhost:8000

## Deploy (GitHub Pages)
Push the folder contents to a repo, then Settings > Pages > Deploy from branch `main` / root.

## Common edits
- Wedding date/time for the countdown: `data-date` on `#count` in index.html
- Events, venue, RSVP links: index.html
- Colours and fonts: CSS variables at the top of css/style.css
- Photos: WhatsApp images are large; resize to ~1600px wide (JPEG, <300 KB) for fast loading