import { Component, OnInit } from '@angular/core';
import {TaskService} from './task.service';
import {Task} from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    tasks: Task[];
    title: string;

    constructor(private taskService: TaskService) {}

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }

    addTask(event) {
        event.preventDefault();
        const newTask = {
            taskId: '',
            title: this.title,
            isDone: false
        };

        this.taskService
            .addTask(newTask)
            .subscribe(data => {
                this.tasks.push(newTask);
                newTask.taskId = data.taskId;
                this.title = '';
            });
    }

    deleteTask(id) {
        this.taskService
            .deleteTask(id)
            .subscribe(data => {
                for (let i = 0; i < this.tasks.length; i++) {
                    if (this.tasks[i].taskId === id) {
                        this.tasks.splice(i, 1);
                    }
                }
            });
    }

}
