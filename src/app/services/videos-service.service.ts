import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosServiceService {

  constructor(private http:HttpClient) { }
  ListOfTopics(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  //   let Data={
  //     subject_id:id,
  //     //id:data.standard_id
       
  //  }

   console.log('service video module data',data)
  //  let condition:any={
   
  //  is_deleted: 0
  //  }
   //console.log('condition',condition.is_deleted)
   let Data={
      standard_id:data.standard_id,
      subject_id:data.subject_id
   }
   console.log('Data in service file',Data)
    return this.http.post("https://education-9y6c.onrender.com/api/topic/listOfTopic",Data,
    { headers: reqHeader })
  }
  addTopic(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      //'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`
    });
    
 console.log('service video module',data)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/topic/addTopic",data,
    { headers: reqHeader })
  }
  deleteTopic(id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
       id:id,
       is_deleted: true     
    }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/topic/deleteTopic",Data,
    { headers: reqHeader })
  }
  updateTopic(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      //'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`
    });
    
 console.log('service update  video module',data)
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/topic/updateTopic",data,
    { headers: reqHeader })
  }
}







