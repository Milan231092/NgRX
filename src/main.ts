import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MessagesEffects } from './app/messages/store/messages.effects';
import { messagesReducer } from './app/messages/store/messages.reducer';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideEffects(MessagesEffects),
    importProvidersFrom(MatSnackBarModule),
    provideStore({
      messages: messagesReducer,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes, withComponentInputBinding()),
  ],
}).catch((err) => console.error(err));
