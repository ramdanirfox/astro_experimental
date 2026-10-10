import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { countStore, doubleStore } from '../../lib/nano-store';

/**
 * A leaf (Angular's Astro integration drops children). @nanostores/angular exists but is
 * pinned to nanostores ^0.7, so this uses plain subscribe() feeding signals instead.
 */
@Component({
  selector: 'app-nano-leaf',
  standalone: true,
  template: `
    <div class="frame">
      <div class="frame-head">
        <b>Angular</b>
        <span>depth {{ depth() }}</span>
        <span>glue: <code>store.subscribe</code> → signal</span>
        <span>count=<output>{{ count() }}</output></span>
        <span>×2=<output>{{ double() }}</output></span>
        <button type="button" (click)="clicks.set(clicks() + 1)">local +1 ({{ clicks() }})</button>
        <button type="button" (click)="inc()">store +1</button>
      </div>
    </div>
  `,
})
export class NanoLeafComponent {
  label = input('');
  depth = input(0);
  count = signal(countStore.get());
  double = signal(doubleStore.get());
  clicks = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);
    // subscribe() calls back immediately and returns an unsubscribe function.
    destroyRef.onDestroy(countStore.subscribe((v) => this.count.set(v)));
    destroyRef.onDestroy(doubleStore.subscribe((v) => this.double.set(v)));
  }

  inc() {
    countStore.set(this.count() + 1);
  }
}
