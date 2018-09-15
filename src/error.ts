import * as express from "express";

export class ErrorBase {
  constructor(
    private status: number,
    private name: string,
    private message: any
  ) {}

  public getStatus() {
    return this.status;
  }

  public toJSON() {
    return {
      error: {
        name: this.name,
        details: this.message
      }
    };
  }

  public send(res: express.Response) {
    res.status(this.status).json(this.toJSON());
  }
}

export class RouteNotFoundError extends ErrorBase {
  constructor(msg: string | Error) {
    super(400, "RouteNotFoundError", msg);
  }
}
