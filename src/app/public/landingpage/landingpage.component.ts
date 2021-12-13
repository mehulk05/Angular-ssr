import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MetaService } from 'src/app/services/meta.service';

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
    private sanitizer: DomSanitizer,
    private metaService:MetaService){

  }

  ngOnInit(): void {
    this.metaService.setCanonicalURL()
    this.metaService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.apiService.getLandingPage(723,11921).subscribe((data:any)=>{
      this.landingPage = this.sanitizer.bypassSecurityTrustHtml(data.landingPageTemplate)
      console.log(data);
      this.metaService.updateTitle(data.name);
      this.metaService.updateDescription(data.landingPageTemplate)
     
    })
      
  }

}
