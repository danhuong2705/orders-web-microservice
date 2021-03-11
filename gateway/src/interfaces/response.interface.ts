export interface IResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
  }