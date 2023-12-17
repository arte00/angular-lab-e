import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TasksService} from "../tasks.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public tasks: Task[] = [];

  constructor(private taskService: TasksService) {
  }

  ngOnInit(): void {
    this.taskService.index(true).pipe(
      tap(tasks => {
        this.tasks = tasks;
      })
    )
      .subscribe();
  }

  delete(task: Task) {
    const confirmation = window.confirm("Are you sure you want to delete this item?")
    if (confirmation) {
      this.taskService.delete(task).pipe(
        tap(() => this.ngOnInit())
      )
        .subscribe()

    } else {
      return;
    }
  }
}
