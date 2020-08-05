import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VotingService } from '../services/voting.service';
import { Poll } from '../shared/voting';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  polls$: Observable<Poll[]>;
  constructor(private votingService: VotingService, private authService: AuthService) { }

  ngOnInit(): void
  {
    this.votingService.refreshNeeded$
      .subscribe(() =>
      {
        this.getPolls();
      });

    this.getPolls();
  }

  getTodaysPoll(polls): Poll
  {
    return this.votingService.getTodaysPoll(polls);
  }

  parseOldPollsResults(polls: Poll[]): any
  {
    return this.votingService.parseOldPollsResults(polls);
  }

  getPolls(): void
  {
     this.polls$ = this.votingService.getPolls();
  }
}
