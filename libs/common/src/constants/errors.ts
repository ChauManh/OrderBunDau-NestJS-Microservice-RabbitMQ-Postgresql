// libs/common/constants/errors.ts
import { HttpStatus } from '@nestjs/common';

export const ERROR_MESSAGES = {
  // user 1001 - 1019
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
  UPLOAD_FAILED: {
    code: 1007,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Upload image to cloud failed',
  },

  // category 1021 - 1039
  CATEGORY_ALREADY_EXISTS: {
    code: 1021,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Category already exists',
  },
  CATEGORY_NOT_FOUND: {
    code: 1022,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Category not found',
  },
  INVALID_CATEGORY_NAME: {
    code: 1023,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid category name',
  },

  // menu-item 1041 - 1059
  MENU_ITEM_ALREADY_EXISTS: {
    code: 1041,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Menu item already exists',
  },
  MENU_ITEM_NOT_FOUND: {
    code: 1042,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Menu item not found',
  },
  INVALID_MENU_ITEM_NAME: {
    code: 1043,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid menu item name',
  },
} as const;
