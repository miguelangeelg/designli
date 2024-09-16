import { HttpException, HttpStatus } from '@nestjs/common'; // Adjust the import based on your framework
import { Record } from '../models/record.model';
import { Ses } from '../models/ses.model';
import { Receipt } from '../models/receipt.model';
import { Mail } from '../models/mail.model';
import { Action } from '../models/action.model';
import { Header } from '../models/header.model';
import { SpamVerdict } from '../models/spamVerdict.model';
import { VirusVerdict } from '../models/virusVerdict.model';
import { SpfVerdict } from '../models/spfVerdict.model';
import { DkimVerdict } from '../models/dkimVerdict.model';
import { DamrsVerdict } from '../models/damrcVerdict.model';
import { CommonHeaders } from '../models/commonHeader.model';

export class RecordFactory {

  static validateData(data: any): void {
    if (!data.Records || data.Records.length === 0) {
      throw new HttpException('Records array is missing or empty', HttpStatus.BAD_REQUEST);
    }

    const record = data.Records[0];
    if (!record.ses || !record.ses.receipt || !record.ses.mail) {
      throw new HttpException('Invalid data structure in record', HttpStatus.BAD_REQUEST);
    }
  }

  static createFromJson(data: any): Record {
    this.validateData(data);

    const record = data.Records[0];

    // Creating child objects
    const action = new Action(
      record.ses.receipt.action.type,
      record.ses.receipt.action.topicArn
    );

    const receipt = new Receipt(
      record.ses.receipt.timestamp,
      record.ses.receipt.processingTimeMillis,
      record.ses.receipt.recipients,
      new SpamVerdict(record.ses.receipt.spamVerdict.status),
      new VirusVerdict(record.ses.receipt.virusVerdict.status),
      new SpfVerdict(record.ses.receipt.spfVerdict.status),
      new DkimVerdict(record.ses.receipt.dkimVerdict.status),
      new DamrsVerdict(record.ses.receipt.dmarcVerdict.status),
      record.ses.receipt.dmarcPolicy,
      action
    );

    const headers = record.ses.mail.headers.map((header: any) => Header.fromObject(header));

    const commonHeaders = new CommonHeaders(
      record.ses.mail.commonHeaders.returnPath,
      record.ses.mail.commonHeaders.from,
      record.ses.mail.commonHeaders.date,
      record.ses.mail.commonHeaders.to,
      record.ses.mail.commonHeaders.messageId,
      record.ses.mail.commonHeaders.subject
    );

    const mail = new Mail(
      record.ses.mail.timestamp,
      record.ses.mail.source,
      record.ses.mail.messageId,
      record.ses.mail.destination,
      record.ses.mail.headersTruncated,
      headers,
      commonHeaders
    );

    const ses = new Ses(receipt, mail);

    // Returning the full object
    return new Record(
      record.eventVersion,
      ses,
      record.eventSource
    );
  }
}
