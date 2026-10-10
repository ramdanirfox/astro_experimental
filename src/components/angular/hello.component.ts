import 'zone.js';
import { Component, Input, type OnInit} from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  template: `
  <div class="counter">

    @if (show) {
      <span>{{ helpText }}</span>
    }

    <button (click)="toggle()">Toggle</button>
  </div>
  `,
})
export class HelloComponent implements OnInit {
  @Input() helpText = 'Angular says hi';
  // static clientProviders = [provideHttpClient()];
  // static renderProviders = [HelloComponent.clientProviders];

  // http = inject(HttpClient);

  show = false;

  toggle() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    console.log('HelloComponent initialized');
  }
}