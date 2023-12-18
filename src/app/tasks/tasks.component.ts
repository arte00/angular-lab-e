import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import { Task } from "../task"
import {forkJoin, Observable, tap} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  public tasks: Task[] = [];
  public newTask: Task = {}

  constructor(private taskService: TasksService) {
  }

  ngOnInit(): void {
    this.taskService.index().pipe(
      tap(tasks => {
        this.tasks = tasks;
      })
    )
      .subscribe();
  }

  public addTask() {
    if (!this.isTaskValid(this.newTask)) {
      return;
    }

    this.newTask.archived = false;
    this.newTask.completed = false;

    this.taskService.post(this.newTask).pipe(
      tap(() => {
        this.newTask = {};
        this.ngOnInit();
      })
    )
      .subscribe()
  }

  public handleChange(task: Task) {
    this.taskService.put(task)
      .subscribe();
  }

  public archiveCompleted() {

    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (task.completed) {
        task.archived = true;
        observables.push(this.taskService.put(task));
      }
    }

    forkJoin(observables).pipe(
      tap(() => {
        this.ngOnInit();
      })
    )
      .subscribe();
  }

  public canAddTask(): boolean {
    return this.isTaskValid(this.newTask);
  }

  public canArchiveCompleted(): boolean {
    return this.tasks.some(task => task.completed);
  }

  private isTaskValid(task: Task): boolean {
    return task.title !== undefined && task.title !== '' && task.deadline !== undefined;
  }

}
