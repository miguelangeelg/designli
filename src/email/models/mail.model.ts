import { CommonHeaders } from './commonHeader.model';
import { Header } from './header.model';

export class Mail {
  constructor(
    public timestamp: string,
    public source: string,
    public messageId: string,
    public destination: string[],
    public headersTruncated: boolean,
    public headers: Header[],
    public commonHeaders: CommonHeaders
  ) {}
}