import { Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MetaService } from 'src/app/services/meta.service';
import * as $ from "jquery";
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  bid: any
  lpid: any
  website: any;
  service_html: any;
  serviceData: any
  rawData: any;
  domainUrl: String = ''
  buttonCss: any
  usersData: any;
  constructor(
    private apiService: ApiServiceService,
    private sanitizer: DomSanitizer,
    private metaService: MetaService,
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params, params.bid, params.fid)
    this.bid = this.activatedRoute.snapshot.queryParams[ 'bid' ];
    this.lpid = this.activatedRoute.snapshot.queryParams[ 'lpid' ];
    console.log(this.bid,this.lpid)
    this.getWebsite(this.bid,this.lpid)
    // });
    //   this.getWebsite(params.bid, params.lpid)
    //   this.bid = params.bid

    //   this.lpid = params.lpid
  }

  getWebsite(bid: any, fid: any) {
    this.apiService.getWebiste(bid, fid).subscribe((data: any) => {
      this.website = this.sanitizer.bypassSecurityTrustHtml(data.landingPageTemplate)
      this.buttonCss = data.buttonCSS
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(this.buttonCss));
      head.appendChild(style);
      this.rawData = data.landingPageTemplate
      this.domainUrl = this.getHostname(data.formUrl)
      this.embedChatBotCode(bid, fid)

      if (isPlatformBrowser(this.platformId)) {
        this.metaService.updateTitle(data.name)
        this.service_html = $(data.landingPageTemplate).find('.service-wrapper')
      }
      else {
        this.website = this.sanitizer.bypassSecurityTrustHtml(data.landingPageTemplate)
      }
      this.getServices(bid, fid);
    })
    this.updateMetaTags()

  }

  getServices(bid: any, lpid: any) {
    //this.service_html = this.rawData.indexOf('<div class="service-wrapper2">')

    this.apiService.getServices(bid).subscribe((data: any) => {
      console.log(data.chatBotEmbeddedCode )
      
      this.serviceData = data
      let service_created_html = ""
      if (isPlatformBrowser(this.platformId)) {
        this.redirectToGroth99(bid, lpid)
        data.forEach((slide: any) => {
          $(this.service_html).find('.stitle').text(slide.name);
          $(this.service_html).find('.sdescription').text(slide.description);
          var sdiv = this.service_html.html()
          service_created_html = service_created_html + sdiv

        });
        let index = this.rawData.indexOf('<div class="row mx-0" id="service-insert">')
        console.log(index)
        if (index == -1) {
          index = this.rawData.indexOf('<div id="service-insert" class="row mx-0">')
          console.log(index)
        }

        let str1 = this.rawData.substr(0, index) + '<div class="row mx-0" id="service-insert">' + service_created_html + "</div>" + this.rawData.substr(index);
        this.website = this.sanitizer.bypassSecurityTrustHtml(str1)
        this.getUsers(this.bid)
      }
      else {
      }

      this.setPersonalization()
    })
  }

  updateMetaTags() {
    this.metaService.setCanonicalURL()
    this.metaService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Mehul Kothari' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
  }

  redirectToGroth99(bid: string, lpid: any) {
    console.log("   this.domainUrl", this.domainUrl)
    let SymptomComposerUrl = 'https://' + this.domainUrl + '/assets/static/composer.html?bid=' + 783 + "&lpid=" + lpid

    $(document).on('click', 'button.btn-composer', function () {
      console.log($('.btn-composer').length)
      if ($('.btn-composer').length) {
        window.open(SymptomComposerUrl, '_blank');
      }
    });

    var ClinicUrl: any
    $(document).on('click', 'button.btn-fixed', function () {
      if ($('.btn-fixed').length) {
        window.open(ClinicUrl, '_blank');
      }
    });
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

  getHostname = (url: any) => {
    // use URL constructor and return hostname
    return new URL(url).hostname;
  }


  embedChatBotCode(bid: string, fid: string) {
    var cssUrl = environment.SERVER_API_URL + "/api/public/chatconfigs/css?bid=" + bid;
    let chatUrl = "https://" + this.domainUrl + "/business/" + bid + "/chat?fid=" + fid;

    let chatEmbededCode = '<link rel="stylesheet" href="' + cssUrl + '">' +
      '<div id="emr-chat-div" data-url="' + chatUrl + '" style="bottom: 0; position: fixed; margin: 1em; right: 0; z-index: 998;"></div>' +
      '<script src="https://' + this.domainUrl + '/assets/js/emr-chat.js"><\/script>';

    let chatBot = '<link rel="stylesheet" href="https://api.growthemr.com/api/public/chatconfigs/css?bid=723"><div id="emr-chat-div" data-url="https://devemr.growthemr.com/business/723/chat?fid=15211" style="bottom: 0; position: fixed; margin: 1em; right: 0; z-index: 998;"></div><script src="https://devemr.growthemr.com/assets/js/emr-chat.js"></script>'  
   
    console.log(chatEmbededCode)
    console.log
    if (isPlatformBrowser(this.platformId)) {
      $("#chatbot")
        .append('<div  class="title">' + chatBot + '</div>');
    }
  }

  setPersonalization() {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        var bgColor = $('.btn-fixed').css("background-color");
        var color = $('.btn-fixed').css("color");

        console.log(bgColor, color)
        var bgColorLight = this.hexToRGB(bgColor, 1)

        $("#landingPage button.btn").css("background-color", bgColor);
        $("#landingPage button.btn").css("color", color);
        $("#landingPage button.btn a").css("color", color);
        $("#landingPage .bgColor").css("background-color", bgColorLight);
        $("#landingPage .fgColor").css("color", bgColor);
        $("#landingPage .icons a").css("color", bgColor);


        //SERVICES PERSONALIZATION
        $(".our-services .btn").css("background-color", color);
        $('.service-wrapper').css("display", "none")
        $("#service-insert .titlep").css("color", bgColor);

        $("#service-insert .circle-img").css("background-color", bgColorLight);


        // let phoneNo = "tel:" + $(".top-left  a.tel").text().trim()
        // let email = "mailto:" + $(".top-left  a.mail").text().trim()
        // $(".top-left  a.mail").attr("href", email)
        // $(".top-left  a.tel").attr("href", phoneNo)

        $("#landingPage bgColor").css("color", bgColorLight);
        $("#landingPage fgColor").css("color", bgColor);


        $("address").each(function () {
          var embed = "<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0' src='https://maps.google.com/maps?&amp;q=" + encodeURIComponent($(this).text()) + "&amp;output=embed'></iframe>";
          $(this).html(embed);
        });
      }
    }, 2)
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



