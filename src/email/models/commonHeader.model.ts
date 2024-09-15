export class CommonHeaders {
    constructor(
      public returnPath: string,
      public from: string[],
      public date: string,
      public to: string[],
      public messageId: string,
      public subject: string
    ) {}
  }
  