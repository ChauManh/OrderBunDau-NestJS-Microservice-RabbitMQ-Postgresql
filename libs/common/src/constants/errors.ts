// libs/common/constants/errors.ts
import { HttpStatus } from '@nestjs/common';

export const ERROR_MESSAGES = {
  USER_ALREADY_EXISTS: {
    code: 1001,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'User already exists',
  },
  USER_NOT_FOUND: {
    code: 1002,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User not found',
  },
  INVALID_CREDENTIALS: {
    code: 1003,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Invalid phone number or password',
  },
  FORBIDDEN: {
    code: 1004,
    statusCode: HttpStatus.FORBIDDEN,
    message: 'You do not have permission to perform this action',
  },
  INTERNAL_ERROR: {
    code: 1005,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  VALIDATE_FAILED: {
    code: 1006,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
  },
} as const;
