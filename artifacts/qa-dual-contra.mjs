import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const results = [];

async function shot(page, name) {
  await page.screenshot({ path: `/workspace/screenshots/${name}`, fullPage: false });
}

function report(name, ok, extra = "") {
  results.push({ name, ok, extra });
  console.log(`${ok ? "OK" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://127.0.0.1:8080/play?chair=iran&card=veil-1979", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const text = await page.innerText("body");
  report("veil still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(text), text.slice(0, 180).replace(/\s+/g, " "));
  report("you are the letterhead", /YOU ARE THE LETTERHEAD/i.test(text));
  report("imam kicker", /THE IMAM/i.test(text));
  report("he has the guns", /HE HAS THE GUNS/i.test(text));
  report("not you are khomeini", !/YOU ARE KHOMEINI/i.test(text));
  report("two portraits", (await page.locator(".player-plate").count()) === 2, `count=${await page.locator(".player-plate").count()}`);
  report("imam plate present", (await page.locator(".player-plate-imam").count()) === 1);
  const boxes = await page.locator(".player-plate").all();
  if (boxes.length === 2) {
    const a = await boxes[0].boundingBox();
    const b = await boxes[1].boundingBox();
    const sit = await page.locator(".situation-panel").boundingBox();
    report("figurehead left of imam", Boolean(a && b && a.x < b.x), `fig=${a?.x} imam=${b?.x}`);
    report("briefing between plates", Boolean(a && b && sit && sit.x > a.x && sit.x + sit.width < b.x + 8), `fig=${a?.x} sit=${sit?.x} imam=${b?.x}`);
  }
  await shot(page, "dual-veil-desktop.png");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:8080/play?chair=iran&card=veil-1979", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  report("mobile two plates", (await page.locator(".player-plate").count()) === 2);
  report("mobile still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(await page.innerText("body")));
  await shot(page, "dual-veil-mobile.png");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://127.0.0.1:8080/play?chair=us&card=lebanon-1983", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  report("lebanon reagan", /YOU ARE REAGAN/i.test(await page.innerText("body")));
  await page.getByRole("button", { name: /bring them home/i }).click();
  await page.waitForTimeout(400);
  let text = await page.innerText("body");
  report("bring-home still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(text), text.match(/RAIL HOLD|END OF THIS CHAIR|A CHANNEL|THE CUP|YOU ARE REAGAN/i)?.[0]);
  report("channel card", /A CHANNEL IN THE DARK/i.test(text));
  report("still reagan", /YOU ARE REAGAN/i.test(text));
  await shot(page, "contra-after-beirut.png");
  await page.getByRole("button", { name: /sell them the missiles/i }).click();
  await page.waitForTimeout(400);
  text = await page.innerText("body");
  report("sell still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(text));
  report("cup card", /THE CUP/i.test(text));
  await shot(page, "cup-after-contra.png");
  await page.getByRole("button", { name: /call it a mistake/i }).click();
  await page.waitForTimeout(400);
  text = await page.innerText("body");
  report("cup is rail hold", /RAIL HOLD/i.test(text) && !/END OF THIS CHAIR/i.test(text));
  report("cup copy names 290 or ceasefire", /290|CEASEFIRE|CUP/i.test(text));
  await shot(page, "cup-rail-hold.png");
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://127.0.0.1:8080/play?chair=iran&card=lebanon-1983", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  let text = await page.innerText("body");
  report("iran lebanon dual", (await page.locator(".player-plate").count()) === 2);
  report("iran lebanon letterhead", /YOU ARE THE LETTERHEAD/i.test(text));
  report("iran lebanon imam", /HE HAS THE GUNS/i.test(text));
  await page.getByRole("button", { name: /send the guards to the bekaa/i }).click();
  await page.waitForTimeout(400);
  text = await page.innerText("body");
  report("bekah still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(text));
  report("bekah to channel", /A CHANNEL IN THE DARK/i.test(text));
  await page.getByRole("button", { name: /take the american parts/i }).click();
  await page.waitForTimeout(400);
  text = await page.innerText("body");
  report("parts still playing", !/RAIL HOLD|END OF THIS CHAIR/i.test(text));
  report("parts to cup", /THE CUP/i.test(text));
  await shot(page, "iran-cup-dual.png");
  await page.getByRole("button", { name: /stamp the cup/i }).click();
  await page.waitForTimeout(400);
  text = await page.innerText("body");
  report("stamp is rail hold", /RAIL HOLD/i.test(text) && !/END OF THIS CHAIR/i.test(text));
  report("stamp copy drinks", /DRINKS THE CUP|EIGHT YEARS/i.test(text));
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://127.0.0.1:8080/play?chair=iran&card=deposed-1953", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  report("shah single plate", (await page.locator(".player-plate").count()) === 1);
  report("shah no imam", (await page.locator(".player-plate-imam").count()) === 0);
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
