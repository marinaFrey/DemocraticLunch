import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () =>
  {
    component.loginForm.controls.username.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be valid', () =>
  {
    component.loginForm.controls.username.setValue('teste');
    component.loginForm.controls.password.setValue('testepassword');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should have a title', () =>
  {
    const title = fixture.debugElement.query(By.css('#loginTitle')).nativeElement;
    expect(title.innerHTML).toBe('Entrar');
  });
});
