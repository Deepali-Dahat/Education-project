import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddNotes} from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNotesServiceService {

  constructor(private http:HttpClient) { }
  ListOfNotes(id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    
    let Data={
      subject_id:id     
   }
   console.log('service of note module subject id in list of notes',Data.subject_id)
  //  let condition:any={
   
  //  is_deleted: 0
  //  }
   //console.log('condition',condition.is_deleted)
    return this.http.post("https://education-9y6c.onrender.com/api/notes/listOfNotes",Data,
    { headers: reqHeader })
  }
ListofChapter(id:number){
  const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
      subject_id:id     
    }
    console.log('service of note module subject id in list of chapters',Data.subject_id)
    return this.http.post("https://education-9y6c.onrender.com/api/chapter/listOfChapter",Data,
    { headers: reqHeader })
}













  ///api/teacher/notes/addNotes
  AddNotes(data:any):Observable<any> {
    //pdf: File, title: string, chapter_id: string
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      //'Content-Type': 'application/json',//application/pdf
      'Authorization': `${token}`
    });
    console.log('service data',data);
//     let myNotesData={
//       standard_id:newstandardID,
//       subject_id:newsubjectID,
//       user_id:userId,
//       ...data,
     
//  }
   const formData = new FormData();
    formData.append('pdf',data.pdf);
    formData.append('title',data. title);
    formData.append('chapter_id',data.chapter_id);
    formData.append('standard_id',data.standard_id);
    formData.append('subject_id',data.subject_id);
    formData.append('user_id',data.user_id);
    
// let myData={
//   formData,
//   ...data
// }
//console.log('service myData',myData)
  //console.log('service data',data)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/notes/addNotes",formData,
    { headers: reqHeader })
  }
  noteDelete(id:number){
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
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/notes/deleteNotes",Data,
    { headers: reqHeader })
  }
  updateNotes(data:any):Observable<any>{
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      
      'Authorization': `${token}`
    });
    console.log('data in edit note in service',data)
    // let Data={
          
    // }
     //console.log('service Data in notes module',Data)
     const formData = new FormData();
     formData.append('pdf',data.pdf);
     formData.append('title',data.title);
     formData.append('id',data.id);
     console.log('formData in service in notes module',formData)
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/notes/updateNotes",formData,
    { headers: reqHeader })
  }
}
