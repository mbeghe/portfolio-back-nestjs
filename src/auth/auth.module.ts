import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entities))],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
