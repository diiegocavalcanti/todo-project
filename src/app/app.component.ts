import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskformComponent } from './components/taskform/taskform.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from './classes/task';
import { TaskServiceService } from './services/task-service.service';
import { STATUS } from './constants/status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService]
})
export class AppComponent implements OnInit {
  title = 'todolist-project';

  ref: DynamicDialogRef | undefined;
  taskListArray: Array<Task> = []
  taskSelected: Task = new Task();
  statusList = STATUS;

  constructor(public dialogService: DialogService, private taskServiceService: TaskServiceService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  // Função para recuperar todas as task cadastradas
  getTaskList() {
    this.taskListArray = this.taskServiceService.getTaskList();
  }


  //  Função para abrir o modal com o form para adição de uma nova task
  //  Na chamada do modal é passado como parametros o titulo, uma classe para customização e dados para manipulação do form 
  //  É criado um subscribe no evento de destroy para controlar o modal

  show() {
    this.ref = this.dialogService.open(TaskformComponent, { header: 'Adicionar tarefa', styleClass: "modal-task", data: { mode: 'add' } });

    this.ref.onDestroy.subscribe((data) => {
      this.getTaskList();
    });
  }
  //  Função para abrir o modal com o form para edição de uma task
  //  Na chamada do modal é passado como parametros o titulo, uma classe para customização e dados para manipulação do form 
  //  É criado um subscribe no evento de destroy para controlar o modal
  openEditMode(task: Task, index: number) {
    this.ref = this.dialogService.open(TaskformComponent, { header: 'Editar tarefa', styleClass: "modal-task", data: { task: task, index: index, mode: 'edit' } });

    this.ref.onDestroy.subscribe((data) => {
      this.getTaskList();
    });
  }

  // Função criada para auxiliar no filtro ao listar tasks por status
  statusFilter(tasks: Task[], status: string) {
    if (!tasks || !status) {
      return tasks;
    }
    return tasks.filter(item => item.status.name == status);
  }

  // Função utilizada para atualizar o status quando o usuário move as tasks pelos quadros
  changeStatusByDrop(event: any, status: any) {
    this.taskServiceService.updateTaskStatus(status, this.taskSelected);
    this.getTaskList();
  }

  // Função criada para selecionar uma task quando o usuário a move com o Drag Drop
  dragStart(task: Task) {
    this.taskSelected = task;
  }


}
