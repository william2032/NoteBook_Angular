import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {GuestGuard} from './guards/guest.guard';
import {RegisterComponent} from './components/register/register';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Authentication routes (only accessible when NOT logged in)
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard] // Prevents access if already logged in
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard] // Prevents access if already logged in
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'notes',
    loadComponent: () => import('./components/notes-list/notes-list').then(m => m.NotesListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'notes/new',
    loadComponent: () => import('./components/notes-form/notes-form').then(m => m.NoteFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'notes/edit/:id',
    loadComponent: () => import('./components/notes-form/notes-form').then(m => m.NoteFormComponent),
    canActivate: [AuthGuard]
  },

  // Catch-all route - redirect to login
  {
    path: '**',
    redirectTo: '/login'
  }
];
