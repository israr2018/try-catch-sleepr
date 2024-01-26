import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  // IsNotEmpty,
  IsNotEmptyObject,
  // IsString,
  ValidateNested,
} from 'class-validator';
import { CreateChargeDto } from '@app/common/dto';
export class CreateReservationDto {
  timestamp: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // placeId: string;

  // @IsString()
  // @IsNotEmpty()
  // invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
