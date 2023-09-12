import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ForgotPassword} from '../data-type'

@Injectable({
  providedIn: 'root'
})
export class ForgotpsswrdServiceService {

  constructor(private http:HttpClient) { }
  verifyMail(data:any){
    return this.http.post("https://education-9y6c.onrender.com/api/user/verifyEmail",data,
    )
  }
  verifyOtp(data:ForgotPassword){
    return this.http.post("https://education-9y6c.onrender.com/api/user/verifyOtp",data,
    )
  }
}
