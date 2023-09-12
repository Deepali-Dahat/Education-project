import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {LogIn} from '../data-type';
import {LoginServiceService} from '../services/login-service.service';
import {Router} from '@angular/router';
import { SharingServiceService } from '../services/sharing-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  getLogin!:FormGroup;
  constructor(private fb:FormBuilder,private loginService:LoginServiceService,
    private router:Router,private sharingService:SharingServiceService){
    this.getLogin=this.fb.group({
      email_id:['',Validators.required],
      password:['',Validators.required]
    })
  }
  GetLogin(data:LogIn){
console.log(this.getLogin.value);
this.loginService.LogIn(data).subscribe({
  next:(res:any)=>{
console.log('log in res',res)
if(res.status=='Success'){
alert(res.message)
this.router.navigate(['dashboard/home']);
const token = res.data.token;
const userId= res.data.id;
this.sharingService.setNewUserId(userId)
//this.sharingService.setStandardId(userId);

localStorage.setItem('token', token);
localStorage.setItem('userId',userId)
console.log('login token',token)
console.log('login id',userId)
}
else(res.error=="error")
{
  alert(res.message)
}

  },
  
  error(err) {
    alert('LogIn Failed!')
  },
})
  }
}
