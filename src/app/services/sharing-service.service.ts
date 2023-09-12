import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {
  private standardId!: number;
  private user_id!:number;
  //public subjectId!:number;
  public subjectId!: number;
  public chatperId!:number;
  public newSubjectId!:number;
  public newNotesId!:number;
  public newTopicId!:number;
  public assignment_id!:number;
  public test_id!:number;
  public EBookId!:number;
  public NoticeId!:number;


setNewEBookId(id:number){
  this.EBookId = id;
}
 getNewEBookId(){
  return this.EBookId;
 }
setNewNoticeId(id:number){
  this.NoticeId=id;
}
getNewNoticeId(){
  return this.NoticeId;
}
setNewTestId(id:number){
this.test_id=id;
}
getNewTestId(){
  return this.test_id;
}
  setNewAssignId(id:number){
    this.assignment_id=id;
  }
getNewAssignId(){
  return this.assignment_id
}
setNewUserId(id:number){
  this.user_id=id;
}

getNewUserId(){
  return this.user_id;
}


setNewTopicId(id:number){
this.newTopicId=id;
}
 
getNewTopicId(){
  return this.newTopicId;
}








setNewSubjectId(id:number){
this.newSubjectId=id;
}

getNewSubjectId(){
  return this.newSubjectId;
}
 setNewNotesId(id:number){
this.newNotesId=id;
 }
getNewNotesId(){
  return this.newNotesId
}

  setStandardId(id: number): void {
    this.standardId = id;
   
  }

  getStandardId(): number {
    return this.standardId;
    
  }
  setSubjectId(id: number) {
    this.subjectId = id;
  }

  getSubjectId(): number {
    return this.subjectId;
  }
setChapterId(id: number){
this.chatperId=id;
}
getChapterId(){
return this.chatperId;
}
}
