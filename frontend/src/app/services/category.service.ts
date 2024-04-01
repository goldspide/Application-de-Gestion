import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post("http://127.0.0.1:3000/category/add",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
  update(data:any){
    return this.httpClient.patch("http://127.0.0.1:3000/category/update",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
  getCategorys(){
    return this.httpClient.get("http://127.0.0.1:3000/category/get",{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
}
