import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../shared/voting';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'app-week-choices',
  templateUrl: './week-choices.component.html',
  styleUrls: ['./week-choices.component.css']
})
export class WeekChoicesComponent implements OnInit
{
  @Input() polls: Poll[];
  parsedPolls;

  constructor(private votingService: VotingService) { }

  ngOnInit(): void
  {
    this.getParsedPollsResults();
  }

  getParsedPollsResults()
  {
    this.parsedPolls = this.votingService.parseOldPollsResults(this.polls);
  }

}
