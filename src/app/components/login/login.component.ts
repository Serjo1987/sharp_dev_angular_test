import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from  '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder, private matSnackBar: MatSnackBar) { }

  private loginForm: FormGroup;
  public buttonDisabled: boolean = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getError(el) {
    switch (el) {
      case 'email':
        if (this.loginForm.get('email').hasError('required')) return 'Email is required';
        if (this.loginForm.get('email').hasError('email')) return 'Email is not valid';
        break;
      case 'password':
        if (this.loginForm.get('password').hasError('required')) return 'Password is required';
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
    if (this.loginForm.invalid) return;
    else {
      this.buttonDisabled = true;
      this.api.login(this.loginForm.value).subscribe(
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
