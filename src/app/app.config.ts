import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-6738c',
        appId: '1:734998430638:web:4f3c7b5bd258c0b1383e3f',
        storageBucket: 'little-linguist-6738c.appspot.com',
        apiKey: 'AIzaSyAoukzvr5nGplQSamytNy2V-VylksSDTpM',
        authDomain: 'little-linguist-6738c.firebaseapp.com',
        messagingSenderId: '734998430638',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
}