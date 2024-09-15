import { Injectable } from '@nestjs/common';
import { RecordFactory } from './factories/record.factory';
import { Record } from './models/record.model';
import { plainToClass } from 'class-transformer';
import { EmailProcessedDTO } from './dto/email-processed.dto';


@Injectable()
export class EmailService {
  constructor() { }
  async processEmail(json: any) {
    const classRecord: Record = RecordFactory.createFromJson(json);
    const processedEmail = plainToClass(EmailProcessedDTO, classRecord, { excludeExtraneousValues: true });
    return processedEmail;
  }

}
