import {NgModule} from '@angular/core';
import {RegisterComponent} from './components/register/register';
import {NotesListComponent} from './components/notes-list/notes-list';
import {LoginComponent} from './components/login/login.component';
import {NoteFormComponent} from './components/notes-form/notes-form';

@NgModule({
  declarations: [ ],
  imports: [
    RegisterComponent,
    NotesListComponent,
    LoginComponent,
    NoteFormComponent,
  ],
})
export class AppModule { }
