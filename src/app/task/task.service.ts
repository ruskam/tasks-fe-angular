import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from './task';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    private TASK_URL = 'http://localhost:8085/api/tasks';
    private USER_ID = '5d4c823a34c5de0c0d594427';
    private TASK_URL_POST = 'http://localhost:8085/api/users/' + this.USER_ID + '/tasks';

    constructor(private httpClient: HttpClient) {
    }

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.TASK_URL);
    }

    addTask(task: Task): Observable<Task> {
        return this.httpClient
            .post<Task>(this.TASK_URL_POST, task, this.httpOptions);
    }

    deleteTask(id: string): Observable<{}> {
        const url = `${this.TASK_URL}/${id}`;
        return this.httpClient.delete(url, this.httpOptions)
            .pipe();
    }



}
