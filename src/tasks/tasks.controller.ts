import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){

    }

    // @Get()
    // getAllTask() : Task[]{
    //     return this.tasksService.getAllTask();
    // }

    @Get()
    getTasks(@Query() filterDto : GetTaskStatusFilterDto) : Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilter(filterDto);
        }else{
            return this.tasksService.getAllTask();
        }
    }

    // @Post()
    // createTask(
    //     @Body('title') title : string,
    //     @Body('description') description : string,): Task{
    //     console.log('title', title);
    //     console.log('description', description);
    //     return this.tasksService.createTask(title,description);
    // }

    @Post()
    createTask(
        @Body() createTaskDTO : CreateTaskDTO): Task{
        return this.tasksService.createTask(createTaskDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id')id : string): void{
        return this.tasksService.deleteTask(id);
        
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id')id: string,
    @Body('status')status:TaskStatus): Task{
        return this.tasksService.updateTask(id, status);
    }
}
