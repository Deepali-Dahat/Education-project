import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddSubject} from '../data-type';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http:HttpClient) { }
  ListOfData(){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={

    }
  //  let condition:any={
   
  //  is_deleted: 0
  //  }
   //console.log('condition',condition.is_deleted)
    return this.http.post("https://education-9y6c.onrender.com/api/listData",Data,
    { headers: reqHeader })
  }
  ListOfSubjects(id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    const requestData = {
      condition:{standard_id:id}
    };
       console.log('requestData',requestData.condition.standard_id)
    
     
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/subject/listOfSubject",requestData ,
     { headers: reqHeader }

     )
  }
  AddSuject(data:AddSubject){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    // const requestsuject = {
    //   id:10,
    //   is_deleted:true,
    //   ...data
    // };
    //    console.log('requestData',requestsuject.is_deleted)
    const requestsuject={
      user_id:userId,
      ...data
    }
     
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/subject/addSubject",requestsuject ,
     { headers: reqHeader }

     )
  }
  DeleteSubject(subjectID:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    const requestsuject = {
      id:subjectID,
      is_deleted:true,
      
    };
    console.log('service sucject id',requestsuject)
    //    console.log('requestData',requestsuject.is_deleted)
    // const requestsuject={
    //   user_id:userId,
    //   ...data
    // }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/subject/deleteSubject",requestsuject ,
     { headers: reqHeader }

     )
  }
  updateSubject(value:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    const mySubject={
          ...value
      //data
    }
    console.log('service sucject id',mySubject)
    //console.log('service subject data',mySubject.data)
    //    console.log('requestData',requestsuject.is_deleted)
    // const requestsuject={
    //   user_id:userId,
    //   ...data
    // }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/subject/updateSubject",mySubject ,
     { headers: reqHeader }

     )
  }
}
