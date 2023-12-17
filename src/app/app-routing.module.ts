import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TasksComponent} from "./tasks/tasks.component";
import {ArchiveComponent} from "./archive/archive.component";

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
