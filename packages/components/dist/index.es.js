import Be, { createContext as da, useState as ge, useEffect as Ke, useContext as ua, useLayoutEffect as Zl, useRef as ns, useCallback as Ze, Children as ec, isValidElement as as, useMemo as pt, cloneElement as os, Fragment as rc, useId as bo } from "react";
import { VocdoniSDKClient as Yo, ElectionStatus as on, CensusType as rt, Vote as qo, Account as Go } from "@vocdoni/sdk";
import { forwardRef as ve, useStyleConfig as ir, chakra as ne, useMultiStyleConfig as Mr, omitThemingProps as sr, keyframes as tc, layoutPropNames as nc, defineStyleConfig as ac, createMultiStyleConfigHelpers as oc } from "@chakra-ui/system";
import ic from "react-markdown";
import sc from "remark-gfm";
var Rn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ja = {}, lc = {
  get exports() {
    return Ja;
  },
  set exports(e) {
    Ja = e;
  }
}, Pn = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xo;
function cc() {
  if (Xo)
    return Pn;
  Xo = 1;
  var e = Symbol.for("react.fragment");
  return Pn.Fragment = e, Pn.jsxDEV = void 0, Pn;
}
var Fn = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qo;
function dc() {
  return Qo || (Qo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Be, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), u = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), S = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), R = Symbol.iterator, Y = "@@iterator";
    function L(c) {
      if (c === null || typeof c != "object")
        return null;
      var T = R && c[R] || c[Y];
      return typeof T == "function" ? T : null;
    }
    var O = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(c) {
      {
        for (var T = arguments.length, P = new Array(T > 1 ? T - 1 : 0), l = 1; l < T; l++)
          P[l - 1] = arguments[l];
        q("error", c, P);
      }
    }
    function q(c, T, P) {
      {
        var l = O.ReactDebugCurrentFrame, y = l.getStackAddendum();
        y !== "" && (T += "%s", P = P.concat([y]));
        var k = P.map(function($) {
          return String($);
        });
        k.unshift("Warning: " + T), Function.prototype.apply.call(console[c], console, k);
      }
    }
    var ie = !1, M = !1, Q = !1, K = !1, re = !1, fe;
    fe = Symbol.for("react.module.reference");
    function Ee(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === n || c === o || re || c === a || c === v || c === S || K || c === C || ie || M || Q || typeof c == "object" && c !== null && (c.$$typeof === _ || c.$$typeof === b || c.$$typeof === i || c.$$typeof === u || c.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === fe || c.getModuleId !== void 0));
    }
    function me(c, T, P) {
      var l = c.displayName;
      if (l)
        return l;
      var y = T.displayName || T.name || "";
      return y !== "" ? P + "(" + y + ")" : P;
    }
    function J(c) {
      return c.displayName || "Context";
    }
    function I(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case v:
          return "Suspense";
        case S:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case u:
            var T = c;
            return J(T) + ".Consumer";
          case i:
            var P = c;
            return J(P._context) + ".Provider";
          case h:
            return me(c, c.render, "ForwardRef");
          case b:
            var l = c.displayName || null;
            return l !== null ? l : I(c.type) || "Memo";
          case _: {
            var y = c, k = y._payload, $ = y._init;
            try {
              return I($(k));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Z = Object.assign, ee = 0, se, ye, Ye, Ve, Me, er, rr;
    function le() {
    }
    le.__reactDisabledLog = !0;
    function ur() {
      {
        if (ee === 0) {
          se = console.log, ye = console.info, Ye = console.warn, Ve = console.error, Me = console.group, er = console.groupCollapsed, rr = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: le,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        ee++;
      }
    }
    function br() {
      {
        if (ee--, ee === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Z({}, c, {
              value: se
            }),
            info: Z({}, c, {
              value: ye
            }),
            warn: Z({}, c, {
              value: Ye
            }),
            error: Z({}, c, {
              value: Ve
            }),
            group: Z({}, c, {
              value: Me
            }),
            groupCollapsed: Z({}, c, {
              value: er
            }),
            groupEnd: Z({}, c, {
              value: rr
            })
          });
        }
        ee < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var j = O.ReactCurrentDispatcher, ce;
    function ae(c, T, P) {
      {
        if (ce === void 0)
          try {
            throw Error();
          } catch (y) {
            var l = y.stack.trim().match(/\n( *(at )?)/);
            ce = l && l[1] || "";
          }
        return `
` + ce + c;
      }
    }
    var be = !1, Pe;
    {
      var te = typeof WeakMap == "function" ? WeakMap : Map;
      Pe = new te();
    }
    function $e(c, T) {
      if (!c || be)
        return "";
      {
        var P = Pe.get(c);
        if (P !== void 0)
          return P;
      }
      var l;
      be = !0;
      var y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var k;
      k = j.current, j.current = null, ur();
      try {
        if (T) {
          var $ = function() {
            throw Error();
          };
          if (Object.defineProperty($.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct($, []);
            } catch (ze) {
              l = ze;
            }
            Reflect.construct(c, [], $);
          } else {
            try {
              $.call();
            } catch (ze) {
              l = ze;
            }
            c.call($.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ze) {
            l = ze;
          }
          c();
        }
      } catch (ze) {
        if (ze && l && typeof ze.stack == "string") {
          for (var D = ze.stack.split(`
`), X = l.stack.split(`
`), H = D.length - 1, V = X.length - 1; H >= 1 && V >= 0 && D[H] !== X[V]; )
            V--;
          for (; H >= 1 && V >= 0; H--, V--)
            if (D[H] !== X[V]) {
              if (H !== 1 || V !== 1)
                do
                  if (H--, V--, V < 0 || D[H] !== X[V]) {
                    var _e = `
` + D[H].replace(" at new ", " at ");
                    return c.displayName && _e.includes("<anonymous>") && (_e = _e.replace("<anonymous>", c.displayName)), typeof c == "function" && Pe.set(c, _e), _e;
                  }
                while (H >= 1 && V >= 0);
              break;
            }
        }
      } finally {
        be = !1, j.current = k, br(), Error.prepareStackTrace = y;
      }
      var we = c ? c.displayName || c.name : "", Ne = we ? ae(we) : "";
      return typeof c == "function" && Pe.set(c, Ne), Ne;
    }
    function pr(c, T, P) {
      return $e(c, !1);
    }
    function kt(c) {
      var T = c.prototype;
      return !!(T && T.isReactComponent);
    }
    function yr(c, T, P) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return $e(c, kt(c));
      if (typeof c == "string")
        return ae(c);
      switch (c) {
        case v:
          return ae("Suspense");
        case S:
          return ae("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case h:
            return pr(c.render);
          case b:
            return yr(c.type, T, P);
          case _: {
            var l = c, y = l._payload, k = l._init;
            try {
              return yr(k(y), T, P);
            } catch {
            }
          }
        }
      return "";
    }
    var d = Object.prototype.hasOwnProperty, p = {}, x = O.ReactDebugCurrentFrame;
    function A(c) {
      if (c) {
        var T = c._owner, P = yr(c.type, c._source, T ? T.type : null);
        x.setExtraStackFrame(P);
      } else
        x.setExtraStackFrame(null);
    }
    function F(c, T, P, l, y) {
      {
        var k = Function.call.bind(d);
        for (var $ in c)
          if (k(c, $)) {
            var D = void 0;
            try {
              if (typeof c[$] != "function") {
                var X = Error((l || "React class") + ": " + P + " type `" + $ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[$] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw X.name = "Invariant Violation", X;
              }
              D = c[$](T, $, l, P, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              D = H;
            }
            D && !(D instanceof Error) && (A(y), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", l || "React class", P, $, typeof D), A(null)), D instanceof Error && !(D.message in p) && (p[D.message] = !0, A(y), w("Failed %s type: %s", P, D.message), A(null));
          }
      }
    }
    var E = Array.isArray;
    function W(c) {
      return E(c);
    }
    function de(c) {
      {
        var T = typeof Symbol == "function" && Symbol.toStringTag, P = T && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return P;
      }
    }
    function Te(c) {
      try {
        return tr(c), !1;
      } catch {
        return !0;
      }
    }
    function tr(c) {
      return "" + c;
    }
    function jr(c) {
      if (Te(c))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", de(c)), tr(c);
    }
    var Ge = O.ReactCurrentOwner, Sr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fr, Tr, xr;
    xr = {};
    function Vr(c) {
      if (d.call(c, "ref")) {
        var T = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function Ct(c) {
      if (d.call(c, "key")) {
        var T = Object.getOwnPropertyDescriptor(c, "key").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function Lt(c, T) {
      if (typeof c.ref == "string" && Ge.current && T && Ge.current.stateNode !== T) {
        var P = I(Ge.current.type);
        xr[P] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(Ge.current.type), c.ref), xr[P] = !0);
      }
    }
    function jt(c, T) {
      {
        var P = function() {
          Fr || (Fr = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: P,
          configurable: !0
        });
      }
    }
    function Er(c, T) {
      {
        var P = function() {
          Tr || (Tr = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: P,
          configurable: !0
        });
      }
    }
    var et = function(c, T, P, l, y, k, $) {
      var D = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: c,
        key: T,
        ref: P,
        props: $,
        // Record the component responsible for creating this element.
        _owner: k
      };
      return D._store = {}, Object.defineProperty(D._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(D, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.defineProperty(D, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(D.props), Object.freeze(D)), D;
    };
    function Vt(c, T, P, l, y) {
      {
        var k, $ = {}, D = null, X = null;
        P !== void 0 && (jr(P), D = "" + P), Ct(T) && (jr(T.key), D = "" + T.key), Vr(T) && (X = T.ref, Lt(T, y));
        for (k in T)
          d.call(T, k) && !Sr.hasOwnProperty(k) && ($[k] = T[k]);
        if (c && c.defaultProps) {
          var H = c.defaultProps;
          for (k in H)
            $[k] === void 0 && ($[k] = H[k]);
        }
        if (D || X) {
          var V = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          D && jt($, V), X && Er($, V);
        }
        return et(c, D, X, y, l, Ge.current, $);
      }
    }
    var Ar = O.ReactCurrentOwner, ct = O.ReactDebugCurrentFrame;
    function Je(c) {
      if (c) {
        var T = c._owner, P = yr(c.type, c._source, T ? T.type : null);
        ct.setExtraStackFrame(P);
      } else
        ct.setExtraStackFrame(null);
    }
    var fr;
    fr = !1;
    function Ur(c) {
      return typeof c == "object" && c !== null && c.$$typeof === r;
    }
    function mr() {
      {
        if (Ar.current) {
          var c = I(Ar.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function Ut(c) {
      {
        if (c !== void 0) {
          var T = c.fileName.replace(/^.*[\\\/]/, ""), P = c.lineNumber;
          return `

Check your code at ` + T + ":" + P + ".";
        }
        return "";
      }
    }
    var dt = {};
    function Ht(c) {
      {
        var T = mr();
        if (!T) {
          var P = typeof c == "string" ? c : c.displayName || c.name;
          P && (T = `

Check the top-level render call using <` + P + ">.");
        }
        return T;
      }
    }
    function ut(c, T) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var P = Ht(T);
        if (dt[P])
          return;
        dt[P] = !0;
        var l = "";
        c && c._owner && c._owner !== Ar.current && (l = " It was passed a child from " + I(c._owner.type) + "."), Je(c), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', P, l), Je(null);
      }
    }
    function ft(c, T) {
      {
        if (typeof c != "object")
          return;
        if (W(c))
          for (var P = 0; P < c.length; P++) {
            var l = c[P];
            Ur(l) && ut(l, T);
          }
        else if (Ur(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var y = L(c);
          if (typeof y == "function" && y !== c.entries)
            for (var k = y.call(c), $; !($ = k.next()).done; )
              Ur($.value) && ut($.value, T);
        }
      }
    }
    function hr(c) {
      {
        var T = c.type;
        if (T == null || typeof T == "string")
          return;
        var P;
        if (typeof T == "function")
          P = T.propTypes;
        else if (typeof T == "object" && (T.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        T.$$typeof === b))
          P = T.propTypes;
        else
          return;
        if (P) {
          var l = I(T);
          F(P, c.props, "prop", l, c);
        } else if (T.PropTypes !== void 0 && !fr) {
          fr = !0;
          var y = I(T);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yt(c) {
      {
        for (var T = Object.keys(c.props), P = 0; P < T.length; P++) {
          var l = T[P];
          if (l !== "children" && l !== "key") {
            Je(c), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", l), Je(null);
            break;
          }
        }
        c.ref !== null && (Je(c), w("Invalid attribute `ref` supplied to `React.Fragment`."), Je(null));
      }
    }
    function Tt(c, T, P, l, y, k) {
      {
        var $ = Ee(c);
        if (!$) {
          var D = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (D += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var X = Ut(y);
          X ? D += X : D += mr();
          var H;
          c === null ? H = "null" : W(c) ? H = "array" : c !== void 0 && c.$$typeof === r ? (H = "<" + (I(c.type) || "Unknown") + " />", D = " Did you accidentally export a JSX literal instead of a component?") : H = typeof c, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, D);
        }
        var V = Vt(c, T, P, y, k);
        if (V == null)
          return V;
        if ($) {
          var _e = T.children;
          if (_e !== void 0)
            if (l)
              if (W(_e)) {
                for (var we = 0; we < _e.length; we++)
                  ft(_e[we], c);
                Object.freeze && Object.freeze(_e);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ft(_e, c);
        }
        return c === n ? Yt(V) : hr(V), V;
      }
    }
    var qt = Tt;
    Fn.Fragment = n, Fn.jsxDEV = qt;
  }()), Fn;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = cc() : e.exports = dc();
})(lc);
const U = Ja.jsxDEV, uc = ({ env: e, client: r, signer: t }) => {
  const [n, a] = ge(r), [o, i] = ge(t), [u, h] = ge(e), [v, S] = ge(), [b, _] = ge(-1);
  Ke(() => {
    if (n)
      return;
    if ((!u || u && !u.length) && !n)
      throw new Error("You must provide a valid env or client to the ClientProvider");
    const O = {
      env: u,
      // TODO: REMOVE THE FOLLOWING csp_url when https://github.com/vocdoni/vocdoni-sdk/issues/163 is ready
      csp_url: "http://localhost:5000/v1"
    };
    o && (O.wallet = o), a(new Yo(O));
  }, [u, r]), Ke(() => {
    e && h(e);
  }, [e]), Ke(() => {
    t && Y(t);
  }, [t]), Ke(() => {
    !n || v || !o || (async () => await C())();
  }, [n, v, o]), Ke(() => {
    !n || !v || !o || (async () => await R())();
  }, [n, v, o]), Ke(() => {
    if (!("ethereum" in window))
      return;
    const O = async (w) => {
      S(void 0);
    };
    return window.ethereum.on("accountsChanged", O), () => {
      window.ethereum.removeListener("accountsChanged", O);
    };
  }, []);
  const C = async () => {
    let O;
    try {
      return O = await n.createAccount(), S(O), O;
    } catch (w) {
      console.error("could not fetch account:", w);
    }
  }, R = async () => {
    try {
      if (!v)
        throw new Error("Account not available");
      if (v.balance <= 10 && u !== "prod") {
        await n.collectFaucetTokens();
        const O = await n.fetchAccountInfo();
        _(O.balance);
        return;
      }
      _(v.balance);
    } catch (O) {
      console.error("could not fetch balance:", O);
    }
  }, Y = (O) => {
    if (!n)
      throw new Error("No client initialized");
    i(O), n.wallet = O;
  };
  return {
    account: v,
    balance: b,
    client: n,
    env: u,
    signer: o,
    generateSigner: (O) => {
      if (!n)
        throw new Error("No client initialized");
      let w;
      return O ? w = Yo.generateWalletFromData(O) : (n.generateRandomWallet(), w = n.wallet), w;
    },
    fetchAccount: C,
    fetchBalance: R,
    setClient: a,
    setSigner: Y
  };
}, is = da(void 0), po = () => {
  const e = ua(is);
  if (!e)
    throw new Error(
      "useClientContext returned `undefined`, maybe you forgot to wrap the component within <ClientProvider />?"
    );
  return {
    ...e,
    // Allow client extensions
    client: e.client
  };
}, P0 = ({ env: e, client: r, signer: t, ...n }) => {
  const a = uc({ env: e, client: r, signer: t });
  return /* @__PURE__ */ U(is.Provider, { value: a, ...n }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/client.tsx",
    lineNumber: 187,
    columnNumber: 10
  }, globalThis);
};
var qe = (...e) => e.filter(Boolean).join(" ");
function Mt(e) {
  const r = typeof e;
  return e != null && (r === "object" || r === "function") && !Array.isArray(e);
}
var We = (e) => e ? "" : void 0, Ra = (e) => e ? !0 : void 0;
function Dr(...e) {
  return function(t) {
    e.some((n) => (n == null || n(t), t == null ? void 0 : t.defaultPrevented));
  };
}
function fc(...e) {
  return function(t) {
    e.forEach((n) => {
      n == null || n(t);
    });
  };
}
var gn = {}, mc = {
  get exports() {
    return gn;
  },
  set exports(e) {
    gn = e;
  }
}, Qt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ko;
function hc() {
  if (Ko)
    return Qt;
  Ko = 1;
  var e = Be, r = Symbol.for("react.element"), t = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(u, h, v) {
    var S, b = {}, _ = null, C = null;
    v !== void 0 && (_ = "" + v), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (C = h.ref);
    for (S in h)
      n.call(h, S) && !o.hasOwnProperty(S) && (b[S] = h[S]);
    if (u && u.defaultProps)
      for (S in h = u.defaultProps, h)
        b[S] === void 0 && (b[S] = h[S]);
    return { $$typeof: r, type: u, key: _, ref: C, props: b, _owner: a.current };
  }
  return Qt.Fragment = t, Qt.jsx = i, Qt.jsxs = i, Qt;
}
var Kt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo;
function vc() {
  return Jo || (Jo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Be, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), u = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), S = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), R = Symbol.iterator, Y = "@@iterator";
    function L(l) {
      if (l === null || typeof l != "object")
        return null;
      var y = R && l[R] || l[Y];
      return typeof y == "function" ? y : null;
    }
    var O = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(l) {
      {
        for (var y = arguments.length, k = new Array(y > 1 ? y - 1 : 0), $ = 1; $ < y; $++)
          k[$ - 1] = arguments[$];
        q("error", l, k);
      }
    }
    function q(l, y, k) {
      {
        var $ = O.ReactDebugCurrentFrame, D = $.getStackAddendum();
        D !== "" && (y += "%s", k = k.concat([D]));
        var X = k.map(function(H) {
          return String(H);
        });
        X.unshift("Warning: " + y), Function.prototype.apply.call(console[l], console, X);
      }
    }
    var ie = !1, M = !1, Q = !1, K = !1, re = !1, fe;
    fe = Symbol.for("react.module.reference");
    function Ee(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === n || l === o || re || l === a || l === v || l === S || K || l === C || ie || M || Q || typeof l == "object" && l !== null && (l.$$typeof === _ || l.$$typeof === b || l.$$typeof === i || l.$$typeof === u || l.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === fe || l.getModuleId !== void 0));
    }
    function me(l, y, k) {
      var $ = l.displayName;
      if ($)
        return $;
      var D = y.displayName || y.name || "";
      return D !== "" ? k + "(" + D + ")" : k;
    }
    function J(l) {
      return l.displayName || "Context";
    }
    function I(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case n:
          return "Fragment";
        case t:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case v:
          return "Suspense";
        case S:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case u:
            var y = l;
            return J(y) + ".Consumer";
          case i:
            var k = l;
            return J(k._context) + ".Provider";
          case h:
            return me(l, l.render, "ForwardRef");
          case b:
            var $ = l.displayName || null;
            return $ !== null ? $ : I(l.type) || "Memo";
          case _: {
            var D = l, X = D._payload, H = D._init;
            try {
              return I(H(X));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Z = Object.assign, ee = 0, se, ye, Ye, Ve, Me, er, rr;
    function le() {
    }
    le.__reactDisabledLog = !0;
    function ur() {
      {
        if (ee === 0) {
          se = console.log, ye = console.info, Ye = console.warn, Ve = console.error, Me = console.group, er = console.groupCollapsed, rr = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: le,
            writable: !0
          };
          Object.defineProperties(console, {
            info: l,
            log: l,
            warn: l,
            error: l,
            group: l,
            groupCollapsed: l,
            groupEnd: l
          });
        }
        ee++;
      }
    }
    function br() {
      {
        if (ee--, ee === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Z({}, l, {
              value: se
            }),
            info: Z({}, l, {
              value: ye
            }),
            warn: Z({}, l, {
              value: Ye
            }),
            error: Z({}, l, {
              value: Ve
            }),
            group: Z({}, l, {
              value: Me
            }),
            groupCollapsed: Z({}, l, {
              value: er
            }),
            groupEnd: Z({}, l, {
              value: rr
            })
          });
        }
        ee < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var j = O.ReactCurrentDispatcher, ce;
    function ae(l, y, k) {
      {
        if (ce === void 0)
          try {
            throw Error();
          } catch (D) {
            var $ = D.stack.trim().match(/\n( *(at )?)/);
            ce = $ && $[1] || "";
          }
        return `
` + ce + l;
      }
    }
    var be = !1, Pe;
    {
      var te = typeof WeakMap == "function" ? WeakMap : Map;
      Pe = new te();
    }
    function $e(l, y) {
      if (!l || be)
        return "";
      {
        var k = Pe.get(l);
        if (k !== void 0)
          return k;
      }
      var $;
      be = !0;
      var D = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var X;
      X = j.current, j.current = null, ur();
      try {
        if (y) {
          var H = function() {
            throw Error();
          };
          if (Object.defineProperty(H.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(H, []);
            } catch (cr) {
              $ = cr;
            }
            Reflect.construct(l, [], H);
          } else {
            try {
              H.call();
            } catch (cr) {
              $ = cr;
            }
            l.call(H.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (cr) {
            $ = cr;
          }
          l();
        }
      } catch (cr) {
        if (cr && $ && typeof cr.stack == "string") {
          for (var V = cr.stack.split(`
`), _e = $.stack.split(`
`), we = V.length - 1, Ne = _e.length - 1; we >= 1 && Ne >= 0 && V[we] !== _e[Ne]; )
            Ne--;
          for (; we >= 1 && Ne >= 0; we--, Ne--)
            if (V[we] !== _e[Ne]) {
              if (we !== 1 || Ne !== 1)
                do
                  if (we--, Ne--, Ne < 0 || V[we] !== _e[Ne]) {
                    var ze = `
` + V[we].replace(" at new ", " at ");
                    return l.displayName && ze.includes("<anonymous>") && (ze = ze.replace("<anonymous>", l.displayName)), typeof l == "function" && Pe.set(l, ze), ze;
                  }
                while (we >= 1 && Ne >= 0);
              break;
            }
        }
      } finally {
        be = !1, j.current = X, br(), Error.prepareStackTrace = D;
      }
      var Nr = l ? l.displayName || l.name : "", Cn = Nr ? ae(Nr) : "";
      return typeof l == "function" && Pe.set(l, Cn), Cn;
    }
    function pr(l, y, k) {
      return $e(l, !1);
    }
    function kt(l) {
      var y = l.prototype;
      return !!(y && y.isReactComponent);
    }
    function yr(l, y, k) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return $e(l, kt(l));
      if (typeof l == "string")
        return ae(l);
      switch (l) {
        case v:
          return ae("Suspense");
        case S:
          return ae("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case h:
            return pr(l.render);
          case b:
            return yr(l.type, y, k);
          case _: {
            var $ = l, D = $._payload, X = $._init;
            try {
              return yr(X(D), y, k);
            } catch {
            }
          }
        }
      return "";
    }
    var d = Object.prototype.hasOwnProperty, p = {}, x = O.ReactDebugCurrentFrame;
    function A(l) {
      if (l) {
        var y = l._owner, k = yr(l.type, l._source, y ? y.type : null);
        x.setExtraStackFrame(k);
      } else
        x.setExtraStackFrame(null);
    }
    function F(l, y, k, $, D) {
      {
        var X = Function.call.bind(d);
        for (var H in l)
          if (X(l, H)) {
            var V = void 0;
            try {
              if (typeof l[H] != "function") {
                var _e = Error(($ || "React class") + ": " + k + " type `" + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[H] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _e.name = "Invariant Violation", _e;
              }
              V = l[H](y, H, $, k, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (we) {
              V = we;
            }
            V && !(V instanceof Error) && (A(D), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", $ || "React class", k, H, typeof V), A(null)), V instanceof Error && !(V.message in p) && (p[V.message] = !0, A(D), w("Failed %s type: %s", k, V.message), A(null));
          }
      }
    }
    var E = Array.isArray;
    function W(l) {
      return E(l);
    }
    function de(l) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, k = y && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return k;
      }
    }
    function Te(l) {
      try {
        return tr(l), !1;
      } catch {
        return !0;
      }
    }
    function tr(l) {
      return "" + l;
    }
    function jr(l) {
      if (Te(l))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", de(l)), tr(l);
    }
    var Ge = O.ReactCurrentOwner, Sr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fr, Tr, xr;
    xr = {};
    function Vr(l) {
      if (d.call(l, "ref")) {
        var y = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function Ct(l) {
      if (d.call(l, "key")) {
        var y = Object.getOwnPropertyDescriptor(l, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function Lt(l, y) {
      if (typeof l.ref == "string" && Ge.current && y && Ge.current.stateNode !== y) {
        var k = I(Ge.current.type);
        xr[k] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(Ge.current.type), l.ref), xr[k] = !0);
      }
    }
    function jt(l, y) {
      {
        var k = function() {
          Fr || (Fr = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        k.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: k,
          configurable: !0
        });
      }
    }
    function Er(l, y) {
      {
        var k = function() {
          Tr || (Tr = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
        };
        k.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: k,
          configurable: !0
        });
      }
    }
    var et = function(l, y, k, $, D, X, H) {
      var V = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: l,
        key: y,
        ref: k,
        props: H,
        // Record the component responsible for creating this element.
        _owner: X
      };
      return V._store = {}, Object.defineProperty(V._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(V, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.defineProperty(V, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: D
      }), Object.freeze && (Object.freeze(V.props), Object.freeze(V)), V;
    };
    function Vt(l, y, k, $, D) {
      {
        var X, H = {}, V = null, _e = null;
        k !== void 0 && (jr(k), V = "" + k), Ct(y) && (jr(y.key), V = "" + y.key), Vr(y) && (_e = y.ref, Lt(y, D));
        for (X in y)
          d.call(y, X) && !Sr.hasOwnProperty(X) && (H[X] = y[X]);
        if (l && l.defaultProps) {
          var we = l.defaultProps;
          for (X in we)
            H[X] === void 0 && (H[X] = we[X]);
        }
        if (V || _e) {
          var Ne = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          V && jt(H, Ne), _e && Er(H, Ne);
        }
        return et(l, V, _e, D, $, Ge.current, H);
      }
    }
    var Ar = O.ReactCurrentOwner, ct = O.ReactDebugCurrentFrame;
    function Je(l) {
      if (l) {
        var y = l._owner, k = yr(l.type, l._source, y ? y.type : null);
        ct.setExtraStackFrame(k);
      } else
        ct.setExtraStackFrame(null);
    }
    var fr;
    fr = !1;
    function Ur(l) {
      return typeof l == "object" && l !== null && l.$$typeof === r;
    }
    function mr() {
      {
        if (Ar.current) {
          var l = I(Ar.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function Ut(l) {
      {
        if (l !== void 0) {
          var y = l.fileName.replace(/^.*[\\\/]/, ""), k = l.lineNumber;
          return `

Check your code at ` + y + ":" + k + ".";
        }
        return "";
      }
    }
    var dt = {};
    function Ht(l) {
      {
        var y = mr();
        if (!y) {
          var k = typeof l == "string" ? l : l.displayName || l.name;
          k && (y = `

Check the top-level render call using <` + k + ">.");
        }
        return y;
      }
    }
    function ut(l, y) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var k = Ht(y);
        if (dt[k])
          return;
        dt[k] = !0;
        var $ = "";
        l && l._owner && l._owner !== Ar.current && ($ = " It was passed a child from " + I(l._owner.type) + "."), Je(l), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', k, $), Je(null);
      }
    }
    function ft(l, y) {
      {
        if (typeof l != "object")
          return;
        if (W(l))
          for (var k = 0; k < l.length; k++) {
            var $ = l[k];
            Ur($) && ut($, y);
          }
        else if (Ur(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var D = L(l);
          if (typeof D == "function" && D !== l.entries)
            for (var X = D.call(l), H; !(H = X.next()).done; )
              Ur(H.value) && ut(H.value, y);
        }
      }
    }
    function hr(l) {
      {
        var y = l.type;
        if (y == null || typeof y == "string")
          return;
        var k;
        if (typeof y == "function")
          k = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === b))
          k = y.propTypes;
        else
          return;
        if (k) {
          var $ = I(y);
          F(k, l.props, "prop", $, l);
        } else if (y.PropTypes !== void 0 && !fr) {
          fr = !0;
          var D = I(y);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Yt(l) {
      {
        for (var y = Object.keys(l.props), k = 0; k < y.length; k++) {
          var $ = y[k];
          if ($ !== "children" && $ !== "key") {
            Je(l), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", $), Je(null);
            break;
          }
        }
        l.ref !== null && (Je(l), w("Invalid attribute `ref` supplied to `React.Fragment`."), Je(null));
      }
    }
    function Tt(l, y, k, $, D, X) {
      {
        var H = Ee(l);
        if (!H) {
          var V = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (V += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _e = Ut(D);
          _e ? V += _e : V += mr();
          var we;
          l === null ? we = "null" : W(l) ? we = "array" : l !== void 0 && l.$$typeof === r ? (we = "<" + (I(l.type) || "Unknown") + " />", V = " Did you accidentally export a JSX literal instead of a component?") : we = typeof l, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", we, V);
        }
        var Ne = Vt(l, y, k, D, X);
        if (Ne == null)
          return Ne;
        if (H) {
          var ze = y.children;
          if (ze !== void 0)
            if ($)
              if (W(ze)) {
                for (var Nr = 0; Nr < ze.length; Nr++)
                  ft(ze[Nr], l);
                Object.freeze && Object.freeze(ze);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ft(ze, l);
        }
        return l === n ? Yt(Ne) : hr(Ne), Ne;
      }
    }
    function qt(l, y, k) {
      return Tt(l, y, k, !0);
    }
    function c(l, y, k) {
      return Tt(l, y, k, !1);
    }
    var T = c, P = qt;
    Kt.Fragment = n, Kt.jsx = T, Kt.jsxs = P;
  }()), Kt;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = hc() : e.exports = vc();
})(mc);
const gc = gn.Fragment, N = gn.jsx, Sn = gn.jsxs;
var Zo = {
  path: /* @__PURE__ */ Sn("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ N(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    /* @__PURE__ */ N(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    /* @__PURE__ */ N("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
}, Zr = ve((e, r) => {
  const {
    as: t,
    viewBox: n,
    color: a = "currentColor",
    focusable: o = !1,
    children: i,
    className: u,
    __css: h,
    ...v
  } = e, S = qe("chakra-icon", u), b = ir("Icon", e), _ = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: a,
    ...h,
    ...b
  }, C = {
    ref: r,
    focusable: o,
    className: S,
    __css: _
  }, R = n ?? Zo.viewBox;
  if (t && typeof t != "string")
    return /* @__PURE__ */ N(ne.svg, { as: t, ...C, ...v });
  const Y = i ?? Zo.path;
  return /* @__PURE__ */ N(ne.svg, { verticalAlign: "middle", viewBox: R, ...C, ...v, children: Y });
});
Zr.displayName = "Icon";
function bc(e, r) {
  return `${e} returned \`undefined\`. Seems you forgot to wrap component within ${r}`;
}
function Wr(e = {}) {
  const {
    name: r,
    strict: t = !0,
    hookName: n = "useContext",
    providerName: a = "Provider",
    errorMessage: o,
    defaultValue: i
  } = e, u = da(i);
  u.displayName = r;
  function h() {
    var v;
    const S = ua(u);
    if (!S && t) {
      const b = new Error(
        o ?? bc(n, a)
      );
      throw b.name = "ContextError", (v = Error.captureStackTrace) == null || v.call(Error, b, h), b;
    }
    return S;
  }
  return [u.Provider, h, u];
}
var [pc, ss] = Wr({
  name: "TagStylesContext",
  errorMessage: `useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag />" `
}), yo = ve((e, r) => {
  const t = Mr("Tag", e), n = sr(e), a = {
    display: "inline-flex",
    verticalAlign: "top",
    alignItems: "center",
    maxWidth: "100%",
    ...t.container
  };
  return /* @__PURE__ */ N(pc, { value: t, children: /* @__PURE__ */ N(ne.span, { ref: r, ...n, __css: a }) });
});
yo.displayName = "Tag";
var yc = ve((e, r) => {
  const t = ss();
  return /* @__PURE__ */ N(ne.span, { ref: r, noOfLines: 1, ...e, __css: t.label });
});
yc.displayName = "TagLabel";
var Sc = ve((e, r) => /* @__PURE__ */ N(Zr, { ref: r, verticalAlign: "top", marginEnd: "0.5rem", ...e }));
Sc.displayName = "TagLeftIcon";
var xc = ve((e, r) => /* @__PURE__ */ N(Zr, { ref: r, verticalAlign: "top", marginStart: "0.5rem", ...e }));
xc.displayName = "TagRightIcon";
var ls = (e) => /* @__PURE__ */ N(Zr, { verticalAlign: "inherit", viewBox: "0 0 512 512", ...e, children: /* @__PURE__ */ N(
  "path",
  {
    fill: "currentColor",
    d: "M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
  }
) });
ls.displayName = "TagCloseIcon";
var _c = ve(
  (e, r) => {
    const { isDisabled: t, children: n, ...a } = e, i = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      ...ss().closeButton
    };
    return /* @__PURE__ */ N(
      ne.button,
      {
        ref: r,
        "aria-label": "close",
        ...a,
        type: "button",
        disabled: t,
        __css: i,
        children: n || /* @__PURE__ */ N(ls, {})
      }
    );
  }
);
_c.displayName = "TagCloseButton";
const F0 = (e) => {
  const { balance: r } = po();
  if (r < 0)
    return null;
  let t = "teal";
  return r < 50 && r > 20 ? t = "yellow" : r <= 20 && (t = "red"), /* @__PURE__ */ U(yo, { size: "sm", colorScheme: t, ...e, children: [
    r,
    " votokens"
  ] }, void 0, !0, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Account/Balance.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, globalThis);
}, cs = (e) => {
  const { variant: r, ...t } = e, n = ir("HorizontalRuler", { variant: r });
  return /* @__PURE__ */ U(ne.div, { __css: n, ...t, as: "hr" }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/HR.tsx",
    lineNumber: 11,
    columnNumber: 10
  }, globalThis);
};
cs.displayName = "HorizontalRuler";
var Za = ve(function(r, t) {
  const { htmlWidth: n, htmlHeight: a, alt: o, ...i } = r;
  return /* @__PURE__ */ N("img", { width: n, height: a, ref: t, alt: o, ...i });
});
Za.displayName = "NativeImage";
var wc = globalThis != null && globalThis.document ? Zl : Ke;
function kc(e) {
  const {
    loading: r,
    src: t,
    srcSet: n,
    onLoad: a,
    onError: o,
    crossOrigin: i,
    sizes: u,
    ignoreFallback: h
  } = e, [v, S] = ge("pending");
  Ke(() => {
    S(t ? "loading" : "pending");
  }, [t]);
  const b = ns(), _ = Ze(() => {
    if (!t)
      return;
    C();
    const R = new Image();
    R.src = t, i && (R.crossOrigin = i), n && (R.srcset = n), u && (R.sizes = u), r && (R.loading = r), R.onload = (Y) => {
      C(), S("loaded"), a == null || a(Y);
    }, R.onerror = (Y) => {
      C(), S("failed"), o == null || o(Y);
    }, b.current = R;
  }, [t, i, n, u, a, o, r]), C = () => {
    b.current && (b.current.onload = null, b.current.onerror = null, b.current = null);
  };
  return wc(() => {
    if (!h)
      return v === "loading" && _(), () => {
        C();
      };
  }, [v, _, h]), h ? "loaded" : v;
}
var Cc = (e, r) => e !== "loaded" && r === "beforeLoadOrError" || e === "failed" && r === "onError";
function Tc(e, r = []) {
  const t = Object.assign({}, e);
  for (const n of r)
    n in t && delete t[n];
  return t;
}
var ds = ve(function(r, t) {
  const {
    fallbackSrc: n,
    fallback: a,
    src: o,
    srcSet: i,
    align: u,
    fit: h,
    loading: v,
    ignoreFallback: S,
    crossOrigin: b,
    fallbackStrategy: _ = "beforeLoadOrError",
    referrerPolicy: C,
    ...R
  } = r, Y = n !== void 0 || a !== void 0, L = v != null || S || !Y, O = kc({
    ...r,
    crossOrigin: b,
    ignoreFallback: L
  }), w = Cc(O, _), q = {
    ref: t,
    objectFit: h,
    objectPosition: u,
    ...L ? R : Tc(R, ["onError", "onLoad"])
  };
  return w ? a || /* @__PURE__ */ N(
    ne.img,
    {
      as: Za,
      className: "chakra-image__placeholder",
      src: n,
      ...q
    }
  ) : /* @__PURE__ */ N(
    ne.img,
    {
      as: Za,
      src: o,
      srcSet: i,
      crossOrigin: b,
      loading: v,
      referrerPolicy: C,
      className: "chakra-image",
      ...q
    }
  );
});
ds.displayName = "Image";
const Ec = (e, r) => {
  if (typeof e > "u")
    return;
  if (!e.startsWith("ipfs"))
    return e;
  const t = e.match(/(?:ipfs:\/\/)?(.*)/);
  if (!t)
    return e;
  const [, n] = t;
  return r + n;
}, So = ({ src: e, ...r }) => {
  if (!e)
    return null;
  const t = Ec(e, r.gateway || "https://infura-ipfs.io/ipfs/");
  return /* @__PURE__ */ U(ds, { src: t, ...r }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Image.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, globalThis);
};
function us(e) {
  return ec.toArray(e).filter(
    (r) => as(r)
  );
}
var [$c, fs] = Wr({
  name: "ListStylesContext",
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `
}), xo = ve(function(r, t) {
  const n = Mr("List", r), {
    children: a,
    styleType: o = "none",
    stylePosition: i,
    spacing: u,
    ...h
  } = sr(r), v = us(a), b = u ? { ["& > *:not(style) ~ *:not(style)"]: { mt: u } } : {};
  return /* @__PURE__ */ N($c, { value: n, children: /* @__PURE__ */ N(
    ne.ul,
    {
      ref: t,
      listStyleType: o,
      listStylePosition: i,
      role: "list",
      __css: { ...n.container, ...b },
      ...h,
      children: v
    }
  ) });
});
xo.displayName = "List";
var ms = ve((e, r) => {
  const { as: t, ...n } = e;
  return /* @__PURE__ */ N(xo, { ref: r, as: "ol", styleType: "decimal", marginStart: "1em", ...n });
});
ms.displayName = "OrderedList";
var hs = ve(function(r, t) {
  const { as: n, ...a } = r;
  return /* @__PURE__ */ N(xo, { ref: t, as: "ul", styleType: "initial", marginStart: "1em", ...a });
});
hs.displayName = "UnorderedList";
var vs = ve(function(r, t) {
  const n = fs();
  return /* @__PURE__ */ N(ne.li, { ref: t, ...r, __css: n.item });
});
vs.displayName = "ListItem";
var Rc = ve(function(r, t) {
  const n = fs();
  return /* @__PURE__ */ N(Zr, { ref: t, role: "presentation", ...r, __css: n.icon });
});
Rc.displayName = "ListIcon";
function gs(e, r) {
  return Array.isArray(e) ? e.map((t) => t === null ? null : r(t)) : Mt(e) ? Object.keys(e).reduce((t, n) => (t[n] = r(e[n]), t), {}) : e != null ? r(e) : null;
}
function Pc(e) {
  const r = Object.assign({}, e);
  for (let t in r)
    r[t] === void 0 && delete r[t];
  return r;
}
var bs = ve(function(r, t) {
  const n = ir("Text", r), { className: a, align: o, decoration: i, casing: u, ...h } = sr(r), v = Pc({
    textAlign: r.align,
    textDecoration: r.decoration,
    textTransform: r.casing
  });
  return /* @__PURE__ */ N(
    ne.p,
    {
      ref: t,
      className: qe("chakra-text", r.className),
      ...v,
      ...h,
      __css: n
    }
  );
});
bs.displayName = "Text";
var ps = (e) => /* @__PURE__ */ N(
  ne.div,
  {
    className: "chakra-stack__item",
    ...e,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...e.__css
    }
  }
);
ps.displayName = "StackItem";
var eo = "& > *:not(style) ~ *:not(style)";
function Fc(e) {
  const { spacing: r, direction: t } = e, n = {
    column: {
      marginTop: r,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: { marginTop: 0, marginEnd: 0, marginBottom: 0, marginStart: r },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: r,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: r,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return {
    flexDirection: t,
    [eo]: gs(
      t,
      (a) => n[a]
    )
  };
}
function Ac(e) {
  const { spacing: r, direction: t } = e, n = {
    column: {
      my: r,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: r,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: r,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: r,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": gs(
      t,
      (a) => n[a]
    )
  };
}
var ys = ve((e, r) => {
  const {
    isInline: t,
    direction: n,
    align: a,
    justify: o,
    spacing: i = "0.5rem",
    wrap: u,
    children: h,
    divider: v,
    className: S,
    shouldWrapChildren: b,
    ..._
  } = e, C = t ? "row" : n ?? "column", R = pt(
    () => Fc({ direction: C, spacing: i }),
    [C, i]
  ), Y = pt(
    () => Ac({ spacing: i, direction: C }),
    [i, C]
  ), L = !!v, O = !b && !L, w = pt(() => {
    const ie = us(h);
    return O ? ie : ie.map((M, Q) => {
      const K = typeof M.key < "u" ? M.key : Q, re = Q + 1 === ie.length, Ee = b ? /* @__PURE__ */ N(ps, { children: M }, K) : M;
      if (!L)
        return Ee;
      const me = os(
        v,
        {
          __css: Y
        }
      );
      return /* @__PURE__ */ Sn(rc, { children: [
        Ee,
        re ? null : me
      ] }, K);
    });
  }, [
    v,
    Y,
    L,
    O,
    b,
    h
  ]), q = qe("chakra-stack", S);
  return /* @__PURE__ */ N(
    ne.div,
    {
      ref: r,
      display: "flex",
      alignItems: a,
      justifyContent: o,
      flexDirection: R.flexDirection,
      flexWrap: u,
      className: q,
      __css: L ? {} : { [eo]: R[eo] },
      ..._,
      children: w
    }
  );
});
ys.displayName = "Stack";
var Mn = ve(function(r, t) {
  const n = ir("Heading", r), { className: a, ...o } = sr(r);
  return /* @__PURE__ */ N(
    ne.h2,
    {
      ref: t,
      className: qe("chakra-heading", r.className),
      ...o,
      __css: n
    }
  );
});
Mn.displayName = "Heading";
var _o = ne("div");
_o.displayName = "Box";
var Ss = ve(function(r, t) {
  const { size: n, centerContent: a = !0, ...o } = r;
  return /* @__PURE__ */ N(
    _o,
    {
      ref: t,
      boxSize: n,
      __css: {
        ...a ? { display: "flex", alignItems: "center", justifyContent: "center" } : {},
        flexShrink: 0,
        flexGrow: 0
      },
      ...o
    }
  );
});
Ss.displayName = "Square";
var Nc = ve(function(r, t) {
  const { size: n, ...a } = r;
  return /* @__PURE__ */ N(Ss, { size: n, ref: t, borderRadius: "9999px", ...a });
});
Nc.displayName = "Circle";
var xs = ve(function(r, t) {
  const n = ir("Link", r), { className: a, isExternal: o, ...i } = sr(r);
  return /* @__PURE__ */ N(
    ne.a,
    {
      target: o ? "_blank" : void 0,
      rel: o ? "noopener" : void 0,
      ref: t,
      className: qe("chakra-link", a),
      ...i,
      __css: n
    }
  );
});
xs.displayName = "Link";
var _s = ve(function(r, t) {
  const n = ir("Code", r), { className: a, ...o } = sr(r);
  return /* @__PURE__ */ N(
    ne.code,
    {
      ref: t,
      className: qe("chakra-code", r.className),
      ...o,
      __css: {
        display: "inline-block",
        ...n
      }
    }
  );
});
_s.displayName = "Code";
var [Dc, zc] = Wr({
  name: "TableStylesContext",
  errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `
}), ws = ve((e, r) => {
  const t = Mr("Table", e), { className: n, layout: a, ...o } = sr(e);
  return /* @__PURE__ */ N(Dc, { value: t, children: /* @__PURE__ */ N(
    ne.table,
    {
      ref: r,
      __css: { tableLayout: a, ...t.table },
      className: qe("chakra-table", n),
      ...o
    }
  ) });
});
ws.displayName = "Table";
var Oc = ve((e, r) => {
  const t = zc();
  return /* @__PURE__ */ N(ne.tr, { ...e, ref: r, __css: t.tr });
});
const Ic = ({ children: e, ...r }) => e ? /* @__PURE__ */ U(
  ic,
  {
    children: e,
    remarkPlugins: [sc],
    components: {
      a: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(xs, { ...a, target: "_blank", children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, globalThis),
      h1: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(Mn, { size: "lg", mt: 5, mb: 4, ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, globalThis),
      h2: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(Mn, { size: "md", mt: 5, mb: 4, ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, globalThis),
      h3: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(Mn, { as: "h3", size: "sm", mt: 5, mb: 4, ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, globalThis),
      ol: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(ms, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 41,
        columnNumber: 47
      }, globalThis),
      ul: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(hs, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 42,
        columnNumber: 47
      }, globalThis),
      li: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(vs, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 43,
        columnNumber: 47
      }, globalThis),
      p: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(bs, { fontWeight: "medium", mb: 4, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, globalThis),
      table: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(_o, { overflowX: "auto", maxW: "full", children: /* @__PURE__ */ U(ws, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, globalThis) }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, globalThis),
      tr: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(Oc, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 54,
        columnNumber: 47
      }, globalThis),
      code: ({ node: t, children: n, ...a }) => /* @__PURE__ */ U(_s, { ...a, children: n }, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
        lineNumber: 55,
        columnNumber: 49
      }, globalThis)
    },
    ...r
  },
  void 0,
  !1,
  {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/layout/Markdown.tsx",
    lineNumber: 17,
    columnNumber: 5
  },
  globalThis
) : null, fa = ne(Ic);
fa.displayName = "Markdown";
function _t(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var r = Number(e);
  return isNaN(r) ? r : r < 0 ? Math.ceil(r) : Math.floor(r);
}
function lr(e, r) {
  if (r.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + r.length + " present");
}
function Wn(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Wn = function(t) {
    return typeof t;
  } : Wn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wn(e);
}
function Lr(e) {
  lr(1, arguments);
  var r = Object.prototype.toString.call(e);
  return e instanceof Date || Wn(e) === "object" && r === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || r === "[object Number]" ? new Date(e) : ((typeof e == "string" || r === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function Bc(e, r) {
  lr(2, arguments);
  var t = Lr(e).getTime(), n = _t(r);
  return new Date(t + n);
}
var Mc = {};
function ma() {
  return Mc;
}
function Wc(e) {
  var r = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return r.setUTCFullYear(e.getFullYear()), e.getTime() - r.getTime();
}
function Ln(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ln = function(t) {
    return typeof t;
  } : Ln = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ln(e);
}
function Lc(e) {
  return lr(1, arguments), e instanceof Date || Ln(e) === "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function jc(e) {
  if (lr(1, arguments), !Lc(e) && typeof e != "number")
    return !1;
  var r = Lr(e);
  return !isNaN(Number(r));
}
function Vc(e, r) {
  lr(2, arguments);
  var t = _t(r);
  return Bc(e, -t);
}
var Uc = 864e5;
function Hc(e) {
  lr(1, arguments);
  var r = Lr(e), t = r.getTime();
  r.setUTCMonth(0, 1), r.setUTCHours(0, 0, 0, 0);
  var n = r.getTime(), a = t - n;
  return Math.floor(a / Uc) + 1;
}
function Qn(e) {
  lr(1, arguments);
  var r = 1, t = Lr(e), n = t.getUTCDay(), a = (n < r ? 7 : 0) + n - r;
  return t.setUTCDate(t.getUTCDate() - a), t.setUTCHours(0, 0, 0, 0), t;
}
function ks(e) {
  lr(1, arguments);
  var r = Lr(e), t = r.getUTCFullYear(), n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(t + 1, 0, 4), n.setUTCHours(0, 0, 0, 0);
  var a = Qn(n), o = /* @__PURE__ */ new Date(0);
  o.setUTCFullYear(t, 0, 4), o.setUTCHours(0, 0, 0, 0);
  var i = Qn(o);
  return r.getTime() >= a.getTime() ? t + 1 : r.getTime() >= i.getTime() ? t : t - 1;
}
function Yc(e) {
  lr(1, arguments);
  var r = ks(e), t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(r, 0, 4), t.setUTCHours(0, 0, 0, 0);
  var n = Qn(t);
  return n;
}
var qc = 6048e5;
function Gc(e) {
  lr(1, arguments);
  var r = Lr(e), t = Qn(r).getTime() - Yc(r).getTime();
  return Math.round(t / qc) + 1;
}
function Kn(e, r) {
  var t, n, a, o, i, u, h, v;
  lr(1, arguments);
  var S = ma(), b = _t((t = (n = (a = (o = r == null ? void 0 : r.weekStartsOn) !== null && o !== void 0 ? o : r == null || (i = r.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.weekStartsOn) !== null && a !== void 0 ? a : S.weekStartsOn) !== null && n !== void 0 ? n : (h = S.locale) === null || h === void 0 || (v = h.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && t !== void 0 ? t : 0);
  if (!(b >= 0 && b <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var _ = Lr(e), C = _.getUTCDay(), R = (C < b ? 7 : 0) + C - b;
  return _.setUTCDate(_.getUTCDate() - R), _.setUTCHours(0, 0, 0, 0), _;
}
function Cs(e, r) {
  var t, n, a, o, i, u, h, v;
  lr(1, arguments);
  var S = Lr(e), b = S.getUTCFullYear(), _ = ma(), C = _t((t = (n = (a = (o = r == null ? void 0 : r.firstWeekContainsDate) !== null && o !== void 0 ? o : r == null || (i = r.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : _.firstWeekContainsDate) !== null && n !== void 0 ? n : (h = _.locale) === null || h === void 0 || (v = h.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && t !== void 0 ? t : 1);
  if (!(C >= 1 && C <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var R = /* @__PURE__ */ new Date(0);
  R.setUTCFullYear(b + 1, 0, C), R.setUTCHours(0, 0, 0, 0);
  var Y = Kn(R, r), L = /* @__PURE__ */ new Date(0);
  L.setUTCFullYear(b, 0, C), L.setUTCHours(0, 0, 0, 0);
  var O = Kn(L, r);
  return S.getTime() >= Y.getTime() ? b + 1 : S.getTime() >= O.getTime() ? b : b - 1;
}
function Xc(e, r) {
  var t, n, a, o, i, u, h, v;
  lr(1, arguments);
  var S = ma(), b = _t((t = (n = (a = (o = r == null ? void 0 : r.firstWeekContainsDate) !== null && o !== void 0 ? o : r == null || (i = r.locale) === null || i === void 0 || (u = i.options) === null || u === void 0 ? void 0 : u.firstWeekContainsDate) !== null && a !== void 0 ? a : S.firstWeekContainsDate) !== null && n !== void 0 ? n : (h = S.locale) === null || h === void 0 || (v = h.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && t !== void 0 ? t : 1), _ = Cs(e, r), C = /* @__PURE__ */ new Date(0);
  C.setUTCFullYear(_, 0, b), C.setUTCHours(0, 0, 0, 0);
  var R = Kn(C, r);
  return R;
}
var Qc = 6048e5;
function Kc(e, r) {
  lr(1, arguments);
  var t = Lr(e), n = Kn(t, r).getTime() - Xc(t, r).getTime();
  return Math.round(n / Qc) + 1;
}
function Ce(e, r) {
  for (var t = e < 0 ? "-" : "", n = Math.abs(e).toString(); n.length < r; )
    n = "0" + n;
  return t + n;
}
var Jc = {
  // Year
  y: function(r, t) {
    var n = r.getUTCFullYear(), a = n > 0 ? n : 1 - n;
    return Ce(t === "yy" ? a % 100 : a, t.length);
  },
  // Month
  M: function(r, t) {
    var n = r.getUTCMonth();
    return t === "M" ? String(n + 1) : Ce(n + 1, 2);
  },
  // Day of the month
  d: function(r, t) {
    return Ce(r.getUTCDate(), t.length);
  },
  // AM or PM
  a: function(r, t) {
    var n = r.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function(r, t) {
    return Ce(r.getUTCHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H: function(r, t) {
    return Ce(r.getUTCHours(), t.length);
  },
  // Minute
  m: function(r, t) {
    return Ce(r.getUTCMinutes(), t.length);
  },
  // Second
  s: function(r, t) {
    return Ce(r.getUTCSeconds(), t.length);
  },
  // Fraction of second
  S: function(r, t) {
    var n = t.length, a = r.getUTCMilliseconds(), o = Math.floor(a * Math.pow(10, n - 3));
    return Ce(o, t.length);
  }
};
const tt = Jc;
var Et = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Zc = {
  // Era
  G: function(r, t, n) {
    var a = r.getUTCFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, {
          width: "abbreviated"
        });
      case "GGGGG":
        return n.era(a, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return n.era(a, {
          width: "wide"
        });
    }
  },
  // Year
  y: function(r, t, n) {
    if (t === "yo") {
      var a = r.getUTCFullYear(), o = a > 0 ? a : 1 - a;
      return n.ordinalNumber(o, {
        unit: "year"
      });
    }
    return tt.y(r, t);
  },
  // Local week-numbering year
  Y: function(r, t, n, a) {
    var o = Cs(r, a), i = o > 0 ? o : 1 - o;
    if (t === "YY") {
      var u = i % 100;
      return Ce(u, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, {
      unit: "year"
    }) : Ce(i, t.length);
  },
  // ISO week-numbering year
  R: function(r, t) {
    var n = ks(r);
    return Ce(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(r, t) {
    var n = r.getUTCFullYear();
    return Ce(n, t.length);
  },
  // Quarter
  Q: function(r, t, n) {
    var a = Math.ceil((r.getUTCMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(a);
      case "QQ":
        return Ce(a, 2);
      case "Qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(r, t, n) {
    var a = Math.ceil((r.getUTCMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(a);
      case "qq":
        return Ce(a, 2);
      case "qo":
        return n.ordinalNumber(a, {
          unit: "quarter"
        });
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(r, t, n) {
    var a = r.getUTCMonth();
    switch (t) {
      case "M":
      case "MM":
        return tt.M(r, t);
      case "Mo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function(r, t, n) {
    var a = r.getUTCMonth();
    switch (t) {
      case "L":
        return String(a + 1);
      case "LL":
        return Ce(a + 1, 2);
      case "Lo":
        return n.ordinalNumber(a + 1, {
          unit: "month"
        });
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function(r, t, n, a) {
    var o = Kc(r, a);
    return t === "wo" ? n.ordinalNumber(o, {
      unit: "week"
    }) : Ce(o, t.length);
  },
  // ISO week of year
  I: function(r, t, n) {
    var a = Gc(r);
    return t === "Io" ? n.ordinalNumber(a, {
      unit: "week"
    }) : Ce(a, t.length);
  },
  // Day of the month
  d: function(r, t, n) {
    return t === "do" ? n.ordinalNumber(r.getUTCDate(), {
      unit: "date"
    }) : tt.d(r, t);
  },
  // Day of year
  D: function(r, t, n) {
    var a = Hc(r);
    return t === "Do" ? n.ordinalNumber(a, {
      unit: "dayOfYear"
    }) : Ce(a, t.length);
  },
  // Day of week
  E: function(r, t, n) {
    var a = r.getUTCDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(r, t, n, a) {
    var o = r.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return Ce(i, 2);
      case "eo":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(r, t, n, a) {
    var o = r.getUTCDay(), i = (o - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return Ce(i, t.length);
      case "co":
        return n.ordinalNumber(i, {
          unit: "day"
        });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(r, t, n) {
    var a = r.getUTCDay(), o = a === 0 ? 7 : a;
    switch (t) {
      case "i":
        return String(o);
      case "ii":
        return Ce(o, t.length);
      case "io":
        return n.ordinalNumber(o, {
          unit: "day"
        });
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(r, t, n) {
    var a = r.getUTCHours(), o = a / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(r, t, n) {
    var a = r.getUTCHours(), o;
    switch (a === 12 ? o = Et.noon : a === 0 ? o = Et.midnight : o = a / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(r, t, n) {
    var a = r.getUTCHours(), o;
    switch (a >= 17 ? o = Et.evening : a >= 12 ? o = Et.afternoon : a >= 4 ? o = Et.morning : o = Et.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(r, t, n) {
    if (t === "ho") {
      var a = r.getUTCHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, {
        unit: "hour"
      });
    }
    return tt.h(r, t);
  },
  // Hour [0-23]
  H: function(r, t, n) {
    return t === "Ho" ? n.ordinalNumber(r.getUTCHours(), {
      unit: "hour"
    }) : tt.H(r, t);
  },
  // Hour [0-11]
  K: function(r, t, n) {
    var a = r.getUTCHours() % 12;
    return t === "Ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : Ce(a, t.length);
  },
  // Hour [1-24]
  k: function(r, t, n) {
    var a = r.getUTCHours();
    return a === 0 && (a = 24), t === "ko" ? n.ordinalNumber(a, {
      unit: "hour"
    }) : Ce(a, t.length);
  },
  // Minute
  m: function(r, t, n) {
    return t === "mo" ? n.ordinalNumber(r.getUTCMinutes(), {
      unit: "minute"
    }) : tt.m(r, t);
  },
  // Second
  s: function(r, t, n) {
    return t === "so" ? n.ordinalNumber(r.getUTCSeconds(), {
      unit: "second"
    }) : tt.s(r, t);
  },
  // Fraction of second
  S: function(r, t) {
    return tt.S(r, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(r, t, n, a) {
    var o = a._originalDate || r, i = o.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (t) {
      case "X":
        return ri(i);
      case "XXXX":
      case "XX":
        return ht(i);
      case "XXXXX":
      case "XXX":
      default:
        return ht(i, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(r, t, n, a) {
    var o = a._originalDate || r, i = o.getTimezoneOffset();
    switch (t) {
      case "x":
        return ri(i);
      case "xxxx":
      case "xx":
        return ht(i);
      case "xxxxx":
      case "xxx":
      default:
        return ht(i, ":");
    }
  },
  // Timezone (GMT)
  O: function(r, t, n, a) {
    var o = a._originalDate || r, i = o.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + ei(i, ":");
      case "OOOO":
      default:
        return "GMT" + ht(i, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(r, t, n, a) {
    var o = a._originalDate || r, i = o.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + ei(i, ":");
      case "zzzz":
      default:
        return "GMT" + ht(i, ":");
    }
  },
  // Seconds timestamp
  t: function(r, t, n, a) {
    var o = a._originalDate || r, i = Math.floor(o.getTime() / 1e3);
    return Ce(i, t.length);
  },
  // Milliseconds timestamp
  T: function(r, t, n, a) {
    var o = a._originalDate || r, i = o.getTime();
    return Ce(i, t.length);
  }
};
function ei(e, r) {
  var t = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.floor(n / 60), o = n % 60;
  if (o === 0)
    return t + String(a);
  var i = r || "";
  return t + String(a) + i + Ce(o, 2);
}
function ri(e, r) {
  if (e % 60 === 0) {
    var t = e > 0 ? "-" : "+";
    return t + Ce(Math.abs(e) / 60, 2);
  }
  return ht(e, r);
}
function ht(e, r) {
  var t = r || "", n = e > 0 ? "-" : "+", a = Math.abs(e), o = Ce(Math.floor(a / 60), 2), i = Ce(a % 60, 2);
  return n + o + t + i;
}
const ed = Zc;
var ti = function(r, t) {
  switch (r) {
    case "P":
      return t.date({
        width: "short"
      });
    case "PP":
      return t.date({
        width: "medium"
      });
    case "PPP":
      return t.date({
        width: "long"
      });
    case "PPPP":
    default:
      return t.date({
        width: "full"
      });
  }
}, Ts = function(r, t) {
  switch (r) {
    case "p":
      return t.time({
        width: "short"
      });
    case "pp":
      return t.time({
        width: "medium"
      });
    case "ppp":
      return t.time({
        width: "long"
      });
    case "pppp":
    default:
      return t.time({
        width: "full"
      });
  }
}, rd = function(r, t) {
  var n = r.match(/(P+)(p+)?/) || [], a = n[1], o = n[2];
  if (!o)
    return ti(r, t);
  var i;
  switch (a) {
    case "P":
      i = t.dateTime({
        width: "short"
      });
      break;
    case "PP":
      i = t.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      i = t.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      i = t.dateTime({
        width: "full"
      });
      break;
  }
  return i.replace("{{date}}", ti(a, t)).replace("{{time}}", Ts(o, t));
}, td = {
  p: Ts,
  P: rd
};
const nd = td;
var ad = ["D", "DD"], od = ["YY", "YYYY"];
function id(e) {
  return ad.indexOf(e) !== -1;
}
function sd(e) {
  return od.indexOf(e) !== -1;
}
function ni(e, r, t) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(r, "`) for formatting years to the input `").concat(t, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(r, "`) for formatting years to the input `").concat(t, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(r, "`) for formatting days of the month to the input `").concat(t, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(r, "`) for formatting days of the month to the input `").concat(t, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var ld = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, cd = function(r, t, n) {
  var a, o = ld[r];
  return typeof o == "string" ? a = o : t === 1 ? a = o.one : a = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
const dd = cd;
function Pa(e) {
  return function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = r.width ? String(r.width) : e.defaultWidth, n = e.formats[t] || e.formats[e.defaultWidth];
    return n;
  };
}
var ud = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, fd = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, md = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hd = {
  date: Pa({
    formats: ud,
    defaultWidth: "full"
  }),
  time: Pa({
    formats: fd,
    defaultWidth: "full"
  }),
  dateTime: Pa({
    formats: md,
    defaultWidth: "full"
  })
};
const vd = hd;
var gd = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, bd = function(r, t, n, a) {
  return gd[r];
};
const pd = bd;
function Jt(e) {
  return function(r, t) {
    var n = t != null && t.context ? String(t.context) : "standalone", a;
    if (n === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, i = t != null && t.width ? String(t.width) : o;
      a = e.formattingValues[i] || e.formattingValues[o];
    } else {
      var u = e.defaultWidth, h = t != null && t.width ? String(t.width) : e.defaultWidth;
      a = e.values[h] || e.values[u];
    }
    var v = e.argumentCallback ? e.argumentCallback(r) : r;
    return a[v];
  };
}
var yd = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Sd = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, xd = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, _d = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, wd = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, kd = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Cd = function(r, t) {
  var n = Number(r), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Td = {
  ordinalNumber: Cd,
  era: Jt({
    values: yd,
    defaultWidth: "wide"
  }),
  quarter: Jt({
    values: Sd,
    defaultWidth: "wide",
    argumentCallback: function(r) {
      return r - 1;
    }
  }),
  month: Jt({
    values: xd,
    defaultWidth: "wide"
  }),
  day: Jt({
    values: _d,
    defaultWidth: "wide"
  }),
  dayPeriod: Jt({
    values: wd,
    defaultWidth: "wide",
    formattingValues: kd,
    defaultFormattingWidth: "wide"
  })
};
const Ed = Td;
function Zt(e) {
  return function(r) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.width, a = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], o = r.match(a);
    if (!o)
      return null;
    var i = o[0], u = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], h = Array.isArray(u) ? Rd(u, function(b) {
      return b.test(i);
    }) : $d(u, function(b) {
      return b.test(i);
    }), v;
    v = e.valueCallback ? e.valueCallback(h) : h, v = t.valueCallback ? t.valueCallback(v) : v;
    var S = r.slice(i.length);
    return {
      value: v,
      rest: S
    };
  };
}
function $d(e, r) {
  for (var t in e)
    if (e.hasOwnProperty(t) && r(e[t]))
      return t;
}
function Rd(e, r) {
  for (var t = 0; t < e.length; t++)
    if (r(e[t]))
      return t;
}
function Pd(e) {
  return function(r) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = r.match(e.matchPattern);
    if (!n)
      return null;
    var a = n[0], o = r.match(e.parsePattern);
    if (!o)
      return null;
    var i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = t.valueCallback ? t.valueCallback(i) : i;
    var u = r.slice(a.length);
    return {
      value: i,
      rest: u
    };
  };
}
var Fd = /^(\d+)(th|st|nd|rd)?/i, Ad = /\d+/i, Nd = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Dd = {
  any: [/^b/i, /^(a|c)/i]
}, zd = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Od = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Id = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Bd = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Md = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Wd = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ld = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, jd = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Vd = {
  ordinalNumber: Pd({
    matchPattern: Fd,
    parsePattern: Ad,
    valueCallback: function(r) {
      return parseInt(r, 10);
    }
  }),
  era: Zt({
    matchPatterns: Nd,
    defaultMatchWidth: "wide",
    parsePatterns: Dd,
    defaultParseWidth: "any"
  }),
  quarter: Zt({
    matchPatterns: zd,
    defaultMatchWidth: "wide",
    parsePatterns: Od,
    defaultParseWidth: "any",
    valueCallback: function(r) {
      return r + 1;
    }
  }),
  month: Zt({
    matchPatterns: Id,
    defaultMatchWidth: "wide",
    parsePatterns: Bd,
    defaultParseWidth: "any"
  }),
  day: Zt({
    matchPatterns: Md,
    defaultMatchWidth: "wide",
    parsePatterns: Wd,
    defaultParseWidth: "any"
  }),
  dayPeriod: Zt({
    matchPatterns: Ld,
    defaultMatchWidth: "any",
    parsePatterns: jd,
    defaultParseWidth: "any"
  })
};
const Ud = Vd;
var Hd = {
  code: "en-US",
  formatDistance: dd,
  formatLong: vd,
  formatRelative: pd,
  localize: Ed,
  match: Ud,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const Yd = Hd;
var qd = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gd = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xd = /^'([^]*?)'?$/, Qd = /''/g, Kd = /[a-zA-Z]/;
function ai(e, r, t) {
  var n, a, o, i, u, h, v, S, b, _, C, R, Y, L, O, w, q, ie;
  lr(2, arguments);
  var M = String(r), Q = ma(), K = (n = (a = t == null ? void 0 : t.locale) !== null && a !== void 0 ? a : Q.locale) !== null && n !== void 0 ? n : Yd, re = _t((o = (i = (u = (h = t == null ? void 0 : t.firstWeekContainsDate) !== null && h !== void 0 ? h : t == null || (v = t.locale) === null || v === void 0 || (S = v.options) === null || S === void 0 ? void 0 : S.firstWeekContainsDate) !== null && u !== void 0 ? u : Q.firstWeekContainsDate) !== null && i !== void 0 ? i : (b = Q.locale) === null || b === void 0 || (_ = b.options) === null || _ === void 0 ? void 0 : _.firstWeekContainsDate) !== null && o !== void 0 ? o : 1);
  if (!(re >= 1 && re <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var fe = _t((C = (R = (Y = (L = t == null ? void 0 : t.weekStartsOn) !== null && L !== void 0 ? L : t == null || (O = t.locale) === null || O === void 0 || (w = O.options) === null || w === void 0 ? void 0 : w.weekStartsOn) !== null && Y !== void 0 ? Y : Q.weekStartsOn) !== null && R !== void 0 ? R : (q = Q.locale) === null || q === void 0 || (ie = q.options) === null || ie === void 0 ? void 0 : ie.weekStartsOn) !== null && C !== void 0 ? C : 0);
  if (!(fe >= 0 && fe <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!K.localize)
    throw new RangeError("locale must contain localize property");
  if (!K.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var Ee = Lr(e);
  if (!jc(Ee))
    throw new RangeError("Invalid time value");
  var me = Wc(Ee), J = Vc(Ee, me), I = {
    firstWeekContainsDate: re,
    weekStartsOn: fe,
    locale: K,
    _originalDate: Ee
  }, Z = M.match(Gd).map(function(ee) {
    var se = ee[0];
    if (se === "p" || se === "P") {
      var ye = nd[se];
      return ye(ee, K.formatLong);
    }
    return ee;
  }).join("").match(qd).map(function(ee) {
    if (ee === "''")
      return "'";
    var se = ee[0];
    if (se === "'")
      return Jd(ee);
    var ye = ed[se];
    if (ye)
      return !(t != null && t.useAdditionalWeekYearTokens) && sd(ee) && ni(ee, r, String(e)), !(t != null && t.useAdditionalDayOfYearTokens) && id(ee) && ni(ee, r, String(e)), ye(J, ee, K.localize, I);
    if (se.match(Kd))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + se + "`");
    return ee;
  }).join("");
  return Z;
}
function Jd(e) {
  var r = e.match(Xd);
  return r ? r[1].replace(Qd, "'") : e;
}
const Es = ve((e, r) => {
  const { election: t } = lt(), n = ir("ElectionTitle", e), a = sr(e);
  return t ? /* @__PURE__ */ U(ne.h1, { ref: r, ...a, __css: n, children: t.title.default }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/parts.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, globalThis) : null;
});
Es.displayName = "ElectionTitle";
const Zd = (e) => {
  const r = ir("ElectionHeader", e), { election: t } = lt();
  return !t || t && !t.header ? null : /* @__PURE__ */ U(So, { src: t.header, sx: r, ...e }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/parts.tsx",
    lineNumber: 39,
    columnNumber: 10
  }, globalThis);
}, eu = (e) => {
  const r = ir("ElectionDescription", e), { election: t } = lt();
  return !t || t && !t.description ? null : /* @__PURE__ */ U(fa, { ...e, sx: r, children: t.description.default }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/parts.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, globalThis);
}, $s = ve(({ format: e, ...r }, t) => {
  const n = Mr("ElectionSchedule", r), { election: a } = lt();
  let o = e;
  return o || (o = "d-L-y HH:mm"), a ? /* @__PURE__ */ U(ne.h2, { __css: n, ...r, children: [
    "Voting period ",
    ai(new Date(a.startDate), o),
    " ~ ",
    ai(new Date(a.endDate), o)
  ] }, void 0, !0, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/parts.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, globalThis) : null;
});
$s.displayName = "ElectionSchedule";
const ru = (e) => {
  const { election: r, trans: t } = lt();
  if (!r)
    return null;
  const n = {
    PROCESS_UNKNOWN: "Unknown",
    UPCOMING: "Upcoming",
    ONGOING: "Ongoing",
    ENDED: "Ended",
    CANCELED: "Canceled",
    PAUSED: "Paused",
    RESULTS: "Results"
  };
  let { colorScheme: a } = e;
  return a || (a = "green", [on.PAUSED, on.ENDED].includes(r.status) && (a = "yellow"), [on.CANCELED, on.PROCESS_UNKNOWN].includes(r.status) && (a = "red")), /* @__PURE__ */ U(yo, { sx: { textTransform: "capitalize" }, colorScheme: a, ...e, children: t(r.status, n[r.status]) }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/parts.tsx",
    lineNumber: 107,
    columnNumber: 5
  }, globalThis);
};
function tu(e) {
  return /* @__PURE__ */ N(Zr, { viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ N(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    }
  ) });
}
function nu(e) {
  return /* @__PURE__ */ N(Zr, { viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ N(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
    }
  ) });
}
function oi(e) {
  return /* @__PURE__ */ N(Zr, { viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ N(
    "path",
    {
      fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
    }
  ) });
}
var au = tc({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
}), wo = ve((e, r) => {
  const t = ir("Spinner", e), {
    label: n = "Loading...",
    thickness: a = "2px",
    speed: o = "0.45s",
    emptyColor: i = "transparent",
    className: u,
    ...h
  } = sr(e), v = qe("chakra-spinner", u), S = {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: a,
    borderBottomColor: i,
    borderLeftColor: i,
    animation: `${au} ${o} linear infinite`,
    ...t
  };
  return /* @__PURE__ */ N(
    ne.div,
    {
      ref: r,
      __css: S,
      className: v,
      ...h,
      children: n && /* @__PURE__ */ N(ne.span, { srOnly: !0, children: n })
    }
  );
});
wo.displayName = "Spinner";
var [ou, iu] = Wr({
  name: "AlertContext",
  hookName: "useAlertContext",
  providerName: "<Alert />"
}), [su, lu] = Wr({
  name: "AlertStylesContext",
  hookName: "useAlertStyles",
  providerName: "<Alert />"
}), Rs = {
  info: { icon: nu, colorScheme: "blue" },
  warning: { icon: oi, colorScheme: "orange" },
  success: { icon: tu, colorScheme: "green" },
  error: { icon: oi, colorScheme: "red" },
  loading: { icon: wo, colorScheme: "blue" }
};
function cu(e) {
  return Rs[e].colorScheme;
}
function du(e) {
  return Rs[e].icon;
}
function ro(e) {
  const { status: r } = iu(), t = du(r), n = lu(), a = r === "loading" ? n.spinner : n.icon;
  return /* @__PURE__ */ N(
    ne.span,
    {
      display: "inherit",
      "data-status": r,
      ...e,
      className: qe("chakra-alert__icon", e.className),
      __css: a,
      children: e.children || /* @__PURE__ */ N(t, { h: "100%", w: "100%" })
    }
  );
}
ro.displayName = "AlertIcon";
var jn = ve(function(r, t) {
  var n;
  const { status: a = "info", addRole: o = !0, ...i } = sr(r), u = (n = r.colorScheme) != null ? n : cu(a), h = Mr("Alert", { ...r, colorScheme: u }), v = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    ...h.container
  };
  return /* @__PURE__ */ N(ou, { value: { status: a }, children: /* @__PURE__ */ N(su, { value: h, children: /* @__PURE__ */ N(
    ne.div,
    {
      "data-status": a,
      role: o ? "alert" : void 0,
      ref: t,
      ...i,
      className: qe("chakra-alert", r.className),
      __css: v
    }
  ) }) });
});
jn.displayName = "Alert";
var xn = (e) => e.type === "checkbox", Ft = (e) => e instanceof Date, nr = (e) => e == null;
const Ps = (e) => typeof e == "object";
var Ue = (e) => !nr(e) && !Array.isArray(e) && Ps(e) && !Ft(e), Fs = (e) => Ue(e) && e.target ? xn(e.target) ? e.target.checked : e.target.value : e, uu = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, As = (e, r) => e.has(uu(r)), fu = (e) => {
  const r = e.constructor && e.constructor.prototype;
  return Ue(r) && r.hasOwnProperty("isPrototypeOf");
}, ko = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function qr(e) {
  let r;
  const t = Array.isArray(e);
  if (e instanceof Date)
    r = new Date(e);
  else if (e instanceof Set)
    r = new Set(e);
  else if (!(ko && (e instanceof Blob || e instanceof FileList)) && (t || Ue(e)))
    if (r = t ? [] : {}, !Array.isArray(e) && !fu(e))
      r = e;
    else
      for (const n in e)
        r[n] = qr(e[n]);
  else
    return e;
  return r;
}
var _n = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Le = (e) => e === void 0, z = (e, r, t) => {
  if (!r || !Ue(e))
    return t;
  const n = _n(r.split(/[,[\].]+?/)).reduce((a, o) => nr(a) ? a : a[o], e);
  return Le(n) || n === e ? Le(e[r]) ? t : e[r] : n;
};
const Jn = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, Rr = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, Hr = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, Ns = Be.createContext(null), ha = () => Be.useContext(Ns), mu = (e) => {
  const { children: r, ...t } = e;
  return Be.createElement(Ns.Provider, { value: t }, r);
};
var Ds = (e, r, t, n = !0) => {
  const a = {
    defaultValues: r._defaultValues
  };
  for (const o in e)
    Object.defineProperty(a, o, {
      get: () => {
        const i = o;
        return r._proxyFormState[i] !== Rr.all && (r._proxyFormState[i] = !n || Rr.all), t && (t[i] = !0), e[i];
      }
    });
  return a;
}, Cr = (e) => Ue(e) && !Object.keys(e).length, zs = (e, r, t, n) => {
  t(e);
  const { name: a, ...o } = e;
  return Cr(o) || Object.keys(o).length >= Object.keys(r).length || Object.keys(o).find((i) => r[i] === (!n || Rr.all));
}, Vn = (e) => Array.isArray(e) ? e : [e], Os = (e, r, t) => t && r ? e === r : !e || !r || e === r || Vn(e).some((n) => n && (n.startsWith(r) || r.startsWith(n)));
function Co(e) {
  const r = Be.useRef(e);
  r.current = e, Be.useEffect(() => {
    const t = !e.disabled && r.current.subject && r.current.subject.subscribe({
      next: r.current.next
    });
    return () => {
      t && t.unsubscribe();
    };
  }, [e.disabled]);
}
function hu(e) {
  const r = ha(), { control: t = r.control, disabled: n, name: a, exact: o } = e || {}, [i, u] = Be.useState(t._formState), h = Be.useRef(!0), v = Be.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }), S = Be.useRef(a);
  return S.current = a, Co({
    disabled: n,
    next: (b) => h.current && Os(S.current, b.name, o) && zs(b, v.current, t._updateFormState) && u({
      ...t._formState,
      ...b
    }),
    subject: t._subjects.state
  }), Be.useEffect(() => (h.current = !0, v.current.isValid && t._updateValid(!0), () => {
    h.current = !1;
  }), [t]), Ds(i, t, v.current, !1);
}
var Ir = (e) => typeof e == "string", Is = (e, r, t, n, a) => Ir(e) ? (n && r.watch.add(e), z(t, e, a)) : Array.isArray(e) ? e.map((o) => (n && r.watch.add(o), z(t, o))) : (n && (r.watchAll = !0), t);
function vu(e) {
  const r = ha(), { control: t = r.control, name: n, defaultValue: a, disabled: o, exact: i } = e || {}, u = Be.useRef(n);
  u.current = n, Co({
    disabled: o,
    subject: t._subjects.values,
    next: (S) => {
      Os(u.current, S.name, i) && v(qr(Is(u.current, t._names, S.values || t._formValues, !1, a)));
    }
  });
  const [h, v] = Be.useState(t._getWatch(n, a));
  return Be.useEffect(() => t._removeUnmounted()), h;
}
var To = (e) => /^\w*$/.test(e), Bs = (e) => _n(e.replace(/["|']|\]/g, "").split(/\.|\[/));
function Fe(e, r, t) {
  let n = -1;
  const a = To(r) ? [r] : Bs(r), o = a.length, i = o - 1;
  for (; ++n < o; ) {
    const u = a[n];
    let h = t;
    if (n !== i) {
      const v = e[u];
      h = Ue(v) || Array.isArray(v) ? v : isNaN(+a[n + 1]) ? {} : [];
    }
    e[u] = h, e = e[u];
  }
  return e;
}
function gu(e) {
  const r = ha(), { name: t, control: n = r.control, shouldUnregister: a } = e, o = As(n._names.array, t), i = vu({
    control: n,
    name: t,
    defaultValue: z(n._formValues, t, z(n._defaultValues, t, e.defaultValue)),
    exact: !0
  }), u = hu({
    control: n,
    name: t
  }), h = Be.useRef(n.register(t, {
    ...e.rules,
    value: i
  }));
  return Be.useEffect(() => {
    const v = n._options.shouldUnregister || a, S = (b, _) => {
      const C = z(n._fields, b);
      C && (C._f.mount = _);
    };
    if (S(t, !0), v) {
      const b = qr(z(n._options.defaultValues, t));
      Fe(n._defaultValues, t, b), Le(z(n._formValues, t)) && Fe(n._formValues, t, b);
    }
    return () => {
      (o ? v && !n._state.action : v) ? n.unregister(t) : S(t, !1);
    };
  }, [t, n, o, a]), {
    field: {
      name: t,
      value: i,
      onChange: Be.useCallback((v) => h.current.onChange({
        target: {
          value: Fs(v),
          name: t
        },
        type: Jn.CHANGE
      }), [t]),
      onBlur: Be.useCallback(() => h.current.onBlur({
        target: {
          value: z(n._formValues, t),
          name: t
        },
        type: Jn.BLUR
      }), [t, n]),
      ref: (v) => {
        const S = z(n._fields, t);
        S && v && (S._f.ref = {
          focus: () => v.focus(),
          select: () => v.select(),
          setCustomValidity: (b) => v.setCustomValidity(b),
          reportValidity: () => v.reportValidity()
        });
      }
    },
    formState: u,
    fieldState: Object.defineProperties({}, {
      invalid: {
        enumerable: !0,
        get: () => !!z(u.errors, t)
      },
      isDirty: {
        enumerable: !0,
        get: () => !!z(u.dirtyFields, t)
      },
      isTouched: {
        enumerable: !0,
        get: () => !!z(u.touchedFields, t)
      },
      error: {
        enumerable: !0,
        get: () => z(u.errors, t)
      }
    })
  };
}
const bu = (e) => e.render(gu(e));
var pu = (e, r, t, n, a) => r ? {
  ...t[e],
  types: {
    ...t[e] && t[e].types ? t[e].types : {},
    [n]: a || !0
  }
} : {};
const to = (e, r, t) => {
  for (const n of t || Object.keys(e)) {
    const a = z(e, n);
    if (a) {
      const { _f: o, ...i } = a;
      if (o && r(o.name)) {
        if (o.ref.focus) {
          o.ref.focus();
          break;
        } else if (o.refs && o.refs[0].focus) {
          o.refs[0].focus();
          break;
        }
      } else
        Ue(i) && to(i, r);
    }
  }
};
var ii = (e) => ({
  isOnSubmit: !e || e === Rr.onSubmit,
  isOnBlur: e === Rr.onBlur,
  isOnChange: e === Rr.onChange,
  isOnAll: e === Rr.all,
  isOnTouch: e === Rr.onTouched
}), si = (e, r, t) => !t && (r.watchAll || r.watch.has(e) || [...r.watch].some((n) => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length)))), yu = (e, r, t) => {
  const n = _n(z(e, t));
  return Fe(n, "root", r[t]), Fe(e, t, n), e;
}, Dt = (e) => typeof e == "boolean", Eo = (e) => e.type === "file", st = (e) => typeof e == "function", Zn = (e) => {
  if (!ko)
    return !1;
  const r = e ? e.ownerDocument : 0;
  return e instanceof (r && r.defaultView ? r.defaultView.HTMLElement : HTMLElement);
}, Un = (e) => Ir(e), $o = (e) => e.type === "radio", ea = (e) => e instanceof RegExp;
const li = {
  value: !1,
  isValid: !1
}, ci = { value: !0, isValid: !0 };
var Ms = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const r = e.filter((t) => t && t.checked && !t.disabled).map((t) => t.value);
      return { value: r, isValid: !!r.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !Le(e[0].attributes.value) ? Le(e[0].value) || e[0].value === "" ? ci : { value: e[0].value, isValid: !0 } : ci
    ) : li;
  }
  return li;
};
const di = {
  isValid: !1,
  value: null
};
var Ws = (e) => Array.isArray(e) ? e.reduce((r, t) => t && t.checked && !t.disabled ? {
  isValid: !0,
  value: t.value
} : r, di) : di;
function ui(e, r, t = "validate") {
  if (Un(e) || Array.isArray(e) && e.every(Un) || Dt(e) && !e)
    return {
      type: t,
      message: Un(e) ? e : "",
      ref: r
    };
}
var $t = (e) => Ue(e) && !ea(e) ? e : {
  value: e,
  message: ""
}, fi = async (e, r, t, n, a) => {
  const { ref: o, refs: i, required: u, maxLength: h, minLength: v, min: S, max: b, pattern: _, validate: C, name: R, valueAsNumber: Y, mount: L, disabled: O } = e._f, w = z(r, R);
  if (!L || O)
    return {};
  const q = i ? i[0] : o, ie = (J) => {
    n && q.reportValidity && (q.setCustomValidity(Dt(J) ? "" : J || ""), q.reportValidity());
  }, M = {}, Q = $o(o), K = xn(o), re = Q || K, fe = (Y || Eo(o)) && Le(o.value) && Le(w) || Zn(o) && o.value === "" || w === "" || Array.isArray(w) && !w.length, Ee = pu.bind(null, R, t, M), me = (J, I, Z, ee = Hr.maxLength, se = Hr.minLength) => {
    const ye = J ? I : Z;
    M[R] = {
      type: J ? ee : se,
      message: ye,
      ref: o,
      ...Ee(J ? ee : se, ye)
    };
  };
  if (a ? !Array.isArray(w) || !w.length : u && (!re && (fe || nr(w)) || Dt(w) && !w || K && !Ms(i).isValid || Q && !Ws(i).isValid)) {
    const { value: J, message: I } = Un(u) ? { value: !!u, message: u } : $t(u);
    if (J && (M[R] = {
      type: Hr.required,
      message: I,
      ref: q,
      ...Ee(Hr.required, I)
    }, !t))
      return ie(I), M;
  }
  if (!fe && (!nr(S) || !nr(b))) {
    let J, I;
    const Z = $t(b), ee = $t(S);
    if (!nr(w) && !isNaN(w)) {
      const se = o.valueAsNumber || w && +w;
      nr(Z.value) || (J = se > Z.value), nr(ee.value) || (I = se < ee.value);
    } else {
      const se = o.valueAsDate || new Date(w), ye = (Me) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + Me), Ye = o.type == "time", Ve = o.type == "week";
      Ir(Z.value) && w && (J = Ye ? ye(w) > ye(Z.value) : Ve ? w > Z.value : se > new Date(Z.value)), Ir(ee.value) && w && (I = Ye ? ye(w) < ye(ee.value) : Ve ? w < ee.value : se < new Date(ee.value));
    }
    if ((J || I) && (me(!!J, Z.message, ee.message, Hr.max, Hr.min), !t))
      return ie(M[R].message), M;
  }
  if ((h || v) && !fe && (Ir(w) || a && Array.isArray(w))) {
    const J = $t(h), I = $t(v), Z = !nr(J.value) && w.length > +J.value, ee = !nr(I.value) && w.length < +I.value;
    if ((Z || ee) && (me(Z, J.message, I.message), !t))
      return ie(M[R].message), M;
  }
  if (_ && !fe && Ir(w)) {
    const { value: J, message: I } = $t(_);
    if (ea(J) && !w.match(J) && (M[R] = {
      type: Hr.pattern,
      message: I,
      ref: o,
      ...Ee(Hr.pattern, I)
    }, !t))
      return ie(I), M;
  }
  if (C) {
    if (st(C)) {
      const J = await C(w, r), I = ui(J, q);
      if (I && (M[R] = {
        ...I,
        ...Ee(Hr.validate, I.message)
      }, !t))
        return ie(I.message), M;
    } else if (Ue(C)) {
      let J = {};
      for (const I in C) {
        if (!Cr(J) && !t)
          break;
        const Z = ui(await C[I](w, r), q, I);
        Z && (J = {
          ...Z,
          ...Ee(I, Z.message)
        }, ie(Z.message), t && (M[R] = J));
      }
      if (!Cr(J) && (M[R] = {
        ref: q,
        ...J
      }, !t))
        return M;
    }
  }
  return ie(!0), M;
};
function Su(e, r) {
  const t = r.slice(0, -1).length;
  let n = 0;
  for (; n < t; )
    e = Le(e) ? n++ : e[r[n++]];
  return e;
}
function xu(e) {
  for (const r in e)
    if (!Le(e[r]))
      return !1;
  return !0;
}
function Qe(e, r) {
  const t = Array.isArray(r) ? r : To(r) ? [r] : Bs(r), n = t.length === 1 ? e : Su(e, t), a = t.length - 1, o = t[a];
  return n && delete n[o], a !== 0 && (Ue(n) && Cr(n) || Array.isArray(n) && xu(n)) && Qe(e, t.slice(0, -1)), e;
}
function Fa() {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (a) => {
      for (const o of e)
        o.next && o.next(a);
    },
    subscribe: (a) => (e.push(a), {
      unsubscribe: () => {
        e = e.filter((o) => o !== a);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
}
var ra = (e) => nr(e) || !Ps(e);
function gt(e, r) {
  if (ra(e) || ra(r))
    return e === r;
  if (Ft(e) && Ft(r))
    return e.getTime() === r.getTime();
  const t = Object.keys(e), n = Object.keys(r);
  if (t.length !== n.length)
    return !1;
  for (const a of t) {
    const o = e[a];
    if (!n.includes(a))
      return !1;
    if (a !== "ref") {
      const i = r[a];
      if (Ft(o) && Ft(i) || Ue(o) && Ue(i) || Array.isArray(o) && Array.isArray(i) ? !gt(o, i) : o !== i)
        return !1;
    }
  }
  return !0;
}
var Ls = (e) => e.type === "select-multiple", _u = (e) => $o(e) || xn(e), Aa = (e) => Zn(e) && e.isConnected, js = (e) => {
  for (const r in e)
    if (st(e[r]))
      return !0;
  return !1;
};
function ta(e, r = {}) {
  const t = Array.isArray(e);
  if (Ue(e) || t)
    for (const n in e)
      Array.isArray(e[n]) || Ue(e[n]) && !js(e[n]) ? (r[n] = Array.isArray(e[n]) ? [] : {}, ta(e[n], r[n])) : nr(e[n]) || (r[n] = !0);
  return r;
}
function Vs(e, r, t) {
  const n = Array.isArray(e);
  if (Ue(e) || n)
    for (const a in e)
      Array.isArray(e[a]) || Ue(e[a]) && !js(e[a]) ? Le(r) || ra(t[a]) ? t[a] = Array.isArray(e[a]) ? ta(e[a], []) : { ...ta(e[a]) } : Vs(e[a], nr(r) ? {} : r[a], t[a]) : t[a] = !gt(e[a], r[a]);
  return t;
}
var Na = (e, r) => Vs(e, r, ta(r)), Us = (e, { valueAsNumber: r, valueAsDate: t, setValueAs: n }) => Le(e) ? e : r ? e === "" ? NaN : e && +e : t && Ir(e) ? new Date(e) : n ? n(e) : e;
function Da(e) {
  const r = e.ref;
  if (!(e.refs ? e.refs.every((t) => t.disabled) : r.disabled))
    return Eo(r) ? r.files : $o(r) ? Ws(e.refs).value : Ls(r) ? [...r.selectedOptions].map(({ value: t }) => t) : xn(r) ? Ms(e.refs).value : Us(Le(r.value) ? e.ref.value : r.value, e);
}
var wu = (e, r, t, n) => {
  const a = {};
  for (const o of e) {
    const i = z(r, o);
    i && Fe(a, o, i._f);
  }
  return {
    criteriaMode: t,
    names: [...e],
    fields: a,
    shouldUseNativeValidation: n
  };
}, en = (e) => Le(e) ? e : ea(e) ? e.source : Ue(e) ? ea(e.value) ? e.value.source : e.value : e, ku = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);
function mi(e, r, t) {
  const n = z(e, t);
  if (n || To(t))
    return {
      error: n,
      name: t
    };
  const a = t.split(".");
  for (; a.length; ) {
    const o = a.join("."), i = z(r, o), u = z(e, o);
    if (i && !Array.isArray(i) && t !== o)
      return { name: t };
    if (u && u.type)
      return {
        name: o,
        error: u
      };
    a.pop();
  }
  return {
    name: t
  };
}
var Cu = (e, r, t, n, a) => a.isOnAll ? !1 : !t && a.isOnTouch ? !(r || e) : (t ? n.isOnBlur : a.isOnBlur) ? !e : (t ? n.isOnChange : a.isOnChange) ? e : !0, Tu = (e, r) => !_n(z(e, r)).length && Qe(e, r);
const Eu = {
  mode: Rr.onSubmit,
  reValidateMode: Rr.onChange,
  shouldFocusError: !0
};
function $u(e = {}, r) {
  let t = {
    ...Eu,
    ...e
  }, n = {
    submitCount: 0,
    isDirty: !1,
    isLoading: st(t.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    errors: {}
  }, a = {}, o = Ue(t.defaultValues) || Ue(t.values) ? qr(t.defaultValues || t.values) || {} : {}, i = t.shouldUnregister ? {} : qr(o), u = {
    action: !1,
    mount: !1,
    watch: !1
  }, h = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, v, S = 0;
  const b = {
    isDirty: !1,
    dirtyFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, _ = {
    values: Fa(),
    array: Fa(),
    state: Fa()
  }, C = e.resetOptions && e.resetOptions.keepDirtyValues, R = ii(t.mode), Y = ii(t.reValidateMode), L = t.criteriaMode === Rr.all, O = (d) => (p) => {
    clearTimeout(S), S = setTimeout(d, p);
  }, w = async (d) => {
    if (b.isValid || d) {
      const p = t.resolver ? Cr((await fe()).errors) : await me(a, !0);
      p !== n.isValid && _.state.next({
        isValid: p
      });
    }
  }, q = (d) => b.isValidating && _.state.next({
    isValidating: d
  }), ie = (d, p = [], x, A, F = !0, E = !0) => {
    if (A && x) {
      if (u.action = !0, E && Array.isArray(z(a, d))) {
        const W = x(z(a, d), A.argA, A.argB);
        F && Fe(a, d, W);
      }
      if (E && Array.isArray(z(n.errors, d))) {
        const W = x(z(n.errors, d), A.argA, A.argB);
        F && Fe(n.errors, d, W), Tu(n.errors, d);
      }
      if (b.touchedFields && E && Array.isArray(z(n.touchedFields, d))) {
        const W = x(z(n.touchedFields, d), A.argA, A.argB);
        F && Fe(n.touchedFields, d, W);
      }
      b.dirtyFields && (n.dirtyFields = Na(o, i)), _.state.next({
        name: d,
        isDirty: I(d, p),
        dirtyFields: n.dirtyFields,
        errors: n.errors,
        isValid: n.isValid
      });
    } else
      Fe(i, d, p);
  }, M = (d, p) => {
    Fe(n.errors, d, p), _.state.next({
      errors: n.errors
    });
  }, Q = (d, p, x, A) => {
    const F = z(a, d);
    if (F) {
      const E = z(i, d, Le(x) ? z(o, d) : x);
      Le(E) || A && A.defaultChecked || p ? Fe(i, d, p ? E : Da(F._f)) : se(d, E), u.mount && w();
    }
  }, K = (d, p, x, A, F) => {
    let E = !1, W = !1;
    const de = {
      name: d
    };
    if (!x || A) {
      b.isDirty && (W = n.isDirty, n.isDirty = de.isDirty = I(), E = W !== de.isDirty);
      const Te = gt(z(o, d), p);
      W = z(n.dirtyFields, d), Te ? Qe(n.dirtyFields, d) : Fe(n.dirtyFields, d, !0), de.dirtyFields = n.dirtyFields, E = E || b.dirtyFields && W !== !Te;
    }
    if (x) {
      const Te = z(n.touchedFields, d);
      Te || (Fe(n.touchedFields, d, x), de.touchedFields = n.touchedFields, E = E || b.touchedFields && Te !== x);
    }
    return E && F && _.state.next(de), E ? de : {};
  }, re = (d, p, x, A) => {
    const F = z(n.errors, d), E = b.isValid && Dt(p) && n.isValid !== p;
    if (e.delayError && x ? (v = O(() => M(d, x)), v(e.delayError)) : (clearTimeout(S), v = null, x ? Fe(n.errors, d, x) : Qe(n.errors, d)), (x ? !gt(F, x) : F) || !Cr(A) || E) {
      const W = {
        ...A,
        ...E && Dt(p) ? { isValid: p } : {},
        errors: n.errors,
        name: d
      };
      n = {
        ...n,
        ...W
      }, _.state.next(W);
    }
    q(!1);
  }, fe = async (d) => t.resolver(i, t.context, wu(d || h.mount, a, t.criteriaMode, t.shouldUseNativeValidation)), Ee = async (d) => {
    const { errors: p } = await fe();
    if (d)
      for (const x of d) {
        const A = z(p, x);
        A ? Fe(n.errors, x, A) : Qe(n.errors, x);
      }
    else
      n.errors = p;
    return p;
  }, me = async (d, p, x = {
    valid: !0
  }) => {
    for (const A in d) {
      const F = d[A];
      if (F) {
        const { _f: E, ...W } = F;
        if (E) {
          const de = h.array.has(E.name), Te = await fi(F, i, L, t.shouldUseNativeValidation && !p, de);
          if (Te[E.name] && (x.valid = !1, p))
            break;
          !p && (z(Te, E.name) ? de ? yu(n.errors, Te, E.name) : Fe(n.errors, E.name, Te[E.name]) : Qe(n.errors, E.name));
        }
        W && await me(W, p, x);
      }
    }
    return x.valid;
  }, J = () => {
    for (const d of h.unMount) {
      const p = z(a, d);
      p && (p._f.refs ? p._f.refs.every((x) => !Aa(x)) : !Aa(p._f.ref)) && j(d);
    }
    h.unMount = /* @__PURE__ */ new Set();
  }, I = (d, p) => (d && p && Fe(i, d, p), !gt(er(), o)), Z = (d, p, x) => Is(d, h, {
    ...u.mount ? i : Le(p) ? o : Ir(d) ? { [d]: p } : p
  }, x, p), ee = (d) => _n(z(u.mount ? i : o, d, e.shouldUnregister ? z(o, d, []) : [])), se = (d, p, x = {}) => {
    const A = z(a, d);
    let F = p;
    if (A) {
      const E = A._f;
      E && (!E.disabled && Fe(i, d, Us(p, E)), F = Zn(E.ref) && nr(p) ? "" : p, Ls(E.ref) ? [...E.ref.options].forEach((W) => W.selected = F.includes(W.value)) : E.refs ? xn(E.ref) ? E.refs.length > 1 ? E.refs.forEach((W) => (!W.defaultChecked || !W.disabled) && (W.checked = Array.isArray(F) ? !!F.find((de) => de === W.value) : F === W.value)) : E.refs[0] && (E.refs[0].checked = !!F) : E.refs.forEach((W) => W.checked = W.value === F) : Eo(E.ref) ? E.ref.value = "" : (E.ref.value = F, E.ref.type || _.values.next({
        name: d,
        values: { ...i }
      })));
    }
    (x.shouldDirty || x.shouldTouch) && K(d, F, x.shouldTouch, x.shouldDirty, !0), x.shouldValidate && Me(d);
  }, ye = (d, p, x) => {
    for (const A in p) {
      const F = p[A], E = `${d}.${A}`, W = z(a, E);
      (h.array.has(d) || !ra(F) || W && !W._f) && !Ft(F) ? ye(E, F, x) : se(E, F, x);
    }
  }, Ye = (d, p, x = {}) => {
    const A = z(a, d), F = h.array.has(d), E = qr(p);
    Fe(i, d, E), F ? (_.array.next({
      name: d,
      values: { ...i }
    }), (b.isDirty || b.dirtyFields) && x.shouldDirty && _.state.next({
      name: d,
      dirtyFields: Na(o, i),
      isDirty: I(d, E)
    })) : A && !A._f && !nr(E) ? ye(d, E, x) : se(d, E, x), si(d, h) && _.state.next({ ...n }), _.values.next({
      name: d,
      values: { ...i }
    }), !u.mount && r();
  }, Ve = async (d) => {
    const p = d.target;
    let x = p.name, A = !0;
    const F = z(a, x), E = () => p.type ? Da(F._f) : Fs(d);
    if (F) {
      let W, de;
      const Te = E(), tr = d.type === Jn.BLUR || d.type === Jn.FOCUS_OUT, jr = !ku(F._f) && !t.resolver && !z(n.errors, x) && !F._f.deps || Cu(tr, z(n.touchedFields, x), n.isSubmitted, Y, R), Ge = si(x, h, tr);
      Fe(i, x, Te), tr ? (F._f.onBlur && F._f.onBlur(d), v && v(0)) : F._f.onChange && F._f.onChange(d);
      const Sr = K(x, Te, tr, !1), Fr = !Cr(Sr) || Ge;
      if (!tr && _.values.next({
        name: x,
        type: d.type,
        values: { ...i }
      }), jr)
        return b.isValid && w(), Fr && _.state.next({ name: x, ...Ge ? {} : Sr });
      if (!tr && Ge && _.state.next({ ...n }), q(!0), t.resolver) {
        const { errors: Tr } = await fe([x]), xr = mi(n.errors, a, x), Vr = mi(Tr, a, xr.name || x);
        W = Vr.error, x = Vr.name, de = Cr(Tr);
      } else
        W = (await fi(F, i, L, t.shouldUseNativeValidation))[x], A = isNaN(Te) || Te === z(i, x, Te), A && (W ? de = !1 : b.isValid && (de = await me(a, !0)));
      A && (F._f.deps && Me(F._f.deps), re(x, de, W, Sr));
    }
  }, Me = async (d, p = {}) => {
    let x, A;
    const F = Vn(d);
    if (q(!0), t.resolver) {
      const E = await Ee(Le(d) ? d : F);
      x = Cr(E), A = d ? !F.some((W) => z(E, W)) : x;
    } else
      d ? (A = (await Promise.all(F.map(async (E) => {
        const W = z(a, E);
        return await me(W && W._f ? { [E]: W } : W);
      }))).every(Boolean), !(!A && !n.isValid) && w()) : A = x = await me(a);
    return _.state.next({
      ...!Ir(d) || b.isValid && x !== n.isValid ? {} : { name: d },
      ...t.resolver || !d ? { isValid: x } : {},
      errors: n.errors,
      isValidating: !1
    }), p.shouldFocus && !A && to(a, (E) => E && z(n.errors, E), d ? F : h.mount), A;
  }, er = (d) => {
    const p = {
      ...o,
      ...u.mount ? i : {}
    };
    return Le(d) ? p : Ir(d) ? z(p, d) : d.map((x) => z(p, x));
  }, rr = (d, p) => ({
    invalid: !!z((p || n).errors, d),
    isDirty: !!z((p || n).dirtyFields, d),
    isTouched: !!z((p || n).touchedFields, d),
    error: z((p || n).errors, d)
  }), le = (d) => {
    d && Vn(d).forEach((p) => Qe(n.errors, p)), _.state.next({
      errors: d ? n.errors : {}
    });
  }, ur = (d, p, x) => {
    const A = (z(a, d, { _f: {} })._f || {}).ref;
    Fe(n.errors, d, {
      ...p,
      ref: A
    }), _.state.next({
      name: d,
      errors: n.errors,
      isValid: !1
    }), x && x.shouldFocus && A && A.focus && A.focus();
  }, br = (d, p) => st(d) ? _.values.subscribe({
    next: (x) => d(Z(void 0, p), x)
  }) : Z(d, p, !0), j = (d, p = {}) => {
    for (const x of d ? Vn(d) : h.mount)
      h.mount.delete(x), h.array.delete(x), p.keepValue || (Qe(a, x), Qe(i, x)), !p.keepError && Qe(n.errors, x), !p.keepDirty && Qe(n.dirtyFields, x), !p.keepTouched && Qe(n.touchedFields, x), !t.shouldUnregister && !p.keepDefaultValue && Qe(o, x);
    _.values.next({
      values: { ...i }
    }), _.state.next({
      ...n,
      ...p.keepDirty ? { isDirty: I() } : {}
    }), !p.keepIsValid && w();
  }, ce = (d, p = {}) => {
    let x = z(a, d);
    const A = Dt(p.disabled);
    return Fe(a, d, {
      ...x || {},
      _f: {
        ...x && x._f ? x._f : { ref: { name: d } },
        name: d,
        mount: !0,
        ...p
      }
    }), h.mount.add(d), x ? A && Fe(i, d, p.disabled ? void 0 : z(i, d, Da(x._f))) : Q(d, !0, p.value), {
      ...A ? { disabled: p.disabled } : {},
      ...t.shouldUseNativeValidation ? {
        required: !!p.required,
        min: en(p.min),
        max: en(p.max),
        minLength: en(p.minLength),
        maxLength: en(p.maxLength),
        pattern: en(p.pattern)
      } : {},
      name: d,
      onChange: Ve,
      onBlur: Ve,
      ref: (F) => {
        if (F) {
          ce(d, p), x = z(a, d);
          const E = Le(F.value) && F.querySelectorAll && F.querySelectorAll("input,select,textarea")[0] || F, W = _u(E), de = x._f.refs || [];
          if (W ? de.find((Te) => Te === E) : E === x._f.ref)
            return;
          Fe(a, d, {
            _f: {
              ...x._f,
              ...W ? {
                refs: [
                  ...de.filter(Aa),
                  E,
                  ...Array.isArray(z(o, d)) ? [{}] : []
                ],
                ref: { type: E.type, name: d }
              } : { ref: E }
            }
          }), Q(d, !1, void 0, E);
        } else
          x = z(a, d, {}), x._f && (x._f.mount = !1), (t.shouldUnregister || p.shouldUnregister) && !(As(h.array, d) && u.action) && h.unMount.add(d);
      }
    };
  }, ae = () => t.shouldFocusError && to(a, (d) => d && z(n.errors, d), h.mount), be = (d, p) => async (x) => {
    x && (x.preventDefault && x.preventDefault(), x.persist && x.persist());
    let A = qr(i);
    if (_.state.next({
      isSubmitting: !0
    }), t.resolver) {
      const { errors: F, values: E } = await fe();
      n.errors = F, A = E;
    } else
      await me(a);
    Qe(n.errors, "root"), Cr(n.errors) ? (_.state.next({
      errors: {}
    }), await d(A, x)) : (p && await p({ ...n.errors }, x), ae(), setTimeout(ae)), _.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: Cr(n.errors),
      submitCount: n.submitCount + 1,
      errors: n.errors
    });
  }, Pe = (d, p = {}) => {
    z(a, d) && (Le(p.defaultValue) ? Ye(d, z(o, d)) : (Ye(d, p.defaultValue), Fe(o, d, p.defaultValue)), p.keepTouched || Qe(n.touchedFields, d), p.keepDirty || (Qe(n.dirtyFields, d), n.isDirty = p.defaultValue ? I(d, z(o, d)) : I()), p.keepError || (Qe(n.errors, d), b.isValid && w()), _.state.next({ ...n }));
  }, te = (d, p = {}) => {
    const x = d || o, A = qr(x), F = d && !Cr(d) ? A : o;
    if (p.keepDefaultValues || (o = x), !p.keepValues) {
      if (p.keepDirtyValues || C)
        for (const E of h.mount)
          z(n.dirtyFields, E) ? Fe(F, E, z(i, E)) : Ye(E, z(F, E));
      else {
        if (ko && Le(d))
          for (const E of h.mount) {
            const W = z(a, E);
            if (W && W._f) {
              const de = Array.isArray(W._f.refs) ? W._f.refs[0] : W._f.ref;
              if (Zn(de)) {
                const Te = de.closest("form");
                if (Te) {
                  Te.reset();
                  break;
                }
              }
            }
          }
        a = {};
      }
      i = e.shouldUnregister ? p.keepDefaultValues ? qr(o) : {} : A, _.array.next({
        values: { ...F }
      }), _.values.next({
        values: { ...F }
      });
    }
    h = {
      mount: /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, !u.mount && r(), u.mount = !b.isValid || !!p.keepIsValid, u.watch = !!e.shouldUnregister, _.state.next({
      submitCount: p.keepSubmitCount ? n.submitCount : 0,
      isDirty: p.keepDirty ? n.isDirty : !!(p.keepDefaultValues && !gt(d, o)),
      isSubmitted: p.keepIsSubmitted ? n.isSubmitted : !1,
      dirtyFields: p.keepDirtyValues ? n.dirtyFields : p.keepDefaultValues && d ? Na(o, d) : {},
      touchedFields: p.keepTouched ? n.touchedFields : {},
      errors: p.keepErrors ? n.errors : {},
      isSubmitting: !1,
      isSubmitSuccessful: !1
    });
  }, $e = (d, p) => te(st(d) ? d(i) : d, p);
  return {
    control: {
      register: ce,
      unregister: j,
      getFieldState: rr,
      _executeSchema: fe,
      _getWatch: Z,
      _getDirty: I,
      _updateValid: w,
      _removeUnmounted: J,
      _updateFieldArray: ie,
      _getFieldArray: ee,
      _reset: te,
      _resetDefaultValues: () => st(t.defaultValues) && t.defaultValues().then((d) => {
        $e(d, t.resetOptions), _.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (d) => {
        n = {
          ...n,
          ...d
        };
      },
      _subjects: _,
      _proxyFormState: b,
      get _fields() {
        return a;
      },
      get _formValues() {
        return i;
      },
      get _state() {
        return u;
      },
      set _state(d) {
        u = d;
      },
      get _defaultValues() {
        return o;
      },
      get _names() {
        return h;
      },
      set _names(d) {
        h = d;
      },
      get _formState() {
        return n;
      },
      set _formState(d) {
        n = d;
      },
      get _options() {
        return t;
      },
      set _options(d) {
        t = {
          ...t,
          ...d
        };
      }
    },
    trigger: Me,
    register: ce,
    handleSubmit: be,
    watch: br,
    setValue: Ye,
    getValues: er,
    reset: $e,
    resetField: Pe,
    clearErrors: le,
    unregister: j,
    setError: ur,
    setFocus: (d, p = {}) => {
      const x = z(a, d), A = x && x._f;
      if (A) {
        const F = A.refs ? A.refs[0] : A.ref;
        F.focus && (F.focus(), p.shouldSelect && F.select());
      }
    },
    getFieldState: rr
  };
}
function Ru(e = {}) {
  const r = Be.useRef(), [t, n] = Be.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: st(e.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    errors: {},
    defaultValues: st(e.defaultValues) ? void 0 : e.defaultValues
  });
  r.current || (r.current = {
    ...$u(e, () => n((o) => ({ ...o }))),
    formState: t
  });
  const a = r.current.control;
  return a._options = e, Co({
    subject: a._subjects.state,
    next: (o) => {
      zs(o, a._proxyFormState, a._updateFormState, !0) && n({ ...a._formState });
    }
  }), Be.useEffect(() => {
    e.values && !gt(e.values, a._defaultValues) ? a._reset(e.values, a._options.resetOptions) : a._resetDefaultValues();
  }, [e.values, a]), Be.useEffect(() => {
    a._state.mount || (a._updateValid(), a._state.mount = !0), a._state.watch && (a._state.watch = !1, a._subjects.state.next({ ...a._formState })), a._removeUnmounted();
  }), r.current.formState = Ds(t, a), r.current;
}
function Pu(e, r) {
  if (e != null) {
    if (typeof e == "function") {
      e(r);
      return;
    }
    try {
      e.current = r;
    } catch {
      throw new Error(`Cannot assign value '${r}' to ref '${e}'`);
    }
  }
}
function na(...e) {
  return (r) => {
    e.forEach((t) => {
      Pu(t, r);
    });
  };
}
function Fu(...e) {
  return pt(() => na(...e), e);
}
var [Au, Nu] = Wr({
  name: "FormControlStylesContext",
  errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `
}), [Du, va] = Wr({
  strict: !1,
  name: "FormControlContext"
});
function zu(e) {
  const {
    id: r,
    isRequired: t,
    isInvalid: n,
    isDisabled: a,
    isReadOnly: o,
    ...i
  } = e, u = bo(), h = r || `field-${u}`, v = `${h}-label`, S = `${h}-feedback`, b = `${h}-helptext`, [_, C] = ge(!1), [R, Y] = ge(!1), [L, O] = ge(!1), w = Ze(
    (K = {}, re = null) => ({
      id: b,
      ...K,
      ref: na(re, (fe) => {
        fe && Y(!0);
      })
    }),
    [b]
  ), q = Ze(
    (K = {}, re = null) => ({
      ...K,
      ref: re,
      "data-focus": We(L),
      "data-disabled": We(a),
      "data-invalid": We(n),
      "data-readonly": We(o),
      id: K.id !== void 0 ? K.id : v,
      htmlFor: K.htmlFor !== void 0 ? K.htmlFor : h
    }),
    [h, a, L, n, o, v]
  ), ie = Ze(
    (K = {}, re = null) => ({
      id: S,
      ...K,
      ref: na(re, (fe) => {
        fe && C(!0);
      }),
      "aria-live": "polite"
    }),
    [S]
  ), M = Ze(
    (K = {}, re = null) => ({
      ...K,
      ...i,
      ref: re,
      role: "group"
    }),
    [i]
  ), Q = Ze(
    (K = {}, re = null) => ({
      ...K,
      ref: re,
      role: "presentation",
      "aria-hidden": !0,
      children: K.children || "*"
    }),
    []
  );
  return {
    isRequired: !!t,
    isInvalid: !!n,
    isReadOnly: !!o,
    isDisabled: !!a,
    isFocused: !!L,
    onFocus: () => O(!0),
    onBlur: () => O(!1),
    hasFeedbackText: _,
    setHasFeedbackText: C,
    hasHelpText: R,
    setHasHelpText: Y,
    id: h,
    labelId: v,
    feedbackId: S,
    helpTextId: b,
    htmlProps: i,
    getHelpTextProps: w,
    getErrorMessageProps: ie,
    getRootProps: M,
    getLabelProps: q,
    getRequiredIndicatorProps: Q
  };
}
var Hs = ve(
  function(r, t) {
    const n = Mr("Form", r), a = sr(r), {
      getRootProps: o,
      htmlProps: i,
      ...u
    } = zu(a), h = qe("chakra-form-control", r.className);
    return /* @__PURE__ */ N(Du, { value: u, children: /* @__PURE__ */ N(Au, { value: n, children: /* @__PURE__ */ N(
      ne.div,
      {
        ...o({}, t),
        className: h,
        __css: n.container
      }
    ) }) });
  }
);
Hs.displayName = "FormControl";
var Ou = ve(
  function(r, t) {
    const n = va(), a = Nu(), o = qe("chakra-form__helper-text", r.className);
    return /* @__PURE__ */ N(
      ne.div,
      {
        ...n == null ? void 0 : n.getHelpTextProps(r, t),
        __css: a.helperText,
        className: o
      }
    );
  }
);
Ou.displayName = "FormHelperText";
var [Iu, Bu] = Wr({
  name: "FormErrorStylesContext",
  errorMessage: `useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `
}), Ys = ve(
  (e, r) => {
    const t = Mr("FormError", e), n = sr(e), a = va();
    return a != null && a.isInvalid ? /* @__PURE__ */ N(Iu, { value: t, children: /* @__PURE__ */ N(
      ne.div,
      {
        ...a == null ? void 0 : a.getErrorMessageProps(n, r),
        className: qe("chakra-form__error-message", e.className),
        __css: {
          display: "flex",
          alignItems: "center",
          ...t.text
        }
      }
    ) }) : null;
  }
);
Ys.displayName = "FormErrorMessage";
var Mu = ve((e, r) => {
  const t = Bu(), n = va();
  if (!(n != null && n.isInvalid))
    return null;
  const a = qe("chakra-form__error-icon", e.className);
  return /* @__PURE__ */ N(
    Zr,
    {
      ref: r,
      "aria-hidden": !0,
      ...e,
      __css: t.icon,
      className: a,
      children: /* @__PURE__ */ N(
        "path",
        {
          fill: "currentColor",
          d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        }
      )
    }
  );
});
Mu.displayName = "FormErrorIcon";
function Wu(e) {
  return e && Mt(e) && Mt(e.target);
}
function Lu(e = {}) {
  const {
    onChange: r,
    value: t,
    defaultValue: n,
    name: a,
    isDisabled: o,
    isFocusable: i,
    isNative: u,
    ...h
  } = e, [v, S] = ge(n || ""), b = typeof t < "u", _ = b ? t : v, C = ns(null), R = Ze(() => {
    const M = C.current;
    if (!M)
      return;
    let Q = "input:not(:disabled):checked";
    const K = M.querySelector(
      Q
    );
    if (K) {
      K.focus();
      return;
    }
    Q = "input:not(:disabled)";
    const re = M.querySelector(Q);
    re == null || re.focus();
  }, []), L = `radio-${bo()}`, O = a || L, w = Ze(
    (M) => {
      const Q = Wu(M) ? M.target.value : M;
      b || S(Q), r == null || r(String(Q));
    },
    [r, b]
  ), q = Ze(
    (M = {}, Q = null) => ({
      ...M,
      ref: na(Q, C),
      role: "radiogroup"
    }),
    []
  ), ie = Ze(
    (M = {}, Q = null) => ({
      ...M,
      ref: Q,
      name: O,
      [u ? "checked" : "isChecked"]: _ != null ? M.value === _ : void 0,
      onChange(re) {
        w(re);
      },
      "data-radiogroup": !0
    }),
    [u, O, w, _]
  );
  return {
    getRootProps: q,
    getRadioProps: ie,
    name: O,
    ref: C,
    focus: R,
    setValue: S,
    value: _,
    onChange: w,
    isDisabled: o,
    isFocusable: i,
    htmlProps: h
  };
}
var [ju, qs] = Wr({
  name: "RadioGroupContext",
  strict: !1
}), Gs = ve((e, r) => {
  const {
    colorScheme: t,
    size: n,
    variant: a,
    children: o,
    className: i,
    isDisabled: u,
    isFocusable: h,
    ...v
  } = e, { value: S, onChange: b, getRootProps: _, name: C, htmlProps: R } = Lu(v), Y = pt(
    () => ({
      name: C,
      size: n,
      onChange: b,
      colorScheme: t,
      value: S,
      variant: a,
      isDisabled: u,
      isFocusable: h
    }),
    [
      C,
      n,
      b,
      t,
      S,
      a,
      u,
      h
    ]
  );
  return /* @__PURE__ */ N(ju, { value: Y, children: /* @__PURE__ */ N(
    ne.div,
    {
      ..._(R, r),
      className: qe("chakra-radio-group", i),
      children: o
    }
  ) });
});
Gs.displayName = "RadioGroup";
var hi = !1, wn = null, wt = !1, no = !1, ao = /* @__PURE__ */ new Set();
function Ro(e, r) {
  ao.forEach((t) => t(e, r));
}
var Vu = typeof window < "u" && window.navigator != null ? /^Mac/.test(window.navigator.platform) : !1;
function Uu(e) {
  return !(e.metaKey || !Vu && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function vi(e) {
  wt = !0, Uu(e) && (wn = "keyboard", Ro("keyboard", e));
}
function Rt(e) {
  if (wn = "pointer", e.type === "mousedown" || e.type === "pointerdown") {
    wt = !0;
    const r = e.composedPath ? e.composedPath()[0] : e.target;
    let t = !1;
    try {
      t = r.matches(":focus-visible");
    } catch {
    }
    if (t)
      return;
    Ro("pointer", e);
  }
}
function Hu(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : e.detail === 0 && !e.pointerType;
}
function Yu(e) {
  Hu(e) && (wt = !0, wn = "virtual");
}
function qu(e) {
  e.target === window || e.target === document || (!wt && !no && (wn = "virtual", Ro("virtual", e)), wt = !1, no = !1);
}
function Gu() {
  wt = !1, no = !0;
}
function gi() {
  return wn !== "pointer";
}
function Xu() {
  if (typeof window > "u" || hi)
    return;
  const { focus: e } = HTMLElement.prototype;
  HTMLElement.prototype.focus = function(...t) {
    wt = !0, e.apply(this, t);
  }, document.addEventListener("keydown", vi, !0), document.addEventListener("keyup", vi, !0), document.addEventListener("click", Yu, !0), window.addEventListener("focus", qu, !0), window.addEventListener("blur", Gu, !1), typeof PointerEvent < "u" ? (document.addEventListener("pointerdown", Rt, !0), document.addEventListener("pointermove", Rt, !0), document.addEventListener("pointerup", Rt, !0)) : (document.addEventListener("mousedown", Rt, !0), document.addEventListener("mousemove", Rt, !0), document.addEventListener("mouseup", Rt, !0)), hi = !0;
}
function Qu(e) {
  Xu(), e(gi());
  const r = () => e(gi());
  return ao.add(r), () => {
    ao.delete(r);
  };
}
var Ku = {
  border: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
function Ju(e = {}) {
  const {
    defaultChecked: r,
    isChecked: t,
    isFocusable: n,
    isDisabled: a,
    isReadOnly: o,
    isRequired: i,
    onChange: u,
    isInvalid: h,
    name: v,
    value: S,
    id: b,
    "data-radiogroup": _,
    "aria-describedby": C,
    ...R
  } = e, Y = `radio-${bo()}`, L = va(), w = !!qs() || !!_;
  let ie = !!L && !w ? L.id : Y;
  ie = b ?? ie;
  const M = a ?? (L == null ? void 0 : L.isDisabled), Q = o ?? (L == null ? void 0 : L.isReadOnly), K = i ?? (L == null ? void 0 : L.isRequired), re = h ?? (L == null ? void 0 : L.isInvalid), [fe, Ee] = ge(!1), [me, J] = ge(!1), [I, Z] = ge(!1), [ee, se] = ge(!1), [ye, Ye] = ge(!!r), Ve = typeof t < "u", Me = Ve ? t : ye;
  Ke(() => Qu(Ee), []);
  const er = Ze(
    (te) => {
      if (Q || M) {
        te.preventDefault();
        return;
      }
      Ve || Ye(te.target.checked), u == null || u(te);
    },
    [Ve, M, Q, u]
  ), rr = Ze(
    (te) => {
      te.key === " " && se(!0);
    },
    [se]
  ), le = Ze(
    (te) => {
      te.key === " " && se(!1);
    },
    [se]
  ), ur = Ze(
    (te = {}, $e = null) => ({
      ...te,
      ref: $e,
      "data-active": We(ee),
      "data-hover": We(I),
      "data-disabled": We(M),
      "data-invalid": We(re),
      "data-checked": We(Me),
      "data-focus": We(me),
      "data-focus-visible": We(me && fe),
      "data-readonly": We(Q),
      "aria-hidden": !0,
      onMouseDown: Dr(te.onMouseDown, () => se(!0)),
      onMouseUp: Dr(te.onMouseUp, () => se(!1)),
      onMouseEnter: Dr(
        te.onMouseEnter,
        () => Z(!0)
      ),
      onMouseLeave: Dr(
        te.onMouseLeave,
        () => Z(!1)
      )
    }),
    [
      ee,
      I,
      M,
      re,
      Me,
      me,
      Q,
      fe
    ]
  ), { onFocus: br, onBlur: j } = L ?? {}, ce = Ze(
    (te = {}, $e = null) => {
      const pr = M && !n;
      return {
        ...te,
        id: ie,
        ref: $e,
        type: "radio",
        name: v,
        value: S,
        onChange: Dr(te.onChange, er),
        onBlur: Dr(
          j,
          te.onBlur,
          () => J(!1)
        ),
        onFocus: Dr(
          br,
          te.onFocus,
          () => J(!0)
        ),
        onKeyDown: Dr(te.onKeyDown, rr),
        onKeyUp: Dr(te.onKeyUp, le),
        checked: Me,
        disabled: pr,
        readOnly: Q,
        required: K,
        "aria-invalid": Ra(re),
        "aria-disabled": Ra(pr),
        "aria-required": Ra(K),
        "data-readonly": We(Q),
        "aria-describedby": C,
        style: Ku
      };
    },
    [
      M,
      n,
      ie,
      v,
      S,
      er,
      j,
      br,
      rr,
      le,
      Me,
      Q,
      K,
      re,
      C
    ]
  );
  return {
    state: {
      isInvalid: re,
      isFocused: me,
      isChecked: Me,
      isActive: ee,
      isHovered: I,
      isDisabled: M,
      isReadOnly: Q,
      isRequired: K
    },
    getCheckboxProps: ur,
    getRadioProps: ur,
    getInputProps: ce,
    getLabelProps: (te = {}, $e = null) => ({
      ...te,
      ref: $e,
      onMouseDown: Dr(te.onMouseDown, Zu),
      "data-disabled": We(M),
      "data-checked": We(Me),
      "data-invalid": We(re)
    }),
    getRootProps: (te, $e = null) => ({
      ...te,
      ref: $e,
      "data-disabled": We(M),
      "data-checked": We(Me),
      "data-invalid": We(re)
    }),
    htmlProps: R
  };
}
function Zu(e) {
  e.preventDefault(), e.stopPropagation();
}
function ef(e, r) {
  const t = {}, n = {};
  for (const [a, o] of Object.entries(e))
    r.includes(a) ? t[a] = o : n[a] = o;
  return [t, n];
}
var Xs = ve((e, r) => {
  var t;
  const n = qs(), { onChange: a, value: o } = e, i = Mr("Radio", { ...n, ...e }), u = sr(e), {
    spacing: h = "0.5rem",
    children: v,
    isDisabled: S = n == null ? void 0 : n.isDisabled,
    isFocusable: b = n == null ? void 0 : n.isFocusable,
    inputProps: _,
    ...C
  } = u;
  let R = e.isChecked;
  (n == null ? void 0 : n.value) != null && o != null && (R = n.value === o);
  let Y = a;
  n != null && n.onChange && o != null && (Y = fc(n.onChange, a));
  const L = (t = e == null ? void 0 : e.name) != null ? t : n == null ? void 0 : n.name, {
    getInputProps: O,
    getCheckboxProps: w,
    getLabelProps: q,
    getRootProps: ie,
    htmlProps: M
  } = Ju({
    ...C,
    isChecked: R,
    isFocusable: b,
    isDisabled: S,
    onChange: Y,
    name: L
  }), [Q, K] = ef(M, nc), re = w(K), fe = O(_, r), Ee = q(), me = Object.assign({}, Q, ie()), J = {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    cursor: "pointer",
    position: "relative",
    ...i.container
  }, I = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...i.control
  }, Z = {
    userSelect: "none",
    marginStart: h,
    ...i.label
  };
  return /* @__PURE__ */ Sn(ne.label, { className: "chakra-radio", ...me, __css: J, children: [
    /* @__PURE__ */ N("input", { className: "chakra-radio__input", ...fe }),
    /* @__PURE__ */ N(
      ne.span,
      {
        className: "chakra-radio__control",
        ...re,
        __css: I
      }
    ),
    v && /* @__PURE__ */ N(
      ne.span,
      {
        className: "chakra-radio__label",
        ...Ee,
        __css: Z,
        children: v
      }
    )
  ] });
});
Xs.displayName = "Radio";
const Qs = ({ question: e, ...r }) => {
  const t = Mr("Questions"), { isAbleToVote: n, trans: a } = lt(), {
    formState: { errors: o }
  } = ha();
  return /* @__PURE__ */ U(ne.div, { __css: t.question, ...r, children: /* @__PURE__ */ U(Hs, { isInvalid: !!o[e.title.default], children: [
    /* @__PURE__ */ U(ne.label, { __css: t.title, children: e.title.default }, void 0, !1, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, globalThis),
    e.description && /* @__PURE__ */ U(ne.div, { __css: t.description, children: /* @__PURE__ */ U(fa, { children: e.description.default }, void 0, !1, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, globalThis) }, void 0, !1, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
      lineNumber: 26,
      columnNumber: 11
    }, globalThis),
    /* @__PURE__ */ U(
      bu,
      {
        rules: { required: a("required", "This field is required") },
        name: e.title.default,
        render: ({ field: i }) => {
          var u;
          return /* @__PURE__ */ U(Gs, { sx: t.radioGroup, ...i, isDisabled: !n, children: [
            /* @__PURE__ */ U(ys, { direction: "column", sx: t.stack, children: e.choices.map((h, v) => /* @__PURE__ */ U(Xs, { sx: t.radio, value: h.title.default, children: h.title.default }, v, !1, {
              fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
              lineNumber: 37,
              columnNumber: 19
            }, globalThis)) }, void 0, !1, {
              fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
              lineNumber: 35,
              columnNumber: 15
            }, globalThis),
            /* @__PURE__ */ U(Ys, { sx: t.error, children: (u = o[e.title.default]) == null ? void 0 : u.message }, void 0, !1, {
              fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
              lineNumber: 42,
              columnNumber: 15
            }, globalThis)
          ] }, void 0, !0, {
            fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
            lineNumber: 34,
            columnNumber: 13
          }, globalThis);
        }
      },
      void 0,
      !1,
      {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
        lineNumber: 30,
        columnNumber: 9
      },
      globalThis
    )
  ] }, void 0, !0, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, globalThis) }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionField.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, globalThis);
};
Qs.displayName = "Question";
const rf = () => {
  var _;
  const { election: e, signer: r, vote: t, voted: n, ConnectButton: a, error: o, loading: i, trans: u } = lt(), h = Ru(), v = Mr("Questions"), S = e == null ? void 0 : e.questions;
  if (n)
    return /* @__PURE__ */ U(jn, { variant: "solid", status: "info", children: (_ = u("voted", "You already voted. Your vote id is %id")) == null ? void 0 : _.replace("%id", n) }, void 0, !1, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, globalThis);
  if (!S || S && !(S != null && S.length))
    return /* @__PURE__ */ U(jn, { variant: "solid", status: "warning", sx: v.alert, children: [
      /* @__PURE__ */ U(ro, {}, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, globalThis),
      u("empty", "Apparently this process has no questions 🤔")
    ] }, void 0, !0, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, globalThis);
  S.reduce(
    (C, R) => ({
      ...C,
      [R.title.default]: ""
    }),
    {}
  );
  const b = async (C) => await t(C);
  return /* @__PURE__ */ U(mu, { ...h, children: /* @__PURE__ */ U("form", { onSubmit: h.handleSubmit(b), id: "election-questions-form", children: [
    S.map((C, R) => /* @__PURE__ */ U(Qs, { question: C }, R, !1, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
      lineNumber: 44,
      columnNumber: 11
    }, globalThis)),
    o && /* @__PURE__ */ U(jn, { status: "error", variant: "solid", mb: 3, children: [
      /* @__PURE__ */ U(ro, {}, void 0, !1, {
        fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, globalThis),
      o
    ] }, void 0, !0, {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
      lineNumber: 47,
      columnNumber: 11
    }, globalThis)
  ] }, void 0, !0, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, globalThis) }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/QuestionsForm.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, globalThis);
};
var [A0, tf] = Wr({
  strict: !1,
  name: "ButtonGroupContext"
});
function nf(e) {
  const [r, t] = ge(!e);
  return { ref: Ze((o) => {
    o && t(o.tagName === "BUTTON");
  }, []), type: r ? "button" : void 0 };
}
function oo(e) {
  const { children: r, className: t, ...n } = e, a = as(r) ? os(r, {
    "aria-hidden": !0,
    focusable: !1
  }) : r, o = qe("chakra-button__icon", t);
  return /* @__PURE__ */ N(
    ne.span,
    {
      display: "inline-flex",
      alignSelf: "center",
      flexShrink: 0,
      ...n,
      className: o,
      children: a
    }
  );
}
oo.displayName = "ButtonIcon";
function io(e) {
  const {
    label: r,
    placement: t,
    spacing: n = "0.5rem",
    children: a = /* @__PURE__ */ N(wo, { color: "currentColor", width: "1em", height: "1em" }),
    className: o,
    __css: i,
    ...u
  } = e, h = qe("chakra-button__spinner", o), v = t === "start" ? "marginEnd" : "marginStart", S = pt(
    () => ({
      display: "flex",
      alignItems: "center",
      position: r ? "relative" : "absolute",
      [v]: r ? n : 0,
      fontSize: "1em",
      lineHeight: "normal",
      ...i
    }),
    [i, r, v, n]
  );
  return /* @__PURE__ */ N(ne.div, { className: h, ...u, __css: S, children: a });
}
io.displayName = "ButtonSpinner";
var Ks = ve((e, r) => {
  const t = tf(), n = ir("Button", { ...t, ...e }), {
    isDisabled: a = t == null ? void 0 : t.isDisabled,
    isLoading: o,
    isActive: i,
    children: u,
    leftIcon: h,
    rightIcon: v,
    loadingText: S,
    iconSpacing: b = "0.5rem",
    type: _,
    spinner: C,
    spinnerPlacement: R = "start",
    className: Y,
    as: L,
    ...O
  } = sr(e), w = pt(() => {
    const Q = { ...n == null ? void 0 : n._focus, zIndex: 1 };
    return {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      ...n,
      ...!!t && { _focus: Q }
    };
  }, [n, t]), { ref: q, type: ie } = nf(L), M = { rightIcon: v, leftIcon: h, iconSpacing: b, children: u };
  return /* @__PURE__ */ Sn(
    ne.button,
    {
      ref: Fu(r, q),
      as: L,
      type: _ ?? ie,
      "data-active": We(i),
      "data-loading": We(o),
      __css: w,
      className: qe("chakra-button", Y),
      ...O,
      disabled: a || o,
      children: [
        o && R === "start" && /* @__PURE__ */ N(
          io,
          {
            className: "chakra-button__spinner--start",
            label: S,
            placement: "start",
            spacing: b,
            children: C
          }
        ),
        o ? S || /* @__PURE__ */ N(ne.span, { opacity: 0, children: /* @__PURE__ */ N(bi, { ...M }) }) : /* @__PURE__ */ N(bi, { ...M }),
        o && R === "end" && /* @__PURE__ */ N(
          io,
          {
            className: "chakra-button__spinner--end",
            label: S,
            placement: "end",
            spacing: b,
            children: C
          }
        )
      ]
    }
  );
});
Ks.displayName = "Button";
function bi(e) {
  const { leftIcon: r, rightIcon: t, children: n, iconSpacing: a } = e;
  return /* @__PURE__ */ Sn(gc, { children: [
    r && /* @__PURE__ */ N(oo, { marginEnd: a, children: r }),
    n,
    t && /* @__PURE__ */ N(oo, { marginStart: a, children: t })
  ] });
}
const af = (e) => {
  const { signer: r, loading: t, voting: n, ConnectButton: a, isAbleToVote: o, election: i, voted: u, trans: h } = lt(), v = !r || !o || (i == null ? void 0 : i.status) !== on.ONGOING;
  return u ? null : !r && a ? /* @__PURE__ */ U(a, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/VoteButton.tsx",
    lineNumber: 12,
    columnNumber: 12
  }, globalThis) : /* @__PURE__ */ U(
    Ks,
    {
      type: "submit",
      ...e,
      form: "election-questions-form",
      isDisabled: v,
      isLoading: t || n,
      children: h("vote", "Vote")
    },
    void 0,
    !1,
    {
      fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/VoteButton.tsx",
      lineNumber: 16,
      columnNumber: 5
    },
    globalThis
  );
}, of = ({
  id: e,
  election: r,
  signer: t,
  fetchCensus: n,
  texts: a,
  ...o
}) => {
  const { client: i, signer: u, setSigner: h } = po(), [v, S] = ge(!1), [b, _] = ge(!1), [C, R] = ge(!1), [Y, L] = ge(null), [O, w] = ge(""), [q, ie] = ge(r), [M, Q] = ge(void 0), [K, re] = ge(0), [fe, Ee] = ge(!1), [me, J] = ge(void 0), [I, Z] = ge(void 0), [ee, se] = ge(null), [ye, Ye] = ge("facebook"), Ve = (j, ce) => a && a[j] ? a[j] : ce;
  Ke(() => {
    !i || u || !t || h(t);
  }, [u, i, t]), Ke(() => {
    q || !e || C || !i || (async () => {
      S(!0);
      try {
        const j = await i.fetchElection(e);
        R(!0), ie(j);
      } catch (j) {
        w(j.message);
      } finally {
        S(!1);
      }
    })();
  }, [q, e, C, i]), Ke(() => {
    C || !r || R(!0);
  }, [r, C]), Ke(() => {
    !n || !u || !q || !C || !i || M !== void 0 || (async () => {
      const j = q.census.type, ce = await i.isInCensus(q.id);
      let ae = 0;
      if (ce || j == rt.WEIGHTED) {
        ae = await i.votesLeftCount(q.id), re(ae);
        const be = await i.hasAlreadyVoted(q.id);
        L(be);
      }
      J(j), Ee(ce), Q(ae > 0 && ce || j == rt.CSP);
    })();
  }, [n, q, C, i, M, u]), Ke(() => {
    (async () => window.opener || i && me == rt.CSP && window.addEventListener("message", (j) => {
      j.data.code && j.data.handler && ur(i, j.data.code, j.data.handler);
    }))();
  }, [i, me]), Ke(() => {
    (async () => {
      var ae, be;
      if (typeof window > "u")
        return;
      const j = (ae = window.location.href.split("?")[1].split("&").find((Pe) => Pe.startsWith("code="))) == null ? void 0 : ae.split("=")[1], ce = (be = window.location.href.split("?")[1].split("&").find((Pe) => Pe.startsWith("handler="))) == null ? void 0 : be.split("=")[1];
      !j || !ce || window.opener && (window.opener.postMessage({ code: j, handler: ce }, "*"), window.close());
    })();
  }, []);
  const Me = async (j) => {
    if (!i)
      throw new Error("no client initialized");
    if (!u)
      throw new Error("no signer provided");
    if (!q)
      throw new Error("no election initialized");
    _(!0), w(""), i.setElectionId(q.id);
    const ce = q.questions.map((be) => parseInt(j[be.title.default], 10));
    let ae = new qo(ce);
    Z(ae);
    try {
      me == rt.CSP ? await rr() : me == rt.WEIGHTED && await er();
    } catch (be) {
      if ("reason" in be)
        return w(be.reason);
      if ("message" in be)
        return w(be.message);
      console.error("could not vote:", be);
    } finally {
      _(!1);
    }
  }, er = async () => {
    if (!I)
      throw new Error("no vote instance");
    if (me != rt.WEIGHTED)
      throw new Error("not a Weighted election");
    const j = await i.submitVote(I);
    return L(j), j;
  }, rr = async () => {
    if (!i)
      throw new Error("no client initialized");
    if (!q)
      throw new Error("no election initialized");
    if (me != rt.CSP)
      throw new Error("not a CSP election");
    let j = `${window.location.href}`;
    j.includes(`electionId=${q.id}`) || (j.includes("?") ? j += `&electionId=${q.id}` : j += `?electionId=${q.id}`), j.includes(`handler=${ye}`) || (j.includes("?") ? j += `&handler=${ye}` : j += `?handler=${ye}`);
    let ce;
    try {
      ce = await i.cspStep(0, [ye, j]);
    } catch (ae) {
      if ("reason" in ae)
        return w(ae.reason);
    }
    se(ce.authToken), le(ye, ce.response[0]);
  }, le = (j, ce) => {
    const Pe = window.outerWidth / 2 - 300, $e = [
      "width=600",
      "height=600",
      `top=${window.outerHeight / 2 - 600 / 2}`,
      `left=${Pe}`,
      "status=no",
      "resizable=yes",
      "scrollbars=yes"
    ].join(",");
    window.open(ce, j, $e);
  }, ur = async (j, ce, ae) => {
    var $e;
    if (!ce)
      throw new Error("no code provided");
    if (!ae)
      throw new Error("no handler provided");
    const be = ($e = window.location.href.split("?")[1].split("&").find((pr) => pr.startsWith("electionId="))) == null ? void 0 : $e.split("=")[1];
    let Pe = `${window.location.href.split("?")[0]}?electionId=${be}&handler=${ae}`, te;
    try {
      te = await j.cspStep(1, [ae, ce, Pe], ee), br(te.token);
    } catch {
      return w("Not authorized to vote"), !1;
    }
  }, br = async (j) => {
    var ae;
    if (!i)
      throw new Error("no client initialized");
    let ce = new qo([1]);
    if (me != rt.CSP)
      throw new Error("not a CSP election");
    try {
      const be = await ((ae = i.wallet) == null ? void 0 : ae.getAddress()), Pe = await i.cspSign(be, j), te = i.cspVote(ce, Pe), $e = await i.submitVote(te);
      return L($e), $e;
    } catch {
      return w("Error submitting vote"), !1;
    }
  };
  return {
    ...o,
    election: q,
    error: O,
    isAbleToVote: M,
    isInCensus: fe,
    loading: v,
    signer: u,
    trans: Ve,
    vote: Me,
    voted: Y,
    votesLeft: K,
    voting: b
  };
}, Js = da(void 0), lt = () => {
  const e = ua(Js);
  if (!e)
    throw new Error(
      "useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?"
    );
  return e;
}, Zs = ({ children: e, ...r }) => {
  const t = of(r);
  return /* @__PURE__ */ U(Js.Provider, { value: t, children: e }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 334,
    columnNumber: 10
  }, globalThis);
};
Zs.displayName = "ElectionProvider";
const sf = (e) => /* @__PURE__ */ U(Zs, { ...e, fetchCensus: !0, children: [
  /* @__PURE__ */ U(Zd, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 340,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(Es, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 341,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U($s, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 342,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(ru, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 343,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(eu, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 344,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(cs, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 345,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(rf, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 346,
    columnNumber: 5
  }, globalThis),
  /* @__PURE__ */ U(af, {}, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
    lineNumber: 347,
    columnNumber: 5
  }, globalThis)
] }, void 0, !0, {
  fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Election/Election.tsx",
  lineNumber: 339,
  columnNumber: 3
}, globalThis);
sf.displayName = "Election";
const el = ve((e, r) => {
  const { organization: t } = ga(), n = ir("OrganizationName", e), a = sr(e);
  return t ? /* @__PURE__ */ U(ne.h1, { ref: r, ...a, __css: n, children: t.metadata.name.default }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Name.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, globalThis) : null;
});
el.displayName = "OrganizationName";
const lf = ({ id: e, organization: r, ...t }) => {
  const { client: n, signer: a, setSigner: o } = po(), [i, u] = ge(!1), [h, v] = ge(!1), [S, b] = ge(""), [_, C] = ge(r), R = async (Y, L) => {
    u(!0);
    try {
      Y instanceof Go ? await n.updateAccountInfo(Y) : await n.createAccountInfo({ account: new Go(Y), faucetPackage: L });
    } catch (O) {
      b(O.message);
    } finally {
      u(!1);
    }
  };
  return Ke(() => {
    _ || !e || h || !n || (async () => {
      u(!0);
      try {
        C(await n.fetchAccountInfo(e)), v(!0);
      } catch (Y) {
        b(Y.message);
      } finally {
        u(!1);
      }
    })();
  }, [_, e, h, n]), Ke(() => {
    h || !r || v(!0);
  }, [r, h]), {
    ...t,
    organization: _,
    error: S,
    loading: i,
    loaded: h,
    update: R
  };
}, rl = da(void 0), ga = () => {
  const e = ua(rl);
  if (!e)
    throw new Error(
      "useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?"
    );
  return e;
}, tl = ({ children: e, ...r }) => {
  const t = lf(r);
  return /* @__PURE__ */ U(rl.Provider, { value: t, children: e }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Organization.tsx",
    lineNumber: 87,
    columnNumber: 10
  }, globalThis);
};
tl.displayName = "OrganizationProvider";
const cf = (e) => /* @__PURE__ */ U(tl, { ...e, children: /* @__PURE__ */ U(el, {}, void 0, !1, {
  fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Organization.tsx",
  lineNumber: 93,
  columnNumber: 5
}, globalThis) }, void 0, !1, {
  fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Organization.tsx",
  lineNumber: 92,
  columnNumber: 3
}, globalThis);
cf.displayName = "Election";
const N0 = (e) => {
  const r = ir("OrganizationAvatar", e), { organization: t } = ga();
  if (!t)
    return null;
  let n = t.metadata.media.avatar;
  return n || (n = t.metadata.media.logo), n ? /* @__PURE__ */ U(So, { src: n, sx: r, ...e }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Avatar.tsx",
    lineNumber: 18,
    columnNumber: 10
  }, globalThis) : null;
}, D0 = (e) => {
  const r = ir("OrganizationDescription", e), { organization: t } = ga();
  return !t || t && !t.metadata.description ? null : /* @__PURE__ */ U(fa, { ...e, sx: r, children: t.metadata.description.default }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Description.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, globalThis);
}, z0 = (e) => {
  const r = ir("OrganizationHeader", e), { organization: t } = ga();
  if (!t)
    return null;
  const { header: n } = t.metadata.media;
  return n ? /* @__PURE__ */ U(So, { src: n, sx: r, ...e }, void 0, !1, {
    fileName: "/Users/aleix/Sites/vocdoni/ui-components/packages/components/src/components/Organization/Header.tsx",
    lineNumber: 15,
    columnNumber: 10
  }, globalThis) : null;
};
var df = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
}, uf = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
}, ff = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
}, mf = {
  property: df,
  easing: uf,
  duration: ff
}, hf = mf, vf = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1e3,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
}, gf = vf, bf = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
}, pf = bf, yf = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
}, Sf = yf, xf = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
}, _f = xf, wf = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
}, kf = wf, Cf = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
}, Tf = Cf, Ef = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
}, $f = Ef, Rf = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
  },
  fontSizes: {
    "3xs": "0.45rem",
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
}, nl = Rf, al = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
}, Pf = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem",
  prose: "60ch"
}, Ff = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
}, Af = {
  ...al,
  ...Pf,
  container: Ff
}, ol = Af, Nf = {
  breakpoints: Sf,
  zIndices: gf,
  radii: kf,
  blur: $f,
  colors: _f,
  ...nl,
  sizes: ol,
  shadows: Tf,
  space: al,
  borders: pf,
  transition: hf
}, aa = {}, Df = {
  get exports() {
    return aa;
  },
  set exports(e) {
    aa = e;
  }
};
(function(e, r) {
  var t = 200, n = "__lodash_hash_undefined__", a = 800, o = 16, i = 9007199254740991, u = "[object Arguments]", h = "[object Array]", v = "[object AsyncFunction]", S = "[object Boolean]", b = "[object Date]", _ = "[object Error]", C = "[object Function]", R = "[object GeneratorFunction]", Y = "[object Map]", L = "[object Number]", O = "[object Null]", w = "[object Object]", q = "[object Proxy]", ie = "[object RegExp]", M = "[object Set]", Q = "[object String]", K = "[object Undefined]", re = "[object WeakMap]", fe = "[object ArrayBuffer]", Ee = "[object DataView]", me = "[object Float32Array]", J = "[object Float64Array]", I = "[object Int8Array]", Z = "[object Int16Array]", ee = "[object Int32Array]", se = "[object Uint8Array]", ye = "[object Uint8ClampedArray]", Ye = "[object Uint16Array]", Ve = "[object Uint32Array]", Me = /[\\^$.*+?()[\]{}|]/g, er = /^\[object .+?Constructor\]$/, rr = /^(?:0|[1-9]\d*)$/, le = {};
  le[me] = le[J] = le[I] = le[Z] = le[ee] = le[se] = le[ye] = le[Ye] = le[Ve] = !0, le[u] = le[h] = le[fe] = le[S] = le[Ee] = le[b] = le[_] = le[C] = le[Y] = le[L] = le[w] = le[ie] = le[M] = le[Q] = le[re] = !1;
  var ur = typeof Rn == "object" && Rn && Rn.Object === Object && Rn, br = typeof self == "object" && self && self.Object === Object && self, j = ur || br || Function("return this")(), ce = r && !r.nodeType && r, ae = ce && !0 && e && !e.nodeType && e, be = ae && ae.exports === ce, Pe = be && ur.process, te = function() {
    try {
      var s = ae && ae.require && ae.require("util").types;
      return s || Pe && Pe.binding && Pe.binding("util");
    } catch {
    }
  }(), $e = te && te.isTypedArray;
  function pr(s, f, g) {
    switch (g.length) {
      case 0:
        return s.call(f);
      case 1:
        return s.call(f, g[0]);
      case 2:
        return s.call(f, g[0], g[1]);
      case 3:
        return s.call(f, g[0], g[1], g[2]);
    }
    return s.apply(f, g);
  }
  function kt(s, f) {
    for (var g = -1, B = Array(s); ++g < s; )
      B[g] = f(g);
    return B;
  }
  function yr(s) {
    return function(f) {
      return s(f);
    };
  }
  function d(s, f) {
    return s == null ? void 0 : s[f];
  }
  function p(s, f) {
    return function(g) {
      return s(f(g));
    };
  }
  var x = Array.prototype, A = Function.prototype, F = Object.prototype, E = j["__core-js_shared__"], W = A.toString, de = F.hasOwnProperty, Te = function() {
    var s = /[^.]+$/.exec(E && E.keys && E.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), tr = F.toString, jr = W.call(Object), Ge = RegExp(
    "^" + W.call(de).replace(Me, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Sr = be ? j.Buffer : void 0, Fr = j.Symbol, Tr = j.Uint8Array, xr = Sr ? Sr.allocUnsafe : void 0, Vr = p(Object.getPrototypeOf, Object), Ct = Object.create, Lt = F.propertyIsEnumerable, jt = x.splice, Er = Fr ? Fr.toStringTag : void 0, et = function() {
    try {
      var s = xa(Object, "defineProperty");
      return s({}, "", {}), s;
    } catch {
    }
  }(), Vt = Sr ? Sr.isBuffer : void 0, Ar = Math.max, ct = Date.now, Je = xa(j, "Map"), fr = xa(Object, "create"), Ur = function() {
    function s() {
    }
    return function(f) {
      if (!mt(f))
        return {};
      if (Ct)
        return Ct(f);
      s.prototype = f;
      var g = new s();
      return s.prototype = void 0, g;
    };
  }();
  function mr(s) {
    var f = -1, g = s == null ? 0 : s.length;
    for (this.clear(); ++f < g; ) {
      var B = s[f];
      this.set(B[0], B[1]);
    }
  }
  function Ut() {
    this.__data__ = fr ? fr(null) : {}, this.size = 0;
  }
  function dt(s) {
    var f = this.has(s) && delete this.__data__[s];
    return this.size -= f ? 1 : 0, f;
  }
  function Ht(s) {
    var f = this.__data__;
    if (fr) {
      var g = f[s];
      return g === n ? void 0 : g;
    }
    return de.call(f, s) ? f[s] : void 0;
  }
  function ut(s) {
    var f = this.__data__;
    return fr ? f[s] !== void 0 : de.call(f, s);
  }
  function ft(s, f) {
    var g = this.__data__;
    return this.size += this.has(s) ? 0 : 1, g[s] = fr && f === void 0 ? n : f, this;
  }
  mr.prototype.clear = Ut, mr.prototype.delete = dt, mr.prototype.get = Ht, mr.prototype.has = ut, mr.prototype.set = ft;
  function hr(s) {
    var f = -1, g = s == null ? 0 : s.length;
    for (this.clear(); ++f < g; ) {
      var B = s[f];
      this.set(B[0], B[1]);
    }
  }
  function Yt() {
    this.__data__ = [], this.size = 0;
  }
  function Tt(s) {
    var f = this.__data__, g = cr(f, s);
    if (g < 0)
      return !1;
    var B = f.length - 1;
    return g == B ? f.pop() : jt.call(f, g, 1), --this.size, !0;
  }
  function qt(s) {
    var f = this.__data__, g = cr(f, s);
    return g < 0 ? void 0 : f[g][1];
  }
  function c(s) {
    return cr(this.__data__, s) > -1;
  }
  function T(s, f) {
    var g = this.__data__, B = cr(g, s);
    return B < 0 ? (++this.size, g.push([s, f])) : g[B][1] = f, this;
  }
  hr.prototype.clear = Yt, hr.prototype.delete = Tt, hr.prototype.get = qt, hr.prototype.has = c, hr.prototype.set = T;
  function P(s) {
    var f = -1, g = s == null ? 0 : s.length;
    for (this.clear(); ++f < g; ) {
      var B = s[f];
      this.set(B[0], B[1]);
    }
  }
  function l() {
    this.size = 0, this.__data__ = {
      hash: new mr(),
      map: new (Je || hr)(),
      string: new mr()
    };
  }
  function y(s) {
    var f = En(this, s).delete(s);
    return this.size -= f ? 1 : 0, f;
  }
  function k(s) {
    return En(this, s).get(s);
  }
  function $(s) {
    return En(this, s).has(s);
  }
  function D(s, f) {
    var g = En(this, s), B = g.size;
    return g.set(s, f), this.size += g.size == B ? 0 : 1, this;
  }
  P.prototype.clear = l, P.prototype.delete = y, P.prototype.get = k, P.prototype.has = $, P.prototype.set = D;
  function X(s) {
    var f = this.__data__ = new hr(s);
    this.size = f.size;
  }
  function H() {
    this.__data__ = new hr(), this.size = 0;
  }
  function V(s) {
    var f = this.__data__, g = f.delete(s);
    return this.size = f.size, g;
  }
  function _e(s) {
    return this.__data__.get(s);
  }
  function we(s) {
    return this.__data__.has(s);
  }
  function Ne(s, f) {
    var g = this.__data__;
    if (g instanceof hr) {
      var B = g.__data__;
      if (!Je || B.length < t - 1)
        return B.push([s, f]), this.size = ++g.size, this;
      g = this.__data__ = new P(B);
    }
    return g.set(s, f), this.size = g.size, this;
  }
  X.prototype.clear = H, X.prototype.delete = V, X.prototype.get = _e, X.prototype.has = we, X.prototype.set = Ne;
  function ze(s, f) {
    var g = ka(s), B = !g && wa(s), he = !g && !B && Wo(s), Re = !g && !B && !he && jo(s), Oe = g || B || he || Re, ue = Oe ? kt(s.length, String) : [], Ie = ue.length;
    for (var _r in s)
      (f || de.call(s, _r)) && !(Oe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (_r == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      he && (_r == "offset" || _r == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Re && (_r == "buffer" || _r == "byteLength" || _r == "byteOffset") || // Skip index properties.
      Bo(_r, Ie))) && ue.push(_r);
    return ue;
  }
  function Nr(s, f, g) {
    (g !== void 0 && !$n(s[f], g) || g === void 0 && !(f in s)) && Sa(s, f, g);
  }
  function Cn(s, f, g) {
    var B = s[f];
    (!(de.call(s, f) && $n(B, g)) || g === void 0 && !(f in s)) && Sa(s, f, g);
  }
  function cr(s, f) {
    for (var g = s.length; g--; )
      if ($n(s[g][0], f))
        return g;
    return -1;
  }
  function Sa(s, f, g) {
    f == "__proto__" && et ? et(s, f, {
      configurable: !0,
      enumerable: !0,
      value: g,
      writable: !0
    }) : s[f] = g;
  }
  var _l = zl();
  function Tn(s) {
    return s == null ? s === void 0 ? K : O : Er && Er in Object(s) ? Ol(s) : jl(s);
  }
  function Oo(s) {
    return Gt(s) && Tn(s) == u;
  }
  function wl(s) {
    if (!mt(s) || Wl(s))
      return !1;
    var f = Ta(s) ? Ge : er;
    return f.test(Yl(s));
  }
  function kl(s) {
    return Gt(s) && Lo(s.length) && !!le[Tn(s)];
  }
  function Cl(s) {
    if (!mt(s))
      return Ll(s);
    var f = Mo(s), g = [];
    for (var B in s)
      B == "constructor" && (f || !de.call(s, B)) || g.push(B);
    return g;
  }
  function Io(s, f, g, B, he) {
    s !== f && _l(f, function(Re, Oe) {
      if (he || (he = new X()), mt(Re))
        Tl(s, f, Oe, g, Io, B, he);
      else {
        var ue = B ? B(_a(s, Oe), Re, Oe + "", s, f, he) : void 0;
        ue === void 0 && (ue = Re), Nr(s, Oe, ue);
      }
    }, Vo);
  }
  function Tl(s, f, g, B, he, Re, Oe) {
    var ue = _a(s, g), Ie = _a(f, g), _r = Oe.get(Ie);
    if (_r) {
      Nr(s, g, _r);
      return;
    }
    var vr = Re ? Re(ue, Ie, g + "", s, f, Oe) : void 0, Xt = vr === void 0;
    if (Xt) {
      var Ea = ka(Ie), $a = !Ea && Wo(Ie), Ho = !Ea && !$a && jo(Ie);
      vr = Ie, Ea || $a || Ho ? ka(ue) ? vr = ue : ql(ue) ? vr = Al(ue) : $a ? (Xt = !1, vr = Rl(Ie, !0)) : Ho ? (Xt = !1, vr = Fl(Ie, !0)) : vr = [] : Gl(Ie) || wa(Ie) ? (vr = ue, wa(ue) ? vr = Xl(ue) : (!mt(ue) || Ta(ue)) && (vr = Il(Ie))) : Xt = !1;
    }
    Xt && (Oe.set(Ie, vr), he(vr, Ie, B, Re, Oe), Oe.delete(Ie)), Nr(s, g, vr);
  }
  function El(s, f) {
    return Ul(Vl(s, f, Uo), s + "");
  }
  var $l = et ? function(s, f) {
    return et(s, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Kl(f),
      writable: !0
    });
  } : Uo;
  function Rl(s, f) {
    if (f)
      return s.slice();
    var g = s.length, B = xr ? xr(g) : new s.constructor(g);
    return s.copy(B), B;
  }
  function Pl(s) {
    var f = new s.constructor(s.byteLength);
    return new Tr(f).set(new Tr(s)), f;
  }
  function Fl(s, f) {
    var g = f ? Pl(s.buffer) : s.buffer;
    return new s.constructor(g, s.byteOffset, s.length);
  }
  function Al(s, f) {
    var g = -1, B = s.length;
    for (f || (f = Array(B)); ++g < B; )
      f[g] = s[g];
    return f;
  }
  function Nl(s, f, g, B) {
    var he = !g;
    g || (g = {});
    for (var Re = -1, Oe = f.length; ++Re < Oe; ) {
      var ue = f[Re], Ie = B ? B(g[ue], s[ue], ue, g, s) : void 0;
      Ie === void 0 && (Ie = s[ue]), he ? Sa(g, ue, Ie) : Cn(g, ue, Ie);
    }
    return g;
  }
  function Dl(s) {
    return El(function(f, g) {
      var B = -1, he = g.length, Re = he > 1 ? g[he - 1] : void 0, Oe = he > 2 ? g[2] : void 0;
      for (Re = s.length > 3 && typeof Re == "function" ? (he--, Re) : void 0, Oe && Bl(g[0], g[1], Oe) && (Re = he < 3 ? void 0 : Re, he = 1), f = Object(f); ++B < he; ) {
        var ue = g[B];
        ue && s(f, ue, B, Re);
      }
      return f;
    });
  }
  function zl(s) {
    return function(f, g, B) {
      for (var he = -1, Re = Object(f), Oe = B(f), ue = Oe.length; ue--; ) {
        var Ie = Oe[s ? ue : ++he];
        if (g(Re[Ie], Ie, Re) === !1)
          break;
      }
      return f;
    };
  }
  function En(s, f) {
    var g = s.__data__;
    return Ml(f) ? g[typeof f == "string" ? "string" : "hash"] : g.map;
  }
  function xa(s, f) {
    var g = d(s, f);
    return wl(g) ? g : void 0;
  }
  function Ol(s) {
    var f = de.call(s, Er), g = s[Er];
    try {
      s[Er] = void 0;
      var B = !0;
    } catch {
    }
    var he = tr.call(s);
    return B && (f ? s[Er] = g : delete s[Er]), he;
  }
  function Il(s) {
    return typeof s.constructor == "function" && !Mo(s) ? Ur(Vr(s)) : {};
  }
  function Bo(s, f) {
    var g = typeof s;
    return f = f ?? i, !!f && (g == "number" || g != "symbol" && rr.test(s)) && s > -1 && s % 1 == 0 && s < f;
  }
  function Bl(s, f, g) {
    if (!mt(g))
      return !1;
    var B = typeof f;
    return (B == "number" ? Ca(g) && Bo(f, g.length) : B == "string" && f in g) ? $n(g[f], s) : !1;
  }
  function Ml(s) {
    var f = typeof s;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? s !== "__proto__" : s === null;
  }
  function Wl(s) {
    return !!Te && Te in s;
  }
  function Mo(s) {
    var f = s && s.constructor, g = typeof f == "function" && f.prototype || F;
    return s === g;
  }
  function Ll(s) {
    var f = [];
    if (s != null)
      for (var g in Object(s))
        f.push(g);
    return f;
  }
  function jl(s) {
    return tr.call(s);
  }
  function Vl(s, f, g) {
    return f = Ar(f === void 0 ? s.length - 1 : f, 0), function() {
      for (var B = arguments, he = -1, Re = Ar(B.length - f, 0), Oe = Array(Re); ++he < Re; )
        Oe[he] = B[f + he];
      he = -1;
      for (var ue = Array(f + 1); ++he < f; )
        ue[he] = B[he];
      return ue[f] = g(Oe), pr(s, this, ue);
    };
  }
  function _a(s, f) {
    if (!(f === "constructor" && typeof s[f] == "function") && f != "__proto__")
      return s[f];
  }
  var Ul = Hl($l);
  function Hl(s) {
    var f = 0, g = 0;
    return function() {
      var B = ct(), he = o - (B - g);
      if (g = B, he > 0) {
        if (++f >= a)
          return arguments[0];
      } else
        f = 0;
      return s.apply(void 0, arguments);
    };
  }
  function Yl(s) {
    if (s != null) {
      try {
        return W.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function $n(s, f) {
    return s === f || s !== s && f !== f;
  }
  var wa = Oo(function() {
    return arguments;
  }()) ? Oo : function(s) {
    return Gt(s) && de.call(s, "callee") && !Lt.call(s, "callee");
  }, ka = Array.isArray;
  function Ca(s) {
    return s != null && Lo(s.length) && !Ta(s);
  }
  function ql(s) {
    return Gt(s) && Ca(s);
  }
  var Wo = Vt || Jl;
  function Ta(s) {
    if (!mt(s))
      return !1;
    var f = Tn(s);
    return f == C || f == R || f == v || f == q;
  }
  function Lo(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= i;
  }
  function mt(s) {
    var f = typeof s;
    return s != null && (f == "object" || f == "function");
  }
  function Gt(s) {
    return s != null && typeof s == "object";
  }
  function Gl(s) {
    if (!Gt(s) || Tn(s) != w)
      return !1;
    var f = Vr(s);
    if (f === null)
      return !0;
    var g = de.call(f, "constructor") && f.constructor;
    return typeof g == "function" && g instanceof g && W.call(g) == jr;
  }
  var jo = $e ? yr($e) : kl;
  function Xl(s) {
    return Nl(s, Vo(s));
  }
  function Vo(s) {
    return Ca(s) ? ze(s, !0) : Cl(s);
  }
  var Ql = Dl(function(s, f, g, B) {
    Io(s, f, g, B);
  });
  function Kl(s) {
    return function() {
      return s;
    };
  }
  function Uo(s) {
    return s;
  }
  function Jl() {
    return !1;
  }
  e.exports = Ql;
})(Df, aa);
const zf = aa;
var Of = (e) => /!(important)?$/.test(e), pi = (e) => typeof e == "string" ? e.replace(/!(important)?$/, "").trim() : e, If = (e, r) => (t) => {
  const n = String(r), a = Of(n), o = pi(n), i = e ? `${e}.${o}` : o;
  let u = Mt(t.__cssMap) && i in t.__cssMap ? t.__cssMap[i].varRef : r;
  return u = pi(u), a ? `${u} !important` : u;
};
function Po(e) {
  const { scale: r, transform: t, compose: n } = e;
  return (o, i) => {
    var u;
    const h = If(r, o)(i);
    let v = (u = t == null ? void 0 : t(h, i)) != null ? u : h;
    return n && (v = n(v, i)), v;
  };
}
var An = (...e) => (r) => e.reduce((t, n) => n(t), r);
function wr(e, r) {
  return (t) => {
    const n = { property: t, scale: e };
    return n.transform = Po({
      scale: e,
      transform: r
    }), n;
  };
}
var Bf = ({ rtl: e, ltr: r }) => (t) => t.direction === "rtl" ? e : r;
function Mf(e) {
  const { property: r, scale: t, transform: n } = e;
  return {
    scale: t,
    property: Bf(r),
    transform: t ? Po({
      scale: t,
      compose: n
    }) : n
  };
}
var il = [
  "rotate(var(--chakra-rotate, 0))",
  "scaleX(var(--chakra-scale-x, 1))",
  "scaleY(var(--chakra-scale-y, 1))",
  "skewX(var(--chakra-skew-x, 0))",
  "skewY(var(--chakra-skew-y, 0))"
];
function Wf() {
  return [
    "translateX(var(--chakra-translate-x, 0))",
    "translateY(var(--chakra-translate-y, 0))",
    ...il
  ].join(" ");
}
function Lf() {
  return [
    "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)",
    ...il
  ].join(" ");
}
var jf = {
  "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
  filter: [
    "var(--chakra-blur)",
    "var(--chakra-brightness)",
    "var(--chakra-contrast)",
    "var(--chakra-grayscale)",
    "var(--chakra-hue-rotate)",
    "var(--chakra-invert)",
    "var(--chakra-saturate)",
    "var(--chakra-sepia)",
    "var(--chakra-drop-shadow)"
  ].join(" ")
}, Vf = {
  backdropFilter: [
    "var(--chakra-backdrop-blur)",
    "var(--chakra-backdrop-brightness)",
    "var(--chakra-backdrop-contrast)",
    "var(--chakra-backdrop-grayscale)",
    "var(--chakra-backdrop-hue-rotate)",
    "var(--chakra-backdrop-invert)",
    "var(--chakra-backdrop-opacity)",
    "var(--chakra-backdrop-saturate)",
    "var(--chakra-backdrop-sepia)"
  ].join(" "),
  "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
};
function Uf(e) {
  return {
    "--chakra-ring-offset-shadow": "var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)",
    "--chakra-ring-shadow": "var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)",
    "--chakra-ring-width": e,
    boxShadow: [
      "var(--chakra-ring-offset-shadow)",
      "var(--chakra-ring-shadow)",
      "var(--chakra-shadow, 0 0 #0000)"
    ].join(", ")
  };
}
var Hf = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse"
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse"
  }
}, so = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left"
}, Yf = new Set(Object.values(so)), lo = /* @__PURE__ */ new Set([
  "none",
  "-moz-initial",
  "inherit",
  "initial",
  "revert",
  "unset"
]), qf = (e) => e.trim();
function Gf(e, r) {
  if (e == null || lo.has(e))
    return e;
  if (!(co(e) || lo.has(e)))
    return `url('${e}')`;
  const a = /(^[a-z-A-Z]+)\((.*)\)/g.exec(e), o = a == null ? void 0 : a[1], i = a == null ? void 0 : a[2];
  if (!o || !i)
    return e;
  const u = o.includes("-gradient") ? o : `${o}-gradient`, [h, ...v] = i.split(",").map(qf).filter(Boolean);
  if ((v == null ? void 0 : v.length) === 0)
    return e;
  const S = h in so ? so[h] : h;
  v.unshift(S);
  const b = v.map((_) => {
    if (Yf.has(_))
      return _;
    const C = _.indexOf(" "), [R, Y] = C !== -1 ? [_.substr(0, C), _.substr(C + 1)] : [_], L = co(Y) ? Y : Y && Y.split(" "), O = `colors.${R}`, w = O in r.__cssMap ? r.__cssMap[O].varRef : R;
    return L ? [
      w,
      ...Array.isArray(L) ? L : [L]
    ].join(" ") : w;
  });
  return `${u}(${b.join(", ")})`;
}
var co = (e) => typeof e == "string" && e.includes("(") && e.includes(")"), Xf = (e, r) => Gf(e, r ?? {});
function Qf(e) {
  return /^var\(--.+\)$/.test(e);
}
var Kf = (e) => {
  const r = parseFloat(e.toString()), t = e.toString().replace(String(r), "");
  return { unitless: !t, value: r, unit: t };
}, zr = (e) => (r) => `${e}(${r})`, pe = {
  filter(e) {
    return e !== "auto" ? e : jf;
  },
  backdropFilter(e) {
    return e !== "auto" ? e : Vf;
  },
  ring(e) {
    return Uf(pe.px(e));
  },
  bgClip(e) {
    return e === "text" ? { color: "transparent", backgroundClip: "text" } : { backgroundClip: e };
  },
  transform(e) {
    return e === "auto" ? Wf() : e === "auto-gpu" ? Lf() : e;
  },
  vh(e) {
    return e === "$100vh" ? "var(--chakra-vh)" : e;
  },
  px(e) {
    if (e == null)
      return e;
    const { unitless: r } = Kf(e);
    return r || typeof e == "number" ? `${e}px` : e;
  },
  fraction(e) {
    return typeof e != "number" || e > 1 ? e : `${e * 100}%`;
  },
  float(e, r) {
    const t = { left: "right", right: "left" };
    return r.direction === "rtl" ? t[e] : e;
  },
  degree(e) {
    if (Qf(e) || e == null)
      return e;
    const r = typeof e == "string" && !e.endsWith("deg");
    return typeof e == "number" || r ? `${e}deg` : e;
  },
  gradient: Xf,
  blur: zr("blur"),
  opacity: zr("opacity"),
  brightness: zr("brightness"),
  contrast: zr("contrast"),
  dropShadow: zr("drop-shadow"),
  grayscale: zr("grayscale"),
  hueRotate: zr("hue-rotate"),
  invert: zr("invert"),
  saturate: zr("saturate"),
  sepia: zr("sepia"),
  bgImage(e) {
    return e == null || co(e) || lo.has(e) ? e : `url(${e})`;
  },
  outline(e) {
    const r = String(e) === "0" || String(e) === "none";
    return e !== null && r ? { outline: "2px solid transparent", outlineOffset: "2px" } : { outline: e };
  },
  flexDirection(e) {
    var r;
    const { space: t, divide: n } = (r = Hf[e]) != null ? r : {}, a = { flexDirection: e };
    return t && (a[t] = 1), n && (a[n] = 1), a;
  }
}, m = {
  borderWidths: wr("borderWidths"),
  borderStyles: wr("borderStyles"),
  colors: wr("colors"),
  borders: wr("borders"),
  gradients: wr("gradients", pe.gradient),
  radii: wr("radii", pe.px),
  space: wr("space", An(pe.vh, pe.px)),
  spaceT: wr("space", An(pe.vh, pe.px)),
  degreeT(e) {
    return { property: e, transform: pe.degree };
  },
  prop(e, r, t) {
    return {
      property: e,
      scale: r,
      ...r && {
        transform: Po({ scale: r, transform: t })
      }
    };
  },
  propT(e, r) {
    return { property: e, transform: r };
  },
  sizes: wr("sizes", An(pe.vh, pe.px)),
  sizesT: wr("sizes", An(pe.vh, pe.fraction)),
  shadows: wr("shadows"),
  logical: Mf,
  blur: wr("blur", pe.blur)
}, Hn = {
  background: m.colors("background"),
  backgroundColor: m.colors("backgroundColor"),
  backgroundImage: m.gradients("backgroundImage"),
  backgroundSize: !0,
  backgroundPosition: !0,
  backgroundRepeat: !0,
  backgroundAttachment: !0,
  backgroundClip: { transform: pe.bgClip },
  bgSize: m.prop("backgroundSize"),
  bgPosition: m.prop("backgroundPosition"),
  bg: m.colors("background"),
  bgColor: m.colors("backgroundColor"),
  bgPos: m.prop("backgroundPosition"),
  bgRepeat: m.prop("backgroundRepeat"),
  bgAttachment: m.prop("backgroundAttachment"),
  bgGradient: m.gradients("backgroundImage"),
  bgClip: { transform: pe.bgClip }
};
Object.assign(Hn, {
  bgImage: Hn.backgroundImage,
  bgImg: Hn.backgroundImage
});
var Se = {
  border: m.borders("border"),
  borderWidth: m.borderWidths("borderWidth"),
  borderStyle: m.borderStyles("borderStyle"),
  borderColor: m.colors("borderColor"),
  borderRadius: m.radii("borderRadius"),
  borderTop: m.borders("borderTop"),
  borderBlockStart: m.borders("borderBlockStart"),
  borderTopLeftRadius: m.radii("borderTopLeftRadius"),
  borderStartStartRadius: m.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius"
    }
  }),
  borderEndStartRadius: m.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius"
    }
  }),
  borderTopRightRadius: m.radii("borderTopRightRadius"),
  borderStartEndRadius: m.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius"
    }
  }),
  borderEndEndRadius: m.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius"
    }
  }),
  borderRight: m.borders("borderRight"),
  borderInlineEnd: m.borders("borderInlineEnd"),
  borderBottom: m.borders("borderBottom"),
  borderBlockEnd: m.borders("borderBlockEnd"),
  borderBottomLeftRadius: m.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: m.radii("borderBottomRightRadius"),
  borderLeft: m.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders"
  },
  borderInlineStartRadius: m.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
    }
  }),
  borderInlineEndRadius: m.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
    }
  }),
  borderX: m.borders(["borderLeft", "borderRight"]),
  borderInline: m.borders("borderInline"),
  borderY: m.borders(["borderTop", "borderBottom"]),
  borderBlock: m.borders("borderBlock"),
  borderTopWidth: m.borderWidths("borderTopWidth"),
  borderBlockStartWidth: m.borderWidths("borderBlockStartWidth"),
  borderTopColor: m.colors("borderTopColor"),
  borderBlockStartColor: m.colors("borderBlockStartColor"),
  borderTopStyle: m.borderStyles("borderTopStyle"),
  borderBlockStartStyle: m.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: m.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: m.borderWidths("borderBlockEndWidth"),
  borderBottomColor: m.colors("borderBottomColor"),
  borderBlockEndColor: m.colors("borderBlockEndColor"),
  borderBottomStyle: m.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: m.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: m.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: m.borderWidths("borderInlineStartWidth"),
  borderLeftColor: m.colors("borderLeftColor"),
  borderInlineStartColor: m.colors("borderInlineStartColor"),
  borderLeftStyle: m.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: m.borderStyles("borderInlineStartStyle"),
  borderRightWidth: m.borderWidths("borderRightWidth"),
  borderInlineEndWidth: m.borderWidths("borderInlineEndWidth"),
  borderRightColor: m.colors("borderRightColor"),
  borderInlineEndColor: m.colors("borderInlineEndColor"),
  borderRightStyle: m.borderStyles("borderRightStyle"),
  borderInlineEndStyle: m.borderStyles("borderInlineEndStyle"),
  borderTopRadius: m.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: m.radii([
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ]),
  borderLeftRadius: m.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: m.radii([
    "borderTopRightRadius",
    "borderBottomRightRadius"
  ])
};
Object.assign(Se, {
  rounded: Se.borderRadius,
  roundedTop: Se.borderTopRadius,
  roundedTopLeft: Se.borderTopLeftRadius,
  roundedTopRight: Se.borderTopRightRadius,
  roundedTopStart: Se.borderStartStartRadius,
  roundedTopEnd: Se.borderStartEndRadius,
  roundedBottom: Se.borderBottomRadius,
  roundedBottomLeft: Se.borderBottomLeftRadius,
  roundedBottomRight: Se.borderBottomRightRadius,
  roundedBottomStart: Se.borderEndStartRadius,
  roundedBottomEnd: Se.borderEndEndRadius,
  roundedLeft: Se.borderLeftRadius,
  roundedRight: Se.borderRightRadius,
  roundedStart: Se.borderInlineStartRadius,
  roundedEnd: Se.borderInlineEndRadius,
  borderStart: Se.borderInlineStart,
  borderEnd: Se.borderInlineEnd,
  borderTopStartRadius: Se.borderStartStartRadius,
  borderTopEndRadius: Se.borderStartEndRadius,
  borderBottomStartRadius: Se.borderEndStartRadius,
  borderBottomEndRadius: Se.borderEndEndRadius,
  borderStartRadius: Se.borderInlineStartRadius,
  borderEndRadius: Se.borderInlineEndRadius,
  borderStartWidth: Se.borderInlineStartWidth,
  borderEndWidth: Se.borderInlineEndWidth,
  borderStartColor: Se.borderInlineStartColor,
  borderEndColor: Se.borderInlineEndColor,
  borderStartStyle: Se.borderInlineStartStyle,
  borderEndStyle: Se.borderInlineEndStyle
});
var Jf = {
  color: m.colors("color"),
  textColor: m.colors("color"),
  fill: m.colors("fill"),
  stroke: m.colors("stroke")
}, uo = {
  boxShadow: m.shadows("boxShadow"),
  mixBlendMode: !0,
  blendMode: m.prop("mixBlendMode"),
  backgroundBlendMode: !0,
  bgBlendMode: m.prop("backgroundBlendMode"),
  opacity: !0
};
Object.assign(uo, {
  shadow: uo.boxShadow
});
var Zf = {
  filter: { transform: pe.filter },
  blur: m.blur("--chakra-blur"),
  brightness: m.propT("--chakra-brightness", pe.brightness),
  contrast: m.propT("--chakra-contrast", pe.contrast),
  hueRotate: m.degreeT("--chakra-hue-rotate"),
  invert: m.propT("--chakra-invert", pe.invert),
  saturate: m.propT("--chakra-saturate", pe.saturate),
  dropShadow: m.propT("--chakra-drop-shadow", pe.dropShadow),
  backdropFilter: { transform: pe.backdropFilter },
  backdropBlur: m.blur("--chakra-backdrop-blur"),
  backdropBrightness: m.propT(
    "--chakra-backdrop-brightness",
    pe.brightness
  ),
  backdropContrast: m.propT("--chakra-backdrop-contrast", pe.contrast),
  backdropHueRotate: m.degreeT("--chakra-backdrop-hue-rotate"),
  backdropInvert: m.propT("--chakra-backdrop-invert", pe.invert),
  backdropSaturate: m.propT("--chakra-backdrop-saturate", pe.saturate)
}, oa = {
  alignItems: !0,
  alignContent: !0,
  justifyItems: !0,
  justifyContent: !0,
  flexWrap: !0,
  flexDirection: { transform: pe.flexDirection },
  flex: !0,
  flexFlow: !0,
  flexGrow: !0,
  flexShrink: !0,
  flexBasis: m.sizes("flexBasis"),
  justifySelf: !0,
  alignSelf: !0,
  order: !0,
  placeItems: !0,
  placeContent: !0,
  placeSelf: !0,
  gap: m.space("gap"),
  rowGap: m.space("rowGap"),
  columnGap: m.space("columnGap")
};
Object.assign(oa, {
  flexDir: oa.flexDirection
});
var sl = {
  gridGap: m.space("gridGap"),
  gridColumnGap: m.space("gridColumnGap"),
  gridRowGap: m.space("gridRowGap"),
  gridColumn: !0,
  gridRow: !0,
  gridAutoFlow: !0,
  gridAutoColumns: !0,
  gridColumnStart: !0,
  gridColumnEnd: !0,
  gridRowStart: !0,
  gridRowEnd: !0,
  gridAutoRows: !0,
  gridTemplate: !0,
  gridTemplateColumns: !0,
  gridTemplateRows: !0,
  gridTemplateAreas: !0,
  gridArea: !0
}, em = {
  appearance: !0,
  cursor: !0,
  resize: !0,
  userSelect: !0,
  pointerEvents: !0,
  outline: { transform: pe.outline },
  outlineOffset: !0,
  outlineColor: m.colors("outlineColor")
}, kr = {
  width: m.sizesT("width"),
  inlineSize: m.sizesT("inlineSize"),
  height: m.sizes("height"),
  blockSize: m.sizes("blockSize"),
  boxSize: m.sizes(["width", "height"]),
  minWidth: m.sizes("minWidth"),
  minInlineSize: m.sizes("minInlineSize"),
  minHeight: m.sizes("minHeight"),
  minBlockSize: m.sizes("minBlockSize"),
  maxWidth: m.sizes("maxWidth"),
  maxInlineSize: m.sizes("maxInlineSize"),
  maxHeight: m.sizes("maxHeight"),
  maxBlockSize: m.sizes("maxBlockSize"),
  overflow: !0,
  overflowX: !0,
  overflowY: !0,
  overscrollBehavior: !0,
  overscrollBehaviorX: !0,
  overscrollBehaviorY: !0,
  display: !0,
  hideFrom: {
    scale: "breakpoints",
    transform: (e, r) => {
      var t, n, a;
      return { [`@media screen and (min-width: ${(a = (n = (t = r.__breakpoints) == null ? void 0 : t.get(e)) == null ? void 0 : n.minW) != null ? a : e})`]: { display: "none" } };
    }
  },
  hideBelow: {
    scale: "breakpoints",
    transform: (e, r) => {
      var t, n, a;
      return { [`@media screen and (max-width: ${(a = (n = (t = r.__breakpoints) == null ? void 0 : t.get(e)) == null ? void 0 : n._minW) != null ? a : e})`]: { display: "none" } };
    }
  },
  verticalAlign: !0,
  boxSizing: !0,
  boxDecorationBreak: !0,
  float: m.propT("float", pe.float),
  objectFit: !0,
  objectPosition: !0,
  visibility: !0,
  isolation: !0
};
Object.assign(kr, {
  w: kr.width,
  h: kr.height,
  minW: kr.minWidth,
  maxW: kr.maxWidth,
  minH: kr.minHeight,
  maxH: kr.maxHeight,
  overscroll: kr.overscrollBehavior,
  overscrollX: kr.overscrollBehaviorX,
  overscrollY: kr.overscrollBehaviorY
});
var rm = {
  listStyleType: !0,
  listStylePosition: !0,
  listStylePos: m.prop("listStylePosition"),
  listStyleImage: !0,
  listStyleImg: m.prop("listStyleImage")
};
function tm(e, r, t, n) {
  const a = typeof r == "string" ? r.split(".") : [r];
  for (n = 0; n < a.length && e; n += 1)
    e = e[a[n]];
  return e === void 0 ? t : e;
}
var nm = (e) => {
  const r = /* @__PURE__ */ new WeakMap();
  return (n, a, o, i) => {
    if (typeof n > "u")
      return e(n, a, o);
    r.has(n) || r.set(n, /* @__PURE__ */ new Map());
    const u = r.get(n);
    if (u.has(a))
      return u.get(a);
    const h = e(n, a, o, i);
    return u.set(a, h), h;
  };
}, am = nm(tm), om = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
}, im = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal"
}, za = (e, r, t) => {
  const n = {}, a = am(e, r, {});
  for (const o in a)
    o in t && t[o] != null || (n[o] = a[o]);
  return n;
}, sm = {
  srOnly: {
    transform(e) {
      return e === !0 ? om : e === "focusable" ? im : {};
    }
  },
  layerStyle: {
    processResult: !0,
    transform: (e, r, t) => za(r, `layerStyles.${e}`, t)
  },
  textStyle: {
    processResult: !0,
    transform: (e, r, t) => za(r, `textStyles.${e}`, t)
  },
  apply: {
    processResult: !0,
    transform: (e, r, t) => za(r, e, t)
  }
}, un = {
  position: !0,
  pos: m.prop("position"),
  zIndex: m.prop("zIndex", "zIndices"),
  inset: m.spaceT("inset"),
  insetX: m.spaceT(["left", "right"]),
  insetInline: m.spaceT("insetInline"),
  insetY: m.spaceT(["top", "bottom"]),
  insetBlock: m.spaceT("insetBlock"),
  top: m.spaceT("top"),
  insetBlockStart: m.spaceT("insetBlockStart"),
  bottom: m.spaceT("bottom"),
  insetBlockEnd: m.spaceT("insetBlockEnd"),
  left: m.spaceT("left"),
  insetInlineStart: m.logical({
    scale: "space",
    property: { ltr: "left", rtl: "right" }
  }),
  right: m.spaceT("right"),
  insetInlineEnd: m.logical({
    scale: "space",
    property: { ltr: "right", rtl: "left" }
  })
};
Object.assign(un, {
  insetStart: un.insetInlineStart,
  insetEnd: un.insetInlineEnd
});
var lm = {
  ring: { transform: pe.ring },
  ringColor: m.colors("--chakra-ring-color"),
  ringOffset: m.prop("--chakra-ring-offset-width"),
  ringOffsetColor: m.colors("--chakra-ring-offset-color"),
  ringInset: m.prop("--chakra-ring-inset")
}, De = {
  margin: m.spaceT("margin"),
  marginTop: m.spaceT("marginTop"),
  marginBlockStart: m.spaceT("marginBlockStart"),
  marginRight: m.spaceT("marginRight"),
  marginInlineEnd: m.spaceT("marginInlineEnd"),
  marginBottom: m.spaceT("marginBottom"),
  marginBlockEnd: m.spaceT("marginBlockEnd"),
  marginLeft: m.spaceT("marginLeft"),
  marginInlineStart: m.spaceT("marginInlineStart"),
  marginX: m.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: m.spaceT("marginInline"),
  marginY: m.spaceT(["marginTop", "marginBottom"]),
  marginBlock: m.spaceT("marginBlock"),
  padding: m.space("padding"),
  paddingTop: m.space("paddingTop"),
  paddingBlockStart: m.space("paddingBlockStart"),
  paddingRight: m.space("paddingRight"),
  paddingBottom: m.space("paddingBottom"),
  paddingBlockEnd: m.space("paddingBlockEnd"),
  paddingLeft: m.space("paddingLeft"),
  paddingInlineStart: m.space("paddingInlineStart"),
  paddingInlineEnd: m.space("paddingInlineEnd"),
  paddingX: m.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: m.space("paddingInline"),
  paddingY: m.space(["paddingTop", "paddingBottom"]),
  paddingBlock: m.space("paddingBlock")
};
Object.assign(De, {
  m: De.margin,
  mt: De.marginTop,
  mr: De.marginRight,
  me: De.marginInlineEnd,
  marginEnd: De.marginInlineEnd,
  mb: De.marginBottom,
  ml: De.marginLeft,
  ms: De.marginInlineStart,
  marginStart: De.marginInlineStart,
  mx: De.marginX,
  my: De.marginY,
  p: De.padding,
  pt: De.paddingTop,
  py: De.paddingY,
  px: De.paddingX,
  pb: De.paddingBottom,
  pl: De.paddingLeft,
  ps: De.paddingInlineStart,
  paddingStart: De.paddingInlineStart,
  pr: De.paddingRight,
  pe: De.paddingInlineEnd,
  paddingEnd: De.paddingInlineEnd
});
var cm = {
  textDecorationColor: m.colors("textDecorationColor"),
  textDecoration: !0,
  textDecor: { property: "textDecoration" },
  textDecorationLine: !0,
  textDecorationStyle: !0,
  textDecorationThickness: !0,
  textUnderlineOffset: !0,
  textShadow: m.shadows("textShadow")
}, dm = {
  clipPath: !0,
  transform: m.propT("transform", pe.transform),
  transformOrigin: !0,
  translateX: m.spaceT("--chakra-translate-x"),
  translateY: m.spaceT("--chakra-translate-y"),
  skewX: m.degreeT("--chakra-skew-x"),
  skewY: m.degreeT("--chakra-skew-y"),
  scaleX: m.prop("--chakra-scale-x"),
  scaleY: m.prop("--chakra-scale-y"),
  scale: m.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: m.degreeT("--chakra-rotate")
}, um = {
  transition: !0,
  transitionDelay: !0,
  animation: !0,
  willChange: !0,
  transitionDuration: m.prop("transitionDuration", "transition.duration"),
  transitionProperty: m.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: m.prop(
    "transitionTimingFunction",
    "transition.easing"
  )
}, fm = {
  fontFamily: m.prop("fontFamily", "fonts"),
  fontSize: m.prop("fontSize", "fontSizes", pe.px),
  fontWeight: m.prop("fontWeight", "fontWeights"),
  lineHeight: m.prop("lineHeight", "lineHeights"),
  letterSpacing: m.prop("letterSpacing", "letterSpacings"),
  textAlign: !0,
  fontStyle: !0,
  textIndent: !0,
  wordBreak: !0,
  overflowWrap: !0,
  textOverflow: !0,
  textTransform: !0,
  whiteSpace: !0,
  isTruncated: {
    transform(e) {
      if (e === !0)
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        };
    }
  },
  noOfLines: {
    static: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "var(--chakra-line-clamp)"
    },
    property: "--chakra-line-clamp"
  }
}, mm = {
  scrollBehavior: !0,
  scrollSnapAlign: !0,
  scrollSnapStop: !0,
  scrollSnapType: !0,
  scrollMargin: m.spaceT("scrollMargin"),
  scrollMarginTop: m.spaceT("scrollMarginTop"),
  scrollMarginBottom: m.spaceT("scrollMarginBottom"),
  scrollMarginLeft: m.spaceT("scrollMarginLeft"),
  scrollMarginRight: m.spaceT("scrollMarginRight"),
  scrollMarginX: m.spaceT(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: m.spaceT(["scrollMarginTop", "scrollMarginBottom"]),
  scrollPadding: m.spaceT("scrollPadding"),
  scrollPaddingTop: m.spaceT("scrollPaddingTop"),
  scrollPaddingBottom: m.spaceT("scrollPaddingBottom"),
  scrollPaddingLeft: m.spaceT("scrollPaddingLeft"),
  scrollPaddingRight: m.spaceT("scrollPaddingRight"),
  scrollPaddingX: m.spaceT(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: m.spaceT(["scrollPaddingTop", "scrollPaddingBottom"])
};
function ll(e) {
  return Mt(e) && e.reference ? e.reference : String(e);
}
var ba = (e, ...r) => r.map(ll).join(` ${e} `).replace(/calc/g, ""), yi = (...e) => `calc(${ba("+", ...e)})`, Si = (...e) => `calc(${ba("-", ...e)})`, fo = (...e) => `calc(${ba("*", ...e)})`, xi = (...e) => `calc(${ba("/", ...e)})`, _i = (e) => {
  const r = ll(e);
  return r != null && !Number.isNaN(parseFloat(r)) ? String(r).startsWith("-") ? String(r).slice(1) : `-${r}` : fo(r, -1);
}, rn = Object.assign(
  (e) => ({
    add: (...r) => rn(yi(e, ...r)),
    subtract: (...r) => rn(Si(e, ...r)),
    multiply: (...r) => rn(fo(e, ...r)),
    divide: (...r) => rn(xi(e, ...r)),
    negate: () => rn(_i(e)),
    toString: () => e.toString()
  }),
  {
    add: yi,
    subtract: Si,
    multiply: fo,
    divide: xi,
    negate: _i
  }
);
function hm(e, r = "-") {
  return e.replace(/\s+/g, r);
}
function vm(e) {
  const r = hm(e.toString());
  return bm(gm(r));
}
function gm(e) {
  return e.includes("\\.") ? e : !Number.isInteger(parseFloat(e.toString())) ? e.replace(".", "\\.") : e;
}
function bm(e) {
  return e.replace(/[!-,/:-@[-^`{-~]/g, "\\$&");
}
function pm(e, r = "") {
  return [r, e].filter(Boolean).join("-");
}
function ym(e, r) {
  return `var(${e}${r ? `, ${r}` : ""})`;
}
function Sm(e, r = "") {
  return vm(`--${pm(e, r)}`);
}
function oe(e, r, t) {
  const n = Sm(e, t);
  return {
    variable: n,
    reference: ym(n, r)
  };
}
function xm(e, r) {
  const t = {};
  for (const n of r) {
    if (Array.isArray(n)) {
      const [a, o] = n;
      t[a] = oe(`${e}-${a}`, o);
      continue;
    }
    t[n] = oe(`${e}-${n}`);
  }
  return t;
}
var Xe = {
  hover: (e, r) => `${e}:hover ${r}, ${e}[data-hover] ${r}`,
  focus: (e, r) => `${e}:focus ${r}, ${e}[data-focus] ${r}`,
  focusVisible: (e, r) => `${e}:focus-visible ${r}`,
  focusWithin: (e, r) => `${e}:focus-within ${r}`,
  active: (e, r) => `${e}:active ${r}, ${e}[data-active] ${r}`,
  disabled: (e, r) => `${e}:disabled ${r}, ${e}[data-disabled] ${r}`,
  invalid: (e, r) => `${e}:invalid ${r}, ${e}[data-invalid] ${r}`,
  checked: (e, r) => `${e}:checked ${r}, ${e}[data-checked] ${r}`,
  indeterminate: (e, r) => `${e}:indeterminate ${r}, ${e}[aria-checked=mixed] ${r}, ${e}[data-indeterminate] ${r}`,
  readOnly: (e, r) => `${e}:read-only ${r}, ${e}[readonly] ${r}, ${e}[data-read-only] ${r}`,
  expanded: (e, r) => `${e}:read-only ${r}, ${e}[aria-expanded=true] ${r}, ${e}[data-expanded] ${r}`,
  placeholderShown: (e, r) => `${e}:placeholder-shown ${r}`
}, nt = (e) => cl((r) => e(r, "&"), "[role=group]", "[data-group]", ".group"), Yr = (e) => cl((r) => e(r, "~ &"), "[data-peer]", ".peer"), cl = (e, ...r) => r.map(e).join(", "), dl = {
  _hover: "&:hover, &[data-hover]",
  _active: "&:active, &[data-active]",
  _focus: "&:focus, &[data-focus]",
  _highlighted: "&[data-highlighted]",
  _focusWithin: "&:focus-within",
  _focusVisible: "&:focus-visible, &[data-focus-visible]",
  _disabled: "&:disabled, &[disabled], &[aria-disabled=true], &[data-disabled]",
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
  _before: "&::before",
  _after: "&::after",
  _empty: "&:empty",
  _expanded: "&[aria-expanded=true], &[data-expanded]",
  _checked: "&[aria-checked=true], &[data-checked]",
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",
  _pressed: "&[aria-pressed=true], &[data-pressed]",
  _invalid: "&[aria-invalid=true], &[data-invalid]",
  _valid: "&[data-valid], &[data-state=valid]",
  _loading: "&[data-loading], &[aria-busy=true]",
  _selected: "&[aria-selected=true], &[data-selected]",
  _hidden: "&[hidden], &[data-hidden]",
  _autofill: "&:-webkit-autofill",
  _even: "&:nth-of-type(even)",
  _odd: "&:nth-of-type(odd)",
  _first: "&:first-of-type",
  _firstLetter: "&::first-letter",
  _last: "&:last-of-type",
  _notFirst: "&:not(:first-of-type)",
  _notLast: "&:not(:last-of-type)",
  _visited: "&:visited",
  _activeLink: "&[aria-current=page]",
  _activeStep: "&[aria-current=step]",
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",
  _groupHover: nt(Xe.hover),
  _peerHover: Yr(Xe.hover),
  _groupFocus: nt(Xe.focus),
  _peerFocus: Yr(Xe.focus),
  _groupFocusVisible: nt(Xe.focusVisible),
  _peerFocusVisible: Yr(Xe.focusVisible),
  _groupActive: nt(Xe.active),
  _peerActive: Yr(Xe.active),
  _groupDisabled: nt(Xe.disabled),
  _peerDisabled: Yr(Xe.disabled),
  _groupInvalid: nt(Xe.invalid),
  _peerInvalid: Yr(Xe.invalid),
  _groupChecked: nt(Xe.checked),
  _peerChecked: Yr(Xe.checked),
  _groupFocusWithin: nt(Xe.focusWithin),
  _peerFocusWithin: Yr(Xe.focusWithin),
  _peerPlaceholderShown: Yr(Xe.placeholderShown),
  _placeholder: "&::placeholder",
  _placeholderShown: "&:placeholder-shown",
  _fullScreen: "&:fullscreen",
  _selection: "&::selection",
  _rtl: "[dir=rtl] &, &[dir=rtl]",
  _ltr: "[dir=ltr] &, &[dir=ltr]",
  _mediaDark: "@media (prefers-color-scheme: dark)",
  _mediaReduceMotion: "@media (prefers-reduced-motion: reduce)",
  _dark: ".chakra-ui-dark &:not([data-theme]),[data-theme=dark] &:not([data-theme]),&[data-theme=dark]",
  _light: ".chakra-ui-light &:not([data-theme]),[data-theme=light] &:not([data-theme]),&[data-theme=light]"
}, _m = Object.keys(
  dl
), ul = zf(
  {},
  Hn,
  Se,
  Jf,
  oa,
  kr,
  Zf,
  lm,
  em,
  sl,
  sm,
  un,
  uo,
  De,
  mm,
  fm,
  cm,
  dm,
  rm,
  um
);
Object.assign({}, De, kr, oa, sl, un);
[...Object.keys(ul), ..._m];
({ ...ul, ...dl });
function Ae(e) {
  return {
    definePartsStyle(r) {
      return r;
    },
    defineMultiStyleConfig(r) {
      return { parts: e, ...r };
    }
  };
}
var { defineMultiStyleConfig: wm, definePartsStyle: sn } = Ae([
  "stepper",
  "step",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number"
]), Gr = oe("stepper-indicator-size"), At = oe("stepper-icon-size"), Nt = oe("stepper-title-font-size"), ln = oe("stepper-description-font-size"), tn = oe("stepper-accent-color"), km = sn(({ colorScheme: e }) => ({
  stepper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "4",
    "&[data-orientation=vertical]": {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    "&[data-orientation=horizontal]": {
      flexDirection: "row",
      alignItems: "center"
    },
    [tn.variable]: `colors.${e}.500`,
    _dark: {
      [tn.variable]: `colors.${e}.200`
    }
  },
  title: {
    fontSize: Nt.reference,
    fontWeight: "medium"
  },
  description: {
    fontSize: ln.reference,
    color: "chakra-subtle-text"
  },
  number: {
    fontSize: Nt.reference
  },
  step: {
    flexShrink: 0,
    position: "relative",
    display: "flex",
    gap: "2",
    "&[data-orientation=horizontal]": {
      alignItems: "center"
    },
    "&:not(:last-of-type)": {
      flex: "1"
    }
  },
  icon: {
    flexShrink: 0,
    width: At.reference,
    height: At.reference
  },
  indicator: {
    flexShrink: 0,
    borderRadius: "full",
    width: Gr.reference,
    height: Gr.reference,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&[data-status=active]": {
      borderWidth: "2px",
      borderColor: tn.reference
    },
    "&[data-status=complete]": {
      bg: tn.reference,
      color: "chakra-inverse-text"
    },
    "&[data-status=incomplete]": {
      borderWidth: "2px"
    }
  },
  separator: {
    bg: "chakra-border-color",
    flex: "1",
    "&[data-status=complete]": {
      bg: tn.reference
    },
    "&[data-orientation=horizontal]": {
      width: "100%",
      height: "2px",
      marginStart: "2"
    },
    "&[data-orientation=vertical]": {
      width: "2px",
      position: "absolute",
      height: "100%",
      maxHeight: `calc(100% - ${Gr.reference} - 8px)`,
      top: `calc(${Gr.reference} + 4px)`,
      insetStart: `calc(${Gr.reference} / 2 - 1px)`
    }
  }
})), Cm = wm({
  baseStyle: km,
  sizes: {
    xs: sn({
      stepper: {
        [Gr.variable]: "sizes.4",
        [At.variable]: "sizes.3",
        [Nt.variable]: "fontSizes.xs",
        [ln.variable]: "fontSizes.xs"
      }
    }),
    sm: sn({
      stepper: {
        [Gr.variable]: "sizes.6",
        [At.variable]: "sizes.4",
        [Nt.variable]: "fontSizes.sm",
        [ln.variable]: "fontSizes.xs"
      }
    }),
    md: sn({
      stepper: {
        [Gr.variable]: "sizes.8",
        [At.variable]: "sizes.5",
        [Nt.variable]: "fontSizes.md",
        [ln.variable]: "fontSizes.sm"
      }
    }),
    lg: sn({
      stepper: {
        [Gr.variable]: "sizes.10",
        [At.variable]: "sizes.6",
        [Nt.variable]: "fontSizes.lg",
        [ln.variable]: "fontSizes.md"
      }
    })
  },
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});
function ke(e, r = {}) {
  let t = !1;
  function n() {
    if (!t) {
      t = !0;
      return;
    }
    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?"
    );
  }
  function a(...S) {
    n();
    for (const b of S)
      r[b] = h(b);
    return ke(e, r);
  }
  function o(...S) {
    for (const b of S)
      b in r || (r[b] = h(b));
    return ke(e, r);
  }
  function i() {
    return Object.fromEntries(
      Object.entries(r).map(([b, _]) => [b, _.selector])
    );
  }
  function u() {
    return Object.fromEntries(
      Object.entries(r).map(([b, _]) => [b, _.className])
    );
  }
  function h(S) {
    const C = `chakra-${(["container", "root"].includes(S ?? "") ? [e] : [e, S]).filter(Boolean).join("__")}`;
    return {
      className: C,
      selector: `.${C}`,
      toString: () => S
    };
  }
  return {
    parts: a,
    toPart: h,
    extend: o,
    selectors: i,
    classnames: u,
    get keys() {
      return Object.keys(r);
    },
    __type: {}
  };
}
var Tm = ke("accordion").parts("root", "container", "button", "panel").extend("icon"), Em = ke("alert").parts("title", "description", "container").extend("icon", "spinner"), $m = ke("avatar").parts("label", "badge", "container").extend("excessLabel", "group"), Rm = ke("breadcrumb").parts("link", "item", "container").extend("separator");
ke("button").parts();
var Pm = ke("checkbox").parts("control", "icon", "container").extend("label");
ke("progress").parts("track", "filledTrack").extend("label");
var Fm = ke("drawer").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer"), Am = ke("editable").parts(
  "preview",
  "input",
  "textarea"
), Nm = ke("form").parts(
  "container",
  "requiredIndicator",
  "helperText"
), Dm = ke("formError").parts("text", "icon"), zm = ke("input").parts("addon", "field", "element"), Om = ke("list").parts("container", "item", "icon"), Im = ke("menu").parts("button", "list", "item").extend("groupTitle", "command", "divider"), Bm = ke("modal").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer"), Mm = ke("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper"
);
ke("pininput").parts("field");
var Wm = ke("popover").parts("content", "header", "body", "footer").extend("popper", "arrow", "closeButton"), Lm = ke("progress").parts(
  "label",
  "filledTrack",
  "track"
), jm = ke("radio").parts(
  "container",
  "control",
  "label"
), Vm = ke("select").parts("field", "icon"), Um = ke("slider").parts(
  "container",
  "track",
  "thumb",
  "filledTrack",
  "mark"
), Hm = ke("stat").parts(
  "container",
  "label",
  "helpText",
  "number",
  "icon"
), Ym = ke("switch").parts(
  "container",
  "track",
  "thumb"
), qm = ke("table").parts(
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption"
), Gm = ke("tabs").parts(
  "root",
  "tab",
  "tablist",
  "tabpanel",
  "tabpanels",
  "indicator"
), Xm = ke("tag").parts(
  "container",
  "label",
  "closeButton"
), Qm = ke("card").parts(
  "container",
  "header",
  "body",
  "footer"
);
function bt(e, r, t) {
  return Math.min(Math.max(e, t), r);
}
class Km extends Error {
  constructor(r) {
    super(`Failed to parse color: "${r}"`);
  }
}
var cn = Km;
function Fo(e) {
  if (typeof e != "string")
    throw new cn(e);
  if (e.trim().toLowerCase() === "transparent")
    return [0, 0, 0, 0];
  let r = e.trim();
  r = oh.test(e) ? eh(e) : e;
  const t = rh.exec(r);
  if (t) {
    const i = Array.from(t).slice(1);
    return [...i.slice(0, 3).map((u) => parseInt(bn(u, 2), 16)), parseInt(bn(i[3] || "f", 2), 16) / 255];
  }
  const n = th.exec(r);
  if (n) {
    const i = Array.from(n).slice(1);
    return [...i.slice(0, 3).map((u) => parseInt(u, 16)), parseInt(i[3] || "ff", 16) / 255];
  }
  const a = nh.exec(r);
  if (a) {
    const i = Array.from(a).slice(1);
    return [...i.slice(0, 3).map((u) => parseInt(u, 10)), parseFloat(i[3] || "1")];
  }
  const o = ah.exec(r);
  if (o) {
    const [i, u, h, v] = Array.from(o).slice(1).map(parseFloat);
    if (bt(0, 100, u) !== u)
      throw new cn(e);
    if (bt(0, 100, h) !== h)
      throw new cn(e);
    return [...ih(i, u, h), Number.isNaN(v) ? 1 : v];
  }
  throw new cn(e);
}
function Jm(e) {
  let r = 5381, t = e.length;
  for (; t; )
    r = r * 33 ^ e.charCodeAt(--t);
  return (r >>> 0) % 2341;
}
const wi = (e) => parseInt(e.replace(/_/g, ""), 36), Zm = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((e, r) => {
  const t = wi(r.substring(0, 3)), n = wi(r.substring(3)).toString(16);
  let a = "";
  for (let o = 0; o < 6 - n.length; o++)
    a += "0";
  return e[t] = `${a}${n}`, e;
}, {});
function eh(e) {
  const r = e.toLowerCase().trim(), t = Zm[Jm(r)];
  if (!t)
    throw new cn(e);
  return `#${t}`;
}
const bn = (e, r) => Array.from(Array(r)).map(() => e).join(""), rh = new RegExp(`^#${bn("([a-f0-9])", 3)}([a-f0-9])?$`, "i"), th = new RegExp(`^#${bn("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i"), nh = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${bn(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i"), ah = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i, oh = /^[a-z]+$/i, ki = (e) => Math.round(e * 255), ih = (e, r, t) => {
  let n = t / 100;
  if (r === 0)
    return [n, n, n].map(ki);
  const a = (e % 360 + 360) % 360 / 60, o = (1 - Math.abs(2 * n - 1)) * (r / 100), i = o * (1 - Math.abs(a % 2 - 1));
  let u = 0, h = 0, v = 0;
  a >= 0 && a < 1 ? (u = o, h = i) : a >= 1 && a < 2 ? (u = i, h = o) : a >= 2 && a < 3 ? (h = o, v = i) : a >= 3 && a < 4 ? (h = i, v = o) : a >= 4 && a < 5 ? (u = i, v = o) : a >= 5 && a < 6 && (u = o, v = i);
  const S = n - o / 2, b = u + S, _ = h + S, C = v + S;
  return [b, _, C].map(ki);
};
function sh(e, r, t, n) {
  return `rgba(${bt(0, 255, e).toFixed()}, ${bt(0, 255, r).toFixed()}, ${bt(0, 255, t).toFixed()}, ${parseFloat(bt(0, 1, n).toFixed(3))})`;
}
function lh(e, r) {
  const [t, n, a, o] = Fo(e);
  return sh(t, n, a, o - r);
}
function ch(e) {
  const [r, t, n, a] = Fo(e);
  let o = (i) => {
    const u = bt(0, 255, i).toString(16);
    return u.length === 1 ? `0${u}` : u;
  };
  return `#${o(r)}${o(t)}${o(n)}${a < 1 ? o(Math.round(a * 255)) : ""}`;
}
function dh(e, r, t, n, a) {
  for (r = r.split ? r.split(".") : r, n = 0; n < r.length; n++)
    e = e ? e[r[n]] : a;
  return e === a ? t : e;
}
var uh = (e) => Object.keys(e).length === 0, ar = (e, r, t) => {
  const n = dh(e, `colors.${r}`, r);
  try {
    return ch(n), n;
  } catch {
    return t ?? "#000000";
  }
}, fh = (e) => {
  const [r, t, n] = Fo(e);
  return (r * 299 + t * 587 + n * 114) / 1e3;
}, mh = (e) => (r) => {
  const t = ar(r, e);
  return fh(t) < 128 ? "dark" : "light";
}, hh = (e) => (r) => mh(e)(r) === "dark", Wt = (e, r) => (t) => {
  const n = ar(t, e);
  return lh(n, 1 - r);
};
function Ci(e = "1rem", r = "rgba(255, 255, 255, 0.15)") {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${r} 25%,
    transparent 25%,
    transparent 50%,
    ${r} 50%,
    ${r} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${e} ${e}`
  };
}
var vh = () => `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, "0")}`;
function gh(e) {
  const r = vh();
  return !e || uh(e) ? r : e.string && e.colors ? ph(e.string, e.colors) : e.string && !e.colors ? bh(e.string) : e.colors && !e.string ? yh(e.colors) : r;
}
function bh(e) {
  let r = 0;
  if (e.length === 0)
    return r.toString();
  for (let n = 0; n < e.length; n += 1)
    r = e.charCodeAt(n) + ((r << 5) - r), r = r & r;
  let t = "#";
  for (let n = 0; n < 3; n += 1) {
    const a = r >> n * 8 & 255;
    t += `00${a.toString(16)}`.substr(-2);
  }
  return t;
}
function ph(e, r) {
  let t = 0;
  if (e.length === 0)
    return r[0];
  for (let n = 0; n < e.length; n += 1)
    t = e.charCodeAt(n) + ((t << 5) - t), t = t & t;
  return t = (t % r.length + r.length) % r.length, r[t];
}
function yh(e) {
  return e[Math.floor(Math.random() * e.length)];
}
function G(e, r) {
  return (t) => t.colorMode === "dark" ? r : e;
}
function Ao(e) {
  const { orientation: r, vertical: t, horizontal: n } = e;
  return r ? r === "vertical" ? t : n : {};
}
function fl(e) {
  return Mt(e) && e.reference ? e.reference : String(e);
}
var pa = (e, ...r) => r.map(fl).join(` ${e} `).replace(/calc/g, ""), Ti = (...e) => `calc(${pa("+", ...e)})`, Ei = (...e) => `calc(${pa("-", ...e)})`, mo = (...e) => `calc(${pa("*", ...e)})`, $i = (...e) => `calc(${pa("/", ...e)})`, Ri = (e) => {
  const r = fl(e);
  return r != null && !Number.isNaN(parseFloat(r)) ? String(r).startsWith("-") ? String(r).slice(1) : `-${r}` : mo(r, -1);
}, Xr = Object.assign(
  (e) => ({
    add: (...r) => Xr(Ti(e, ...r)),
    subtract: (...r) => Xr(Ei(e, ...r)),
    multiply: (...r) => Xr(mo(e, ...r)),
    divide: (...r) => Xr($i(e, ...r)),
    negate: () => Xr(Ri(e)),
    toString: () => e.toString()
  }),
  {
    add: Ti,
    subtract: Ei,
    multiply: mo,
    divide: $i,
    negate: Ri
  }
);
function Sh(e) {
  return !Number.isInteger(parseFloat(e.toString()));
}
function xh(e, r = "-") {
  return e.replace(/\s+/g, r);
}
function ml(e) {
  const r = xh(e.toString());
  return r.includes("\\.") ? e : Sh(e) ? r.replace(".", "\\.") : e;
}
function _h(e, r = "") {
  return [r, ml(e)].filter(Boolean).join("-");
}
function wh(e, r) {
  return `var(${ml(e)}${r ? `, ${r}` : ""})`;
}
function kh(e, r = "") {
  return `--${_h(e, r)}`;
}
function He(e, r) {
  const t = kh(e, r == null ? void 0 : r.prefix);
  return {
    variable: t,
    reference: wh(t, Ch(r == null ? void 0 : r.fallback))
  };
}
function Ch(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.reference;
}
var { defineMultiStyleConfig: Th, definePartsStyle: Yn } = Ae(Ym.keys), fn = He("switch-track-width"), yt = He("switch-track-height"), Oa = He("switch-track-diff"), Eh = Xr.subtract(fn, yt), ho = He("switch-thumb-x"), nn = He("switch-bg"), $h = (e) => {
  const { colorScheme: r } = e;
  return {
    borderRadius: "full",
    p: "0.5",
    width: [fn.reference],
    height: [yt.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    [nn.variable]: "colors.gray.300",
    _dark: {
      [nn.variable]: "colors.whiteAlpha.400"
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      [nn.variable]: `colors.${r}.500`,
      _dark: {
        [nn.variable]: `colors.${r}.200`
      }
    },
    bg: nn.reference
  };
}, Rh = {
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [yt.reference],
  height: [yt.reference],
  _checked: {
    transform: `translateX(${ho.reference})`
  }
}, Ph = Yn((e) => ({
  container: {
    [Oa.variable]: Eh,
    [ho.variable]: Oa.reference,
    _rtl: {
      [ho.variable]: Xr(Oa).negate().toString()
    }
  },
  track: $h(e),
  thumb: Rh
})), Fh = {
  sm: Yn({
    container: {
      [fn.variable]: "1.375rem",
      [yt.variable]: "sizes.3"
    }
  }),
  md: Yn({
    container: {
      [fn.variable]: "1.875rem",
      [yt.variable]: "sizes.4"
    }
  }),
  lg: Yn({
    container: {
      [fn.variable]: "2.875rem",
      [yt.variable]: "sizes.6"
    }
  })
}, Ah = Th({
  baseStyle: Ph,
  sizes: Fh,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
}), { defineMultiStyleConfig: Nh, definePartsStyle: zt } = Ae(qm.keys), Dh = zt({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
}), ia = {
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
}, zh = zt((e) => {
  const { colorScheme: r } = e;
  return {
    th: {
      color: G("gray.600", "gray.400")(e),
      borderBottom: "1px",
      borderColor: G(`${r}.100`, `${r}.700`)(e),
      ...ia
    },
    td: {
      borderBottom: "1px",
      borderColor: G(`${r}.100`, `${r}.700`)(e),
      ...ia
    },
    caption: {
      color: G("gray.600", "gray.100")(e)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
}), Oh = zt((e) => {
  const { colorScheme: r } = e;
  return {
    th: {
      color: G("gray.600", "gray.400")(e),
      borderBottom: "1px",
      borderColor: G(`${r}.100`, `${r}.700`)(e),
      ...ia
    },
    td: {
      borderBottom: "1px",
      borderColor: G(`${r}.100`, `${r}.700`)(e),
      ...ia
    },
    caption: {
      color: G("gray.600", "gray.100")(e)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: G(`${r}.100`, `${r}.700`)(e)
          },
          td: {
            background: G(`${r}.100`, `${r}.700`)(e)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
}), Ih = {
  simple: zh,
  striped: Oh,
  unstyled: {}
}, Bh = {
  sm: zt({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  }),
  md: zt({
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  }),
  lg: zt({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  })
}, Mh = Nh({
  baseStyle: Dh,
  variants: Ih,
  sizes: Bh,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray"
  }
}), dr = oe("tabs-color"), Pr = oe("tabs-bg"), Nn = oe("tabs-border-color"), { defineMultiStyleConfig: Wh, definePartsStyle: Br } = Ae(Gm.keys), Lh = (e) => {
  const { orientation: r } = e;
  return {
    display: r === "vertical" ? "flex" : "block"
  };
}, jh = (e) => {
  const { isFitted: r } = e;
  return {
    flex: r ? 1 : void 0,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
      zIndex: 1,
      boxShadow: "outline"
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4
    }
  };
}, Vh = (e) => {
  const { align: r = "start", orientation: t } = e;
  return {
    justifyContent: {
      end: "flex-end",
      center: "center",
      start: "flex-start"
    }[r],
    flexDirection: t === "vertical" ? "column" : "row"
  };
}, Uh = {
  p: 4
}, Hh = Br((e) => ({
  root: Lh(e),
  tab: jh(e),
  tablist: Vh(e),
  tabpanel: Uh
})), Yh = {
  sm: Br({
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  }),
  md: Br({
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  }),
  lg: Br({
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  })
}, qh = Br((e) => {
  const { colorScheme: r, orientation: t } = e, n = t === "vertical", a = t === "vertical" ? "borderStart" : "borderBottom", o = n ? "marginStart" : "marginBottom";
  return {
    tablist: {
      [a]: "2px solid",
      borderColor: "inherit"
    },
    tab: {
      [a]: "2px solid",
      borderColor: "transparent",
      [o]: "-2px",
      _selected: {
        [dr.variable]: `colors.${r}.600`,
        _dark: {
          [dr.variable]: `colors.${r}.300`
        },
        borderColor: "currentColor"
      },
      _active: {
        [Pr.variable]: "colors.gray.200",
        _dark: {
          [Pr.variable]: "colors.whiteAlpha.300"
        }
      },
      _disabled: {
        _active: { bg: "none" }
      },
      color: dr.reference,
      bg: Pr.reference
    }
  };
}), Gh = Br((e) => {
  const { colorScheme: r } = e;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      [Nn.variable]: "transparent",
      _selected: {
        [dr.variable]: `colors.${r}.600`,
        [Nn.variable]: "colors.white",
        _dark: {
          [dr.variable]: `colors.${r}.300`,
          [Nn.variable]: "colors.gray.800"
        },
        borderColor: "inherit",
        borderBottomColor: Nn.reference
      },
      color: dr.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}), Xh = Br((e) => {
  const { colorScheme: r } = e;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      [Pr.variable]: "colors.gray.50",
      _dark: {
        [Pr.variable]: "colors.whiteAlpha.50"
      },
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        [Pr.variable]: "colors.white",
        [dr.variable]: `colors.${r}.600`,
        _dark: {
          [Pr.variable]: "colors.gray.800",
          [dr.variable]: `colors.${r}.300`
        },
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      },
      color: dr.reference,
      bg: Pr.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
}), Qh = Br((e) => {
  const { colorScheme: r, theme: t } = e;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: ar(t, `${r}.700`),
        bg: ar(t, `${r}.100`)
      }
    }
  };
}), Kh = Br((e) => {
  const { colorScheme: r } = e;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      [dr.variable]: "colors.gray.600",
      _dark: {
        [dr.variable]: "inherit"
      },
      _selected: {
        [dr.variable]: "colors.white",
        [Pr.variable]: `colors.${r}.600`,
        _dark: {
          [dr.variable]: "colors.gray.800",
          [Pr.variable]: `colors.${r}.300`
        }
      },
      color: dr.reference,
      bg: Pr.reference
    }
  };
}), Jh = Br({}), Zh = {
  line: qh,
  enclosed: Gh,
  "enclosed-colored": Xh,
  "soft-rounded": Qh,
  "solid-rounded": Kh,
  unstyled: Jh
}, ev = Wh({
  baseStyle: Hh,
  sizes: Yh,
  variants: Zh,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue"
  }
}), je = xm("badge", ["bg", "color", "shadow"]), rv = {
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold",
  bg: je.bg.reference,
  color: je.color.reference,
  boxShadow: je.shadow.reference
}, tv = (e) => {
  const { colorScheme: r, theme: t } = e, n = Wt(`${r}.500`, 0.6)(t);
  return {
    [je.bg.variable]: `colors.${r}.500`,
    [je.color.variable]: "colors.white",
    _dark: {
      [je.bg.variable]: n,
      [je.color.variable]: "colors.whiteAlpha.800"
    }
  };
}, nv = (e) => {
  const { colorScheme: r, theme: t } = e, n = Wt(`${r}.200`, 0.16)(t);
  return {
    [je.bg.variable]: `colors.${r}.100`,
    [je.color.variable]: `colors.${r}.800`,
    _dark: {
      [je.bg.variable]: n,
      [je.color.variable]: `colors.${r}.200`
    }
  };
}, av = (e) => {
  const { colorScheme: r, theme: t } = e, n = Wt(`${r}.200`, 0.8)(t);
  return {
    [je.color.variable]: `colors.${r}.500`,
    _dark: {
      [je.color.variable]: n
    },
    [je.shadow.variable]: `inset 0 0 0px 1px ${je.color.reference}`
  };
}, ov = {
  solid: tv,
  subtle: nv,
  outline: av
}, mn = {
  baseStyle: rv,
  variants: ov,
  defaultProps: {
    variant: "subtle",
    colorScheme: "gray"
  }
}, { defineMultiStyleConfig: iv, definePartsStyle: St } = Ae(Xm.keys), sv = {
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  color: je.color.reference,
  bg: je.bg.reference,
  boxShadow: je.shadow.reference,
  borderRadius: "md",
  _focusVisible: {
    boxShadow: "outline"
  }
}, lv = {
  lineHeight: 1.2,
  overflow: "visible"
}, cv = {
  fontSize: "lg",
  w: "5",
  h: "5",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "1.5",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focusVisible: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
}, dv = St({
  container: sv,
  label: lv,
  closeButton: cv
}), uv = {
  sm: St({
    container: {
      minH: "5",
      minW: "5",
      fontSize: "xs",
      px: "2"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  }),
  md: St({
    container: {
      minH: "6",
      minW: "6",
      fontSize: "sm",
      px: "2"
    }
  }),
  lg: St({
    container: {
      minH: "8",
      minW: "8",
      fontSize: "md",
      px: "3"
    }
  })
}, fv = {
  subtle: St((e) => {
    var r;
    return {
      container: (r = mn.variants) == null ? void 0 : r.subtle(e)
    };
  }),
  solid: St((e) => {
    var r;
    return {
      container: (r = mn.variants) == null ? void 0 : r.solid(e)
    };
  }),
  outline: St((e) => {
    var r;
    return {
      container: (r = mn.variants) == null ? void 0 : r.outline(e)
    };
  })
}, mv = iv({
  variants: fv,
  baseStyle: dv,
  sizes: uv,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray"
  }
}), { definePartsStyle: Qr, defineMultiStyleConfig: hv } = Ae(zm.keys), vv = Qr({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  }
}), at = {
  lg: {
    fontSize: "lg",
    px: "4",
    h: "12",
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    px: "4",
    h: "10",
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    px: "3",
    h: "8",
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    px: "2",
    h: "6",
    borderRadius: "sm"
  }
}, gv = {
  lg: Qr({
    field: at.lg,
    addon: at.lg
  }),
  md: Qr({
    field: at.md,
    addon: at.md
  }),
  sm: Qr({
    field: at.sm,
    addon: at.sm
  }),
  xs: Qr({
    field: at.xs,
    addon: at.xs
  })
};
function No(e) {
  const { focusBorderColor: r, errorBorderColor: t } = e;
  return {
    focusBorderColor: r || G("blue.500", "blue.300")(e),
    errorBorderColor: t || G("red.500", "red.300")(e)
  };
}
var bv = Qr((e) => {
  const { theme: r } = e, { focusBorderColor: t, errorBorderColor: n } = No(e);
  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: G("gray.300", "whiteAlpha.400")(e)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: ar(r, n),
        boxShadow: `0 0 0 1px ${ar(r, n)}`
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: ar(r, t),
        boxShadow: `0 0 0 1px ${ar(r, t)}`
      }
    },
    addon: {
      border: "1px solid",
      borderColor: G("inherit", "whiteAlpha.50")(e),
      bg: G("gray.100", "whiteAlpha.300")(e)
    }
  };
}), pv = Qr((e) => {
  const { theme: r } = e, { focusBorderColor: t, errorBorderColor: n } = No(e);
  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: G("gray.100", "whiteAlpha.50")(e),
      _hover: {
        bg: G("gray.200", "whiteAlpha.100")(e)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: ar(r, n)
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: ar(r, t)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: G("gray.100", "whiteAlpha.50")(e)
    }
  };
}), yv = Qr((e) => {
  const { theme: r } = e, { focusBorderColor: t, errorBorderColor: n } = No(e);
  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: ar(r, n),
        boxShadow: `0px 1px 0px 0px ${ar(r, n)}`
      },
      _focusVisible: {
        borderColor: ar(r, t),
        boxShadow: `0px 1px 0px 0px ${ar(r, t)}`
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent"
    }
  };
}), Sv = Qr({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto"
  }
}), xv = {
  outline: bv,
  filled: pv,
  flushed: yv,
  unstyled: Sv
}, xe = hv({
  baseStyle: vv,
  sizes: gv,
  variants: xv,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
}), Pi, _v = {
  ...(Pi = xe.baseStyle) == null ? void 0 : Pi.field,
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top"
}, Fi, Ai, wv = {
  outline: (e) => {
    var r, t;
    return (t = (r = xe.variants) == null ? void 0 : r.outline(e).field) != null ? t : {};
  },
  flushed: (e) => {
    var r, t;
    return (t = (r = xe.variants) == null ? void 0 : r.flushed(e).field) != null ? t : {};
  },
  filled: (e) => {
    var r, t;
    return (t = (r = xe.variants) == null ? void 0 : r.filled(e).field) != null ? t : {};
  },
  unstyled: (Ai = (Fi = xe.variants) == null ? void 0 : Fi.unstyled.field) != null ? Ai : {}
}, Ni, Di, zi, Oi, Ii, Bi, Mi, Wi, kv = {
  xs: (Di = (Ni = xe.sizes) == null ? void 0 : Ni.xs.field) != null ? Di : {},
  sm: (Oi = (zi = xe.sizes) == null ? void 0 : zi.sm.field) != null ? Oi : {},
  md: (Bi = (Ii = xe.sizes) == null ? void 0 : Ii.md.field) != null ? Bi : {},
  lg: (Wi = (Mi = xe.sizes) == null ? void 0 : Mi.lg.field) != null ? Wi : {}
}, Cv = {
  baseStyle: _v,
  sizes: kv,
  variants: wv,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
}, Dn = He("tooltip-bg"), Ia = He("tooltip-fg"), Tv = He("popper-arrow-bg"), Ev = {
  bg: Dn.reference,
  color: Ia.reference,
  [Dn.variable]: "colors.gray.700",
  [Ia.variable]: "colors.whiteAlpha.900",
  _dark: {
    [Dn.variable]: "colors.gray.300",
    [Ia.variable]: "colors.gray.900"
  },
  [Tv.variable]: Dn.reference,
  px: "2",
  py: "0.5",
  borderRadius: "sm",
  fontWeight: "medium",
  fontSize: "sm",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip"
}, $v = {
  baseStyle: Ev
}, { defineMultiStyleConfig: Rv, definePartsStyle: dn } = Ae(Lm.keys), Pv = (e) => {
  const { colorScheme: r, theme: t, isIndeterminate: n, hasStripe: a } = e, o = G(
    Ci(),
    Ci("1rem", "rgba(0,0,0,0.1)")
  )(e), i = G(`${r}.500`, `${r}.200`)(e), u = `linear-gradient(
    to right,
    transparent 0%,
    ${ar(t, i)} 50%,
    transparent 100%
  )`;
  return {
    ...!n && a && o,
    ...n ? { bgImage: u } : { bgColor: i }
  };
}, Fv = {
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
}, Av = (e) => ({
  bg: G("gray.100", "whiteAlpha.300")(e)
}), Nv = (e) => ({
  transitionProperty: "common",
  transitionDuration: "slow",
  ...Pv(e)
}), Dv = dn((e) => ({
  label: Fv,
  filledTrack: Nv(e),
  track: Av(e)
})), zv = {
  xs: dn({
    track: { h: "1" }
  }),
  sm: dn({
    track: { h: "2" }
  }),
  md: dn({
    track: { h: "3" }
  }),
  lg: dn({
    track: { h: "4" }
  })
}, Ov = Rv({
  sizes: zv,
  baseStyle: Dv,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
}), Iv = (e) => typeof e == "function";
function or(e, ...r) {
  return Iv(e) ? e(...r) : e;
}
var { definePartsStyle: qn, defineMultiStyleConfig: Bv } = Ae(Pm.keys), hn = oe("checkbox-size"), Mv = (e) => {
  const { colorScheme: r } = e;
  return {
    w: hn.reference,
    h: hn.reference,
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: G(`${r}.500`, `${r}.200`)(e),
      borderColor: G(`${r}.500`, `${r}.200`)(e),
      color: G("white", "gray.900")(e),
      _hover: {
        bg: G(`${r}.600`, `${r}.300`)(e),
        borderColor: G(`${r}.600`, `${r}.300`)(e)
      },
      _disabled: {
        borderColor: G("gray.200", "transparent")(e),
        bg: G("gray.200", "whiteAlpha.300")(e),
        color: G("gray.500", "whiteAlpha.500")(e)
      }
    },
    _indeterminate: {
      bg: G(`${r}.500`, `${r}.200`)(e),
      borderColor: G(`${r}.500`, `${r}.200`)(e),
      color: G("white", "gray.900")(e)
    },
    _disabled: {
      bg: G("gray.100", "whiteAlpha.100")(e),
      borderColor: G("gray.100", "transparent")(e)
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: G("red.500", "red.300")(e)
    }
  };
}, Wv = {
  _disabled: { cursor: "not-allowed" }
}, Lv = {
  userSelect: "none",
  _disabled: { opacity: 0.4 }
}, jv = {
  transitionProperty: "transform",
  transitionDuration: "normal"
}, Vv = qn((e) => ({
  icon: jv,
  container: Wv,
  control: or(Mv, e),
  label: Lv
})), Uv = {
  sm: qn({
    control: { [hn.variable]: "sizes.3" },
    label: { fontSize: "sm" },
    icon: { fontSize: "3xs" }
  }),
  md: qn({
    control: { [hn.variable]: "sizes.4" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" }
  }),
  lg: qn({
    control: { [hn.variable]: "sizes.5" },
    label: { fontSize: "lg" },
    icon: { fontSize: "2xs" }
  })
}, sa = Bv({
  baseStyle: Vv,
  sizes: Uv,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
}), { defineMultiStyleConfig: Hv, definePartsStyle: Gn } = Ae(jm.keys), Yv = (e) => {
  var r;
  const t = (r = or(sa.baseStyle, e)) == null ? void 0 : r.control;
  return {
    ...t,
    borderRadius: "full",
    _checked: {
      ...t == null ? void 0 : t._checked,
      _before: {
        content: '""',
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    }
  };
}, qv = Gn((e) => {
  var r, t, n, a;
  return {
    label: (t = (r = sa).baseStyle) == null ? void 0 : t.call(r, e).label,
    container: (a = (n = sa).baseStyle) == null ? void 0 : a.call(n, e).container,
    control: Yv(e)
  };
}), Gv = {
  md: Gn({
    control: { w: "4", h: "4" },
    label: { fontSize: "md" }
  }),
  lg: Gn({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" }
  }),
  sm: Gn({
    control: { width: "3", height: "3" },
    label: { fontSize: "sm" }
  })
}, Xv = Hv({
  baseStyle: qv,
  sizes: Gv,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
}), { defineMultiStyleConfig: Qv, definePartsStyle: Kv } = Ae(Vm.keys), zn = oe("select-bg"), Li, Jv = {
  ...(Li = xe.baseStyle) == null ? void 0 : Li.field,
  appearance: "none",
  paddingBottom: "1px",
  lineHeight: "normal",
  bg: zn.reference,
  [zn.variable]: "colors.white",
  _dark: {
    [zn.variable]: "colors.gray.700"
  },
  "> option, > optgroup": {
    bg: zn.reference
  }
}, Zv = {
  width: "6",
  height: "100%",
  insetEnd: "2",
  position: "relative",
  color: "currentColor",
  fontSize: "xl",
  _disabled: {
    opacity: 0.5
  }
}, eg = Kv({
  field: Jv,
  icon: Zv
}), On = {
  paddingInlineEnd: "8"
}, ji, Vi, Ui, Hi, Yi, qi, Gi, Xi, rg = {
  lg: {
    ...(ji = xe.sizes) == null ? void 0 : ji.lg,
    field: {
      ...(Vi = xe.sizes) == null ? void 0 : Vi.lg.field,
      ...On
    }
  },
  md: {
    ...(Ui = xe.sizes) == null ? void 0 : Ui.md,
    field: {
      ...(Hi = xe.sizes) == null ? void 0 : Hi.md.field,
      ...On
    }
  },
  sm: {
    ...(Yi = xe.sizes) == null ? void 0 : Yi.sm,
    field: {
      ...(qi = xe.sizes) == null ? void 0 : qi.sm.field,
      ...On
    }
  },
  xs: {
    ...(Gi = xe.sizes) == null ? void 0 : Gi.xs,
    field: {
      ...(Xi = xe.sizes) == null ? void 0 : Xi.xs.field,
      ...On
    },
    icon: {
      insetEnd: "1"
    }
  }
}, tg = Qv({
  baseStyle: eg,
  sizes: rg,
  variants: xe.variants,
  defaultProps: xe.defaultProps
}), Ba = oe("skeleton-start-color"), Ma = oe("skeleton-end-color"), ng = {
  [Ba.variable]: "colors.gray.100",
  [Ma.variable]: "colors.gray.400",
  _dark: {
    [Ba.variable]: "colors.gray.800",
    [Ma.variable]: "colors.gray.600"
  },
  background: Ba.reference,
  borderColor: Ma.reference,
  opacity: 0.7,
  borderRadius: "sm"
}, ag = {
  baseStyle: ng
}, Wa = oe("skip-link-bg"), og = {
  borderRadius: "md",
  fontWeight: "semibold",
  _focusVisible: {
    boxShadow: "outline",
    padding: "4",
    position: "fixed",
    top: "6",
    insetStart: "6",
    [Wa.variable]: "colors.white",
    _dark: {
      [Wa.variable]: "colors.gray.700"
    },
    bg: Wa.reference
  }
}, ig = {
  baseStyle: og
}, { defineMultiStyleConfig: sg, definePartsStyle: ya } = Ae(Um.keys), pn = oe("slider-thumb-size"), yn = oe("slider-track-size"), it = oe("slider-bg"), lg = (e) => {
  const { orientation: r } = e;
  return {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    },
    ...Ao({
      orientation: r,
      vertical: { h: "100%" },
      horizontal: { w: "100%" }
    })
  };
}, cg = (e) => ({
  ...Ao({
    orientation: e.orientation,
    horizontal: { h: yn.reference },
    vertical: { w: yn.reference }
  }),
  overflow: "hidden",
  borderRadius: "sm",
  [it.variable]: "colors.gray.200",
  _dark: {
    [it.variable]: "colors.whiteAlpha.200"
  },
  _disabled: {
    [it.variable]: "colors.gray.300",
    _dark: {
      [it.variable]: "colors.whiteAlpha.300"
    }
  },
  bg: it.reference
}), dg = (e) => {
  const { orientation: r } = e;
  return {
    ...Ao({
      orientation: r,
      vertical: {
        left: "50%",
        transform: "translateX(-50%)",
        _active: {
          transform: "translateX(-50%) scale(1.15)"
        }
      },
      horizontal: {
        top: "50%",
        transform: "translateY(-50%)",
        _active: {
          transform: "translateY(-50%) scale(1.15)"
        }
      }
    }),
    w: pn.reference,
    h: pn.reference,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  };
}, ug = (e) => {
  const { colorScheme: r } = e;
  return {
    width: "inherit",
    height: "inherit",
    [it.variable]: `colors.${r}.500`,
    _dark: {
      [it.variable]: `colors.${r}.200`
    },
    bg: it.reference
  };
}, fg = ya((e) => ({
  container: lg(e),
  track: cg(e),
  thumb: dg(e),
  filledTrack: ug(e)
})), mg = ya({
  container: {
    [pn.variable]: "sizes.4",
    [yn.variable]: "sizes.1"
  }
}), hg = ya({
  container: {
    [pn.variable]: "sizes.3.5",
    [yn.variable]: "sizes.1"
  }
}), vg = ya({
  container: {
    [pn.variable]: "sizes.2.5",
    [yn.variable]: "sizes.0.5"
  }
}), gg = {
  lg: mg,
  md: hg,
  sm: vg
}, bg = sg({
  baseStyle: fg,
  sizes: gg,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
}), vt = He("spinner-size"), pg = {
  width: [vt.reference],
  height: [vt.reference]
}, yg = {
  xs: {
    [vt.variable]: "sizes.3"
  },
  sm: {
    [vt.variable]: "sizes.4"
  },
  md: {
    [vt.variable]: "sizes.6"
  },
  lg: {
    [vt.variable]: "sizes.8"
  },
  xl: {
    [vt.variable]: "sizes.12"
  }
}, Sg = {
  baseStyle: pg,
  sizes: yg,
  defaultProps: {
    size: "md"
  }
}, { defineMultiStyleConfig: xg, definePartsStyle: hl } = Ae(Hm.keys), _g = {
  fontWeight: "medium"
}, wg = {
  opacity: 0.8,
  marginBottom: "2"
}, kg = {
  verticalAlign: "baseline",
  fontWeight: "semibold"
}, Cg = {
  marginEnd: 1,
  w: "3.5",
  h: "3.5",
  verticalAlign: "middle"
}, Tg = hl({
  container: {},
  label: _g,
  helpText: wg,
  number: kg,
  icon: Cg
}), Eg = {
  md: hl({
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" }
  })
}, $g = xg({
  baseStyle: Tg,
  sizes: Eg,
  defaultProps: {
    size: "md"
  }
}), La = oe("kbd-bg"), Rg = {
  [La.variable]: "colors.gray.100",
  _dark: {
    [La.variable]: "colors.whiteAlpha.100"
  },
  bg: La.reference,
  borderRadius: "md",
  borderWidth: "1px",
  borderBottomWidth: "3px",
  fontSize: "0.8em",
  fontWeight: "bold",
  lineHeight: "normal",
  px: "0.4em",
  whiteSpace: "nowrap"
}, Pg = {
  baseStyle: Rg
}, Fg = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focusVisible: {
    boxShadow: "outline"
  }
}, Ag = {
  baseStyle: Fg
}, { defineMultiStyleConfig: Ng, definePartsStyle: Dg } = Ae(Om.keys), zg = {
  marginEnd: "2",
  display: "inline",
  verticalAlign: "text-bottom"
}, Og = Dg({
  icon: zg
}), Ig = Ng({
  baseStyle: Og
}), { defineMultiStyleConfig: Bg, definePartsStyle: Mg } = Ae(Im.keys), Or = oe("menu-bg"), ja = oe("menu-shadow"), Wg = {
  [Or.variable]: "#fff",
  [ja.variable]: "shadows.sm",
  _dark: {
    [Or.variable]: "colors.gray.700",
    [ja.variable]: "shadows.dark-lg"
  },
  color: "inherit",
  minW: "3xs",
  py: "2",
  zIndex: 1,
  borderRadius: "md",
  borderWidth: "1px",
  bg: Or.reference,
  boxShadow: ja.reference
}, Lg = {
  py: "1.5",
  px: "3",
  transitionProperty: "background",
  transitionDuration: "ultra-fast",
  transitionTimingFunction: "ease-in",
  _focus: {
    [Or.variable]: "colors.gray.100",
    _dark: {
      [Or.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [Or.variable]: "colors.gray.200",
    _dark: {
      [Or.variable]: "colors.whiteAlpha.200"
    }
  },
  _expanded: {
    [Or.variable]: "colors.gray.100",
    _dark: {
      [Or.variable]: "colors.whiteAlpha.100"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  bg: Or.reference
}, jg = {
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
}, Vg = {
  opacity: 0.6
}, Ug = {
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "2",
  opacity: 0.6
}, Hg = {
  transitionProperty: "common",
  transitionDuration: "normal"
}, Yg = Mg({
  button: Hg,
  list: Wg,
  item: Lg,
  groupTitle: jg,
  command: Vg,
  divider: Ug
}), qg = Bg({
  baseStyle: Yg
}), { defineMultiStyleConfig: Gg, definePartsStyle: vo } = Ae(Bm.keys), Va = oe("modal-bg"), Ua = oe("modal-shadow"), Xg = {
  bg: "blackAlpha.600",
  zIndex: "modal"
}, Qg = (e) => {
  const { isCentered: r, scrollBehavior: t } = e;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: r ? "center" : "flex-start",
    overflow: t === "inside" ? "hidden" : "auto",
    overscrollBehaviorY: "none"
  };
}, Kg = (e) => {
  const { isCentered: r, scrollBehavior: t } = e;
  return {
    borderRadius: "md",
    color: "inherit",
    my: r ? "auto" : "16",
    mx: r ? "auto" : void 0,
    zIndex: "modal",
    maxH: t === "inside" ? "calc(100% - 7.5rem)" : void 0,
    [Va.variable]: "colors.white",
    [Ua.variable]: "shadows.lg",
    _dark: {
      [Va.variable]: "colors.gray.700",
      [Ua.variable]: "shadows.dark-lg"
    },
    bg: Va.reference,
    boxShadow: Ua.reference
  };
}, Jg = {
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
}, Zg = {
  position: "absolute",
  top: "2",
  insetEnd: "3"
}, eb = (e) => {
  const { scrollBehavior: r } = e;
  return {
    px: "6",
    py: "2",
    flex: "1",
    overflow: r === "inside" ? "auto" : void 0
  };
}, rb = {
  px: "6",
  py: "4"
}, tb = vo((e) => ({
  overlay: Xg,
  dialogContainer: or(Qg, e),
  dialog: or(Kg, e),
  header: Jg,
  closeButton: Zg,
  body: or(eb, e),
  footer: rb
}));
function $r(e) {
  return vo(e === "full" ? {
    dialog: {
      maxW: "100vw",
      minH: "$100vh",
      my: "0",
      borderRadius: "0"
    }
  } : {
    dialog: { maxW: e }
  });
}
var nb = {
  xs: $r("xs"),
  sm: $r("sm"),
  md: $r("md"),
  lg: $r("lg"),
  xl: $r("xl"),
  "2xl": $r("2xl"),
  "3xl": $r("3xl"),
  "4xl": $r("4xl"),
  "5xl": $r("5xl"),
  "6xl": $r("6xl"),
  full: $r("full")
}, ab = Gg({
  baseStyle: tb,
  sizes: nb,
  defaultProps: { size: "md" }
}), { defineMultiStyleConfig: ob, definePartsStyle: vl } = Ae(Mm.keys), Do = He("number-input-stepper-width"), gl = He("number-input-input-padding"), ib = Xr(Do).add("0.5rem").toString(), Ha = He("number-input-bg"), Ya = He("number-input-color"), qa = He("number-input-border-color"), sb = {
  [Do.variable]: "sizes.6",
  [gl.variable]: ib
}, lb = (e) => {
  var r, t;
  return (t = (r = or(xe.baseStyle, e)) == null ? void 0 : r.field) != null ? t : {};
}, cb = {
  width: Do.reference
}, db = {
  borderStart: "1px solid",
  borderStartColor: qa.reference,
  color: Ya.reference,
  bg: Ha.reference,
  [Ya.variable]: "colors.chakra-body-text",
  [qa.variable]: "colors.chakra-border-color",
  _dark: {
    [Ya.variable]: "colors.whiteAlpha.800",
    [qa.variable]: "colors.whiteAlpha.300"
  },
  _active: {
    [Ha.variable]: "colors.gray.200",
    _dark: {
      [Ha.variable]: "colors.whiteAlpha.300"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
}, ub = vl((e) => {
  var r;
  return {
    root: sb,
    field: (r = or(lb, e)) != null ? r : {},
    stepperGroup: cb,
    stepper: db
  };
});
function In(e) {
  var r, t, n;
  const a = (r = xe.sizes) == null ? void 0 : r[e], o = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  }, i = (n = (t = a.field) == null ? void 0 : t.fontSize) != null ? n : "md", u = nl.fontSizes[i];
  return vl({
    field: {
      ...a.field,
      paddingInlineEnd: gl.reference,
      verticalAlign: "top"
    },
    stepper: {
      fontSize: Xr(u).multiply(0.75).toString(),
      _first: {
        borderTopEndRadius: o[e]
      },
      _last: {
        borderBottomEndRadius: o[e],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  });
}
var fb = {
  xs: In("xs"),
  sm: In("sm"),
  md: In("md"),
  lg: In("lg")
}, mb = ob({
  baseStyle: ub,
  sizes: fb,
  variants: xe.variants,
  defaultProps: xe.defaultProps
}), Qi, hb = {
  ...(Qi = xe.baseStyle) == null ? void 0 : Qi.field,
  textAlign: "center"
}, vb = {
  lg: {
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  },
  md: {
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  },
  sm: {
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  },
  xs: {
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  }
}, Ki, Ji, gb = {
  outline: (e) => {
    var r, t, n;
    return (n = (t = or((r = xe.variants) == null ? void 0 : r.outline, e)) == null ? void 0 : t.field) != null ? n : {};
  },
  flushed: (e) => {
    var r, t, n;
    return (n = (t = or((r = xe.variants) == null ? void 0 : r.flushed, e)) == null ? void 0 : t.field) != null ? n : {};
  },
  filled: (e) => {
    var r, t, n;
    return (n = (t = or((r = xe.variants) == null ? void 0 : r.filled, e)) == null ? void 0 : t.field) != null ? n : {};
  },
  unstyled: (Ji = (Ki = xe.variants) == null ? void 0 : Ki.unstyled.field) != null ? Ji : {}
}, bb = {
  baseStyle: hb,
  sizes: vb,
  variants: gb,
  defaultProps: xe.defaultProps
}, { defineMultiStyleConfig: pb, definePartsStyle: yb } = Ae(Wm.keys), Bn = He("popper-bg"), Sb = He("popper-arrow-bg"), Zi = He("popper-arrow-shadow-color"), xb = { zIndex: 10 }, _b = {
  [Bn.variable]: "colors.white",
  bg: Bn.reference,
  [Sb.variable]: Bn.reference,
  [Zi.variable]: "colors.gray.200",
  _dark: {
    [Bn.variable]: "colors.gray.700",
    [Zi.variable]: "colors.whiteAlpha.300"
  },
  width: "xs",
  border: "1px solid",
  borderColor: "inherit",
  borderRadius: "md",
  boxShadow: "sm",
  zIndex: "inherit",
  _focusVisible: {
    outline: 0,
    boxShadow: "outline"
  }
}, wb = {
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
}, kb = {
  px: 3,
  py: 2
}, Cb = {
  px: 3,
  py: 2,
  borderTopWidth: "1px"
}, Tb = {
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2
}, Eb = yb({
  popper: xb,
  content: _b,
  header: wb,
  body: kb,
  footer: Cb,
  closeButton: Tb
}), $b = pb({
  baseStyle: Eb
}), { definePartsStyle: go, defineMultiStyleConfig: Rb } = Ae(Fm.keys), Ga = oe("drawer-bg"), Xa = oe("drawer-box-shadow");
function Pt(e) {
  return go(e === "full" ? {
    dialog: { maxW: "100vw", h: "100vh" }
  } : {
    dialog: { maxW: e }
  });
}
var Pb = {
  bg: "blackAlpha.600",
  zIndex: "overlay"
}, Fb = {
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
}, Ab = (e) => {
  const { isFullHeight: r } = e;
  return {
    ...r && { height: "100vh" },
    zIndex: "modal",
    maxH: "100vh",
    color: "inherit",
    [Ga.variable]: "colors.white",
    [Xa.variable]: "shadows.lg",
    _dark: {
      [Ga.variable]: "colors.gray.700",
      [Xa.variable]: "shadows.dark-lg"
    },
    bg: Ga.reference,
    boxShadow: Xa.reference
  };
}, Nb = {
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
}, Db = {
  position: "absolute",
  top: "2",
  insetEnd: "3"
}, zb = {
  px: "6",
  py: "2",
  flex: "1",
  overflow: "auto"
}, Ob = {
  px: "6",
  py: "4"
}, Ib = go((e) => ({
  overlay: Pb,
  dialogContainer: Fb,
  dialog: or(Ab, e),
  header: Nb,
  closeButton: Db,
  body: zb,
  footer: Ob
})), Bb = {
  xs: Pt("xs"),
  sm: Pt("md"),
  md: Pt("lg"),
  lg: Pt("2xl"),
  xl: Pt("4xl"),
  full: Pt("full")
}, Mb = Rb({
  baseStyle: Ib,
  sizes: Bb,
  defaultProps: {
    size: "xs"
  }
}), { definePartsStyle: Wb, defineMultiStyleConfig: Lb } = Ae(Am.keys), jb = {
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal"
}, Vb = {
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
}, Ub = {
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
}, Hb = Wb({
  preview: jb,
  input: Vb,
  textarea: Ub
}), Yb = Lb({
  baseStyle: Hb
}), { definePartsStyle: qb, defineMultiStyleConfig: Gb } = Ae(Nm.keys), Ot = oe("form-control-color"), Xb = {
  marginStart: "1",
  [Ot.variable]: "colors.red.500",
  _dark: {
    [Ot.variable]: "colors.red.300"
  },
  color: Ot.reference
}, Qb = {
  mt: "2",
  [Ot.variable]: "colors.gray.600",
  _dark: {
    [Ot.variable]: "colors.whiteAlpha.600"
  },
  color: Ot.reference,
  lineHeight: "normal",
  fontSize: "sm"
}, Kb = qb({
  container: {
    width: "100%",
    position: "relative"
  },
  requiredIndicator: Xb,
  helperText: Qb
}), Jb = Gb({
  baseStyle: Kb
}), { definePartsStyle: Zb, defineMultiStyleConfig: ep } = Ae(Dm.keys), It = oe("form-error-color"), rp = {
  [It.variable]: "colors.red.500",
  _dark: {
    [It.variable]: "colors.red.300"
  },
  color: It.reference,
  mt: "2",
  fontSize: "sm",
  lineHeight: "normal"
}, tp = {
  marginEnd: "0.5em",
  [It.variable]: "colors.red.500",
  _dark: {
    [It.variable]: "colors.red.300"
  },
  color: It.reference
}, np = Zb({
  text: rp,
  icon: tp
}), ap = ep({
  baseStyle: np
}), op = {
  fontSize: "md",
  marginEnd: "3",
  mb: "2",
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
}, ip = {
  baseStyle: op
}, sp = {
  fontFamily: "heading",
  fontWeight: "bold"
}, lp = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  },
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  },
  md: {
    fontSize: "xl",
    lineHeight: 1.2
  },
  sm: {
    fontSize: "md",
    lineHeight: 1.2
  },
  xs: {
    fontSize: "sm",
    lineHeight: 1.2
  }
}, cp = {
  baseStyle: sp,
  sizes: lp,
  defaultProps: {
    size: "xl"
  }
}, { defineMultiStyleConfig: dp, definePartsStyle: up } = Ae(Rm.keys), Qa = oe("breadcrumb-link-decor"), fp = {
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  outline: "none",
  color: "inherit",
  textDecoration: Qa.reference,
  [Qa.variable]: "none",
  "&:not([aria-current=page])": {
    cursor: "pointer",
    _hover: {
      [Qa.variable]: "underline"
    },
    _focusVisible: {
      boxShadow: "outline"
    }
  }
}, mp = up({
  link: fp
}), hp = dp({
  baseStyle: mp
}), vp = {
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
}, bl = (e) => {
  const { colorScheme: r, theme: t } = e;
  if (r === "gray")
    return {
      color: G("inherit", "whiteAlpha.900")(e),
      _hover: {
        bg: G("gray.100", "whiteAlpha.200")(e)
      },
      _active: { bg: G("gray.200", "whiteAlpha.300")(e) }
    };
  const n = Wt(`${r}.200`, 0.12)(t), a = Wt(`${r}.200`, 0.24)(t);
  return {
    color: G(`${r}.600`, `${r}.200`)(e),
    bg: "transparent",
    _hover: {
      bg: G(`${r}.50`, n)(e)
    },
    _active: {
      bg: G(`${r}.100`, a)(e)
    }
  };
}, gp = (e) => {
  const { colorScheme: r } = e, t = G("gray.200", "whiteAlpha.300")(e);
  return {
    border: "1px solid",
    borderColor: r === "gray" ? t : "currentColor",
    ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)": { marginEnd: "-1px" },
    ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)": { marginBottom: "-1px" },
    ...or(bl, e)
  };
}, bp = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
}, pp = (e) => {
  var r;
  const { colorScheme: t } = e;
  if (t === "gray") {
    const h = G("gray.100", "whiteAlpha.200")(e);
    return {
      bg: h,
      _hover: {
        bg: G("gray.200", "whiteAlpha.300")(e),
        _disabled: {
          bg: h
        }
      },
      _active: { bg: G("gray.300", "whiteAlpha.400")(e) }
    };
  }
  const {
    bg: n = `${t}.500`,
    color: a = "white",
    hoverBg: o = `${t}.600`,
    activeBg: i = `${t}.700`
  } = (r = bp[t]) != null ? r : {}, u = G(n, `${t}.200`)(e);
  return {
    bg: u,
    color: G(a, "gray.800")(e),
    _hover: {
      bg: G(o, `${t}.300`)(e),
      _disabled: {
        bg: u
      }
    },
    _active: { bg: G(i, `${t}.400`)(e) }
  };
}, yp = (e) => {
  const { colorScheme: r } = e;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: G(`${r}.500`, `${r}.200`)(e),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: G(`${r}.700`, `${r}.500`)(e)
    }
  };
}, Sp = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0"
}, xp = {
  ghost: bl,
  outline: gp,
  solid: pp,
  link: yp,
  unstyled: Sp
}, _p = {
  lg: {
    h: "12",
    minW: "12",
    fontSize: "lg",
    px: "6"
  },
  md: {
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "4"
  },
  sm: {
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3"
  },
  xs: {
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2"
  }
}, wp = {
  baseStyle: vp,
  variants: xp,
  sizes: _p,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray"
  }
}, { definePartsStyle: xt, defineMultiStyleConfig: kp } = Ae(Qm.keys), la = oe("card-bg"), Kr = oe("card-padding"), pl = oe("card-shadow"), Xn = oe("card-radius"), yl = oe("card-border-width", "0"), Sl = oe("card-border-color"), Cp = xt({
  container: {
    [la.variable]: "colors.chakra-body-bg",
    backgroundColor: la.reference,
    boxShadow: pl.reference,
    borderRadius: Xn.reference,
    color: "chakra-body-text",
    borderWidth: yl.reference,
    borderColor: Sl.reference
  },
  body: {
    padding: Kr.reference,
    flex: "1 1 0%"
  },
  header: {
    padding: Kr.reference
  },
  footer: {
    padding: Kr.reference
  }
}), Tp = {
  sm: xt({
    container: {
      [Xn.variable]: "radii.base",
      [Kr.variable]: "space.3"
    }
  }),
  md: xt({
    container: {
      [Xn.variable]: "radii.md",
      [Kr.variable]: "space.5"
    }
  }),
  lg: xt({
    container: {
      [Xn.variable]: "radii.xl",
      [Kr.variable]: "space.7"
    }
  })
}, Ep = {
  elevated: xt({
    container: {
      [pl.variable]: "shadows.base",
      _dark: {
        [la.variable]: "colors.gray.700"
      }
    }
  }),
  outline: xt({
    container: {
      [yl.variable]: "1px",
      [Sl.variable]: "colors.chakra-border-color"
    }
  }),
  filled: xt({
    container: {
      [la.variable]: "colors.chakra-subtle-bg"
    }
  }),
  unstyled: {
    body: {
      [Kr.variable]: 0
    },
    header: {
      [Kr.variable]: 0
    },
    footer: {
      [Kr.variable]: 0
    }
  }
}, $p = kp({
  baseStyle: Cp,
  variants: Ep,
  sizes: Tp,
  defaultProps: {
    variant: "elevated",
    size: "md"
  }
}), vn = He("close-button-size"), an = He("close-button-bg"), Rp = {
  w: [vn.reference],
  h: [vn.reference],
  borderRadius: "md",
  transitionProperty: "common",
  transitionDuration: "normal",
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    [an.variable]: "colors.blackAlpha.100",
    _dark: {
      [an.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [an.variable]: "colors.blackAlpha.200",
    _dark: {
      [an.variable]: "colors.whiteAlpha.200"
    }
  },
  _focusVisible: {
    boxShadow: "outline"
  },
  bg: an.reference
}, Pp = {
  lg: {
    [vn.variable]: "sizes.10",
    fontSize: "md"
  },
  md: {
    [vn.variable]: "sizes.8",
    fontSize: "xs"
  },
  sm: {
    [vn.variable]: "sizes.6",
    fontSize: "2xs"
  }
}, Fp = {
  baseStyle: Rp,
  sizes: Pp,
  defaultProps: {
    size: "md"
  }
}, { variants: Ap, defaultProps: Np } = mn, Dp = {
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm",
  bg: je.bg.reference,
  color: je.color.reference,
  boxShadow: je.shadow.reference
}, zp = {
  baseStyle: Dp,
  variants: Ap,
  defaultProps: Np
}, Op = {
  w: "100%",
  mx: "auto",
  maxW: "prose",
  px: "4"
}, Ip = {
  baseStyle: Op
}, Bp = {
  opacity: 0.6,
  borderColor: "inherit"
}, Mp = {
  borderStyle: "solid"
}, Wp = {
  borderStyle: "dashed"
}, Lp = {
  solid: Mp,
  dashed: Wp
}, jp = {
  baseStyle: Bp,
  variants: Lp,
  defaultProps: {
    variant: "solid"
  }
}, { definePartsStyle: Vp, defineMultiStyleConfig: Up } = Ae(Tm.keys), Hp = {
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
}, Yp = {
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "md",
  _focusVisible: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: "4",
  py: "2"
}, qp = {
  pt: "2",
  px: "4",
  pb: "5"
}, Gp = {
  fontSize: "1.25em"
}, Xp = Vp({
  container: Hp,
  button: Yp,
  panel: qp,
  icon: Gp
}), Qp = Up({ baseStyle: Xp }), { definePartsStyle: kn, defineMultiStyleConfig: Kp } = Ae(Em.keys), gr = oe("alert-fg"), Jr = oe("alert-bg"), Jp = kn({
  container: {
    bg: Jr.reference,
    px: "4",
    py: "3"
  },
  title: {
    fontWeight: "bold",
    lineHeight: "6",
    marginEnd: "2"
  },
  description: {
    lineHeight: "6"
  },
  icon: {
    color: gr.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "6"
  },
  spinner: {
    color: gr.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "5"
  }
});
function zo(e) {
  const { theme: r, colorScheme: t } = e, n = Wt(`${t}.200`, 0.16)(r);
  return {
    light: `colors.${t}.100`,
    dark: n
  };
}
var Zp = kn((e) => {
  const { colorScheme: r } = e, t = zo(e);
  return {
    container: {
      [gr.variable]: `colors.${r}.500`,
      [Jr.variable]: t.light,
      _dark: {
        [gr.variable]: `colors.${r}.200`,
        [Jr.variable]: t.dark
      }
    }
  };
}), e0 = kn((e) => {
  const { colorScheme: r } = e, t = zo(e);
  return {
    container: {
      [gr.variable]: `colors.${r}.500`,
      [Jr.variable]: t.light,
      _dark: {
        [gr.variable]: `colors.${r}.200`,
        [Jr.variable]: t.dark
      },
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: gr.reference
    }
  };
}), r0 = kn((e) => {
  const { colorScheme: r } = e, t = zo(e);
  return {
    container: {
      [gr.variable]: `colors.${r}.500`,
      [Jr.variable]: t.light,
      _dark: {
        [gr.variable]: `colors.${r}.200`,
        [Jr.variable]: t.dark
      },
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: gr.reference
    }
  };
}), t0 = kn((e) => {
  const { colorScheme: r } = e;
  return {
    container: {
      [gr.variable]: "colors.white",
      [Jr.variable]: `colors.${r}.500`,
      _dark: {
        [gr.variable]: "colors.gray.900",
        [Jr.variable]: `colors.${r}.200`
      },
      color: gr.reference
    }
  };
}), n0 = {
  subtle: Zp,
  "left-accent": e0,
  "top-accent": r0,
  solid: t0
}, a0 = Kp({
  baseStyle: Jp,
  variants: n0,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue"
  }
}), { definePartsStyle: xl, defineMultiStyleConfig: o0 } = Ae($m.keys), Bt = oe("avatar-border-color"), Ka = oe("avatar-bg"), i0 = {
  borderRadius: "full",
  border: "0.2em solid",
  [Bt.variable]: "white",
  _dark: {
    [Bt.variable]: "colors.gray.800"
  },
  borderColor: Bt.reference
}, s0 = {
  [Ka.variable]: "colors.gray.200",
  _dark: {
    [Ka.variable]: "colors.whiteAlpha.400"
  },
  bgColor: Ka.reference
}, es = oe("avatar-background"), l0 = (e) => {
  const { name: r, theme: t } = e, n = r ? gh({ string: r }) : "colors.gray.400", a = hh(n)(t);
  let o = "white";
  return a || (o = "gray.800"), {
    bg: es.reference,
    "&:not([data-loaded])": {
      [es.variable]: n
    },
    color: o,
    [Bt.variable]: "colors.white",
    _dark: {
      [Bt.variable]: "colors.gray.800"
    },
    borderColor: Bt.reference,
    verticalAlign: "top"
  };
}, c0 = xl((e) => ({
  badge: or(i0, e),
  excessLabel: or(s0, e),
  container: or(l0, e)
}));
function ot(e) {
  const r = e !== "100%" ? ol[e] : void 0;
  return xl({
    container: {
      width: e,
      height: e,
      fontSize: `calc(${r ?? e} / 2.5)`
    },
    excessLabel: {
      width: e,
      height: e
    },
    label: {
      fontSize: `calc(${r ?? e} / 2.5)`,
      lineHeight: e !== "100%" ? r ?? e : void 0
    }
  });
}
var d0 = {
  "2xs": ot(4),
  xs: ot(6),
  sm: ot(8),
  md: ot(12),
  lg: ot(16),
  xl: ot(24),
  "2xl": ot(32),
  full: ot("100%")
}, u0 = o0({
  baseStyle: c0,
  sizes: d0,
  defaultProps: { size: "md" }
}), f0 = {
  Accordion: Qp,
  Alert: a0,
  Avatar: u0,
  Badge: mn,
  Breadcrumb: hp,
  Button: wp,
  Checkbox: sa,
  CloseButton: Fp,
  Code: zp,
  Container: Ip,
  Divider: jp,
  Drawer: Mb,
  Editable: Yb,
  Form: Jb,
  FormError: ap,
  FormLabel: ip,
  Heading: cp,
  Input: xe,
  Kbd: Pg,
  Link: Ag,
  List: Ig,
  Menu: qg,
  Modal: ab,
  NumberInput: mb,
  PinInput: bb,
  Popover: $b,
  Progress: Ov,
  Radio: Xv,
  Select: tg,
  Skeleton: ag,
  SkipLink: ig,
  Slider: bg,
  Spinner: Sg,
  Stat: $g,
  Switch: Ah,
  Table: Mh,
  Tabs: ev,
  Tag: mv,
  Textarea: Cv,
  Tooltip: $v,
  Card: $p,
  Stepper: Cm
}, m0 = {
  colors: {
    "chakra-body-text": { _light: "gray.800", _dark: "whiteAlpha.900" },
    "chakra-body-bg": { _light: "white", _dark: "gray.800" },
    "chakra-border-color": { _light: "gray.200", _dark: "whiteAlpha.300" },
    "chakra-inverse-text": { _light: "white", _dark: "gray.800" },
    "chakra-subtle-bg": { _light: "gray.100", _dark: "gray.700" },
    "chakra-subtle-text": { _light: "gray.600", _dark: "gray.400" },
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" }
  }
}, h0 = {
  global: {
    body: {
      fontFamily: "body",
      color: "chakra-body-text",
      bg: "chakra-body-bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: "chakra-placeholder-color"
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color"
    }
  }
}, v0 = "ltr", g0 = {
  useSystemColorMode: !1,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
}, ca = {
  semanticTokens: m0,
  direction: v0,
  ...Nf,
  components: f0,
  styles: h0,
  config: g0
}, rs;
const b0 = {
  baseStyle: {
    ...ca.components.Heading.baseStyle,
    ...(rs = ca.components.Heading.sizes) == null ? void 0 : rs.xl,
    textAlign: "center",
    lineHeight: 1.1,
    mb: 3
  }
};
var ts;
const p0 = {
  baseStyle: {
    ...ca.components.Heading.baseStyle,
    ...(ts = ca.components.Heading.sizes) == null ? void 0 : ts.sm,
    textAlign: "center",
    fontStyle: "italic",
    color: "gray.400"
  }
}, y0 = ac({
  baseStyle: {
    width: "100%",
    height: "2px",
    backgroundColor: "gray.300",
    marginTop: "1.2em",
    marginBottom: "1.5em"
  }
}), S0 = [
  // alert message (when no questions are available)
  "alert",
  // question wrapper
  "question",
  // question title
  "title",
  // question description
  "description",
  // form radio group
  "radioGroup",
  // questions stack
  "stack",
  // form radio
  "radio",
  // form error message
  "error"
], { defineMultiStyleConfig: x0, definePartsStyle: _0 } = oc(S0), w0 = _0({
  question: {
    marginBottom: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: "xl",
    marginBottom: 1
  },
  description: {
    marginBottom: 4
  }
}), k0 = x0({
  baseStyle: w0
}), O0 = {
  components: {
    ElectionTitle: b0,
    ElectionSchedule: p0,
    HorizontalRuler: y0,
    Questions: k0
  }
};
export {
  F0 as Balance,
  is as ClientContext,
  P0 as ClientProvider,
  sf as Election,
  Js as ElectionContext,
  eu as ElectionDescription,
  Zd as ElectionHeader,
  Zs as ElectionProvider,
  $s as ElectionSchedule,
  p0 as ElectionScheduleTheme,
  ru as ElectionStatusBadge,
  Es as ElectionTitle,
  b0 as ElectionTitleTheme,
  cs as HR,
  So as Image,
  fa as Markdown,
  cf as Organization,
  N0 as OrganizationAvatar,
  rl as OrganizationContext,
  D0 as OrganizationDescription,
  z0 as OrganizationHeader,
  el as OrganizationName,
  tl as OrganizationProvider,
  Qs as QuestionField,
  rf as QuestionsForm,
  k0 as QuestionsTheme,
  af as VoteButton,
  Ec as linkify,
  S0 as questionsAnatomy,
  O0 as theme,
  po as useClientContext,
  uc as useClientProvider,
  lt as useElection,
  of as useElectionProvider,
  ga as useOrganization,
  lf as useOrganizationProvider
};
//# sourceMappingURL=index.es.js.map
