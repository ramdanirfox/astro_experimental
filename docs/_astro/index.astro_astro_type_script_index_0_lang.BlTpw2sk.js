import{__decorate as e,b as t,i as n,i$1 as r,r as i,t as a}from"./decorate.BpmdFpJB.js";var o=class extends n{constructor(...e){super(...e),this.count=0}static{this.styles=r`
		:host {
			display: flex;
			align-items: center;
			gap: 12px;
		}
		pre {
			margin: 0;
			min-width: 2ch;
			text-align: center;
			font-size: 1.4rem;
		}
		button {
			font: inherit;
			color: inherit;
			background: transparent;
			border: 1px solid var(--line, #ccc);
			border-radius: 8px;
			padding: 4px 12px;
			cursor: pointer;
		}
		button:hover {
			border-color: var(--accent, #5b4bff);
		}
	`}render(){return t`
			<button @click=${()=>this.count--}>-</button>
			<pre>${this.count}</pre>
			<button @click=${()=>this.count++}>+</button>
		`}};e([i()],o.prototype,`count`,void 0),o=e([a(`lit-counter`)],o);