import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    getTasks(filterDto: GetTaskStatusFilterDto, user: User): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }

    createTask(createTaskDTO: CreateTaskDTO,
        user: User): Promise<Task>{
        return this.taskRepository.createTasks(createTaskDTO, user);
    }

    async getTaskById(id:string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where : {id : id}});
        if(!found){
            throw new NotFoundException('Task Not Found');
        }

        return found;
    }

    async deleteTask(id: string){
        return await this.taskRepository.deteleTasks(id);
    }

    async updateTask(id: string, createTaskDTO: updateTaskStatusDto, user: User){
        return await this.taskRepository.updateTasks(id, createTaskDTO, user);
    }

    // async deleteTask(id: string): Promise<Task>{
    //     const result = await this.taskRepository.delete(id);

    //     if(result.affected === 0){
    //         throw new NotFoundException(`Task With ID "${id}" not found`);
    //     }

    // }


    //private tasks : Task[] = [];

    // getAllTask(): Task[]{
    //     return this.tasks;
    // }

    // getTaskWithFilter(filterDto : GetTaskStatusFilterDto) : Task[]{
    //     const {status, search} = filterDto;
    //     //deklarasi sebuah array untk menampung ilai temporary
    //     let tasks = this.getAllTask();

    //     //seleksi kondisi
    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     //seleksi untuk search
    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }
            
    //             return false;
    //         });
    //     }

    //     return tasks;
    
    // }

    // // createTask(title : string, description: string): Task{
    // //     const task : Task = {
    // //         id:uuid(),
    // //         title,
    // //         description,
    // //         status: TaskStatus.OPEN
    // //     };
    // //     this.tasks.push(task);
    // //     return task;
    // // }

    // createTask(createTaskDTO : CreateTaskDTO): Task{
    //     const{
    //         title,description,
    //     } = createTaskDTO;
        
    //     const task : Task = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // getTaskById(id:string): Task{
    //     // return this.tasks.find((task) => task.id === id);
    //     const found = this.tasks.find((task)=>task.id ===id);
    //     if(!found){
    //         throw new NotFoundException('Task not found');
    //     }
    //     return found;
    // }

    // deleteTask(id:string): void{
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    //     //this.tasks = this.tasks.filter((task) => task.id !== id);
    // }

    // updateTask(id:string, status:TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }


}
