import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  login = async ({ email: emailWithoutParsed, password }) => {
    const email = emailWithoutParsed.toLowerCase();
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new UnauthorizedException('Wrong password provided.');
    }

    const { id } = user;

    return {
      id,
    };
  };

  createUser = async (payload) => {
    const { password, email: emailWithoutParsed } = payload;
    const email = emailWithoutParsed.toLowerCase();

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    const createdUser = await this.userRepository.save({
      ...payload,
      email: email,
      password: await hash(password, 10),
    });

    if (!createdUser) {
      throw new InternalServerErrorException('Error creating user.');
    }

    return { id: createdUser.id };
  };
}
