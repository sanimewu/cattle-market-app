import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {AuthService} from '../../service/auth.service';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzDividerComponent,
    NzInputDirective,
    RouterLink,
    NzButtonComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private message: NzMessageService, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitSignUp() {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (result) => {
        if(result){
          this.message.success('Sign up successfully');
          this.router.navigate(['/login']).then();
        }
      },
      error: (error) => {
        this.message.error('Sign up failed');
      }
    })
  }





}
