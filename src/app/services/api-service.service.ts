import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url:any = environment.SERVER_API_URL


  constructor(private http:HttpClient) { }

  getTenantHttpOptions(businessId: any) {

    // don't remove "" from business id as the value must be string
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('X-TenantID', "" + businessId);

    const httpOptions = {
        headers: headers
    };
    return httpOptions;
}


  getLandingPage(bid: any,fid: any){
  this.url = this.url+"/api/public/landingpage/"+fid
  //  let headers :any =  this.getTenantHttpOptions(bid);
  //  console.log(headers)
  return this.http.get(this.url,this.getTenantHttpOptions(bid))
  }
}
