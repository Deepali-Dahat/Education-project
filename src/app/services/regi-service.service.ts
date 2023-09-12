import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Registration} from '../data-type'

@Injectable({
  providedIn: 'root'
})
export class RegiServiceService {

  constructor(private http:HttpClient) { }
  NewRegi(data:Registration){
    const token=localStorage.getItem('token')
    console.log('token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
data.role="2";
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/registration",data,
    { headers: reqHeader } )
    
  }
}
