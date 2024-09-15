import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

class Verdict {
  @ApiProperty({ description: 'The status of the verdict' })
  @IsString()
  status: string;
}

class Action {
  @ApiProperty({ description: 'The type of the action' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The ARN of the topic' })
  @IsString()
  topicArn: string;

  @ApiProperty({ description: 'The bucket name' })
  @IsString()
  bucketName: string;

  @ApiProperty({ description: 'The object key' })
  @IsString()
  objectKey: string;
}

class Receipt {
  @ApiProperty({ description: 'Timestamp of the receipt' })
  @IsString()
  timestamp: string;

  @ApiProperty({ description: 'Processing time in milliseconds' })
  processingTimeMillis: number;

  @ApiProperty({ type: [String], description: 'List of recipients' })
  @IsArray()
  @IsString({ each: true })
  recipients: string[];

  @ApiProperty({ type: Verdict, description: 'Spam verdict' })
  spamVerdict: Verdict;

  @ApiProperty({ type: Verdict, description: 'Virus verdict' })
  virusVerdict: Verdict;

  @ApiProperty({ type: Verdict, description: 'SPF verdict' })
  spfVerdict: Verdict;

  @ApiProperty({ type: Verdict, description: 'DKIM verdict' })
  dkimVerdict: Verdict;

  @ApiProperty({ type: Verdict, description: 'DMARC verdict' })
  dmarcVerdict: Verdict;

  @ApiProperty({ description: 'DMARC policy' })
  @IsString()
  dmarcPolicy: string;

  @ApiProperty({ type: Action, description: 'Action to be taken' })
  action: Action;
}

class CommonHeaders {
  @ApiProperty({ description: 'Return path' })
  @IsString()
  returnPath: string;

  @ApiProperty({ type: [String], description: 'From addresses' })
  @IsArray()
  @IsString({ each: true })
  from: string[];

  @ApiProperty({ description: 'Date header' })
  @IsString()
  date: string;

  @ApiProperty({ type: [String], description: 'To addresses' })
  @IsArray()
  @IsString({ each: true })
  to: string[];

  @ApiProperty({ description: 'Message ID' })
  @IsString()
  messageId: string;

  @ApiProperty({ description: 'Subject header' })
  @IsString()
  subject: string;
}

class Header {
  @ApiProperty({ description: 'Name of the header' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Value of the header' })
  @IsString()
  value: string;
}

class Mail {
  @ApiProperty({ description: 'Timestamp of the mail' })
  @IsString()
  timestamp: string;

  @ApiProperty({ description: 'Source of the mail' })
  @IsString()
  source: string;

  @ApiProperty({ description: 'Message ID of the mail' })
  @IsString()
  messageId: string;

  @ApiProperty({ type: [String], description: 'List of destination addresses' })
  @IsArray()
  @IsString({ each: true })
  destination: string[];

  @ApiProperty({ description: 'Headers truncated flag' })
  headersTruncated: boolean;

  @ApiProperty({ type: [Header], description: 'List of headers' })
  @IsArray()
  headers: Header[];

  @ApiProperty({ type: CommonHeaders, description: 'Common headers of the mail' })
  commonHeaders: CommonHeaders;
}

class RecordDto {
  @ApiProperty({ description: 'Event version' })
  @IsString()
  eventVersion: string;

  @ApiProperty({ type: Receipt, description: 'Receipt information' })
  ses: {
    receipt: Receipt;
    mail: Mail;
  };

  @ApiProperty({ description: 'Event source' })
  @IsString()
  eventSource: string;
}

export class CreateRecordDto {
  @ApiProperty({ type: [RecordDto], description: 'List of records' })
  @IsArray()
  @IsObject({ each: true })
  @IsNotEmpty()
  Records: RecordDto[];
}
