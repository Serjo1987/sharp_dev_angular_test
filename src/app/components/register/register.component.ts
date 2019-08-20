import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from  '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) { }

  private registerForm: FormGroup;
  public matchPasswords: boolean = false;
  public buttonDisabled: boolean = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  getError(el) {
    switch (el) {
      case 'username':
        if (this.registerForm.get('username').hasError('required')) return 'Name is required';
        break;
      case 'email':
        if (this.registerForm.get('email').hasError('required')) return 'Email is required';
        if (this.registerForm.get('email').hasError('email')) return 'Email is not valid';
        break;
      case 'password':
        if (this.registerForm.get('password').hasError('required')) return 'Password is required';
        break;
      case 'confirmPassword':
          if (this.registerForm.get('confirmPassword').hasError('required')) return 'Confirm password is required';
          break;
      default:
        return '';
    }
  }

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  public onSubmit() {
    if (this.registerForm.invalid) return;
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.matchPasswords = true;
      return;
    }
    
    if (
      !this.registerForm.invalid &&
      this.registerForm.value.password === this.registerForm.value.confirmPassword
    ) {
      this.matchPasswords = false;
      this.buttonDisabled = true;

      this.api.register(this.registerForm.value).subscribe(
        (data: any) => {
          localStorage.setItem('ACCESS_TOKEN', data.id_token);
          this.router.navigateByUrl('/admin');
        },
        (error: any) => {
          this.buttonDisabled = false;
          this.openSnackBar(error.error, 'close');
        }
      );
    }
  }
}
