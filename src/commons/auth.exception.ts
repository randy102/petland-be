import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPermissionError extends HttpException {
  constructor() {
    super(`Không có quyền truy cập`, HttpStatus.FORBIDDEN);
  }
}

export class AccountBlockedError extends HttpException {
  constructor() {
    super(`Tài khoản đã bị khóa`, HttpStatus.FORBIDDEN);
  }
}

export class LoginError extends HttpException {
  constructor() {
    super(`Email hoặc mật khẩu không đúng`, HttpStatus.BAD_REQUEST);
  }
}

export class AuthError extends HttpException {
  constructor() {
    super(
      `Lỗi xác thực tài khoản. Vui lòng đăng nhập lại!`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
