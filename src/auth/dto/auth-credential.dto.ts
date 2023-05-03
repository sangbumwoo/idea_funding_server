import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    example: 'user1',
    description: '유저 아이디',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: '1234',
    description: '암호',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

}
