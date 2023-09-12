import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogIn} from '../data-type'

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }
  LogIn(data:LogIn){
    return this.http.post("https://education-9y6c.onrender.com/api/user/login",data,
    )
  }
}
