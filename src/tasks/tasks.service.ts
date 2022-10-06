import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskStatusFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus, Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTask(): Task[]{
        return this.tasks;
    }

    getTaskWithFilter(filterDto : GetTaskStatusFilterDto) : Task[]{
        const {status, search} = filterDto;
        //deklarasi sebuah array untk menampung ilai temporary
        let tasks = this.getAllTask();

        //seleksi kondisi
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }

        //seleksi untuk search
        if(search){
            tasks = tasks.filter((task) => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
            
                return false;
            });
        }

        return tasks;
    
    }

    // createTask(title : string, description: string): Task{
    //     const task : Task = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    createTask(createTaskDTO : CreateTaskDTO): Task{
        const{
            title,description,
        } = createTaskDTO;
        
        const task : Task = {
            id:uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id:string): Task{
        return this.tasks.find((task) => task.id === id);
    }

    deleteTask(id:string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTask(id:string, status:TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }


}
