import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {

  constructor(private http:HttpClient) { }
  viewProfile(){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('service user id',userId)
    console.log(' view token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.get(`https://education-9y6c.onrender.com/api/user/viewProfile/${userId}`,
    { headers: reqHeader } 
   
    )
  }
  editProfile(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('service user id',userId)
    console.log(' view token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
     
    return this.http.put(`https://education-9y6c.onrender.com/api/user/editProfile/${userId}`,data,
    { headers: reqHeader } 
   
    )
  }
}
