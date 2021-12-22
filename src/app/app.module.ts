import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { WebsiteComponent } from './public/website/website.component';
import { WebsiteSsrComponent } from './public/website-ssr/website-ssr.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    WebsiteComponent,
    WebsiteSsrComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
