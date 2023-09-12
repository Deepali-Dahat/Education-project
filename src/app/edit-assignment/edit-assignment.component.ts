import { Component, OnInit } from '@angular/core';
import { AssignmentsServiceService } from '../services/assignments-service.service';
import { SharingServiceService } from '../services/sharing-service.service';
import { FormGroup, FormBuilder, Validators, FormArray,FormControl, AbstractControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit{
  //editAssign!:FormGroup;
 

constructor(private assignmentService:AssignmentsServiceService, private sharingService:SharingServiceService,
  private fb:FormBuilder,private router:Router){
// this.editAssign=this.fb.group({
//   title: '',
//   submission_date: '',
//   assignment_questions:this.fb.array([])
// })
}
  ngOnInit(): void {
   this.ViewDataForUpdate();
   for (let i = 0; i < this.questionsFormArray.length; i++) {
    this.isEditing[i] = false;
  }
  //this.UpdatedQuestion();
  }
  updateQuestion(index: number, updatedQuestion: string){
    const questionControl = this.questionsFormArray.at(index) as FormControl;

    // Update the FormControl's value
    questionControl.setValue(updatedQuestion);
  }
  editedData:any
  ViewDataForUpdate(){
    const assignID=this.sharingService.getNewAssignId();
    console.log('assignID',assignID)
    this.assignmentService.listAssignment(assignID).subscribe((res:any)=>{
      console.log('assignID in list assogn res',assignID)
         console.log('res for edit assignment',res)
         if(res.status=='Success'){
             this.editedData=res.data[0];
             this.editAssign.patchValue({
              title:res.data[0].title,
              submission_date:res.data[0].submission_date,
             });

             while (this.questionsFormArray.length !== 0) {
              this.questionsFormArray.removeAt(0);
            }
             //ends my code

             
      
      
       for (const question of this.editedData.assignment_questions) {
       console.log('question in for loop',question.question)
        const questionControl = new FormGroup({
          id: new FormControl(question.id),//id: new FormControl(question.id),
          question: new FormControl(question.question),//new FormControl(question.question),

        });
        this.questionsFormArray.push(questionControl);
        console.log('questionControl.value',questionControl.value)
        console.log('questionControl.value.question',questionControl.value.question)
       
      }
      //edns
      
         }
    })
  }

  getQuestionControl(index: number): FormControl {
   return this.questionsFormArray.at(index).get('question') as FormControl;
  }


  editAssign:FormGroup=this.fb.group({
     title: '',
     submission_date: '',
     assignment_questions:this.fb.array([]) 
  });

  newQuestions: { question: string }[] = []; //newQuestions: { question: string }[] = [];  
  originalQuestions: any[] = [];
  editedQuestions: any[] = [];

  isEditing: boolean[] = [];
  currentQuestionIndex: number = 0;
  //newQuestionInput!:FormControl;
  EditedQuestion(){
    const newQuestionGroup = this.fb.group({
      question: '' // You can add other properties here if needed
    });
    this.questionsFormArray.push(newQuestionGroup);
   
   console.log(' questionControl in add question mehtod',newQuestionGroup)
  
  
 }

  get questionsFormArray(): FormArray {
    return this.editAssign.get('assignment_questions') as FormArray;//assignment_questions
  }
  
//new Portn






















  getEdited(data:any){
    console.log(this.editAssign.value)
     
    const allQuestions = this.questionsFormArray.controls.map(control => {
      return {id: control.value.id, // Assuming you have an 'id' property in your form control
      question: control.value.question };//question: control.value
    });
    
    const assignmentQuestions = this.questionsFormArray.value;
    const assignID=this.sharingService.getNewAssignId();
    console.log('assignID',assignID)
    
    const assignmentData = {
      assignment_id:assignID,
      ...this.editAssign.value,
      assignment_questions:allQuestions,
    };

    console.log('edit assignment data',assignmentData)
    const assignUpdateID=this.sharingService.getNewAssignId();
    console.log('assignUpdateID',assignUpdateID)
    this.assignmentService.updateAssignment(assignmentData).subscribe({
      next:(res:any)=>{
        console.log('res for update assignment',res);
        if(res.status=='Success'){
           alert(res.message)
           this.router.navigate(['dashboard/addAssignments'])
        }
      },
      error(err) {
        console.log('Failed to update assignment!')
      },
    })
  }
}


// assignment_questions
// : 
// Array(2)
// 0
// : 
// "what is floating point?"
// 1
// : 
// {question: ''}
