import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeekChoicesComponent } from './week-choices.component';

describe('WeekChoicesComponent', () =>
{
  let component: WeekChoicesComponent;
  let fixture: ComponentFixture<WeekChoicesComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WeekChoicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(WeekChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should have a title', () =>
  {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Votações da Semana');
  });


  it('should show the poll chart to the corresponding poll', () =>
  {
    component.getParsedPollsResults();
    if (component.parsedPolls && component.polls)
    {
      expect(component.parsedPolls[component.parsedPolls.length - 1].date.getTime())
        .toBe(component.polls[component.parsedPolls.length - 1].date.getTime());
    }
    else
    {
      expect(component.polls).toBe(undefined);
    }
  });

  it('should have a restaurant and date property for each parsed poll', () =>
  {
    if (component.parsedPolls)
    {
      expect(component.parsedPolls
        .every(parsedPoll => typeof parsedPoll.restaurant === 'string' && typeof parsedPoll.date === 'object'))
        .toBeTruthy();
    }
    else
    {
      expect(component.parsedPolls).toBe(undefined);
    }

  });
});
