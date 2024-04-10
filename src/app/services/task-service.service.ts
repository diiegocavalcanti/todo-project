import { Injectable } from '@angular/core';
import { Task } from '../classes/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  taskList: Array<Task> = []

  constructor() { }

  getTaskList() {
    this.taskList = this.getLocalStorage().length ? this.getLocalStorage() : []
    return this.taskList
  }

  addTask(task: Task) {
    this.taskList.push(task)
    console.log(this.taskList)
    this.syncLocalStorage();
  }

  removeTask(id: number) {
    
    this.taskList.forEach((item, index) => {
      if (item.id == id) {
        this.taskList.splice(index, 1)
      }
    })
    this.syncLocalStorage();
  }

  updateTask(task: Task) {
    this.taskList.forEach((item, index) => {
      if (item.id == task.id) {
        this.taskList[index] = task;
      }
    })
    this.syncLocalStorage();
  }

  updateTaskStatus(status: any, task: Task) {
    this.taskList.forEach((item, index) => {
      if (item.id == task.id) {
        this.taskList[index].status = status;
      }
    })
    this.syncLocalStorage();
  }

  syncLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }

  getLocalStorage(): [] {
    const taskList = localStorage.getItem('taskList') || '[]';
    return taskList !== null ? JSON.parse(taskList) : []
  }

  getLastId(): number {
    return this.taskList.length > 0 ? this.taskList[this.taskList.length - 1].id : 0;
  }

  getNextId(): number {
    return this.taskList.length > 0 ? this.taskList[this.taskList.length - 1].id + 1 : 0;
  }
}
