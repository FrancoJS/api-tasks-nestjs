import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(user: CreateUserDto) {
    try {
      const userExists = await this.userExists(user.username, user.email);
      if (userExists) {
        throw new ConflictException('El usuario ya existe');
      }

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return 'El usuario ha sido creado';
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'No se pudo conectar con la base de datos',
        {
          description: 'Hubo un error en la conexion',
        },
      );
    }
  }

  public async userExists(username: string, email: string) {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    return !!user;
  }
}
