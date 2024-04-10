import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../classes/task';
import { TaskServiceService } from '../../services/task-service.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { STATUS } from '../../constants/status';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.scss'
})
export class TaskformComponent {
  taskForm!: FormGroup;
  statusList = STATUS;

  constructor(private formBuilder: FormBuilder, private taskServiceService: TaskServiceService, public dialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.createForm(new Task());
    if (this.config.data.mode == 'edit') {
      if(typeof this.config.data.task.createDate === "string" || 
      typeof this.config.data.task.endDate === "string" ) {
        this.config.data.task.createDate = new Date(this.config.data.task.createDate)
        this.config.data.task.endDate = new Date(this.config.data.task.endDate)
      }
      this.taskForm.patchValue(this.config.data.task);
    }

  }

  createForm(task: Task) {
    this.taskForm = this.formBuilder.group({
      id: [this.taskServiceService.getNextId()],
      title: [task.title, Validators.required],
      description: [task.description, Validators.required],
      status: [this.config.data.mode == 'add' ? this.statusList[0] : task.status, Validators.required],
      createDate: [task.createDate, Validators.required],
      endDate: [task.endDate, Validators.required]
    })

    if(this.config.data.mode == 'add') {
      this.taskForm.controls['status'].disable();
    }
  }

  addTask() {
    this.taskServiceService.addTask(this.taskForm.getRawValue())
    this.taskForm.reset();
    this.showMessage('Tarefa adicionada');
    this.destroyModal();


  }

  editTask() {
    this.taskServiceService.updateTask(this.taskForm.getRawValue() as Task);
    this.taskForm.reset();
    this.showMessage('Tarefa atualizada');
    this.destroyModal()
  }

  removeTask() {
    this.taskServiceService.removeTask(this.config.data.task.id);
    this.taskForm.reset();
    this.showMessage('Tarefa removida');
    this.destroyModal();
  }

  destroyModal() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

  showMessage(message: string) {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: message });
}



}
