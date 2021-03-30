import {
  ValidationOptions,
  IsNotEmpty as _IsNotEmpty,
  IsString as _IsString,
  IsMobilePhone as _IsMobilePhone,
  IsEmail as _IsEmail
} from 'class-validator';

export const IsNotEmpty = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsNotEmpty({ ...validationOptions, message: 'Không được để trống' });

export const IsMobilePhone = (
  locale?,
  options?,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsMobilePhone(locale, options,{ ...validationOptions, message: 'Số điện thoại không phợp lệ' });

export const IsEmail = (
  options?,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsEmail(options, { ...validationOptions, message: 'Email không hợp lệ' });

export const IsString = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  _IsString({ ...validationOptions, message: 'Phải là chuỗi' });