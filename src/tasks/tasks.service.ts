import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {

//salvez taskurile in memorie (array) momentan:
//arrayul va fi o proprietate a clasei
private tasks: Task[] = [];

//give the controller acces trough this method:
getAllTasks(): Task[]{
    return this.tasks;
}

// localhost:3000/tasks?status=OPEN&search=textInDescription
getTasksWithFilters(filterDto: GetTasksFilterDto):Task[]{
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();

    if(status){
        tasks = tasks.filter(t => t.status === status );
    }  
    if ( search ){
        tasks = tasks.filter(t => 
            t.title.includes(search) ||
            t.description.includes(search),
            )
    }
    return tasks;
}

//the exception is not cought here (no try catch)
// so it will escalade one step higher 
// adica in controller (aici fiind in serviciu)
// nici in controller nu e prinsa,
// asa ca se duce mai departe, catre nestJs behind the scenes.
//ce o va returna formatat fain.
// {
//     "statusCode": 404,
//     "message": "custom msg here",
//     "error": "Not Found"
// }
getTaskById(id: string): Task {
    const found = this.tasks.find( task => task.id === id );
    if(!found){
        throw new NotFoundException(`custom msg here`);
    } 
    return found;
}

deleteTask(id: string): void {
    const found = this.getTaskById(id);

    this.tasks = this.tasks.filter( task => task.id != found.id);
}

createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;

    const task: Task = {
        id: uuidv4(),
        title,
        description,
        status: TaskStatus.OPEN, //default value
    }
this.tasks.push(task);
return task;
}

updateTaskStatus(id: string, status: TaskStatus): Task{
   const task = this.getTaskById(id);
   task.status = status;
    return task;
}

}
