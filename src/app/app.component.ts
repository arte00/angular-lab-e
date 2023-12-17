import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, map, startWith, tap} from "rxjs";
import {style} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoList';
  currentPage!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      startWith(this.router.url),
      filter(event => event instanceof NavigationEnd),
      tap(() => this.currentPage = this.router.url)
    )
      .subscribe()
  }

  protected readonly style = style;
}

