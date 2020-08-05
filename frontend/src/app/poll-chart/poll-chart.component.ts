import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Poll } from '../shared/voting';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
  styleUrls: ['./poll-chart.component.css']
})
export class PollChartComponent implements AfterViewInit
{

  @ViewChild('pollChart') pollChart: ElementRef;
  @Input() poll: Poll;
  @Input() isOngoing: boolean;
  constructor() { }

  ngAfterViewInit()
  {
    if (this.poll && this.poll.options.length > 0)
    {
      const sortedPollData = this.sortOptionsByMostVotes(this.poll);
      const pollData = this.parseChartData(sortedPollData);
      const chartConfiguration = this.getChartConfiguration();
      this.createChart(pollData, chartConfiguration);
    }
  }

  createChart(pollData, chartConfiguration): void
  {
    const ctx = this.pollChart.nativeElement; // document.getElementById(this.poll.date.toString());
    const myBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: pollData,
      options: chartConfiguration
    });
  }

  sortOptionsByMostVotes(poll: Poll)
  {
    const sortedPoll = JSON.parse(JSON.stringify(poll));
    const sortedOptions = sortedPoll.options.sort((a, b) =>
    {
      return (b.votes.length - a.votes.length);
    });
    sortedPoll.options = sortedOptions;
    return sortedPoll;
  }

  parseChartData(poll: Poll)
  {
    const pollData =
    {
      labels: [],
      datasets:
        [
          {
            label: 'Votos',
            backgroundColor: 'RGB(63,81,181)',
            data: []
          }
        ]
    };
    poll.options.forEach((option) =>
    {
      pollData.labels.push(option.restaurant);
      pollData.datasets[0].data.push(option.votes.length);
    });
    return pollData;
  }

  getChartConfiguration()
  {
    let chartTitle = 'Resultado da Votação';
    if (this.isOngoing)
    {
      chartTitle = 'Votação em Andamento';
    }
    const config =
    {
      legend: { display: false },
      title:
      {
        display: true,
        text: chartTitle
      },
      scales: {
        xAxes: [{
          ticks: {
            suggestedMin: 0,
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    };
    return config;
  }

}
