import { Component } from '@angular/core';
import {ForgotpsswrdServiceService} from '../services/forgotpsswrd-service.service'
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {ForgotPassword} from '../data-type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  //verifyMail!:FormGroup;
  //verifyOTP!:FormGroup;
  show=false;
constructor(private forgotService:ForgotpsswrdServiceService,private fb:FormBuilder,
  private router:Router){

}
verifyMail:FormGroup=this.fb.group({
email_id:['',Validators.required]
})
GetVerify(data:any){
this.forgotService.verifyMail(data).subscribe((res:any)=>{
  console.log('forgot res',res)
  if(res.status=='Success'){
   alert(res.message)
   this.show=true;
  }
})
}
verifyOTP:FormGroup=this.fb.group({
  email_id:['',Validators.required],
otp:['',Validators.required],
password:['',Validators.required],
confirm_password:['',Validators.required]
})
GetVerifyOpt(data:ForgotPassword){
this.forgotService.verifyOtp(data).subscribe((res:any)=>{
console.log('otp res',res)
if(res.status=='Success'){
  alert(res.message)
  this.router.navigate(['/login'])
 }
})
}
}
