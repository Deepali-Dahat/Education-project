import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {UserProfileServiceService} from '../services/user-profile-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  editUser!:FormGroup;
constructor(private userProfileService:UserProfileServiceService,private fb:FormBuilder,private router:Router){
  this.editUser=this.fb.group({
    first_name:[''],
      email_id:[''],
      phone_no:[''], 
      // address:['']
  })
}
myName:any;
  ngOnInit(): void {
    this.userProfileService.viewProfile().subscribe((res:any)=>{
      console.log('user profile res',res)
    this.myName=res.data.first_name 
      console.log('myName',this.myName)
if(res.status=='Success'){
  // if(res.data && res.data.length){
    this.editUser.patchValue({
      first_name:res.data.first_name,
      email_id:res.data.email_id,
      phone_no:res.data.phone_no
    })
  // }
}

    })
  }
  getUpdated(data:any){
    console.log(this.editUser.value)
this.userProfileService.editProfile(data).subscribe({
  next:(res:any)=>{
console.log('edit user res',res)
if(res.status=='Success'){
    alert(res.message)
    //this.router.navigate(['dashboard/home'])
}
  },
  error(err) {
    alert('Failed to Update Profile!')
  },
})
  }
}
