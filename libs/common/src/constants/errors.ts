// libs/common/constants/errors.ts
import { HttpStatus } from '@nestjs/common';

export const ERROR_MESSAGES = {
  // user 1001 - 1019
  USER_ALREADY_EXISTS: {
    code: 1001,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Người dùng đã tồn tại',
  },
  USER_NOT_FOUND: {
    code: 1002,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Không tìm thấy người dùng',
  },
  INVALID_CREDENTIALS: {
    code: 1003,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Số điện thoại hoặc mật khẩu không đúng',
  },
  FORBIDDEN: {
    code: 1004,
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Bạn không có quyền thực hiện hành động này',
  },
  INTERNAL_ERROR: {
    code: 1005,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Lỗi máy chủ',
  },
  VALIDATE_FAILED: {
    code: 1006,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Dữ liệu không hợp lệ',
  },
  UPLOAD_FAILED: {
    code: 1007,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Lỗi khi tải ảnh lên',
  },
  UNAUTHORIZED: {
    code: 1008,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Bạn không có quyền truy cập vào tài nguyên này',
  },
  USER_INACTIVE: {
    code: 1009,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Tài khoản tạm thời ngừng hoạt động',
  },
  TOKEN_NOT_FOUND: {
    code: 1010,
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Token không được cung cấp',
  },

  // category 1021 - 1040
  CATEGORY_ALREADY_EXISTS: {
    code: 1021,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Danh mục đã tồn tại',
  },
  CATEGORY_NOT_FOUND: {
    code: 1022,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Không tìm thấy danh mục',
  },
  INVALID_CATEGORY_NAME: {
    code: 1023,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Tên danh mục không hợp lệ',
  },

  // menu-item 1041 - 1060
  MENU_ITEM_ALREADY_EXISTS: {
    code: 1041,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Món ăn đã tồn tại',
  },
  MENU_ITEM_NOT_FOUND: {
    code: 1042,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Không tìm thấy món ăn',
  },
  INVALID_MENU_ITEM_NAME: {
    code: 1043,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Tên món ăn không hợp lệ',
  },
} as const;
