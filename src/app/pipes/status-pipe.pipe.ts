import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../classes/task';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[]  {
    if (!tasks || !status) {
      return tasks;
  }
  return tasks.filter(item => item.status.name == 'pending');
  }
}
