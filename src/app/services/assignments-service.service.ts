import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssignmentRequestData} from '../modal';
//import { generateRequestData } from '../api-utils';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsServiceService {

  constructor(private http:HttpClient) { }
  listOfOngoingAssignment(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in assignment service',data)
    const requestData = {
      condition:{
        teacher_id:data.teacher_id,
                //standard_id:data.standard_id
              }
    };
       console.log('requestData in assignment module',requestData)
    
     
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/assignment/listOfOngoingAssignment",requestData,
     { headers: reqHeader }

     )
  }
  listOfReceivedAssignment(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in assignment service',data)
    const requestData = {
      condition: {
        status: data.condition.status // Access the "status" property inside the "condition" object
      }
    };
       console.log('requestData in assignment module',requestData)
    
     
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/assignment/listOfReceivedAssignment",requestData,
     { headers: reqHeader }

     )
  }
  addAssignment(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in assignment service',data)
    
    
     console.log('data from service inadd assignment module',data)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/assignment/addAssignment",data,
     { headers: reqHeader }

     )
  }
  deleteAssignment(assignment_id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
      assignment_id:assignment_id,
       is_deleted: true     
    }
     
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/assignment/deleteAssignment",
    Data,
    { headers: reqHeader })
  }


  
  listOfAssignment(subject_id: number){
       //console.log('id for assignment id',assignID)
    //subject_id:number,assignment_id?: number
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
      subject_id:subject_id,
        
    }
    // if (assignment_id !== undefined) {
    //   Data['assignment_id'] = assignment_id;
    // }

    
    //const requestData1 = generateRequestData(newsubjectID, id);
  //   function generateRequestData(subject_id?: number,assignID?: number): AssignmentRequestData {
  //     console.log('generateRequestData subject_id:', subject_id);
  // console.log('generateRequestData id:', assignID);
  
  // let requestData: AssignmentRequestData = {};

  //   if (subject_id !== undefined) {
  //     requestData.subject_id = subject_id;
  //   }
  //   if (assignID !== undefined) {
  //     requestData.assignment_id = assignID;
  //   }

  //   return requestData;
  //   }
    
  //   const requestData = generateRequestData(subject_id,assignID);
  //   const typedRequestData = requestData as AssignmentRequestData;

  // if (Object.keys(typedRequestData).length === 0) {
  //   // Handle the case when both subject_id and assignID are undefined
  //   return null;
  // }
    // if (requestData === undefined) {
    //   // Handle the case when both subject_id and assignID are undefined
    //   return null;
    // }
  
  
    //console.log('assignment_id in service file requestData ',requestData)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/assignment/listOfAssignment",
    Data,
    { headers: reqHeader }) 
  }
  listAssignment(assignment_id:number){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let Data={
      assignment_id:assignment_id,
        
    }
    //console.log('data in edit note in service',data)
    // let Data={
          
    // }
     //console.log('service Data in notes module',Data)
     
     //console.log('formData in service in notes module',formData)
    return this.http.post("https://education-9y6c.onrender.com/api/teacher/assignment/listOfAssignment",Data,
    { headers: reqHeader })
  }
  updateAssignment(data:any){
    const token=localStorage.getItem('token')
    const userId=localStorage.getItem('userId')
    console.log('home token',token)
    console.log('home userId',userId)
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    console.log('data in edit note in service',data)
    // let Data={
          
    // }
     //console.log('service Data in notes module',Data)
     
     //console.log('formData in service in notes module',formData)
    return this.http.put("https://education-9y6c.onrender.com/api/teacher/assignment/updateAssignment",data,
    { headers: reqHeader })
  }
}
