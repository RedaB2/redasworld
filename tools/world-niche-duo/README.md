# World Niche Duo renderer

This offline tool renders the portfolio preview from the device geometry in `model.mjs` and the app and hand images in `textures/`. It uses installed Google Chrome and FFmpeg with the libx264 encoder. Install the pinned authoring dependencies once with `npm ci` in this directory.

- `npm run bake` writes the video and both WebP stills to `public/world-niche/`.
- `npm run bake -- --preview /tmp/duo-poses` writes nine full-size poses, ordered from closed to open, and a `poses.jpg` contact sheet in that directory.
- `npm run bake -- --stills-only` refreshes just the two endpoint stills.

Each pose renders at 1296×1200 and downsamples to 864×800. The video samples 121 evenly spaced poses at 60 fps. The closed frame starts at 0 seconds and the fully open frame starts at 2 seconds. H.264 keyframes are four frames apart to support seeking in either direction.

## Device and artwork

The model uses a 164.6 × 117.8 mm open chassis, two 5.2 mm leaves and an 11.3 mm closed stack. The cover has a short corner radius at the spine and a larger radius at the free edge. A single texture bends around the inner fold and flattens into one display. The early wrist turn reveals the stacked rails before the hinge opens. The shape and motion reference Apple's [technical specifications](https://www.apple.com/iphone-duo/specs/), [Duo design guide](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo) and [product animation](https://www.apple.com/iphone-duo/).

- `cover.webp` is the native folded iPhone Duo simulator screenshot of World Niche 1.1 (build 16) in iOS 27.2. The simulator mask supplies the circular camera and asymmetric screen corners.
- `inner.webp` is the [version 1.1 landscape capture](https://github.com/RedaB2/WorldNiche/blob/d3a1d3a675aeb12313fd1957f8e790cc0ee30911/marketing/app-store/1.1/source/duo-01-discover.png), with the native inner-display mask. Both textures preserve the complete capture and its aspect ratio.
- `hand.webp` is the masked [World Niche portrait grip](https://github.com/RedaB2/WorldNiche/blob/d3a1d3a675aeb12313fd1957f8e790cc0ee30911/apps/web/landing-site/assets/hand-phone.png). Its 1264×1225 canvas is registered to a 982-pixel-wide open handset. A textured depth mesh keeps the fingertips behind the moving leaf and the thumb against the fixed rail.
