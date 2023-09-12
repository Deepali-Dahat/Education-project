import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http:HttpClient) { }

  listofTest(data:any){
const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in list of test for view ')
    let DataId={
      teacher_id:data.user_id,
      subject_id:data.subject_id
    }
       console.log('DataId in assignment module',DataId)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/test/listOfTest",DataId,
    { headers: reqHeader } )
  }

  NewTestofList(test_id:number){
    const token=localStorage.getItem('token')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in list of test for view ')
    let DataId={
      test_id:test_id,
      
    }
       console.log('DataId in assignment module',DataId)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/test/listOfTest",DataId,
    { headers: reqHeader } )
  }

  AddTest(data:any){
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('id')
    console.log('notice service token',token)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
           console.log('data in service in test module',data)
           const NewData={
            teacher_id:id,
            ...data
           }
           console.log('NewData in add test moduler service file',NewData)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/test/addTest",data,
    { headers: reqHeader } )
  }
  deleteTest(id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
      test_id:id,
       is_deleted: true     
    }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/test/deleteTest",
    Data,
    { headers: reqHeader })
  }
  updateTest(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in edit test in service',data)
    
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/test/updateTest",data,
    { headers: reqHeader })
  }
}
