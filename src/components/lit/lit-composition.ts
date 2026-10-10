import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStore } from '../../lib/shared-store';

const nodeStyles = css`
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
`;

// Custom elements: properties go down, DOM events go up.
@customElement('lit-grandchild')
export class LitGrandchild extends LitElement {
	static styles = nodeStyles;
	@property({ type: Number }) count = 0;
	@property() message = '';

	render() {
		return html`<div class="node">
			<span class="tag">Grandchild</span>
			count=${this.count}, message="${this.message}"
			<button
				@click=${() =>
					this.dispatchEvent(new CustomEvent('inc', { bubbles: true, composed: true }))}
			>
				+1
			</button>
		</div>`;
	}
}

@customElement('lit-child')
export class LitChild extends LitElement {
	static styles = nodeStyles;
	@property({ type: Number }) count = 0;
	@property() message = '';

	render() {
		return html`<div class="node">
			<span class="tag">Child</span>
			<lit-grandchild .count=${this.count} .message=${this.message}></lit-grandchild>
		</div>`;
	}
}

@customElement('lit-parent')
export class LitParent extends LitElement {
	static styles = nodeStyles;
	@property({ type: Number }) count = 0;
	@property() message = '';

	render() {
		return html`<div class="node">
			<span class="tag">Parent</span>
			<lit-child .count=${this.count} .message=${this.message}></lit-child>
		</div>`;
	}
}

/** Root: a reactive @state fed by the store; changing it re-renders the subtree. */
@customElement('lit-composition')
export class LitComposition extends LitElement {
	@state() private shared = sharedStore.get();
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
		return html`<lit-parent
			.count=${this.shared.count}
			.message=${this.shared.message}
			@inc=${() => sharedStore.set({ count: sharedStore.get().count + 1 })}
		></lit-parent>`;
	}
}
