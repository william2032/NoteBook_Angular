import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RegisterComponent
  ],
  template: `
    <div class="app-container">
      <!-- Optional: Navigation bar that shows/hides based on route -->
      <nav class="navbar" *ngIf="showNavigation">
        <div class="nav-content">
          <h1>My Notes App</h1>
          <div class="nav-actions">
          </div>
        </div>
      </nav>

      <!-- Main content area where components will be rendered -->
      <main class="main-content">
        <!--        <router-outlet></router-outlet>-->
        <app-register></app-register>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }

    .navbar {
      background-color: #1976d2;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-content h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 80px);
    }

    @media (max-width: 768px) {
      .nav-content {
        padding: 0 0.5rem;
      }

      .nav-content h1 {
        font-size: 1.2rem;
      }
    }
  `]
})
export class App {
  title = 'notes-app';

  // Control navigation visibility based on current route
  get showNavigation(): boolean {
    const currentPath = window.location.pathname;
    // Hide navigation on login/register pages
    return !currentPath.includes('/login') &&
      !currentPath.includes('/register');
  }
}
