import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticeServiceService {

  constructor(private http:HttpClient) { }
  viewNoticeBoard(){
    const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
let data={

}
    return this.http.post("https://education-9y6c.onrender.com/api/noticeBoard/viewNoticeBoard",data,
    { headers: reqHeader } )
  }
  addnoticeBoard(data:any){
    const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    return this.http.post("https://education-9y6c.onrender.com/api/teacher/noticeBoard/addnoticeBoard",data,
    { headers: reqHeader } )
  }
  deleteoticeBoard(id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    const requestsuject = {
      id:id,
      is_deleted:true,
      
    };
    console.log('service sucject id',requestsuject)
    //    console.log('requestData',requestsuject.is_deleted)
    // const requestsuject={
    //   user_id:userId,
    //   ...data
    // }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/noticeBoard/deleteNoticeBoard",requestsuject ,
     { headers: reqHeader }

     )
  }
  ViewDetaildofNotice(id:number){
    const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
let data={
  condition: {
    id:id // Access the "status" property inside the "condition" object
  }
}
    return this.http.post("https://education-9y6c.onrender.com/api/noticeBoard/viewNoticeBoard",data,
    { headers: reqHeader } )
  }
  updateNoticeBoard(data:any) {
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    
   
     console.log('data in service file of notice module',data)
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/noticeBoard/updateNoticeBoard",data ,
     { headers: reqHeader }

     )
  }
}
