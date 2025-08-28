import { ReturnFromController } from '../interfaces/return-from-controller.interface';

export function mapToApiResponse<T>(
  statusCode: number,
  message?: string,
  data?: T,
): ReturnFromController<T> {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
}
