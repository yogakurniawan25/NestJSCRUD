import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/dto/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService : TasksService){

    }

    @Get()
    getTask(@Query() filterDto: GetTaskStatusFilterDto,
    @GetUser() user: User): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id')id : string,
    @GetUser() user: User): Promise<Task>{
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User,//agar input task dengan id user
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id')id : string){
        return this.tasksService.deleteTask(id);
        
    }

    @Patch('/:id')
    updateTaskStatus(@Param('id')id: string, @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: User){
            return this.tasksService.updateTask(id, updateTaskStatusDto, user);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id')id : string): Promise<void>{
    //     return this.tasksService.deleteTask(id);
        
    // }

    // @Get()
    // getAllTask() : Task[]{
    //     return this.tasksService.getAllTask();
    // }

    // @Get()
    // getTasks(@Query() filterDto : GetTaskStatusFilterDto) : Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTaskWithFilter(filterDto);
    //     }else{
    //         return null;
    //     }
    // }

    // @Post()
    // createTask(
    //     @Body('title') title : string,
    //     @Body('description') description : string,): Task{
    //     console.log('title', title);
    //     console.log('description', description);
    //     return this.tasksService.createTask(title,description);
    // }

    // @Post()
    // createTask(
    //     @Body() createTaskDTO : CreateTaskDTO): Task{
    //     return this.tasksService.createTask(createTaskDTO);
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task{
    //     return this.tasksService.getTaskById(id);
    // }

    // @Delete('/:id')
    // deleteTask(@Param('id')id : string): void{
    //     return this.tasksService.deleteTask(id);
        
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id')id: string,
    //     // @Body('status')status:TaskStatus
    //     @Body() updateTaskStatusDto: updateTaskStatusDto): Task{
    //     const {status} = updateTaskStatusDto;
    //     return this.tasksService.updateTask(id, status);
    // }
}
