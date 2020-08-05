import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollChartComponent } from './poll-chart.component';
import { Poll } from '../shared/voting';

describe('PollChartComponent', () =>
{
  let component: PollChartComponent;
  let fixture: ComponentFixture<PollChartComponent>;
  let dummyPoll: Poll;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [PollChartComponent]
    })
      .compileComponents();
    dummyPoll =
    {
      date: new Date(2020, 6, 16),
      options: [
        {
          restaurant: 'Mi Cocina',
          votes: ['12', '345', '435']
        },
        {
          restaurant: 'Yatta',
          votes: ['12', '345', '435']
        },
        {
          restaurant: 'Panorama',
          votes: ['12', '345', '435']
        }
      ]
    };
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(PollChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should have title', () =>
  {
    if (component.isOngoing)
    {
      expect(component.getChartConfiguration().title.text).toEqual('Votação em Andamento');
    }
    else
    {
      expect(component.getChartConfiguration().title.text).toEqual('Resultado da Votação');
    }

  });

  it('should have the x axis begin at zero', () =>
  {
    expect(component.getChartConfiguration().scales.xAxes[0].ticks.beginAtZero).toEqual(true);
  });

  it('should have the x axis step at 1', () =>
  {
    expect(component.getChartConfiguration().scales.xAxes[0].ticks.stepSize).toEqual(1);
  });

  it('should create list of labels with restaurant names', () =>
  {
    expect(component.parseChartData(dummyPoll).labels.length).toBeGreaterThan(0);
  });

  it('should create list of string values as the charts labels', () =>
  {
    expect(component.parseChartData(dummyPoll).labels.every(label => typeof label === 'string')).toBeTruthy();
  });

  it('should create list of values with number of votes per restaurant', () =>
  {
    expect(component.parseChartData(dummyPoll).datasets[0].data.length).toBeGreaterThan(0);
  });

  it('should create list of numeric values as the charts data', () =>
  {
    expect(component.parseChartData(dummyPoll).datasets[0].data.every(value => typeof value === 'number')).toBeTruthy();
  });

});
