import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(sub: string) {
    super(`${sub} không tồn tại`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateError extends HttpException {
  constructor(sub: string) {
    super(`${sub} đã tồn tại`, HttpStatus.CONFLICT);
  }
}

export class FieldError extends HttpException {
  constructor(sub: string, msg?: string) {
    super(`${sub} không đúng. ${msg || ''}`, HttpStatus.BAD_REQUEST);
  }
}