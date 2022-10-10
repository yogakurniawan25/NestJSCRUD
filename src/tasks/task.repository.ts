import { DataSource, EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { GetTaskStatusFilterDto } from "./dto/get-task-filter.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { updateTaskStatusDto } from "./dto/update-task-status.dto";
import { User } from "src/auth/user.entity";

//@EntityRepository(Task)
@Injectable()
export class TaskRepository extends Repository<Task>{

    constructor(
        private data: DataSource
    ){
        super(Task, data.createEntityManager())
    }

    //promise = future
    async createTasks(createTaskDTO: CreateTaskDTO, user: User) : Promise<Task>{
        const { title, description } = createTaskDTO;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });
        
        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTaskStatusFilterDto, user: User): Promise<Task[]>{
        const { status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status',{status});
        }

        // if(user){
        //     query.andWhere('task.userid = :userid',{user});
        // }

        if(search){
            query.andWhere(
            'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            {search : `%${search}%`},
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async updateTasks(id: string, updateDTO: updateTaskStatusDto, user: User): Promise<Object>{
        await this.update(id,updateDTO);
        const data = await this.getTask(id);
        // data.hotel_name = updateDTO.hotel_name,
        // data.contact = updateDTO.contact,
        // data.alamat = updateDTO.alamat,
        // data.description = updateDTO.description,
        // data.bintang = updateDTO.bintang,
        // data.status = updateDTO.status
        return{
            status:200,
            message:"Data Updated",
            data:data
        }
    }

    async deteleTasks(id: string): Promise<Object>{
        const data = await this.getTask(id);
        if(!data){
            throw new NotFoundException('Task Not Found');
        }
        await this.delete(id);
        return{
            status:200,
            message:"Data Deleted",
            data: data
        }
     }

      getTask(id:string): Promise<Task>{
        const data = this.findOneBy({id});
        if(!data){
            throw new NotFoundException('Task Not Found');
        }
        return data;
     }
}