import { ApolloError } from 'apollo-server-express';

interface Stringable {
  toString(): string;
}

export class OperationError extends ApolloError {
  constructor(message = 'Operation Failed', extensions: Record<string, Stringable> = {}) {
    super(message, 'OPERATION_FAILED', extensions);
  }
}

export class WrongPasswordError extends ApolloError {
  constructor(extensions: Record<string, Stringable> = {}) {
    super('Wrong password', 'WRONG_PASSWORD', extensions);
  }
}

export class UserAlreadyExistError extends ApolloError {
  constructor(extensions: Record<string, Stringable> = {}) {
    super('Email is already registered', 'USER_ALREADY_EXIST', extensions);
  }
}
