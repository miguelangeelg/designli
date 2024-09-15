import { Injectable } from '@nestjs/common';
import { RecordFactory } from './factories/record.factory';
import { Record } from './models/record.model';
import { plainToClass } from 'class-transformer';
import { EmailProcessedDTO } from './dto/email-processed.dto';


@Injectable()
export class EmailService {
  constructor() { }
  async processEmail(json: any) {
    // Converting the json to a class
    const classRecord: Record = RecordFactory.createFromJson(json);
    // Using class transformer to map the object and to build the json final format
    const processedEmail = plainToClass(EmailProcessedDTO, classRecord, { excludeExtraneousValues: true });
    return processedEmail;
  }

}
