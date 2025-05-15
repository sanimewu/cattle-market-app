import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../service/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NzDividerComponent,
    NzInputDirective,
    NzButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService, private message: NzMessageService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  submitSignIn() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next:(result)=>{
        if(result){
          this.message.success("Successfully logged in");
          this.router.navigate(['/list']).then();
        }
      },
      error:(error)=>{
        this.message.warning("Email and password is not valid");
        console.log(error);
      }
    })
  }

  forgetPass() {
    this.authService.forgetPass(this.loginForm.value.email).subscribe({
      next:(result)=>{
        console.log(result);
        this.message.success("check mail");
      },
      error:(error)=>{
        this.message.warning("Email is not valid");
        console.log(error);
      }
    })
  }

  signUpWithGoogle() {
    this.authService.googleSignUp().subscribe({
      next: (result:any) => {
        if(result){
          this.message.success('Sign up with Google successfully');
          this.router.navigate(['/list']).then();
        }
      },
      error:(error:any)=>{
        this.message.error('Sign up failed');
      }
    })
  }



}
