import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  data = null;

  constructor(private fb: FormBuilder, private helper: HelperService, private authService: AuthService) {}

  ngOnInit(): void {
    this.helper.updateTitle('Login');
    this.loginForm = this.initForm();
  }

  initForm() {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitLogin() {
    console.log(this.loginForm);
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);

      if (res.status) {
        localStorage.setItem('token', res.data.stsTokenManager.accessToken);
      }
      // console.log(this.helper.decrypt(res));
    });
  }
}
