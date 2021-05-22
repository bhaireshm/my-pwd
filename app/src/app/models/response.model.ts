export class Response {
  public data: any;
  public message: string;
  public status: boolean;

  constructor(d: any, m: string, s: boolean) {
    this.data = d;
    this.message = m;
    this.status = s;
  }
}
