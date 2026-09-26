import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const routes = [
  { slug: "ledgerguard", name: "LedgerGuard" },
  { slug: "visseqbench", name: "VisSeqBench" },
  { slug: "contractiq", name: "ContractIQ" },
  { slug: "events-around", name: "Events Around" },
];

test("homepage navigation and all case-study routes work without client errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Built for thereal world.");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  for (const route of routes) {
    await page.getByRole("link", { name: `Read ${route.name} case study` }).click();
    await expect(page).toHaveURL(`/work/${route.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`${route.name}.`);
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await expect(page).toHaveTitle(`${route.name} — Tarun Bagewadi`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await page.getByRole("link", { name: "Selected work", exact: true }).click();
  }
  expect(errors).toEqual([]);
});

test("homepage follows the recruiter journey and shows actual employment", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("main > section").evaluateAll(sections => sections.map(section => section.id || "hero"))).toEqual(["hero", "about", "experience", "work", "philosophy", "contact"]);
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link")).toHaveText(["About", "Experience", "Work"]);
  const experience = page.locator("#experience");
  await expect(experience.getByRole("heading", { name: "Software Engineer", exact: true })).toBeVisible();
  await expect(experience.getByRole("heading", { name: "Software Engineer Intern", exact: true })).toBeVisible();
  await expect(experience.locator("time")).toHaveText(["Jun 2022", "Jan 2024", "Jan 2022", "Jun 2022"]);
  await expect(experience.locator(".career-company")).toHaveText(["Persistent Systems", "Persistent Systems"]);
  await expect(experience.locator(".career-impact")).toContainText("50+");
  await expect(experience).not.toContainText("Independent projects");
});

test("mobile navigation works with touch, keyboard, and Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#about")).toBeInViewport();
});

for (const route of ["/", ...routes.map(item => `/work/${item.slug}`)]) {
  test(`accessible content and responsive layout: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    }
  });
}

test("contact, reduced motion, keyboard access, and missing-page behavior", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await expect(page.locator(".contact-bottom a")).toHaveAttribute("href", "mailto:tarun.bags@gmail.com");
  await expect(page.locator(".flow-dot").first()).toBeHidden();
  const response = await page.goto("/work/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the portfolio" })).toBeVisible();
});

test("capture desktop and mobile preview artifacts", async ({ page }) => {
  test.skip(!process.env.PREVIEW_OUTPUT, "Set PREVIEW_OUTPUT to save review screenshots.");
  const directory = path.resolve(process.env.PREVIEW_OUTPUT!);
  await mkdir(directory, { recursive: true });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(directory, "desktop-home.png"), fullPage: true, animations: "disabled" });
  await page.screenshot({ path: path.join(directory, "desktop-hero.png"), animations: "disabled" });
  await page.goto("/work/ledgerguard");
  await page.screenshot({ path: path.join(directory, "ledgerguard-case-study.png"), fullPage: true, animations: "disabled" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: path.join(directory, "mobile-home.png"), fullPage: true, animations: "disabled" });
});
