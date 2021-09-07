import { IsOptional, IsString, MinLength, IsUUID, IsObject, ValidateNested, IsDefined, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class TableDto {
    @IsString()
    @MinLength(1)
    schema: string;

    @IsString()
    @MinLength(1)
    name: string;
}

class TriggerDto {
    @IsString()
    @MinLength(1)
    name: string;
}

class JobDto {
    @IsNumber()
    company_id: number;

    @IsString()
    @MinLength(1)
    city: string;

    @IsNumber()
    id: number;

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    created_on: string;
}

class DataDto {
    @IsObject()
    @IsOptional()
    @Type(() => JobDto)
    old?: JobDto;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => JobDto)
    new!: JobDto;
}

class EventDto {
    @IsOptional()
    session_variables: any;

    @IsString()
    @MinLength(1)
    op: string;

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => DataDto)
    data!: DataDto;
}

class DeliveryDto {
    @IsNumber()
    current_retry: number;

    @IsNumber()
    max_retries: number;

}


export class JobAlertDto {
  @IsUUID()
  id: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TableDto)
  table!: TableDto;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TriggerDto)
  trigger!: TriggerDto;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => EventDto)
  event!: EventDto;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryDto)
  delivery_info!: DeliveryDto;

  @IsString()
  @MinLength(1)
  created_at: string;
}

