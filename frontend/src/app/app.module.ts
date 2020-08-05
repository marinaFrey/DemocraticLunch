import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VotingComponent } from './voting/voting.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { WeekChoicesComponent } from './week-choices/week-choices.component';
import { PollChartComponent } from './poll-chart/poll-chart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VotingService } from './services/voting.service';
import { AuthService } from './services/auth.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

registerLocaleData(localeBr, 'pt');

const materialModules = [
  MatCardModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    AppComponent,
    VotingComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    WeekChoicesComponent,
    PollChartComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    materialModules
  ],
  providers: [
    VotingService,
    AuthService,
    ProcessHTTPMsgService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
