import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../service/account.service';
import { PasswordValidator } from '../../shared/password-confirm.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  noticeIcon = faExclamationCircle;
  errMessage: string;

  constructor(private fb: FormBuilder, private accService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfpassword: [null, [Validators.required]]
    }, {
      validators: PasswordValidator.confirmed('password', 'cfpassword')
    }
    )
}

onRegister() {
  if (this.regForm.invalid) {
    this.regForm.markAllAsTouched();
  } else {
      let data = this.regForm.getRawValue();

      if (!this.accService.checkAndCreateNewAccount(data.username, data.password)) {
        this.errMessage = "Register fail - Username existed!";
        this.regForm.reset();
      } else {
        this.router.navigate(["login"]);
      }
  }
}

}
