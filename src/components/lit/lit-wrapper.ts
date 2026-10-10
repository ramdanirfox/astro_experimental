import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStore } from '../../lib/shared-store';

/**
 * Not an Astro island: a plain custom element. Children written between its tags stay in
 * the light DOM and are projected through the native <slot>, so nested islands keep working.
 */
@customElement('lit-wrapper')
export class LitWrapper extends LitElement {
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
	@state() private shared = sharedStore.get();
	@state() private clicks = 0;
	private off?: () => void;

	connectedCallback() {
		super.connectedCallback();
		this.shared = sharedStore.get();
		this.off = sharedStore.onChange((s) => (this.shared = s));
	}

	disconnectedCallback() {
		this.off?.();
		super.disconnectedCallback();
	}

	render() {
		return html`<div class="frame">
			<div class="head">
				<b>Lit wrapper</b>
				<span>depth ${this.depth}</span>
				<span>prop label="${this.label}"</span>
				<span>store count=<output>${this.shared.count}</output></span>
				<button type="button" @click=${() => this.clicks++}>local +1 (${this.clicks})</button>
				<button
					type="button"
					@click=${() => sharedStore.set({ count: this.shared.count + 1 })}
				>
					store +1
				</button>
			</div>
			<div class="body"><slot></slot></div>
		</div>`;
	}
}
