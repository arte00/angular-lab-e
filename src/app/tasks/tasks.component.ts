import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import { Task } from "../task"
import {Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {

  public tasks: Observable<Task[]> = this.taskService.index();

  constructor(private taskService: TasksService) {
  }

}
