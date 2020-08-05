import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{

  signupForm: FormGroup;
  user = { username: '', password: '', firstname: '', lastname: '', confirmPassword: '' };
  errMess: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService) { }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm(): void
  {
    this.signupForm = new FormGroup({
      username: new FormControl(this.user.username,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      firstname: new FormControl(this.user.firstname,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      lastname: new FormControl(this.user.lastname,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      password: new FormControl(this.user.password,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      confirmPassword: new FormControl(this.user.confirmPassword,
        [
          Validators.required,
          Validators.minLength(2)
        ])
    });
  }

  onSubmit()
  {
    if (this.signupForm.value.password === this.signupForm.value.confirmPassword)
    {
      this.authService.signUp(this.signupForm.value)
        .subscribe(res =>
        {
          if (res.success)
          {
            this.dialogRef.close(res.success);
          }
        },
          error =>
          {
            if (error === 401)
            {
              this.errMess = 'Usuário ou senha inválidos.';
            }
          });
    }
  }

}
