import { Receipt } from './receipt.model';
import { Mail } from './mail.model';

export class Ses {
  constructor(
    public receipt: Receipt,
    public mail: Mail
  ) {}
}