import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginErr: string;
  id: string;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onLogin() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      this.loginErr = "Both fields need to be provided with valid data!"
    } else {
      const data = this.myForm.getRawValue();

      if (!this.accountService.checkAndPerformLogin(data.username, data.password)) {
        this.loginErr = "Fail to login, please check your input!"
      } else {
        this.router.navigate(['index']);
      }
    }
  }


}
