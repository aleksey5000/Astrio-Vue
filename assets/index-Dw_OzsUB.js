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
const re = {},
  wt = [],
  ke = () => {},
  ti = () => !1,
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
  ni = Object.prototype.hasOwnProperty,
  K = (e, t) => ni.call(e, t),
  F = Array.isArray,
  St = (e) => En(e) === "[object Map]",
  Nr = (e) => En(e) === "[object Set]",
  U = (e) => typeof e == "function",
  ae = (e) => typeof e == "string",
  Tt = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  Br = (e) => (le(e) || U(e)) && U(e.then) && U(e.catch),
  $r = Object.prototype.toString,
  En = (e) => $r.call(e),
  si = (e) => En(e).slice(8, -1),
  Vr = (e) => En(e) === "[object Object]",
  bs = (e) =>
    ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Vt = gs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  wn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  ri = /-(\w)/g,
  De = wn((e) => e.replace(ri, (t, n) => (n ? n.toUpperCase() : ""))),
  oi = /\B([A-Z])/g,
  Mt = wn((e) => e.replace(oi, "-$1").toLowerCase()),
  Sn = wn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Vn = wn((e) => (e ? `on${Sn(e)}` : "")),
  lt = (e, t) => !Object.is(e, t),
  cn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  pn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Qn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Vs;
const jr = () =>
  Vs ||
  (Vs =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function On(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ae(s) ? ui(s) : On(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (ae(e) || le(e)) return e;
}
const ii = /;(?![^(]*\))/g,
  li = /:([^]+)/,
  ci = /\/\*[^]*?\*\//g;
function ui(e) {
  const t = {};
  return (
    e
      .replace(ci, "")
      .split(ii)
      .forEach((n) => {
        if (n) {
          const s = n.split(li);
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
const ai =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  fi = gs(ai);
function Ur(e) {
  return !!e || e === "";
}
const Pe = (e) =>
    ae(e)
      ? e
      : e == null
        ? ""
        : F(e) || (le(e) && (e.toString === $r || !U(e.toString)))
          ? JSON.stringify(e, Hr, 2)
          : String(e),
  Hr = (e, t) =>
    t && t.__v_isRef
      ? Hr(e, t.value)
      : St(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], o) => ((n[jn(s, o) + " =>"] = r), n),
              {},
            ),
          }
        : Nr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => jn(n)) }
          : Tt(t)
            ? jn(t)
            : le(t) && !F(t) && !Vr(t)
              ? String(t)
              : t,
  jn = (e, t = "") => {
    var n;
    return Tt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Oe;
class zr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Oe),
      !t && Oe && (this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Oe;
      try {
        return (Oe = this), t();
      } finally {
        Oe = n;
      }
    }
  }
  on() {
    Oe = this;
  }
  off() {
    Oe = this.parent;
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
function Dr(e) {
  return new zr(e);
}
function di(e, t = Oe) {
  t && t.active && t.effects.push(e);
}
function Kr() {
  return Oe;
}
function hi(e) {
  Oe && Oe.cleanups.push(e);
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
      di(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      (this._dirtyLevel = 1), _t();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (pi(n.computed), this._dirtyLevel >= 4)) break;
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
      return (rt = !0), (ht = this), this._runnings++, js(this), this.fn();
    } finally {
      Us(this), this._runnings--, (ht = n), (rt = t);
    }
  }
  stop() {
    var t;
    this.active &&
      (js(this),
      Us(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1));
  }
}
function pi(e) {
  return e.value;
}
function js(e) {
  e._trackId++, (e._depsLength = 0);
}
function Us(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Wr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Wr(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let rt = !0,
  Zn = 0;
const qr = [];
function _t() {
  qr.push(rt), (rt = !1);
}
function mt() {
  const e = qr.pop();
  rt = e === void 0 ? !0 : e;
}
function xs() {
  Zn++;
}
function Cs() {
  for (Zn--; !Zn && Jn.length; ) Jn.shift()();
}
function Gr(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && Wr(s, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const Jn = [];
function Xr(e, t, n) {
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
const Yr = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  gn = new WeakMap(),
  pt = Symbol(""),
  es = Symbol("");
function Ee(e, t, n) {
  if (rt && ht) {
    let s = gn.get(e);
    s || gn.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Yr(() => s.delete(n)))), Gr(ht, r);
  }
}
function qe(e, t, n, s, r, o) {
  const i = gn.get(e);
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
  for (const c of l) c && Xr(c, 4);
  Cs();
}
function gi(e, t) {
  var n;
  return (n = gn.get(e)) == null ? void 0 : n.get(t);
}
const _i = gs("__proto__,__v_isRef,__isVue"),
  Qr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Tt),
  ),
  Hs = mi();
function mi() {
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
function bi(e) {
  const t = W(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class Zr {
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
      return s === (r ? (o ? ki : no) : o ? to : eo).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = F(t);
    if (!r) {
      if (i && K(Hs, n)) return Reflect.get(Hs, n, s);
      if (n === "hasOwnProperty") return bi;
    }
    const l = Reflect.get(t, n, s);
    return (Tt(n) ? Qr.has(n) : _i(n)) || (r || Ee(t, "get", n), o)
      ? l
      : fe(l)
        ? i && bs(n)
          ? l
          : l.value
        : le(l)
          ? r
            ? ro(l)
            : Zt(l)
          : l;
  }
}
class Jr extends Zr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._shallow) {
      const c = At(o);
      if (
        (!_n(s) && !At(s) && ((o = W(o)), (s = W(s))), !F(t) && fe(o) && !fe(s))
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
    return (!Tt(n) || !Qr.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(t, "iterate", F(t) ? "length" : pt), Reflect.ownKeys(t);
  }
}
class vi extends Zr {
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
const yi = new Jr(),
  xi = new vi(),
  Ci = new Jr(!0),
  Es = (e) => e,
  Pn = (e) => Reflect.getPrototypeOf(e);
function tn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = W(e),
    o = W(t);
  n || (lt(t, o) && Ee(r, "get", t), Ee(r, "get", o));
  const { has: i } = Pn(r),
    l = s ? Es : n ? Os : qt;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function nn(e, t = !1) {
  const n = this.__v_raw,
    s = W(n),
    r = W(e);
  return (
    t || (lt(e, r) && Ee(s, "has", e), Ee(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function sn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ee(W(e), "iterate", pt), Reflect.get(e, "size", e)
  );
}
function zs(e) {
  e = W(e);
  const t = W(this);
  return Pn(t).has.call(t, e) || (t.add(e), qe(t, "add", e, e)), this;
}
function Ds(e, t) {
  t = W(t);
  const n = W(this),
    { has: s, get: r } = Pn(n);
  let o = s.call(n, e);
  o || ((e = W(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? lt(t, i) && qe(n, "set", e, t) : qe(n, "add", e, t), this
  );
}
function Ks(e) {
  const t = W(this),
    { has: n, get: s } = Pn(t);
  let r = n.call(t, e);
  r || ((e = W(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && qe(t, "delete", e, void 0), o;
}
function Ws() {
  const e = W(this),
    t = e.size !== 0,
    n = e.clear();
  return t && qe(e, "clear", void 0, void 0), n;
}
function rn(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = W(i),
      c = t ? Es : e ? Os : qt;
    return (
      !e && Ee(l, "iterate", pt), i.forEach((d, a) => s.call(r, c(d), c(a), o))
    );
  };
}
function on(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = W(r),
      i = St(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      d = r[e](...s),
      a = n ? Es : t ? Os : qt;
    return (
      !t && Ee(o, "iterate", c ? es : pt),
      {
        next() {
          const { value: h, done: p } = d.next();
          return p
            ? { value: h, done: p }
            : { value: l ? [a(h[0]), a(h[1])] : a(h), done: p };
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
function Ei() {
  const e = {
      get(o) {
        return tn(this, o);
      },
      get size() {
        return sn(this);
      },
      has: nn,
      add: zs,
      set: Ds,
      delete: Ks,
      clear: Ws,
      forEach: rn(!1, !1),
    },
    t = {
      get(o) {
        return tn(this, o, !1, !0);
      },
      get size() {
        return sn(this);
      },
      has: nn,
      add: zs,
      set: Ds,
      delete: Ks,
      clear: Ws,
      forEach: rn(!1, !0),
    },
    n = {
      get(o) {
        return tn(this, o, !0);
      },
      get size() {
        return sn(this, !0);
      },
      has(o) {
        return nn.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: rn(!0, !1),
    },
    s = {
      get(o) {
        return tn(this, o, !0, !0);
      },
      get size() {
        return sn(this, !0);
      },
      has(o) {
        return nn.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: rn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = on(o, !1, !1)),
        (n[o] = on(o, !0, !1)),
        (t[o] = on(o, !1, !0)),
        (s[o] = on(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [wi, Si, Oi, Pi] = Ei();
function ws(e, t) {
  const n = t ? (e ? Pi : Oi) : e ? Si : wi;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(K(n, r) && r in s ? n : s, r, o);
}
const Ri = { get: ws(!1, !1) },
  Ai = { get: ws(!1, !0) },
  Li = { get: ws(!0, !1) },
  eo = new WeakMap(),
  to = new WeakMap(),
  no = new WeakMap(),
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
function Ti(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ii(si(e));
}
function Zt(e) {
  return At(e) ? e : Ss(e, !1, yi, Ri, eo);
}
function so(e) {
  return Ss(e, !1, Ci, Ai, to);
}
function ro(e) {
  return Ss(e, !0, xi, Li, no);
}
function Ss(e, t, n, s, r) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = Ti(e);
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
function _n(e) {
  return !!(e && e.__v_isShallow);
}
function oo(e) {
  return ot(e) || At(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function Rn(e) {
  return Object.isExtensible(e) && pn(e, "__v_skip", !0), e;
}
const qt = (e) => (le(e) ? Zt(e) : e),
  Os = (e) => (le(e) ? ro(e) : e);
class io {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new ys(
        () => t(this._value),
        () => un(this, this.effect._dirtyLevel === 2 ? 2 : 3),
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
        un(t, 4),
      lo(t),
      t.effect._dirtyLevel >= 2 && un(t, 2),
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
function Mi(e, t, n = !1) {
  let s, r;
  const o = U(e);
  return (
    o ? ((s = e), (r = ke)) : ((s = e.get), (r = e.set)),
    new io(s, r, o || !r, n)
  );
}
function lo(e) {
  var t;
  rt &&
    ht &&
    ((e = W(e)),
    Gr(
      ht,
      (t = e.dep) != null
        ? t
        : (e.dep = Yr(() => (e.dep = void 0), e instanceof io ? e : void 0)),
    ));
}
function un(e, t = 4, n) {
  e = W(e);
  const s = e.dep;
  s && Xr(s, t);
}
function fe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ps(e) {
  return co(e, !1);
}
function Fi(e) {
  return co(e, !0);
}
function co(e, t) {
  return fe(e) ? e : new Ni(e, t);
}
class Ni {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : W(t)),
      (this._value = n ? t : qt(t));
  }
  get value() {
    return lo(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || _n(t) || At(t);
    (t = n ? t : W(t)),
      lt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : qt(t)), un(this, 4));
  }
}
function Ot(e) {
  return fe(e) ? e.value : e;
}
const Bi = {
  get: (e, t, n) => Ot(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function uo(e) {
  return ot(e) ? e : new Proxy(e, Bi);
}
function $i(e) {
  const t = F(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = ji(e, n);
  return t;
}
class Vi {
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
    return gi(W(this._object), this._key);
  }
}
function ji(e, t, n) {
  const s = e[t];
  return fe(s) ? s : new Vi(e, t, n);
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
  if (U(e)) {
    const o = it(e, t, n, s);
    return (
      o &&
        Br(o) &&
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
  Ui(e, n, r, s);
}
function Ui(e, t, n, s = !0) {
  console.error(e);
}
let Gt = !1,
  ts = !1;
const be = [];
let Ue = 0;
const Pt = [];
let et = null,
  ft = 0;
const ao = Promise.resolve();
let Rs = null;
function As(e) {
  const t = Rs || ao;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hi(e) {
  let t = Ue + 1,
    n = be.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = be[s],
      o = Xt(r);
    o < e || (o === e && r.pre) ? (t = s + 1) : (n = s);
  }
  return t;
}
function Ls(e) {
  (!be.length || !be.includes(e, Gt && e.allowRecurse ? Ue + 1 : Ue)) &&
    (e.id == null ? be.push(e) : be.splice(Hi(e.id), 0, e), fo());
}
function fo() {
  !Gt && !ts && ((ts = !0), (Rs = ao.then(po)));
}
function zi(e) {
  const t = be.indexOf(e);
  t > Ue && be.splice(t, 1);
}
function Di(e) {
  F(e)
    ? Pt.push(...e)
    : (!et || !et.includes(e, e.allowRecurse ? ft + 1 : ft)) && Pt.push(e),
    fo();
}
function qs(e, t, n = Gt ? Ue + 1 : 0) {
  for (; n < be.length; n++) {
    const s = be[n];
    if (s && s.pre) {
      if (e && s.id !== e.uid) continue;
      be.splice(n, 1), n--, s();
    }
  }
}
function ho(e) {
  if (Pt.length) {
    const t = [...new Set(Pt)].sort((n, s) => Xt(n) - Xt(s));
    if (((Pt.length = 0), et)) {
      et.push(...t);
      return;
    }
    for (et = t, ft = 0; ft < et.length; ft++) et[ft]();
    (et = null), (ft = 0);
  }
}
const Xt = (e) => (e.id == null ? 1 / 0 : e.id),
  Ki = (e, t) => {
    const n = Xt(e) - Xt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function po(e) {
  (ts = !1), (Gt = !0), be.sort(Ki);
  try {
    for (Ue = 0; Ue < be.length; Ue++) {
      const t = be[Ue];
      t && t.active !== !1 && it(t, null, 14);
    }
  } finally {
    (Ue = 0),
      (be.length = 0),
      ho(),
      (Gt = !1),
      (Rs = null),
      (be.length || Pt.length) && po();
  }
}
function Wi(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || re;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const a = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: p } = s[a] || re;
    p && (r = n.map((v) => (ae(v) ? v.trim() : v))), h && (r = n.map(Qn));
  }
  let l,
    c = s[(l = Vn(t))] || s[(l = Vn(De(t)))];
  !c && o && (c = s[(l = Vn(Mt(t)))]), c && Fe(c, e, 6, r);
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Fe(d, e, 6, r);
  }
}
function go(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!U(e)) {
    const c = (d) => {
      const a = go(d, t, !0);
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
function Ln(e, t) {
  return !e || !Cn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Mt(t)) || K(e, t));
}
let ye = null,
  _o = null;
function mn(e) {
  const t = ye;
  return (ye = e), (_o = (e && e.type.__scopeId) || null), t;
}
function bn(e, t = ye, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && rr(-1);
    const o = mn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      mn(o), s._d && rr(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Un(e) {
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
    data: p,
    setupState: v,
    ctx: A,
    inheritAttrs: T,
  } = e;
  let N, k;
  const B = mn(e);
  try {
    if (n.shapeFlag & 4) {
      const q = r || s,
        G = q;
      (N = je(a.call(G, q, h, o, v, p, A))), (k = c);
    } else {
      const q = t;
      (N = je(
        q.length > 1 ? q(o, { attrs: c, slots: l, emit: d }) : q(o, null),
      )),
        (k = t.props ? c : qi(c));
    }
  } catch (q) {
    (zt.length = 0), An(q, e, 1), (N = se(gt));
  }
  let V = N;
  if (k && T !== !1) {
    const q = Object.keys(k),
      { shapeFlag: G } = V;
    q.length && G & 7 && (i && q.some(_s) && (k = Gi(k, i)), (V = Lt(V, k)));
  }
  return (
    n.dirs && ((V = Lt(V)), (V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (V.transition = n.transition),
    (N = V),
    mn(B),
    N
  );
}
const qi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Cn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Gi = (e, t) => {
    const n = {};
    for (const s in e) (!_s(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Xi(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    d = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Gs(s, i, d) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const p = a[h];
        if (i[p] !== s[p] && !Ln(d, p)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? Gs(s, i, d)
            : !0
          : !!i;
  return !1;
}
function Gs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Ln(n, o)) return !0;
  }
  return !1;
}
function Yi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const mo = "components";
function He(e, t) {
  return Zi(mo, e, !0, t) || e;
}
const Qi = Symbol.for("v-ndc");
function Zi(e, t, n = !0, s = !1) {
  const r = ye || pe;
  if (r) {
    const o = r.type;
    if (e === mo) {
      const l = Yl(o, !1);
      if (l && (l === t || l === De(t) || l === Sn(De(t)))) return o;
    }
    const i = Xs(r[e] || o[e], t) || Xs(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Xs(e, t) {
  return e && (e[t] || e[De(t)] || e[Sn(De(t))]);
}
const Ji = (e) => e.__isSuspense;
function el(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Di(e);
}
const tl = Symbol.for("v-scx"),
  nl = () => ze(tl),
  ln = {};
function jt(e, t, n) {
  return bo(e, t, n);
}
function bo(
  e,
  t,
  { immediate: n, deep: s, flush: r, once: o, onTrack: i, onTrigger: l } = re,
) {
  if (t && o) {
    const j = t;
    t = (...ce) => {
      j(...ce), G();
    };
  }
  const c = pe,
    d = (j) => (s === !0 ? j : dt(j, s === !1 ? 1 : void 0));
  let a,
    h = !1,
    p = !1;
  if (
    (fe(e)
      ? ((a = () => e.value), (h = _n(e)))
      : ot(e)
        ? ((a = () => d(e)), (h = !0))
        : F(e)
          ? ((p = !0),
            (h = e.some((j) => ot(j) || _n(j))),
            (a = () =>
              e.map((j) => {
                if (fe(j)) return j.value;
                if (ot(j)) return d(j);
                if (U(j)) return it(j, c, 2);
              })))
          : U(e)
            ? t
              ? (a = () => it(e, c, 2))
              : (a = () => (v && v(), Fe(e, c, 3, [A])))
            : (a = ke),
    t && s)
  ) {
    const j = a;
    a = () => dt(j());
  }
  let v,
    A = (j) => {
      v = V.onStop = () => {
        it(j, c, 4), (v = V.onStop = void 0);
      };
    },
    T;
  if (Mn)
    if (
      ((A = ke),
      t ? n && Fe(t, c, 3, [a(), p ? [] : void 0, A]) : a(),
      r === "sync")
    ) {
      const j = nl();
      T = j.__watcherHandles || (j.__watcherHandles = []);
    } else return ke;
  let N = p ? new Array(e.length).fill(ln) : ln;
  const k = () => {
    if (!(!V.active || !V.dirty))
      if (t) {
        const j = V.run();
        (s || h || (p ? j.some((ce, z) => lt(ce, N[z])) : lt(j, N))) &&
          (v && v(),
          Fe(t, c, 3, [j, N === ln ? void 0 : p && N[0] === ln ? [] : N, A]),
          (N = j));
      } else V.run();
  };
  k.allowRecurse = !!t;
  let B;
  r === "sync"
    ? (B = k)
    : r === "post"
      ? (B = () => Ce(k, c && c.suspense))
      : ((k.pre = !0), c && (k.id = c.uid), (B = () => Ls(k)));
  const V = new ys(a, ke, B),
    q = Kr(),
    G = () => {
      V.stop(), q && ms(q.effects, V);
    };
  return (
    t
      ? n
        ? k()
        : (N = V.run())
      : r === "post"
        ? Ce(V.run.bind(V), c && c.suspense)
        : V.run(),
    T && T.push(G),
    G
  );
}
function sl(e, t, n) {
  const s = this.proxy,
    r = ae(e) ? (e.includes(".") ? vo(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  U(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Jt(this),
    l = bo(r, o.bind(s), n);
  return i(), l;
}
function vo(e, t) {
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
  else if (Nr(e) || St(e))
    e.forEach((r) => {
      dt(r, t, n, s);
    });
  else if (Vr(e)) for (const r in e) dt(e[r], t, n, s);
  return e;
}
function rl(e, t) {
  if (ye === null) return e;
  const n = Fn(ye) || ye.proxy,
    s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, i, l, c = re] = t[r];
    o &&
      (U(o) && (o = { mounted: o, updated: o }),
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
/*! #__NO_SIDE_EFFECTS__ */ function yo(e, t) {
  return U(e) ? ge({ name: e.name }, t, { setup: e }) : e;
}
const an = (e) => !!e.type.__asyncLoader,
  xo = (e) => e.type.__isKeepAlive;
function ol(e, t) {
  Co(e, "a", t);
}
function il(e, t) {
  Co(e, "da", t);
}
function Co(e, t, n = pe) {
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
  if ((kn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      xo(r.parent.vnode) && ll(s, t, n, r), (r = r.parent);
  }
}
function ll(e, t, n, s) {
  const r = kn(t, e, s, !0);
  Eo(() => {
    ms(s[t], r);
  }, n);
}
function kn(e, t, n = pe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          _t();
          const l = Jt(n),
            c = Fe(t, n, e, i);
          return l(), mt(), c;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const Ge =
    (e) =>
    (t, n = pe) =>
      (!Mn || e === "sp") && kn(e, (...s) => t(...s), n),
  cl = Ge("bm"),
  ul = Ge("m"),
  al = Ge("bu"),
  fl = Ge("u"),
  dl = Ge("bum"),
  Eo = Ge("um"),
  hl = Ge("sp"),
  pl = Ge("rtg"),
  gl = Ge("rtc");
function _l(e, t = pe) {
  kn("ec", e, t);
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
  Ht = ge(Object.create(null), {
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
    $options: (e) => ks(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), Ls(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = As.bind(e.proxy)),
    $watch: (e) => sl.bind(e),
  }),
  Hn = (e, t) => e !== re && !e.__isScriptSetup && K(e, t),
  ml = {
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
          if (Hn(s, t)) return (i[t] = 1), s[t];
          if (r !== re && K(r, t)) return (i[t] = 2), r[t];
          if ((d = e.propsOptions[0]) && K(d, t)) return (i[t] = 3), o[t];
          if (n !== re && K(n, t)) return (i[t] = 4), n[t];
          ss && (i[t] = 0);
        }
      }
      const a = Ht[t];
      let h, p;
      if (a) return t === "$attrs" && Ee(e, "get", t), a(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== re && K(n, t)) return (i[t] = 4), n[t];
      if (((p = c.config.globalProperties), K(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Hn(r, t)
        ? ((r[t] = n), !0)
        : s !== re && K(s, t)
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
        (e !== re && K(e, i)) ||
        Hn(t, i) ||
        ((l = o[0]) && K(l, i)) ||
        K(s, i) ||
        K(Ht, i) ||
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
function Ys(e) {
  return F(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ss = !0;
function bl(e) {
  const t = ks(e),
    n = e.proxy,
    s = e.ctx;
  (ss = !1), t.beforeCreate && Qs(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: d,
    created: a,
    beforeMount: h,
    mounted: p,
    beforeUpdate: v,
    updated: A,
    activated: T,
    deactivated: N,
    beforeDestroy: k,
    beforeUnmount: B,
    destroyed: V,
    unmounted: q,
    render: G,
    renderTracked: j,
    renderTriggered: ce,
    errorCaptured: z,
    serverPrefetch: D,
    expose: ue,
    inheritAttrs: _e,
    components: we,
    directives: Re,
    filters: ct,
  } = t;
  if ((d && vl(d, s, null), i))
    for (const te in i) {
      const Q = i[te];
      U(Q) && (s[te] = Q.bind(n));
    }
  if (r) {
    const te = r.call(n, n);
    le(te) && (e.data = Zt(te));
  }
  if (((ss = !0), o))
    for (const te in o) {
      const Q = o[te],
        Ke = U(Q) ? Q.bind(n, n) : U(Q.get) ? Q.get.bind(n, n) : ke,
        Ye = !U(Q) && U(Q.set) ? Q.set.bind(n) : ke,
        Be = Le({ get: Ke, set: Ye });
      Object.defineProperty(s, te, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (xe) => (Be.value = xe),
      });
    }
  if (l) for (const te in l) wo(l[te], s, n, te);
  if (c) {
    const te = U(c) ? c.call(n) : c;
    Reflect.ownKeys(te).forEach((Q) => {
      fn(Q, te[Q]);
    });
  }
  a && Qs(a, e, "c");
  function X(te, Q) {
    F(Q) ? Q.forEach((Ke) => te(Ke.bind(n))) : Q && te(Q.bind(n));
  }
  if (
    (X(cl, h),
    X(ul, p),
    X(al, v),
    X(fl, A),
    X(ol, T),
    X(il, N),
    X(_l, z),
    X(gl, j),
    X(pl, ce),
    X(dl, B),
    X(Eo, q),
    X(hl, D),
    F(ue))
  )
    if (ue.length) {
      const te = e.exposed || (e.exposed = {});
      ue.forEach((Q) => {
        Object.defineProperty(te, Q, {
          get: () => n[Q],
          set: (Ke) => (n[Q] = Ke),
        });
      });
    } else e.exposed || (e.exposed = {});
  G && e.render === ke && (e.render = G),
    _e != null && (e.inheritAttrs = _e),
    we && (e.components = we),
    Re && (e.directives = Re);
}
function vl(e, t, n = ke) {
  F(e) && (e = rs(e));
  for (const s in e) {
    const r = e[s];
    let o;
    le(r)
      ? "default" in r
        ? (o = ze(r.from || s, r.default, !0))
        : (o = ze(r.from || s))
      : (o = ze(r)),
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
function Qs(e, t, n) {
  Fe(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wo(e, t, n, s) {
  const r = s.includes(".") ? vo(n, s) : () => n[s];
  if (ae(e)) {
    const o = t[e];
    U(o) && jt(r, o);
  } else if (U(e)) jt(r, e.bind(n));
  else if (le(e))
    if (F(e)) e.forEach((o) => wo(o, t, n, s));
    else {
      const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(o) && jt(r, o, e);
    }
}
function ks(e) {
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
          r.length && r.forEach((d) => vn(c, d, i, !0)),
          vn(c, t, i)),
    le(t) && o.set(t, c),
    c
  );
}
function vn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && vn(e, o, n, !0), r && r.forEach((i) => vn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = yl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const yl = {
  data: Zs,
  props: Js,
  emits: Js,
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
  watch: Cl,
  provide: Zs,
  inject: xl,
};
function Zs(e, t) {
  return t
    ? e
      ? function () {
          return ge(
            U(e) ? e.call(this, this) : e,
            U(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function xl(e, t) {
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
function Js(e, t) {
  return e
    ? F(e) && F(t)
      ? [...new Set([...e, ...t])]
      : ge(Object.create(null), Ys(e), Ys(t ?? {}))
    : t;
}
function Cl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(Object.create(null), e);
  for (const s in t) n[s] = ve(e[s], t[s]);
  return n;
}
function So() {
  return {
    app: null,
    config: {
      isNativeTag: ti,
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
let El = 0;
function wl(e, t) {
  return function (s, r = null) {
    U(s) || (s = ge({}, s)), r != null && !le(r) && (r = null);
    const o = So(),
      i = new WeakSet();
    let l = !1;
    const c = (o.app = {
      _uid: El++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Zl,
      get config() {
        return o.config;
      },
      set config(d) {},
      use(d, ...a) {
        return (
          i.has(d) ||
            (d && U(d.install)
              ? (i.add(d), d.install(c, ...a))
              : U(d) && (i.add(d), d(c, ...a))),
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
          const p = se(s, r);
          return (
            (p.appContext = o),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            a && t ? t(p, d) : e(p, d, h),
            (l = !0),
            (c._container = d),
            (d.__vue_app__ = c),
            Fn(p.component) || p.component.proxy
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
        const a = Rt;
        Rt = c;
        try {
          return d();
        } finally {
          Rt = a;
        }
      },
    });
    return c;
  };
}
let Rt = null;
function fn(e, t) {
  if (pe) {
    let n = pe.provides;
    const s = pe.parent && pe.parent.provides;
    s === n && (n = pe.provides = Object.create(s)), (n[e] = t);
  }
}
function ze(e, t, n = !1) {
  const s = pe || ye;
  if (s || Rt) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Rt._context.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && U(t) ? t.call(s && s.proxy) : t;
  }
}
function Sl() {
  return !!(pe || ye || Rt);
}
function Ol(e, t, n, s = !1) {
  const r = {},
    o = {};
  pn(o, Tn, 1), (e.propsDefaults = Object.create(null)), Oo(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : so(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Pl(e, t, n, s) {
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
        let p = a[h];
        if (Ln(e.emitsOptions, p)) continue;
        const v = t[p];
        if (c)
          if (K(o, p)) v !== o[p] && ((o[p] = v), (d = !0));
          else {
            const A = De(p);
            r[A] = os(c, l, A, v, e, !1);
          }
        else v !== o[p] && ((o[p] = v), (d = !0));
      }
    }
  } else {
    Oo(e, t, r, o) && (d = !0);
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
function Oo(e, t, n, s) {
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
        : Ln(e.emitsOptions, c) ||
          ((!(c in s) || d !== s[c]) && ((s[c] = d), (i = !0)));
    }
  if (o) {
    const c = W(n),
      d = l || re;
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
      if (i.type !== Function && !i.skipFactory && U(c)) {
        const { propsDefaults: d } = r;
        if (n in d) s = d[n];
        else {
          const a = Jt(r);
          (s = d[n] = c.call(null, t)), a();
        }
      } else s = c;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === Mt(n)) && (s = !0));
  }
  return s;
}
function Po(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!U(e)) {
    const a = (h) => {
      c = !0;
      const [p, v] = Po(h, t, !0);
      ge(i, p), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c) return le(e) && s.set(e, wt), wt;
  if (F(o))
    for (let a = 0; a < o.length; a++) {
      const h = De(o[a]);
      er(h) && (i[h] = re);
    }
  else if (o)
    for (const a in o) {
      const h = De(a);
      if (er(h)) {
        const p = o[a],
          v = (i[h] = F(p) || U(p) ? { type: p } : ge({}, p));
        if (v) {
          const A = sr(Boolean, v.type),
            T = sr(String, v.type);
          (v[0] = A > -1),
            (v[1] = T < 0 || A < T),
            (A > -1 || K(v, "default")) && l.push(h);
        }
      }
    }
  const d = [i, l];
  return le(e) && s.set(e, d), d;
}
function er(e) {
  return e[0] !== "$" && !Vt(e);
}
function tr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function nr(e, t) {
  return tr(e) === tr(t);
}
function sr(e, t) {
  return F(t) ? t.findIndex((n) => nr(n, e)) : U(t) && nr(t, e) ? 0 : -1;
}
const Ro = (e) => e[0] === "_" || e === "$stable",
  Is = (e) => (F(e) ? e.map(je) : [je(e)]),
  Rl = (e, t, n) => {
    if (t._n) return t;
    const s = bn((...r) => Is(t(...r)), n);
    return (s._c = !1), s;
  },
  Ao = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Ro(r)) continue;
      const o = e[r];
      if (U(o)) t[r] = Rl(r, o, s);
      else if (o != null) {
        const i = Is(o);
        t[r] = () => i;
      }
    }
  },
  Lo = (e, t) => {
    const n = Is(t);
    e.slots.default = () => n;
  },
  Al = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = W(t)), pn(t, "_", n)) : Ao(t, (e.slots = {}));
    } else (e.slots = {}), t && Lo(e, t);
    pn(e.slots, Tn, 1);
  },
  Ll = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = re;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ge(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), Ao(t, r)),
        (i = t);
    } else t && (Lo(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !Ro(l) && i[l] == null && delete r[l];
  };
function is(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((p, v) => is(p, t && (F(t) ? t[v] : t), n, s, r));
    return;
  }
  if (an(s) && !r) return;
  const o = s.shapeFlag & 4 ? Fn(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: c } = e,
    d = t && t.r,
    a = l.refs === re ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (d != null &&
      d !== c &&
      (ae(d)
        ? ((a[d] = null), K(h, d) && (h[d] = null))
        : fe(d) && (d.value = null)),
    U(c))
  )
    it(c, l, 12, [i, a]);
  else {
    const p = ae(c),
      v = fe(c);
    if (p || v) {
      const A = () => {
        if (e.f) {
          const T = p ? (K(h, c) ? h[c] : a[c]) : c.value;
          r
            ? F(T) && ms(T, o)
            : F(T)
              ? T.includes(o) || T.push(o)
              : p
                ? ((a[c] = [o]), K(h, c) && (h[c] = a[c]))
                : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          p
            ? ((a[c] = i), K(h, c) && (h[c] = i))
            : v && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((A.id = -1), Ce(A, n)) : A();
    }
  }
}
const Ce = el;
function kl(e) {
  return Il(e);
}
function Il(e, t) {
  const n = jr();
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
      nextSibling: p,
      setScopeId: v = ke,
      insertStaticContent: A,
    } = e,
    T = (
      u,
      f,
      g,
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
      const { type: y, ref: R, shapeFlag: M } = f;
      switch (y) {
        case In:
          N(u, f, g, b);
          break;
        case gt:
          k(u, f, g, b);
          break;
        case dn:
          u == null && B(f, g, b, S);
          break;
        case he:
          we(u, f, g, b, _, C, S, x, E);
          break;
        default:
          M & 1
            ? G(u, f, g, b, _, C, S, x, E)
            : M & 6
              ? Re(u, f, g, b, _, C, S, x, E)
              : (M & 64 || M & 128) && y.process(u, f, g, b, _, C, S, x, E, L);
      }
      R != null && _ && is(R, u && u.ref, C, f || u, !f);
    },
    N = (u, f, g, b) => {
      if (u == null) s((f.el = l(f.children)), g, b);
      else {
        const _ = (f.el = u.el);
        f.children !== u.children && d(_, f.children);
      }
    },
    k = (u, f, g, b) => {
      u == null ? s((f.el = c(f.children || "")), g, b) : (f.el = u.el);
    },
    B = (u, f, g, b) => {
      [u.el, u.anchor] = A(u.children, f, g, b, u.el, u.anchor);
    },
    V = ({ el: u, anchor: f }, g, b) => {
      let _;
      for (; u && u !== f; ) (_ = p(u)), s(u, g, b), (u = _);
      s(f, g, b);
    },
    q = ({ el: u, anchor: f }) => {
      let g;
      for (; u && u !== f; ) (g = p(u)), r(u), (u = g);
      r(f);
    },
    G = (u, f, g, b, _, C, S, x, E) => {
      f.type === "svg" ? (S = "svg") : f.type === "math" && (S = "mathml"),
        u == null ? j(f, g, b, _, C, S, x, E) : D(u, f, _, C, S, x, E);
    },
    j = (u, f, g, b, _, C, S, x) => {
      let E, y;
      const { props: R, shapeFlag: M, transition: I, dirs: $ } = u;
      if (
        ((E = u.el = i(u.type, C, R && R.is, R)),
        M & 8
          ? a(E, u.children)
          : M & 16 && z(u.children, E, null, b, _, zn(u, C), S, x),
        $ && ut(u, null, b, "created"),
        ce(E, u, u.scopeId, S, b),
        R)
      ) {
        for (const ne in R)
          ne !== "value" &&
            !Vt(ne) &&
            o(E, ne, null, R[ne], C, u.children, b, _, me);
        "value" in R && o(E, "value", null, R.value, C),
          (y = R.onVnodeBeforeMount) && Ve(y, b, u);
      }
      $ && ut(u, null, b, "beforeMount");
      const H = Tl(_, I);
      H && I.beforeEnter(E),
        s(E, f, g),
        ((y = R && R.onVnodeMounted) || H || $) &&
          Ce(() => {
            y && Ve(y, b, u), H && I.enter(E), $ && ut(u, null, b, "mounted");
          }, _);
    },
    ce = (u, f, g, b, _) => {
      if ((g && v(u, g), b)) for (let C = 0; C < b.length; C++) v(u, b[C]);
      if (_) {
        let C = _.subTree;
        if (f === C) {
          const S = _.vnode;
          ce(u, S, S.scopeId, S.slotScopeIds, _.parent);
        }
      }
    },
    z = (u, f, g, b, _, C, S, x, E = 0) => {
      for (let y = E; y < u.length; y++) {
        const R = (u[y] = x ? tt(u[y]) : je(u[y]));
        T(null, R, f, g, b, _, C, S, x);
      }
    },
    D = (u, f, g, b, _, C, S) => {
      const x = (f.el = u.el);
      let { patchFlag: E, dynamicChildren: y, dirs: R } = f;
      E |= u.patchFlag & 16;
      const M = u.props || re,
        I = f.props || re;
      let $;
      if (
        (g && at(g, !1),
        ($ = I.onVnodeBeforeUpdate) && Ve($, g, f, u),
        R && ut(f, u, g, "beforeUpdate"),
        g && at(g, !0),
        y
          ? ue(u.dynamicChildren, y, x, g, b, zn(f, _), C)
          : S || Q(u, f, x, null, g, b, zn(f, _), C, !1),
        E > 0)
      ) {
        if (E & 16) _e(x, f, M, I, g, b, _);
        else if (
          (E & 2 && M.class !== I.class && o(x, "class", null, I.class, _),
          E & 4 && o(x, "style", M.style, I.style, _),
          E & 8)
        ) {
          const H = f.dynamicProps;
          for (let ne = 0; ne < H.length; ne++) {
            const ie = H[ne],
              de = M[ie],
              Ie = I[ie];
            (Ie !== de || ie === "value") &&
              o(x, ie, de, Ie, _, u.children, g, b, me);
          }
        }
        E & 1 && u.children !== f.children && a(x, f.children);
      } else !S && y == null && _e(x, f, M, I, g, b, _);
      (($ = I.onVnodeUpdated) || R) &&
        Ce(() => {
          $ && Ve($, g, f, u), R && ut(f, u, g, "updated");
        }, b);
    },
    ue = (u, f, g, b, _, C, S) => {
      for (let x = 0; x < f.length; x++) {
        const E = u[x],
          y = f[x],
          R =
            E.el && (E.type === he || !Nt(E, y) || E.shapeFlag & 70)
              ? h(E.el)
              : g;
        T(E, y, R, null, b, _, C, S, !0);
      }
    },
    _e = (u, f, g, b, _, C, S) => {
      if (g !== b) {
        if (g !== re)
          for (const x in g)
            !Vt(x) && !(x in b) && o(u, x, g[x], null, S, f.children, _, C, me);
        for (const x in b) {
          if (Vt(x)) continue;
          const E = b[x],
            y = g[x];
          E !== y && x !== "value" && o(u, x, y, E, S, f.children, _, C, me);
        }
        "value" in b && o(u, "value", g.value, b.value, S);
      }
    },
    we = (u, f, g, b, _, C, S, x, E) => {
      const y = (f.el = u ? u.el : l("")),
        R = (f.anchor = u ? u.anchor : l(""));
      let { patchFlag: M, dynamicChildren: I, slotScopeIds: $ } = f;
      $ && (x = x ? x.concat($) : $),
        u == null
          ? (s(y, g, b), s(R, g, b), z(f.children || [], g, R, _, C, S, x, E))
          : M > 0 && M & 64 && I && u.dynamicChildren
            ? (ue(u.dynamicChildren, I, g, _, C, S, x),
              (f.key != null || (_ && f === _.subTree)) && ko(u, f, !0))
            : Q(u, f, g, R, _, C, S, x, E);
    },
    Re = (u, f, g, b, _, C, S, x, E) => {
      (f.slotScopeIds = x),
        u == null
          ? f.shapeFlag & 512
            ? _.ctx.activate(f, g, b, S, E)
            : ct(f, g, b, _, C, S, E)
          : Ae(u, f, E);
    },
    ct = (u, f, g, b, _, C, S) => {
      const x = (u.component = Kl(u, b, _));
      if ((xo(u) && (x.ctx.renderer = L), Wl(x), x.asyncDep)) {
        if ((_ && _.registerDep(x, X), !u.el)) {
          const E = (x.subTree = se(gt));
          k(null, E, f, g);
        }
      } else X(x, u, f, g, _, C, S);
    },
    Ae = (u, f, g) => {
      const b = (f.component = u.component);
      if (Xi(u, f, g))
        if (b.asyncDep && !b.asyncResolved) {
          te(b, f, g);
          return;
        } else (b.next = f), zi(b.update), (b.effect.dirty = !0), b.update();
      else (f.el = u.el), (b.vnode = f);
    },
    X = (u, f, g, b, _, C, S) => {
      const x = () => {
          if (u.isMounted) {
            let { next: R, bu: M, u: I, parent: $, vnode: H } = u;
            {
              const yt = Io(u);
              if (yt) {
                R && ((R.el = H.el), te(u, R, S)),
                  yt.asyncDep.then(() => {
                    u.isUnmounted || x();
                  });
                return;
              }
            }
            let ne = R,
              ie;
            at(u, !1),
              R ? ((R.el = H.el), te(u, R, S)) : (R = H),
              M && cn(M),
              (ie = R.props && R.props.onVnodeBeforeUpdate) && Ve(ie, $, R, H),
              at(u, !0);
            const de = Un(u),
              Ie = u.subTree;
            (u.subTree = de),
              T(Ie, de, h(Ie.el), m(Ie), u, _, C),
              (R.el = de.el),
              ne === null && Yi(u, de.el),
              I && Ce(I, _),
              (ie = R.props && R.props.onVnodeUpdated) &&
                Ce(() => Ve(ie, $, R, H), _);
          } else {
            let R;
            const { el: M, props: I } = f,
              { bm: $, m: H, parent: ne } = u,
              ie = an(f);
            if (
              (at(u, !1),
              $ && cn($),
              !ie && (R = I && I.onVnodeBeforeMount) && Ve(R, ne, f),
              at(u, !0),
              M && oe)
            ) {
              const de = () => {
                (u.subTree = Un(u)), oe(M, u.subTree, u, _, null);
              };
              ie
                ? f.type.__asyncLoader().then(() => !u.isUnmounted && de())
                : de();
            } else {
              const de = (u.subTree = Un(u));
              T(null, de, g, b, u, _, C), (f.el = de.el);
            }
            if ((H && Ce(H, _), !ie && (R = I && I.onVnodeMounted))) {
              const de = f;
              Ce(() => Ve(R, ne, de), _);
            }
            (f.shapeFlag & 256 ||
              (ne && an(ne.vnode) && ne.vnode.shapeFlag & 256)) &&
              u.a &&
              Ce(u.a, _),
              (u.isMounted = !0),
              (f = g = b = null);
          }
        },
        E = (u.effect = new ys(x, ke, () => Ls(y), u.scope)),
        y = (u.update = () => {
          E.dirty && E.run();
        });
      (y.id = u.uid), at(u, !0), y();
    },
    te = (u, f, g) => {
      f.component = u;
      const b = u.vnode.props;
      (u.vnode = f),
        (u.next = null),
        Pl(u, f.props, b, g),
        Ll(u, f.children, g),
        _t(),
        qs(u),
        mt();
    },
    Q = (u, f, g, b, _, C, S, x, E = !1) => {
      const y = u && u.children,
        R = u ? u.shapeFlag : 0,
        M = f.children,
        { patchFlag: I, shapeFlag: $ } = f;
      if (I > 0) {
        if (I & 128) {
          Ye(y, M, g, b, _, C, S, x, E);
          return;
        } else if (I & 256) {
          Ke(y, M, g, b, _, C, S, x, E);
          return;
        }
      }
      $ & 8
        ? (R & 16 && me(y, _, C), M !== y && a(g, M))
        : R & 16
          ? $ & 16
            ? Ye(y, M, g, b, _, C, S, x, E)
            : me(y, _, C, !0)
          : (R & 8 && a(g, ""), $ & 16 && z(M, g, b, _, C, S, x, E));
    },
    Ke = (u, f, g, b, _, C, S, x, E) => {
      (u = u || wt), (f = f || wt);
      const y = u.length,
        R = f.length,
        M = Math.min(y, R);
      let I;
      for (I = 0; I < M; I++) {
        const $ = (f[I] = E ? tt(f[I]) : je(f[I]));
        T(u[I], $, g, null, _, C, S, x, E);
      }
      y > R ? me(u, _, C, !0, !1, M) : z(f, g, b, _, C, S, x, E, M);
    },
    Ye = (u, f, g, b, _, C, S, x, E) => {
      let y = 0;
      const R = f.length;
      let M = u.length - 1,
        I = R - 1;
      for (; y <= M && y <= I; ) {
        const $ = u[y],
          H = (f[y] = E ? tt(f[y]) : je(f[y]));
        if (Nt($, H)) T($, H, g, null, _, C, S, x, E);
        else break;
        y++;
      }
      for (; y <= M && y <= I; ) {
        const $ = u[M],
          H = (f[I] = E ? tt(f[I]) : je(f[I]));
        if (Nt($, H)) T($, H, g, null, _, C, S, x, E);
        else break;
        M--, I--;
      }
      if (y > M) {
        if (y <= I) {
          const $ = I + 1,
            H = $ < R ? f[$].el : b;
          for (; y <= I; )
            T(null, (f[y] = E ? tt(f[y]) : je(f[y])), g, H, _, C, S, x, E), y++;
        }
      } else if (y > I) for (; y <= M; ) xe(u[y], _, C, !0), y++;
      else {
        const $ = y,
          H = y,
          ne = new Map();
        for (y = H; y <= I; y++) {
          const Se = (f[y] = E ? tt(f[y]) : je(f[y]));
          Se.key != null && ne.set(Se.key, y);
        }
        let ie,
          de = 0;
        const Ie = I - H + 1;
        let yt = !1,
          Ns = 0;
        const Ft = new Array(Ie);
        for (y = 0; y < Ie; y++) Ft[y] = 0;
        for (y = $; y <= M; y++) {
          const Se = u[y];
          if (de >= Ie) {
            xe(Se, _, C, !0);
            continue;
          }
          let $e;
          if (Se.key != null) $e = ne.get(Se.key);
          else
            for (ie = H; ie <= I; ie++)
              if (Ft[ie - H] === 0 && Nt(Se, f[ie])) {
                $e = ie;
                break;
              }
          $e === void 0
            ? xe(Se, _, C, !0)
            : ((Ft[$e - H] = y + 1),
              $e >= Ns ? (Ns = $e) : (yt = !0),
              T(Se, f[$e], g, null, _, C, S, x, E),
              de++);
        }
        const Bs = yt ? Ml(Ft) : wt;
        for (ie = Bs.length - 1, y = Ie - 1; y >= 0; y--) {
          const Se = H + y,
            $e = f[Se],
            $s = Se + 1 < R ? f[Se + 1].el : b;
          Ft[y] === 0
            ? T(null, $e, g, $s, _, C, S, x, E)
            : yt && (ie < 0 || y !== Bs[ie] ? Be($e, g, $s, 2) : ie--);
        }
      }
    },
    Be = (u, f, g, b, _ = null) => {
      const { el: C, type: S, transition: x, children: E, shapeFlag: y } = u;
      if (y & 6) {
        Be(u.component.subTree, f, g, b);
        return;
      }
      if (y & 128) {
        u.suspense.move(f, g, b);
        return;
      }
      if (y & 64) {
        S.move(u, f, g, L);
        return;
      }
      if (S === he) {
        s(C, f, g);
        for (let M = 0; M < E.length; M++) Be(E[M], f, g, b);
        s(u.anchor, f, g);
        return;
      }
      if (S === dn) {
        V(u, f, g);
        return;
      }
      if (b !== 2 && y & 1 && x)
        if (b === 0) x.beforeEnter(C), s(C, f, g), Ce(() => x.enter(C), _);
        else {
          const { leave: M, delayLeave: I, afterLeave: $ } = x,
            H = () => s(C, f, g),
            ne = () => {
              M(C, () => {
                H(), $ && $();
              });
            };
          I ? I(C, H, ne) : ne();
        }
      else s(C, f, g);
    },
    xe = (u, f, g, b = !1, _ = !1) => {
      const {
        type: C,
        props: S,
        ref: x,
        children: E,
        dynamicChildren: y,
        shapeFlag: R,
        patchFlag: M,
        dirs: I,
      } = u;
      if ((x != null && is(x, null, g, u, !0), R & 256)) {
        f.ctx.deactivate(u);
        return;
      }
      const $ = R & 1 && I,
        H = !an(u);
      let ne;
      if ((H && (ne = S && S.onVnodeBeforeUnmount) && Ve(ne, f, u), R & 6))
        en(u.component, g, b);
      else {
        if (R & 128) {
          u.suspense.unmount(g, b);
          return;
        }
        $ && ut(u, null, f, "beforeUnmount"),
          R & 64
            ? u.type.remove(u, f, g, _, L, b)
            : y && (C !== he || (M > 0 && M & 64))
              ? me(y, f, g, !1, !0)
              : ((C === he && M & 384) || (!_ && R & 16)) && me(E, f, g),
          b && bt(u);
      }
      ((H && (ne = S && S.onVnodeUnmounted)) || $) &&
        Ce(() => {
          ne && Ve(ne, f, u), $ && ut(u, null, f, "unmounted");
        }, g);
    },
    bt = (u) => {
      const { type: f, el: g, anchor: b, transition: _ } = u;
      if (f === he) {
        vt(g, b);
        return;
      }
      if (f === dn) {
        q(u);
        return;
      }
      const C = () => {
        r(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (u.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: S, delayLeave: x } = _,
          E = () => S(g, C);
        x ? x(u.el, C, E) : E();
      } else C();
    },
    vt = (u, f) => {
      let g;
      for (; u !== f; ) (g = p(u)), r(u), (u = g);
      r(f);
    },
    en = (u, f, g) => {
      const { bum: b, scope: _, update: C, subTree: S, um: x } = u;
      b && cn(b),
        _.stop(),
        C && ((C.active = !1), xe(S, u, f, g)),
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
    me = (u, f, g, b = !1, _ = !1, C = 0) => {
      for (let S = C; S < u.length; S++) xe(u[S], f, g, b, _);
    },
    m = (u) =>
      u.shapeFlag & 6
        ? m(u.component.subTree)
        : u.shapeFlag & 128
          ? u.suspense.next()
          : p(u.anchor || u.el);
  let P = !1;
  const w = (u, f, g) => {
      u == null
        ? f._vnode && xe(f._vnode, null, null, !0)
        : T(f._vnode || null, u, f, null, null, null, g),
        P || ((P = !0), qs(), ho(), (P = !1)),
        (f._vnode = u);
    },
    L = {
      p: T,
      um: xe,
      m: Be,
      r: bt,
      mt: ct,
      mc: z,
      pc: Q,
      pbc: ue,
      n: m,
      o: e,
    };
  let Z, oe;
  return t && ([Z, oe] = t(L)), { render: w, hydrate: Z, createApp: wl(w, Z) };
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
function Tl(e, t) {
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
        l.type === In && (l.el = i.el);
    }
}
function Ml(e) {
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
const Fl = (e) => e.__isTeleport,
  he = Symbol.for("v-fgt"),
  In = Symbol.for("v-txt"),
  gt = Symbol.for("v-cmt"),
  dn = Symbol.for("v-stc"),
  zt = [];
let Me = null;
function Y(e = !1) {
  zt.push((Me = e ? null : []));
}
function Nl() {
  zt.pop(), (Me = zt[zt.length - 1] || null);
}
let Yt = 1;
function rr(e) {
  Yt += e;
}
function To(e) {
  return (
    (e.dynamicChildren = Yt > 0 ? Me || wt : null),
    Nl(),
    Yt > 0 && Me && Me.push(e),
    e
  );
}
function J(e, t, n, s, r, o) {
  return To(O(e, t, n, s, r, o, !0));
}
function Bl(e, t, n, s, r) {
  return To(se(e, t, n, s, r, !0));
}
function ls(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Tn = "__vInternal",
  Mo = ({ key: e }) => e ?? null,
  hn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ae(e) || fe(e) || U(e)
        ? { i: ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function O(
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
    ref: t && hn(t),
    scopeId: _o,
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
    Yt > 0 &&
      !i &&
      Me &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Me.push(c),
    c
  );
}
const se = $l;
function $l(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Qi) && (e = gt), ls(e))) {
    const l = Lt(e, t, !0);
    return (
      n && Ts(l, n),
      Yt > 0 &&
        !o &&
        Me &&
        (l.shapeFlag & 6 ? (Me[Me.indexOf(e)] = l) : Me.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Ql(e) && (e = e.__vccOpts), t)) {
    t = Vl(t);
    let { class: l, style: c } = t;
    l && !ae(l) && (t.class = vs(l)),
      le(c) && (oo(c) && !F(c) && (c = ge({}, c)), (t.style = On(c)));
  }
  const i = ae(e) ? 1 : Ji(e) ? 128 : Fl(e) ? 64 : le(e) ? 4 : U(e) ? 2 : 0;
  return O(e, t, n, s, r, i, o, !0);
}
function Vl(e) {
  return e ? (oo(e) || Tn in e ? ge({}, e) : e) : null;
}
function Lt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? Hl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Mo(l),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(hn(t)) : [r, hn(t)]) : hn(t)) : r,
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
    ssContent: e.ssContent && Lt(e.ssContent),
    ssFallback: e.ssFallback && Lt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function jl(e = " ", t = 0) {
  return se(In, null, e, t);
}
function Ul(e, t) {
  const n = se(dn, null, e);
  return (n.staticCount = t), n;
}
function Te(e = "", t = !1) {
  return t ? (Y(), Bl(gt, null, e)) : se(gt, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean"
    ? se(gt)
    : F(e)
      ? se(he, null, e.slice())
      : typeof e == "object"
        ? tt(e)
        : se(In, null, String(e));
}
function tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Lt(e);
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
    U(t)
      ? ((t = { default: t, _ctx: ye }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [jl(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Hl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = vs([t.class, s.class]));
      else if (r === "style") t.style = On([t.style, s.style]);
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
const zl = So();
let Dl = 0;
function Kl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || zl,
    o = {
      uid: Dl++,
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
      propsOptions: Po(s, r),
      emitsOptions: go(s, r),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: s.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
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
    (o.emit = Wi.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let pe = null,
  yn,
  cs;
{
  const e = jr(),
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
  (yn = t("__VUE_INSTANCE_SETTERS__", (n) => (pe = n))),
    (cs = t("__VUE_SSR_SETTERS__", (n) => (Mn = n)));
}
const Jt = (e) => {
    const t = pe;
    return (
      yn(e),
      e.scope.on(),
      () => {
        e.scope.off(), yn(t);
      }
    );
  },
  or = () => {
    pe && pe.scope.off(), yn(null);
  };
function Fo(e) {
  return e.vnode.shapeFlag & 4;
}
let Mn = !1;
function Wl(e, t = !1) {
  t && cs(t);
  const { props: n, children: s } = e.vnode,
    r = Fo(e);
  Ol(e, n, r, t), Al(e, s);
  const o = r ? ql(e, t) : void 0;
  return t && cs(!1), o;
}
function ql(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Rn(new Proxy(e.ctx, ml)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Xl(e) : null),
      o = Jt(e);
    _t();
    const i = it(s, e, 0, [e.props, r]);
    if ((mt(), o(), Br(i))) {
      if ((i.then(or, or), t))
        return i
          .then((l) => {
            ir(e, l, t);
          })
          .catch((l) => {
            An(l, e, 0);
          });
      e.asyncDep = i;
    } else ir(e, i, t);
  } else No(e, t);
}
function ir(e, t, n) {
  U(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = uo(t)),
    No(e, n);
}
let lr;
function No(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && lr && !s.render) {
      const r = s.template || ks(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          d = ge(ge({ isCustomElement: o, delimiters: l }, i), c);
        s.render = lr(r, d);
      }
    }
    e.render = s.render || ke;
  }
  {
    const r = Jt(e);
    _t();
    try {
      bl(e);
    } finally {
      mt(), r();
    }
  }
}
function Gl(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ee(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Xl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Gl(e);
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
      (e.exposeProxy = new Proxy(uo(Rn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ht) return Ht[n](e);
        },
        has(t, n) {
          return n in t || n in Ht;
        },
      }))
    );
}
function Yl(e, t = !0) {
  return U(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ql(e) {
  return U(e) && "__vccOpts" in e;
}
const Le = (e, t) => Mi(e, t, Mn);
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
const Zl = "3.4.18";
/**
 * @vue/runtime-dom v3.4.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Jl = "http://www.w3.org/2000/svg",
  ec = "http://www.w3.org/1998/Math/MathML",
  nt = typeof document < "u" ? document : null,
  cr = nt && nt.createElement("template"),
  tc = {
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
          ? nt.createElementNS(Jl, e)
          : t === "mathml"
            ? nt.createElementNS(ec, e)
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
        cr.innerHTML =
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e;
        const l = cr.content;
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
  nc = Symbol("_vtc");
function sc(e, t, n) {
  const s = e[nc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t);
}
const ur = Symbol("_vod"),
  rc = Symbol(""),
  oc = /(^|;)\s*display\s*:/;
function ic(e, t, n) {
  const s = e.style,
    r = ae(n),
    o = s.display;
  let i = !1;
  if (n && !r) {
    if (t && !ae(t)) for (const l in t) n[l] == null && us(s, l, "");
    for (const l in n) l === "display" && (i = !0), us(s, l, n[l]);
  } else if (r) {
    if (t !== n) {
      const l = s[rc];
      l && (n += ";" + l), (s.cssText = n), (i = oc.test(n));
    }
  } else t && e.removeAttribute("style");
  ur in e && ((e[ur] = i ? s.display : ""), (s.display = o));
}
const ar = /\s*!important$/;
function us(e, t, n) {
  if (F(n)) n.forEach((s) => us(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = lc(e, t);
    ar.test(n)
      ? e.setProperty(Mt(s), n.replace(ar, ""), "important")
      : (e[s] = n);
  }
}
const fr = ["Webkit", "Moz", "ms"],
  Dn = {};
function lc(e, t) {
  const n = Dn[t];
  if (n) return n;
  let s = De(t);
  if (s !== "filter" && s in e) return (Dn[t] = s);
  s = Sn(s);
  for (let r = 0; r < fr.length; r++) {
    const o = fr[r] + s;
    if (o in e) return (Dn[t] = o);
  }
  return t;
}
const dr = "http://www.w3.org/1999/xlink";
function cc(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(dr, t.slice(6, t.length))
      : e.setAttributeNS(dr, t, n);
  else {
    const o = fi(t);
    n == null || (o && !Ur(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function uc(e, t, n, s, r, o, i) {
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
      ? (n = Ur(n))
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
function ac(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const hr = Symbol("_vei");
function fc(e, t, n, s, r = null) {
  const o = e[hr] || (e[hr] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = dc(t);
    if (s) {
      const d = (o[t] = gc(s, r));
      Ct(e, l, d, c);
    } else i && (ac(e, l, i, c), (o[t] = void 0));
  }
}
const pr = /(?:Once|Passive|Capture)$/;
function dc(e) {
  let t;
  if (pr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(pr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Mt(e.slice(2)), t];
}
let Kn = 0;
const hc = Promise.resolve(),
  pc = () => Kn || (hc.then(() => (Kn = 0)), (Kn = Date.now()));
function gc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    Fe(_c(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = pc()), n;
}
function _c(e, t) {
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
const gr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  mc = (e, t, n, s, r, o, i, l, c) => {
    const d = r === "svg";
    t === "class"
      ? sc(e, s, d)
      : t === "style"
        ? ic(e, n, s)
        : Cn(t)
          ? _s(t) || fc(e, t, n, s, i)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : bc(e, t, s, d)
              )
            ? uc(e, t, s, o, i, l, c)
            : (t === "true-value"
                ? (e._trueValue = s)
                : t === "false-value" && (e._falseValue = s),
              cc(e, t, s, d));
  };
function bc(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && gr(t) && U(n))
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
  return gr(t) && ae(n) ? !1 : t in e;
}
const _r = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return F(t) ? (n) => cn(t, n) : t;
};
function vc(e) {
  e.target.composing = !0;
}
function mr(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Wn = Symbol("_assign"),
  yc = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e[Wn] = _r(r);
      const o = s || (r.props && r.props.type === "number");
      Ct(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), o && (l = Qn(l)), e[Wn](l);
      }),
        n &&
          Ct(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (Ct(e, "compositionstart", vc),
          Ct(e, "compositionend", mr),
          Ct(e, "change", mr));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: r } },
      o,
    ) {
      if (((e[Wn] = _r(o)), e.composing)) return;
      const i = r || e.type === "number" ? Qn(e.value) : e.value,
        l = t ?? "";
      i !== l &&
        ((document.activeElement === e &&
          e.type !== "range" &&
          (n || (s && e.value.trim() === l))) ||
          (e.value = l));
    },
  },
  xc = ge({ patchProp: mc }, tc);
let br;
function Cc() {
  return br || (br = kl(xc));
}
const Ec = (...e) => {
  const t = Cc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Sc(s);
      if (!r) return;
      const o = t._component;
      !U(o) && !o.render && !o.template && (o.template = r.innerHTML),
        (r.innerHTML = "");
      const i = n(r, !1, wc(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function wc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Sc(e) {
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
function Pc() {
  const e = Dr(!0),
    t = e.run(() => Ps({}));
  let n = [],
    s = [];
  const r = Rn({
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
function vr(e, t, n, s = jo) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s());
  };
  return !n && Kr() && hi(r), r;
}
function xt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Rc = (e) => e();
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
const Ac = Symbol();
function Lc(e) {
  return !as(e) || !e.hasOwnProperty(Ac);
}
const { assign: Je } = Object;
function kc(e) {
  return !!(fe(e) && e.effect);
}
function Ic(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function d() {
    l || (n.state.value[e] = r ? r() : {});
    const a = $i(n.state.value[e]);
    return Je(
      a,
      o,
      Object.keys(i || {}).reduce(
        (h, p) => (
          (h[p] = Rn(
            Le(() => {
              Nn(n);
              const v = n._s.get(e);
              return i[p].call(v, v);
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
    p = [],
    v;
  const A = s.state.value[e];
  !o && !A && (s.state.value[e] = {}), Ps({});
  let T;
  function N(z) {
    let D;
    (d = a = !1),
      typeof z == "function"
        ? (z(s.state.value[e]),
          (D = { type: Dt.patchFunction, storeId: e, events: v }))
        : (fs(s.state.value[e], z),
          (D = { type: Dt.patchObject, payload: z, storeId: e, events: v }));
    const ue = (T = Symbol());
    As().then(() => {
      T === ue && (d = !0);
    }),
      (a = !0),
      xt(h, D, s.state.value[e]);
  }
  const k = o
    ? function () {
        const { state: D } = n,
          ue = D ? D() : {};
        this.$patch((_e) => {
          Je(_e, ue);
        });
      }
    : jo;
  function B() {
    i.stop(), (h = []), (p = []), s._s.delete(e);
  }
  function V(z, D) {
    return function () {
      Nn(s);
      const ue = Array.from(arguments),
        _e = [],
        we = [];
      function Re(X) {
        _e.push(X);
      }
      function ct(X) {
        we.push(X);
      }
      xt(p, { args: ue, name: z, store: G, after: Re, onError: ct });
      let Ae;
      try {
        Ae = D.apply(this && this.$id === e ? this : G, ue);
      } catch (X) {
        throw (xt(we, X), X);
      }
      return Ae instanceof Promise
        ? Ae.then((X) => (xt(_e, X), X)).catch(
            (X) => (xt(we, X), Promise.reject(X)),
          )
        : (xt(_e, Ae), Ae);
    };
  }
  const q = {
      _p: s,
      $id: e,
      $onAction: vr.bind(null, p),
      $patch: N,
      $reset: k,
      $subscribe(z, D = {}) {
        const ue = vr(h, z, D.detached, () => _e()),
          _e = i.run(() =>
            jt(
              () => s.state.value[e],
              (we) => {
                (D.flush === "sync" ? a : d) &&
                  z({ storeId: e, type: Dt.direct, events: v }, we);
              },
              Je({}, c, D),
            ),
          );
        return ue;
      },
      $dispose: B,
    },
    G = Zt(q);
  s._s.set(e, G);
  const ce = ((s._a && s._a.runWithContext) || Rc)(() =>
    s._e.run(() => (i = Dr()).run(t)),
  );
  for (const z in ce) {
    const D = ce[z];
    if ((fe(D) && !kc(D)) || ot(D))
      o ||
        (A && Lc(D) && (fe(D) ? (D.value = A[z]) : fs(D, A[z])),
        (s.state.value[e][z] = D));
    else if (typeof D == "function") {
      const ue = V(z, D);
      (ce[z] = ue), (l.actions[z] = D);
    }
  }
  return (
    Je(G, ce),
    Je(W(G), ce),
    Object.defineProperty(G, "$state", {
      get: () => s.state.value[e],
      set: (z) => {
        N((D) => {
          Je(D, z);
        });
      },
    }),
    s._p.forEach((z) => {
      Je(
        G,
        i.run(() => z({ store: G, app: s._a, pinia: s, options: l })),
      );
    }),
    A && o && n.hydrate && n.hydrate(G.$state, A),
    (d = !0),
    (a = !0),
    G
  );
}
function Tc(e, t, n) {
  let s, r;
  const o = typeof t == "function";
  typeof e == "string" ? ((s = e), (r = o ? n : t)) : ((r = e), (s = e.id));
  function i(l, c) {
    const d = Sl();
    return (
      (l = l || (d ? ze(Vo, null) : null)),
      l && Nn(l),
      (l = $o),
      l._s.has(s) || (o ? Uo(s, t, r, l) : Ic(s, r, l)),
      l._s.get(s)
    );
  }
  return (i.$id = s), i;
}
const Mc = {},
  Xe = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Fc = { class: "app" };
function Nc(e, t, n, s, r, o) {
  const i = He("router-view");
  return Y(), J("div", Fc, [se(i)]);
}
const Bc = Xe(Mc, [["render", Nc]]),
  $c = {},
  Vc = {
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
  jc = Ul(
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
  Uc = [jc];
function Hc(e, t) {
  return Y(), J("svg", Vc, Uc);
}
const zc = Xe($c, [["render", Hc]]),
  Dc = [
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
  Bn = Tc("Store", {
    state() {
      return { brands: [], statesOfConfigurableCards: [], basket: [] };
    },
  }),
  Kc = {
    data() {
      return { isBrandButtonVisible: !1, brands_list: Dc, store: Bn() };
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
  Wc = ["data-brand-button-visible"],
  qc = ["data-brand-button-visible"],
  Gc = { class: "brands_list" },
  Xc = ["onClick"];
function Yc(e, t, n, s, r, o) {
  return (
    Y(),
    J(
      he,
      null,
      [
        O(
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
          Wc,
        ),
        O(
          "div",
          {
            class: "brands",
            "data-brand-button-visible": r.isBrandButtonVisible,
          },
          [
            O(
              "button",
              {
                onClick:
                  t[1] ||
                  (t[1] = (...i) => o.showAllBrands && o.showAllBrands(...i)),
                class: "allBrandsButton",
              },
              "All Brands:",
            ),
            O("div", Gc, [
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
                      Pe(i.title),
                      9,
                      Xc,
                    )
                  ),
                ),
                256,
              )),
            ]),
          ],
          8,
          qc,
        ),
      ],
      64,
    )
  );
}
const Qc = Xe(Kc, [["render", Yc]]),
  qn = [
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
  Zc = {},
  Jc = {
    "data-name": "Livello 1",
    id: "Livello_1",
    viewBox: "0 0 128 128",
    xmlns: "http://www.w3.org/2000/svg",
  },
  eu = O(
    "path",
    {
      d: "M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z",
    },
    null,
    -1,
  ),
  tu = O(
    "path",
    {
      d: "M90,61H67V38a3,3,0,0,0-6,0V61H38a3,3,0,0,0,0,6H61V90a3,3,0,0,0,6,0V67H90a3,3,0,0,0,0-6Z",
    },
    null,
    -1,
  ),
  nu = [eu, tu];
function su(e, t) {
  return Y(), J("svg", Jc, nu);
}
const Ho = Xe(Zc, [["render", su]]),
  ru = {
    components: { Plus: Ho },
    data() {
      return {
        filteredProductsList: qn,
        productsList: qn,
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
            qn.forEach((t) => {
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
  ou = { class: "catalog" },
  iu = O("h1", null, "Catalog:", -1),
  lu = { class: "catalog_list" },
  cu = { class: "card" },
  uu = ["src", "alt"],
  au = { class: "infoBlock" },
  fu = { class: "info" },
  du = { key: 0 },
  hu = { key: 0, class: "colors" },
  pu = ["data-choosen-state"],
  gu = ["onClick", "disabled"],
  _u = { key: 1, class: "sizes" },
  mu = ["disabled", "onClick", "data-choosen-state"],
  bu = { class: "buttonBlock" },
  vu = ["onClick", "disabled"],
  yu = { key: 0, class: "warningMessage" },
  xu = O("div", { class: "triangle" }, null, -1),
  Cu = O("div", { class: "message" }, "choose option", -1),
  Eu = [xu, Cu];
function wu(e, t, n, s, r, o) {
  const i = He("plus");
  return (
    Y(),
    J("div", ou, [
      iu,
      O("div", lu, [
        (Y(!0),
        J(
          he,
          null,
          Ut(r.filteredProductsList, (l) => {
            var c, d;
            return (
              Y(),
              J("div", cu, [
                O("div", null, [
                  O(
                    "img",
                    { src: o.chooseImage(l), alt: l.title },
                    null,
                    8,
                    uu,
                  ),
                ]),
                O("div", au, [
                  O("div", fu, [
                    O("h2", null, Pe(l.title), 1),
                    O("p", null, Pe(o.findBrand(l.brand)), 1),
                    O(
                      "p",
                      null,
                      Pe(
                        new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: l.regular_price.currency,
                        }).format(l.regular_price.value),
                      ),
                      1,
                    ),
                    l.configurable_options
                      ? (Y(),
                        J("div", du, [
                          l.configurable_options &&
                          o.hasAttribute(l.configurable_options, "color")
                            ? (Y(),
                              J("div", hu, [
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
                                          O(
                                            "button",
                                            {
                                              class: "colorOption",
                                              style: On({
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
                                            gu,
                                          ),
                                        ],
                                        8,
                                        pu,
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
                              J("div", _u, [
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
                                        Pe(a.label),
                                        9,
                                        mu,
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
                  O("div", bu, [
                    O(
                      "button",
                      {
                        class: "addButton",
                        onClick: (a) => o.addProduct(l),
                        disabled: o.setStateOfWarningMessage(l),
                      },
                      [se(i)],
                      8,
                      vu,
                    ),
                    o.setStateOfWarningMessage(l)
                      ? (Y(), J("div", yu, Eu))
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
const Su = Xe(ru, [["render", wu]]),
  Ou = {
    components: { Basket: zc, BrandsComponent: Qc, CatalogComponent: Su },
    data() {
      return { store: Bn() };
    },
    methods: {
      getCount() {
        return this.store.basket.reduce((e, t) => e + t.count, 0);
      },
    },
  },
  zo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAiCAQAAAD4kYM0AAAIEUlEQVRogeWaCWxURRjHq2I8EvGo7m67u91ryn1ZC0UUUFIRCKQYjmiQKknF24iIUVBQI6CAEAU5E8+AEKnEEEFMFJRUjQrIjSJXuVEKBWlpkf79z+xuu30zb19bmhTifoF2583M+77fzHfMQApS4iKsco2YIQ6IEnH8khCp50aRp1nRQqwUxxpsRYnYI8aLZnFGKUlwzRS45OS8GF7Lhubil0aYdbIzLp840eTGN0RKRecEWN80ypxbnHENaHLDGyoHRV+Cula0F2saacY/nXGNaXKzGy5V4qgoFucabb61zrgKTQND1eL0ijD88CKdf3wI8FvE0CNkK9beEa1H+IIARKiTV0lGXWZ62wnXDcyJBgNboo2S1gbz45JJVdxohXswFA9iMPqhG0f4NcStY3OZpIU2p7WHQBrf4rxspiV3U5tuGEj9BqMnW1z8nplsTH8nXH31QUF0xkYcwhEcwHbcQSjmyf24FTOxDzWf8ziMDejPJ4ngi3Ccs0VlL3Zjf/W3EuRzXybO2J/z7at+fggH8TuWYgw6GA2NqH1tWtBM9m+LF7EalTHd/sUOzOHSptsDOyJcTrhm68M8eILTn8ZOnOXP+2sZlAi1I7byeRX//gwfYglWYR0NrORq+mxwHabSQCkhmHF5uQui0OOwjuKcMnY7cuhOVlit8ACGo53BzQJcyvVqZDFWYBEK8Yf6dgy9+RYbXIUiJTmuK8QmfZgbCznxFDTna4C3+N00uYc7C/gbI2iGh308NDyDjpdNI2qvd9wZW9KEYo6ZwH5mZ/RiEJ/v4V5qFXvelphmK0NXcFTteYO4jeiruGP8mnZefK7AT+NeSqNuHiLNV56wlfrYuPZTTrja6lklzBfIlRiK6/AYf67lXjGF70yuODAR1yc8lYE6qPWOh/oMQpAKj8XNNqE+imsXIWZU9/AjFfPZegY9LPsriCycJK5cDVeA4aSEY6bipmo0Yb41l3iBl80boEp0csI1Sh/mxX2cshx3crdk86Vn0V1zA6lqF/XqR7h2NltbkxD3yj57datx7eb6J7qXn/GznO2DLW5kj8uDcey/RS1fYnsq3mH7Ji61IUtupq854PpaV9nNDQyG+jAlHSv5+2i+3g7Xo4ZnjY0rzF25m+35lihqjysdX7L/dNxiaU9DAdsrje7Lo2BKclxpPFpaBkW4k37glPOUSW68wt8LDUhkCJcu+y4jXKCOtVFDcYX4fW89cMmx29h/pLbzfcy8VXxSYPKJQU648nSFA7gdp6pV86OPyi1tDMHRQ6Sgq05iwBUqnFpDcWPh8lOnMrYPqqMzBtEJf7F/YoaOW5ejrBunb4BS4XfC9YGusIc1jgTUTgGKr+swQzERoossUzmrlEF/GZ7HXVTUXHTUD9cu7lyZBKISYLier97SzVIB2uGSS36GJYvupCHm3MOcaxoLVsu7V0SZ2OO6WuzUFXazgqpxvwhfuJbf5xgNDHL1xqmoEv1UsNJ5mMDsXLPuuGoyY5gLN1XNvlCrl+xwZTCHVlB6aikqxNmKVQjRcI12whUR5SaFv60V3N0MmCAGvTyI4vTQtIF4g6OOxaDNsC0D64qrgjltc0y2sFCVnyKODdYLVyV3ez1wdXfClWvaL9Lry1lO3kiTpDRnFSwNuNtQTEQlzD3moqEdWLCuVaYNtwFWV1wyIsZFngJO4VWm/gzt8GLvjF3pjOcN+S/ujFOtuMpE2AnXNF3daKI9yN0yCZOVTGR1f5Jt421NrFHeTUXlsWipTS1WV1x7aW4Wa75s7oWH+L2MscgUE+1whXg8O2pIDVGQMtS/ZA31G8XlTrjW6QpEI5fp85X9SStBPERldw6oT+ySB+QgJUBMq9nyibG6sy8kInRj4EltlCwk5GeEFf/sePqzw9VCnLW+Xr5G1itreN76oloK8SPkEVfUobryYDH7fneBuBILiTS6NvAPzxh6YWlfpqapE+M8Hnus+hWo0NLLGlqGOOEaqSvrQz9OdpgFgov045LKBF7BWGBN47pE2LtI5TBzpd8QXBFC+ZltHxkcPBmuZzlmv7r2SWxPxVy2r+OstZa+RPiccC3XlXUzVgFLLMZEiPF7tj9jgZBJ49wE5ONKScfxMz30UeWkXk03HJe80pugDi59tKLTHlcI7XGIo5bHIqo8+HtZv+Vz4YFR1uVcUXMsNONKFUf0veGjG8nrFasxUYyLLS8J4HG8zjprABN2DsNyL4xVKq5naWF224bhklBkNlukLYI9LnlqnKmi1E905hzusizqOYc+AsZC7UL7BSdc9+qqBhgfTpvCIDHmsX1frNKPw/VTlfinkim/Sv22h9isu6AGVzs6SLIs68UQNUftGykXazl5XWm9GQlykU7Z3HeF+TSets7hhAIlPxuYNbWSqKsTrlkmXLn4mCuQpZ0P5Y3ADLzPVaopFOXxpIAFx3sMqkX4jSniV3zKnZlNk+0ud+U807hLBpvuA2I69GCUmsJDUGKqkNeA86hbb4uhsuKfhQXoohWw0cXxca++iVUsdXdhJwPKXEa09vol9g5xVXJcV4pt5tWXhanJkSLqPtKa7dK57i66iJdmRmJ3qsHk/3TA3i72tuuTSR1cmtNlxjTTj/kR9U77jO1T0TVE/NHfPSawCxIv4024OorzyUyqv0QPw407Z2NqF05WBA1zwvV0UxtwEUkZz84OuFY1uZIXj6yu9e9iRlxFTa7kxSOvOeN6rsmVvHgkzxlXMzFdFIujLFX/zyL/M8pkcZkZ138pDBdBOzGOMgAAAABJRU5ErkJggg==",
  Pu = { class: "mainPageHeader" },
  Ru = O("div", null, [O("img", { src: zo, alt: "logo" })], -1),
  Au = { class: "basket" },
  Lu = { key: 0, class: "count_in_basket" },
  ku = { class: "container" };
function Iu(e, t, n, s, r, o) {
  const i = He("basket"),
    l = He("router-link"),
    c = He("brands-component"),
    d = He("catalog-component");
  return (
    Y(),
    J(
      he,
      null,
      [
        O("header", Pu, [
          Ru,
          O("div", Au, [
            r.store.basket.length > 0
              ? (Y(), J("div", Lu, Pe(o.getCount()), 1))
              : Te("", !0),
            se(
              l,
              { to: "/basket" },
              { default: bn(() => [O("button", null, [se(i)])]), _: 1 },
            ),
          ]),
        ]),
        O("div", ku, [se(c), se(d)]),
      ],
      64,
    )
  );
}
const Tu = Xe(Ou, [["render", Iu]]),
  Mu = {},
  Fu = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" },
  Nu = O(
    "path",
    {
      d: "M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 27 L 5 28 L 6 28 L 13 28 L 14 28 L 14 27 L 14 18 L 18 18 L 18 27 L 18 28 L 19 28 L 26 28 L 27 28 L 27 27 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 L 16 2.59375 z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 17 L 20 16 L 19 16 L 13 16 L 12 16 L 12 17 L 12 26 L 7 26 L 7 14.4375 L 16 5.4375 z",
      color: "black",
      overflow: "visible",
    },
    null,
    -1,
  ),
  Bu = [Nu];
function $u(e, t) {
  return Y(), J("svg", Fu, Bu);
}
const Vu = Xe(Mu, [["render", $u]]),
  ju = {},
  Uu = { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none" },
  Hu = O(
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
  zu = [Hu];
function Du(e, t) {
  return Y(), J("svg", Uu, zu);
}
const Ku = Xe(ju, [["render", Du]]),
  Wu = {
    components: { Home: Vu, Union: Ku, Plus: Ho },
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
  qu = { class: "basketHeader" },
  Gu = O("div", null, [O("img", { src: zo, alt: "logo" })], -1),
  Xu = { class: "basketContainer" },
  Yu = O("h1", { class: "shpppingCart" }, "Shopping Cart", -1),
  Qu = { class: "basketBody" },
  Zu = { class: "basketProductList" },
  Ju = { key: 0, class: "headOfTable" },
  ea = O(
    "div",
    { class: "item" },
    [O("h2", { class: "itemHead" }, "Item")],
    -1,
  ),
  ta = O(
    "div",
    { class: "rightSideOfHeadOfTable" },
    [
      O("h2", null, "Price"),
      O("h2", null, "Quantity"),
      O("h2", null, "Total"),
      O("div", { class: "space" }),
    ],
    -1,
  ),
  na = [ea, ta],
  sa = { key: 1, class: "emptyBasket" },
  ra = O("p", null, "No products in basket", -1),
  oa = O("p", null, "Add some ...", -1),
  ia = { class: "product" },
  la = { class: "item" },
  ca = { class: "image" },
  ua = ["src", "alt"],
  aa = { class: "productInfo" },
  fa = { key: 0 },
  da = { key: 1 },
  ha = ["onClick"],
  pa = O(
    "div",
    { class: "rightSideOfHeadOfTableForSizeLessThan768px" },
    [O("h2", null, "Price"), O("h2", null, "Quantity"), O("h2", null, "Total")],
    -1,
  ),
  ga = { class: "rightSideOfHeadOfTable" },
  _a = { class: "quantity" },
  ma = ["onUpdate:modelValue", "onBlur", "onChange"],
  ba = ["onClick"],
  va = { key: 0, class: "totalPrice" },
  ya = { key: 0, class: "bueButton" };
function xa(e, t, n, s, r, o) {
  const i = He("home"),
    l = He("router-link"),
    c = He("plus"),
    d = He("union");
  return (
    Y(),
    J(
      he,
      null,
      [
        O("header", qu, [
          O("div", null, [
            se(
              l,
              { to: "/" },
              { default: bn(() => [O("button", null, [se(i)])]), _: 1 },
            ),
          ]),
          Gu,
        ]),
        O("div", Xu, [
          Yu,
          O("div", Qu, [
            O("div", Zu, [
              r.store.basket.length > 0 ? (Y(), J("div", Ju, na)) : Te("", !0),
              r.store.basket.length == 0
                ? (Y(),
                  J("div", sa, [
                    ra,
                    oa,
                    se(
                      l,
                      { to: "/" },
                      { default: bn(() => [O("button", null, [se(c)])]), _: 1 },
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
                    J("div", ia, [
                      O("div", la, [
                        O("div", ca, [
                          O(
                            "img",
                            { src: o.chooseImage(a), alt: a.brand },
                            null,
                            8,
                            ua,
                          ),
                        ]),
                        O("div", aa, [
                          O("h2", null, Pe(a.title), 1),
                          O("p", null, [O("span", null, Pe(a.brand), 1)]),
                          a.variant
                            ? (Y(),
                              J(
                                "p",
                                fa,
                                " Color: " + Pe(o.option("color", a)),
                                1,
                              ))
                            : Te("", !0),
                          a.variant
                            ? (Y(),
                              J("p", da, "Size: " + Pe(o.option("size", a)), 1))
                            : Te("", !0),
                        ]),
                        O(
                          "button",
                          {
                            class: "unionForSizeLessThan768px",
                            onClick: (h) => o.deleteProduct(a),
                          },
                          [se(d)],
                          8,
                          ha,
                        ),
                      ]),
                      pa,
                      O("div", ga, [
                        O(
                          "h2",
                          null,
                          Pe(
                            new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: a.regular_price.currency,
                            }).format(a.regular_price.value),
                          ),
                          1,
                        ),
                        O("div", _a, [
                          rl(
                            O(
                              "input",
                              {
                                type: "number",
                                "onUpdate:modelValue": (h) => (a.count = h),
                                onBlur: (h) => o.checkBellowOneCount(a),
                                onChange: (h) => o.changeCount(a, h),
                              },
                              null,
                              40,
                              ma,
                            ),
                            [[yc, a.count]],
                          ),
                        ]),
                        O(
                          "h2",
                          null,
                          Pe(
                            new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: a.regular_price.currency,
                            }).format(a.regular_price.value * a.count),
                          ),
                          1,
                        ),
                        O(
                          "button",
                          {
                            class: "union",
                            onClick: (h) => o.deleteProduct(a),
                          },
                          [se(d)],
                          8,
                          ba,
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
                  va,
                  " Total: " +
                    Pe(
                      new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "USD",
                      }).format(o.getTotalPrice()),
                    ),
                  1,
                ))
              : Te("", !0),
            O("div", null, [
              r.store.basket.length > 0
                ? (Y(), J("button", ya, "Bue"))
                : Te("", !0),
            ]),
          ]),
        ]),
      ],
      64,
    )
  );
}
const Ca = Xe(Wu, [["render", xa]]);
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Et = typeof window < "u";
function Ea(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ee = Object.assign;
function Gn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Ne(r) ? r.map(e) : e(r);
  }
  return n;
}
const Kt = () => {},
  Ne = Array.isArray,
  wa = /\/$/,
  Sa = (e) => e.replace(wa, "");
function Xn(e, t, n = "/") {
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
    (s = Aa(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
  );
}
function Oa(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function yr(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Pa(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    kt(t.matched[s], n.matched[r]) &&
    Do(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function kt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Do(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Ra(e[n], t[n])) return !1;
  return !0;
}
function Ra(e, t) {
  return Ne(e) ? xr(e, t) : Ne(t) ? xr(t, e) : e === t;
}
function xr(e, t) {
  return Ne(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function Aa(e, t) {
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
var Qt;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Qt || (Qt = {}));
var Wt;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Wt || (Wt = {}));
function La(e) {
  if (!e)
    if (Et) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Sa(e);
}
const ka = /^[^#]+#/;
function Ia(e, t) {
  return e.replace(ka, "#") + t;
}
function Ta(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const $n = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Ma(e) {
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
    t = Ta(r, e);
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
function Fa(e, t) {
  ds.set(e, t);
}
function Na(e) {
  const t = ds.get(e);
  return ds.delete(e), t;
}
let Ba = () => location.protocol + "//" + location.host;
function Ko(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let l = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = r.slice(l);
    return c[0] !== "/" && (c = "/" + c), yr(c, "");
  }
  return yr(n, e) + s + r;
}
function $a(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const l = ({ state: p }) => {
    const v = Ko(e, location),
      A = n.value,
      T = t.value;
    let N = 0;
    if (p) {
      if (((n.value = v), (t.value = p), i && i === A)) {
        i = null;
        return;
      }
      N = T ? p.position - T.position : 0;
    } else s(v);
    r.forEach((k) => {
      k(n.value, A, {
        delta: N,
        type: Qt.pop,
        direction: N ? (N > 0 ? Wt.forward : Wt.back) : Wt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function d(p) {
    r.push(p);
    const v = () => {
      const A = r.indexOf(p);
      A > -1 && r.splice(A, 1);
    };
    return o.push(v), v;
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(ee({}, p.state, { scroll: $n() }), "");
  }
  function h() {
    for (const p of o) p();
    (o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", a);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", a, { passive: !0 }),
    { pauseListeners: c, listen: d, destroy: h }
  );
}
function Er(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? $n() : null,
  };
}
function Va(e) {
  const { history: t, location: n } = window,
    s = { value: Ko(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, d, a) {
    const h = e.indexOf("#"),
      p =
        h > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c
          : Ba() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](d, "", p), (r.value = d);
    } catch (v) {
      console.error(v), n[a ? "replace" : "assign"](p);
    }
  }
  function i(c, d) {
    const a = ee({}, t.state, Er(r.value.back, c, r.value.forward, !0), d, {
      position: r.value.position,
    });
    o(c, a, !0), (s.value = c);
  }
  function l(c, d) {
    const a = ee({}, r.value, t.state, { forward: c, scroll: $n() });
    o(a.current, a, !0);
    const h = ee({}, Er(s.value, c, null), { position: a.position + 1 }, d);
    o(c, h, !1), (s.value = c);
  }
  return { location: s, state: r, push: l, replace: i };
}
function ja(e) {
  e = La(e);
  const t = Va(e),
    n = $a(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = ee(
    { location: "", base: e, go: s, createHref: Ia.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function Ua(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Wo(e) {
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
  qo = Symbol("");
var wr;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(wr || (wr = {}));
function It(e, t) {
  return ee(new Error(), { type: e, [qo]: !0 }, t);
}
function We(e, t) {
  return e instanceof Error && qo in e && (t == null || !!(e.type & t));
}
const Sr = "[^/]+?",
  Ha = { sensitive: !1, strict: !1, start: !0, end: !0 },
  za = /[.+*?^${}()[\]/\\]/g;
function Da(e, t) {
  const n = ee({}, Ha, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const a = d.length ? [] : [90];
    n.strict && !d.length && (r += "/");
    for (let h = 0; h < d.length; h++) {
      const p = d[h];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (r += "/"), (r += p.value.replace(za, "\\$&")), (v += 40);
      else if (p.type === 1) {
        const { value: A, repeatable: T, optional: N, regexp: k } = p;
        o.push({ name: A, repeatable: T, optional: N });
        const B = k || Sr;
        if (B !== Sr) {
          v += 10;
          try {
            new RegExp(`(${B})`);
          } catch (q) {
            throw new Error(
              `Invalid custom RegExp for param "${A}" (${B}): ` + q.message,
            );
          }
        }
        let V = T ? `((?:${B})(?:/(?:${B}))*)` : `(${B})`;
        h || (V = N && d.length < 2 ? `(?:/${V})` : "/" + V),
          N && (V += "?"),
          (r += V),
          (v += 20),
          N && (v += -8),
          T && (v += -20),
          B === ".*" && (v += -50);
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
    for (let p = 1; p < a.length; p++) {
      const v = a[p] || "",
        A = o[p - 1];
      h[A.name] = v && A.repeatable ? v.split("/") : v;
    }
    return h;
  }
  function c(d) {
    let a = "",
      h = !1;
    for (const p of e) {
      (!h || !a.endsWith("/")) && (a += "/"), (h = !1);
      for (const v of p)
        if (v.type === 0) a += v.value;
        else if (v.type === 1) {
          const { value: A, repeatable: T, optional: N } = v,
            k = A in d ? d[A] : "";
          if (Ne(k) && !T)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const B = Ne(k) ? k.join("/") : k;
          if (!B)
            if (N)
              p.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${A}"`);
          a += B;
        }
    }
    return a || "/";
  }
  return { re: i, score: s, keys: o, parse: l, stringify: c };
}
function Ka(e, t) {
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
function Wa(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = Ka(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Or(s)) return 1;
    if (Or(r)) return -1;
  }
  return r.length - s.length;
}
function Or(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const qa = { type: 0, value: "" },
  Ga = /[a-zA-Z0-9_]/;
function Xa(e) {
  if (!e) return [[]];
  if (e === "/") return [[qa]];
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
  function p() {
    d += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (s = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (d && h(), i()) : c === ":" ? (h(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = s);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Ga.test(c)
            ? p()
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
function Ya(e, t, n) {
  const s = Da(Xa(e.path), n),
    r = ee(s, { record: e, parent: t, children: [], alias: [] });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Qa(e, t) {
  const n = [],
    s = new Map();
  t = Ar({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(a) {
    return s.get(a);
  }
  function o(a, h, p) {
    const v = !p,
      A = Za(a);
    A.aliasOf = p && p.record;
    const T = Ar(t, a),
      N = [A];
    if ("alias" in a) {
      const V = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const q of V)
        N.push(
          ee({}, A, {
            components: p ? p.record.components : A.components,
            path: q,
            aliasOf: p ? p.record : A,
          }),
        );
    }
    let k, B;
    for (const V of N) {
      const { path: q } = V;
      if (h && q[0] !== "/") {
        const G = h.record.path,
          j = G[G.length - 1] === "/" ? "" : "/";
        V.path = h.record.path + (q && j + q);
      }
      if (
        ((k = Ya(V, h, T)),
        p
          ? p.alias.push(k)
          : ((B = B || k),
            B !== k && B.alias.push(k),
            v && a.name && !Rr(k) && i(a.name)),
        A.children)
      ) {
        const G = A.children;
        for (let j = 0; j < G.length; j++) o(G[j], k, p && p.children[j]);
      }
      (p = p || k),
        ((k.record.components && Object.keys(k.record.components).length) ||
          k.record.name ||
          k.record.redirect) &&
          c(k);
    }
    return B
      ? () => {
          i(B);
        }
      : Kt;
  }
  function i(a) {
    if (Wo(a)) {
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
      Wa(a, n[h]) >= 0 &&
      (a.record.path !== n[h].record.path || !Go(a, n[h]));

    )
      h++;
    n.splice(h, 0, a), a.record.name && !Rr(a) && s.set(a.record.name, a);
  }
  function d(a, h) {
    let p,
      v = {},
      A,
      T;
    if ("name" in a && a.name) {
      if (((p = s.get(a.name)), !p)) throw It(1, { location: a });
      (T = p.record.name),
        (v = ee(
          Pr(
            h.params,
            p.keys.filter((B) => !B.optional).map((B) => B.name),
          ),
          a.params &&
            Pr(
              a.params,
              p.keys.map((B) => B.name),
            ),
        )),
        (A = p.stringify(v));
    } else if ("path" in a)
      (A = a.path),
        (p = n.find((B) => B.re.test(A))),
        p && ((v = p.parse(A)), (T = p.record.name));
    else {
      if (((p = h.name ? s.get(h.name) : n.find((B) => B.re.test(h.path))), !p))
        throw It(1, { location: a, currentLocation: h });
      (T = p.record.name),
        (v = ee({}, h.params, a.params)),
        (A = p.stringify(v));
    }
    const N = [];
    let k = p;
    for (; k; ) N.unshift(k.record), (k = k.parent);
    return { name: T, path: A, params: v, matched: N, meta: ef(N) };
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
function Pr(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function Za(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Ja(e),
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
function Ja(e) {
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
function ef(e) {
  return e.reduce((t, n) => ee(t, n.meta), {});
}
function Ar(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function Go(e, t) {
  return t.children.some((n) => n === e || Go(e, n));
}
const Xo = /#/g,
  tf = /&/g,
  nf = /\//g,
  sf = /=/g,
  rf = /\?/g,
  Yo = /\+/g,
  of = /%5B/g,
  lf = /%5D/g,
  Qo = /%5E/g,
  cf = /%60/g,
  Zo = /%7B/g,
  uf = /%7C/g,
  Jo = /%7D/g,
  af = /%20/g;
function Ms(e) {
  return encodeURI("" + e)
    .replace(uf, "|")
    .replace(of, "[")
    .replace(lf, "]");
}
function ff(e) {
  return Ms(e).replace(Zo, "{").replace(Jo, "}").replace(Qo, "^");
}
function hs(e) {
  return Ms(e)
    .replace(Yo, "%2B")
    .replace(af, "+")
    .replace(Xo, "%23")
    .replace(tf, "%26")
    .replace(cf, "`")
    .replace(Zo, "{")
    .replace(Jo, "}")
    .replace(Qo, "^");
}
function df(e) {
  return hs(e).replace(sf, "%3D");
}
function hf(e) {
  return Ms(e).replace(Xo, "%23").replace(rf, "%3F");
}
function pf(e) {
  return e == null ? "" : hf(e).replace(nf, "%2F");
}
function xn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function gf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Yo, " "),
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
function Lr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = df(n)), s == null)) {
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
function _f(e) {
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
const mf = Symbol(""),
  kr = Symbol(""),
  Fs = Symbol(""),
  ei = Symbol(""),
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
            ? l(It(4, { from: n, to: t }))
            : h instanceof Error
              ? l(h)
              : Ua(h)
                ? l(It(2, { from: t, to: h }))
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
        if (bf(l)) {
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
              const a = Ea(d) ? d.default : d;
              o.components[i] = a;
              const p = (a.__vccOpts || a)[t];
              return p && st(p, n, s, o, i)();
            }),
          );
        }
    }
  return r;
}
function bf(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Ir(e) {
  const t = ze(Fs),
    n = ze(ei),
    s = Le(() => t.resolve(Ot(e.to))),
    r = Le(() => {
      const { matched: c } = s.value,
        { length: d } = c,
        a = c[d - 1],
        h = n.matched;
      if (!a || !h.length) return -1;
      const p = h.findIndex(kt.bind(null, a));
      if (p > -1) return p;
      const v = Tr(c[d - 2]);
      return d > 1 && Tr(a) === v && h[h.length - 1].path !== v
        ? h.findIndex(kt.bind(null, c[d - 2]))
        : p;
    }),
    o = Le(() => r.value > -1 && Cf(n.params, s.value.params)),
    i = Le(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Do(n.params, s.value.params),
    );
  function l(c = {}) {
    return xf(c)
      ? t[Ot(e.replace) ? "replace" : "push"](Ot(e.to)).catch(Kt)
      : Promise.resolve();
  }
  return {
    route: s,
    href: Le(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
const vf = yo({
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
      const n = Zt(Ir(e)),
        { options: s } = ze(Fs),
        r = Le(() => ({
          [Mr(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Mr(
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
  yf = vf;
function xf(e) {
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
function Cf(e, t) {
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
function Tr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Mr = (e, t, n) => e ?? t ?? n,
  Ef = yo({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = ze(ps),
        r = Le(() => e.route || s.value),
        o = ze(kr, 0),
        i = Le(() => {
          let d = Ot(o);
          const { matched: a } = r.value;
          let h;
          for (; (h = a[d]) && !h.components; ) d++;
          return d;
        }),
        l = Le(() => r.value.matched[i.value]);
      fn(
        kr,
        Le(() => i.value + 1),
      ),
        fn(mf, l),
        fn(ps, r);
      const c = Ps();
      return (
        jt(
          () => [c.value, l.value, e.name],
          ([d, a, h], [p, v, A]) => {
            a &&
              ((a.instances[h] = d),
              v &&
                v !== a &&
                d &&
                d === p &&
                (a.leaveGuards.size || (a.leaveGuards = v.leaveGuards),
                a.updateGuards.size || (a.updateGuards = v.updateGuards))),
              d &&
                a &&
                (!v || !kt(a, v) || !p) &&
                (a.enterCallbacks[h] || []).forEach((T) => T(d));
          },
          { flush: "post" },
        ),
        () => {
          const d = r.value,
            a = e.name,
            h = l.value,
            p = h && h.components[a];
          if (!p) return Fr(n.default, { Component: p, route: d });
          const v = h.props[a],
            A = v
              ? v === !0
                ? d.params
                : typeof v == "function"
                  ? v(d)
                  : v
              : null,
            N = Bo(
              p,
              ee({}, A, t, {
                onVnodeUnmounted: (k) => {
                  k.component.isUnmounted && (h.instances[a] = null);
                },
                ref: c,
              }),
            );
          return Fr(n.default, { Component: N, route: d }) || N;
        }
      );
    },
  });
function Fr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const wf = Ef;
function Sf(e) {
  const t = Qa(e.routes, e),
    n = e.parseQuery || gf,
    s = e.stringifyQuery || Lr,
    r = e.history,
    o = Bt(),
    i = Bt(),
    l = Bt(),
    c = Fi(Ze);
  let d = Ze;
  Et &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = Gn.bind(null, (m) => "" + m),
    h = Gn.bind(null, pf),
    p = Gn.bind(null, xn);
  function v(m, P) {
    let w, L;
    return (
      Wo(m) ? ((w = t.getRecordMatcher(m)), (L = P)) : (L = m), t.addRoute(L, w)
    );
  }
  function A(m) {
    const P = t.getRecordMatcher(m);
    P && t.removeRoute(P);
  }
  function T() {
    return t.getRoutes().map((m) => m.record);
  }
  function N(m) {
    return !!t.getRecordMatcher(m);
  }
  function k(m, P) {
    if (((P = ee({}, P || c.value)), typeof m == "string")) {
      const f = Xn(n, m, P.path),
        g = t.resolve({ path: f.path }, P),
        b = r.createHref(f.fullPath);
      return ee(f, g, {
        params: p(g.params),
        hash: xn(f.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let w;
    if ("path" in m) w = ee({}, m, { path: Xn(n, m.path, P.path).path });
    else {
      const f = ee({}, m.params);
      for (const g in f) f[g] == null && delete f[g];
      (w = ee({}, m, { params: h(f) })), (P.params = h(P.params));
    }
    const L = t.resolve(w, P),
      Z = m.hash || "";
    L.params = a(p(L.params));
    const oe = Oa(s, ee({}, m, { hash: ff(Z), path: L.path })),
      u = r.createHref(oe);
    return ee(
      { fullPath: oe, hash: Z, query: s === Lr ? _f(m.query) : m.query || {} },
      L,
      { redirectedFrom: void 0, href: u },
    );
  }
  function B(m) {
    return typeof m == "string" ? Xn(n, m, c.value.path) : ee({}, m);
  }
  function V(m, P) {
    if (d !== m) return It(8, { from: P, to: m });
  }
  function q(m) {
    return ce(m);
  }
  function G(m) {
    return q(ee(B(m), { replace: !0 }));
  }
  function j(m) {
    const P = m.matched[m.matched.length - 1];
    if (P && P.redirect) {
      const { redirect: w } = P;
      let L = typeof w == "function" ? w(m) : w;
      return (
        typeof L == "string" &&
          ((L = L.includes("?") || L.includes("#") ? (L = B(L)) : { path: L }),
          (L.params = {})),
        ee(
          { query: m.query, hash: m.hash, params: "path" in L ? {} : m.params },
          L,
        )
      );
    }
  }
  function ce(m, P) {
    const w = (d = k(m)),
      L = c.value,
      Z = m.state,
      oe = m.force,
      u = m.replace === !0,
      f = j(w);
    if (f)
      return ce(
        ee(B(f), {
          state: typeof f == "object" ? ee({}, Z, f.state) : Z,
          force: oe,
          replace: u,
        }),
        P || w,
      );
    const g = w;
    g.redirectedFrom = P;
    let b;
    return (
      !oe &&
        Pa(s, L, w) &&
        ((b = It(16, { to: g, from: L })), Be(L, L, !0, !1)),
      (b ? Promise.resolve(b) : ue(g, L))
        .catch((_) => (We(_) ? (We(_, 2) ? _ : Ye(_)) : Q(_, g, L)))
        .then((_) => {
          if (_) {
            if (We(_, 2))
              return ce(
                ee({ replace: u }, B(_.to), {
                  state: typeof _.to == "object" ? ee({}, Z, _.to.state) : Z,
                  force: oe,
                }),
                P || g,
              );
          } else _ = we(g, L, !0, u, Z);
          return _e(g, L, _), _;
        })
    );
  }
  function z(m, P) {
    const w = V(m, P);
    return w ? Promise.reject(w) : Promise.resolve();
  }
  function D(m) {
    const P = vt.values().next().value;
    return P && typeof P.runWithContext == "function"
      ? P.runWithContext(m)
      : m();
  }
  function ue(m, P) {
    let w;
    const [L, Z, oe] = Of(m, P);
    w = Yn(L.reverse(), "beforeRouteLeave", m, P);
    for (const f of L)
      f.leaveGuards.forEach((g) => {
        w.push(st(g, m, P));
      });
    const u = z.bind(null, m, P);
    return (
      w.push(u),
      me(w)
        .then(() => {
          w = [];
          for (const f of o.list()) w.push(st(f, m, P));
          return w.push(u), me(w);
        })
        .then(() => {
          w = Yn(Z, "beforeRouteUpdate", m, P);
          for (const f of Z)
            f.updateGuards.forEach((g) => {
              w.push(st(g, m, P));
            });
          return w.push(u), me(w);
        })
        .then(() => {
          w = [];
          for (const f of oe)
            if (f.beforeEnter)
              if (Ne(f.beforeEnter))
                for (const g of f.beforeEnter) w.push(st(g, m, P));
              else w.push(st(f.beforeEnter, m, P));
          return w.push(u), me(w);
        })
        .then(
          () => (
            m.matched.forEach((f) => (f.enterCallbacks = {})),
            (w = Yn(oe, "beforeRouteEnter", m, P)),
            w.push(u),
            me(w)
          ),
        )
        .then(() => {
          w = [];
          for (const f of i.list()) w.push(st(f, m, P));
          return w.push(u), me(w);
        })
        .catch((f) => (We(f, 8) ? f : Promise.reject(f)))
    );
  }
  function _e(m, P, w) {
    l.list().forEach((L) => D(() => L(m, P, w)));
  }
  function we(m, P, w, L, Z) {
    const oe = V(m, P);
    if (oe) return oe;
    const u = P === Ze,
      f = Et ? history.state : {};
    w &&
      (L || u
        ? r.replace(m.fullPath, ee({ scroll: u && f && f.scroll }, Z))
        : r.push(m.fullPath, Z)),
      (c.value = m),
      Be(m, P, w, u),
      Ye();
  }
  let Re;
  function ct() {
    Re ||
      (Re = r.listen((m, P, w) => {
        if (!en.listening) return;
        const L = k(m),
          Z = j(L);
        if (Z) {
          ce(ee(Z, { replace: !0 }), L).catch(Kt);
          return;
        }
        d = L;
        const oe = c.value;
        Et && Fa(Cr(oe.fullPath, w.delta), $n()),
          ue(L, oe)
            .catch((u) =>
              We(u, 12)
                ? u
                : We(u, 2)
                  ? (ce(u.to, L)
                      .then((f) => {
                        We(f, 20) &&
                          !w.delta &&
                          w.type === Qt.pop &&
                          r.go(-1, !1);
                      })
                      .catch(Kt),
                    Promise.reject())
                  : (w.delta && r.go(-w.delta, !1), Q(u, L, oe)),
            )
            .then((u) => {
              (u = u || we(L, oe, !1)),
                u &&
                  (w.delta && !We(u, 8)
                    ? r.go(-w.delta, !1)
                    : w.type === Qt.pop && We(u, 20) && r.go(-1, !1)),
                _e(L, oe, u);
            })
            .catch(Kt);
      }));
  }
  let Ae = Bt(),
    X = Bt(),
    te;
  function Q(m, P, w) {
    Ye(m);
    const L = X.list();
    return (
      L.length ? L.forEach((Z) => Z(m, P, w)) : console.error(m),
      Promise.reject(m)
    );
  }
  function Ke() {
    return te && c.value !== Ze
      ? Promise.resolve()
      : new Promise((m, P) => {
          Ae.add([m, P]);
        });
  }
  function Ye(m) {
    return (
      te ||
        ((te = !m),
        ct(),
        Ae.list().forEach(([P, w]) => (m ? w(m) : P())),
        Ae.reset()),
      m
    );
  }
  function Be(m, P, w, L) {
    const { scrollBehavior: Z } = e;
    if (!Et || !Z) return Promise.resolve();
    const oe =
      (!w && Na(Cr(m.fullPath, 0))) ||
      ((L || !w) && history.state && history.state.scroll) ||
      null;
    return As()
      .then(() => Z(m, P, oe))
      .then((u) => u && Ma(u))
      .catch((u) => Q(u, m, P));
  }
  const xe = (m) => r.go(m);
  let bt;
  const vt = new Set(),
    en = {
      currentRoute: c,
      listening: !0,
      addRoute: v,
      removeRoute: A,
      hasRoute: N,
      getRoutes: T,
      resolve: k,
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
        const P = this;
        m.component("RouterLink", yf),
          m.component("RouterView", wf),
          (m.config.globalProperties.$router = P),
          Object.defineProperty(m.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Ot(c),
          }),
          Et &&
            !bt &&
            c.value === Ze &&
            ((bt = !0), q(r.location).catch((Z) => {}));
        const w = {};
        for (const Z in Ze)
          Object.defineProperty(w, Z, {
            get: () => c.value[Z],
            enumerable: !0,
          });
        m.provide(Fs, P), m.provide(ei, so(w)), m.provide(ps, c);
        const L = m.unmount;
        vt.add(m),
          (m.unmount = function () {
            vt.delete(m),
              vt.size < 1 &&
                ((d = Ze),
                Re && Re(),
                (Re = null),
                (c.value = Ze),
                (bt = !1),
                (te = !1)),
              L();
          });
      },
    };
  function me(m) {
    return m.reduce((P, w) => P.then(() => D(w)), Promise.resolve());
  }
  return en;
}
function Of(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((d) => kt(d, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((d) => kt(d, c)) || r.push(c));
  }
  return [n, s, r];
}
const Pf = [
    { path: "/", component: Tu },
    { path: "/basket", component: Ca },
  ],
  Rf = Sf({ routes: Pf, history: ja() });
Ec(Bc)
  .use({
    install: (e) => {
      e.use(Rf), e.use(Pc());
    },
  })
  .mount("#app");
