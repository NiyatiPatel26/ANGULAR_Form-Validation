import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { user } from './user';
import { GetApiService } from './services/get-api.service';
import { Code } from './code/code';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  title:string = "User Details";

  submitted = false;

  userList: user[] = [];

  constructor(private _GetApiService: GetApiService) { }

  profileForm!: FormGroup;

  lstcode!: Code[];

  code:Array<any>=new Array();

  onSubmit() {
    this.code=[]
    this.submitted = true;
    this.userList.push(this.profileForm.value);
    if (this.profileForm.invalid) {    
      return;
    }
    else{
    // Form success submition. THis will reset form.
         this.profileForm.reset();
    }
    
  }

  get fval() {  
    return this.profileForm.controls
  }
  

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      Name: new FormControl('',[ Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      Address: new FormControl('',[ Validators.required]),
      Email: new FormControl('',[ Validators.required, Validators.email]),
      Phone_No: new FormControl('',[ Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      Pin_Code: new FormControl('',[ Validators.required, Validators.minLength(6),Validators.maxLength(6)])
    });  
  }

  validatePinCode()
  {
    let dat=this.profileForm.controls.Pin_Code.value;
    console.log("Pincode",dat)
    if(dat.length===6){
      this._GetApiService.getcodes(dat).subscribe(message =>
      {
        this.code.push(message)
        console.log(message)
      })
    }
  }
}
