import { Component, OnInit } from '@angular/core';
import {UserProfileServiceService} from '../services/user-profile-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
constructor(private userProfileService:UserProfileServiceService
  ,private router:Router){

}
  myname:any;
  userId:any;
  ngOnInit(): void {
   this.userProfileService.viewProfile().subscribe((res:any)=>{
console.log('dashboard user  ',res)
if(res.status=='Success'){
   this.myname=res.data.first_name;
   this.userId=res.data.email_id;
   console.log('myname in dahboard module',this.myname)
   console.log('userId',this.userId)
}
// this.myname=res.data.first_name;
// this.userId=res.data.email_id;
// console.log('myname',this.myname)
// console.log('userId',this.userId)
   })
  }
  getLogOut(){
    this.router.navigate(['/login'])
  }
}
