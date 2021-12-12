import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingpageComponent implements OnInit {
  title = 'angular-ssr';
  landingPage:any 
  constructor(
    private apiService:ApiServiceService,
    private sanitizer: DomSanitizer){

  }

  ngOnInit(): void {
    this.apiService.getLandingPage(723,11921).subscribe((data:any)=>{
      this.landingPage = this.sanitizer.bypassSecurityTrustHtml(data.landingPageTemplate)
      console.log(this.landingPage)
    })
      
  }

}
