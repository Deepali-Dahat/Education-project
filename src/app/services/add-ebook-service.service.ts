import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddEBookServiceService {

  constructor(private http:HttpClient) { }
  AddEBook(data:any){
    const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
           console.log('data in add ebook module',data)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/ebooks/addEbooks",data,
    { headers: reqHeader } )
  }
  ListOfEBooks(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    
    let Data={
      subject_id:data.subject_id,
      standard_id:data.standard_id     
   }
   console.log('service of note module subject id in list of notes',Data)
  
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/ebooks/listOfEbooks",Data,
    { headers: reqHeader })
  }
  newLIstOFEbooks(id:number){
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
        
   }
   console.log('service of note module subject id in list of notes',Data)
  
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/ebooks/listOfEbooks",Data,
    { headers: reqHeader })
  }
  deleteEBook(id:number){
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
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/ebooks/deleteEbooks",Data,
    { headers: reqHeader })
  }
  updateEBooks(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
   
    
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/ebooks/updateEbooks",data,
     { headers: reqHeader }

     )
  }
}
