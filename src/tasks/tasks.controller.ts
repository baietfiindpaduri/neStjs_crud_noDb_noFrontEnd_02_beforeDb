import { Delete, Get, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import {Controller } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    // @Get() 
    // getAllTasks(): Task[]{
    //    return this.tasksService.getAllTasks();
    // }

    // localhost:3000/tasks?status=OPEN&search=hello
   
    @Get() 
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto){
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto); 
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Task {
        return this.tasksService.getTaskById(id); 
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
                    return this.tasksService.createTask(createTaskDto)
                }

   // localhost:3000/tasks/idul/status
    @Patch("/:id/status")
    updateTaskStatus(
       @Param("id") id: string,
       @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    ) : Task {
        return this.tasksService.updateTaskStatus(id, status);
    }



}
