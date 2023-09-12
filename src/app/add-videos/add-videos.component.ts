import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {VideosServiceService} from '../services/videos-service.service'
import { SharingServiceService } from '../services/sharing-service.service';
import {AddNotesServiceService} from '../services/add-notes-service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html',
  styleUrls: ['./add-videos.component.css']
})
export class AddVideosComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | undefined;
  defaultVideoUrl="./assets/Cherrys_2.mp4"
  //defaultVideoUrl: string | null = null;
  selectedFileName: string | null = null;
  addTopics!:FormGroup;
  constructor(private videoService:VideosServiceService,private sharingService:SharingServiceService,
    private addnotesService:AddNotesServiceService,private fb:FormBuilder){
this.addTopics=this.fb.group({
   title:['',Validators.required],
   description:['',Validators.required],
   chapter_id:['',Validators.required],
   topic_name:['',Validators.required],
   material:['',Validators.required]

})
  }
  ngOnInit(): void {
  
   this.listOfTopics();
   this.getSecondDropdown('');
   this.getTopicsDropdown('');
   this.getChapterDropdown('');
  }
  newTopicList:any=[];
  NewtopicsList:any=[];
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
    this.newTopicList=res.data.reduce((acc: any[], ele: any) => {
      return acc.concat(ele.topics);
    }, []);
      //  this.NewtopicsList=this.newTopicList.map((item:any)=>{
      //   return item
      //  })
      //  console.log('this.NewtopicsList in video',this.NewtopicsList)
    // for(let us of this.newTopicList){
    //   console.log('us for topics video module',us.topics)
    // }
    // this.newTopicList=res.data.map((ele:any)=>{
    //   return ele.topics
    // })
    //this.newTopicList=res.data[0].topics;
    console.log('newTopicList in topics module',this.newTopicList)
       
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
selectFile(){

  this.fileInput.nativeElement.click();
   console.log('my button')

 
}
uploadFile(event:any){
  this.selectedFile = event.target.files[0];
  console.log('this.selectedFile in topic module',this.selectedFile);
  //
  if (this.selectedFile) {
    // Set the selected file name
    this.selectedFileName = this.selectedFile.name;
  }
  //new
  //  if ( this.selectedFile) {
  //       // Create a URL for the selected video file
  //       this.defaultVideoUrl = URL.createObjectURL( this.selectedFile);
  //     }
   //not used
  //this.addTopics.controls['material'].setValue(this.selectedFile);

  //new code
  // const file = event.target.files[0];
  //   if (file) {
  //     // Create a URL for the selected video file
  //     this.defaultVideoUrl = URL.createObjectURL(file);
  //   }
  //end
}
getaddedtopic(data:any) {
  console.log('first',this.addTopics.value)
  const formData = new FormData();
    
    if (this.selectedFile) {
      formData.append('material', this.selectedFile);
    }
    formData.append('chapter_id', data.chapter_id);
    formData.append('description', data.description);
    formData.append('title', data.title);
    formData.append('topic_name', data.topic_name);

    console.log('Form Data:', formData);
  this.videoService.addTopic(formData).subscribe({
    next:(res:any)=>{
      if(res.status=='Success'){
           alert(res.message)
           this.listOfTopics();
           this.addTopics.reset();
      }
console.log('add topics res',res)
    },
    error(err) {
      alert("Failed to add topics")
      console.log('error',err)
    },
  })
  // if (!this.selectedFile) {
  //   console.log('second',this.addTopics.value)
  //   console.log('Please select a video.');
  //   return;
  // }

  // const formData = new FormData();
  // formData.append('video', this.selectedFile);
  // console.log('my video in topic module',formData);
}
chapterName:any;
newChapterId:any;
getSecondDropdown(value:any){
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('ewsubjectID in topic module',newsubjectID);
  this.addnotesService.ListofChapter(newsubjectID).subscribe((res:any)=>{
      console.log('res in video module',res)
      if(res.status=='Success'){
        this.chapterName=res.data[0].chapters;
        console.log('chater name in video module',this.chapterName)

      }
  })
}
getTopicdelete(id:number){
console.log('id for delete topic',id);
this.videoService.deleteTopic(id).subscribe({
  next:(res:any)=>{
     console.log('res for delete topic',res)
     if(res.status=='Success'){
alert(res.message)
this.listOfTopics();
     }
  },
  error(err) {
    alert('Failed to delete topics!')
  },
})
}

updateTopic(id:number){
  console.log('id for view topic data ',id)
  const newsubjectID= this.sharingService.getSubjectId();
  const newstandardID= this.sharingService.getStandardId();
  console.log('newsubjectID in video module',newsubjectID);
  console.log('newsubjectID in video module',newstandardID)
  let myTopicData={
    standard_id:newstandardID,
    subject_id:newsubjectID
  }
  console.log('id for update topics',myTopicData)
  this.videoService.ListOfTopics(myTopicData).subscribe({
next:(res:any)=>{
console.log('res for displaying data',res);
if(res.status=='Success'){
  const ViewData=res.data[0].topics;
  console.log('ViewData',ViewData);
  const TopicToEdit = ViewData.find((topic: any) => topic.id === id);
  console.log('TopicToEdit ',TopicToEdit )
  console.log('topicToEdit for video id',TopicToEdit.id)
const newTopicID=TopicToEdit.id;
console.log('newNotesID for sharing',newTopicID)
this.sharingService.setNewTopicId(newTopicID);
if (TopicToEdit) {
  console.log('hellllllo')
  this.getEdit.patchValue({
    //subjectId: subjectToEdit.subject_id,
    title:TopicToEdit.title,
    description:TopicToEdit.description
    //pdf:subjectToEdit.pdf
    //chapter_id:
    //standard_id:
    // other form controls...
  });
}
}
},
error(err) {
  alert('Failed to show data')
},
  })
}
getEdit:FormGroup=this.fb.group({
  title:[''],
  description:[''],
  // chapter_id:[''],
  topic_name:[''],
  material:['']
})
getUpdateTopic(data:any){
  console.log(this.getEdit.value)
  const id=this.sharingService.getNewTopicId();
  console.log('newUpdatetopic id which is coming upper method means view id',id)
  const updateDataTopic:{ [key: string]: any } = {
    id,
    //chapter_id: data.chapter_id,
    description: data.description,
    title: data.title,
    topic_name: data.topic_name
  };
  console.log('UpdateDataTopic',updateDataTopic)
  const formData = new FormData();

  if (this.selectedFile) {
    formData.append('material', this.selectedFile);
  }
  for (const key in updateDataTopic) {
    if (updateDataTopic.hasOwnProperty(key)) {
      formData.append(key, updateDataTopic[key]);
    }
  }

  console.log('Form Data:', formData);
 this.videoService.updateTopic(formData).subscribe({
  next:(res:any)=>{
console.log('update topic res',res)
if(res.status=='Success'){
  alert(res.message)
  this.listOfTopics();
}
  },
  error(err) {
    alert('Failed to update topic')
  },
 }) 
}
// submitForm() {
//   if (!this.selectedVideo) {
//     console.log('Please select a video.');
//     return;
//   }
// }
// const formData = new FormData();
////formData.append('title', this.myForm.value.title);
///formData.append('description', this.myForm.value.description);
//formData.append('video', this.selectedVideo);
}