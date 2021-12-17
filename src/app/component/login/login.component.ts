import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginErr: string;
  id: string;
  noticeIcon = faExclamationCircle;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onLogin() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    } else {
      const data = this.myForm.getRawValue();

      if (!this.accountService.checkAndPerformLogin(data.username, data.password)) {
        this.loginErr = "Fail to login, wrong username or password!";
        this.myForm.reset();
      } else {
        this.router.navigate(['index']);
      }
    }
  }


}
