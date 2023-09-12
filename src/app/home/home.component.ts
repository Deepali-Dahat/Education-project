import { Component, OnInit } from '@angular/core';
import {HomeServiceService} from '../services/home-service.service';
import { SharingServiceService } from '../services/sharing-service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { group } from '@angular/animations';
import {AddSubject} from '../data-type'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // selectedStandard: any = {};
  editsubject!:FormGroup;
  selectedStandardID: any;
  Standard:any=[];
  standardID: any;
  constructor(private homeService:HomeServiceService,private sharingService:SharingServiceService,
    private fb:FormBuilder){
         this.editsubject=this.fb.group({
          //standard_id:[''],
          subject_name:['']
         })
  }
  
  ngOnInit(): void {
    if (this.Standard.length > 0) {
      console.log('Set the first standard as the selected standard') 
      this.selectedStandardID = this.Standard[0].id;
      console.log(' this.selectedStandardID in oninit life cycle method', this.selectedStandardID)
      this.sharingService.setStandardId(this.selectedStandardID);

      // Load the subjects for the first standard
      this.listOfSubjects(this.selectedStandardID);
    }
//this.viewSubjects();
    //this.listofsubjects();
    this.listOfData();
    //this.listOfSubjects();
  
  
    this.getSecondDropdown('');
  }
  
  subjectName:any;
  standardId:any;
  getsubject(id:number){
    console.log('subject wali dusri  id',id)
    const subjectId =id; // Replace with your subject ID
    console.log('subjectId ny me',subjectId)
  this.sharingService.setSubjectId(subjectId);
   

  }
  
  // Standard = [/* your array of Standard objects */];
  // selectedStandard = this.Standard[0];
  // subjectName = this.Standard[0].subjects;

  //  selectedStandardID: any;
  // Standard:any=[];
  // standardID: any;
  //selectedStandard: this.Standard[0];
  onStandardClick(id: number): void {
    this.selectedStandardID = id;
    this.sharingService.setStandardId(this.selectedStandardID);
    console.log('this.selectedStandard in list of subject',this.selectedStandardID)
    this.listOfSubjects(id);
    //this.homeService.ListOfSubjects(id).subscribe((res:any)=>{
      // console.log('list of subjects',res)
      // if(res.status=='Success'){
      //   if(res.data && res.data.length>0){
      //   this.subjectName=res.data;
        
      //   console.log('this.subjectName list of subjects',this.subjectName)
      //   this.standardId=this.subjectName.id;
      //   console.log('standard id in list of subject on click', this.standardId)
      //   }

        
      //   // this.standardId=res.data.map((ele:any)=>{
      //   //   return ele.id
      //   // })
      //   //  console.log('standard id', this.standardId)//return array of subject id
       
      //   // console.log(' Standard', this.Standard)
       
      //   console.log('subjectName',this.subjectName)
      // }
    //})
  }
listOfSubjects(standardID:number){
this.homeService.ListOfSubjects(standardID).subscribe((res:any)=>{
  console.log('list of subjects',res)
      if(res.status=='Success'){
        if(res.data && res.data.length>0){
        this.subjectName=res.data;
        
        console.log('this.subjectName list of subjects',this.subjectName)
        // this.standardId=this.subjectName.id;
        // console.log('standard id in list of subject on click', this.standardId)
        }

       
       
        console.log('subjectName',this.subjectName)
      } 
})
}
  //  Standard:any;
  
  listOfData(){
    this.homeService.ListOfData().subscribe((res:any)=>{
      console.log('list of data',res)
      if(res.status=='Success'){
        if(res.data && res.data.length>0){
        this.Standard=res.data;
        this.selectedStandardID = this.Standard[0].id;
        this.sharingService.setStandardId(this.selectedStandardID);
    
        //   // Load the subjects for the first standard
         this.listOfSubjects(this.selectedStandardID);

        }


        // if (this.Standard.length > 0) {
        //   // Set the first standard as the selected standard
        //   this.selectedStandardID = this.Standard[0].id;
        //   this.sharingService.setStandardId(this.selectedStandardID);
    
        //   // Load the subjects for the first standard
        //   this.listOfSubjects(this.selectedStandardID);
        // }
      }
    })
  }
  selectStandard:any;
  getSecondDropdown(value: any){
   this.homeService.ListOfData().subscribe((res:any)=>{
    console.log('standard list',res)
    if(res.status=='Success'){
      this.selectStandard=res.data;
      console.log('selectStandard',this.selectStandard)

    }
   }) 
  }
  getAdded:FormGroup=this.fb.group({
  
      standard_id:['',Validators.required],
     subject_name:['',Validators.required]
  
  })
  getSubjectAdded(data:AddSubject){
    console.log(this.getAdded.value)
this.homeService.AddSuject(data).subscribe({
  next:(res:any)=>{
          console.log('added subject',res)
          if(res.status=='Success'){
            alert(res.message)
            console.log('when added subject id',res.data.id);
            //this.listOfData();
            this.listOfSubjects(this.selectedStandardID);
 }

  },
  error(err) {
    alert('Failed to add subject!')
  },
})
  }
  getDeleted(){
    //console.log('modal wali id',id)
    const subjectId = this.sharingService.getSubjectId();
    //const subjectID= this.sharingService.getSubjectId();
       console.log('subjectID my new id',subjectId)
    this.homeService.DeleteSubject(subjectId).subscribe({
      next:(res:any)=>{
console.log('deleted subject res',res)
if(res.status=='Success'){
alert(res.message)
 //this.onStandardClick(id)
}
    
       
      },
      error(err) {
        alert('Failed to delete subject')
      },
      
      
    })
  }
  getUpdate(id:number){
console.log('id for update',id)
  }
  newSubjectName:any;
  viewSubjects(){
    //console.log('id for update',id)
    const newstandardID= this.sharingService.getStandardId();
    console.log('newstandardID in view subject id',newstandardID)
    this.homeService.ListOfSubjects(newstandardID).subscribe((res:any)=>{
      console.log('list of view subject',res)
      // if(res.status=='Success'){
      //   if(res.data && res.data.length>0){
      //     this.newSubjectName=res.data.map((ele:any)=>{
      //       return ele.subject_name
      //     })
      //     console.log('this.newSubjectName in view subject method',this.newSubjectName)
      //     this.editsubject.patchValue({
      //       subject_name:this.newSubjectName.subject_name
      //     })
      //     // this.editsubject.patchValue({
      //     //   subject_name:res.data[0].subject_name
      //     // })
      //   }
      // }
    })
    // this.homeService.updateSubject(id).subscribe({
    //   next:(res:any)=>{

    //   },
    //   error(err) {
    //     alert('failed to update')
    //   },
    // })
// this.homeService.ListOfSubjects(id).subscribe((res:any)=>{
//   console.log('view list of subject',res)
//   if(res.status=='Success'){
//     if(res.data && res.data.length>0){
//       this.newSubjectName=res.data;
//       console.log('this.newSubjectName in view list of subject',this.newSubjectName)
//     }
//   }


// })
  }
  //newSubject:any
  viewUpdate(id:number){
console.log('view subject id',id)
const newstandardID= this.sharingService.getStandardId();
console.log('newstandardID in view subject id',newstandardID)
this.homeService.ListOfSubjects(newstandardID).subscribe((res:any)=>{
  console.log('res in view subject',res)
  if(res.status=='Success'){
const newSubject=res.data;
console.log('newSubject in view method',newSubject)
const subjectToEdit = newSubject.find((subject: any) => subject.id === id);
console.log('subjectToEdit',subjectToEdit)
console.log('subjectToEdit for id',subjectToEdit.id)
const newSubjectID=subjectToEdit.id
console.log('newSubjectID for sharing',newSubjectID)
this.sharingService.setNewSubjectId(newSubjectID);
if (subjectToEdit) {
  console.log('hellllllo')
  this.editsubject.patchValue({
    //subjectId: subjectToEdit.subject_id,
    subject_name: subjectToEdit.subject_name,
    //standard_id:
    // other form controls...
  });
}
  }
})

  }
  Vari:any;
  getUpdated(value:any){
    console.log(this.editsubject.value);
    const id= this.sharingService.getNewSubjectId();
    let MyNewData={
      id,
      ...value
    }
    // const newSubjectID= this.sharingService.getNewSubjectId();
    console.log('newSubjectID for getting',MyNewData)
this.homeService.updateSubject(MyNewData).subscribe({
  next:(res:any)=>{
    console.log('update res for subject',res)
    if(res.status=='Success'){
      alert(res.message);
      

    }
  },
  error(err) {
    alert('Failed to update!')
  },
})
  }

  
}
//"id":16,
//"subject_name":"second accounts"