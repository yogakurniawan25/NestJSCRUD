import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'yoga',
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
