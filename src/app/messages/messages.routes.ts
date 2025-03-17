import { Routes } from '@angular/router';  
import { provideState } from '@ngrx/store';  
import { provideEffects } from '@ngrx/effects';  
import { MessagesComponent } from './messages.component';  
import { messagesReducer } from './store/messages.reducer';  
import { MessagesEffects } from './store/messages.effects';  

export const MESSAGES_ROUTES: Routes = [  
  {  
    path: '',  
    component: MessagesComponent,  
    providers: [  
      provideState('messages', messagesReducer),  
      provideEffects(MessagesEffects),  
    ],  
  },  
];  