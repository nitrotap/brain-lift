import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskDataService} from '../services/task-data.service';
import {AnswerDataService} from '../services/answer-data.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-results',
    templateUrl: './results.page.html',
    styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
    results: any;
    answerResults: any;

    constructor(
        private router: Router,
        private taskDataService: TaskDataService,
        private answerDataService: AnswerDataService,
        private toastController: ToastController
    ) {
    }

    getResultsForTask(taskID: number): any[] {
        return this.answerResults ? this.answerResults.filter((result: any) => result.taskID === taskID) : [];
    }

    getTaskData() {
        // user specific tasks
        this.taskDataService.getTaskData().subscribe(
            (response) => {
                this.results = response;
                console.log(response);
            },
            (error) => {
                console.error('Error:', error);
                this.showErrorMessage('Error fetching task data!');
                this.router.navigateByUrl('/login')
            }
        );
    }

    getAnswerData() {
        this.answerDataService.getAnswerData().subscribe(
            (response) => {
                console.log(response);
                this.answerResults = response;
                const averageTaskScores = this.calculateAverageTaskScores(response);
                console.log(averageTaskScores);
            },
            (error) => {
                console.error('Error:', error);
                this.showErrorMessage('Error fetching answer data!');
            }
        );
    }

    goQuiz() {
        this.router.navigateByUrl('/quiz');
    }

    getTaskScoreColor(score: number): string {
        if (score < 20) {
            return 'success';
        } else if (score >= 21 && score <= 39) {
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
            taskID: task.taskID,
        };

        this.taskDataService.deleteData(formData).subscribe(
            {
                next: async (response) => {
                    console.log('Response from server:', response);
                    const alert = await this.toastController.create({
                        message: 'Task deleted successfully.',
                        duration: 2000,
                        position: 'bottom',
                        color: 'success',
                    });
                    await alert.present();

                    this.ionViewDidEnter();
                },
                error: async (error) => {
                    console.error('Error:', error);
                    const alert = await this.toastController.create({
                        message: 'Error deleting your task! Please try to delete all associated results before deleting a task.',
                        duration: 2000,
                        position: 'bottom',
                        color: 'danger',
                    });
                    await alert.present();
                },
            }
        );
    }

    deleteResult(result: any) {
        // Handle answer deletion here
        const formData = {
            answerID: result.answerID,
        };

        this.answerDataService.deleteData(formData).subscribe(
            {
                next: (response) => {
                    console.log('Response from server:', response);
                    this.ionViewDidEnter();
                },
                error: (error) => console.error('Error:', error),
            }
        );

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
        const taskScoresMap = new Map<number, { count: number; totalScore: number }>();

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
                taskScoresMap.set(taskID, {count: 1, totalScore: taskScore});
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

    formatDate(input: string): string | null {
        try {
            // Create a date object from the input string
            let dateObj = new Date(input);

            // Check if date is valid
            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid date.');
            }

            // Format the date and time components
            let date =
                ('0' + (dateObj.getMonth() + 1)).slice(-2) +
                '/' +
                ('0' + dateObj.getDate()).slice(-2) +
                '/' +
                dateObj.getFullYear().toString().slice(-2);

            let time =
                ('0' + dateObj.getHours()).slice(-2) +
                ':' +
                ('0' + dateObj.getMinutes()).slice(-2) +
                ':' +
                ('0' + dateObj.getSeconds()).slice(-2);

            // Return the formatted date and time
            return date + ' ' + time;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async ionViewDidEnter() {
        if (sessionStorage.getItem('sessionID')) {
            this.getTaskData();
            this.getAnswerData();
        } else {
            this.showErrorMessage('Not Logged In - Unable to view tasks.');
            await this.router.navigateByUrl('/login');
        }
    }

    async showErrorMessage(message: string) {
        const alert = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
            color: 'danger',
        });
        await alert.present();
    }

    ngOnInit() {
    }
}
