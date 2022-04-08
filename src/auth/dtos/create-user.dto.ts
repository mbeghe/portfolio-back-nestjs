import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiProperty()
  fname: string;

  @ApiProperty()
  lname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
