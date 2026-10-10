import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { sharedStore } from '../../lib/shared-store';

// Signal inputs plus outputs: Angular's prop drilling.
@Component({
  selector: 'app-grandchild',
  standalone: true,
  template: `
    <div class="node">
      <span class="tag">Grandchild</span>
      count={{ count() }}, message="{{ message() }}"
      <button (click)="inc.emit()">+1</button>
    </div>
  `,
})
export class GrandchildComponent {
  count = input.required<number>();
  message = input.required<string>();
  inc = output<void>();
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandchildComponent],
  template: `
    <div class="node">
      <span class="tag">Child</span>
      <app-grandchild [count]="count()" [message]="message()" (inc)="inc.emit()" />
    </div>
  `,
})
export class ChildComponent {
  count = input.required<number>();
  message = input.required<string>();
  inc = output<void>();
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div class="node">
      <span class="tag">Parent</span>
      <app-child [count]="count()" [message]="message()" (inc)="inc.emit()" />
    </div>
  `,
})
export class ParentComponent {
  count = input.required<number>();
  message = input.required<string>();
  inc = output<void>();
}

/** Root: a signal fed by the store. Signals are what drive zoneless change detection. */
@Component({
  selector: 'app-composition',
  standalone: true,
  imports: [ParentComponent],
  template: `<app-parent [count]="state().count" [message]="state().message" (inc)="inc()" />`,
})
export class CompositionComponent {
  state = signal(sharedStore.get());

  constructor() {
    inject(DestroyRef).onDestroy(sharedStore.onChange((s) => this.state.set(s)));
  }

  inc() {
    sharedStore.set({ count: this.state().count + 1 });
  }
}
