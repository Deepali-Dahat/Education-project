import { Component, OnInit } from '@angular/core';
import { SharingServiceService } from '../services/sharing-service.service';
import { TestServiceService } from '../services/test-service.service';
import { FormGroup, FormBuilder, Validators, FormArray,FormControl } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit{

  constructor(private sharingService:SharingServiceService,private testService:TestServiceService,
    private fb:FormBuilder,private router:Router){

  }
  ngOnInit(): void {
   this.viewDetailToEditTest();
  }
  getUpdateTest:FormGroup=this.fb.group({
    // standard_id: null,
    //   teacher_id:null,
    //   chapter_id: null,
      title:[''],
      exam_date:[''],
      duration:[''],
      end_duration:[''],
      test_questions:this.fb.array([])
   })



  convertTimeFormat(inputTime: string): string {
    const timeParts = inputTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const formattedHours = (hours < 10 ? "0" : "") + hours;
    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    return `${formattedHours}:${formattedMinutes}`;
  }




  NewDataToAddTest:any;
  TestToEdit:any
  viewDetailToEditTest(){
    const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const newsubjectID= this.sharingService.getSubjectId();
  console.log('newstandardID in list of assignment',newsubjectID)
  const NewDataForTest={
           teacher_id:userId,
           subject_id:newsubjectID
  }
  console.log(' NewDataForTest', NewDataForTest)
  const test_id=this.sharingService.getNewTestId()
  console.log('id in edit test method',test_id)
  this.testService.NewTestofList(test_id).subscribe((res:any)=>{
    console.log('res for view test for updating')
    if(res.status=='Success'){
       this.NewDataToAddTest=res.data[0];

       console.log('NewDataToAddTest',this.NewDataToAddTest);
       this.getUpdateTest.patchValue({
        title:res.data[0].title,
        exam_date:res.data[0].exam_date,
        duration:res.data[0].duration,
        end_duration:res.data[0].end_duration,
       });
       const newData = res.data[0];
       newData.duration = this.convertTimeFormat(newData.duration);
    newData.end_duration = this.convertTimeFormat(newData.end_duration);

    // Patch the formatted data into the form
    this.getUpdateTest.patchValue(newData);
      
       while (this.questionsFormArray.length !== 0) {
        this.questionsFormArray.removeAt(0);
      }
      for (const question of this.NewDataToAddTest.test_questions) {
        console.log('question in for loop',question.question)
         const questionControl = new FormGroup({
           id: new FormControl(question.id),//id: new FormControl(question.id),
           question: new FormControl(question.question),//new FormControl(question.question),
 
         });
         this.questionsFormArray.push(questionControl);
         console.log('questionControl.value',questionControl.value)
         console.log('questionControl.value.question',questionControl.value.question)
        
       }
    }

})
  }
 
  
  EditedQuestion(){
    const newQuestionGroup = this.fb.group({
      question: '' // You can add other properties here if needed
    });
    this.questionsFormArray.push(newQuestionGroup);
   
   console.log(' questionControl in add question mehtod',newQuestionGroup)
  
  
 }
 

  get questionsFormArray(): FormArray {
    return this.getUpdateTest.get('test_questions') as FormArray;//assignment_questions
  }
  
  getQuestionControl(index: number): FormControl {

    
    return this.questionsFormArray.at(index).get('question') as FormControl;
  }

  getUpdatedTest(data:any){
    console.log(this.getUpdateTest.value)

    const test_id=this.sharingService.getNewTestId()
  console.log('id in edit test method in update form data',test_id)
  const allQuestions = this.questionsFormArray.controls.map(control => {
    return {id: control.value.id, // Assuming you have an 'id' property in your form control
    question: control.value.question };//question: control.value
  });
  const assignmentData = {
    test_id:test_id,
    ...this.getUpdateTest.value,
    test_questions:allQuestions,
  };

  console.log('edit assignment data',assignmentData);
this.testService.updateTest(assignmentData).subscribe({
  next:(res:any)=>{
       console.log('res for updating data',res)
       if(res.status=='Success'){
          alert(res.message)
          this.router.navigate(['dashboard/addTests'])
       }
  },
  error(err) {
    alert('Failed To Update Test!')
  },
})


  }
}
//"17:13:00
//01:30