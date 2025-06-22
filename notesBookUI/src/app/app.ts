import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RegisterComponent} from './components/register/register';
import {NoteFormComponent} from './components/notes-form/notes-form';
import {LoginComponent} from './components/login/login.component';
import {NotesListComponent} from './components/notes-list/notes-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
  // , LoginComponent, NoteFormComponent, NotesListComponent
})
export class App {
  protected title = 'notesBookUI';
}
