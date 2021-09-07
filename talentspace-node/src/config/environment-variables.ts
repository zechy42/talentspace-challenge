import {
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  @MinLength(1)
  DB_NAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  @MinLength(1)
  DB_USERNAME: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  @MinLength(1)
  DB_HOST: string;

  @IsString()
  EMAIL_HOST: string;

  @IsString()
  @MinLength(1)
  EMAIL: string;

  @IsString()
  @MinLength(1)
  EMAIL_PASS: string;

  @IsNumber()
  IMAP_PORT: number;

  @IsString()
  DIGEST_EMAIL_SCHEDULE: string;
}
