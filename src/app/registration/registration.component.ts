import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import {Registration} from '../data-type';
import {RegiServiceService} from '../services/regi-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  GetRegi!:FormGroup;
  SelectedLanguage:string='';
constructor(private fb:FormBuilder,private registerService:RegiServiceService,
  private router:Router){
  this.GetRegi=this.fb.group({
    first_name:['',Validators.required],
    email_id:['',Validators.required],
    phone_no:['',Validators.required],
    password:['',Validators.required],
    confirm_password:['',Validators.required],
    // address:['',Validators.required],
    // DOB:['',Validators.required],
    // language:['',Validators.required]
   })
}
onSelectionBoard(event:any){
  this.SelectedLanguage = event.target.value;
  console.log('SelectedLanguage',this.SelectedLanguage)
}
getRegistration(data:Registration){
this.registerService.NewRegi(data).subscribe({
next:(res:any)=>{
console.log("Registration res",res);
if(res.status=='Success'){
alert(res.message)
this.router.navigate(['/login'])

}
else(res.error='error')
{
  alert(res.message)
}

},
error(err) {
  alert("Registration Failed!")
},
})
}
}






