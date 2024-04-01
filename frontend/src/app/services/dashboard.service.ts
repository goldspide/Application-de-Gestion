import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }


  getDetails(){
    return this.httpClient.get("http://127.0.0.1:3000/dashboard/details");
  }

}
