import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/** A counter written with Lit (a standard custom element) */
@customElement('lit-counter')
export class LitCounter extends LitElement {
	static styles = css`
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
	`;

	@state() private count = 0;

	render() {
		return html`
			<button @click=${() => this.count--}>-</button>
			<pre>${this.count}</pre>
			<button @click=${() => this.count++}>+</button>
		`;
	}
}
