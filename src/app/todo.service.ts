import { environment } from './../environments/environment.prod';
import { Todo } from './todo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  salvar(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  listar(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markAsDone(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/done`, {});
  }
}
