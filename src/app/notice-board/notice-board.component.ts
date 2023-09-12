import { Component, OnInit } from '@angular/core';
import {NoticeServiceService} from '../services/notice-service.service'
import { HomeServiceService } from '../services/home-service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { group } from '@angular/animations';
import { SharingServiceService } from '../services/sharing-service.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit{
  getAddedNotice!:FormGroup; 
constructor(private noticeService:NoticeServiceService,private homeService:HomeServiceService,
  private fb:FormBuilder,
  private sharingService:SharingServiceService){
   this.getAddedNotice=this.fb.group({
        title:['',Validators.required],
        description:['',Validators.required],
        standard_id:['',Validators.required]
   })
}
  ngOnInit(): void {
    this.ViewNotice();
    this.getChapterDropdown('');
  }

  viewNotice:any;
ViewNotice(){
this.noticeService.viewNoticeBoard().subscribe((res:any)=>{
  console.log('view notice',res)
  if(res.status=='Success'){
this.viewNotice=res.data;
console.log('this.viewNotice',this.viewNotice)
  }
})
}
Standard:any;
getChapterDropdown(value:any){
  this.homeService.ListOfData().subscribe((res:any)=>{
    console.log('list of data',res)
    if(res.status=='Success'){
      this.Standard=res.data;
   // console.log('list of standard in notice module',this.Standard)

    }
  })
}
getAddednotice(data:any){
  console.log(this.getAddedNotice.value)
  const userId=localStorage.getItem('userId')
  console.log('userId in assignment module in list of assignment',userId);
  let NoticeData={
    user_id:userId,
    ...this.getAddedNotice.value
  }
  console.log('NoticeData in noticeBoard module',NoticeData);
  this.noticeService.addnoticeBoard(NoticeData).subscribe({
    next:(res:any)=>{
      console.log('res for adding notice',res);
      if(res.status=='Success'){
        alert(res.message)
       this.ViewNotice();
       this.getAddedNotice.reset();

      }
    },
    error(err) {
      alert('Failed To Add Notice For Students!')
    },
  })
}
EditNotice:FormGroup=this.fb.group({
  title:[''],
  description:['']
})
getViewNotice(id:number){
  console.log('id for viewing Details',id)
   this.sharingService.setNewNoticeId(id);
  this.noticeService.ViewDetaildofNotice(id).subscribe((res:any)=>{
    console.log('res for view notice data',res)
    if(res.status=='Success'){
      this.EditNotice.patchValue({
        title:res.data[0].title,
        description:res.data[0].description
      })
    }
  })
}

getDeleteNotice(id:number){
  console.log('id for delete notice',id);
 
  this.noticeService.deleteoticeBoard(id).subscribe({
    next:(res:any)=>{
      console.log('res for delete notice',res);
      if(res.status=='Success'){
       alert(res.message)
       this.ViewNotice();
      }
    },
    error(err) {
      alert('Failed To Delete Notice!')
    },
  })

}
getUpdateNotice(data:number){
  console.log(this.EditNotice.value)
const id= this.sharingService.getNewNoticeId();
console.log('id for notice view',id);
let NewNoticeData={
  id:id,
  ...this.EditNotice.value
}
console.log('NewNoticeData',NewNoticeData);
this.noticeService.updateNoticeBoard(NewNoticeData).subscribe({
  next:(res:any)=>{
    console.log('res for update notice',res)
    if(res.status=='Success'){
     alert(res.message)
     this.ViewNotice();
    }
  },
  error(err) {
    alert("Failed To Update Notice!")
  },
})
}
}






