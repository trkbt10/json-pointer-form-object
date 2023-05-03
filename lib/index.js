function w(e) {
  const t = e.slice(0, -1), n = e.at(-1);
  return [t, n];
}
function N(e) {
  return e === "__proto__" || e === "constructor" || e === "prototype";
}
function I(e, t) {
  return m(e) ? Object.prototype.hasOwnProperty.call(e, t) : !1;
}
function m(e) {
  return typeof e == "object" && e !== null;
}
function g(e) {
  return Array.isArray(e) ? [...e] : m(e) ? { ...e } : e;
}
function b(e) {
  return typeof e == "number" ? b(e.toString()) : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function D(e) {
  return e.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function y(e) {
  if (e.startsWith("#")) {
    const t = decodeURIComponent(e).replace(/^#/, "");
    return y(t);
  }
  return e.split("/").map(D);
}
function H(e, t) {
  return typeof h(e, t, () => {
  }) < "u";
}
function M(e, t) {
  if (e.length === 0)
    return "";
  const n = e.map(b).join("/"), i = n.startsWith("/") ? "" : "/";
  return t === "uri" ? `#${i}${encodeURIComponent(n)}` : i + n;
}
function h(e, t, n) {
  const [i, ...u] = y(t);
  if ((i === void 0 || i === "") && u.length === 0)
    return n && n(e, "", void 0, []), e;
  let r = e, a;
  for (const f of u) {
    if (N(f))
      throw new Error("Prototype pollution attempt");
    if (!I(r, f)) {
      if (n) {
        r = void 0;
        break;
      }
      throw new Error(`Cannot find ${f} in ${JSON.stringify(r)}`);
    }
    a = r, r = r[f];
  }
  if (n) {
    const [f, o] = w(u);
    n(r, o, a, f);
  }
  return r;
}
function P(e, t) {
  return h(e, t);
}
function E(e, t, n) {
  let i = g(e);
  return h(e, t, (u, r, a, f) => {
    var o;
    if (u === n)
      return;
    const c = f.length;
    let l = 0, s = i;
    do {
      const p = f[l], d = l >= c;
      if (d && Array.isArray(s)) {
        r === "-" ? s.push(n) : s[+r] = n;
        return;
      }
      if (d && r === "") {
        i = n;
        return;
      }
      if (d) {
        s[r] = n;
        return;
      }
      const L = (o = s[p]) != null ? o : {};
      s[p] = g(L), s = s[p];
    } while (++l <= c);
  }), i;
}
const x = /* @__PURE__ */ new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "FIELDSET"
]);
function A(e) {
  const t = [];
  for (const n of Array.from(e.children))
    x.has(n.nodeName) ? t.push(n) : t.push(...A(n));
  return t;
}
function C(e) {
  return !!(e.hasAttribute("disabled") || e.ariaDisabled === "true");
}
function F(e) {
  return typeof HTMLFieldSetElement > "u" ? (e == null ? void 0 : e.tagName) === "FIELDSET" : e instanceof HTMLFieldSetElement;
}
function v(e) {
  return typeof HTMLInputElement > "u" ? (e == null ? void 0 : e.tagName) === "INPUT" : e instanceof HTMLInputElement;
}
function $(e) {
  return typeof HTMLSelectElement > "u" ? (e == null ? void 0 : e.tagName) === "SELECT" : e instanceof HTMLSelectElement;
}
function k(e) {
  return typeof HTMLTextAreaElement > "u" ? (e == null ? void 0 : e.tagName) === "TEXTAREA" : e instanceof HTMLTextAreaElement;
}
function O(e) {
  return v(e) ? e.type === "date" || e.type === "datetime-local" || e.type === "month" || e.type === "time" : !1;
}
function R(e) {
  if (typeof e == "string")
    return new Date(e);
  if (typeof e == "number")
    return new Date(e);
  if (e instanceof Date)
    return e;
}
function T(e) {
  if (typeof e == "string")
    return +e;
  if (typeof e == "number")
    return e;
  if (e instanceof Date)
    return e.getTime();
}
function _(e) {
  if (e.type === "checkbox")
    return e.checked;
  if (e.type === "radio")
    return e.checked ? e.value : void 0;
  if (e.type === "file") {
    const t = e.files || [];
    return e.multiple ? t : t[0] ?? null;
  }
  return O(e) ? R(e.value) : e.type === "number" || e.type === "range" ? T(e.value) : e.value;
}
function j(e, t) {
  const n = y(e);
  for (let i = n.length; i >= 0; i--) {
    const u = M(n.slice(0, i));
    try {
      if (H(t, u))
        return u;
    } catch {
      continue;
    }
  }
  throw new Error("No valid pointer found");
}
function S(e, t) {
  const n = (t == null ? void 0 : t.attribute) ?? "name", i = W(t == null ? void 0 : t.conflictResolver);
  return A(e).reduce((u, r) => {
    if (C(r))
      return u;
    if (F(r)) {
      const l = S(r, t);
      return { ...u, ...l };
    }
    const a = r.getAttribute(n);
    if (!a)
      return u;
    const o = `${a.startsWith("/") ? "" : "/"}${a}`;
    if (o === "/")
      return u;
    if (v(r)) {
      const l = _(r);
      return typeof l > "u" ? u : i(u, o, l);
    }
    if (k(r))
      return i(u, o, r.value);
    if ($(r)) {
      if (r.multiple) {
        const l = Array.from(r.selectedOptions).map((s) => s.value);
        return i(u, o, l);
      }
      return i(u, o, r.value);
    }
    const c = r.getAttribute("value");
    return c ? i(u, o, c) : u;
  }, {});
}
const U = (e, t, n, i, u) => ({ ...{
  "#": n
}, ...i });
function W(e = U) {
  return (t, n, i) => {
    try {
      return E(t, n, i);
    } catch (u) {
      if (e) {
        const r = j(n, t), a = n.slice(r.length), f = E({}, a, i), o = P(t, r), c = e(
          n,
          t,
          o,
          f,
          a
        );
        return E(t, a, c);
      }
      throw u;
    }
  };
}
function X(e) {
  return (t) => {
    if (!(t.target instanceof HTMLFormElement))
      return;
    t.preventDefault();
    const n = S(t.target);
    e(n);
  };
}
export {
  X as createFormEventHandler,
  S as formToObject
};
