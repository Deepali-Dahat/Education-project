export interface LogIn{
    email_id:string;
    password:string;
}
export interface Registration{
    first_name:string;
    email_id:string;
    phone_no:string;
    password:string;
    confirm_password:string;
    address:string;
    role:string;
    // DOB:string;
    // language:string;
}
export interface ForgotPassword{
    email_id:string,
otp:number,
password:string,
confirm_password:string
}

export interface AddNotes{
    title:string;
    pdf:string;
    chapter_id:string;
}
 
export interface AddSubject{
     standard_id:number,
// "user_id":2,
 subject_name:string
}