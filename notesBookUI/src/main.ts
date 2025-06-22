import {bootstrapApplication} from '@angular/platform-browser';
// import {appConfig} from './app/app.config';
import {provideRouter} from '@angular/router';
import {App} from './app/app';

bootstrapApplication(App, {
    providers: [
      provideRouter([]),
    ]
  },
)
  .catch((err) => console.error(err));
