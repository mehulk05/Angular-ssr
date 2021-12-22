import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './public/landingpage/landingpage.component';
import { WebsiteComponent } from './public/website/website.component';

const routes: Routes = [
  {path:'landingpage', component:LandingpageComponent},
  {
    path: "",
    component: AppComponent

  },
  {path:'website', component:WebsiteComponent},
  { path: '**', redirectTo: '/' },
  // { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
