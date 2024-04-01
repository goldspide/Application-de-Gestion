import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient:HttpClient) { }

  generateReport(data:any){
    return this.httpClient.post("http://127.0.0.1:3000/bill/generateReport/",data,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })
  }

  getPDF(data:any):Observable<Blob>{
    return this.httpClient.post("http://127.0.0.1:3000/bill/getPdf/",data,{responseType:'blob'})
  }

  getBills(){
    return this.httpClient.get("http://127.0.0.1:3000/bill/getBills/",{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })

  }
  delete(id:any){
    return this.httpClient.delete("http://127.0.0.1:3000/bill/delete/"+id,{
      headers: new HttpHeaders().set('Content-type', "application/json")
    })

  }
}
