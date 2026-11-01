# Kanika & Pranay – wedding invitation

Static site (no build step). Works on GitHub Pages as-is.

```
index.html      content + markup
css/style.css   all styling and scroll animations
js/main.js      countdown, scroll reveal, parallax, progress bar
images/         gallery / hero photos (referenced from index.html)
couple_photos/  photos for the random "Our story" slideshow
js/slideshow.js slideshow logic; js/couple-photos.js is the generated photo list
tools/make_manifest.py   rebuilds js/couple-photos.js from couple_photos/
```

## Run locally
    python -m http.server 8000      # then open http://localhost:8000

## Deploy (GitHub Pages)
Push the folder contents to a repo, then Settings > Pages > Deploy from branch `main` / root.

## Slideshow
After adding/removing files in `couple_photos/`, run `python tools/make_manifest.py` and commit `js/couple-photos.js`.

## Common edits
- Wedding date/time for the countdown: `data-date` on `#count` in index.html
- Events, venue, RSVP links: index.html
- Colours and fonts: CSS variables at the top of css/style.css
- Photos: WhatsApp images are large; resize to ~1600px wide (JPEG, <300 KB) for fast loading
