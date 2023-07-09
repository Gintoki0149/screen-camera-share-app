import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenShareComponent } from './MyComponents/screen-share/screen-share.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { ButtonPalletComponent } from './MyComponents/button-pallet/button-pallet.component';
import { DualscreenComponent } from './MyComponents/dualscreen/dualscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenShareComponent,
    HomeComponent,
    ButtonPalletComponent,
    DualscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component:AppComponent},
      {path:'screen-share',component:ScreenShareComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
