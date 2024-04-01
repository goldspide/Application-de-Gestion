import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post("http://127.0.0.1:3000/product/add",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
  update(data:any){
    return this.httpClient.patch("http://127.0.0.1:3000/product/update",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
  getproducts(){
    return this.httpClient.get("http://127.0.0.1:3000/product/get",{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }

  updateStatus(data:any){
    return this.httpClient.patch("http://127.0.0.1:3000/product/updateStatus",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }

  delete(id:any){
    return this.httpClient.delete("http://127.0.0.1:3000/product/delete/"+id,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }
  getProductsByCategory(id:any){
    return this.httpClient.get("http://127.0.0.1:3000/product/getByCategory/"+id,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }

  getById(id:any){
    return this.httpClient.get("http://127.0.0.1:3000/product/getById/"+id,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }

}
