import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
   
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule, 
    StudentsModule],
})
export class AppModule {}
