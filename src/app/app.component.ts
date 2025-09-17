import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  protected readonly title = signal('tourism');

  // 👇 Added for responsive navbar
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}