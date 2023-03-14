import { Component } from '@angular/core';
import { EveryLayout } from './every-layout/every-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'city-builder-v1';

  constructor() {
    const everyLayout = new EveryLayout();
  }
}
