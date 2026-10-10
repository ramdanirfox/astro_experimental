import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { sharedStore } from '../../lib/shared-store';

/**
 * A leaf on purpose: @analogjs/astro-angular ignores the children Astro passes (both on the
 * server and in the browser), so an Angular island cannot wrap another island.
 */
@Component({
  selector: 'app-leaf',
  standalone: true,
  template: `
    <div class="frame">
      <div class="frame-head">
        <b>Angular leaf</b>
        <span>depth {{ depth() }}</span>
        <span>prop label="{{ label() }}"</span>
        <span>store count=<output>{{ state().count }}</output></span>
        <button type="button" (click)="clicks.set(clicks() + 1)">local +1 ({{ clicks() }})</button>
        <button type="button" (click)="inc()">store +1</button>
      </div>
    </div>
  `,
})
export class LeafComponent {
  label = input('');
  depth = input(0);
  state = signal(sharedStore.get());
  clicks = signal(0);

  constructor() {
    inject(DestroyRef).onDestroy(sharedStore.onChange((s) => this.state.set(s)));
  }

  inc() {
    sharedStore.set({ count: this.state().count + 1 });
  }
}
