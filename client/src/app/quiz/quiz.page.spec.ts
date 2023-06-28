import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { QuizPage } from './quiz.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnswerDataService } from '../services/answer-data.service';
import { TaskDataService } from '../services/task-data.service';

describe('QuizPage', () => {
  let component: QuizPage;
  let fixture: ComponentFixture<QuizPage>;
  let answerDataService: AnswerDataService;
  let taskDataService: TaskDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizPage],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AnswerDataService, TaskDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizPage);
    component = fixture.componentInstance;
    answerDataService = TestBed.inject(AnswerDataService);
    taskDataService = TestBed.inject(TaskDataService);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#selectTaskTime should assign the correct time', () => {
    const testTime = '5 minutes';
    component.selectTaskTime(testTime);
    expect(component.taskTime).toBe(testTime);
  });

  it('#getTasks should fetch tasks', () => {
    const tasksStub = [{ taskID: 1, taskName: 'Task 1' }, { taskID: 2, taskName: 'Task 2' }];
    spyOn(taskDataService, 'getTaskData').and.returnValue(of(tasksStub));

    component.getTasks();

    expect(component.tasks).toBe(tasksStub);
    expect(taskDataService.getTaskData).toHaveBeenCalled();
  });

  it('ionViewDidEnter should fetch tasks', () => {
    spyOn(component, 'getTasks');

    component.ionViewDidEnter();

    expect(component.getTasks).toHaveBeenCalled();
  });

  // Add similar tests for handleChange, getFormData...
});
