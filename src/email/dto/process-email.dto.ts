import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested, IsDateString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class ActionDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  topicArn?: string;

  @IsOptional()
  @IsString()
  bucketName?: string;

  @IsOptional()
  @IsString()
  objectKey?: string;
}

class VerdictDto {
  @IsString()
  status: string;
}

class ReceiptDto {
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @IsInt()
  processingTimeMillis: number;

  @IsArray()
  @IsEmail({}, { each: true })
  recipients: string[];

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;

  @IsString()
  dmarcPolicy: string;

  @ValidateNested()
  @Type(() => ActionDto)
  action: ActionDto;
}

class CommonHeadersDto {
  @IsEmail()
  returnPath: string;

  @IsArray()
  @IsEmail({}, { each: true })
  from: string[];

  @IsDateString()
  date: string;

  @IsArray()
  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  messageId: string;

  @IsString()
  subject: string;
}

class MailDto {
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @IsEmail()
  source: string;

  @IsString()
  messageId:string;

  @IsArray()
  @IsEmail({}, { each: true })
  destination: string[];

  @IsOptional()
  @IsBoolean()
  headersTruncated?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  headers?: HeaderDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CommonHeadersDto)
  commonHeaders?: CommonHeadersDto;
}

class HeaderDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}

class RecordDto {
  @IsString()
  @IsNotEmpty()
  eventVersion: string;

  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;

  @IsString()
  eventSource: string;
}

export class RecordsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecordDto)
  Records: RecordDto[];
}
