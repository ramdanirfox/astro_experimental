import{sharedStore as e}from"./shared-store.abwQMl6y.js";import{__decorate as t,b as n,i as r,i$1 as i,n as a,r as o,t as s}from"./decorate.BpmdFpJB.js";var c=i`
	.node {
		border: 1px dashed var(--line, #ccc);
		border-radius: 8px;
		padding: 6px 8px;
		font-size: 0.78rem;
	}
	.tag {
		font-weight: 600;
		color: var(--accent, #5b4bff);
		margin-right: 6px;
	}
	.node .node {
		margin-top: 6px;
	}
	button {
		font: inherit;
		color: inherit;
		background: transparent;
		border: 1px solid var(--line, #ccc);
		border-radius: 8px;
		padding: 1px 8px;
		margin-left: 6px;
		cursor: pointer;
	}
`,l=class extends r{constructor(...e){super(...e),this.count=0,this.message=``}static{this.styles=c}render(){return n`<div class="node">
			<span class="tag">Grandchild</span>
			count=${this.count}, message="${this.message}"
			<button
				@click=${()=>this.dispatchEvent(new CustomEvent(`inc`,{bubbles:!0,composed:!0}))}
			>
				+1
			</button>
		</div>`}};t([a({type:Number})],l.prototype,`count`,void 0),t([a()],l.prototype,`message`,void 0),l=t([s(`lit-grandchild`)],l);var u=class extends r{constructor(...e){super(...e),this.count=0,this.message=``}static{this.styles=c}render(){return n`<div class="node">
			<span class="tag">Child</span>
			<lit-grandchild .count=${this.count} .message=${this.message}></lit-grandchild>
		</div>`}};t([a({type:Number})],u.prototype,`count`,void 0),t([a()],u.prototype,`message`,void 0),u=t([s(`lit-child`)],u);var d=class extends r{constructor(...e){super(...e),this.count=0,this.message=``}static{this.styles=c}render(){return n`<div class="node">
			<span class="tag">Parent</span>
			<lit-child .count=${this.count} .message=${this.message}></lit-child>
		</div>`}};t([a({type:Number})],d.prototype,`count`,void 0),t([a()],d.prototype,`message`,void 0),d=t([s(`lit-parent`)],d);var f=class extends r{constructor(...t){super(...t),this.shared=e.get()}connectedCallback(){super.connectedCallback(),this.shared=e.get(),this.off=e.onChange(e=>this.shared=e)}disconnectedCallback(){this.off?.(),super.disconnectedCallback()}render(){return n`<lit-parent
			.count=${this.shared.count}
			.message=${this.shared.message}
			@inc=${()=>e.set({count:e.get().count+1})}
		></lit-parent>`}};t([o()],f.prototype,`shared`,void 0),f=t([s(`lit-composition`)],f);var p=e=>document.getElementById(e),m=p(`count`),h=p(`message`);e.subscribe(e=>{m.textContent=String(e.count),document.activeElement!==h&&(h.value=e.message)}),p(`inc`).addEventListener(`click`,()=>e.set({count:e.get().count+1})),p(`dec`).addEventListener(`click`,()=>e.set({count:e.get().count-1})),p(`reset`).addEventListener(`click`,()=>e.set({count:0,message:`hello`})),h.addEventListener(`input`,()=>e.set({message:h.value}));