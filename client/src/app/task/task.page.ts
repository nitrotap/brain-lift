import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  
  taskForm: any
  constructor() { }

  ngOnInit() {
  }

  selectTaskTime(time: any) { }
  selectTaskType(type: any) { }

  

}

