import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-website-ssr',
  templateUrl: './website-ssr.component.html',
  styleUrls: ['./website-ssr.component.css']
})
export class WebsiteSsrComponent implements OnInit {
  serviceData:any=[]
  usersData:any= []
  website:any
  domainUrl: String = ''
  bid: any;
  lpid: any;
  constructor(
    private apiService:ApiServiceService,
    private sanitizer: DomSanitizer,
    private metaService:MetaService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
      this.getWebsite(723, 15211)
    this.metaService.setCanonicalURL()
    this.metaService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.getServices(723,0)
    this.getUsers(723)
  }

  getWebsite(bid: any, fid: any) {
    this.apiService.getWebiste(bid, fid).subscribe((data: any) => {
      this.website = this.sanitizer.bypassSecurityTrustHtml(data.landingPageTemplate)
      this.metaService.updateTitle(data.name);
    })
  }

  getServices(bid: any, lpid: any) {
    //this.service_html = this.rawData.indexOf('<div class="service-wrapper2">')

    this.apiService.getServices(bid).subscribe((data: any) => {
      this.serviceData = data
    })
  }

  getUsers(bid: any) {
    this.apiService.getUsers(bid).subscribe((data: any) => {
      this.usersData = data
      data = data.filter((provider: any) => {
        return provider.isProvider == true
      })
      this.setUsers(data)
    })
  }

  setUsers(data: any) {

    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        var str = "<div class='row mx-0'>"
        var domain = "https://" + this.domainUrl

        data.forEach((slide: any) => {

          let imgUrl = slide.profileImageUrl ? slide.profileImageUrl : 'https://g99plus.b-cdn.net/website1/profileDefault.png'
          let appointbookingUrl = domain + "/ap-booking?b=" + this.bid + "&lpid=" + this.lpid + "&u="
          appointbookingUrl += slide.id
          str += "<div class='col-lg-4 col-md-6  col-sm-12'>" +
            "<div class='img-wrapper4'> " +
            "<div class='img4'>" +
            " <img src='" + imgUrl + "' style='max-width:100%;width:100%;border-radius:12px'>" +

            "</div>" +
            "<div class='content4'>"
          str += "<p class='titlep' style='font-weight:700'>" + slide.firstName + "&nbsp" + slide.lastName + "</p>" +
            // "<p class='small-text'>" + slide.username + "</p>" +
            // "<p class='small-text'>" + slide.description + "</p>" +
            "<button class='btn btn-book' ><a target='_blank' href=" + appointbookingUrl + "> Book an appointment </a> </button>" +
            "</div></div></div>";
        });
        str += "</div>"
        console.log($("#users").html())
        console.log($(".div6").html())

        var bgColor = $('.btn-fixed').css("background-color");
        var color = $('.btn-fixed').css("color");

        console.log(bgColor, color)
        var bgColorLight = this.hexToRGB(bgColor, 1)
        $("#users").html(str);
      }
    }, 10)

    // $("#landingPage button.btn a").css("color", color);
    // $("#landingPage button.btn").css("background-color", bgColor);
    // $("#landingPage button.btn").css("color", color);
    // $("#landingPage #personalizedColor").css("background-color", bgColorLight);
  }

  hexToRGB(hex: string, alpha: any) {
    if (hex) {
      let resultcode = ""
      console.log("hex", hex)
      if (hex.startsWith("#")) {
        var r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);

        console.log(r, g, b)
        if (alpha) {
          resultcode = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
          resultcode = "rgb(" + r + ", " + g + ", " + b + ")";
        }
      } else {
        let new_col = hex.replace(/rgb/i, "rgba");
        resultcode = new_col.replace(/\)/i, ',0.2)');

      }

      return resultcode
    }
    return hex

  }

}

