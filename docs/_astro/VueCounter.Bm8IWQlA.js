import { d as defineComponent, c as createElementBlock, a as createBaseVNode, t as toDisplayString, r as renderSlot, F as Fragment, b as ref, o as openBlock } from './runtime-core.esm-bundler.CXXai6Kh.js';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VueCounter",
  setup(__props, { expose: __expose }) {
    __expose();
    const count = ref(0);
    const add = () => count.value = count.value + 1;
    const subtract = () => count.value = count.value - 1;
    const __returned__ = { count, add, subtract };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "counter" };
const _hoisted_2 = { class: "counter-message" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _cache[2] || (_cache[2] = createBaseVNode("div", null, "Vue", -1)),
      createBaseVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.subtract())
      }, "-"),
      createBaseVNode("pre", null, toDisplayString($setup.count), 1),
      createBaseVNode("button", {
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.add())
      }, "+")
    ]),
    createBaseVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 64);
}
const VueCounter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { VueCounter as default };
//# sourceMappingURL=VueCounter.Bm8IWQlA.js.map
