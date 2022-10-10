import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Task])],
    controllers: [TasksController],
    providers: [TasksService,TaskRepository]
})
export class TasksModule {}
