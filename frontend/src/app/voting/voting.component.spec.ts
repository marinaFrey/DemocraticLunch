import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VotingComponent } from './voting.component';
import { By } from '@angular/platform-browser';

describe('VotingComponent', () =>
{
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VotingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(VotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should show only one type of message at a time', () =>
  {
    if (component.errMess !== null && component.errMess !== undefined)
    {
      expect(component.successMess).toBeUndefined();
    }
    if (component.successMess !== null && component.successMess !== undefined)
    {
      expect(component.errMess).toBeUndefined();
    }
    expect(component.errMess).toEqual(component.successMess);
  });

  it('should call the submitVote method when sending vote', () =>
  {
    fixture.detectChanges();
    spyOn(component, 'submitVote');
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitVote).toHaveBeenCalledTimes(1);
  });

});
