import { NgIf } from '@angular/common';
import { Component, Input, type OnInit, inject } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [NgIf],
  template: `
  <div style="backgroud-color: lightblue; padding: 10px; border-radius: 5px;">
    <p>Angular!!</p>

    <p *ngIf="show">{{ helpText }}</p>

    <button (click)="toggle()">Toggle</button>
  </div>
  `,
})
export class HelloComponent implements OnInit {
  @Input() helpText = 'help';
  static clientProviders = [provideHttpClient()];
  static renderProviders = [HelloComponent.clientProviders];

  http = inject(HttpClient);

  show = false;

  toggle() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    console.log('HelloComponent initialized');
  }
}