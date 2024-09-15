export class Header {
    constructor(
      public name: string,
      public value: string
    ) {}
  
    static fromObject(obj: { name: string; value: string }): Header {
      return new Header(obj.name, obj.value);
    }
  }