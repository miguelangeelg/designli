import { Action } from "./action.model";
import { DamrsVerdict } from "./damrcVerdict.model";
import { DkimVerdict } from "./dkimVerdict.model";
import { SpamVerdict } from "./spamVerdict.model";
import { SpfVerdict } from "./spfVerdict.model";
import { VirusVerdict } from "./virusVerdict.model";

export class Receipt {
  constructor(
    public timestamp: string,
    public processingTimeMillis: number,
    public recipients: string[],
    public spamVerdict: SpamVerdict,
    public virusVerdict: VirusVerdict,
    public spfVerdict: SpfVerdict,
    public dkimVerdict: DkimVerdict,
    public dmarcVerdict: DamrsVerdict,
    public dmarcPolicy: string,
    public action: Action,
  ) {}
}