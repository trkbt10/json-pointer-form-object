function b(e) {
  const n = e.slice(0, -1), t = e.at(-1);
  return [n, t];
}
function L(e) {
  return typeof e == "object" && e !== null;
}
function S(e) {
  return e.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
function m(e) {
  if (e.startsWith("#")) {
    const n = decodeURIComponent(e).replace(/^#/, "");
    return m(n);
  }
  return e.split("/").map(S);
}
function I(e, n, t) {
  const [i, ...o] = m(n);
  if ((i === void 0 || i === "") && o.length === 0)
    return t && t(e, "", void 0, []), e;
  let r = e, s;
  for (const u of o) {
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      throw new Error("Prototype pollution attempt");
    if (!(u in r)) {
      if (t) {
        r = void 0;
        break;
      }
      throw new Error(`Cannot find ${u} in ${JSON.stringify(r)}`);
    }
    s = r, r = r[u];
  }
  if (t) {
    const [u, l] = b(o);
    t(r, l, s, u);
  }
  return r;
}
function a(e, n, t) {
  let i = T(e);
  return I(e, n, (o, r, s, u) => {
    var l;
    if (o === t)
      return;
    const y = u.length;
    let p = 0, f = i;
    do {
      const d = u[p], E = p >= y;
      if (E && Array.isArray(f)) {
        r === "-" ? f.push(t) : f[+r] = t;
        return;
      }
      if (E && r === "") {
        i = t;
        return;
      }
      if (E) {
        f[r] = t;
        return;
      }
      const g = (l = f[d]) != null ? l : {};
      f[d] = T(g), f = f[d];
    } while (++p <= y);
  }), i;
}
function T(e) {
  return Array.isArray(e) ? [...e] : L(e) ? { ...e } : e;
}
const N = /* @__PURE__ */ new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "FIELDSET"
]);
function h(e) {
  const n = [];
  for (const t of Array.from(e.children))
    N.has(t.nodeName) ? n.push(t) : n.push(...h(t));
  return n;
}
function v(e) {
  return !!(e.hasAttribute("disabled") || e.ariaDisabled === "true");
}
function D(e) {
  return typeof HTMLFieldSetElement > "u" ? (e == null ? void 0 : e.tagName) === "FIELDSET" : e instanceof HTMLFieldSetElement;
}
function A(e) {
  return typeof HTMLInputElement > "u" ? (e == null ? void 0 : e.tagName) === "INPUT" : e instanceof HTMLInputElement;
}
function w(e) {
  return typeof HTMLSelectElement > "u" ? (e == null ? void 0 : e.tagName) === "SELECT" : e instanceof HTMLSelectElement;
}
function H(e) {
  return typeof HTMLTextAreaElement > "u" ? (e == null ? void 0 : e.tagName) === "TEXTAREA" : e instanceof HTMLTextAreaElement;
}
function M(e) {
  return A(e) ? e.type === "date" || e.type === "datetime-local" || e.type === "month" || e.type === "time" : !1;
}
function x(e) {
  if (typeof e == "string")
    return new Date(e);
  if (typeof e == "number")
    return new Date(e);
  if (e instanceof Date)
    return e;
}
function c(e) {
  if (typeof e == "string")
    return +e;
  if (typeof e == "number")
    return e;
  if (e instanceof Date)
    return e.getTime();
}
function C(e) {
  var n;
  if (e.type === "checkbox")
    return e.checked;
  if (e.type === "radio")
    return e.checked ? e.value : void 0;
  if (e.type === "file") {
    const t = e.files || [];
    return e.multiple ? t : (n = t[0]) != null ? n : null;
  }
  return M(e) ? x(e.value) : e.type === "number" || e.type === "range" ? c(e.value) : e.value;
}
function F(e) {
  return h(e).reduce((n, t) => {
    if (v(t))
      return n;
    if (D(t)) {
      const r = F(t);
      return { ...n, ...r };
    }
    const i = `${t.name.startsWith("/") ? "" : "/"}${t.name}`;
    if (A(t)) {
      const r = C(t);
      return typeof r > "u" ? n : a(n, i, r);
    }
    if (H(t))
      return a(n, i, t.value);
    if (w(t)) {
      if (t.multiple) {
        const r = Array.from(t.selectedOptions).map((s) => s.value);
        return a(n, i, r);
      }
      return a(n, i, t.value);
    }
    const o = t.getAttribute("value");
    return o ? a(n, i, o) : n;
  }, {});
}
export {
  F as formToObject
};
