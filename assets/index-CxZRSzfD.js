(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function gs(e, t) {
  const n = new Set(e.split(","));
  return t ? (s) => n.has(s.toLowerCase()) : (s) => n.has(s);
}
const ne = {},
  Ot = [],
  Ie = () => {},
  ei = () => !1,
  Cn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  _s = (e) => e.startsWith("onUpdate:"),
  ge = Object.assign,
  ms = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ti = Object.prototype.hasOwnProperty,
  K = (e, t) => ti.call(e, t),
  F = Array.isArray,
  St = (e) => En(e) === "[object Map]",
  Fr = (e) => En(e) === "[object Set]",
  j = (e) => typeof e == "function",
  ae = (e) => typeof e == "string",
  Tt = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  Nr = (e) => (le(e) || j(e)) && j(e.then) && j(e.catch),
  Br = Object.prototype.toString,
  En = (e) => Br.call(e),
  ni = (e) => En(e).slice(8, -1),
  $r = (e) => En(e) === "[object Object]",
  bs = (e) =>
    ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Vt = gs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  On = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  si = /-(\w)/g,
  De = On((e) => e.replace(si, (t, n) => (n ? n.toUpperCase() : ""))),
  ri = /\B([A-Z])/g,
  Mt = On((e) => e.replace(ri, "-$1").toLowerCase()),
  Sn = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  $n = On((e) => (e ? `on${Sn(e)}` : "")),
  lt = (e, t) => !Object.is(e, t),
  ln = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  hn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Qn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let js;
const Vr = () =>
  js ||
  (js =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function wn(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ae(s) ? ci(s) : wn(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (ae(e) || le(e)) return e;
}
const oi = /;(?![^(]*\))/g,
  ii = /:([^]+)/,
  li = /\/\*[^]*?\*\//g;
function ci(e) {
  const t = {};
  return (
    e
      .replace(li, "")
      .split(oi)
      .forEach((n) => {
        if (n) {
          const s = n.split(ii);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function vs(e) {
  let t = "";
  if (ae(e)) t = e;
  else if (F(e))
    for (let n = 0; n < e.length; n++) {
      const s = vs(e[n]);
      s && (t += s + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ui =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ai = gs(ui);
function jr(e) {
  return !!e || e === "";
}
const Re = (e) =>
    ae(e)
      ? e
      : e == null
        ? ""
        : F(e) || (le(e) && (e.toString === Br || !j(e.toString)))
          ? JSON.stringify(e, Ur, 2)
          : String(e),
  Ur = (e, t) =>
    t && t.__v_isRef
      ? Ur(e, t.value)
      : St(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], o) => ((n[Vn(s, o) + " =>"] = r), n),
              {},
            ),
          }
        : Fr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Vn(n)) }
          : Tt(t)
            ? Vn(t)
            : le(t) && !F(t) && !$r(t)
              ? String(t)
              : t,
  Vn = (e, t = "") => {
    var n;
    return Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let we;
class zr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = we),
      !t && we && (this.index = (we.scopes || (we.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = we;
      try {
        return (we = this), t();
      } finally {
        we = n;
      }
    }
  }
  on() {
    we = this;
  }
  off() {
    we = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Hr(e) {
  return new zr(e);
}
function fi(e, t = we) {
  t && t.active && t.effects.push(e);
}
function Dr() {
  return we;
}
function di(e) {
  we && we.cleanups.push(e);
}
let ht;
class ys {
  constructor(t, n, s, r) {
    (this.fn = t),
      (this.trigger = n),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      fi(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      (this._dirtyLevel = 1), _t();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (hi(n.computed), this._dirtyLevel >= 4)) break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), mt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let t = rt,
      n = ht;
    try {
      return (rt = !0), (ht = this), this._runnings++, Us(this), this.fn();
    } finally {
      zs(this), this._runnings--, (ht = n), (rt = t);
    }
  }
  stop() {
    var t;
    this.active &&
      (Us(this),
      zs(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1));
  }
}
function hi(e) {
  return e.value;
}
function Us(e) {
  e._trackId++, (e._depsLength = 0);
}
function zs(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Kr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Kr(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let rt = !0,
  Zn = 0;
const Wr = [];
function _t() {
  Wr.push(rt), (rt = !1);
}
function mt() {
  const e = Wr.pop();
  rt = e === void 0 ? !0 : e;
}
function xs() {
  Zn++;
}
function Cs() {
  for (Zn--; !Zn && Jn.length; ) Jn.shift()();
}
function qr(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && Kr(s, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const Jn = [];
function Gr(e, t, n) {
  xs();
  for (const s of e.keys()) {
    let r;
    s._dirtyLevel < t &&
      (r ?? (r = e.get(s) === s._trackId)) &&
      (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0),
      (s._dirtyLevel = t)),
      s._shouldSchedule &&
        (r ?? (r = e.get(s) === s._trackId)) &&
        (s.trigger(),
        (!s._runnings || s.allowRecurse) &&
          s._dirtyLevel !== 2 &&
          ((s._shouldSchedule = !1), s.scheduler && Jn.push(s.scheduler)));
  }
  Cs();
}
const Xr = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  pn = new WeakMap(),
  pt = Symbol(""),
  es = Symbol("");
function Ee(e, t, n) {
  if (rt && ht) {
    let s = pn.get(e);
    s || pn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Xr(() => s.delete(n)))), qr(ht, r);
  }
}
function qe(e, t, n, s, r, o) {
  const i = pn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && F(e)) {
    const c = Number(s);
    i.forEach((d, a) => {
      (a === "length" || (!Tt(a) && a >= c)) && l.push(d);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        F(e)
          ? bs(n) && l.push(i.get("length"))
          : (l.push(i.get(pt)), St(e) && l.push(i.get(es)));
        break;
      case "delete":
        F(e) || (l.push(i.get(pt)), St(e) && l.push(i.get(es)));
        break;
      case "set":
        St(e) && l.push(i.get(pt));
        break;
    }
  xs();
  for (const c of l) c && Gr(c, 4);
  Cs();
}
function pi(e, t) {
  var n;
  return (n = pn.get(e)) == null ? void 0 : n.get(t);
}
const gi = gs("__proto__,__v_isRef,__isVue"),
  Yr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Tt),
  ),
  Hs = _i();
function _i() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = W(this);
        for (let o = 0, i = this.length; o < i; o++) Ee(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(W)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        _t(), xs();
        const s = W(this)[t].apply(this, n);
        return Cs(), mt(), s;
      };
    }),
    e
  );
}
function mi(e) {
  const t = W(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class Qr {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, s) {
    const r = this._isReadonly,
      o = this._shallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (r ? (o ? ki : to) : o ? eo : Jr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = F(t);
    if (!r) {
      if (i && K(Hs, n)) return Reflect.get(Hs, n, s);
      if (n === "hasOwnProperty") return mi;
    }
    const l = Reflect.get(t, n, s);
    return (Tt(n) ? Yr.has(n) : gi(n)) || (r || Ee(t, "get", n), o)
      ? l
      : fe(l)
        ? i && bs(n)
          ? l
          : l.value
        : le(l)
          ? r
            ? so(l)
            : Qt(l)
          : l;
  }
}
class Zr extends Qr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._shallow) {
      const c = At(o);
      if (
        (!gn(s) && !At(s) && ((o = W(o)), (s = W(s))), !F(t) && fe(o) && !fe(s))
      )
        return c ? !1 : ((o.value = s), !0);
    }
    const i = F(t) && bs(n) ? Number(n) < t.length : K(t, n),
      l = Reflect.set(t, n, s, r);
    return (
      t === W(r) && (i ? lt(s, o) && qe(t, "set", n, s) : qe(t, "add", n, s)), l
    );
  }
  deleteProperty(t, n) {
    const s = K(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && qe(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Tt(n) || !Yr.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(t, "iterate", F(t) ? "length" : pt), Reflect.ownKeys(t);
  }
}
class bi extends Qr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const vi = new Zr(),
  yi = new bi(),
  xi = new Zr(!0),
  Es = (e) => e,
  Rn = (e) => Reflect.getPrototypeOf(e);
function en(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = W(e),
    o = W(t);
  n || (lt(t, o) && Ee(r, "get", t), Ee(r, "get", o));
  const { has: i } = Rn(r),
    l = s ? Es : n ? ws : Wt;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function tn(e, t = !1) {
  const n = this.__v_raw,
    s = W(n),
    r = W(e);
  return (
    t || (lt(e, r) && Ee(s, "has", e), Ee(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function nn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ee(W(e), "iterate", pt), Reflect.get(e, "size", e)
  );
}
function Ds(e) {
  e = W(e);
  const t = W(this);
  return Rn(t).has.call(t, e) || (t.add(e), qe(t, "add", e, e)), this;
}
function Ks(e, t) {
  t = W(t);
  const n = W(this),
    { has: s, get: r } = Rn(n);
  let o = s.call(n, e);
  o || ((e = W(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? lt(t, i) && qe(n, "set", e, t) : qe(n, "add", e, t), this
  );
}
function Ws(e) {
  const t = W(this),
    { has: n, get: s } = Rn(t);
  let r = n.call(t, e);
  r || ((e = W(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && qe(t, "delete", e, void 0), o;
}
function qs() {
  const e = W(this),
    t = e.size !== 0,
    n = e.clear();
  return t && qe(e, "clear", void 0, void 0), n;
}
function sn(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = W(i),
      c = t ? Es : e ? ws : Wt;
    return (
      !e && Ee(l, "iterate", pt), i.forEach((d, a) => s.call(r, c(d), c(a), o))
    );
  };
}
function rn(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = W(r),
      i = St(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      d = r[e](...s),
      a = n ? Es : t ? ws : Wt;
    return (
      !t && Ee(o, "iterate", c ? es : pt),
      {
        next() {
          const { value: h, done: g } = d.next();
          return g
            ? { value: h, done: g }
            : { value: l ? [a(h[0]), a(h[1])] : a(h), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Qe(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ci() {
  const e = {
      get(o) {
        return en(this, o);
      },
      get size() {
        return nn(this);
      },
      has: tn,
      add: Ds,
      set: Ks,
      delete: Ws,
      clear: qs,
      forEach: sn(!1, !1),
    },
    t = {
      get(o) {
        return en(this, o, !1, !0);
      },
      get size() {
        return nn(this);
      },
      has: tn,
      add: Ds,
      set: Ks,
      delete: Ws,
      clear: qs,
      forEach: sn(!1, !0),
    },
    n = {
      get(o) {
        return en(this, o, !0);
      },
      get size() {
        return nn(this, !0);
      },
      has(o) {
        return tn.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: sn(!0, !1),
    },
    s = {
      get(o) {
        return en(this, o, !0, !0);
      },
      get size() {
        return nn(this, !0);
      },
      has(o) {
        return tn.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: sn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = rn(o, !1, !1)),
        (n[o] = rn(o, !0, !1)),
        (t[o] = rn(o, !1, !0)),
        (s[o] = rn(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Ei, Oi, Si, wi] = Ci();
function Os(e, t) {
  const n = t ? (e ? wi : Si) : e ? Oi : Ei;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(K(n, r) && r in s ? n : s, r, o);
}
const Ri = { get: Os(!1, !1) },
  Pi = { get: Os(!1, !0) },
  Ai = { get: Os(!0, !1) },
  Jr = new WeakMap(),
  eo = new WeakMap(),
  to = new WeakMap(),
  ki = new WeakMap();
function Ii(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Li(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ii(ni(e));
}
function Qt(e) {
  return At(e) ? e : Ss(e, !1, vi, Ri, Jr);
}
function no(e) {
  return Ss(e, !1, xi, Pi, eo);
}
function so(e) {
  return Ss(e, !0, yi, Ai, to);
}
function Ss(e, t, n, s, r) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = Li(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function ot(e) {
  return At(e) ? ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function At(e) {
  return !!(e && e.__v_isReadonly);
}
function gn(e) {
  return !!(e && e.__v_isShallow);
}
function ro(e) {
  return ot(e) || At(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function Pn(e) {
  return Object.isExtensible(e) && hn(e, "__v_skip", !0), e;
}
const Wt = (e) => (le(e) ? Qt(e) : e),
  ws = (e) => (le(e) ? so(e) : e);
class oo {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new ys(
        () => t(this._value),
        () => cn(this, this.effect._dirtyLevel === 2 ? 2 : 3),
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = W(this);
    return (
      (!t._cacheable || t.effect.dirty) &&
        lt(t._value, (t._value = t.effect.run())) &&
        cn(t, 4),
      io(t),
      t.effect._dirtyLevel >= 2 && cn(t, 2),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
}
function Ti(e, t, n = !1) {
  let s, r;
  const o = j(e);
  return (
    o ? ((s = e), (r = Ie)) : ((s = e.get), (r = e.set)),
    new oo(s, r, o || !r, n)
  );
}
function io(e) {
  var t;
  rt &&
    ht &&
    ((e = W(e)),
    qr(
      ht,
      (t = e.dep) != null
        ? t
        : (e.dep = Xr(() => (e.dep = void 0), e instanceof oo ? e : void 0)),
    ));
}
function cn(e, t = 4, n) {
  e = W(e);
  const s = e.dep;
  s && Gr(s, t);
}
function fe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Rs(e) {
  return lo(e, !1);
}
function Mi(e) {
  return lo(e, !0);
}
function lo(e, t) {
  return fe(e) ? e : new Fi(e, t);
}
class Fi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : W(t)),
      (this._value = n ? t : Wt(t));
  }
  get value() {
    return io(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || gn(t) || At(t);
    (t = n ? t : W(t)),
      lt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Wt(t)), cn(this, 4));
  }
}
function wt(e) {
  return fe(e) ? e.value : e;
}
const Ni = {
  get: (e, t, n) => wt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function co(e) {
  return ot(e) ? e : new Proxy(e, Ni);
}
function Bi(e) {
  const t = F(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Vi(e, n);
  return t;
}
class $i {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return pi(W(this._object), this._key);
  }
}
function Vi(e, t, n) {
  const s = e[t];
  return fe(s) ? s : new $i(e, t, n);
}
/**
 * @vue/runtime-core v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function it(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    An(o, t, n);
  }
  return r;
}
function Fe(e, t, n, s) {
  if (j(e)) {
    const o = it(e, t, n, s);
    return (
      o &&
        Nr(o) &&
        o.catch((i) => {
          An(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Fe(e[o], t, n, s));
  return r;
}
function An(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let a = 0; a < d.length; a++) if (d[a](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      it(c, null, 10, [e, i, l]);
      return;
    }
  }
  ji(e, n, r, s);
}
function ji(e, t, n, s = !0) {
  console.error(e);
}
let qt = !1,
  ts = !1;
const be = [];
let Ue = 0;
const Rt = [];
let et = null,
  ft = 0;
const uo = Promise.resolve();
let Ps = null;
function As(e) {
  const t = Ps || uo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ui(e) {
  let t = Ue + 1,
    n = be.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = be[s],
      o = Gt(r);
    o < e || (o === e && r.pre) ? (t = s + 1) : (n = s);
  }
  return t;
}
function ks(e) {
  (!be.length || !be.includes(e, qt && e.allowRecurse ? Ue + 1 : Ue)) &&
    (e.id == null ? be.push(e) : be.splice(Ui(e.id), 0, e), ao());
}
function ao() {
  !qt && !ts && ((ts = !0), (Ps = uo.then(ho)));
}
function zi(e) {
  const t = be.indexOf(e);
  t > Ue && be.splice(t, 1);
}
function Hi(e) {
  F(e)
    ? Rt.push(...e)
    : (!et || !et.includes(e, e.allowRecurse ? ft + 1 : ft)) && Rt.push(e),
    ao();
}
function Gs(e, t, n = qt ? Ue + 1 : 0) {
  for (; n < be.length; n++) {
    const s = be[n];
    if (s && s.pre) {
      if (e && s.id !== e.uid) continue;
      be.splice(n, 1), n--, s();
    }
  }
}
function fo(e) {
  if (Rt.length) {
    const t = [...new Set(Rt)].sort((n, s) => Gt(n) - Gt(s));
    if (((Rt.length = 0), et)) {
      et.push(...t);
      return;
    }
    for (et = t, ft = 0; ft < et.length; ft++) et[ft]();
    (et = null), (ft = 0);
  }
}
const Gt = (e) => (e.id == null ? 1 / 0 : e.id),
  Di = (e, t) => {
    const n = Gt(e) - Gt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ho(e) {
  (ts = !1), (qt = !0), be.sort(Di);
  try {
    for (Ue = 0; Ue < be.length; Ue++) {
      const t = be[Ue];
      t && t.active !== !1 && it(t, null, 14);
    }
  } finally {
    (Ue = 0),
      (be.length = 0),
      fo(),
      (qt = !1),
      (Ps = null),
      (be.length || Rt.length) && ho();
  }
}
function Ki(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ne;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const a = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: g } = s[a] || ne;
    g && (r = n.map((v) => (ae(v) ? v.trim() : v))), h && (r = n.map(Qn));
  }
  let l,
    c = s[(l = $n(t))] || s[(l = $n(De(t)))];
  !c && o && (c = s[(l = $n(Mt(t)))]), c && Fe(c, e, 6, r);
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Fe(d, e, 6, r);
  }
}
function po(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!j(e)) {
    const c = (d) => {
      const a = po(d, t, !0);
      a && ((l = !0), ge(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (le(e) && s.set(e, null), null)
    : (F(o) ? o.forEach((c) => (i[c] = null)) : ge(i, o),
      le(e) && s.set(e, i),
      i);
}
function kn(e, t) {
  return !e || !Cn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Mt(t)) || K(e, t));
}
let ye = null,
  go = null;
function _n(e) {
  const t = ye;
  return (ye = e), (go = (e && e.type.__scopeId) || null), t;
}
function mn(e, t = ye, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && or(-1);
    const o = _n(t);
    let i;
    try {
      i = e(...r);
    } finally {
      _n(o), s._d && or(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function jn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: d,
    render: a,
    renderCache: h,
    data: g,
    setupState: v,
    ctx: A,
    inheritAttrs: M,
  } = e;
  let U, I;
  const N = _n(e);
  try {
    if (n.shapeFlag & 4) {
      const q = r || s,
        G = q;
      (U = je(a.call(G, q, h, o, v, g, A))), (I = c);
    } else {
      const q = t;
      (U = je(
        q.length > 1 ? q(o, { attrs: c, slots: l, emit: d }) : q(o, null),
      )),
        (I = t.props ? c : Wi(c));
    }
  } catch (q) {
    (Ht.length = 0), An(q, e, 1), (U = se(gt));
  }
  let $ = U;
  if (I && M !== !1) {
    const q = Object.keys(I),
      { shapeFlag: G } = $;
    q.length && G & 7 && (i && q.some(_s) && (I = qi(I, i)), ($ = kt($, I)));
  }
  return (
    n.dirs && (($ = kt($)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)),
    n.transition && ($.transition = n.transition),
    (U = $),
    _n(N),
    U
  );
}
const Wi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Cn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  qi = (e, t) => {
    const n = {};
    for (const s in e) (!_s(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Gi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    d = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Xs(s, i, d) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const g = a[h];
        if (i[g] !== s[g] && !kn(d, g)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? Xs(s, i, d)
            : !0
          : !!i;
  return !1;
}
function Xs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !kn(n, o)) return !0;
  }
  return !1;
}
function Xi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const _o = "components";
function ze(e, t) {
  return Qi(_o, e, !0, t) || e;
}
const Yi = Symbol.for("v-ndc");
function Qi(e, t, n = !0, s = !1) {
  const r = ye || pe;
  if (r) {
    const o = r.type;
    if (e === _o) {
      const l = Gl(o, !1);
      if (l && (l === t || l === De(t) || l === Sn(De(t)))) return o;
    }
    const i = Ys(r[e] || o[e], t) || Ys(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Ys(e, t) {
  return e && (e[t] || e[De(t)] || e[Sn(De(t))]);
}
const Zi = (e) => e.__isSuspense;
function Ji(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Hi(e);
}
const el = Symbol.for("v-scx"),
  tl = () => He(el),
  on = {};
function jt(e, t, n) {
  return mo(e, t, n);
}
function mo(
  e,
  t,
  { immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: l } = ne,
) {
  if (t && o) {
    const V = t;
    t = (...ce) => {
      V(...ce), G();
    };
  }
  const c = pe,
    d = (V) => (s === !0 ? V : dt(V, s === !1 ? 1 : void 0));
  let a,
    h = !1,
    g = !1;
  if (
    (fe(e)
      ? ((a = () => e.value), (h = gn(e)))
      : ot(e)
        ? ((a = () => d(e)), (h = !0))
        : F(e)
          ? ((g = !0),
            (h = e.some((V) => ot(V) || gn(V))),
            (a = () =>
              e.map((V) => {
                if (fe(V)) return V.value;
                if (ot(V)) return d(V);
                if (j(V)) return it(V, c, 2);
              })))
          : j(e)
            ? t
              ? (a = () => it(e, c, 2))
              : (a = () => (v && v(), Fe(e, c, 3, [A])))
            : (a = Ie),
    t && s)
  ) {
    const V = a;
    a = () => dt(V());
  }
  let v,
    A = (V) => {
      v = $.onStop = () => {
        it(V, c, 4), (v = $.onStop = void 0);
      };
    },
    M;
  if (Mn)
    if (
      ((A = Ie),
      t ? n && Fe(t, c, 3, [a(), g ? [] : void 0, A]) : a(),
      r === "sync")
    ) {
      const V = tl();
      M = V.__watcherHandles || (V.__watcherHandles = []);
    } else return Ie;
  let U = g ? new Array(e.length).fill(on) : on;
  const I = () => {
    if (!(!$.active || !$.dirty))
      if (t) {
        const V = $.run();
        (s || h || (g ? V.some((ce, H) => lt(ce, U[H])) : lt(V, U))) &&
          (v && v(),
          Fe(t, c, 3, [V, U === on ? void 0 : g && U[0] === on ? [] : U, A]),
          (U = V));
      } else $.run();
  };
  I.allowRecurse = !!t;
  let N;
  r === "sync"
    ? (N = I)
    : r === "post"
      ? (N = () => Ce(I, c && c.suspense))
      : ((I.pre = !0), c && (I.id = c.uid), (N = () => ks(I)));
  const $ = new ys(a, Ie, N),
    q = Dr(),
    G = () => {
      $.stop(), q && ms(q.effects, $);
    };
  return (
    t
      ? n
        ? I()
        : (U = $.run())
      : r === "post"
        ? Ce($.run.bind($), c && c.suspense)
        : $.run(),
    M && M.push(G),
    G
  );
}
function nl(e, t, n) {
  const s = this.proxy,
    r = ae(e) ? (e.includes(".") ? bo(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  j(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Zt(this),
    l = mo(r, o.bind(s), n);
  return i(), l;
}
function bo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function dt(e, t, n = 0, s) {
  if (!le(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++;
  }
  if (((s = s || new Set()), s.has(e))) return e;
  if ((s.add(e), fe(e))) dt(e.value, t, n, s);
  else if (F(e)) for (let r = 0; r < e.length; r++) dt(e[r], t, n, s);
  else if (Fr(e) || St(e))
    e.forEach((r) => {
      dt(r, t, n, s);
    });
  else if ($r(e)) for (const r in e) dt(e[r], t, n, s);
  return e;
}
function sl(e, t) {
  if (ye === null) return e;
  const n = Fn(ye) || ye.proxy,
    s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = ne] = t[r];
    o &&
      (j(o) && (o = { mounted: o, updated: o }),
      o.deep && dt(i),
      s.push({
        dir: o,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      }));
  }
  return e;
}
function ut(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (_t(), Fe(c, n, 8, [e.el, l, e, t]), mt());
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function vo(e, t) {
  return j(e) ? ge({ name: e.name }, t, { setup: e }) : e;
}
const un = (e) => !!e.type.__asyncLoader,
  yo = (e) => e.type.__isKeepAlive;
function rl(e, t) {
  xo(e, "a", t);
}
function ol(e, t) {
  xo(e, "da", t);
}
function xo(e, t, n = pe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((In(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      yo(r.parent.vnode) && il(s, t, n, r), (r = r.parent);
  }
}
function il(e, t, n, s) {
  const r = In(t, e, s, !0);
  Co(() => {
    ms(s[t], r);
  }, n);
}
function In(e, t, n = pe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          _t();
          const l = Zt(n),
            c = Fe(t, n, e, i);
          return l(), mt(), c;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ge =
    (e) =>
    (t, n = pe) =>
      (!Mn || e === "sp") && In(e, (...s) => t(...s), n),
  ll = Ge("bm"),
  cl = Ge("m"),
  ul = Ge("bu"),
  al = Ge("u"),
  fl = Ge("bum"),
  Co = Ge("um"),
  dl = Ge("sp"),
  hl = Ge("rtg"),
  pl = Ge("rtc");
function gl(e, t = pe) {
  In("ec", e, t);
}
function Ut(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (F(e) || ae(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (le(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const d = i[l];
        r[l] = t(e[d], d, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
const ns = (e) => (e ? (Fo(e) ? Fn(e) || e.proxy : ns(e.parent)) : null),
  zt = ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ns(e.parent),
    $root: (e) => ns(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Is(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), ks(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = As.bind(e.proxy)),
    $watch: (e) => nl.bind(e),
  }),
  Un = (e, t) => e !== ne && !e.__isScriptSetup && K(e, t),
  _l = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let d;
      if (t[0] !== "$") {
        const v = i[t];
        if (v !== void 0)
          switch (v) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Un(s, t)) return (i[t] = 1), s[t];
          if (r !== ne && K(r, t)) return (i[t] = 2), r[t];
          if ((d = e.propsOptions[0]) && K(d, t)) return (i[t] = 3), o[t];
          if (n !== ne && K(n, t)) return (i[t] = 4), n[t];
          ss && (i[t] = 0);
        }
      }
      const a = zt[t];
      let h, g;
      if (a) return t === "$attrs" && Ee(e, "get", t), a(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== ne && K(n, t)) return (i[t] = 4), n[t];
      if (((g = c.config.globalProperties), K(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Un(r, t)
        ? ((r[t] = n), !0)
        : s !== ne && K(s, t)
          ? ((s[t] = n), !0)
          : K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i,
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== ne && K(e, i)) ||
        Un(t, i) ||
        ((l = o[0]) && K(l, i)) ||
        K(s, i) ||
        K(zt, i) ||
        K(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Qs(e) {
  return F(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ss = !0;
function ml(e) {
  const t = Is(e),
    n = e.proxy,
    s = e.ctx;
  (ss = !1), t.beforeCreate && Zs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: d,
    created: a,
    beforeMount: h,
    mounted: g,
    beforeUpdate: v,
    updated: A,
    activated: M,
    deactivated: U,
    beforeDestroy: I,
    beforeUnmount: N,
    destroyed: $,
    unmounted: q,
    render: G,
    renderTracked: V,
    renderTriggered: ce,
    errorCaptured: H,
    serverPrefetch: D,
    expose: ue,
    inheritAttrs: _e,
    components: Oe,
    directives: Pe,
    filters: ct,
  } = t;
  if ((d && bl(d, s, null), i))
    for (const ee in i) {
      const Q = i[ee];
      j(Q) && (s[ee] = Q.bind(n));
    }
  if (r) {
    const ee = r.call(n, n);
    le(ee) && (e.data = Qt(ee));
  }
  if (((ss = !0), o))
    for (const ee in o) {
      const Q = o[ee],
        Ke = j(Q) ? Q.bind(n, n) : j(Q.get) ? Q.get.bind(n, n) : Ie,
        Ye = !j(Q) && j(Q.set) ? Q.set.bind(n) : Ie,
        Be = ke({ get: Ke, set: Ye });
      Object.defineProperty(s, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (xe) => (Be.value = xe),
      });
    }
  if (l) for (const ee in l) Eo(l[ee], s, n, ee);
  if (c) {
    const ee = j(c) ? c.call(n) : c;
    Reflect.ownKeys(ee).forEach((Q) => {
      an(Q, ee[Q]);
    });
  }
  a && Zs(a, e, "c");
  function X(ee, Q) {
    F(Q) ? Q.forEach((Ke) => ee(Ke.bind(n))) : Q && ee(Q.bind(n));
  }
  if (
    (X(ll, h),
    X(cl, g),
    X(ul, v),
    X(al, A),
    X(rl, M),
    X(ol, U),
    X(gl, H),
    X(pl, V),
    X(hl, ce),
    X(fl, N),
    X(Co, q),
    X(dl, D),
    F(ue))
  )
    if (ue.length) {
      const ee = e.exposed || (e.exposed = {});
      ue.forEach((Q) => {
        Object.defineProperty(ee, Q, {
          get: () => n[Q],
          set: (Ke) => (n[Q] = Ke),
        });
      });
    } else e.exposed || (e.exposed = {});
  G && e.render === Ie && (e.render = G),
    _e != null && (e.inheritAttrs = _e),
    Oe && (e.components = Oe),
    Pe && (e.directives = Pe);
}
function bl(e, t, n = Ie) {
  F(e) && (e = rs(e));
  for (const s in e) {
    const r = e[s];
    let o;
    le(r)
      ? "default" in r
        ? (o = He(r.from || s, r.default, !0))
        : (o = He(r.from || s))
      : (o = He(r)),
      fe(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function Zs(e, t, n) {
  Fe(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Eo(e, t, n, s) {
  const r = s.includes(".") ? bo(n, s) : () => n[s];
  if (ae(e)) {
    const o = t[e];
    j(o) && jt(r, o);
  } else if (j(e)) jt(r, e.bind(n));
  else if (le(e))
    if (F(e)) e.forEach((o) => Eo(o, t, n, s));
    else {
      const o = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(o) && jt(r, o, e);
    }
}
function Is(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((d) => bn(c, d, i, !0)),
          bn(c, t, i)),
    le(t) && o.set(t, c),
    c
  );
}
function bn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && bn(e, o, n, !0), r && r.forEach((i) => bn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = vl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const vl = {
  data: Js,
  props: er,
  emits: er,
  methods: $t,
  computed: $t,
  beforeCreate: ve,
  created: ve,
  beforeMount: ve,
  mounted: ve,
  beforeUpdate: ve,
  updated: ve,
  beforeDestroy: ve,
  beforeUnmount: ve,
  destroyed: ve,
  unmounted: ve,
  activated: ve,
  deactivated: ve,
  errorCaptured: ve,
  serverPrefetch: ve,
  components: $t,
  directives: $t,
  watch: xl,
  provide: Js,
  inject: yl,
};
function Js(e, t) {
  return t
    ? e
      ? function () {
          return ge(
            j(e) ? e.call(this, this) : e,
            j(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function yl(e, t) {
  return $t(rs(e), rs(t));
}
function rs(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $t(e, t) {
  return e ? ge(Object.create(null), e, t) : t;
}
function er(e, t) {
  return e
    ? F(e) && F(t)
      ? [...new Set([...e, ...t])]
      : ge(Object.create(null), Qs(e), Qs(t ?? {}))
    : t;
}
function xl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(Object.create(null), e);
  for (const s in t) n[s] = ve(e[s], t[s]);
  return n;
}
function Oo() {
  return {
    app: null,
    config: {
      isNativeTag: ei,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Cl = 0;
function El(e, t) {
  return function (s, r = null) {
    j(s) || (s = ge({}, s)), r != null && !le(r) && (r = null);
    const o = Oo(),
      i = new WeakSet();
    let l = !1;
    const c = (o.app = {
      _uid: Cl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Yl,
      get config() {
        return o.config;
      },
      set config(d) {},
      use(d, ...a) {
        return (
          i.has(d) ||
            (d && j(d.install)
              ? (i.add(d), d.install(c, ...a))
              : j(d) && (i.add(d), d(c, ...a))),
          c
        );
      },
      mixin(d) {
        return o.mixins.includes(d) || o.mixins.push(d), c;
      },
      component(d, a) {
        return a ? ((o.components[d] = a), c) : o.components[d];
      },
      directive(d, a) {
        return a ? ((o.directives[d] = a), c) : o.directives[d];
      },
      mount(d, a, h) {
        if (!l) {
          const g = se(s, r);
          return (
            (g.appContext = o),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            a && t ? t(g, d) : e(g, d, h),
            (l = !0),
            (c._container = d),
            (d.__vue_app__ = c),
            Fn(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, a) {
        return (o.provides[d] = a), c;
      },
      runWithContext(d) {
        const a = Pt;
        Pt = c;
        try {
          return d();
        } finally {
          Pt = a;
        }
      },
    });
    return c;
  };
}
let Pt = null;
function an(e, t) {
  if (pe) {
    let n = pe.provides;
    const s = pe.parent && pe.parent.provides;
    s === n && (n = pe.provides = Object.create(s)), (n[e] = t);
  }
}
function He(e, t, n = !1) {
  const s = pe || ye;
  if (s || Pt) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Pt._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && j(t) ? t.call(s && s.proxy) : t;
  }
}
function Ol() {
  return !!(pe || ye || Pt);
}
function Sl(e, t, n, s = !1) {
  const r = {},
    o = {};
  hn(o, Tn, 1), (e.propsDefaults = Object.create(null)), So(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : no(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function wl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = W(r),
    [c] = e.propsOptions;
  let d = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let g = a[h];
        if (kn(e.emitsOptions, g)) continue;
        const v = t[g];
        if (c)
          if (K(o, g)) v !== o[g] && ((o[g] = v), (d = !0));
          else {
            const A = De(g);
            r[A] = os(c, l, A, v, e, !1);
          }
        else v !== o[g] && ((o[g] = v), (d = !0));
      }
    }
  } else {
    So(e, t, r, o) && (d = !0);
    let a;
    for (const h in l)
      (!t || (!K(t, h) && ((a = Mt(h)) === h || !K(t, a)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[a] !== void 0) &&
            (r[h] = os(c, l, h, void 0, e, !0))
          : delete r[h]);
    if (o !== l) for (const h in o) (!t || !K(t, h)) && (delete o[h], (d = !0));
  }
  d && qe(e, "set", "$attrs");
}
function So(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (Vt(c)) continue;
      const d = t[c];
      let a;
      r && K(r, (a = De(c)))
        ? !o || !o.includes(a)
          ? (n[a] = d)
          : ((l || (l = {}))[a] = d)
        : kn(e.emitsOptions, c) ||
          ((!(c in s) || d !== s[c]) && ((s[c] = d), (i = !0)));
    }
  if (o) {
    const c = W(n),
      d = l || ne;
    for (let a = 0; a < o.length; a++) {
      const h = o[a];
      n[h] = os(r, c, h, d[h], e, !K(d, h));
    }
  }
  return i;
}
function os(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = K(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && j(c)) {
        const { propsDefaults: d } = r;
        if (n in d) s = d[n];
        else {
          const a = Zt(r);
          (s = d[n] = c.call(null, t)), a();
        }
      } else s = c;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === Mt(n)) && (s = !0));
  }
  return s;
}
function wo(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!j(e)) {
    const a = (h) => {
      c = !0;
      const [g, v] = wo(h, t, !0);
      ge(i, g), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c) return le(e) && s.set(e, Ot), Ot;
  if (F(o))
    for (let a = 0; a < o.length; a++) {
      const h = De(o[a]);
      tr(h) && (i[h] = ne);
    }
  else if (o)
    for (const a in o) {
      const h = De(a);
      if (tr(h)) {
        const g = o[a],
          v = (i[h] = F(g) || j(g) ? { type: g } : ge({}, g));
        if (v) {
          const A = rr(Boolean, v.type),
            M = rr(String, v.type);
          (v[0] = A > -1),
            (v[1] = M < 0 || A < M),
            (A > -1 || K(v, "default")) && l.push(h);
        }
      }
    }
  const d = [i, l];
  return le(e) && s.set(e, d), d;
}
function tr(e) {
  return e[0] !== "$" && !Vt(e);
}
function nr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function sr(e, t) {
  return nr(e) === nr(t);
}
function rr(e, t) {
  return F(t) ? t.findIndex((n) => sr(n, e)) : j(t) && sr(t, e) ? 0 : -1;
}
const Ro = (e) => e[0] === "_" || e === "$stable",
  Ls = (e) => (F(e) ? e.map(je) : [je(e)]),
  Rl = (e, t, n) => {
    if (t._n) return t;
    const s = mn((...r) => Ls(t(...r)), n);
    return (s._c = !1), s;
  },
  Po = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Ro(r)) continue;
      const o = e[r];
      if (j(o)) t[r] = Rl(r, o, s);
      else if (o != null) {
        const i = Ls(o);
        t[r] = () => i;
      }
    }
  },
  Ao = (e, t) => {
    const n = Ls(t);
    e.slots.default = () => n;
  },
  Pl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = W(t)), hn(t, "_", n)) : Po(t, (e.slots = {}));
    } else (e.slots = {}), t && Ao(e, t);
    hn(e.slots, Tn, 1);
  },
  Al = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = ne;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ge(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), Po(t, r)),
        (i = t);
    } else t && (Ao(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !Ro(l) && i[l] == null && delete r[l];
  };
function is(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((g, v) => is(g, t && (F(t) ? t[v] : t), n, s, r));
    return;
  }
  if (un(s) && !r) return;
  const o = s.shapeFlag & 4 ? Fn(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: c } = e,
    d = t && t.r,
    a = l.refs === ne ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (d != null &&
      d !== c &&
      (ae(d)
        ? ((a[d] = null), K(h, d) && (h[d] = null))
        : fe(d) && (d.value = null)),
    j(c))
  )
    it(c, l, 12, [i, a]);
  else {
    const g = ae(c),
      v = fe(c);
    if (g || v) {
      const A = () => {
        if (e.f) {
          const M = g ? (K(h, c) ? h[c] : a[c]) : c.value;
          r
            ? F(M) && ms(M, o)
            : F(M)
              ? M.includes(o) || M.push(o)
              : g
                ? ((a[c] = [o]), K(h, c) && (h[c] = a[c]))
                : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          g
            ? ((a[c] = i), K(h, c) && (h[c] = i))
            : v && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((A.id = -1), Ce(A, n)) : A();
    }
  }
}
const Ce = Ji;
function kl(e) {
  return Il(e);
}
function Il(e, t) {
  const n = Vr();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: d,
      setElementText: a,
      parentNode: h,
      nextSibling: g,
      setScopeId: v = Ie,
      insertStaticContent: A,
    } = e,
    M = (
      u,
      f,
      p,
      b = null,
      _ = null,
      C = null,
      S = void 0,
      x = null,
      E = !!f.dynamicChildren,
    ) => {
      if (u === f) return;
      u && !Nt(u, f) && ((b = m(u)), xe(u, _, C, !0), (u = null)),
        f.patchFlag === -2 && ((E = !1), (f.dynamicChildren = null));
      const { type: y, ref: P, shapeFlag: T } = f;
      switch (y) {
        case Ln:
          U(u, f, p, b);
          break;
        case gt:
          I(u, f, p, b);
          break;
        case fn:
          u == null && N(f, p, b, S);
          break;
        case he:
          Oe(u, f, p, b, _, C, S, x, E);
          break;
        default:
          T & 1
            ? G(u, f, p, b, _, C, S, x, E)
            : T & 6
              ? Pe(u, f, p, b, _, C, S, x, E)
              : (T & 64 || T & 128) && y.process(u, f, p, b, _, C, S, x, E, k);
      }
      P != null && _ && is(P, u && u.ref, C, f || u, !f);
    },
    U = (u, f, p, b) => {
      if (u == null) s((f.el = l(f.children)), p, b);
      else {
        const _ = (f.el = u.el);
        f.children !== u.children && d(_, f.children);
      }
    },
    I = (u, f, p, b) => {
      u == null ? s((f.el = c(f.children || "")), p, b) : (f.el = u.el);
    },
    N = (u, f, p, b) => {
      [u.el, u.anchor] = A(u.children, f, p, b, u.el, u.anchor);
    },
    $ = ({ el: u, anchor: f }, p, b) => {
      let _;
      for (; u && u !== f; ) (_ = g(u)), s(u, p, b), (u = _);
      s(f, p, b);
    },
    q = ({ el: u, anchor: f }) => {
      let p;
      for (; u && u !== f; ) (p = g(u)), r(u), (u = p);
      r(f);
    },
    G = (u, f, p, b, _, C, S, x, E) => {
      f.type === "svg" ? (S = "svg") : f.type === "math" && (S = "mathml"),
        u == null ? V(f, p, b, _, C, S, x, E) : D(u, f, _, C, S, x, E);
    },
    V = (u, f, p, b, _, C, S, x) => {
      let E, y;
      const { props: P, shapeFlag: T, transition: L, dirs: B } = u;
      if (
        ((E = u.el = i(u.type, C, P && P.is, P)),
        T & 8
          ? a(E, u.children)
          : T & 16 && H(u.children, E, null, b, _, zn(u, C), S, x),
        B && ut(u, null, b, "created"),
        ce(E, u, u.scopeId, S, b),
        P)
      ) {
        for (const te in P)
          te !== "value" &&
            !Vt(te) &&
            o(E, te, null, P[te], C, u.children, b, _, me);
        "value" in P && o(E, "value", null, P.value, C),
          (y = P.onVnodeBeforeMount) && Ve(y, b, u);
      }
      B && ut(u, null, b, "beforeMount");
      const z = Ll(_, L);
      z && L.beforeEnter(E),
        s(E, f, p),
        ((y = P && P.onVnodeMounted) || z || B) &&
          Ce(() => {
            y && Ve(y, b, u), z && L.enter(E), B && ut(u, null, b, "mounted");
          }, _);
    },
    ce = (u, f, p, b, _) => {
      if ((p && v(u, p), b)) for (let C = 0; C < b.length; C++) v(u, b[C]);
      if (_) {
        let C = _.subTree;
        if (f === C) {
          const S = _.vnode;
          ce(u, S, S.scopeId, S.slotScopeIds, _.parent);
        }
      }
    },
    H = (u, f, p, b, _, C, S, x, E = 0) => {
      for (let y = E; y < u.length; y++) {
        const P = (u[y] = x ? tt(u[y]) : je(u[y]));
        M(null, P, f, p, b, _, C, S, x);
      }
    },
    D = (u, f, p, b, _, C, S) => {
      const x = (f.el = u.el);
      let { patchFlag: E, dynamicChildren: y, dirs: P } = f;
      E |= u.patchFlag & 16;
      const T = u.props || ne,
        L = f.props || ne;
      let B;
      if (
        (p && at(p, !1),
        (B = L.onVnodeBeforeUpdate) && Ve(B, p, f, u),
        P && ut(f, u, p, "beforeUpdate"),
        p && at(p, !0),
        y
          ? ue(u.dynamicChildren, y, x, p, b, zn(f, _), C)
          : S || Q(u, f, x, null, p, b, zn(f, _), C, !1),
        E > 0)
      ) {
        if (E & 16) _e(x, f, T, L, p, b, _);
        else if (
          (E & 2 && T.class !== L.class && o(x, "class", null, L.class, _),
          E & 4 && o(x, "style", T.style, L.style, _),
          E & 8)
        ) {
          const z = f.dynamicProps;
          for (let te = 0; te < z.length; te++) {
            const oe = z[te],
              de = T[oe],
              Le = L[oe];
            (Le !== de || oe === "value") &&
              o(x, oe, de, Le, _, u.children, p, b, me);
          }
        }
        E & 1 && u.children !== f.children && a(x, f.children);
      } else !S && y == null && _e(x, f, T, L, p, b, _);
      ((B = L.onVnodeUpdated) || P) &&
        Ce(() => {
          B && Ve(B, p, f, u), P && ut(f, u, p, "updated");
        }, b);
    },
    ue = (u, f, p, b, _, C, S) => {
      for (let x = 0; x < f.length; x++) {
        const E = u[x],
          y = f[x],
          P =
            E.el && (E.type === he || !Nt(E, y) || E.shapeFlag & 70)
              ? h(E.el)
              : p;
        M(E, y, P, null, b, _, C, S, !0);
      }
    },
    _e = (u, f, p, b, _, C, S) => {
      if (p !== b) {
        if (p !== ne)
          for (const x in p)
            !Vt(x) && !(x in b) && o(u, x, p[x], null, S, f.children, _, C, me);
        for (const x in b) {
          if (Vt(x)) continue;
          const E = b[x],
            y = p[x];
          E !== y && x !== "value" && o(u, x, y, E, S, f.children, _, C, me);
        }
        "value" in b && o(u, "value", p.value, b.value, S);
      }
    },
    Oe = (u, f, p, b, _, C, S, x, E) => {
      const y = (f.el = u ? u.el : l("")),
        P = (f.anchor = u ? u.anchor : l(""));
      let { patchFlag: T, dynamicChildren: L, slotScopeIds: B } = f;
      B && (x = x ? x.concat(B) : B),
        u == null
          ? (s(y, p, b), s(P, p, b), H(f.children || [], p, P, _, C, S, x, E))
          : T > 0 && T & 64 && L && u.dynamicChildren
            ? (ue(u.dynamicChildren, L, p, _, C, S, x),
              (f.key != null || (_ && f === _.subTree)) && ko(u, f, !0))
            : Q(u, f, p, P, _, C, S, x, E);
    },
    Pe = (u, f, p, b, _, C, S, x, E) => {
      (f.slotScopeIds = x),
        u == null
          ? f.shapeFlag & 512
            ? _.ctx.activate(f, p, b, S, E)
            : ct(f, p, b, _, C, S, E)
          : Ae(u, f, E);
    },
    ct = (u, f, p, b, _, C, S) => {
      const x = (u.component = Hl(u, b, _));
      if ((yo(u) && (x.ctx.renderer = k), Dl(x), x.asyncDep)) {
        if ((_ && _.registerDep(x, X), !u.el)) {
          const E = (x.subTree = se(gt));
          I(null, E, f, p);
        }
      } else X(x, u, f, p, _, C, S);
    },
    Ae = (u, f, p) => {
      const b = (f.component = u.component);
      if (Gi(u, f, p))
        if (b.asyncDep && !b.asyncResolved) {
          ee(b, f, p);
          return;
        } else (b.next = f), zi(b.update), (b.effect.dirty = !0), b.update();
      else (f.el = u.el), (b.vnode = f);
    },
    X = (u, f, p, b, _, C, S) => {
      const x = () => {
          if (u.isMounted) {
            let { next: P, bu: T, u: L, parent: B, vnode: z } = u;
            {
              const yt = Io(u);
              if (yt) {
                P && ((P.el = z.el), ee(u, P, S)),
                  yt.asyncDep.then(() => {
                    u.isUnmounted || x();
                  });
                return;
              }
            }
            let te = P,
              oe;
            at(u, !1),
              P ? ((P.el = z.el), ee(u, P, S)) : (P = z),
              T && ln(T),
              (oe = P.props && P.props.onVnodeBeforeUpdate) && Ve(oe, B, P, z),
              at(u, !0);
            const de = jn(u),
              Le = u.subTree;
            (u.subTree = de),
              M(Le, de, h(Le.el), m(Le), u, _, C),
              (P.el = de.el),
              te === null && Xi(u, de.el),
              L && Ce(L, _),
              (oe = P.props && P.props.onVnodeUpdated) &&
                Ce(() => Ve(oe, B, P, z), _);
          } else {
            let P;
            const { el: T, props: L } = f,
              { bm: B, m: z, parent: te } = u,
              oe = un(f);
            if (
              (at(u, !1),
              B && ln(B),
              !oe && (P = L && L.onVnodeBeforeMount) && Ve(P, te, f),
              at(u, !0),
              T && re)
            ) {
              const de = () => {
                (u.subTree = jn(u)), re(T, u.subTree, u, _, null);
              };
              oe
                ? f.type.__asyncLoader().then(() => !u.isUnmounted && de())
                : de();
            } else {
              const de = (u.subTree = jn(u));
              M(null, de, p, b, u, _, C), (f.el = de.el);
            }
            if ((z && Ce(z, _), !oe && (P = L && L.onVnodeMounted))) {
              const de = f;
              Ce(() => Ve(P, te, de), _);
            }
            (f.shapeFlag & 256 ||
              (te && un(te.vnode) && te.vnode.shapeFlag & 256)) &&
              u.a &&
              Ce(u.a, _),
              (u.isMounted = !0),
              (f = p = b = null);
          }
        },
        E = (u.effect = new ys(x, Ie, () => ks(y), u.scope)),
        y = (u.update = () => {
          E.dirty && E.run();
        });
      (y.id = u.uid), at(u, !0), y();
    },
    ee = (u, f, p) => {
      f.component = u;
      const b = u.vnode.props;
      (u.vnode = f),
        (u.next = null),
        wl(u, f.props, b, p),
        Al(u, f.children, p),
        _t(),
        Gs(u),
        mt();
    },
    Q = (u, f, p, b, _, C, S, x, E = !1) => {
      const y = u && u.children,
        P = u ? u.shapeFlag : 0,
        T = f.children,
        { patchFlag: L, shapeFlag: B } = f;
      if (L > 0) {
        if (L & 128) {
          Ye(y, T, p, b, _, C, S, x, E);
          return;
        } else if (L & 256) {
          Ke(y, T, p, b, _, C, S, x, E);
          return;
        }
      }
      B & 8
        ? (P & 16 && me(y, _, C), T !== y && a(p, T))
        : P & 16
          ? B & 16
            ? Ye(y, T, p, b, _, C, S, x, E)
            : me(y, _, C, !0)
          : (P & 8 && a(p, ""), B & 16 && H(T, p, b, _, C, S, x, E));
    },
    Ke = (u, f, p, b, _, C, S, x, E) => {
      (u = u || Ot), (f = f || Ot);
      const y = u.length,
        P = f.length,
        T = Math.min(y, P);
      let L;
      for (L = 0; L < T; L++) {
        const B = (f[L] = E ? tt(f[L]) : je(f[L]));
        M(u[L], B, p, null, _, C, S, x, E);
      }
      y > P ? me(u, _, C, !0, !1, T) : H(f, p, b, _, C, S, x, E, T);
    },
    Ye = (u, f, p, b, _, C, S, x, E) => {
      let y = 0;
      const P = f.length;
      let T = u.length - 1,
        L = P - 1;
      for (; y <= T && y <= L; ) {
        const B = u[y],
          z = (f[y] = E ? tt(f[y]) : je(f[y]));
        if (Nt(B, z)) M(B, z, p, null, _, C, S, x, E);
        else break;
        y++;
      }
      for (; y <= T && y <= L; ) {
        const B = u[T],
          z = (f[L] = E ? tt(f[L]) : je(f[L]));
        if (Nt(B, z)) M(B, z, p, null, _, C, S, x, E);
        else break;
        T--, L--;
      }
      if (y > T) {
        if (y <= L) {
          const B = L + 1,
            z = B < P ? f[B].el : b;
          for (; y <= L; )
            M(null, (f[y] = E ? tt(f[y]) : je(f[y])), p, z, _, C, S, x, E), y++;
        }
      } else if (y > L) for (; y <= T; ) xe(u[y], _, C, !0), y++;
      else {
        const B = y,
          z = y,
          te = new Map();
        for (y = z; y <= L; y++) {
          const Se = (f[y] = E ? tt(f[y]) : je(f[y]));
          Se.key != null && te.set(Se.key, y);
        }
        let oe,
          de = 0;
        const Le = L - z + 1;
        let yt = !1,
          Bs = 0;
        const Ft = new Array(Le);
        for (y = 0; y < Le; y++) Ft[y] = 0;
        for (y = B; y <= T; y++) {
          const Se = u[y];
          if (de >= Le) {
            xe(Se, _, C, !0);
            continue;
          }
          let $e;
          if (Se.key != null) $e = te.get(Se.key);
          else
            for (oe = z; oe <= L; oe++)
              if (Ft[oe - z] === 0 && Nt(Se, f[oe])) {
                $e = oe;
                break;
              }
          $e === void 0
            ? xe(Se, _, C, !0)
            : ((Ft[$e - z] = y + 1),
              $e >= Bs ? (Bs = $e) : (yt = !0),
              M(Se, f[$e], p, null, _, C, S, x, E),
              de++);
        }
        const $s = yt ? Tl(Ft) : Ot;
        for (oe = $s.length - 1, y = Le - 1; y >= 0; y--) {
          const Se = z + y,
            $e = f[Se],
            Vs = Se + 1 < P ? f[Se + 1].el : b;
          Ft[y] === 0
            ? M(null, $e, p, Vs, _, C, S, x, E)
            : yt && (oe < 0 || y !== $s[oe] ? Be($e, p, Vs, 2) : oe--);
        }
      }
    },
    Be = (u, f, p, b, _ = null) => {
      const { el: C, type: S, transition: x, children: E, shapeFlag: y } = u;
      if (y & 6) {
        Be(u.component.subTree, f, p, b);
        return;
      }
      if (y & 128) {
        u.suspense.move(f, p, b);
        return;
      }
      if (y & 64) {
        S.move(u, f, p, k);
        return;
      }
      if (S === he) {
        s(C, f, p);
        for (let T = 0; T < E.length; T++) Be(E[T], f, p, b);
        s(u.anchor, f, p);
        return;
      }
      if (S === fn) {
        $(u, f, p);
        return;
      }
      if (b !== 2 && y & 1 && x)
        if (b === 0) x.beforeEnter(C), s(C, f, p), Ce(() => x.enter(C), _);
        else {
          const { leave: T, delayLeave: L, afterLeave: B } = x,
            z = () => s(C, f, p),
            te = () => {
              T(C, () => {
                z(), B && B();
              });
            };
          L ? L(C, z, te) : te();
        }
      else s(C, f, p);
    },
    xe = (u, f, p, b = !1, _ = !1) => {
      const {
        type: C,
        props: S,
        ref: x,
        children: E,
        dynamicChildren: y,
        shapeFlag: P,
        patchFlag: T,
        dirs: L,
      } = u;
      if ((x != null && is(x, null, p, u, !0), P & 256)) {
        f.ctx.deactivate(u);
        return;
      }
      const B = P & 1 && L,
        z = !un(u);
      let te;
      if ((z && (te = S && S.onVnodeBeforeUnmount) && Ve(te, f, u), P & 6))
        Jt(u.component, p, b);
      else {
        if (P & 128) {
          u.suspense.unmount(p, b);
          return;
        }
        B && ut(u, null, f, "beforeUnmount"),
          P & 64
            ? u.type.remove(u, f, p, _, k, b)
            : y && (C !== he || (T > 0 && T & 64))
              ? me(y, f, p, !1, !0)
              : ((C === he && T & 384) || (!_ && P & 16)) && me(E, f, p),
          b && bt(u);
      }
      ((z && (te = S && S.onVnodeUnmounted)) || B) &&
        Ce(() => {
          te && Ve(te, f, u), B && ut(u, null, f, "unmounted");
        }, p);
    },
    bt = (u) => {
      const { type: f, el: p, anchor: b, transition: _ } = u;
      if (f === he) {
        vt(p, b);
        return;
      }
      if (f === fn) {
        q(u);
        return;
      }
      const C = () => {
        r(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (u.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: S, delayLeave: x } = _,
          E = () => S(p, C);
        x ? x(u.el, C, E) : E();
      } else C();
    },
    vt = (u, f) => {
      let p;
      for (; u !== f; ) (p = g(u)), r(u), (u = p);
      r(f);
    },
    Jt = (u, f, p) => {
      const { bum: b, scope: _, update: C, subTree: S, um: x } = u;
      b && ln(b),
        _.stop(),
        C && ((C.active = !1), xe(S, u, f, p)),
        x && Ce(x, f),
        Ce(() => {
          u.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    me = (u, f, p, b = !1, _ = !1, C = 0) => {
      for (let S = C; S < u.length; S++) xe(u[S], f, p, b, _);
    },
    m = (u) =>
      u.shapeFlag & 6
        ? m(u.component.subTree)
        : u.shapeFlag & 128
          ? u.suspense.next()
          : g(u.anchor || u.el);
  let R = !1;
  const O = (u, f, p) => {
      u == null
        ? f._vnode && xe(f._vnode, null, null, !0)
        : M(f._vnode || null, u, f, null, null, null, p),
        R || ((R = !0), Gs(), fo(), (R = !1)),
        (f._vnode = u);
    },
    k = {
      p: M,
      um: xe,
      m: Be,
      r: bt,
      mt: ct,
      mc: H,
      pc: Q,
      pbc: ue,
      n: m,
      o: e,
    };
  let Z, re;
  return t && ([Z, re] = t(k)), { render: O, hydrate: Z, createApp: El(O, Z) };
}
function zn({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function at({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ll(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ko(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (F(s) && F(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = tt(r[o])), (l.el = i.el)),
        n || ko(i, l)),
        l.type === Ln && (l.el = i.el);
    }
}
function Tl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (((r = n[n.length - 1]), e[r] < d)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < d ? (o = l + 1) : (i = l);
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
function Io(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Io(t);
}
const Ml = (e) => e.__isTeleport,
  he = Symbol.for("v-fgt"),
  Ln = Symbol.for("v-txt"),
  gt = Symbol.for("v-cmt"),
  fn = Symbol.for("v-stc"),
  Ht = [];
let Me = null;
function Y(e = !1) {
  Ht.push((Me = e ? null : []));
}
function Fl() {
  Ht.pop(), (Me = Ht[Ht.length - 1] || null);
}
let Xt = 1;
function or(e) {
  Xt += e;
}
function Lo(e) {
  return (
    (e.dynamicChildren = Xt > 0 ? Me || Ot : null),
    Fl(),
    Xt > 0 && Me && Me.push(e),
    e
  );
}
function J(e, t, n, s, r, o) {
  return Lo(w(e, t, n, s, r, o, !0));
}
function To(e, t, n, s, r) {
  return Lo(se(e, t, n, s, r, !0));
}
function ls(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Tn = "__vInternal",
  Mo = ({ key: e }) => e ?? null,
  dn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ae(e) || fe(e) || j(e)
        ? { i: ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function w(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === he ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Mo(t),
    ref: t && dn(t),
    scopeId: go,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ye,
  };
  return (
    l
      ? (Ts(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= ae(n) ? 8 : 16),
    Xt > 0 &&
      !i &&
      Me &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Me.push(c),
    c
  );
}
const se = Nl;
function Nl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Yi) && (e = gt), ls(e))) {
    const l = kt(e, t, !0);
    return (
      n && Ts(l, n),
      Xt > 0 &&
        !o &&
        Me &&
        (l.shapeFlag & 6 ? (Me[Me.indexOf(e)] = l) : Me.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Xl(e) && (e = e.__vccOpts), t)) {
    t = Bl(t);
    let { class: l, style: c } = t;
    l && !ae(l) && (t.class = vs(l)),
      le(c) && (ro(c) && !F(c) && (c = ge({}, c)), (t.style = wn(c)));
  }
  const i = ae(e) ? 1 : Zi(e) ? 128 : Ml(e) ? 64 : le(e) ? 4 : j(e) ? 2 : 0;
  return w(e, t, n, s, r, i, o, !0);
}
function Bl(e) {
  return e ? (ro(e) || Tn in e ? ge({}, e) : e) : null;
}
function kt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? jl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Mo(l),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(dn(t)) : [r, dn(t)]) : dn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== he ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && kt(e.ssContent),
    ssFallback: e.ssFallback && kt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function $l(e = " ", t = 0) {
  return se(Ln, null, e, t);
}
function Vl(e, t) {
  const n = se(fn, null, e);
  return (n.staticCount = t), n;
}
function Te(e = "", t = !1) {
  return t ? (Y(), To(gt, null, e)) : se(gt, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean"
    ? se(gt)
    : F(e)
      ? se(he, null, e.slice())
      : typeof e == "object"
        ? tt(e)
        : se(Ln, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : kt(e);
}
function Ts(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (F(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Ts(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Tn in t)
        ? (t._ctx = ye)
        : r === 3 &&
          ye &&
          (ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    j(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [$l(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function jl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = vs([t.class, s.class]));
      else if (r === "style") t.style = wn([t.style, s.style]);
      else if (Cn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(F(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ve(e, t, n, s = null) {
  Fe(e, t, 7, [n, s]);
}
const Ul = Oo();
let zl = 0;
function Hl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Ul,
    o = {
      uid: zl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new zr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: wo(s, r),
      emitsOptions: po(s, r),
      emit: null,
      emitted: null,
      propsDefaults: ne,
      inheritAttrs: s.inheritAttrs,
      ctx: ne,
      data: ne,
      props: ne,
      attrs: ne,
      slots: ne,
      refs: ne,
      setupState: ne,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Ki.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let pe = null,
  vn,
  cs;
{
  const e = Vr(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  (vn = t("__VUE_INSTANCE_SETTERS__", (n) => (pe = n))),
    (cs = t("__VUE_SSR_SETTERS__", (n) => (Mn = n)));
}
const Zt = (e) => {
    const t = pe;
    return (
      vn(e),
      e.scope.on(),
      () => {
        e.scope.off(), vn(t);
      }
    );
  },
  ir = () => {
    pe && pe.scope.off(), vn(null);
  };
function Fo(e) {
  return e.vnode.shapeFlag & 4;
}
let Mn = !1;
function Dl(e, t = !1) {
  t && cs(t);
  const { props: n, children: s } = e.vnode,
    r = Fo(e);
  Sl(e, n, r, t), Pl(e, s);
  const o = r ? Kl(e, t) : void 0;
  return t && cs(!1), o;
}
function Kl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Pn(new Proxy(e.ctx, _l)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? ql(e) : null),
      o = Zt(e);
    _t();
    const i = it(s, e, 0, [e.props, r]);
    if ((mt(), o(), Nr(i))) {
      if ((i.then(ir, ir), t))
        return i
          .then((l) => {
            lr(e, l, t);
          })
          .catch((l) => {
            An(l, e, 0);
          });
      e.asyncDep = i;
    } else lr(e, i, t);
  } else No(e, t);
}
function lr(e, t, n) {
  j(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = co(t)),
    No(e, n);
}
let cr;
function No(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && cr && !s.render) {
      const r = s.template || Is(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          d = ge(ge({ isCustomElement: o, delimiters: l }, i), c);
        s.render = cr(r, d);
      }
    }
    e.render = s.render || Ie;
  }
  {
    const r = Zt(e);
    _t();
    try {
      ml(e);
    } finally {
      mt(), r();
    }
  }
}
function Wl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ee(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function ql(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Wl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Fn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(co(Pn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in zt) return zt[n](e);
        },
        has(t, n) {
          return n in t || n in zt;
        },
      }))
    );
}
function Gl(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Xl(e) {
  return j(e) && "__vccOpts" in e;
}
const ke = (e, t) => Ti(e, t, Mn);
function Bo(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? le(t) && !F(t)
      ? ls(t)
        ? se(e, null, [t])
        : se(e, t)
      : se(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && ls(n) && (n = [n]),
      se(e, t, n));
}
const Yl = "3.4.18";
/**
 * @vue/runtime-dom v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Ql = "http://www.w3.org/2000/svg",
  Zl = "http://www.w3.org/1998/Math/MathML",
  nt = typeof document < "u" ? document : null,
  ur = nt && nt.createElement("template"),
  Jl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === "svg"
          ? nt.createElementNS(Ql, e)
          : t === "mathml"
            ? nt.createElementNS(Zl, e)
            : nt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => nt.createTextNode(e),
    createComment: (e) => nt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => nt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        ur.innerHTML =
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e;
        const l = ur.content;
        if (s === "svg" || s === "mathml") {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  ec = Symbol("_vtc");
function tc(e, t, n) {
  const s = e[ec];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t);
}
const ar = Symbol("_vod"),
  nc = Symbol(""),
  sc = /(^|;)\s*display\s*:/;
function rc(e, t, n) {
  const s = e.style,
    r = ae(n),
    o = s.display;
  let i = !1;
  if (n && !r) {
    if (t && !ae(t)) for (const l in t) n[l] == null && us(s, l, "");
    for (const l in n) l === "display" && (i = !0), us(s, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = s[nc];
      l && (n += ";" + l), (s.cssText = n), (i = sc.test(n));
    }
  } else t && e.removeAttribute("style");
  ar in e && ((e[ar] = i ? s.display : ""), (s.display = o));
}
const fr = /\s*!important$/;
function us(e, t, n) {
  if (F(n)) n.forEach((s) => us(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = oc(e, t);
    fr.test(n)
      ? e.setProperty(Mt(s), n.replace(fr, ""), "important")
      : (e[s] = n);
  }
}
const dr = ["Webkit", "Moz", "ms"],
  Hn = {};
function oc(e, t) {
  const n = Hn[t];
  if (n) return n;
  let s = De(t);
  if (s !== "filter" && s in e) return (Hn[t] = s);
  s = Sn(s);
  for (let r = 0; r < dr.length; r++) {
    const o = dr[r] + s;
    if (o in e) return (Hn[t] = o);
  }
  return t;
}
const hr = "http://www.w3.org/1999/xlink";
function ic(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(hr, t.slice(6, t.length))
      : e.setAttributeNS(hr, t, n);
  else {
    const o = ai(t);
    n == null || (o && !jr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function lc(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const d = l === "OPTION" ? e.getAttribute("value") : e.value,
      a = n ?? "";
    d !== a && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const d = typeof e[t];
    d === "boolean"
      ? (n = jr(n))
      : n == null && d === "string"
        ? ((n = ""), (c = !0))
        : d === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function Ct(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function cc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const pr = Symbol("_vei");
function uc(e, t, n, s, r = null) {
  const o = e[pr] || (e[pr] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = ac(t);
    if (s) {
      const d = (o[t] = hc(s, r));
      Ct(e, l, d, c);
    } else i && (cc(e, l, i, c), (o[t] = void 0));
  }
}
const gr = /(?:Once|Passive|Capture)$/;
function ac(e) {
  let t;
  if (gr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(gr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Mt(e.slice(2)), t];
}
let Dn = 0;
const fc = Promise.resolve(),
  dc = () => Dn || (fc.then(() => (Dn = 0)), (Dn = Date.now()));
function hc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Fe(pc(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = dc()), n;
}
function pc(e, t) {
  if (F(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const _r = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  gc = (e, t, n, s, r, o, i, l, c) => {
    const d = r === "svg";
    t === "class"
      ? tc(e, s, d)
      : t === "style"
        ? rc(e, n, s)
        : Cn(t)
          ? _s(t) || uc(e, t, n, s, i)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : _c(e, t, s, d)
              )
            ? lc(e, t, s, o, i, l, c)
            : (t === "true-value"
                ? (e._trueValue = s)
                : t === "false-value" && (e._falseValue = s),
              ic(e, t, s, d));
  };
function _c(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && _r(t) && j(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return _r(t) && ae(n) ? !1 : t in e;
}
const mr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return F(t) ? (n) => ln(t, n) : t;
};
function mc(e) {
  e.target.composing = !0;
}
function br(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Kn = Symbol("_assign"),
  bc = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e[Kn] = mr(r);
      const o = s || (r.props && r.props.type === "number");
      Ct(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), o && (l = Qn(l)), e[Kn](l);
      }),
        n &&
          Ct(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (Ct(e, "compositionstart", mc),
          Ct(e, "compositionend", br),
          Ct(e, "change", br));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: r } },
      o,
    ) {
      if (((e[Kn] = mr(o)), e.composing)) return;
      const i = r || e.type === "number" ? Qn(e.value) : e.value,
        l = t ?? "";
      i !== l &&
        ((document.activeElement === e &&
          e.type !== "range" &&
          (n || (s && e.value.trim() === l))) ||
          (e.value = l));
    },
  },
  vc = ge({ patchProp: gc }, Jl);
let vr;
function yc() {
  return vr || (vr = kl(vc));
}
const xc = (...e) => {
  const t = yc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Ec(s);
      if (!r) return;
      const o = t._component;
      !j(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, Cc(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Cc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ec(e) {
  return ae(e) ? document.querySelector(e) : e;
}
var Oc = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ let $o;
const Nn = (e) => ($o = e),
  Vo = Symbol();
function as(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var Dt;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(Dt || (Dt = {}));
function Sc() {
  const e = Hr(!0),
    t = e.run(() => Rs({}));
  let n = [],
    s = [];
  const r = Pn({
    install(o) {
      Nn(r),
        (r._a = o),
        o.provide(Vo, r),
        (o.config.globalProperties.$pinia = r),
        s.forEach((i) => n.push(i)),
        (s = []);
    },
    use(o) {
      return !this._a && !Oc ? s.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return r;
}
const jo = () => {};
function yr(e, t, n, s = jo) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s());
  };
  return !n && Dr() && di(r), r;
}
function xt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const wc = (e) => e();
function fs(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, s) => e.set(s, n)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      r = e[n];
    as(r) && as(s) && e.hasOwnProperty(n) && !fe(s) && !ot(s)
      ? (e[n] = fs(r, s))
      : (e[n] = s);
  }
  return e;
}
const Rc = Symbol();
function Pc(e) {
  return !as(e) || !e.hasOwnProperty(Rc);
}
const { assign: Je } = Object;
function Ac(e) {
  return !!(fe(e) && e.effect);
}
function kc(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function d() {
    l || (n.state.value[e] = r ? r() : {});
    const a = Bi(n.state.value[e]);
    return Je(
      a,
      o,
      Object.keys(i || {}).reduce(
        (h, g) => (
          (h[g] = Pn(
            ke(() => {
              Nn(n);
              const v = n._s.get(e);
              return i[g].call(v, v);
            }),
          )),
          h
        ),
        {},
      ),
    );
  }
  return (c = Uo(e, d, t, n, s, !0)), c;
}
function Uo(e, t, n = {}, s, r, o) {
  let i;
  const l = Je({ actions: {} }, n),
    c = { deep: !0 };
  let d,
    a,
    h = [],
    g = [],
    v;
  const A = s.state.value[e];
  !o && !A && (s.state.value[e] = {}), Rs({});
  let M;
  function U(H) {
    let D;
    (d = a = !1),
      typeof H == "function"
        ? (H(s.state.value[e]),
          (D = { type: Dt.patchFunction, storeId: e, events: v }))
        : (fs(s.state.value[e], H),
          (D = { type: Dt.patchObject, payload: H, storeId: e, events: v }));
    const ue = (M = Symbol());
    As().then(() => {
      M === ue && (d = !0);
    }),
      (a = !0),
      xt(h, D, s.state.value[e]);
  }
  const I = o
    ? function () {
        const { state: D } = n,
          ue = D ? D() : {};
        this.$patch((_e) => {
          Je(_e, ue);
        });
      }
    : jo;
  function N() {
    i.stop(), (h = []), (g = []), s._s.delete(e);
  }
  function $(H, D) {
    return function () {
      Nn(s);
      const ue = Array.from(arguments),
        _e = [],
        Oe = [];
      function Pe(X) {
        _e.push(X);
      }
      function ct(X) {
        Oe.push(X);
      }
      xt(g, { args: ue, name: H, store: G, after: Pe, onError: ct });
      let Ae;
      try {
        Ae = D.apply(this && this.$id === e ? this : G, ue);
      } catch (X) {
        throw (xt(Oe, X), X);
      }
      return Ae instanceof Promise
        ? Ae.then((X) => (xt(_e, X), X)).catch(
            (X) => (xt(Oe, X), Promise.reject(X)),
          )
        : (xt(_e, Ae), Ae);
    };
  }
  const q = {
      _p: s,
      $id: e,
      $onAction: yr.bind(null, g),
      $patch: U,
      $reset: I,
      $subscribe(H, D = {}) {
        const ue = yr(h, H, D.detached, () => _e()),
          _e = i.run(() =>
            jt(
              () => s.state.value[e],
              (Oe) => {
                (D.flush === "sync" ? a : d) &&
                  H({ storeId: e, type: Dt.direct, events: v }, Oe);
              },
              Je({}, c, D),
            ),
          );
        return ue;
      },
      $dispose: N,
    },
    G = Qt(q);
  s._s.set(e, G);
  const ce = ((s._a && s._a.runWithContext) || wc)(() =>
    s._e.run(() => (i = Hr()).run(t)),
  );
  for (const H in ce) {
    const D = ce[H];
    if ((fe(D) && !Ac(D)) || ot(D))
      o ||
        (A && Pc(D) && (fe(D) ? (D.value = A[H]) : fs(D, A[H])),
        (s.state.value[e][H] = D));
    else if (typeof D == "function") {
      const ue = $(H, D);
      (ce[H] = ue), (l.actions[H] = D);
    }
  }
  return (
    Je(G, ce),
    Je(W(G), ce),
    Object.defineProperty(G, "$state", {
      get: () => s.state.value[e],
      set: (H) => {
        U((D) => {
          Je(D, H);
        });
      },
    }),
    s._p.forEach((H) => {
      Je(
        G,
        i.run(() => H({ store: G, app: s._a, pinia: s, options: l })),
      );
    }),
    A && o && n.hydrate && n.hydrate(G.$state, A),
    (d = !0),
    (a = !0),
    G
  );
}
function Ic(e, t, n) {
  let s, r;
  const o = typeof t == "function";
  typeof e == "string" ? ((s = e), (r = o ? n : t)) : ((r = e), (s = e.id));
  function i(l, c) {
    const d = Ol();
    return (
      (l = l || (d ? He(Vo, null) : null)),
      l && Nn(l),
      (l = $o),
      l._s.has(s) || (o ? Uo(s, t, r, l) : kc(s, r, l)),
      l._s.get(s)
    );
  }
  return (i.$id = s), i;
}
const Lc = {},
  Xe = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  };
function Tc(e, t, n, s, r, o) {
  const i = ze("router-view");
  return Y(), To(i);
}
const Mc = Xe(Lc, [["render", Tc]]),
  Fc = {},
  Nc = {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 119.88 119.88",
    style: { "enable-background": "new 0 0 119.88 119.88" },
    "xml:space": "preserve",
  },
  Bc = Vl(
    `<path d="M92.652,119.88H28.47c-6.042,0-10.956-4.914-10.956-10.952L8.423,66.246c-3.435-1.703-5.691-5.177-5.691-9.056\r
		c0-5.669,4.611-10.276,10.276-10.276h93.864c5.665,0,10.276,4.607,10.276,10.276c0,3.317-1.601,6.354-4.278,8.266l-9.337,44.166\r
		C103.608,114.966,98.694,119.88,92.652,119.88z M13.008,53.653c-1.948,0-3.536,1.588-3.536,3.536c0,1.536,1.11,2.896,2.703,3.3\r
		c1.242,0.316,2.194,1.316,2.457,2.571l9.547,45.175c0.075,3.018,1.966,4.905,4.291,4.905h64.182c2.325,0,4.217-1.887,4.217-4.212\r
		l9.71-46.289c0.211-1.018,0.882-1.878,1.808-2.334c1.246-0.605,2.023-1.808,2.023-3.115c0-1.948-1.588-3.536-3.537-3.536H13.008z"></path><path d="M37.123,100.121c0,1.304-1.067,2.371-2.371,2.371h-0.653c-1.304,0-2.371-1.067-2.371-2.371V72.368\r
		c0-1.304,1.067-2.371,2.371-2.371h0.653c1.304,0,2.371,1.067,2.371,2.371V100.121z"></path><path d="M54.483,100.121c0,1.304-1.067,2.371-2.371,2.371h-0.653c-1.304,0-2.372-1.067-2.372-2.371V72.368\r
		c0-1.304,1.067-2.371,2.372-2.371h0.653c1.304,0,2.371,1.067,2.371,2.371V100.121z"></path><path d="M71.844,100.121c0,1.304-1.067,2.371-2.371,2.371h-0.654c-1.304,0-2.371-1.067-2.371-2.371V72.368\r
		c0-1.304,1.067-2.371,2.371-2.371h0.654c1.304,0,2.371,1.067,2.371,2.371V100.121z"></path><path d="M89.205,100.121c0,1.304-1.067,2.371-2.371,2.371H86.18c-1.304,0-2.372-1.067-2.372-2.371V72.368\r
		c0-1.304,1.068-2.371,2.372-2.371h0.653c1.304,0,2.371,1.067,2.371,2.371V100.121z"></path><path d="M28.027,34.868c2.25-15.669,15.69-27.723,31.98-27.723c16.291,0,29.732,12.055,31.982,27.723c0.328,5.35,7.22,4.494,7.22,0\r
		C96.915,15.24,80.253,0,60.008,0c-20.244,0-36.907,15.24-39.2,34.868C20.807,40.433,28.115,40.647,28.027,34.868z"></path>`,
    6,
  ),
  $c = [Bc];
function Vc(e, t) {
  return Y(), J("svg", Nc, $c);
}
const jc = Xe(Fc, [["render", Vc]]),
  Uc = [
    { id: 1, title: "Brand 1", sort: "100", code: "brand_1" },
    { id: 2, title: "Brand 2", sort: "200", code: "brand_2" },
    { id: 3, title: "Brand 3", sort: "300", code: "brand_3" },
    { id: 4, title: "Brand 4", sort: "400", code: "brand_4" },
    { id: 5, title: "Brand 5", sort: "500", code: "brand_5" },
    { id: 6, title: "Brand 6", sort: "600", code: "brand_6" },
    { id: 7, title: "Brand 7", sort: "700", code: "brand_7" },
    { id: 8, title: "Brand 8", sort: "700", code: "brand_8" },
    { id: 9, title: "Brand 9", sort: "900", code: "brand_9" },
  ],
  Bn = Ic("Store", {
    state() {
      return { brands: [], statesOfConfigurableCards: [], basket: [] };
    },
  }),
  zc = {
    data() {
      return { isBrandButtonVisible: !1, brands_list: Uc, store: Bn() };
    },
    methods: {
      showAllBrands() {
        delete this.store.brandFilterId;
      },
      chooseFilter(e) {
        this.store.brandFilterId = e;
      },
    },
    mounted() {
      this.store.brands = this.brands_list;
    },
  },
  Hc = ["data-brand-button-visible"],
  Dc = ["data-brand-button-visible"],
  Kc = { class: "brands_list" },
  Wc = ["onClick"];
function qc(e, t, n, s, r, o) {
  return (
    Y(),
    J(
      he,
      null,
      [
        w(
          "button",
          {
            "data-brand-button-visible": r.isBrandButtonVisible,
            class: "brandButton",
            onClick:
              t[0] ||
              (t[0] = (i) =>
                (r.isBrandButtonVisible = !r.isBrandButtonVisible)),
          },
          " Brands ",
          8,
          Hc,
        ),
        w(
          "div",
          {
            class: "brands",
            "data-brand-button-visible": r.isBrandButtonVisible,
          },
          [
            w(
              "button",
              {
                onClick:
                  t[1] ||
                  (t[1] = (...i) => o.showAllBrands && o.showAllBrands(...i)),
                class: "allBrandsButton",
              },
              "All Brands:",
            ),
            w("div", Kc, [
              (Y(!0),
              J(
                he,
                null,
                Ut(
                  r.brands_list,
                  (i) => (
                    Y(),
                    J(
                      "button",
                      { onClick: (l) => o.chooseFilter(i.id) },
                      Re(i.title),
                      9,
                      Wc,
                    )
                  ),
                ),
                256,
              )),
            ]),
          ],
          8,
          Dc,
        ),
      ],
      64,
    )
  );
}
const Gc = Xe(zc, [["render", qc]]),
  Wn = [
    {
      type: "simple",
      id: 1,
      sku: "s1",
      title: "Product 1",
      regular_price: { currency: "USD", value: 27.12 },
      image: "/images/1.png",
      brand: 9,
    },
    {
      type: "configurable",
      id: 2,
      sku: "c1",
      title: "Product 2",
      regular_price: { currency: "USD", value: 54.21 },
      image: "/images/conf/default.png",
      configurable_options: [
        {
          attribute_id: 93,
          attribute_code: "color",
          label: "Color",
          values: [
            { label: "Red", value_index: 931, value: "#ff0000" },
            { label: "Blue", value_index: 932, value: "#0000ff" },
            { label: "Black", value_index: 933, value: "#000" },
          ],
        },
        {
          attribute_code: "size",
          attribute_id: 144,
          position: 0,
          id: 2,
          label: "Size",
          values: [
            { label: "M", value_index: 1441, value: 1 },
            { label: "L", value_index: 1442, value: 2 },
          ],
        },
      ],
      variants: [
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1441 },
          ],
          product: { id: 2001, sku: "c1-red-m", image: "/images/conf/red.png" },
        },
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1442 },
          ],
          product: { id: 2002, sku: "c1-red-l", image: "/images/conf/red.png" },
        },
        {
          attributes: [
            { code: "color", value_index: 932 },
            { code: "size", value_index: 1441 },
          ],
          product: {
            id: 2003,
            sku: "c1-blue-m",
            image: "/images/conf/blue.png",
          },
        },
        {
          attributes: [
            { code: "color", value_index: 933 },
            { code: "size", value_index: 1442 },
          ],
          product: {
            id: 2004,
            sku: "c1-black-l",
            image: "/images/conf/black.png",
          },
        },
      ],
      brand: 1,
    },
    {
      type: "simple",
      id: 3,
      sku: "s2",
      title: "Product 3",
      regular_price: { currency: "USD", value: 36.87 },
      image: "/images/2.png",
      brand: 8,
    },
    {
      type: "simple",
      id: 4,
      sku: "s3",
      title: "Product 4",
      regular_price: { currency: "USD", value: 28.91 },
      image: "/images/3.png",
      brand: 2,
    },
    {
      type: "simple",
      id: 5,
      sku: "s4",
      title: "Product 5",
      regular_price: { currency: "USD", value: 41.23 },
      image: "/images/4.png",
      brand: 7,
    },
    {
      type: "simple",
      id: 6,
      sku: "s5",
      title: "Product 6",
      regular_price: { currency: "USD", value: 88 },
      image: "/images/5.png",
      brand: 3,
    },
    {
      type: "simple",
      id: 7,
      sku: "s6",
      title: "Product 7",
      regular_price: { currency: "USD", value: 127.41 },
      image: "/images/6.png",
      brand: 6,
    },
    {
      type: "configurable",
      id: 8,
      sku: "c2",
      title: "Product 8",
      regular_price: { currency: "USD", value: 63.27 },
      image: "/images/conf/default.png",
      configurable_options: [
        {
          attribute_id: 93,
          attribute_code: "color",
          label: "Color",
          values: [
            { label: "Red", value_index: 931, value: "#ff0000" },
            { label: "Blue", value_index: 932, value: "#0000ff" },
            { label: "Black", value_index: 933, value: "#000" },
          ],
        },
        {
          attribute_code: "size",
          attribute_id: 144,
          position: 0,
          id: 2,
          label: "Size",
          values: [
            { label: "M", value_index: 1441, value: 1 },
            { label: "L", value_index: 1442, value: 2 },
          ],
        },
      ],
      variants: [
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1441 },
          ],
          product: { id: 8001, sku: "c2-red-m", image: "/images/conf/red.png" },
        },
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1442 },
          ],
          product: { id: 8002, sku: "c2-red-l", image: "/images/conf/red.png" },
        },
        {
          attributes: [
            { code: "color", value_index: 932 },
            { code: "size", value_index: 1441 },
          ],
          product: {
            id: 8003,
            sku: "c2-blue-m",
            image: "/images/conf/blue.png",
          },
        },
        {
          attributes: [
            { code: "color", value_index: 933 },
            { code: "size", value_index: 1442 },
          ],
          product: {
            id: 8004,
            sku: "c2-black-l",
            image: "/images/conf/black.png",
          },
        },
      ],
      brand: 4,
    },
    {
      type: "simple",
      id: 9,
      sku: "s7",
      title: "Product 9",
      regular_price: { currency: "USD", value: 123.4 },
      image: "/images/7.png",
      brand: 5,
    },
    {
      type: "configurable",
      id: 10,
      sku: "c3",
      title: "Product 10",
      regular_price: { currency: "USD", value: 68.273 },
      image: "/images/conf/default.png",
      configurable_options: [
        {
          attribute_id: 93,
          attribute_code: "color",
          label: "Color",
          values: [
            { label: "Red", value_index: 931, value: "#ff0000" },
            { label: "Blue", value_index: 932, value: "#0000ff" },
            { label: "Black", value_index: 933, value: "#000" },
          ],
        },
        {
          attribute_code: "size",
          attribute_id: 144,
          position: 0,
          id: 2,
          label: "Size",
          values: [
            { label: "M", value_index: 1441, value: 1 },
            { label: "L", value_index: 1442, value: 2 },
          ],
        },
      ],
      variants: [
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1441 },
          ],
          product: {
            id: 10001,
            sku: "c10-red-m",
            image: "/images/conf/red.png",
          },
        },
        {
          attributes: [
            { code: "color", value_index: 931 },
            { code: "size", value_index: 1442 },
          ],
          product: {
            id: 10002,
            sku: "c10-red-l",
            image: "/images/conf/red.png",
          },
        },
        {
          attributes: [
            { code: "color", value_index: 932 },
            { code: "size", value_index: 1441 },
          ],
          product: {
            id: 10003,
            sku: "c10-blue-m",
            image: "/images/conf/blue.png",
          },
        },
        {
          attributes: [
            { code: "color", value_index: 933 },
            { code: "size", value_index: 1442 },
          ],
          product: {
            id: 10004,
            sku: "c10-black-l",
            image: "/images/conf/black.png",
          },
        },
      ],
      brand: 3,
    },
    {
      type: "simple",
      id: 11,
      sku: "s8",
      title: "Product 11",
      regular_price: { currency: "USD", value: 92.32 },
      image: "/images/8.png",
      brand: 1,
    },
    {
      type: "simple",
      id: 12,
      sku: "s9",
      title: "Product 12",
      regular_price: { currency: "USD", value: 53.4 },
      image: "/images/9.png",
      brand: 2,
    },
  ],
  Xc = {},
  Yc = {
    "data-name": "Livello 1",
    id: "Livello_1",
    viewBox: "0 0 128 128",
    xmlns: "http://www.w3.org/2000/svg",
  },
  Qc = w(
    "path",
    {
      d: "M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z",
    },
    null,
    -1,
  ),
  Zc = w(
    "path",
    {
      d: "M90,61H67V38a3,3,0,0,0-6,0V61H38a3,3,0,0,0,0,6H61V90a3,3,0,0,0,6,0V67H90a3,3,0,0,0,0-6Z",
    },
    null,
    -1,
  ),
  Jc = [Qc, Zc];
function eu(e, t) {
  return Y(), J("svg", Yc, Jc);
}
const zo = Xe(Xc, [["render", eu]]),
  tu = {
    components: { Plus: zo },
    data() {
      return {
        filteredProductsList: Wn,
        productsList: Wn,
        store: Bn(),
        colorsElementsList: [],
      };
    },
    methods: {
      findBrand(e) {
        const t = this.store.brands.find((n) => n.id == e);
        return t != null && t.title ? t.title : "Brand not found";
      },
      hasAttribute(e, t) {
        return !!e.find((n) => n.attribute_code == t);
      },
      findAttribute(e, t) {
        return e.find((n) => n.attribute_code == t);
      },
      chooseImage(e) {
        if (e.configurable_options) {
          const t = this.findIndexOfConfigurableCard(e.id);
          return this.store.statesOfConfigurableCards[t].choosen_option
            .color_value
            ? `./src/data${this.store.statesOfConfigurableCards[t].image}`
            : `./src/data${e.image}`;
        } else return `./src/data${e.image}`;
      },
      findIndexOfConfigurableCard(e) {
        let t = 0;
        return (
          this.store.statesOfConfigurableCards.forEach((n, s) => {
            n.id == e && (t = s);
          }),
          t
        );
      },
      setStateOfDataAttribute(e, t, n) {
        const s = this.findIndexOfConfigurableCard(t);
        return !!(
          Object.keys(this.store.statesOfConfigurableCards[s].choosen_option)
            .length &&
          this.store.statesOfConfigurableCards[s].choosen_option[
            `${e}_value`
          ] == n
        );
      },
      setStateOfOption(e, t, n) {
        const s = this.findIndexOfConfigurableCard(t);
        return this.store.statesOfConfigurableCards[s][
          `available_${e}s`
        ].includes(n)
          ? !1
          : this.store.statesOfConfigurableCards[s][`available_${e}s`].length !=
              0;
      },
      setStateOfWarningMessage(e) {
        if (e.configurable_options) {
          const t = this.findIndexOfConfigurableCard(e.id);
          return (
            Object.keys(this.store.statesOfConfigurableCards[t].choosen_option)
              .length != 4
          );
        } else return !1;
      },
      findImage(e, t, n) {
        let s = "";
        return (
          t == null ||
            t.forEach((r) => {
              for (let o of r.attributes)
                if (o.value_index == n) {
                  (this.store.statesOfConfigurableCards[e].sku = r.product.sku),
                    (this.store.statesOfConfigurableCards[e].variant_id =
                      r.product.id),
                    (s = r.product.image);
                  break;
                }
            }),
          s
        );
      },
      findAvailableAttribute(e, t, n) {
        var r;
        const s = this.findIndexOfConfigurableCard(t.id);
        (r = t.variants) == null ||
          r.forEach((o) => {
            if (o.attributes.find((l) => l.value_index == n)) {
              const l = o.attributes.find((c) => c.code == e);
              l &&
                this.store.statesOfConfigurableCards[s][`available_${e}s`].push(
                  l.value_index,
                );
            }
          });
      },
      chooseOption(e, t, n) {
        var o, i, l, c;
        let s;
        const r = this.findIndexOfConfigurableCard(t.id);
        e == "size"
          ? ((s = "color"),
            (this.store.statesOfConfigurableCards[r].available_colors = []),
            (this.store.statesOfConfigurableCards[r].choosen_option.size_value =
              n),
            t.configurable_options &&
              (this.store.statesOfConfigurableCards[r].choosen_option.size =
                (i =
                  (o = this.findAttribute(t.configurable_options, e)) == null
                    ? void 0
                    : o.values.find((d) => d.value_index == n)) == null
                  ? void 0
                  : i.label))
          : ((s = "size"),
            (this.store.statesOfConfigurableCards[r].available_sizes = []),
            (this.store.statesOfConfigurableCards[
              r
            ].choosen_option.color_value = n),
            (this.store.statesOfConfigurableCards[r].image = this.findImage(
              r,
              t.variants,
              n,
            )),
            t.configurable_options &&
              (this.store.statesOfConfigurableCards[r].choosen_option.color =
                (c =
                  (l = this.findAttribute(t.configurable_options, e)) == null
                    ? void 0
                    : l.values.find((d) => d.value_index == n)) == null
                  ? void 0
                  : c.label)),
          this.findAvailableAttribute(s, t, n);
      },
      setVariant(e) {
        const t = this.findIndexOfConfigurableCard(e.id);
        if (e.variants)
          return {
            attributes: [
              {
                code: "color",
                value_index:
                  this.store.statesOfConfigurableCards[t].choosen_option
                    .color_value || -1,
                color:
                  this.store.statesOfConfigurableCards[t].choosen_option.color,
              },
              {
                code: "size",
                value_index:
                  this.store.statesOfConfigurableCards[t].choosen_option
                    .size_value || -1,
                size: this.store.statesOfConfigurableCards[t].choosen_option
                  .size,
              },
            ],
            product: {
              id: this.store.statesOfConfigurableCards[t].variant_id,
              sku: this.store.statesOfConfigurableCards[t].sku,
              image: this.store.statesOfConfigurableCards[t].image,
            },
          };
      },
      addProduct(e) {
        var s;
        const t = {
          id: e.id,
          title: e.title,
          regular_price: e.regular_price,
          brand: this.findBrand(e.brand),
          image: this.chooseImage(e),
          count: 1,
          variant: this.setVariant(e),
        };
        let n = !1;
        for (let r of this.store.basket)
          if (r.id == t.id) {
            n = !0;
            break;
          }
        if (n) {
          const r = this.store.basket.findIndex((o) => o.id == t.id);
          t.variant
            ? t.variant.product.id ==
              ((s = this.store.basket[r].variant) == null
                ? void 0
                : s.product.id)
              ? (this.store.basket[r].count += 1)
              : this.store.basket.push(t)
            : (this.store.basket[r].count += 1);
        } else this.store.basket.push(t);
      },
    },
    computed: {
      createStatesOfConfigurableCards() {
        return () => {
          let e = [];
          return (
            Wn.forEach((t) => {
              t.configurable_options &&
                e.push({
                  id: t.id,
                  available_colors: [],
                  available_sizes: [],
                  choosen_option: {},
                  image: t.image,
                  variant_id: t.id,
                  sku: t.sku,
                });
            }),
            e
          );
        };
      },
    },
    beforeMount() {
      this.store.statesOfConfigurableCards =
        this.createStatesOfConfigurableCards();
    },
    watch: {
      store: {
        handler(e) {
          e.brandFilterId
            ? (this.filteredProductsList = this.productsList.filter(
                (t) => t.brand == e.brandFilterId,
              ))
            : (this.filteredProductsList = this.productsList);
        },
        deep: !0,
      },
    },
  },
  nu = { class: "catalog" },
  su = w("h1", null, "Catalog:", -1),
  ru = { class: "catalog_list" },
  ou = { class: "card" },
  iu = ["src", "alt"],
  lu = { class: "infoBlock" },
  cu = { class: "info" },
  uu = { key: 0 },
  au = { key: 0, class: "colors" },
  fu = ["data-choosen-state"],
  du = ["onClick", "disabled"],
  hu = { key: 1, class: "sizes" },
  pu = ["disabled", "onClick", "data-choosen-state"],
  gu = { class: "buttonBlock" },
  _u = ["onClick", "disabled"],
  mu = { key: 0, class: "warningMessage" },
  bu = w("div", { class: "triangle" }, null, -1),
  vu = w("div", { class: "message" }, "choose option", -1),
  yu = [bu, vu];
function xu(e, t, n, s, r, o) {
  const i = ze("plus");
  return (
    Y(),
    J("div", nu, [
      su,
      w("div", ru, [
        (Y(!0),
        J(
          he,
          null,
          Ut(r.filteredProductsList, (l) => {
            var c, d;
            return (
              Y(),
              J("div", ou, [
                w("div", null, [
                  w(
                    "img",
                    { src: o.chooseImage(l), alt: l.title },
                    null,
                    8,
                    iu,
                  ),
                ]),
                w("div", lu, [
                  w("div", cu, [
                    w("h2", null, Re(l.title), 1),
                    w("p", null, Re(o.findBrand(l.brand)), 1),
                    w(
                      "p",
                      null,
                      Re(
                        new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: l.regular_price.currency,
                        }).format(l.regular_price.value),
                      ),
                      1,
                    ),
                    l.configurable_options
                      ? (Y(),
                        J("div", uu, [
                          l.configurable_options &&
                          o.hasAttribute(l.configurable_options, "color")
                            ? (Y(),
                              J("div", au, [
                                (Y(!0),
                                J(
                                  he,
                                  null,
                                  Ut(
                                    (c = o.findAttribute(
                                      l.configurable_options,
                                      "color",
                                    )) == null
                                      ? void 0
                                      : c.values,
                                    (a) => (
                                      Y(),
                                      J(
                                        "div",
                                        {
                                          class: "backgroundOfColorOption",
                                          "data-choosen-state":
                                            o.setStateOfDataAttribute(
                                              "color",
                                              l.id,
                                              a.value_index,
                                            ),
                                        },
                                        [
                                          w(
                                            "button",
                                            {
                                              class: "colorOption",
                                              style: wn({
                                                backgroundColor:
                                                  a.value.toString(),
                                              }),
                                              onClick: (h) =>
                                                o.chooseOption(
                                                  "color",
                                                  l,
                                                  a.value_index,
                                                ),
                                              disabled: o.setStateOfOption(
                                                "color",
                                                l.id,
                                                a.value_index,
                                              ),
                                            },
                                            null,
                                            12,
                                            du,
                                          ),
                                        ],
                                        8,
                                        fu,
                                      )
                                    ),
                                  ),
                                  256,
                                )),
                              ]))
                            : Te("", !0),
                          l.configurable_options &&
                          o.hasAttribute(l.configurable_options, "size")
                            ? (Y(),
                              J("div", hu, [
                                (Y(!0),
                                J(
                                  he,
                                  null,
                                  Ut(
                                    (d = o.findAttribute(
                                      l.configurable_options,
                                      "size",
                                    )) == null
                                      ? void 0
                                      : d.values,
                                    (a) => (
                                      Y(),
                                      J(
                                        "button",
                                        {
                                          class: "sizeOption",
                                          disabled: o.setStateOfOption(
                                            "size",
                                            l.id,
                                            a.value_index,
                                          ),
                                          onClick: (h) =>
                                            o.chooseOption(
                                              "size",
                                              l,
                                              a.value_index,
                                            ),
                                          "data-choosen-state":
                                            o.setStateOfDataAttribute(
                                              "size",
                                              l.id,
                                              a.value_index,
                                            ),
                                        },
                                        Re(a.label),
                                        9,
                                        pu,
                                      )
                                    ),
                                  ),
                                  256,
                                )),
                              ]))
                            : Te("", !0),
                        ]))
                      : Te("", !0),
                  ]),
                  w("div", gu, [
                    w(
                      "button",
                      {
                        class: "addButton",
                        onClick: (a) => o.addProduct(l),
                        disabled: o.setStateOfWarningMessage(l),
                      },
                      [se(i)],
                      8,
                      _u,
                    ),
                    o.setStateOfWarningMessage(l)
                      ? (Y(), J("div", mu, yu))
                      : Te("", !0),
                  ]),
                ]),
              ])
            );
          }),
          256,
        )),
      ]),
    ])
  );
}
const Cu = Xe(tu, [["render", xu]]),
  Eu = {
    components: { Basket: jc, BrandsComponent: Gc, CatalogComponent: Cu },
    data() {
      return { store: Bn() };
    },
    methods: {
      getCount() {
        return this.store.basket.reduce((e, t) => e + t.count, 0);
      },
    },
  },
  Ho =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAiCAQAAAD4kYM0AAAIEUlEQVRogeWaCWxURRjHq2I8EvGo7m67u91ryn1ZC0UUUFIRCKQYjmiQKknF24iIUVBQI6CAEAU5E8+AEKnEEEFMFJRUjQrIjSJXuVEKBWlpkf79z+xuu30zb19bmhTifoF2583M+77fzHfMQApS4iKsco2YIQ6IEnH8khCp50aRp1nRQqwUxxpsRYnYI8aLZnFGKUlwzRS45OS8GF7Lhubil0aYdbIzLp840eTGN0RKRecEWN80ypxbnHENaHLDGyoHRV+Cula0F2saacY/nXGNaXKzGy5V4qgoFucabb61zrgKTQND1eL0ijD88CKdf3wI8FvE0CNkK9beEa1H+IIARKiTV0lGXWZ62wnXDcyJBgNboo2S1gbz45JJVdxohXswFA9iMPqhG0f4NcStY3OZpIU2p7WHQBrf4rxspiV3U5tuGEj9BqMnW1z8nplsTH8nXH31QUF0xkYcwhEcwHbcQSjmyf24FTOxDzWf8ziMDejPJ4ngi3Ccs0VlL3Zjf/W3EuRzXybO2J/z7at+fggH8TuWYgw6GA2NqH1tWtBM9m+LF7EalTHd/sUOzOHSptsDOyJcTrhm68M8eILTn8ZOnOXP+2sZlAi1I7byeRX//gwfYglWYR0NrORq+mxwHabSQCkhmHF5uQui0OOwjuKcMnY7cuhOVlit8ACGo53BzQJcyvVqZDFWYBEK8Yf6dgy9+RYbXIUiJTmuK8QmfZgbCznxFDTna4C3+N00uYc7C/gbI2iGh308NDyDjpdNI2qvd9wZW9KEYo6ZwH5mZ/RiEJ/v4V5qFXvelphmK0NXcFTteYO4jeiruGP8mnZefK7AT+NeSqNuHiLNV56wlfrYuPZTTrja6lklzBfIlRiK6/AYf67lXjGF70yuODAR1yc8lYE6qPWOh/oMQpAKj8XNNqE+imsXIWZU9/AjFfPZegY9LPsriCycJK5cDVeA4aSEY6bipmo0Yb41l3iBl80boEp0csI1Sh/mxX2cshx3crdk86Vn0V1zA6lqF/XqR7h2NltbkxD3yj57datx7eb6J7qXn/GznO2DLW5kj8uDcey/RS1fYnsq3mH7Ji61IUtupq854PpaV9nNDQyG+jAlHSv5+2i+3g7Xo4ZnjY0rzF25m+35lihqjysdX7L/dNxiaU9DAdsrje7Lo2BKclxpPFpaBkW4k37glPOUSW68wt8LDUhkCJcu+y4jXKCOtVFDcYX4fW89cMmx29h/pLbzfcy8VXxSYPKJQU648nSFA7gdp6pV86OPyi1tDMHRQ6Sgq05iwBUqnFpDcWPh8lOnMrYPqqMzBtEJf7F/YoaOW5ejrBunb4BS4XfC9YGusIc1jgTUTgGKr+swQzERoossUzmrlEF/GZ7HXVTUXHTUD9cu7lyZBKISYLier97SzVIB2uGSS36GJYvupCHm3MOcaxoLVsu7V0SZ2OO6WuzUFXazgqpxvwhfuJbf5xgNDHL1xqmoEv1UsNJ5mMDsXLPuuGoyY5gLN1XNvlCrl+xwZTCHVlB6aikqxNmKVQjRcI12whUR5SaFv60V3N0MmCAGvTyI4vTQtIF4g6OOxaDNsC0D64qrgjltc0y2sFCVnyKODdYLVyV3ez1wdXfClWvaL9Lry1lO3kiTpDRnFSwNuNtQTEQlzD3moqEdWLCuVaYNtwFWV1wyIsZFngJO4VWm/gzt8GLvjF3pjOcN+S/ujFOtuMpE2AnXNF3daKI9yN0yCZOVTGR1f5Jt421NrFHeTUXlsWipTS1WV1x7aW4Wa75s7oWH+L2MscgUE+1whXg8O2pIDVGQMtS/ZA31G8XlTrjW6QpEI5fp85X9SStBPERldw6oT+ySB+QgJUBMq9nyibG6sy8kInRj4EltlCwk5GeEFf/sePqzw9VCnLW+Xr5G1itreN76oloK8SPkEVfUobryYDH7fneBuBILiTS6NvAPzxh6YWlfpqapE+M8Hnus+hWo0NLLGlqGOOEaqSvrQz9OdpgFgov045LKBF7BWGBN47pE2LtI5TBzpd8QXBFC+ZltHxkcPBmuZzlmv7r2SWxPxVy2r+OstZa+RPiccC3XlXUzVgFLLMZEiPF7tj9jgZBJ49wE5ONKScfxMz30UeWkXk03HJe80pugDi59tKLTHlcI7XGIo5bHIqo8+HtZv+Vz4YFR1uVcUXMsNONKFUf0veGjG8nrFasxUYyLLS8J4HG8zjprABN2DsNyL4xVKq5naWF224bhklBkNlukLYI9LnlqnKmi1E905hzusizqOYc+AsZC7UL7BSdc9+qqBhgfTpvCIDHmsX1frNKPw/VTlfinkim/Sv22h9isu6AGVzs6SLIs68UQNUftGykXazl5XWm9GQlykU7Z3HeF+TSets7hhAIlPxuYNbWSqKsTrlkmXLn4mCuQpZ0P5Y3ADLzPVaopFOXxpIAFx3sMqkX4jSniV3zKnZlNk+0ud+U807hLBpvuA2I69GCUmsJDUGKqkNeA86hbb4uhsuKfhQXoohWw0cXxca++iVUsdXdhJwPKXEa09vol9g5xVXJcV4pt5tWXhanJkSLqPtKa7dK57i66iJdmRmJ3qsHk/3TA3i72tuuTSR1cmtNlxjTTj/kR9U77jO1T0TVE/NHfPSawCxIv4024OorzyUyqv0QPw407Z2NqF05WBA1zwvV0UxtwEUkZz84OuFY1uZIXj6yu9e9iRlxFTa7kxSOvOeN6rsmVvHgkzxlXMzFdFIujLFX/zyL/M8pkcZkZ138pDBdBOzGOMgAAAABJRU5ErkJggg==",
  Ou = { class: "mainPageHeader" },
  Su = w("div", null, [w("img", { src: Ho, alt: "logo" })], -1),
  wu = { class: "basket" },
  Ru = { key: 0, class: "count_in_basket" },
  Pu = { class: "container" };
function Au(e, t, n, s, r, o) {
  const i = ze("basket"),
    l = ze("router-link"),
    c = ze("brands-component"),
    d = ze("catalog-component");
  return (
    Y(),
    J(
      he,
      null,
      [
        w("header", Ou, [
          Su,
          w("div", wu, [
            r.store.basket.length > 0
              ? (Y(), J("div", Ru, Re(o.getCount()), 1))
              : Te("", !0),
            se(
              l,
              { to: "/basket" },
              { default: mn(() => [w("button", null, [se(i)])]), _: 1 },
            ),
          ]),
        ]),
        w("div", Pu, [se(c), se(d)]),
      ],
      64,
    )
  );
}
const ku = Xe(Eu, [["render", Au]]),
  Iu = {},
  Lu = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
  Tu = w(
    "path",
    {
      d: "M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 27 L 5 28 L 6 28 L 13 28 L 14 28 L 14 27 L 14 18 L 18 18 L 18 27 L 18 28 L 19 28 L 26 28 L 27 28 L 27 27 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 L 16 2.59375 z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 17 L 20 16 L 19 16 L 13 16 L 12 16 L 12 17 L 12 26 L 7 26 L 7 14.4375 L 16 5.4375 z",
      color: "black",
      overflow: "visible",
    },
    null,
    -1,
  ),
  Mu = [Tu];
function Fu(e, t) {
  return Y(), J("svg", Lu, Mu);
}
const Nu = Xe(Iu, [["render", Fu]]),
  Bu = {},
  $u = { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none" },
  Vu = w(
    "path",
    {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M1.36474 0.218926C1.07355 -0.075661 0.601435 -0.0756609 0.310246 0.218926C0.0190565 0.513513 0.0190565 0.991134 0.310246 1.28572L2.94492 3.95114L0.216439 6.71146C-0.0747505 7.00604 -0.0747505 7.48366 0.216439 7.77825C0.507628 8.07284 0.97974 8.07284 1.27093 7.77825L3.99941 5.01793L6.72779 7.77815C7.01898 8.07274 7.49109 8.07274 7.78228 7.77815C8.07347 7.48356 8.07347 7.00594 7.78228 6.71136L5.0539 3.95114L7.68848 1.28582C7.97966 0.991235 7.97967 0.513615 7.68848 0.219027C7.39729 -0.0755597 6.92517 -0.0755594 6.63399 0.219027L3.99941 2.88434L1.36474 0.218926Z",
      fill: "red",
    },
    null,
    -1,
  ),
  ju = [Vu];
function Uu(e, t) {
  return Y(), J("svg", $u, ju);
}
const zu = Xe(Bu, [["render", Uu]]),
  Hu = {
    components: { Home: Nu, Union: zu, Plus: zo },
    data() {
      return { store: Bn() };
    },
    methods: {
      chooseImage(e) {
        return e.variant
          ? `./src/data${e.variant.product.image}`
          : `${e.image}`;
      },
      option(e, t) {
        if (t.variant) {
          for (let n of t.variant.attributes) if (n.code == e) return n[`${e}`];
        }
      },
      deleteProduct(e) {
        const t = this.store.basket.findIndex((n) => n.id == e.id);
        this.store.basket.splice(t, 1);
      },
      checkBellowOneCount(e) {
        e.count < 1 &&
          setTimeout(() => {
            this.deleteProduct(e);
          }, 500);
      },
      getTotalPrice() {
        return this.store.basket.reduce(
          (e, t) => e + t.regular_price.value * t.count,
          0,
        );
      },
      changeCount(e, t) {
        e.count = Math.abs(Number(t.target.value));
      },
    },
  },
  Du = { class: "basketHeader" },
  Ku = w("div", null, [w("img", { src: Ho, alt: "logo" })], -1),
  Wu = { class: "basketContainer" },
  qu = w("h1", { class: "shpppingCart" }, "Shopping Cart", -1),
  Gu = { class: "basketBody" },
  Xu = { class: "basketProductList" },
  Yu = { key: 0, class: "headOfTable" },
  Qu = w(
    "div",
    { class: "item" },
    [w("h2", { class: "itemHead" }, "Item")],
    -1,
  ),
  Zu = w(
    "div",
    { class: "rightSideOfHeadOfTable" },
    [
      w("h2", null, "Price"),
      w("h2", null, "Quantity"),
      w("h2", null, "Total"),
      w("div", { class: "space" }),
    ],
    -1,
  ),
  Ju = [Qu, Zu],
  ea = { key: 1, class: "emptyBasket" },
  ta = w("p", null, "No products in basket", -1),
  na = w("p", null, "Add some ...", -1),
  sa = { class: "product" },
  ra = { class: "item" },
  oa = { class: "image" },
  ia = ["src", "alt"],
  la = { class: "productInfo" },
  ca = { key: 0 },
  ua = { key: 1 },
  aa = ["onClick"],
  fa = w(
    "div",
    { class: "rightSideOfHeadOfTableForSizeLessThan768px" },
    [w("h2", null, "Price"), w("h2", null, "Quantity"), w("h2", null, "Total")],
    -1,
  ),
  da = { class: "rightSideOfHeadOfTable" },
  ha = { class: "quantity" },
  pa = ["onUpdate:modelValue", "onBlur", "onChange"],
  ga = ["onClick"],
  _a = { key: 0, class: "totalPrice" },
  ma = { key: 0, class: "bueButton" };
function ba(e, t, n, s, r, o) {
  const i = ze("home"),
    l = ze("router-link"),
    c = ze("plus"),
    d = ze("union");
  return (
    Y(),
    J(
      he,
      null,
      [
        w("header", Du, [
          w("div", null, [
            se(
              l,
              { to: "/" },
              { default: mn(() => [w("button", null, [se(i)])]), _: 1 },
            ),
          ]),
          Ku,
        ]),
        w("div", Wu, [
          qu,
          w("div", Gu, [
            w("div", Xu, [
              r.store.basket.length > 0 ? (Y(), J("div", Yu, Ju)) : Te("", !0),
              r.store.basket.length == 0
                ? (Y(),
                  J("div", ea, [
                    ta,
                    na,
                    se(
                      l,
                      { to: "/" },
                      { default: mn(() => [w("button", null, [se(c)])]), _: 1 },
                    ),
                  ]))
                : Te("", !0),
              (Y(!0),
              J(
                he,
                null,
                Ut(
                  r.store.basket,
                  (a) => (
                    Y(),
                    J("div", sa, [
                      w("div", ra, [
                        w("div", oa, [
                          w(
                            "img",
                            { src: o.chooseImage(a), alt: a.brand },
                            null,
                            8,
                            ia,
                          ),
                        ]),
                        w("div", la, [
                          w("h2", null, Re(a.title), 1),
                          w("p", null, [w("span", null, Re(a.brand), 1)]),
                          a.variant
                            ? (Y(),
                              J(
                                "p",
                                ca,
                                " Color: " + Re(o.option("color", a)),
                                1,
                              ))
                            : Te("", !0),
                          a.variant
                            ? (Y(),
                              J("p", ua, "Size: " + Re(o.option("size", a)), 1))
                            : Te("", !0),
                        ]),
                        w(
                          "button",
                          {
                            class: "unionForSizeLessThan768px",
                            onClick: (h) => o.deleteProduct(a),
                          },
                          [se(d)],
                          8,
                          aa,
                        ),
                      ]),
                      fa,
                      w("div", da, [
                        w(
                          "h2",
                          null,
                          Re(
                            new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: a.regular_price.currency,
                            }).format(a.regular_price.value),
                          ),
                          1,
                        ),
                        w("div", ha, [
                          sl(
                            w(
                              "input",
                              {
                                type: "number",
                                "onUpdate:modelValue": (h) => (a.count = h),
                                onBlur: (h) => o.checkBellowOneCount(a),
                                onChange: (h) => o.changeCount(a, h),
                              },
                              null,
                              40,
                              pa,
                            ),
                            [[bc, a.count]],
                          ),
                        ]),
                        w(
                          "h2",
                          null,
                          Re(
                            new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: a.regular_price.currency,
                            }).format(a.regular_price.value * a.count),
                          ),
                          1,
                        ),
                        w(
                          "button",
                          {
                            class: "union",
                            onClick: (h) => o.deleteProduct(a),
                          },
                          [se(d)],
                          8,
                          ga,
                        ),
                      ]),
                    ])
                  ),
                ),
                256,
              )),
            ]),
            r.store.basket.length > 0
              ? (Y(),
                J(
                  "h1",
                  _a,
                  " Total: " +
                    Re(
                      new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "USD",
                      }).format(o.getTotalPrice()),
                    ),
                  1,
                ))
              : Te("", !0),
            w("div", null, [
              r.store.basket.length > 0
                ? (Y(), J("button", ma, "Bue"))
                : Te("", !0),
            ]),
          ]),
        ]),
      ],
      64,
    )
  );
}
const va = Xe(Hu, [["render", ba]]);
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Et = typeof window < "u";
function ya(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ie = Object.assign;
function qn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Ne(r) ? r.map(e) : e(r);
  }
  return n;
}
const Kt = () => {},
  Ne = Array.isArray,
  xa = /\/$/,
  Ca = (e) => e.replace(xa, "");
function Gn(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (r = e(o))),
    l > -1 && ((s = s || t.slice(0, l)), (i = t.slice(l, t.length))),
    (s = wa(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
  );
}
function Ea(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Oa(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    It(t.matched[s], n.matched[r]) &&
    Do(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function It(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Do(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Sa(e[n], t[n])) return !1;
  return !0;
}
function Sa(e, t) {
  return Ne(e) ? xr(e, t) : Ne(t) ? xr(t, e) : e === t;
}
function xr(e, t) {
  return Ne(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function wa(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < s.length; i++)
    if (((l = s[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    s.slice(i - (i === s.length ? 1 : 0)).join("/")
  );
}
var Yt;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Yt || (Yt = {}));
var yn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(yn || (yn = {}));
const Xn = "";
function Ra(e) {
  if (!e)
    if (Et) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ca(e);
}
const Pa = /^[^#]+#/;
function Aa(e, t) {
  return e.replace(Pa, "#") + t;
}
function ka(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const Ia = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function La(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = ka(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset,
      );
}
function Cr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ds = new Map();
function Ta(e, t) {
  ds.set(e, t);
}
function Ma(e) {
  const t = ds.get(e);
  return ds.delete(e), t;
}
function Fa(e = "") {
  let t = [],
    n = [Xn],
    s = 0;
  e = Ra(e);
  function r(l) {
    s++, s !== n.length && n.splice(s), n.push(l);
  }
  function o(l, c, { direction: d, delta: a }) {
    const h = { direction: d, delta: a, type: Yt.pop };
    for (const g of t) g(l, c, h);
  }
  const i = {
    location: Xn,
    state: {},
    base: e,
    createHref: Aa.bind(null, e),
    replace(l) {
      n.splice(s--, 1), r(l);
    },
    push(l, c) {
      r(l);
    },
    listen(l) {
      return (
        t.push(l),
        () => {
          const c = t.indexOf(l);
          c > -1 && t.splice(c, 1);
        }
      );
    },
    destroy() {
      (t = []), (n = [Xn]), (s = 0);
    },
    go(l, c = !0) {
      const d = this.location,
        a = l < 0 ? yn.back : yn.forward;
      (s = Math.max(0, Math.min(s + l, n.length - 1))),
        c && o(this.location, d, { direction: a, delta: l });
    },
  };
  return (
    Object.defineProperty(i, "location", { enumerable: !0, get: () => n[s] }), i
  );
}
function Na(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Ko(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Ze = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Wo = Symbol("");
var Er;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Er || (Er = {}));
function Lt(e, t) {
  return ie(new Error(), { type: e, [Wo]: !0 }, t);
}
function We(e, t) {
  return e instanceof Error && Wo in e && (t == null || !!(e.type & t));
}
const Or = "[^/]+?",
  Ba = { sensitive: !1, strict: !1, start: !0, end: !0 },
  $a = /[.+*?^${}()[\]/\\]/g;
function Va(e, t) {
  const n = ie({}, Ba, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const a = d.length ? [] : [90];
    n.strict && !d.length && (r += "/");
    for (let h = 0; h < d.length; h++) {
      const g = d[h];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (g.type === 0)
        h || (r += "/"), (r += g.value.replace($a, "\\$&")), (v += 40);
      else if (g.type === 1) {
        const { value: A, repeatable: M, optional: U, regexp: I } = g;
        o.push({ name: A, repeatable: M, optional: U });
        const N = I || Or;
        if (N !== Or) {
          v += 10;
          try {
            new RegExp(`(${N})`);
          } catch (q) {
            throw new Error(
              `Invalid custom RegExp for param "${A}" (${N}): ` + q.message,
            );
          }
        }
        let $ = M ? `((?:${N})(?:/(?:${N}))*)` : `(${N})`;
        h || ($ = U && d.length < 2 ? `(?:/${$})` : "/" + $),
          U && ($ += "?"),
          (r += $),
          (v += 20),
          U && (v += -8),
          M && (v += -20),
          N === ".*" && (v += -50);
      }
      a.push(v);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(d) {
    const a = d.match(i),
      h = {};
    if (!a) return null;
    for (let g = 1; g < a.length; g++) {
      const v = a[g] || "",
        A = o[g - 1];
      h[A.name] = v && A.repeatable ? v.split("/") : v;
    }
    return h;
  }
  function c(d) {
    let a = "",
      h = !1;
    for (const g of e) {
      (!h || !a.endsWith("/")) && (a += "/"), (h = !1);
      for (const v of g)
        if (v.type === 0) a += v.value;
        else if (v.type === 1) {
          const { value: A, repeatable: M, optional: U } = v,
            I = A in d ? d[A] : "";
          if (Ne(I) && !M)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const N = Ne(I) ? I.join("/") : I;
          if (!N)
            if (U)
              g.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${A}"`);
          a += N;
        }
    }
    return a || "/";
  }
  return { re: i, score: s, keys: o, parse: l, stringify: c };
}
function ja(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0;
}
function Ua(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = ja(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Sr(s)) return 1;
    if (Sr(r)) return -1;
  }
  return r.length - s.length;
}
function Sr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const za = { type: 0, value: "" },
  Ha = /[a-zA-Z0-9_]/;
function Da(e) {
  if (!e) return [[]];
  if (e === "/") return [[za]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${d}": ${v}`);
  }
  let n = 0,
    s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), (o = []);
  }
  let l = 0,
    c,
    d = "",
    a = "";
  function h() {
    d &&
      (n === 0
        ? o.push({ type: 0, value: d })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (c === "*" || c === "+") &&
              t(
                `A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: 1,
              value: d,
              regexp: a,
              repeatable: c === "*" || c === "+",
              optional: c === "*" || c === "?",
            }))
          : t("Invalid state to consume buffer"),
      (d = ""));
  }
  function g() {
    d += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (s = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (d && h(), i()) : c === ":" ? (h(), (n = 1)) : g();
        break;
      case 4:
        g(), (n = s);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Ha.test(c)
            ? g()
            : (h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        h(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (a = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${d}"`), h(), i(), r;
}
function Ka(e, t, n) {
  const s = Va(Da(e.path), n),
    r = ie(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Wa(e, t) {
  const n = [],
    s = new Map();
  t = Pr({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(a) {
    return s.get(a);
  }
  function o(a, h, g) {
    const v = !g,
      A = qa(a);
    A.aliasOf = g && g.record;
    const M = Pr(t, a),
      U = [A];
    if ("alias" in a) {
      const $ = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const q of $)
        U.push(
          ie({}, A, {
            components: g ? g.record.components : A.components,
            path: q,
            aliasOf: g ? g.record : A,
          }),
        );
    }
    let I, N;
    for (const $ of U) {
      const { path: q } = $;
      if (h && q[0] !== "/") {
        const G = h.record.path,
          V = G[G.length - 1] === "/" ? "" : "/";
        $.path = h.record.path + (q && V + q);
      }
      if (
        ((I = Ka($, h, M)),
        g
          ? g.alias.push(I)
          : ((N = N || I),
            N !== I && N.alias.push(I),
            v && a.name && !Rr(I) && i(a.name)),
        A.children)
      ) {
        const G = A.children;
        for (let V = 0; V < G.length; V++) o(G[V], I, g && g.children[V]);
      }
      (g = g || I),
        ((I.record.components && Object.keys(I.record.components).length) ||
          I.record.name ||
          I.record.redirect) &&
          c(I);
    }
    return N
      ? () => {
          i(N);
        }
      : Kt;
  }
  function i(a) {
    if (Ko(a)) {
      const h = s.get(a);
      h &&
        (s.delete(a),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(a);
      h > -1 &&
        (n.splice(h, 1),
        a.record.name && s.delete(a.record.name),
        a.children.forEach(i),
        a.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(a) {
    let h = 0;
    for (
      ;
      h < n.length &&
      Ua(a, n[h]) >= 0 &&
      (a.record.path !== n[h].record.path || !qo(a, n[h]));

    )
      h++;
    n.splice(h, 0, a), a.record.name && !Rr(a) && s.set(a.record.name, a);
  }
  function d(a, h) {
    let g,
      v = {},
      A,
      M;
    if ("name" in a && a.name) {
      if (((g = s.get(a.name)), !g)) throw Lt(1, { location: a });
      (M = g.record.name),
        (v = ie(
          wr(
            h.params,
            g.keys.filter((N) => !N.optional).map((N) => N.name),
          ),
          a.params &&
            wr(
              a.params,
              g.keys.map((N) => N.name),
            ),
        )),
        (A = g.stringify(v));
    } else if ("path" in a)
      (A = a.path),
        (g = n.find((N) => N.re.test(A))),
        g && ((v = g.parse(A)), (M = g.record.name));
    else {
      if (((g = h.name ? s.get(h.name) : n.find((N) => N.re.test(h.path))), !g))
        throw Lt(1, { location: a, currentLocation: h });
      (M = g.record.name),
        (v = ie({}, h.params, a.params)),
        (A = g.stringify(v));
    }
    const U = [];
    let I = g;
    for (; I; ) U.unshift(I.record), (I = I.parent);
    return { name: M, path: A, params: v, matched: U, meta: Xa(U) };
  }
  return (
    e.forEach((a) => o(a)),
    {
      addRoute: o,
      resolve: d,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: r,
    }
  );
}
function wr(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function qa(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Ga(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Ga(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Rr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Xa(e) {
  return e.reduce((t, n) => ie(t, n.meta), {});
}
function Pr(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function qo(e, t) {
  return t.children.some((n) => n === e || qo(e, n));
}
const Go = /#/g,
  Ya = /&/g,
  Qa = /\//g,
  Za = /=/g,
  Ja = /\?/g,
  Xo = /\+/g,
  ef = /%5B/g,
  tf = /%5D/g,
  Yo = /%5E/g,
  nf = /%60/g,
  Qo = /%7B/g,
  sf = /%7C/g,
  Zo = /%7D/g,
  rf = /%20/g;
function Ms(e) {
  return encodeURI("" + e)
    .replace(sf, "|")
    .replace(ef, "[")
    .replace(tf, "]");
}
function of(e) {
  return Ms(e).replace(Qo, "{").replace(Zo, "}").replace(Yo, "^");
}
function hs(e) {
  return Ms(e)
    .replace(Xo, "%2B")
    .replace(rf, "+")
    .replace(Go, "%23")
    .replace(Ya, "%26")
    .replace(nf, "`")
    .replace(Qo, "{")
    .replace(Zo, "}")
    .replace(Yo, "^");
}
function lf(e) {
  return hs(e).replace(Za, "%3D");
}
function cf(e) {
  return Ms(e).replace(Go, "%23").replace(Ja, "%3F");
}
function uf(e) {
  return e == null ? "" : cf(e).replace(Qa, "%2F");
}
function xn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function af(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Xo, " "),
      i = o.indexOf("="),
      l = xn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : xn(o.slice(i + 1));
    if (l in t) {
      let d = t[l];
      Ne(d) || (d = t[l] = [d]), d.push(c);
    } else t[l] = c;
  }
  return t;
}
function Ar(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = lf(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ne(s) ? s.map((o) => o && hs(o)) : [s && hs(s)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function ff(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = Ne(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
          ? s
          : "" + s);
  }
  return t;
}
const df = Symbol(""),
  kr = Symbol(""),
  Fs = Symbol(""),
  Jo = Symbol(""),
  ps = Symbol("");
function Bt() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function st(e, t, n, s, r) {
  const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((i, l) => {
      const c = (h) => {
          h === !1
            ? l(Lt(4, { from: n, to: t }))
            : h instanceof Error
              ? l(h)
              : Na(h)
                ? l(Lt(2, { from: t, to: h }))
                : (o &&
                    s.enterCallbacks[r] === o &&
                    typeof h == "function" &&
                    o.push(h),
                  i());
        },
        d = e.call(s && s.instances[r], t, n, c);
      let a = Promise.resolve(d);
      e.length < 3 && (a = a.then(c)), a.catch((h) => l(h));
    });
}
function Yn(e, t, n, s) {
  const r = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (hf(l)) {
          const d = (l.__vccOpts || l)[t];
          d && r.push(st(d, n, s, o, i));
        } else {
          let c = l();
          r.push(() =>
            c.then((d) => {
              if (!d)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`),
                );
              const a = ya(d) ? d.default : d;
              o.components[i] = a;
              const g = (a.__vccOpts || a)[t];
              return g && st(g, n, s, o, i)();
            }),
          );
        }
    }
  return r;
}
function hf(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Ir(e) {
  const t = He(Fs),
    n = He(Jo),
    s = ke(() => t.resolve(wt(e.to))),
    r = ke(() => {
      const { matched: c } = s.value,
        { length: d } = c,
        a = c[d - 1],
        h = n.matched;
      if (!a || !h.length) return -1;
      const g = h.findIndex(It.bind(null, a));
      if (g > -1) return g;
      const v = Lr(c[d - 2]);
      return d > 1 && Lr(a) === v && h[h.length - 1].path !== v
        ? h.findIndex(It.bind(null, c[d - 2]))
        : g;
    }),
    o = ke(() => r.value > -1 && mf(n.params, s.value.params)),
    i = ke(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Do(n.params, s.value.params),
    );
  function l(c = {}) {
    return _f(c)
      ? t[wt(e.replace) ? "replace" : "push"](wt(e.to)).catch(Kt)
      : Promise.resolve();
  }
  return {
    route: s,
    href: ke(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
const pf = vo({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Ir,
    setup(e, { slots: t }) {
      const n = Qt(Ir(e)),
        { options: s } = He(Fs),
        r = ke(() => ({
          [Tr(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Tr(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Bo(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o,
            );
      };
    },
  }),
  gf = pf;
function _f(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function mf(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!Ne(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function Lr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Tr = (e, t, n) => e ?? t ?? n,
  bf = vo({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = He(ps),
        r = ke(() => e.route || s.value),
        o = He(kr, 0),
        i = ke(() => {
          let d = wt(o);
          const { matched: a } = r.value;
          let h;
          for (; (h = a[d]) && !h.components; ) d++;
          return d;
        }),
        l = ke(() => r.value.matched[i.value]);
      an(
        kr,
        ke(() => i.value + 1),
      ),
        an(df, l),
        an(ps, r);
      const c = Rs();
      return (
        jt(
          () => [c.value, l.value, e.name],
          ([d, a, h], [g, v, A]) => {
            a &&
              ((a.instances[h] = d),
              v &&
                v !== a &&
                d &&
                d === g &&
                (a.leaveGuards.size || (a.leaveGuards = v.leaveGuards),
                a.updateGuards.size || (a.updateGuards = v.updateGuards))),
              d &&
                a &&
                (!v || !It(a, v) || !g) &&
                (a.enterCallbacks[h] || []).forEach((M) => M(d));
          },
          { flush: "post" },
        ),
        () => {
          const d = r.value,
            a = e.name,
            h = l.value,
            g = h && h.components[a];
          if (!g) return Mr(n.default, { Component: g, route: d });
          const v = h.props[a],
            A = v
              ? v === !0
                ? d.params
                : typeof v == "function"
                  ? v(d)
                  : v
              : null,
            U = Bo(
              g,
              ie({}, A, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (h.instances[a] = null);
                },
                ref: c,
              }),
            );
          return Mr(n.default, { Component: U, route: d }) || U;
        }
      );
    },
  });
function Mr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const vf = bf;
function yf(e) {
  const t = Wa(e.routes, e),
    n = e.parseQuery || af,
    s = e.stringifyQuery || Ar,
    r = e.history,
    o = Bt(),
    i = Bt(),
    l = Bt(),
    c = Mi(Ze);
  let d = Ze;
  Et &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = qn.bind(null, (m) => "" + m),
    h = qn.bind(null, uf),
    g = qn.bind(null, xn);
  function v(m, R) {
    let O, k;
    return (
      Ko(m) ? ((O = t.getRecordMatcher(m)), (k = R)) : (k = m), t.addRoute(k, O)
    );
  }
  function A(m) {
    const R = t.getRecordMatcher(m);
    R && t.removeRoute(R);
  }
  function M() {
    return t.getRoutes().map((m) => m.record);
  }
  function U(m) {
    return !!t.getRecordMatcher(m);
  }
  function I(m, R) {
    if (((R = ie({}, R || c.value)), typeof m == "string")) {
      const f = Gn(n, m, R.path),
        p = t.resolve({ path: f.path }, R),
        b = r.createHref(f.fullPath);
      return ie(f, p, {
        params: g(p.params),
        hash: xn(f.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let O;
    if ("path" in m) O = ie({}, m, { path: Gn(n, m.path, R.path).path });
    else {
      const f = ie({}, m.params);
      for (const p in f) f[p] == null && delete f[p];
      (O = ie({}, m, { params: h(f) })), (R.params = h(R.params));
    }
    const k = t.resolve(O, R),
      Z = m.hash || "";
    k.params = a(g(k.params));
    const re = Ea(s, ie({}, m, { hash: of(Z), path: k.path })),
      u = r.createHref(re);
    return ie(
      { fullPath: re, hash: Z, query: s === Ar ? ff(m.query) : m.query || {} },
      k,
      { redirectedFrom: void 0, href: u },
    );
  }
  function N(m) {
    return typeof m == "string" ? Gn(n, m, c.value.path) : ie({}, m);
  }
  function $(m, R) {
    if (d !== m) return Lt(8, { from: R, to: m });
  }
  function q(m) {
    return ce(m);
  }
  function G(m) {
    return q(ie(N(m), { replace: !0 }));
  }
  function V(m) {
    const R = m.matched[m.matched.length - 1];
    if (R && R.redirect) {
      const { redirect: O } = R;
      let k = typeof O == "function" ? O(m) : O;
      return (
        typeof k == "string" &&
          ((k = k.includes("?") || k.includes("#") ? (k = N(k)) : { path: k }),
          (k.params = {})),
        ie(
          { query: m.query, hash: m.hash, params: "path" in k ? {} : m.params },
          k,
        )
      );
    }
  }
  function ce(m, R) {
    const O = (d = I(m)),
      k = c.value,
      Z = m.state,
      re = m.force,
      u = m.replace === !0,
      f = V(O);
    if (f)
      return ce(
        ie(N(f), {
          state: typeof f == "object" ? ie({}, Z, f.state) : Z,
          force: re,
          replace: u,
        }),
        R || O,
      );
    const p = O;
    p.redirectedFrom = R;
    let b;
    return (
      !re &&
        Oa(s, k, O) &&
        ((b = Lt(16, { to: p, from: k })), Be(k, k, !0, !1)),
      (b ? Promise.resolve(b) : ue(p, k))
        .catch((_) => (We(_) ? (We(_, 2) ? _ : Ye(_)) : Q(_, p, k)))
        .then((_) => {
          if (_) {
            if (We(_, 2))
              return ce(
                ie({ replace: u }, N(_.to), {
                  state: typeof _.to == "object" ? ie({}, Z, _.to.state) : Z,
                  force: re,
                }),
                R || p,
              );
          } else _ = Oe(p, k, !0, u, Z);
          return _e(p, k, _), _;
        })
    );
  }
  function H(m, R) {
    const O = $(m, R);
    return O ? Promise.reject(O) : Promise.resolve();
  }
  function D(m) {
    const R = vt.values().next().value;
    return R && typeof R.runWithContext == "function"
      ? R.runWithContext(m)
      : m();
  }
  function ue(m, R) {
    let O;
    const [k, Z, re] = xf(m, R);
    O = Yn(k.reverse(), "beforeRouteLeave", m, R);
    for (const f of k)
      f.leaveGuards.forEach((p) => {
        O.push(st(p, m, R));
      });
    const u = H.bind(null, m, R);
    return (
      O.push(u),
      me(O)
        .then(() => {
          O = [];
          for (const f of o.list()) O.push(st(f, m, R));
          return O.push(u), me(O);
        })
        .then(() => {
          O = Yn(Z, "beforeRouteUpdate", m, R);
          for (const f of Z)
            f.updateGuards.forEach((p) => {
              O.push(st(p, m, R));
            });
          return O.push(u), me(O);
        })
        .then(() => {
          O = [];
          for (const f of re)
            if (f.beforeEnter)
              if (Ne(f.beforeEnter))
                for (const p of f.beforeEnter) O.push(st(p, m, R));
              else O.push(st(f.beforeEnter, m, R));
          return O.push(u), me(O);
        })
        .then(
          () => (
            m.matched.forEach((f) => (f.enterCallbacks = {})),
            (O = Yn(re, "beforeRouteEnter", m, R)),
            O.push(u),
            me(O)
          ),
        )
        .then(() => {
          O = [];
          for (const f of i.list()) O.push(st(f, m, R));
          return O.push(u), me(O);
        })
        .catch((f) => (We(f, 8) ? f : Promise.reject(f)))
    );
  }
  function _e(m, R, O) {
    l.list().forEach((k) => D(() => k(m, R, O)));
  }
  function Oe(m, R, O, k, Z) {
    const re = $(m, R);
    if (re) return re;
    const u = R === Ze,
      f = Et ? history.state : {};
    O &&
      (k || u
        ? r.replace(m.fullPath, ie({ scroll: u && f && f.scroll }, Z))
        : r.push(m.fullPath, Z)),
      (c.value = m),
      Be(m, R, O, u),
      Ye();
  }
  let Pe;
  function ct() {
    Pe ||
      (Pe = r.listen((m, R, O) => {
        if (!Jt.listening) return;
        const k = I(m),
          Z = V(k);
        if (Z) {
          ce(ie(Z, { replace: !0 }), k).catch(Kt);
          return;
        }
        d = k;
        const re = c.value;
        Et && Ta(Cr(re.fullPath, O.delta), Ia()),
          ue(k, re)
            .catch((u) =>
              We(u, 12)
                ? u
                : We(u, 2)
                  ? (ce(u.to, k)
                      .then((f) => {
                        We(f, 20) &&
                          !O.delta &&
                          O.type === Yt.pop &&
                          r.go(-1, !1);
                      })
                      .catch(Kt),
                    Promise.reject())
                  : (O.delta && r.go(-O.delta, !1), Q(u, k, re)),
            )
            .then((u) => {
              (u = u || Oe(k, re, !1)),
                u &&
                  (O.delta && !We(u, 8)
                    ? r.go(-O.delta, !1)
                    : O.type === Yt.pop && We(u, 20) && r.go(-1, !1)),
                _e(k, re, u);
            })
            .catch(Kt);
      }));
  }
  let Ae = Bt(),
    X = Bt(),
    ee;
  function Q(m, R, O) {
    Ye(m);
    const k = X.list();
    return (
      k.length ? k.forEach((Z) => Z(m, R, O)) : console.error(m),
      Promise.reject(m)
    );
  }
  function Ke() {
    return ee && c.value !== Ze
      ? Promise.resolve()
      : new Promise((m, R) => {
          Ae.add([m, R]);
        });
  }
  function Ye(m) {
    return (
      ee ||
        ((ee = !m),
        ct(),
        Ae.list().forEach(([R, O]) => (m ? O(m) : R())),
        Ae.reset()),
      m
    );
  }
  function Be(m, R, O, k) {
    const { scrollBehavior: Z } = e;
    if (!Et || !Z) return Promise.resolve();
    const re =
      (!O && Ma(Cr(m.fullPath, 0))) ||
      ((k || !O) && history.state && history.state.scroll) ||
      null;
    return As()
      .then(() => Z(m, R, re))
      .then((u) => u && La(u))
      .catch((u) => Q(u, m, R));
  }
  const xe = (m) => r.go(m);
  let bt;
  const vt = new Set(),
    Jt = {
      currentRoute: c,
      listening: !0,
      addRoute: v,
      removeRoute: A,
      hasRoute: U,
      getRoutes: M,
      resolve: I,
      options: e,
      push: q,
      replace: G,
      go: xe,
      back: () => xe(-1),
      forward: () => xe(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: X.add,
      isReady: Ke,
      install(m) {
        const R = this;
        m.component("RouterLink", gf),
          m.component("RouterView", vf),
          (m.config.globalProperties.$router = R),
          Object.defineProperty(m.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => wt(c),
          }),
          Et &&
            !bt &&
            c.value === Ze &&
            ((bt = !0), q(r.location).catch((Z) => {}));
        const O = {};
        for (const Z in Ze)
          Object.defineProperty(O, Z, {
            get: () => c.value[Z],
            enumerable: !0,
          });
        m.provide(Fs, R), m.provide(Jo, no(O)), m.provide(ps, c);
        const k = m.unmount;
        vt.add(m),
          (m.unmount = function () {
            vt.delete(m),
              vt.size < 1 &&
                ((d = Ze),
                Pe && Pe(),
                (Pe = null),
                (c.value = Ze),
                (bt = !1),
                (ee = !1)),
              k();
          });
      },
    };
  function me(m) {
    return m.reduce((R, O) => R.then(() => D(O)), Promise.resolve());
  }
  return Jt;
}
function xf(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((d) => It(d, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((d) => It(d, c)) || r.push(c));
  }
  return [n, s, r];
}
const Cf = [
    { path: "/", component: ku },
    { path: "/basket", component: va },
  ],
  Ef = yf({ routes: Cf, history: Fa() }),
  Ns = xc(Mc);
Ns.use(Ef);
Ns.use(Sc());
Ns.mount("#app");
