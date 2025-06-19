import { d as delegateEvents, c as createSignal, o as onMount, g as getNextElement, i as insert, r as runHydrationEvents, t as template } from './web.D3fW81Pq.js';

var _tmpl$ = /* @__PURE__ */ template(`<div id=solid class=counter><div>Solid</div><button>-</button><pre></pre><button>+`), _tmpl$2 = /* @__PURE__ */ template(`<div class=counter-message>`);
function SolidCounter(props) {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);
  const subtract = () => setCount(count() - 1);
  onMount(() => {
    console.log("Counter Solid Rendered");
  });
  return [(() => {
    var _el$ = getNextElement(_tmpl$), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling;
    _el$3.$$click = subtract;
    insert(_el$4, count);
    _el$5.$$click = add;
    runHydrationEvents();
    return _el$;
  })(), (() => {
    var _el$6 = getNextElement(_tmpl$2);
    insert(_el$6, () => props.children);
    return _el$6;
  })()];
}
delegateEvents(["click"]);

export { SolidCounter as default };
//# sourceMappingURL=SolidCounter.D4JIc79_.js.map
