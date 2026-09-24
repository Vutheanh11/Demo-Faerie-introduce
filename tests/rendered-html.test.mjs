import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Faerie website and its current navigation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="vi">/);
  assert.match(html, /<title>Faerie — Find Your People<\/title>/);
  assert.match(html, /Members <span>34<\/span>/);
  assert.match(html, /News <span>07<\/span>/);
  assert.match(html, /<h2 class="v-story-title">FAERIE<br\/><em>STORY 2026<\/em><\/h2>/);
  assert.doesNotMatch(html, /Chọn năm sự kiện|MISSION NOT STARTED/);
  assert.match(html, /images\/events\/2026\/team-building\/TeamBuilding_1\.webp/);
  assert.match(html, /Made by Vu The Anh ↗<\/a>/);
  assert.match(html, /https:\/\/www\.facebook\.com\/vu\.bootloop/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("keeps optimized event photos available to the published site", async () => {
  await Promise.all([
    access(new URL("../public/images/events/2026/team-building/TeamBuilding_1.webp", import.meta.url)),
    access(new URL("../public/images/events/2026/offline/HopOffline_3.webp", import.meta.url)),
  ]);
});
