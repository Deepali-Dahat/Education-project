import { Component, OnInit } from '@angular/core';
import { SharingServiceService } from '../services/sharing-service.service';
import { AddNotesServiceService } from '../services/add-notes-service.service';
import { HomeServiceService } from '../services/home-service.service';
import { FormGroup, FormBuilder, Validators, FormArray,FormControl } from '@angular/forms';
import { TestServiceService } from '../services/test-service.service';

@Component({
  selector: 'app-add-tests',
  templateUrl: './add-tests.component.html',
  styleUrls: ['./add-tests.component.css']
})
export class AddTestsComponent implements OnInit{
  TestData!:FormGroup;
  constructor(private sharingService:SharingServiceService,private addnotesService:AddNotesServiceService,
    private homeService:HomeServiceService,private fb:FormBuilder,private testService:TestServiceService){
     this.TestData=this.fb.group({
      standard_id: null,
      //teacher_id:null,
      chapter_id: null,
      title:['',Validators.required],
      exam_date:['',Validators.required],
      duration:['',Validators.required],
      end_duration:['',Validators.required],
      question:this.fb.array([])
     })
  }
  ngOnInit(): void {
   this.getChaterListDropdown('');
   this.getStandardDropdown('');
   this.listofTest();
  }

  listTest:any;
listofTest(){
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('newstandardID in list of assignment',newsubjectID)
  const NewDataForTest={
           teacher_id:userId,
           subject_id:newsubjectID
  }
  console.log(' NewDataForTest', NewDataForTest)
  this.testService.listofTest(NewDataForTest).subscribe((res:any)=>{
    console.log('res list of test in test module',res)
         if(res.status=='Success'){
               this.listTest=res.data;
               console.log('list of test',this.listTest)

              //  this.TestData.patchValue({
              //   teacher_id:userId,
              //    //subject_id:newsubjectID
              // });
         }
  })
}

standardName:any;
  getStandardDropdown(event:any){
this.homeService.ListOfData().subscribe((res:any)=>{
  console.log('res for showinng standard list ',res)
  if(res.status=='Success'){
this.standardName=res.data;
console.log('standardName in test module',this.standardName)
  }
})
  }



  listChapter:any;
  getChaterListDropdown(event:any){
    const newsubjectID= this.sharingService.getSubjectId();
    console.log('newsubjectID in test module',newsubjectID);
        this.addnotesService.ListofChapter(newsubjectID).subscribe((res:any)=>{
          console.log('res for selecting chapter',res)
          if(res.status=='Success'){
            this.listChapter=res.data[0].chapters;
            console.log('this.listChapter',this.listChapter) 
          }
        })
  }
  
  AddedQuestion(){
    const questionControl = new FormControl('');
     this.questionsFormArray.push(questionControl);
    
   }
   get questionsFormArray(): FormArray {
    return this.TestData.get('question') as FormArray;
  }
  getAddedTest(data:any){
    
    console.log(this.TestData.value)
    const userId=localStorage.getItem('userId')
    console.log('userId(teacher id) in add test module ',userId)
    const questions = this.questionsFormArray.controls.map(control => {
      return { question: control.value };
    });
    const assignmentData = {
      teacher_id:userId,
      ...this.TestData.value,
      question: questions,
    };
   
    console.log('Add assignment data',assignmentData.teacher_id)
    this.testService.AddTest(assignmentData).subscribe({
      next:(res:any)=>{
        console.log('res for adding test')
        if(res.status=='Success'){
          alert(res.message)
          this.listofTest();
          this.TestData.reset();
        }
      },
      error(err) {
        alert('Failed To Add Test!')
      },
    })
  }
  getDeleteTest(id:number){
    console.log('test id for deletion',id)
    this.testService.deleteTest(id).subscribe({
      next:(res:any)=>{
         console.log('res for deleting id',res)
         if(res.status=='Success'){
            alert(res.message)
            this.listofTest();
            
         }
      },
      error(err) {
        alert('Failed To Delete Test!')
      },
    })
  }
   getUpdateTest:FormGroup=this.fb.group({
    standard_id: null,
      teacher_id:null,
      chapter_id: null,
      title:[''],
      exam_date:[''],
      duration:[''],
      end_duration:[''],
      test_questions:this.fb.array([])
   })

   NewDataToAddTest:any
  getViewToedit(id:number){
console.log('id to edit test',id)
this.sharingService.setNewTestId(id);
const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('newstandardID in list of assignment',newsubjectID)
  const NewDataForTest={
           teacher_id:userId,
           subject_id:newsubjectID
  }
  console.log(' NewDataForTest', NewDataForTest)
    this.testService.listofTest(NewDataForTest).subscribe((res:any)=>{
        console.log('res for view test for updating')
        if(res.status=='Success'){
           this.NewDataToAddTest=res.data;
           console.log('NewDataToAddTest',this.NewDataToAddTest)
           const TestToEdit = this.NewDataToAddTest.find((test: any) => test.id === id);
           console.log(' TestToEdit', TestToEdit);
           if (TestToEdit) {
            console.log('test id....')
            this.getUpdateTest.patchValue({
              title:TestToEdit.title,
              exam_date:TestToEdit.exam_date

            })
           }

        }

    })
  }
  getUpdatedTest(data:any){

  }
}
