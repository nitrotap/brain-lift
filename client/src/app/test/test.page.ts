import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../services/task-data.service';
import { AnswerDataService } from '../services/answer-data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  taskData: any;
  formData: any;
  answerData: any;

  constructor(private taskDataService: TaskDataService, private answerDataService: AnswerDataService) { }

  getTaskData() {

    this.taskDataService.getData().subscribe(response => {
      console.log(response);
      this.taskData = JSON.stringify(response);
    });
  }

  postTaskData(formData: any) {
    if (!formData) {
      formData = {
        "taskName": "Doodling",
        "taskType": "Type A",
        "taskTime": "10:00",
        "userID": 1
      }
    }

    this.taskDataService.postData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });

  }

  updateTaskData(formData: any) {
    if (!formData) {
      formData = {
        "taskID": 34,
        "taskName": "Swimming",
        "taskType": "Type B",
        "taskTime": "10:00",
        "userID": 1
      }
    }

    this.taskDataService.updateData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }

  deleteTaskData(formData: any) {
    if (!formData) {
      formData = {
        "taskID": 32
      }
    }

    console.log('data' + JSON.stringify(formData))

    this.taskDataService.deleteData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }

  getAnswerData() {

    this.answerDataService.getData().subscribe(response => {
      console.log(response);
      this.taskData = JSON.stringify(response);
    });
  }

  postAnswerData(formData: any) {
    if (!formData) {
      formData = {
        "answerID": 1,
        "taskAnswer_1": 5,
        "taskAnswer_2": 5,
        "taskAnswer_3": 5,
        "taskAnswer_4": 5,
        "taskAnswer_5": 5,
        "taskAnswer_6": 5,
        "taskScore": 30,
        "dateTaken": "2023-05-15 11:30:00",
        "userID": 1,
        "taskID": 1
      }
    }

    this.answerDataService.postData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });

  }

  updateAnswerData(formData: any) {
    if (!formData) {
      formData = {
        "answerID": 16,
        "taskAnswer_1": 10,
        "taskAnswer_2": 5,
        "taskAnswer_3": 5,
        "taskAnswer_4": 5,
        "taskAnswer_5": 5,
        "taskAnswer_6": 5,
        "taskScore": 30,
        "dateTaken": "2023-05-15 11:30:00",
        "userID": 1,
        "taskID": 1
      }
    }


    this.answerDataService.updateData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }

  deleteAnswerData(formData: any) {
    if (!formData) {
      formData = {
        "answerID": 17
      }
    }

    console.log('data' + JSON.stringify(formData))

    this.answerDataService.deleteData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }









  ngOnInit() {
  }
}
