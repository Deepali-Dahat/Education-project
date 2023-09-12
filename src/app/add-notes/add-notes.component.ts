import { Component, OnInit,ElementRef, ViewChild,OnDestroy  } from '@angular/core';
import {AddNotesServiceService} from '../services/add-notes-service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AddNotes} from '../data-type'
import { SharingServiceService } from '../services/sharing-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit,OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef;
  thumbnailUrl!: string;
  pdfUrl!:string;
  addNotes!:FormGroup;
  standardId!: number;
  subscriptions: Subscription[] = [];
  notesSubscription!: Subscription; 
   pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  //user_id!:number;
  //selectedPdf: string = '';
  //showPdfViewer: boolean = false;
  constructor(private addnotesService:AddNotesServiceService,private fb:FormBuilder,
    private sharingService:SharingServiceService){
this.addNotes=this.fb.group({
  title:['',Validators.required],
  //pdf:['',Validators.required],
  chapter_id:['',Validators.required]
  
  // standard_id:newstandardID,
  //subject_id:newsubjectID,
  // user_id:userId,
})
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.Notes.forEach((note:any) => {
      if (note.pdfBlobUrl) {
        URL.revokeObjectURL(note.pdfBlobUrl);
        console.log('note.pdfBlobUrl in destroy loop',note.pdfBlobUrl)
      }
    });
  
    //throw new Error('Method not implemented.');
  }
  
  // ngOnDestroy(): void {
   
  // }
  
  ngOnInit(): void {
   this.listofNotes();
    this.getSecondDropdown('');
    //this.myMethod();
   
  }
  Notes:any;
  Mypdf:any;
  myId:any;
listofNotes(){
  const newsubjectID = this.sharingService.getSubjectId();
  console.log('newsubjectID in notes module',newsubjectID)
  const notesSubscription = this.addnotesService.ListOfNotes(newsubjectID).subscribe(
    (res: any) => {
      console.log('list of notes', res);
      if (res.status === 'Success') {
        this.Notes = res.data;
          this.Mypdf=res.data[0].pdf;
          console.log(' this.Mypdf', this.Mypdf)
        this.Notes.forEach((note: any) => {
          const blob = new Blob([note.pdf], { type: 'application/pdf' });
          note.pdfBlobUrl = URL.createObjectURL(blob);
          console.log('note.pdfBlobUrl in forEach loop',note.pdfBlobUrl )
        });
      }
    }
  );

  this.subscriptions.push(notesSubscription);



 
  //const newsubjectID= this.sharingService.getSubjectId();
  // console.log('newsubjectID in notes module',newsubjectID)
  // const newchapterID= this.sharingService.getChapterId();
  // console.log('newchapterID note module',newchapterID)
 // const notesSubscription: Subscription =this.addnotesService.ListOfNotes(newsubjectID).subscribe((res:any)=>{
  
 // console.log('list of notes',res)
  
  //if(res.status=='Success'){
        //this.Notes=res.data;
        //console.log('Notes',this.Notes)
//my code
// this.Notes.forEach((note: any) => {
//   const blob = new Blob([note.pdf], { type: 'application/pdf' });
//   note.pdfBlobUrl = URL.createObjectURL(blob);
// });

//   }

// })
// this.subscriptions.push(notesSubscription);

}
// ngOnDestroy() {
//   this.subscriptions.forEach(subscription => subscription.unsubscribe());
//   this.Notes.forEach((note: { pdfBlobUrl: string; }) => {
//     if (note.pdfBlobUrl) {
//       URL.revokeObjectURL(note.pdfBlobUrl);
//       console.log('pdfBlobUrl in destroy life cycle hook', note.pdfBlobUrl)
//     }
//   });
// }
// ngOnDestroy() {
//   this.subscriptions.forEach(subscription => subscription.unsubscribe());
//   if (this.notesSubscription) {
//     this.notesSubscription.unsubscribe();
//   }
//   this.Notes.forEach((note: { pdfBlobUrl: string; }) => {
//     if (note.pdfBlobUrl) {
//       URL.revokeObjectURL(note.pdfBlobUrl);
//     }
//   });
// }

//         this.chapterName=res.data[0].chapters;
//           this.Mypdf=res.data[0].pdf;
// this.myId=res.data[0].id;
//         console.log('Notes',this.Notes)
//         console.log('my pdf',this.Mypdf)
//         console.log('my id',this.myId)
getPdf(data:any): void{
  console.log('data',data)
  
}
selectFile(){
  this.fileInput.nativeElement.click();
  console.log('my button')
}
selectedFile:any;
selectedTitle:any;
selectedChapter:any;
uploadFile(event: any) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
     console.log('File selected:', file.name);
    if (file.type === 'application/pdf') {
      this.selectedFile = file;
      this.selectedTitle = this.addNotes.get('title')?.value;
      this.selectedChapter = this.addNotes.get('chapter_id')?.value;

      console.log('File selected:', file.name);

        // const data:any = {
        //   pdf:file,
        //   title: this.addNotes.get('title')?.value, 
        //   chapter_id: this.addNotes.get('chapter_id')?.value,
          
        // };
        // const newsubjectID= this.sharingService.getSubjectId();
        // const newstandardID= this.sharingService.getStandardId();
        //        console.log('subjectID note wali id for subject',newsubjectID)
        //        console.log('newstandardID for add notes',newstandardID)
        //        const userId=localStorage.getItem('userId')
         
          
        // let myNotesData={
        //      standard_id:newstandardID,
        //      subject_id:newsubjectID,
        //      user_id:userId,
        //      ...data,
            
        // }
       
//         console.log(' myNotesData', myNotesData)
//         this.addnotesService.AddNotes(myNotesData).subscribe({
//           next:(res:any)=>{
//                if(res.status=='Success'){
//                 console.log('Added Notes res',res)
// alert(res.message)
//                }
//           },
//           error(err) {
//             alert('Failed to add Notes!')
//           },
//         })
      
    } else {
      console.log('Invalid file format. Please select a PDF file.');
    }
  }
}
// mymethodChapter:any;
// mymethodChapterId:any;
// myMethod(){
//   const newsubjectID= this.sharingService.getSubjectId();
//   console.log('newsubjectID in my method note module',newsubjectID)
// this.addnotesService.ListofChapter(newsubjectID).subscribe((res:any)=>{
//   console.log('my method res in note module',res);
//   if(res.status=='Success'){
//     this.mymethodChapter=res.data[0].chapters;//[0]
//     console.log('mymethodChapter in note module',this.mymethodChapter)
// this.mymethodChapterId=this.chapterName[0].id;
// console.log('mymethodChapterId in note module',this.mymethodChapterId)
// this.sharingService.setChapterId(this.mymethodChapterId);
//   }


// })
// }

chapterName:any;
newChapterId:any;
getSecondDropdown(value:any){
  
  const newsubjectID= this.sharingService.getSubjectId();
  console.log(' drop down newsubjectID in notes module',newsubjectID)
this.addnotesService.ListofChapter(newsubjectID).subscribe((res:any)=>{
  console.log('list of chapter dropdownn',res);
  if(res.status=='Success'){
    this.chapterName=res.data[0].chapters;
//this.chapterName=res.data[0].chapters;//[0]
//this.newChapterId=this.chapterName[0].id;
//console.log('newChapterId',this.newChapterId)

console.log('this.chapterName in note module',this.chapterName)


  }
})
}
AddNotes(data:any){
console.log(this.addNotes.value)
if (this.selectedFile) {
  const data: any = {
    pdf: this.selectedFile,
    title: this.selectedTitle,
    chapter_id: this.selectedChapter,
  };
  const newsubjectID= this.sharingService.getSubjectId();
         const newstandardID= this.sharingService.getStandardId();
                console.log('subjectID note wali id for subject',newsubjectID)
                console.log('newstandardID for add notes',newstandardID)
                const userId=localStorage.getItem('userId')
  let myNotesData={
          standard_id:newstandardID,
        subject_id:newsubjectID,
        user_id:userId,
        ...data,
        
    }
    let myNewNotesData={
      ...data,
      ...myNotesData
    }
    console.log(' myNewNotesData', myNewNotesData)
  this.addnotesService.AddNotes( myNewNotesData).subscribe({
  next:(res:any)=>{
   console.log('add note res',res)
   
   if(res.status=='Success'){
    alert(res.message);
    this.listofNotes();
    this.addNotes.reset();
   }
   //this.myMethod();
  },
  error(err) {
   alert("Failed to add notes") 
  },
} 
)
}
}
editNotes:FormGroup=this.fb.group({
  title:[''],
  //chapter_id:['']
})
NewID(id:number){
  console.log('edit notes id',id);
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('subject id for view  notes in notes module',newsubjectID)
 this.addnotesService.ListOfNotes(newsubjectID).subscribe({
  next:(res:any)=>{
    console.log('res for view notes in note module',res)
    if(res.status=='Success'){
      const newNotes=res.data;
      console.log('newNotes',newNotes)
      const subjectToEdit = newNotes.find((subject: any) => subject.id === id);
      console.log('subjectToEdit in notes module',subjectToEdit)
console.log('subjectToEdit for notes id',subjectToEdit.id)
const newNotesID=subjectToEdit.id;
console.log('newNotesID for sharing',newNotesID)
this.sharingService.setNewNotesId(newNotesID);
if (subjectToEdit) {
  console.log('hellllllo')
  this.editNotes.patchValue({
    //subjectId: subjectToEdit.subject_id,
    title: subjectToEdit.title,
    //pdf:subjectToEdit.pdf
    //chapter_id:
    //standard_id:
    // other form controls...
  });
}
    }
  },
  error(err) {
    alert('Failed to edit notes')
  },
 }) 

}
getUpdatedNotes(value:any){
  if (this.selectedFile) {
    console.log(this.editNotes.value)
const id= this.sharingService.getNewNotesId();
let notesData={
    id,
    pdf: this.selectedFile,
    title: this.editNotes.value.title
}
//pdf: this.selectedFile,
    //title: this.selectedTitle,
    //chapter_id: this.selectedChapter,
console.log('notesData',notesData)
console.log('title name in edit method',notesData.title)
const newsubjectID= this.sharingService.getSubjectId();
this.addnotesService.updateNotes(notesData).subscribe({
  next:(res:any)=>{
    console.log('update note in notes module',res)
    if(res.status=='Success'){
alert(res.message)
this.NewID(newsubjectID);
this.editNotes.reset();
    }
  },
  error(err) {
    alert('Failed to edit notes!')
  },
})
  }
}
// getEditID(id:number){
//   console.log('edit notes id',id)  
// }

getNotedelete(id:number){
console.log('id for deleted note',id)

this.addnotesService.noteDelete(id).subscribe({
  next:(res:any)=>{
     console.log('note delete res',res);
     if(res.status=='Success'){
       alert(res.message)
this.listofNotes();
     }
  },
  error(err) {
    alert('Failed to delete notes')
  },
})
//"id":62,
   // "is_deleted": true
}

}
// function ngOnDestroy() {
//   throw new Error('Function not implemented.');
  
// }

