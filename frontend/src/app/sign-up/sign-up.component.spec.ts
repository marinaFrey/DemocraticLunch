import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

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
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () =>
  {
    component.signupForm.controls.username.setValue('');
    component.signupForm.controls.firstname.setValue('');
    component.signupForm.controls.lastname.setValue('');
    component.signupForm.controls.password.setValue('');
    component.signupForm.controls.confirmPassword.setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('form should be valid', () =>
  {
    component.signupForm.controls.username.setValue('teste');
    component.signupForm.controls.firstname.setValue('testefirstname');
    component.signupForm.controls.lastname.setValue('testelastname');
    component.signupForm.controls.password.setValue('testepassword');
    component.signupForm.controls.confirmPassword.setValue('testepassword');
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should have a title', () =>
  {
    const title = fixture.debugElement.query(By.css('#loginTitle')).nativeElement;
    expect(title.innerHTML).toBe('Cadastre-se');
  });
});
