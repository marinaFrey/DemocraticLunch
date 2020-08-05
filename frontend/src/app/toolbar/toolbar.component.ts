import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  username: string;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUsername()
      .subscribe(name => { this.username = name; });
  }

  openLoginForm()
  {
    this.dialog.open(LoginComponent, { width: '500px', height: '350px' });
  }

  openSignUpForm()
  {
    this.dialog.open(SignUpComponent, { width: '500px', height: '500px' });
  }

  logOut()
  {
    this.username = undefined;
    this.authService.logOut();
  }

}
