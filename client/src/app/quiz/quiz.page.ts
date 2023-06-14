import {Component, OnInit} from '@angular/core';
import {AnswerDataService} from '../services/answer-data.service';
import {TaskDataService} from '../services/task-data.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
    taskID: any;
    tasks: any;
    taskName: any = null;
    formData: any = {};
    taskTime: any;

    handleChange(ev: any) {
        this.taskID = this.tasks[ev.target.value].taskID;
        this.taskName = this.tasks[ev.target.value].taskName;
    }

    getTasks() {
        this.taskDataService.getTaskData().subscribe(response => {
            console.log(response);
            this.tasks = response;
        });


    }

    async getFormData() {
        if (this.taskName === null) {
            const alert = this.toastController.create({
                message: 'Error saving your task! Please specify a task before saving your quiz.',
                duration: 2000,
                position: 'bottom',
                color: 'danger'
            });
            (await alert).present();
            return;
        }

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
            taskScore: this.questions.reduce((total, question) => total + question.answer, 0),
            dateTaken: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            taskID: this.taskID,
        };

        console.log(this.formData)

        this.answerDataService.postData(this.formData).subscribe({
            next: response => {
                console.log('Response from server:', response)
                this.router.navigateByUrl('/results');
            },
            error: async error => {
                console.error('Error:', error)
                const alert = this.toastController.create({
                    message: 'Error saving your answer! Please try logging in again.',
                    duration: 2000,
                    position: 'bottom',
                    color: 'danger'
                });
                (await alert).present();
                this.router.navigateByUrl('/login')
                return;
            }
        });
    }

    constructor(private answerDataService: AnswerDataService, private taskDataService: TaskDataService, private toastController: ToastController, private router: Router) {
    }


    questions: any[] = [
        {
            text: 'Mental Demand - How much mental and perceptual activity was required? Was the task easy or demanding, simple or complex?',
            answer: 5
        },
        {
            text: 'Physical Demand - How much physical activity was required? Was the task easy or demanding, slack or strenuous?',
            answer: 5
        },
        {
            text: 'Temporal Demand - How much time pressure did you feel due to the pace at which the tasks or task elements occurred? Was the pace slow or rapid?',
            answer: 5
        },
        {
            text: 'Own Performance - How successful were you in performing the task? How satisfied were you with your performance?',
            answer: 5
        },
        {
            text: 'Effort - How hard did you have to work (mentally and physically) to accomplish your level of performance?',
            answer: 5
        },
        {
            text: 'Frustration Level - How irritated, stressed, and annoyed versus content, relaxed, and complacent did you feel during the task?',
            answer: 5
        },
    ];

    selectTaskTime(time: any) {
        this.taskTime = time;
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getTasks()
    }

}
