import { Component, OnInit, Input } from '@angular/core';
import { Poll } from '../shared/voting';
import { VotingService } from '../services/voting.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit
{

  @Input() poll: Poll;

  restaurantOption;
  customRestaurantName;
  myOption: string;
  userAlreadyVoted = false;
  errMess: string;
  successMess: string;

  constructor(private votingService: VotingService, private authService: AuthService) { }

  ngOnInit(): void
  {
    this.authService.refreshNeeded$
      .subscribe(() =>
      {
        if (this.authService.isLoggedIn())
        {
          this.getUsersPreviousVote();
        }
        else
        {
          this.restaurantOption = undefined;
          this.userAlreadyVoted = false;
        }
      });

    if (this.authService.isLoggedIn())
    {
      this.getUsersPreviousVote();
    }
  }

  getUsersPreviousVote()
  {
    this.votingService.getUsersPreviousVote()
      .subscribe(vote =>
      {
        this.restaurantOption = vote;
        if (this.restaurantOption !== null && this.restaurantOption !== undefined)
        {
          this.userAlreadyVoted = true;
        }
        else
        {
          this.userAlreadyVoted = false;
        }
      });
  }

  submitVote(): void
  {
    if (this.restaurantOption === 'other')
    {
      this.myOption = this.customRestaurantName;
    }
    else
    {
      this.myOption = this.restaurantOption;
    }

    if (this.myOption !== undefined)
    {
      this.votingService.submitVote(this.myOption)
        .subscribe(poll =>
        {
          this.poll = poll;
          this.customRestaurantName = '';
          this.successMess = 'Voto submetido a restaurante ' + this.myOption;
          this.errMess = null;
          this.userAlreadyVoted = true;
        },
          error =>
          {
            if (error === 401)
            {
              this.errMess = 'Por favor entre com seu usuário e senha antes de votar.';
              this.successMess = null;
            }
            if (error === 406)
            {
              this.errMess = 'Opção já escolhida nesta semana. Por favor enviar outra opção.';
              this.successMess = null;
            }
          });
    }
    else
    {
      this.errMess = 'Por favor escolha uma opção válida.';
      this.successMess = null;
    }

  }

}
