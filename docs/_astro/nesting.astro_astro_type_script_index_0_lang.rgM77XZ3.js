import{sharedStore as e}from"./shared-store.abwQMl6y.js";import{htmx as t}from"./htmx.esm.DPrQmwNd.js";import{__decorate as n,b as r,i,i$1 as a,n as o,r as s,t as c}from"./decorate.BpmdFpJB.js";var l=class extends i{constructor(...t){super(...t),this.label=``,this.depth=0,this.shared=e.get(),this.clicks=0}static{this.styles=a`
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
	`}connectedCallback(){super.connectedCallback(),this.shared=e.get(),this.off=e.onChange(e=>this.shared=e)}disconnectedCallback(){this.off?.(),super.disconnectedCallback()}render(){return r`<div class="frame">
			<div class="head">
				<b>Lit wrapper</b>
				<span>depth ${this.depth}</span>
				<span>prop label="${this.label}"</span>
				<span>store count=<output>${this.shared.count}</output></span>
				<button type="button" @click=${()=>this.clicks++}>local +1 (${this.clicks})</button>
				<button
					type="button"
					@click=${()=>e.set({count:this.shared.count+1})}
				>
					store +1
				</button>
			</div>
			<div class="body"><slot></slot></div>
		</div>`}};n([o()],l.prototype,`label`,void 0),n([o({type:Number})],l.prototype,`depth`,void 0),n([s()],l.prototype,`shared`,void 0),n([s()],l.prototype,`clicks`,void 0),l=n([c(`lit-wrapper`)],l),document.querySelectorAll(`astro-island[ssr]:not([renderer-url])`).forEach(e=>{e.removeAttribute(`ssr`),e.dispatchEvent(new CustomEvent(`astro:hydrate`))});var u=t=>e.set({count:e.get().count+t}),d=()=>{let t=String(e.get().count);document.querySelectorAll(`#count, [data-store-count]`).forEach(e=>{e.textContent!==t&&(e.textContent=t)})};e.subscribe(d),document.addEventListener(`click`,e=>{e.target.closest(`[data-store-inc]`)&&u(1)}),document.getElementById(`inc`).addEventListener(`click`,()=>u(1)),document.getElementById(`dec`).addEventListener(`click`,()=>u(-1)),document.getElementById(`reset`).addEventListener(`click`,()=>e.set({count:0}));var f=document.getElementById(`b`),p=()=>t.process(f),m;new MutationObserver(()=>{clearTimeout(m),m=window.setTimeout(()=>{d(),p()},50)}).observe(f,{childList:!0,subtree:!0});