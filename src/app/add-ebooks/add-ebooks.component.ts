import { Component, OnInit } from '@angular/core';
import { AssignmentsServiceService } from '../services/assignments-service.service';
import { SharingServiceService } from '../services/sharing-service.service';
import { AddNotesServiceService } from '../services/add-notes-service.service';
import { FormGroup, FormBuilder, Validators, FormArray,FormControl } from '@angular/forms';
import { VideosServiceService } from '../services/videos-service.service';
import {AddEBookServiceService} from '../services/add-ebook-service.service'

@Component({
  selector: 'app-add-ebooks',
  templateUrl: './add-ebooks.component.html',
  styleUrls: ['./add-ebooks.component.css']
})
export class AddEbooksComponent implements OnInit{
  //getAddedEBook!:FormGroup;
  constructor(private assignmentService:AssignmentsServiceService, private sharingService:SharingServiceService,
    private addnotesService:AddNotesServiceService,private fb:FormBuilder,
    private videoService:VideosServiceService,private ebookService:AddEBookServiceService){
               
  }
  ngOnInit(): void {
    this.getChapterDropdown('');
    this.listOfTopics();
   this.listofEBOoks();
   this.getTopicsDropdown('');
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
console.log('list of topics in add EBook module',res)
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
listofEBOOK:any;
listofEBOoks(){
  const newsubjectID= this.sharingService.getSubjectId();
  const newstandardID= this.sharingService.getStandardId();
  console.log('newsubjectID in video module',newsubjectID);
  console.log('newsubjectID in video module',newstandardID);
  let EBookData={
    standard_id:newstandardID,
    subject_id:newsubjectID,
  }
  console.log('EBookData in list of ebook method',EBookData)
  this.ebookService.ListOfEBooks(EBookData).subscribe((res:any)=>{
    console.log('res from list of ebook',res)
    if(res.status=='Success'){
         this.listofEBOOK=res.data;
         console.log('listofEBOOK',this.listofEBOOK)
    }
  })
}




getAddedEBook:FormGroup=this.fb.group({
  standard_id: null,
  subject_id:null,
  user_id:null,//teacher_id
  chapter_id: null,
  topic_id:null,
  description:['',Validators.required]
 })
getAddedEbook(data:any){
  const newsubjectID= this.sharingService.getSubjectId();
  const newstandardID= this.sharingService.getStandardId();
  console.log('newsubjectID in video module',newsubjectID);
  console.log('newsubjectID in video module',newstandardID)
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  let myAllIds={
    ...this.getAddedEBook.value,
    standard_id:newstandardID,
    subject_id:newsubjectID,
    user_id:userId
  }
  console.log('myAllIds',myAllIds)
  this.ebookService.AddEBook(myAllIds).subscribe({
    next:(res:any)=>{
      console.log('res in add ebook module',res);
      if(res.status=='Success'){
      alert(res.message)
      this.listofEBOoks();
      this.getAddedEBook.reset();
      }
    },
    error(err) {
      alert('Failed to EBook!')
    },
  })
}

getUpdated:FormGroup=this.fb.group({
  description:['']
})
getViewEBook(id:number){
  console.log('id for view EBook',id);
  this.sharingService.setNewEBookId(id);
 this.ebookService.newLIstOFEbooks(id).subscribe((res:any)=>{
  console.log('res for view detail of ebook',res);
  if(res.status=='Success'){
     this.getUpdated.patchValue({
      description:res.data[0].description
     })
  }
 }) 

}

getEBookUpdate(data:any){
console.log(this.getUpdated.value)
const id=this.sharingService.getNewEBookId();
console.log('id for udpdate EBook',id)
let UpdateData={
  id:id,
  ...this.getUpdated.value
}
 console.log('UpdateData in EBook module for updating',UpdateData);
 this.ebookService.updateEBooks(UpdateData).subscribe({
  next:(res:any)=>{
console.log('res for update EBook',res)
if(res.status=='Success'){
  alert(res.message);
  this.listofEBOoks();
      this.getUpdated.reset();

}
  },
  error(err) {
    alert("Failed To Update EBook!")
  },
 })

}
getdeleteebook(id:number){
 console.log('id for delete ebook',id)
 this.ebookService.deleteEBook(id).subscribe({
  next:(res:any)=>{
    console.log('res for delete ebook',res)
    if(res.status=='Success'){
       alert(res.message)
       this.listofEBOoks();
    }
  },
  error(err) {
    alert('Failed to Delete EBook!')
  },
 })
}
}
