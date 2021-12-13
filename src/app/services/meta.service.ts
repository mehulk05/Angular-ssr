
import { Inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

 

  constructor(@Inject(DOCUMENT) private dom:any ,private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  updateMetaInfo(content: any, author: any, category: any) {
    this.meta.updateTag({ name: 'description', content: content });
    this.meta.updateTag({ name: 'author', content: author });
    this.meta.updateTag({ name: 'keywords', content: category });
}

addTags(data:any[]){
  this.meta.addTags(data)
}

setCanonicalURL(url?: string) {
  const canURL = url == undefined ? this.dom.URL : url;
  console.log(canURL)
  const link: HTMLLinkElement = this.dom.createElement('link');
  link.setAttribute('rel', 'canonical');
  this.dom.head.appendChild(link);
  link.setAttribute('href', canURL);
}
}
