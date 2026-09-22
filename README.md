# p5 sketches

Nine original p5.js sketches — Glow Trail, Hue Field, Tether, Kite Drift,
Bloom Rings, Orbit, Gravity Bounce, Spin Prism, and Converge — written from
scratch and shown alongside their own source. Each sketch runs live on page
load; the code panel underneath is the exact same function that's executing,
extracted at render time, not a hand-copied duplicate.

Dark mode by default, with a light/dark toggle in the header (choice is
remembered via `localStorage`). Every card also links out to that sketch's
editable copy on the [p5.js Web Editor](https://editor.p5js.org/SKoley89/sketches).

Live demo: (add your hosted URL here once deployed)

## Files

```
index.html   — markup + meta
style.css    — all styling (theme tokens for dark/light live at the top)
script.js    — the nine sketches (p5.js instance mode) + render/theme logic
```

No build step. `script.js` and `style.css` are plain, unbundled files
referenced directly from `index.html`.

## Run locally

Any static file server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Opening `index.html` directly via `file://` also works, since everything is
plain HTML/CSS/JS with one external dependency (p5.js, loaded from cdnjs).


## Credits

Design, code, and all nine sketches by [Shouvick Koley](https://shouvick.design).
Built with [p5.js](https://p5js.org/).
all sketches and code here are original.
