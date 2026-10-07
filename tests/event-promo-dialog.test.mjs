import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const source = await readFile(new URL("../app/event-promo-dialog.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleExports = {};
runInNewContext(compiled, { exports: moduleExports, require: createRequire(import.meta.url), URL });
const EventPromoDialog = moduleExports.default;

const event = {
  title: "Welcome Day 2", description: "Một ngày Faerie.", date: "04.09", year: "2026",
  location: "FPTU HCMC", tag: "Welcome Day", images: ["/event.webp"],
};

function render(settings) {
  return renderToStaticMarkup(createElement(EventPromoDialog, {
    event, settings, onRead() {}, onDismiss() {},
  }));
}

test("the close button initially waits three seconds", () => {
  const html = render(null);
  assert.match(html, /class="event-promo-close"[^>]*disabled=""/);
  assert.match(html, /Đóng sau 3s/);
  assert.match(html, /Xem sự kiện/);
});

test("admin intro and Facebook event link replace the built-in event content", () => {
  const html = render({ enabled: true, title: "Ngày hội Faerie", description: "Hẹn gặp bạn tại sự kiện!", image: "https://example.org/poster.webp", facebookUrl: "https://www.facebook.com/events/123" });
  assert.match(html, /Ngày hội Faerie/);
  assert.match(html, /Hẹn gặp bạn tại sự kiện!/);
  assert.match(html, /https:\/\/example\.org\/poster\.webp/);
  assert.match(html, /href="https:\/\/www\.facebook\.com\/events\/123"/);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
});

test("unsafe Facebook links never become clickable", () => {
  const html = render({ enabled: true, title: "Faerie", description: "Giới thiệu", image: "", facebookUrl: "https://facebook.com.evil.example/events/123" });
  assert.doesNotMatch(html, /facebook\.com\.evil\.example/);
  assert.doesNotMatch(html, /<a\b/);
});
