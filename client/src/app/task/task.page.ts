import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskDataService } from '../services/task-data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskType: new FormControl(''),
    taskTime: new FormControl(''),
    userID: new FormControl(''),   // todo
    sessionID: new FormControl(''), // todo
  });

  constructor(private taskDataService: TaskDataService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  selectTaskTime(time: any) {
    this.taskForm.controls['taskTime'].setValue(time);
  }

  selectTaskType(type: any) {
    this.taskForm.controls['taskType'].setValue(type);
  }

  saveTask() {

    // console.log(this.taskForm.value)

    // this.taskForm.value["sessionID"] = sessionStorage.getItem("sessionID")
    // this.taskForm.value["userID"] = sessionStorage.getItem("userID")

    const formData = {
      "taskName": this.taskForm.value.taskName,
      "taskType": this.taskForm.value.taskType,
      "taskTime": this.taskForm.value.taskTime,
      // "userID": this.taskForm.value.userID,
      // "sessionID": this.taskForm.value.sessionID
    }

    this.taskDataService.postData(formData).subscribe({
      next: async response => {
        console.log('Response from server:', response)
        const alert = this.toastController.create({
          message: 'Your new task has been saved!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        (await alert).present();

        this.router.navigateByUrl('/quiz');


      },
      error: async error => {
        console.log('Error:', error)
        this.router.navigateByUrl('/login');
        const alert = this.toastController.create({
          message: 'Error saving your task! Please try to login and retry saving your new task',
          duration: 2000,
          position: 'bottom',
          color: 'danger'
        });
        (await alert).present();

      }
    });
  }

  async ionViewDidEnter() {
    if (sessionStorage.getItem('sessionID') && sessionStorage.getItem('access') === 'true' && sessionStorage.getItem('userID')) {

    } else {
      const alert = this.toastController.create({
        message: 'Not Logged In - Unable to view tasks.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await (await alert).present();

      await this.router.navigateByUrl('/login')

    }
  }

}
