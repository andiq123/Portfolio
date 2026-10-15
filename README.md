# Andrei Ungureanu — Portfolio

Personal software engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:ui
npm audit --omit=dev
```

`test:ui` requires a production build and starts its own server on port 3100. Set `TEST_BASE_URL` to test an already running server. It checks intro phase order, permanent focus/blur settling, slow mobile workspace reveals, stable instant anchors, and keyboard/reduced-motion interruptions; smooth opening/closing and reversal of nested disclosures, grouped switching, closing focus safety, and eight native discoveries (including no-JavaScript use) and stable desktop introduction placement; navigation in both directions; mobile modal enter/exit, rapid reopening, focus/Escape/resize behavior, direct anchors, project images, 25 viewport widths from 280–2560px in both themes, 200% text reflow, short landscape menus, axe accessibility checks, palette contrast, and forced-color heading readability, reduced motion, content without JavaScript, layout shifts, and browser errors. Screenshots and frame measurements go into the ignored `work/` directory.

The test measures a ten-second scroll in Chromium at **6× CPU slowdown**. This simulates a slower CPU; it does not reproduce a physical device's GPU, memory limits, or thermal throttling. Frame timings vary with the host and are recorded for comparison rather than enforced as a fixed FPS threshold.

## UI and motion

Content sections render on the server. Only navigation and the shared reveal observer need client-side logic. Decorative grids, circuit traces, and a bounded glow belong to the developer workspace and move with it as the layout stacks. Reading surfaces use solid backgrounds. Editor details use static CSS/SVG. Navigation uses container queries so it adapts to available space and enlarged text. There are no backdrop blurs, parallax listeners, or perpetual animations. The intro starts from the page background at first paint and reveals navigation, identity, headline, supporting copy, actions, workspace, and finishing details in overlapping phases. It finishes in 1.82 seconds; focusing an entering control finishes its entrance without replaying on blur. Scroll reveals begin before content enters the viewport; rapid anchor jumps keep already visible content stable. Cards use finite transform/opacity entrance animations once, stay visible before hydration, and respect reduced-motion preferences.

Reusable surface, card, tag, button, and heading styles live in `src/app/globals.css`. Tailwind colors use RGB channels so opacity utilities work in both themes. Project image sizes follow the grid and cap at its maximum width to avoid oversized downloads on wide screens. Project content lives in `src/data/datastore.ts`; the resume is served from `public/resume.pdf`.

Compatible dependency updates cleared production audit findings during this change. The full `npm audit` still reports development-tool advisories in the Tailwind 3/ESLint dependency tree; the suggested forced fix includes a major Tailwind migration.

The workspace contains eight native disclosure-based Easter eggs, including a tiny coffee cup, a rocket, multilingual greetings, and useful project/contact links. They work with keyboard, touch, and JavaScript disabled, and add no client bundle. A shared `Disclosure` component uses CSS grid and native `::details-content` transitions for reversible, variable-height expansion and collapse. Unsupported browsers keep the native disclosure. The mobile menu uses a short compositor exit through the Web Animations API before native closing, keeping focus contained until the exit finishes. Resize and reduced motion close immediately. Reduced motion disables all transitions, including the dialog backdrop.
