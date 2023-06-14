import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../services/task-data.service';
TaskDataService
import { AnswerDataService } from '../services/answer-data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  results: any;
  answerResults: any;


  getResultsForTask(taskID: number): any[] {
    return this.answerResults ? this.answerResults.filter((result: any) => result.taskID === taskID) : [];
  }


  getTaskData() {
    // user specific tasks

    this.taskDataService.getTaskData().subscribe(response => {
      this.results = response;
      console.log(response)
    });
  }

  getAnswerData() {
    this.answerDataService.getAnswerData().subscribe(response => {
      console.log(response);
      this.answerResults = response;
      const averageTaskScores = this.calculateAverageTaskScores(response);
      console.log(averageTaskScores);
    });

  }

  constructor(private router: Router, private taskDataService: TaskDataService, private answerDataService: AnswerDataService, private toastController: ToastController) { }

  goQuiz() {
    this.router.navigateByUrl('/quiz');
  }

    getTaskScoreColor(score: number): string {
        if(score < 20) {
            return 'success';
        } else if(score >= 21 && score <= 39) {
            return 'warning';
        } else {
            return 'danger';
        }
    }

    goTask() {
    this.router.navigateByUrl('/task');
  }

  deleteTask(task: any) {
    // Handle task deletion here
    console.log('Deleting task: ', task);
    const formData = {
      "taskID": task.taskID
    }

    this.taskDataService.deleteData(formData).subscribe({
      next: async response => {
        console.log('Response from server:', response)
        const alert = this.toastController.create({
          message: 'Task deleted successfully.',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        (await alert).present();

        this.ionViewDidEnter();
      },
      error: async error => {
        console.error('Error:', error)
        const alert = this.toastController.create({
          message: 'Error deleting your task! Please try to delete all associated results before deleting a task.',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
        (await alert).present();

      }
    });



  }

  deleteResult(result: any) {
    // Handle answer deletion here
    const formData = {
      "answerID": result.answerID
    }

    this.answerDataService.deleteData(formData).subscribe({
      next: response => {
        console.log('Response from server:', response)
        this.ionViewDidEnter();
      },
      error: error => console.error('Error:', error)
    });




    console.log('Deleting result: ', result);
  }

  getAverageScoreForTask(taskID: number): number {
    const taskResults = this.getResultsForTask(taskID);
    const totalScore = taskResults.reduce((sum, result) => sum + result.taskScore, 0);
    const averageScore = totalScore / taskResults.length;
    const roundedAverageScore = Math.round(averageScore * 100) / 100; // Round to two decimal places
    return roundedAverageScore;
  }


  calculateAverageTaskScores(data: any): Map<number, number> {
    const taskScoresMap = new Map<number, { count: number, totalScore: number }>();

    for (const result of data) {
      const taskID = result.taskID;
      const taskScore = result.taskScore;

      if (taskScoresMap.has(taskID)) {
        const taskData = taskScoresMap.get(taskID);
        if (taskData) {
          taskData.count += 1;
          taskData.totalScore += taskScore;
        }
      } else {
        taskScoresMap.set(taskID, { count: 1, totalScore: taskScore });
      }
    }

    const averageScoresMap = new Map<number, number>();
    for (const [taskID, taskData] of taskScoresMap.entries()) {
      if (taskData) {
        const averageScore = taskData.totalScore / taskData.count;
        averageScoresMap.set(taskID, averageScore);
      }
    }

    return averageScoresMap;
  }




  ngOnInit() {
    this.getTaskData();
    this.getAnswerData();




  }

  async ionViewDidEnter() {
    if (sessionStorage.getItem('sessionID')) {
      this.getTaskData();
      this.getAnswerData();

    } else {
      const alert = this.toastController.create({
        message: 'Not Logged In - Unable to view tasks.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      (await alert).present();

      this.router.navigateByUrl('/login')



    }




  }

}
