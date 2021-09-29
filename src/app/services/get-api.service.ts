import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private httpclient:HttpClient) { }
  
  url:string='https://api.postalpincode.in/pincode/' 

  getcodes(pin: string){
    return this.httpclient.get(this.url+pin);
}
}


