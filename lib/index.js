function w(e) {
  const t = e.slice(0, -1), n = e.at(-1);
  return [t, n];
}
function N(e) {
  return e === "__proto__" || e === "constructor" || e === "prototype";
}
function I(e, t) {
  return T(e) ? Object.prototype.hasOwnProperty.call(e, t) : !1;
}
function T(e) {
  return typeof e == "object" && e !== null;
}
function g(e) {
  return Array.isArray(e) ? [...e] : T(e) ? { ...e } : e;
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
  const n = e.map(b).join("/"), r = n.startsWith("/") ? "" : "/";
  return t === "uri" ? `#${r}${encodeURIComponent(n)}` : r + n;
}
function h(e, t, n) {
  const [r, ...i] = y(t);
  if ((r === void 0 || r === "") && i.length === 0)
    return n && n(e, "", void 0, []), e;
  let o = e, f;
  for (const u of i) {
    if (N(u))
      throw new Error("Prototype pollution attempt");
    if (!I(o, u)) {
      if (n) {
        o = void 0;
        break;
      }
      throw new Error(`Cannot find ${u} in ${JSON.stringify(o)}`);
    }
    f = o, o = o[u];
  }
  if (n) {
    const [u, a] = w(i);
    n(o, a, f, u);
  }
  return o;
}
function P(e, t) {
  return h(e, t);
}
function E(e, t, n) {
  let r = g(e);
  return h(e, t, (i, o, f, u) => {
    var a;
    if (i === n)
      return;
    const l = u.length;
    let c = 0, s = r;
    do {
      const p = u[c], d = c >= l;
      if (d && Array.isArray(s)) {
        o === "-" ? s.push(n) : s[+o] = n;
        return;
      }
      if (d && o === "") {
        r = n;
        return;
      }
      if (d) {
        s[o] = n;
        return;
      }
      const L = (a = s[p]) != null ? a : {};
      s[p] = g(L), s = s[p];
    } while (++c <= l);
  }), r;
}
const C = /* @__PURE__ */ new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "FIELDSET"
]);
function A(e) {
  const t = [];
  for (const n of Array.from(e.children))
    C.has(n.nodeName) ? t.push(n) : t.push(...A(n));
  return t;
}
function F(e) {
  return !!(e.hasAttribute("disabled") || e.ariaDisabled === "true");
}
function $(e) {
  return typeof HTMLFieldSetElement > "u" ? (e == null ? void 0 : e.tagName) === "FIELDSET" : e instanceof HTMLFieldSetElement;
}
function v(e) {
  return typeof HTMLInputElement > "u" ? (e == null ? void 0 : e.tagName) === "INPUT" : e instanceof HTMLInputElement;
}
function k(e) {
  return typeof HTMLSelectElement > "u" ? (e == null ? void 0 : e.tagName) === "SELECT" : e instanceof HTMLSelectElement;
}
function x(e) {
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
function m(e) {
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
  return O(e) ? R(e.value) : e.type === "number" || e.type === "range" ? m(e.value) : e.value;
}
function j(e, t) {
  const n = y(e);
  for (let r = n.length; r >= 0; r--) {
    const i = M(n.slice(0, r));
    try {
      if (H(t, i))
        return i;
    } catch {
      continue;
    }
  }
  throw new Error("No valid pointer found");
}
function S(e, t) {
  const n = W(t == null ? void 0 : t.conflictResolver);
  return A(e).reduce((r, i) => {
    if (F(i))
      return r;
    if ($(i)) {
      const u = S(i, t);
      return { ...r, ...u };
    }
    const o = `${i.name.startsWith("/") ? "" : "/"}${i.name}`;
    if (v(i)) {
      const u = _(i);
      return typeof u > "u" ? r : n(r, o, u);
    }
    if (x(i))
      return n(r, o, i.value);
    if (k(i)) {
      if (i.multiple) {
        const u = Array.from(i.selectedOptions).map((a) => a.value);
        return n(r, o, u);
      }
      return n(r, o, i.value);
    }
    const f = i.getAttribute("value");
    return f ? n(r, o, f) : r;
  }, {});
}
const U = (e, t, n, r, i) => ({ ...{
  "#": n
}, ...r });
function W(e = U) {
  return (t, n, r) => {
    try {
      return E(t, n, r);
    } catch (i) {
      if (e) {
        const o = j(n, t), f = n.slice(o.length), u = E({}, f, r), a = P(t, o), l = e(
          n,
          t,
          a,
          u,
          f
        );
        return E(t, f, l);
      }
      throw i;
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
