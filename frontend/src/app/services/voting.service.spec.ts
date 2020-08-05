import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VotingService } from './voting.service';
import { baseURL } from '../shared/baseurl';
import { Poll } from '../shared/voting';

describe('VotingService', () => {
  let service: VotingService;
  let httpMock: HttpTestingController;
  let dummyPolls: Poll[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VotingService]
    });
    service = TestBed.inject(VotingService);
    httpMock = TestBed.inject(HttpTestingController);
    dummyPolls = [
      {
        date: service.getToday(),
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
      },
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
      },
      {
        date: new Date(2020, 6, 15),
        options: [
          {
            restaurant: 'Mi Cocina',
            votes: ['12', '345', '435']
          },
          {
            restaurant: 'Shark Sushi',
            votes: ['12', '345', '435']
          },
          {
            restaurant: 'Panorama',
            votes: ['12', '345', '435']
          }
        ]
      },
      {
        date: new Date(2020, 6, 14),
        options: [
          {
            restaurant: 'RU',
            votes: ['12', '345', '435']
          },
          {
            restaurant: 'Ponto 2',
            votes: ['12', '345', '435']
          },
          {
            restaurant: 'Chiques',
            votes: ['12', '345', '435']
          }
        ]
      },
      {
        date: new Date(2020, 6, 13),
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
      },
      {
        date: new Date(2020, 6, 10),
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
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return todays poll', () =>
  {
    const foundPoll = service.getTodaysPoll(dummyPolls);
    expect(foundPoll.date.getTime()).toEqual(service.getToday().getTime());
  });

  it('should return a list of parsed polls with restaurant values', () =>
  {
    const parsedPolls = service.parseOldPollsResults(dummyPolls);
    if (parsedPolls.length)
    {
      expect(parsedPolls
        .every(parsedPoll => typeof parsedPoll.restaurant === 'string' ))
        .toBeTruthy();
    }
    else
    {
      expect(parsedPolls).toBe([]);
    }
  });

  it('should return a date object for today with no hourly information', () =>
  {
    const serviceToday = service.getToday();
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    expect(serviceToday.getTime()).toEqual(today.getTime());
  });

  describe('#getPolls', () =>
  {
    it('should return an Observable<Poll[]>', () =>
    {
      service.getPolls().subscribe(polls =>
      {
        expect(polls.length).toBe(6);
        expect(polls).toEqual(dummyPolls);
      });

      const req = httpMock.expectOne(`${baseURL}polls`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPolls);
    });
  });


  describe('#submitVote', () =>
  {
    it('should return an Observable<Poll>', () =>
    {
      const dummyRestaurant = 'test';
      service.submitVote(dummyRestaurant)
        .subscribe((poll) =>
        {
          expect(poll).toBeDefined();
        });

      const req = httpMock.expectOne(`${baseURL}vote`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyRestaurant);
    });
  });

  describe('#getUsersPreviousVote', () =>
  {
    it('should return an Observable<string>', () =>
    {
      const dummyResponse = 'test';
      service.getUsersPreviousVote().subscribe(restaurant =>
      {
        expect(typeof restaurant).toEqual('string');
        expect(restaurant).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${baseURL}polls/myvote`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  afterEach(() =>
  {
    httpMock.verify();
  });
});
