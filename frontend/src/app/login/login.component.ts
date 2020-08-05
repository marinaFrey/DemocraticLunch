import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user = { username: '', password: '' };
  errMess: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private authService: AuthService) { }

  ngOnInit(): void
  {
    this.createForm();
  }

  createForm(): void
  {
    this.loginForm = new FormGroup({
      username: new FormControl(this.user.username,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
      password: new FormControl(this.user.password,
        [
          Validators.required,
          Validators.minLength(2)
        ]),
    });
  }

  onSubmit()
  {
    this.authService.logIn(this.loginForm.value)
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
