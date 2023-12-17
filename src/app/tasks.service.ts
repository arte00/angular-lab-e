import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, of, tap} from "rxjs";
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly baseUrl = "http://localhost:45586/todos"

  constructor(private http: HttpClient) { }

  public index(archived = false): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/?archived=${archived}&_sort=id&_order=desc`, { observe: 'response'})
      .pipe(
        map(response => response.body as Task[]),
      )
  }

  public post(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, { observe: 'response' })
      .pipe(
        map(response => response.body as Task),
      )
  }

  public put(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task, { observe: 'response' })
      .pipe(
        map(response => response.body as Task),
      )
  }

  public delete(task: Task): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${task.id}`)
  }
}
