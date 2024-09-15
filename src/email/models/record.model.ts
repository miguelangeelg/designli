import { Ses } from './ses.model';

export class Record {
  constructor(
    public eventVersion: string,
    public ses: Ses,
    public eventSource: string
  ) {}
}