import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { TravelComponent } from './travel/travel.component';
import { RegistrationComponent } from './registration/registration.component';
import { HistoryTravelComponent } from './history-travel/history-travel.component';
import { ListsComponent } from './lists/lists.component';
import { ComponentsModule } from '../components/components.module';

import 'animate.css';
import { VigilanteGuard } from 'src/app/vigilante.guard';
@NgModule({
  declarations: [ RegistrationComponent,TravelComponent,
    HistoryTravelComponent,ListsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    ComponentsModule 
  ],
  exports:[RegistrationComponent,TravelComponent,
    HistoryTravelComponent,ListsComponent],
  providers:[VigilanteGuard]
})
export class PageModule { }
