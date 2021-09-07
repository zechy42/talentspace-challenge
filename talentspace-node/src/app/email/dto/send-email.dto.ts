import { IsString, MinLength, IsUUID, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  subject: string;

  @IsString()
  @MinLength(1)
  context: object;
}

