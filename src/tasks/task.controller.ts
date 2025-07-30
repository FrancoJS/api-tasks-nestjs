import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
