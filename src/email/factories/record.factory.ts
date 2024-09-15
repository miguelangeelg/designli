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
  static createFromJson(data: any): Record {
    const action = new Action(
      data.ses.receipt.action.type,
      data.ses.receipt.action.topicArn
    );

    const receipt = new Receipt(
      data.ses.receipt.timestamp,
      data.ses.receipt.processingTimeMillis,
      data.ses.receipt.recipients,
      new SpamVerdict(data.ses.receipt.spamVerdict.status),
      new VirusVerdict(data.ses.receipt.virusVerdict.status),
      new SpfVerdict(data.ses.receipt.spfVerdict.status),
      new DkimVerdict(data.ses.receipt.dkimVerdict.status),
      new DamrsVerdict(data.ses.receipt.dmarcVerdict.status),
      data.ses.receipt.dmarcPolicy,
      action
    );

    const headers = data.ses.mail.headers.map((header: any) => Header.fromObject(header));

    const commonHeaders = new CommonHeaders(
      data.ses.mail.commonHeaders.returnPath,
      data.ses.mail.commonHeaders.from,
      data.ses.mail.commonHeaders.date,
      data.ses.mail.commonHeaders.to,
      data.ses.mail.commonHeaders.messageId,
      data.ses.mail.commonHeaders.subject
    );

    const mail = new Mail(
      data.ses.mail.timestamp,
      data.ses.mail.source,
      data.ses.mail.messageId,
      data.ses.mail.destination,
      data.ses.mail.headersTruncated,
      headers,
      commonHeaders
    );

    const ses = new Ses(receipt, mail);

    return new Record(
      data.eventVersion,
      ses,
      data.eventSource
    );
  }

  static createFromJsonArray(jsonArray: any[]): Record[] {
    return jsonArray.map(recordData => this.createFromJson(recordData));
  }
}