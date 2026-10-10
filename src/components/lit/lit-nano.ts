import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { StoreController } from '@nanostores/lit';
import { countStore, doubleStore } from '../../lib/nano-store';

/** A plain custom element (not an Astro island); children stay in the light DOM via <slot>. */
@customElement('lit-nano')
export class LitNano extends LitElement {
	// Shadow DOM: the page's global .frame styles do not reach in, so they are repeated here.
	static styles = css`
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
	`;

	@property() label = '';
	@property({ type: Number }) depth = 0;
	@state() private clicks = 0;

	// @nanostores/lit: a reactive controller. It subscribes while connected and requests
	// a re-render on every change; .value is always current.
	private count = new StoreController(this, countStore);
	private double = new StoreController(this, doubleStore);

	render() {
		return html`<div class="frame">
			<div class="head">
				<b>Lit</b>
				<span>depth ${this.depth}</span>
				<span>glue: <code>StoreController</code></span>
				<span>count=<output>${this.count.value}</output></span>
				<span>×2=<output>${this.double.value}</output></span>
				<button type="button" @click=${() => this.clicks++}>local +1 (${this.clicks})</button>
				<button type="button" @click=${() => countStore.set(this.count.value + 1)}>
					store +1
				</button>
			</div>
			<div class="body"><slot></slot></div>
		</div>`;
	}
}
