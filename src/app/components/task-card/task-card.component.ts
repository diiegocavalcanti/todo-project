import { Component, Input } from '@angular/core';
import { Task } from '../../classes/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) index!: number;

  public formatDate(date: Date | null): string {
    if(date) {
      if(typeof date  === "string") {
        date = new Date(date)
      
      }
      let day = date.getDate();
      let month = date.getMonth() + 1; // add 1 because months are indexed from 0
      let year = date.getFullYear();
  
      return day + '/' + month + '/' + year
    } 
    return 'error'
  }

}
