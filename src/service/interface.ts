export interface responseMsg<T, Dto> {
  message: string;
  statusCode: number;
  data?: T[] | Dto;
}