import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Poll } from '../shared/voting';

@Injectable({
  providedIn: 'root'
})
export class VotingService
{
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$()
  {
    return this._refreshNeeded$;
  }

  submitVote(restaurantName: string)
  {
    const requestBody = { restaurant: restaurantName };
    return this.http.post<any>(baseURL + 'vote', requestBody)
      .pipe
      (
        tap(() => { this._refreshNeeded$.next(); })
      )
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPolls(): Observable<Poll[]>
  {
    return this.http.get<Poll[]>(baseURL + 'polls')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUsersPreviousVote(): Observable<string>
  {
    return this.http.get<string>(baseURL + 'polls/myvote')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTodaysPoll(polls): Poll
  {
    const today = this.getToday();
    let todaysPoll = {
      date: today,
      options: []
    };
    polls.forEach(poll =>
    {
      const pollDate = new Date(poll.date);
      if (pollDate.getTime() === today.getTime())
      {
        todaysPoll = poll;
      }
    });

    return todaysPoll;
  }

  parseOldPollsResults(polls: Poll[])
  {
    if (!polls) { return []; }

    const today = this.getToday();

    const parsedPolls = [];
    polls.forEach((poll) =>
    {
      const pollDate = new Date(poll.date);
      if (pollDate.getTime() !== today.getTime())
      {
        let winnerOption;
        let maxNumberOfVotes = 0;
        poll.options.forEach((option) =>
        {
          if (option.votes.length > maxNumberOfVotes)
          {
            maxNumberOfVotes = option.votes.length;
            winnerOption = option.restaurant;
          }
        });
        parsedPolls.push({
          date: poll.date,
          restaurant: winnerOption
        });
      }
    });
    return parsedPolls;
  }

  getToday(): Date
  {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  }


}
