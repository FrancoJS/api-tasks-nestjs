import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  public async createTask(task: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(task);

      return await this.taskRepository.save(newTask);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as { code?: string };

        if (driverError.code === '23503') {
          throw new BadRequestException(
            `El usuario con id ${task.userId} no existe`,
          );
        }
      }

      throw new InternalServerErrorException(
        'No se pudo conectar con la base de datos',
        {
          description: 'Hubo un error en la conexion',
        },
      );
    }
  }
}
