import { Component, OnInit } from '@angular/core';
import {AssignmentsServiceService} from '../services/assignments-service.service'
import { SharingServiceService } from '../services/sharing-service.service';
import { VideosServiceService } from '../services/videos-service.service';
import { AddNotesServiceService } from '../services/add-notes-service.service';
import { FormGroup, FormBuilder, Validators, FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class AddAssignmentsComponent implements OnInit{
  //teacherId: any;
  //newstandardID: any;
  //userId: any;

  constructor(private assignmentService:AssignmentsServiceService,
    private sharingService:SharingServiceService,private videoService:VideosServiceService,
    private addnotesService:AddNotesServiceService,private fb:FormBuilder,
   
    ){

  }
  ngOnInit(): void {
   this.listOfOngoingAssignment();
   this.listOfTopics();
   this.getTopicsDropdown('');
   this.getChapterDropdown('');
   this.listofAssignment();
   //this.getprsnlData()
  }
  OnGoingAssignment:any;
listOfOngoingAssignment(){
  const teacherId=this.sharingService.getNewUserId();
  console.log('teacherId in assignment module in list of assignment',teacherId)
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const newstandardID= this.sharingService.getStandardId();
  console.log('newstandardID in assignment module in list of assignment',newstandardID)
  const AssData={
    teacher_id:userId,
    //standard_id:newstandardID
  }
  console.log('AssData',AssData)
  this.assignmentService.listOfOngoingAssignment(AssData).subscribe((res:any)=>{
    console.log('list of on going assignment',res)
    if(res.status=='Success'){
      this.OnGoingAssignment=res.data;

      this.addedAssignment.patchValue({
        teacher_id: userId,
        standard_id:newstandardID
      });

      console.log('this.OnGoingAssignment',this.OnGoingAssignment)  
    }
  })
}
listAssignment:any;
listofAssignment(){
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('newstandardID in list of assignment',newsubjectID)
  
  this.assignmentService.listOfAssignment(newsubjectID).subscribe((res:any)=>{
console.log('res for list of assignment',res)
if(res.status=='Success'){
   this.listAssignment=res.data;
}
  })
}

// const requestData = {
//   subject_id: newsubjectID,
//   assignment_id: id, // Include assignment_id if needed
// };


newTopicList:any;
listOfTopics(){
  const newsubjectID= this.sharingService.getSubjectId();
  const newstandardID= this.sharingService.getStandardId();
  console.log('newsubjectID in video module',newsubjectID);
  console.log('newsubjectID in video module',newstandardID)
  let myVideos={
    standard_id:newstandardID,
    subject_id:newsubjectID
  }
  console.log('myVideos',myVideos)
  this.videoService.ListOfTopics(myVideos).subscribe((res:any)=>{
console.log('video topic res',res)
if(res.status=='Success'){
    this.newTopicList=res.data[0].topics;
    console.log('newTopicList',this.newTopicList)   
}
  })
}
topicsName:any;
getTopicsDropdown(event:any){
  const newsubjectID= this.sharingService.getSubjectId();
  const newstandardID= this.sharingService.getStandardId();
  console.log('newsubjectID in video module',newsubjectID);
  console.log('newsubjectID in video module',newstandardID)
  let myVideos={
    standard_id:newstandardID,
    subject_id:newsubjectID
  }
  this.videoService.ListOfTopics(myVideos).subscribe((res:any)=>{
    console.log('topics dropdown res',res)
    if(res.status=='Success'){
this.topicsName=res.data;
console.log('list of dropdown ',this.topicsName)
    }
  })
}
listOFChapter:any;
getChapterDropdown(event:any){
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('ewsubjectID in topic module',newsubjectID);
  this.addnotesService.ListofChapter(newsubjectID).subscribe((res:any)=>{
       console.log('list of subjeccts in  tpoics module',res)
       if(res.status=='Success'){
         this.listOFChapter=res.data[0].chapters;
         console.log('this.listOFChapter',this.listOFChapter)
       }
  })
}

addedAssignment:FormGroup=this.fb.group({
  standard_id: null,
  teacher_id:null,
  chapter_id: null,
  title: '',
  submission_date: '',
  question: this.fb.array([])
})

AddedQuestion(){
  const questionControl = new FormControl('');
   this.questionsFormArray.push(questionControl);
  //this.questionsFormArray.push();
 }
get questionsFormArray(): FormArray {
    return this.addedAssignment.get('question') as FormArray;
  }
getAddedAssignment(data:any){
  const questions = this.questionsFormArray.controls.map(control => {
    return { question: control.value };
  });
  const assignmentData = {
    ...this.addedAssignment.value,
    question: questions,
  };
 //const assignmentData = this.addedAssignment.value;
  console.log('Add assignment data',assignmentData)
  this.assignmentService.addAssignment(assignmentData).subscribe({
    next:(res:any)=>{
           console.log('add assignment res',res)
           if(res.status=='Success'){
             alert(res.message)
             this.listofAssignment();
             this.addedAssignment.reset();
           }
    },
    error(err) {
      ('Failed to add assignnment!')
    },
  })
 
}
getUpdateAssign(id:number){
  console.log('assignment_id in assign ment',id)
  this.sharingService.setNewAssignId(id)
}
getDeleteAss(assignment_id:number){
  console.log('id for delete assigment in assignment module',assignment_id);
  this.assignmentService.deleteAssignment(assignment_id).subscribe({
    next:(res:any)=>{
      console.log('delete assignment res',res);
      if(res.status=='Success'){
alert(res.message)
this.listOfOngoingAssignment();
      }
    },
    error(err) {
      alert('Failed to delete assignment')
    },
  })
}






 


}

























// "standard_id":5,
// "teacher_id":97,
// "chapter_id":11,
// "title":"assignment",
// "submission_date":"2023-02-02",
// "question":[
//     {
//     "question":"what is an array?"
// },
// {
//     "question":"sadfghnerdfgh"
// }
// ]
// }
