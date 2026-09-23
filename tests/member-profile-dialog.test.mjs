import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const source = await readFile(new URL("../app/member-profile-dialog.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleExports = {};
runInNewContext(compiled, { exports: moduleExports, require: createRequire(import.meta.url), URL });
const MemberProfileDialog = moduleExports.default;

function render(member) {
  return renderToStaticMarkup(createElement(MemberProfileDialog, {
    member: { name: "Tên thành viên", title: "Member", ...member },
    year: 2026,
    onDismiss() {},
  }));
}

test("shows the full name, role, introduction and supplied Facebook profile", () => {
  const html = render({
    name: "Tên ngắn",
    fullName: "Họ Và Tên Đầy Đủ",
    title: "Leader Ban Event",
    introduction: "Giới thiệu do thành viên cung cấp.",
    birthDate: "12/04/2006",
    interests: "Nhiếp ảnh",
    message: "Cùng nhau tiến bộ.",
    facebookUrl: "https://www.facebook.com/profile.php?id=123",
  });
  assert.match(html, /<h2 id="member-profile-name">Họ Và Tên Đầy Đủ<\/h2>/);
  assert.match(html, /Leader Ban Event/);
  assert.match(html, /Giới thiệu do thành viên cung cấp\./);
  assert.match(html, /12\/04\/2006/);
  assert.match(html, /Nhiếp ảnh/);
  assert.match(html, /Cùng nhau tiến bộ\./);
  assert.match(html, /href="https:\/\/www\.facebook\.com\/profile\.php\?id=123"/);
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
});

test("shows honest pending labels without a fake link for missing details", () => {
  const html = render({ introduction: "   " });
  assert.equal((html.match(/Đang cập nhật/g) || []).length, 5);
  assert.doesNotMatch(html, /<a\b/);
  assert.match(html, /aria-labelledby="member-profile-name"/);
  assert.match(html, /aria-label="Đóng hồ sơ thành viên"/);
});

test("does not turn unsafe or unrelated URLs into profile links", () => {
  for (const facebookUrl of [
    "javascript:alert(1)",
    "http://facebook.com/profile.php?id=123",
    "https://facebook.com.evil.example/profile",
    "not a URL",
  ]) {
    assert.doesNotMatch(render({ facebookUrl }), /<a\b/);
  }
});

test("renders introductions as text, not executable markup", () => {
  const html = render({ introduction: '<script>alert("test")</script>' });
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});
