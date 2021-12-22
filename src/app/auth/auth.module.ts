import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { PagesModule } from './pages/pages.module';
import 'animate.css';

@NgModule({
  declarations: [
    AuthComponent
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PagesModule,
    
    
  ]
})
export class AuthModule { }
