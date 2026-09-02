# Homepage Product Tunnel Design

## Goal

Replace the current horizontal homepage cover with one full-viewport fashion image tunnel. The experience keeps the existing black navigation unchanged, removes the oversized `YUAN SHOWROOM` lettering and decorative location controls, and centers one stable English sentence over a white Three.js scene.

## Scope

This phase covers only the initial viewport.

- Keep the existing global header, logo, navigation order, language switch, routes, and header behavior unchanged.
- Do not connect the cover to later vertical content in this phase.
- Prevent wheel and touch gestures over the cover from moving the document. They temporarily accelerate the tunnel instead.
- Remove the current giant brand lettering, live location, clock, coordinates, and `SCROLL TO EXPLORE` label from the cover.
- Display the same sentence on Chinese and English routes: `Connecting creativity, markets and the world.`

## Design direction

Reading this as a public fashion-showroom cover for brands and buyers, with a clean spatial editorial language and a monochrome installation-like presentation.

- `DESIGN_VARIANCE: 7`: recognizable central composition with irregular image depth and scale.
- `MOTION_INTENSITY: 8`: the tunnel is the single signature interaction.
- `VISUAL_DENSITY: 3`: generous white negative space around the sentence.
- Preserve the incumbent monochrome palette and sharp-corner image treatment.
- The black header is the frame and brand anchor. The white scene is the stage.
- The central sentence is set in the existing sans-serif system, black, medium weight, no decorative panel, shadow, border, gradient, or rounded container.
- Desktop text occupies no more than two lines and remains readable before textures finish loading.
- Image trajectories preserve a central quiet zone so near planes do not cross the sentence's core reading area.

## Visual composition

- Cover height: `calc(100dvh - var(--ys-header-h))`, with a minimum practical height for short laptop viewports.
- Canvas: absolute inset layer, white background, pointer-events disabled, under the HTML sentence.
- Sentence: centered HTML layer with a responsive maximum width and controlled line breaks. It does not move with the scene.
- Scene: approximately 50 planes on desktop, distributed using the golden-angle Fibonacci spiral:
  - `angle = index * Math.PI * (3 - Math.sqrt(5))`
  - `x = Math.cos(angle) * radius`
  - `y = Math.sin(angle) * radius`
  - base radius `10`, with a small deterministic variance to avoid a mechanically perfect ring
  - `z` spacing `2`, starting around `-78` and ending near the camera
- Camera: `[0, 0, 4.5]`, perspective FOV `45`.
- Fog: white, near `0`, far `78`, matching the page background.
- Planes keep each source image's original aspect ratio. Base size is deterministic within `1.0-2.0` world units.
- Images travel toward positive Z. A plane crossing the near boundary is recycled behind the current farthest plane, preserving an infinite loop without allocation churn.

## Image selection and loading

- Use 48-54 existing authorized assets selected from `public/images/showroom/brand-room`, `public/images/showroom/now/lookbook`, `public/images/showroom/brands`, and selected showroom/event photography.
- Prioritize vertical garment, model, accessory, and display imagery. Include a smaller number of horizontal showroom/event images for rhythm.
- Exclude QR codes, floor maps, logos, book pages with dense text, watermarks, and visibly unrelated decorative imagery.
- Keep a centralized image manifest separate from renderer logic so the selection can be changed without editing WebGL code.
- Load an initial group first so the scene appears quickly, then stream remaining textures in small batches.
- Disable texture mipmap generation, set the appropriate color space, cap anisotropy, and dispose failed or removed textures cleanly.
- A failed image is omitted without breaking the scene or the sentence.

## Motion model

- Loading speed uses the requested controller:
  - `speed = lerp(300, 10, easeOutExpo(min(elapsed / 1.1, 1))) + interactionBoost`
  - the renderer converts this controller value to world units with one documented scale factor so the numeric brief remains stable without planes crossing the whole scene in a single frame
- Wheel and vertical touch gestures increase `interactionBoost` toward `40`; the boost eases back to zero after input stops.
- Because this phase has no document scroll, GSAP ScrollTrigger is intentionally deferred. Adding it now would create an inactive dependency and duplicate the wheel controller. When later content is connected, ScrollTrigger can replace the gesture-only progress source without changing the renderer API.
- Plane entrances use scale, position offset, and material opacity with a `circ.out`-equivalent easing over `0.6s`, staggered by `0.1s` within bounded batches.
- The sentence enters once with a clipped vertical reveal over `0.8s`. It remains stable afterward.
- The render loop clamps large frame deltas after tab suspension to prevent jumps.

## Architecture

### Components

- `HomepageExperience`: a small client shell that renders the sentence, fallback, and tunnel canvas. It owns gesture intent but not per-frame React state.
- `ProductTunnel`: isolated client component responsible for capability detection, renderer startup, resize, visibility pause/resume, and cleanup.
- `product-tunnel-images`: centralized typed image manifest.
- `product-tunnel-engine`: shared Three.js scene construction and frame-update logic that accepts a canvas-like rendering target.
- `product-tunnel-worker`: preferred OffscreenCanvas worker. It receives resize, interaction boost, visibility, and dispose messages.

### Runtime selection

1. If WebGL and transferable `OffscreenCanvas` are available, transfer the canvas and run the engine in a module worker.
2. Otherwise dynamically import the same engine on the main thread and run it in an isolated animation loop.
3. If WebGL initialization fails, render the static HTML/CSS fallback.

No continuous value is stored in React state. Mutable animation values stay in the worker or refs.

## Responsive and performance rules

- Desktop: 48-54 planes, DPR capped at `2`.
- Landscape tablet: 36-42 planes, DPR capped at `1.5`, slightly wider quiet zone.
- Mobile: 24-30 planes, DPR capped at `1.25`, reduced texture resolution and larger text-safe center.
- Pause rendering while the document is hidden.
- Dynamically import Three.js only on the homepage client.
- Avoid shadows, post-processing, lights, raycasting, and per-frame allocations. Use unlit transparent plane materials with `depthWrite: false`.
- Use renderer output resizing only when viewport dimensions or DPR actually change.
- Dispose geometries, materials, textures, renderer, worker, listeners, and animation frames during unmount.
- Do not add GSAP in this phase. Add only `three` and its required TypeScript support if missing.

## Accessibility and fallbacks

- Canvas is decorative and hidden from assistive technology.
- The sentence remains semantic HTML and is the visible page heading.
- With `prefers-reduced-motion: reduce`, do not run the continuous tunnel. Show a static, balanced image composition behind the sentence.
- If WebGL or image loading fails, show the same static composition.
- The cover does not trap keyboard focus and contains no hidden interactive controls.
- Gesture prevention applies only to the full-screen cover in this phase and must not affect header navigation.

## Error handling

- Worker initialization has a bounded timeout. Failure falls back to the main-thread renderer once.
- Main-thread renderer failure falls back to the static composition.
- Individual texture failures are recorded in development and skipped in production.
- Context loss pauses the experience and attempts one renderer restoration; repeated failure switches to the static fallback.

## Verification

- Unit-test deterministic spiral placement, aspect-ratio sizing, recycling order, speed easing, and responsive plane-count selection.
- Verify worker capability selection and cleanup without asserting implementation-specific source strings.
- Run targeted component tests and TypeScript during development.
- Before release, run the production build and one bounded visual QA pass at desktop, iPad landscape, and mobile widths.
- Verify reduced motion, WebGL fallback, wheel/touch acceleration, no horizontal overflow, header interaction, and stable sentence readability.
- Run the Impeccable detector once on the changed UI targets after implementation, then fix only mechanical findings.

## Acceptance criteria

- The existing black header is visually and functionally unchanged.
- The cover occupies the remaining initial viewport and does not lead into vertical content.
- No giant `YUAN SHOWROOM`, clock, location, coordinates, or scroll instruction remains.
- Both locale routes display `Connecting creativity, markets and the world.`
- Fashion and showroom imagery creates a white-fogged spiral tunnel with a clear central reading zone.
- Motion starts fast, settles smoothly, loops indefinitely, and responds to wheel/touch input without document scrolling.
- Desktop, landscape tablet, and mobile remain visually composed and do not stretch image textures.
- Reduced-motion and WebGL-failure users receive a coherent static cover.
- Header navigation and language switching remain usable.
