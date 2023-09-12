import { Component, OnInit } from '@angular/core';
import { ResultServiceService } from '../services/result-service.service';
import { SharingServiceService } from '../services/sharing-service.service';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
  

constructor(private resultService:ResultServiceService,private sharingService:SharingServiceService,
  private homeService:HomeServiceService){

}


  ngOnInit(): void {
   this.listOfStudents();
  }
listOfStudents(){
  const assignUpdateID=this.sharingService.getNewAssignId();
  console.log('assignment id in result module',assignUpdateID)
  this.resultService.listOfStudent(assignUpdateID).subscribe((res:any)=>{
    console.log('res in result module list of students',res)
  })
}
// listOfStandard(){
//   this.homeService.ListOfData().subscribe((res:any)=>{
//     console.log()
//   })
// }
}
