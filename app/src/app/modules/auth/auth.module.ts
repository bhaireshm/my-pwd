import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [CommonModule, AuthRoutingModule],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent],
})
export class AuthModule {}
