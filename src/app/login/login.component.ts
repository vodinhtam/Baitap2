import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginErr: string;

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onLogin(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      this.loginErr = "Both fields need to be provided with valid data!"
    } else {
      let data = this.myForm.getRawValue();
  
      if (this.accountService.checkAndPerformLogin(data.username, data.password)) {
        this.router.navigate(['/index']);
      } else {
        this.loginErr = "Fail to login, please check your input!"
      }
    }
  }

}
