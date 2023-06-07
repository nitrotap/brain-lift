import { Component, OnInit } from '@angular/core';
import { AnswerDataService } from '../services/answer-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  userID: string = '1';
  taskID: string = '1';

  formData: any = {};

  getFormData() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    this.formData = {
      taskAnswer_1: this.questions[0].answer,
      taskAnswer_2: this.questions[1].answer,
      taskAnswer_3: this.questions[2].answer,
      taskAnswer_4: this.questions[3].answer,
      taskAnswer_5: this.questions[4].answer,
      taskAnswer_6: this.questions[5].answer,
      taskScoreTotal: this.questions.reduce((total, question) => total + question.answer, 0),
      dateTaken: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      userID: this.userID,
      taskID: this.taskID,
    };

    console.log(this.formData)

    this.answerDataService.postData(this.formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }

  constructor(private answerDataService: AnswerDataService) { }

  taskName: string = 'Task Name';

  questions: any[] = [
    {
      text: 'Mental Demand - How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex?',
      answer: 1
    },
    {
      text: 'Physical Demand - How much physical activity was required? Was the task easy or demanding, slack or strenuous?',
      answer: 1
    },
    {
      text: 'Temporal Demand - How much time pressure did you feel due to the pace at which the tasks or task elements occurred? Was the pace slow or rapid?',
      answer: 1
    },
    {
      text: 'Own Performance - How successful were you in performing the task? How satisfied were you with your performance?',
      answer: 1
    },
    {
      text: 'Effort - How hard did you have to work (mentally and physically) to accomplish your level of performance?',
      answer: 1
    },
    {
      text: 'Frustration Level - How irritated, stressed, and annoyed versus content, relaxed, and complacent did you feel during the task?',
      answer: 1
    },
  ];


  ngOnInit() {
  }

}
