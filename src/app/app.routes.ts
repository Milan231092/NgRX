import { Routes } from '@angular/router';  
import { HomeComponent } from './home/home.component';  

export const routes: Routes = [  
  { path: '', component: HomeComponent },  
  {  
    path: 'messages',  
    loadChildren: () =>  
      import('./messages/messages.routes').then((r) => r.MESSAGES_ROUTES),  
  },  
  { path: '**', redirectTo: '' },  
];  