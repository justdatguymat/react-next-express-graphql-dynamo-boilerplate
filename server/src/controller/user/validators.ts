/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/*
import { wrapper } from '@dynamodb';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return 'Email is already registered';
  }
  async validate(email: string): Promise<boolean> {
    const user = await wrapper.getUser({ email });
    return !user;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(target: any, propertyName: string): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  defaultMessage(): string {
    return 'Email not found';
  }
  async validate(email: string): Promise<boolean> {
    const user = await wrapper.getUser({ email });
    return !!user;
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function(target: any, propertyName: string): void {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    });
  };
}
*/
