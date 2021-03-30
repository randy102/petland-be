import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

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
    super(`${sub} không hợp lệ. ${msg || ''}`, HttpStatus.BAD_REQUEST);
  }
}

export class SchemaError extends HttpException {
  constructor(errors:  ValidationError[]) {
    const errorData = {};
    for (const error of errors){
      const field = error.property;
      const firstError = Object.keys(error.constraints)[0]
      errorData[field] = error.constraints[firstError]
    }
    super(errorData, HttpStatus.BAD_REQUEST);
  }
}