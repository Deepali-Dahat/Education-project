import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private http:HttpClient) { }

  listOfStudent(assignment_id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('assignment id in result service file',assignment_id)
   // console.log('data in assignment service',data)
   
       //console.log('requestData in assignment module',requestData)
    
     
    return this.http.get(`https://education-9y6c.onrender.com/api/teacher/assignment/listOfStudents/${assignment_id}`,
     { headers: reqHeader }

     )
  }
  listofstandard(){
    
  }
}
