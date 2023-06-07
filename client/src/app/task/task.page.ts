import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskDataService } from '../services/task-data.service';
import { Router } from '@angular/router';
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

  constructor(private taskDataService: TaskDataService, private router: Router) { }

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

    this.taskForm.value["sessionID"] = sessionStorage.getItem("sessionID")
    this.taskForm.value["userID"] = sessionStorage.getItem("sessionID")

    const formData = {
      "taskName": this.taskForm.value.taskName,
      "taskType": this.taskForm.value.taskType,
      "taskTime": this.taskForm.value.taskTime,
      "userID": 1,

      // "userID": this.taskForm.value.userID,
      // "sessionID": this.taskForm.value.sessionID
    }

    this.taskDataService.postData(formData).subscribe({
      next: response => console.log('Response from server:', response),
      error: error => console.error('Error:', error)
    });
  }
}
