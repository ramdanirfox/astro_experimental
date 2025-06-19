import { r as reactExports } from './index.CeqRDuHd.js';

var jsxDevRuntime = {exports: {}};

var reactJsxDevRuntime_production = {};

/**
 * @license React
 * react-jsx-dev-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxDevRuntime_production;

function requireReactJsxDevRuntime_production () {
	if (hasRequiredReactJsxDevRuntime_production) return reactJsxDevRuntime_production;
	hasRequiredReactJsxDevRuntime_production = 1;
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	reactJsxDevRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxDevRuntime_production.jsxDEV = void 0;
	return reactJsxDevRuntime_production;
}

var hasRequiredJsxDevRuntime;

function requireJsxDevRuntime () {
	if (hasRequiredJsxDevRuntime) return jsxDevRuntime.exports;
	hasRequiredJsxDevRuntime = 1;
	{
	  jsxDevRuntime.exports = requireReactJsxDevRuntime_production();
	}
	return jsxDevRuntime.exports;
}

var jsxDevRuntimeExports = requireJsxDevRuntime();

function MyCounter({ children }) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    console.log("Counter React Rendered");
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { backgroundColor: "lightcyan", fontSize: "20px" }, children: "Cmp React" }, void 0, false, {
    fileName: "D:/projects/private/rfox/astro_experimental/src/components/react/counter-react.tsx",
    lineNumber: 19,
    columnNumber: 9
  }, this);
}

export { MyCounter as default };
//# sourceMappingURL=counter-react.DPD4Mxkl.js.map
