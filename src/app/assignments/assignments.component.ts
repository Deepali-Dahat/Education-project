import { Component, OnInit } from '@angular/core';
import { AssignmentsServiceService } from '../services/assignments-service.service';
import { SharingServiceService } from '../services/sharing-service.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit{

  constructor(private assignmentService:AssignmentsServiceService, 
    private sharingService:SharingServiceService){}






  ngOnInit(): void {
    this.listOfOngoing();
    this.listOfreceivedassignment();
  }

  listOfongoingAssignment:any;
listOfOngoing(){
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const newstandardID= this.sharingService.getStandardId();
  console.log('newstandardID in scnd assignment module in list of assignment',newstandardID)
  const AssData={
    teacher_id:userId,
    standard_id:newstandardID
  }
  this.assignmentService.listOfOngoingAssignment(AssData).subscribe((res:any)=>{
    console.log('res for showing ongoing assignment',res)
    if(res.status=='Success')
    this.listOfongoingAssignment=res.data.slice(0,8);
  })
}
receivedAssign:any;
listOfreceivedassignment(){
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId)
  const condition = {
    status: 'received'
  };

  const AssData13 = {
    condition: condition // Pass the "condition" object here
  };
  console.log('AssData13 in received assign',AssData13)
  this.assignmentService.listOfReceivedAssignment(AssData13).subscribe((res:any)=>{
console.log('res in list of received assign',res)
if(res.status=='Success'){
this.receivedAssign=res.data
}
  })
}
getAssignmentNewId(assignment_id:number){
 console.log('getAssignmentNewId in ongoing assgin module',assignment_id);
 this.sharingService.setNewAssignId(assignment_id)
 //const assignUpdateID=this.sharingService.getNewAssignId();
}
}





