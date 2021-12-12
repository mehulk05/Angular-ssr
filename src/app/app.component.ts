import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-ssr';

  user:any
  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(data=>{
      console.log(data)
      this.user = data
    })
      
  }
}
