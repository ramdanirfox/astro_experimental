import{__commonJSMin as e}from"./rolldown-runtime.8o6kW9Pg.js";import{countStore as t,doubleStore as n}from"./nano-store.BCKj_mHY.js";import{htmx as r}from"./htmx.esm.DPrQmwNd.js";import{__decorate as i,b as a,i as o,i$1 as s,n as c,r as l,t as u}from"./decorate.BpmdFpJB.js";var d=e((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.StoreController=void 0,e.StoreController=class{constructor(e,t){this.host=e,this.atom=t,e.addController(this)}hostConnected(){this.unsubscribe=this.atom.subscribe(()=>{this.host.requestUpdate()})}hostDisconnected(){this.unsubscribe?.call(this)}get value(){return this.atom.get()}}})),f=e((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.MultiStoreController=void 0,e.MultiStoreController=class{constructor(e,t){this.host=e,this.atoms=t,e.addController(this)}hostConnected(){this.unsubscribes=this.atoms.map(e=>e.subscribe(()=>this.host.requestUpdate()))}hostDisconnected(){this.unsubscribes?.forEach(e=>e())}get values(){return this.atoms.map(e=>e.get())}}})),p=e((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.useStores=void 0;var t=f();function n(...e){return n=>class extends n{constructor(...n){super(...n),new t.MultiStoreController(this,e)}}}e.useStores=n})),m=e((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.withStores=void 0;var t=f();e.withStores=(e,n)=>class extends e{constructor(...e){super(...e),new t.MultiStoreController(this,n)}}})),h=e((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.withStores=e.useStores=e.MultiStoreController=e.StoreController=void 0;var t=d();Object.defineProperty(e,`StoreController`,{enumerable:!0,get:function(){return t.StoreController}});var n=f();Object.defineProperty(e,`MultiStoreController`,{enumerable:!0,get:function(){return n.MultiStoreController}});var r=p();Object.defineProperty(e,`useStores`,{enumerable:!0,get:function(){return r.useStores}});var i=m();Object.defineProperty(e,`withStores`,{enumerable:!0,get:function(){return i.withStores}})}))(),g=class extends o{constructor(...e){super(...e),this.label=``,this.depth=0,this.clicks=0,this.count=new h.StoreController(this,t),this.double=new h.StoreController(this,n)}static{this.styles=s`
		.frame {
			border: 1px solid var(--accent, #5b4bff);
			border-radius: 10px;
			padding: 8px 10px;
			background: color-mix(in srgb, var(--accent, #5b4bff) 4%, transparent);
		}
		.head {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 4px 12px;
			font-size: 0.8rem;
			color: var(--muted, #666);
		}
		b {
			color: var(--accent, #5b4bff);
		}
		output {
			color: var(--ink, #111);
			font-weight: 600;
		}
		button {
			font: inherit;
			color: inherit;
			background: transparent;
			border: 1px solid var(--line, #ccc);
			border-radius: 8px;
			padding: 1px 8px;
			cursor: pointer;
		}
		.body {
			display: flex;
			flex-direction: column;
			gap: 8px;
			margin-top: 8px;
		}
	`}render(){return a`<div class="frame">
			<div class="head">
				<b>Lit</b>
				<span>depth ${this.depth}</span>
				<span>glue: <code>StoreController</code></span>
				<span>count=<output>${this.count.value}</output></span>
				<span>×2=<output>${this.double.value}</output></span>
				<button type="button" @click=${()=>this.clicks++}>local +1 (${this.clicks})</button>
				<button type="button" @click=${()=>t.set(this.count.value+1)}>
					store +1
				</button>
			</div>
			<div class="body"><slot></slot></div>
		</div>`}};i([c()],g.prototype,`label`,void 0),i([c({type:Number})],g.prototype,`depth`,void 0),i([l()],g.prototype,`clicks`,void 0),g=i([u(`lit-nano`)],g),document.querySelectorAll(`astro-island[ssr]:not([renderer-url])`).forEach(e=>{e.removeAttribute(`ssr`),e.dispatchEvent(new CustomEvent(`astro:hydrate`))});var _=(e,t)=>document.querySelectorAll(e).forEach(e=>{let n=String(t);e.textContent!==n&&(e.textContent=n)}),v=()=>{_(`[data-nano-count]`,t.get()),_(`[data-nano-double]`,n.get())};t.subscribe(v),n.subscribe(v),document.addEventListener(`click`,e=>{e.target.closest(`[data-nano-inc]`)&&t.set(t.get()+1)}),document.getElementById(`inc`).addEventListener(`click`,()=>t.set(t.get()+1)),document.getElementById(`dec`).addEventListener(`click`,()=>t.set(t.get()-1)),document.getElementById(`reset`).addEventListener(`click`,()=>t.set(0));var y=document.getElementById(`b`),b;new MutationObserver(()=>{clearTimeout(b),b=window.setTimeout(()=>{v(),r.process(y)},50)}).observe(y,{childList:!0,subtree:!0});