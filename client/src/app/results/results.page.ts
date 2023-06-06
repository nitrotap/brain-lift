import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  results: any;
  demoResults = [
    {
      "answerID": 10, "taskAnswer_1": 5, "taskAnswer_2": 5, "taskAnswer_3": 5, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 30, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 1
    },
    {
      "answerID": 11, "taskAnswer_1": 4, "taskAnswer_2": 5, "taskAnswer_3": 4, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 28, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 1
    },
    {
      "answerID": 10, "taskAnswer_1": 5, "taskAnswer_2": 5, "taskAnswer_3": 5, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 30, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 3
    },
    {
      "answerID": 11, "taskAnswer_1": 4, "taskAnswer_2": 5, "taskAnswer_3": 4, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 28, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 3
    },
    {
      "answerID": 10, "taskAnswer_1": 5, "taskAnswer_2": 5, "taskAnswer_3": 5, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 30, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 4
    },
    {
      "answerID": 11, "taskAnswer_1": 4, "taskAnswer_2": 5, "taskAnswer_3": 4, "taskAnswer_4": 5, "taskAnswer_5": 5, "taskAnswer_6": 5, "taskScore": 28, "dateTaken": "2023-05-15 11:30:00", "userID": 1, "taskID": 4
    },
  ]


  constructor(private router: Router) { }

  goQuiz() {
    this.router.navigateByUrl('/quiz');
  }

  ngOnInit() {
  }

}
