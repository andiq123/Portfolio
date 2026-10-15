import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const server = process.env.TEST_BASE_URL ? null : spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--port', '3100'], { stdio: 'inherit' });
function rgb(value) {
  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const full = hex.length === 3 ? [...hex].map(digit => digit + digit).join('') : hex;
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16));
  }
  return value.trim().split(/\s+/).map(Number);
}
function contrast(foreground, background) {
  const luminance = color => color.map(channel => channel / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

let browser;

try {
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(baseURL);
      assert.equal(response.status, 200);
      break;
    } catch (error) {
      if (attempt === 50) throw error;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  await mkdir('work', { recursive: true });
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, colorScheme: 'dark' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
  await page.addInitScript(() => {
    window.uiMetrics = { longTasks: [], shifts: [], shiftDetails: [], lcp: 0, introFrames: [], introEvents: [], introComplete: false };
    document.addEventListener('animationstart', event => {
      if (event.animationName !== 'intro-enter') return;
      const animation = event.target.getAnimations().find(animation => animation.animationName === 'intro-enter');
      window.uiMetrics.introEvents.push({ stage: event.target.dataset.intro, time: performance.now(), fromOpacity: animation?.effect.getKeyframes()[0].opacity });
    });
    let start;
    let previous;
    function sampleIntro(time) {
      start ??= time;
      if (previous !== undefined) window.uiMetrics.introFrames.push(time - previous);
      previous = time;
      if (time - start < 2000) requestAnimationFrame(sampleIntro);
      else window.uiMetrics.introComplete = true;
    }
    requestAnimationFrame(sampleIntro);
    new PerformanceObserver(list => list.getEntries().forEach(entry => window.uiMetrics.longTasks.push(entry.duration))).observe({ type: 'longtask', buffered: true });
    new PerformanceObserver(list => list.getEntries().filter(entry => !entry.hadRecentInput).forEach(entry => {
      window.uiMetrics.shifts.push(entry.value);
      window.uiMetrics.shiftDetails.push({ time: entry.startTime, value: entry.value, sources: entry.sources.map(source => ({ node: source.node?.outerHTML.slice(0, 240), before: source.previousRect.toJSON(), after: source.currentRect.toJSON() })) });
    })).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => list.getEntries().forEach(entry => { window.uiMetrics.lcp = entry.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').count(), 1);
  await page.waitForFunction(() => window.uiMetrics.introComplete && document.getAnimations().length === 0);
  const introEvents = await page.evaluate(() => window.uiMetrics.introEvents);
  assert.equal(introEvents.length, await page.locator('[data-intro]').count(), 'Each intro element enters once');
  const phaseOrder = ['navigation', 'identity', 'headline', 'accent', 'copy', 'meta', 'actions', 'workspace', 'terminal', 'finish'];
  const phaseTimes = phaseOrder.map(stage => {
    const event = introEvents.find(event => event.stage === stage);
    assert.ok(event, `Missing intro phase: ${stage}`);
    return event.time;
  });
  assert.ok(introEvents.every(event => Number(event.fromOpacity) === 0), 'Every intro phase must emerge from the background');
  assert.ok(phaseTimes.every((time, index) => index === 0 || time >= phaseTimes[index - 1]), 'Intro phases must stay coordinated');
  assert.ok(await page.locator('[data-intro]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1' && getComputedStyle(element).transform === 'none')), 'Intro must settle without retained transforms');
  await page.getByRole('link', { name: 'View my work' }).focus();
  await page.getByRole('link', { name: 'Andrei Ungureanu — home', exact: true }).focus();
  assert.ok(await page.locator('[data-intro="actions"]').evaluate(element => getComputedStyle(element).opacity === '1' && element.getAnimations().length === 0), 'Settled content must not dim after focus and blur');
  const projectCount = await page.locator('#projects article').count();
  assert.ok(projectCount > 0);
  assert.ok(await page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));
  await page.screenshot({ path: 'work/desktop-dark.png' });

  // A continuous ten-second scroll measures frame pacing while reveals and images enter.
  const frames = await page.evaluate(() => new Promise(resolve => {
    const durations = [];
    let previous = performance.now();
    const start = previous;
    const distance = document.documentElement.scrollHeight - innerHeight;
    function frame(now) {
      durations.push(now - previous);
      previous = now;
      scrollTo({ top: distance * Math.min((now - start) / 10000, 1), behavior: 'instant' });
      if (now - start < 10000) requestAnimationFrame(frame);
      else resolve(durations);
    }
    requestAnimationFrame(frame);
  }));
  await page.waitForFunction(() => document.getAnimations().length === 0);
  await page.waitForFunction(() => [...document.querySelectorAll('#projects img')].every(image => image.complete && image.naturalWidth > 0));
  assert.ok(await page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));
  assert.equal(await page.locator('body').evaluate(element => [...element.querySelectorAll('*')].filter(node => getComputedStyle(node).backdropFilter !== 'none' || getComputedStyle(node).filter.includes('blur')).length), 0);
  const metrics = await page.evaluate(() => ({ ...window.uiMetrics, jsBytes: performance.getEntriesByType('resource').filter(entry => entry.initiatorType === 'script').reduce((bytes, entry) => bytes + entry.encodedBodySize, 0) }));
  frames.sort((a, b) => a - b);
  const introFrames = metrics.introFrames.sort((a, b) => a - b);
  const report = {
    cpuSlowdown: 6,
    viewport: '1366 × 900',
    lcpMs: metrics.lcp,
    jsBytes: metrics.jsBytes,
    longTasks: metrics.longTasks,
    intro: { phases: phaseOrder, p95Ms: introFrames[Math.floor(introFrames.length * 0.95)], over34ms: introFrames.filter(value => value > 34).length },
    cls: metrics.shifts.reduce((sum, value) => sum + value, 0),
    scroll: { frames: frames.length, meanMs: frames.reduce((a, b) => a + b, 0) / frames.length, p95Ms: frames[Math.floor(frames.length * 0.95)], over34ms: frames.filter(value => value > 34).length },
  };
  if (report.cls >= 0.01) await writeFile('work/layout-shifts.json', JSON.stringify(metrics.shiftDetails, null, 2));
  assert.ok(report.cls < 0.01, `Unexpected layout shift: ${report.cls}`);

  for (const id of ['home', 'experience', 'skills', 'projects', 'contact', 'projects', 'skills', 'home']) {
    await page.locator(`#${id}`).evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await page.locator(`nav[aria-label="Primary navigation"] a[href="#${id}"][aria-current="location"]`).waitFor();
  }
  assert.equal(await page.evaluate(() => window.uiMetrics.introEvents.length), introEvents.length, 'Scrolling back must not replay the intro');
  for (const scheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme: scheme });
    for (const width of [280, 320, 360, 390, 414, 600, 640, 703, 704, 705, 719, 720, 767, 768, 820, 900, 1023, 1024, 1055, 1056, 1057, 1280, 1366, 1920, 2560]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const issues = await page.evaluate(() => {
        const elements = [...document.querySelectorAll('main h1, main h2, main h3, main p, .tag, .contact-links a, .code-line, footer p, nav[aria-label="Primary navigation"] a, nav[aria-label="Primary navigation"] button')];
        return elements.filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.width && rect.height && (rect.left < -1 || rect.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1);
        }).map(element => element.textContent.trim().slice(0, 70));
      });
      assert.deepEqual(issues, [], `Clipped or overflowing content at ${width}px in ${scheme}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px in ${scheme}`);
    }
    assert.ok(await page.locator('#projects img').evaluateAll(images => images.every(image => Number(new URL(image.currentSrc).searchParams.get('w')) <= 1080)), 'Wide screens must not fetch oversized grid screenshots');
    await page.setViewportSize({ width: 1366, height: 844 });
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    const accessibility = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
    assert.deepEqual(accessibility.violations.map(violation => ({ id: violation.id, nodes: violation.nodes.map(node => node.target) })), [], `Accessibility violations in ${scheme}`);
    // Axe cannot resolve every decorative gradient; also check actual theme tokens on each reading surface.
    const palette = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return Object.fromEntries(['foreground', 'secondary', 'primary', 'accent', 'code', 'background', 'surface', 'muted', 'primary-dark'].map(name => [name, style.getPropertyValue(`--${name}`).trim()]));
    });
    let minimumContrast = Infinity;
    for (const foreground of ['foreground', 'secondary', 'primary', 'accent', 'code']) {
      for (const background of ['background', 'surface', 'muted']) {
        const ratio = contrast(rgb(palette[foreground]), rgb(palette[background]));
        minimumContrast = Math.min(minimumContrast, ratio);
        assert.ok(ratio >= 4.5, `${foreground} on ${background} must meet normal-text contrast in ${scheme}: ${ratio}`);
      }
    }
    assert.ok(contrast([255, 255, 255], rgb(palette['primary-dark'])) >= 4.5, 'Primary buttons must keep readable white labels');
    report.accessibility ??= {};
    report.accessibility[scheme] = { violations: accessibility.violations.length, minimumPaletteContrast: minimumContrast, manualChecks: accessibility.incomplete.map(check => ({ id: check.id, nodes: check.nodes.length })) };
    await page.screenshot({ path: `work/desktop-${scheme}.png`, fullPage: true });
    await page.locator('#home').screenshot({ path: `work/desktop-hero-${scheme}.png` });
  }

  const motionPage = await browser.newPage({ viewport: { width: 390, height: 500 }, colorScheme: 'dark' });
  await motionPage.addInitScript(() => {
    window.workspaceReveals = 0;
    document.addEventListener('animationstart', event => {
      if (event.animationName === 'reveal-enter' && event.target.classList.contains('hero-workspace')) window.workspaceReveals++;
    });
  });
  await motionPage.goto(baseURL, { waitUntil: 'networkidle' });
  await motionPage.waitForFunction(() => document.getAnimations().length === 0);
  const workspace = motionPage.locator('.hero-workspace');
  assert.ok(await workspace.evaluate(element => element.getBoundingClientRect().top > innerHeight));
  await workspace.evaluate(element => scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight - 24, behavior: 'instant' }));
  await motionPage.waitForFunction(() => window.workspaceReveals === 1);
  assert.ok(await workspace.evaluate(element => element.getAnimations({ subtree: true }).every(animation => animation.animationName !== 'intro-enter')), 'Workspace reveal must not overlap intro timelines');
  await motionPage.waitForFunction(() => document.getAnimations().length === 0);
  await motionPage.locator('#contact').evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await motionPage.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.ok(await motionPage.locator('.contact-panel').evaluate(element => !element.classList.contains('reveal-enter') && getComputedStyle(element).opacity === '1'), 'Instant anchor jumps must leave visible content stable');
  await motionPage.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await workspace.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
  assert.equal(await motionPage.evaluate(() => window.workspaceReveals), 1, 'Workspace entrance must happen once');
  await motionPage.close();

  const secrets = page.locator('.terminal-secrets');
  const settled = () => page.waitForFunction(() => document.getAnimations().every(animation => ['finished', 'idle'].includes(animation.playState)));
  // Sample the actual geometry throughout both directions, rather than just checking [open].
  const sampleToggle = (disclosure, reverse = false) => disclosure.evaluate(async (element, reverse) => {
    const samples = [];
    const summary = element.querySelector(':scope > summary');
    const before = element.getBoundingClientRect().height;
    summary.click();
    const start = performance.now();
    let reversed = false;
    await new Promise(resolve => {
      function frame(now) {
        samples.push({ time: now - start, height: element.getBoundingClientRect().height });
        if (reverse && !reversed && now - start >= 80) { summary.click(); reversed = true; }
        if (now - start < 420) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    return { before, after: element.getBoundingClientRect().height, open: element.open, samples };
  }, reverse);
  const assertInterpolates = (result, label) => {
    const min = Math.min(result.before, result.after), max = Math.max(result.before, result.after);
    assert.ok(max - min > 10 && result.samples.some(sample => sample.height > min + 1 && sample.height < max - 1), `${label} must animate height, not snap`);
  };
  const opening = await sampleToggle(secrets);
  assertInterpolates(opening, 'Workspace opening');
  const closing = await sampleToggle(secrets);
  assertInterpolates(closing, 'Workspace closing');
  const reversed = await sampleToggle(secrets, true);
  assert.equal(reversed.open, false, 'Rapid toggles must respect the latest intent');
  assert.ok(Math.abs(reversed.after - reversed.before) < 1, 'Reversed disclosures must fully collapse');
  assert.ok(reversed.samples.some(sample => sample.height > reversed.before + 10), 'Reversal must interrupt an in-progress expansion');
  const collapseFrames = [...opening.samples, ...closing.samples].flatMap((sample, index, samples) => index && sample.time > samples[index - 1].time ? [sample.time - samples[index - 1].time] : []).sort((a, b) => a - b);
  report.disclosureMotion = { p95Ms: collapseFrames[Math.floor(collapseFrames.length * .95)], over34ms: collapseFrames.filter(value => value > 34).length };
  const copyTop = await page.locator('.hero-copy').evaluate(element => element.getBoundingClientRect().top + scrollY);
  await secrets.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  assert.ok(await secrets.evaluate(element => element.open), 'Workspace discoveries must open with the keyboard');
  await settled();
  assert.equal(await secrets.locator('.secret-command').count(), 8);
  for (const command of await secrets.locator('.secret-command').all()) {
    assertInterpolates(await sampleToggle(command), 'Command opening');
    assert.ok(await command.evaluate(element => element.open));
    assert.equal(await secrets.locator('.secret-command[open]').count(), 1, 'Only one command should expand at a time');
    assert.ok(await command.locator('.secret-output').isVisible());
    assert.ok(await secrets.locator('.secret-command:not([open])').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().height <= element.querySelector('summary').getBoundingClientRect().height + 1)), 'Grouped commands must close without leaving empty space');
  }
  assert.ok(Math.abs(await page.locator('.hero-copy').evaluate(element => element.getBoundingClientRect().top + scrollY) - copyTop) < 1, 'Expanding the workspace must not move the desktop introduction');
  report.discoveries = 8;
  const linkedCommand = secrets.locator('.secret-command').filter({ hasText: 'ls projects/' });
  await sampleToggle(linkedCommand);
  // During a closing fade, its links must immediately stop accepting focus.
  assert.ok(await linkedCommand.evaluate(element => {
    element.querySelector('summary').click();
    const link = element.querySelector('a');
    link.focus();
    return document.activeElement !== link;
  }), 'Closing content must not remain keyboard-interactive');
  await settled();
  await sampleToggle(linkedCommand);
  assertInterpolates(await sampleToggle(linkedCommand), 'Command closing');
  // Closing the parent during a child expansion must not strand heights or transitions.
  await linkedCommand.evaluate(element => element.querySelector('summary').click());
  await sampleToggle(secrets);
  assert.equal(await secrets.evaluate(element => element.open), false);
  assert.equal(await linkedCommand.locator('.secret-output').isVisible(), false, 'An open child must remain hidden inside a closed parent');
  await sampleToggle(secrets);
  await settled();
  assert.ok(await linkedCommand.locator('.secret-output').isVisible(), 'Nested content must survive closing and reopening its parent');
  await page.setViewportSize({ width: 280, height: 720 });
  assert.ok(await secrets.locator('.secret-output, summary').evaluateAll(elements => elements.every(element => !element.getBoundingClientRect().width || element.scrollWidth <= element.clientWidth + 1)), 'Discoveries must wrap on narrow screens');
  await secrets.locator(':scope > summary').click();
  // Native details may retain finished arrow transitions while their contents are closed.
  await page.waitForFunction(() => document.getAnimations().every(animation => ['finished', 'idle'].includes(animation.playState)));

  for (const width of [703, 704, 705, 719, 720]) {
    await page.setViewportSize({ width, height: 500 });
    const trigger = page.getByRole('button', { name: 'Open menu' });
    if (!await trigger.isVisible()) continue;
    await trigger.click();
    await page.getByRole('dialog').waitFor();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.ok(await page.getByRole('dialog').evaluate(element => element.matches(':modal')), `Scroll locking must not close the menu at ${width}px`);
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
  }

  await page.setViewportSize({ width: 768, height: 500 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
  assert.ok(await page.getByRole('button', { name: 'Open menu' }).isVisible(), 'Enlarged text must collapse navigation before it overlaps');
  const enlargedIssues = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p, .tag, .contact-links a, nav[aria-label="Primary navigation"] a, nav[aria-label="Primary navigation"] button')].filter(element => {
    const rect = element.getBoundingClientRect();
    return rect.width && (rect.left < -1 || rect.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1);
  }).map(element => element.textContent.trim().slice(0, 70)));
  assert.deepEqual(enlargedIssues, [], 'Content must reflow with 200% text');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  await page.setViewportSize({ width: 640, height: 320 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'Contact', exact: false }).scrollIntoViewIfNeeded();
  assert.ok(await page.getByRole('dialog').getByRole('link', { name: 'Contact', exact: false }).isVisible(), 'Short screens must keep every menu item reachable');
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });

  await page.emulateMedia({ forcedColors: 'active' });
  assert.ok(await page.locator('.text-gradient').evaluateAll(elements => elements.every(element => {
    const style = getComputedStyle(element);
    return style.webkitTextFillColor === style.color;
  })), 'High-contrast mode must keep gradient headings readable');
  await page.emulateMedia({ forcedColors: 'none' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'work/mobile-dark.png', fullPage: true });
  await page.locator('#home').screenshot({ path: 'work/mobile-hero.png' });
  const openMenu = page.getByRole('button', { name: 'Open menu' });
  const dialog = page.getByRole('dialog');
  await openMenu.click();
  await dialog.waitFor();
  await page.waitForFunction(() => document.body.style.overflow === 'hidden');
  for (let tab = 0; tab < 9; tab++) {
    await page.keyboard.press('Tab');
    assert.ok(await dialog.evaluate(element => element.matches(':modal') && (element.contains(document.activeElement) || document.activeElement === document.body)), 'Modal must prevent focus from reaching background content');
  }
  await page.screenshot({ path: 'work/mobile-menu.png' });
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  assert.ok(await openMenu.evaluate(element => element === document.activeElement), 'Escape restores focus');
  await page.waitForFunction(() => document.body.style.overflow === '');
  await openMenu.click();
  await settled();
  const menuExit = await dialog.evaluate(async element => {
    element.querySelector('[aria-label="Close menu"]').click();
    const frames = [];
    const start = performance.now();
    await new Promise(resolve => {
      function frame(now) {
        const style = getComputedStyle(element);
        frames.push({ opacity: Number(style.opacity), display: style.display });
        if (now - start < 350) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    return frames;
  });
  assert.ok(menuExit.some(frame => frame.opacity > 0 && frame.opacity < 1 && frame.display !== 'none'), 'Menu must visibly animate out before native close');
  assert.equal(menuExit.at(-1).display, 'none', 'Menu must leave the top layer after closing');
  await page.waitForFunction(() => document.body.style.overflow === '');
  await openMenu.click();
  // An interrupted exit must reopen without waiting for stale timers or a blocking backdrop.
  await page.keyboard.press('Escape');
  await openMenu.click();
  assert.ok(await dialog.evaluate(element => element.matches(':modal')));
  await page.evaluate(() => {
    document.querySelector('#mobile-menu [aria-label="Close menu"]').click();
    document.querySelector('#mobile-menu').close();
    document.querySelector('[aria-controls="mobile-menu"]').click();
  });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.ok(await openMenu.evaluate(element => element.getAttribute('aria-expanded') === 'true'), 'A queued close event must not clear the state of a reopened menu');
  await page.waitForFunction(() => document.body.style.overflow === 'hidden');
  await dialog.getByRole('link', { name: 'Contact', exact: false }).click();
  await dialog.waitFor({ state: 'hidden' });
  await page.waitForFunction(() => location.hash === '#contact' && document.body.style.overflow === '');
  await openMenu.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await dialog.waitFor({ state: 'hidden' });
  await page.waitForFunction(() => document.body.style.overflow === '');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.locator('#projects').evaluate(element => element.scrollIntoView());
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  assert.equal(await page.evaluate(() => window.uiMetrics.introEvents.length), 0, 'Reduced motion disables the entire intro timeline');
  await page.locator('.terminal-secrets > summary').click();
  await page.locator('.secret-command > summary').filter({ hasText: 'coffee' }).click();
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0, 'Reduced motion must also disable disclosure pseudo-element transitions');
  await page.locator('.terminal-secrets > summary').click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0, 'Reduced motion must disable dialog and backdrop transitions');
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1024, height: 768 });
  assert.ok(await page.locator('[data-intro]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(`${baseURL}/#projects`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Math.abs(document.querySelector('#projects').getBoundingClientRect().top - 96) < 2);
  assert.ok(await page.locator('#projects').evaluate(element => Math.abs(element.getBoundingClientRect().top - 96) < 2), 'Direct anchors respect the fixed navbar');
  await page.locator('nav[aria-label="Primary navigation"] a[href="#projects"][aria-current="location"]').waitFor();

  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'View my work' }).focus();
  await page.waitForFunction(() => {
    const element = document.querySelector('[data-intro="actions"]');
    return getComputedStyle(element).opacity === '1' && element.getAnimations().length === 0;
  });
  await page.getByRole('link', { name: 'Andrei Ungureanu — home', exact: true }).focus();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.ok(await page.locator('[data-intro="actions"]').evaluate(element => getComputedStyle(element).opacity === '1' && element.getAnimations().length === 0), 'Leaving focus must not replay settled entrances');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0, 'A motion preference change cancels active entrances');
  assert.ok(await page.locator('[data-intro]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));

  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJS.goto(baseURL);
  await new Promise(resolve => setTimeout(resolve, 2000));
  assert.equal(await noJS.locator('#projects article').count(), projectCount);
  await noJS.locator('.terminal-secrets > summary').click();
  // CSS transitions continue without page scripts; wait from Node for the parent to settle.
  await new Promise(resolve => setTimeout(resolve, 350));
  await noJS.locator('.secret-command > summary').filter({ hasText: 'coffee' }).click();
  await new Promise(resolve => setTimeout(resolve, 350));
  assert.ok(await noJS.getByRole('img', { name: 'A small cup of coffee' }).isVisible(), 'Easter eggs must work without JavaScript');
  await noJS.locator('.terminal-secrets > summary').click();
  await new Promise(resolve => setTimeout(resolve, 350));
  assert.equal(await noJS.getByRole('img', { name: 'A small cup of coffee' }).isVisible(), false, 'Nested content must stay hidden when its parent closes without scripts');
  // Page timers are disabled with JavaScript; poll from Node while CSS motion settles.
  for (let attempt = 0; attempt < 20; attempt++) {
    if (await noJS.evaluate(() => document.getAnimations().length === 0)) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.equal(await noJS.evaluate(() => document.getAnimations().length), 0);
  assert.ok(await noJS.locator('[data-intro]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));
  assert.ok(await noJS.locator('[data-reveal]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1')));
  assert.ok((await noJS.locator('h1').innerText()).includes('Engineer'));
  assert.equal((await page.request.get(`${baseURL}/resume.pdf`)).status(), 200);
  assert.deepEqual(errors, []);
  await writeFile('work/ui-results.json', JSON.stringify(report, null, 2));
  console.log('Passed: intro/reveal order, focus stability, reversible nested disclosures, native Easter eggs, navigation, modal focus/Escape/resize, anchors, images, 50 dark/light layouts, enlarged text, short-screen menus, accessibility/contrast, reduced motion, no-JS content, layout stability, and browser errors.');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  server?.kill('SIGTERM');
}
