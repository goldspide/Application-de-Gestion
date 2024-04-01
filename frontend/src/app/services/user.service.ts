import { Injectable } from "@angular/core";
import  {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    url = environment.apiUrl;
    constructor(private httpClient:HttpClient){ }

    signUp(data:any){
      console.log("on entre ici")
        return this.httpClient.post("http://127.0.0.1:3000/user/signup/", data,{
            headers: new HttpHeaders().set('Content-type', "application/json")
            
        })
    }
    forgotPassword(data:any){
        return this.httpClient.post("http://127.0.0.1:3000/user/forgotPassword/",data,{
            headers:new HttpHeaders().set('Content-Type', "application/json")
        })
    }

    login(data:any){
        return this.httpClient.post("http://127.0.0.1:3000/user/login/",data,{
            headers:new HttpHeaders().set('Content-Type', "application/json")
        })
    }
    checkToken(){
        return this.httpClient.get("http://127.0.0.1:3000/user/checkToken")
    }

    changePassword(data: any) {
        return this.httpClient.post("http://127.0.0.1:3000/user/changePassword", data,{
        headers:new HttpHeaders().set('Content-Type', "application/json")}) 
    }

    getUsers(){
        return this.httpClient.get("http://127.0.0.1:3000/user/get",{
        headers:new HttpHeaders().set('Content-Type', "application/json")})

    }

    update(data:any){
        return this.httpClient.patch("http://127.0.0.1:3000/user/update", data,{
        headers:new HttpHeaders().set('Content-Type', "application/json")})

    }
}