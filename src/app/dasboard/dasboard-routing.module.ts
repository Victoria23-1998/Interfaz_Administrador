import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelComponent } from './pages/travel/travel.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HistoryTravelComponent } from './pages/history-travel/history-travel.component';
import { ListsComponent } from './pages/lists/lists.component';
const routes: Routes = [  
  {
    path: '',
    
    children: [{
      path: '',
      component:RegistrationComponent 
    },
    {
      path: 'registro',
      component: RegistrationComponent 
    },
    {
      path: 'historyTravel', component: HistoryTravelComponent
    },
    {
      path: 'travel', component: TravelComponent 
    },
    {
      path: 'lists', component: ListsComponent 
    },
    {
      path: '**',
      redirectTo: ''
    }],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
