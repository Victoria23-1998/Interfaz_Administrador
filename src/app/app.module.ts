import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PageModule } from './dasboard/pages/page.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VigilanteGuard } from './vigilante.guard';
import { ComponentsModule } from './dasboard/components/components.module';
import { MaterialModule } from './material/material.module';
import { HttpClient } from '@angular/common/http';
import 'animate.css';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PageModule,
    MatSlideToggleModule,
    MaterialModule 
   
  ],
  providers: [VigilanteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
