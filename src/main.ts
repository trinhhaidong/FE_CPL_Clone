import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { appConfig } from './routers/app.config';
import { firebaseConfig } from './routers/firebase.config';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    appConfig.providers
  ]
}).catch(err => console.error(err));
