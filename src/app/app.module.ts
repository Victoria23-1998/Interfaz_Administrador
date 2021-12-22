import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PageModule } from './dasboard/pages/page.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import 'animate.css';
import { VigilanteGuard } from './vigilante.guard';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
   
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PageModule,
    MatSlideToggleModule
   
  ],
  providers: [VigilanteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
