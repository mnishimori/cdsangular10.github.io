import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  form: FormGroup = null;

  constructor(formBuilder: FormBuilder,
    private service: TodoService)
  {
    this.form = formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  public submit(): void {
    console.log(this.form.value);
    const todo: Todo = { ...this.form.value };
    this.service.salvar(todo)
      .subscribe(response => {
        this.todos.push(response);
        this.form.reset();
      });
  }

  public listar(): void {
    this.service.listar()
      .subscribe(response => this.todos = response);
  }

  public delete(todo: Todo): void {
    this.service.deleteById(todo.id)
      .subscribe(response => this.listar());
  }

  public done(todo: Todo): void {
    this.service.markAsDone(todo.id)
      .subscribe(response => {
        todo.done = response.done;
      });
  }

}
