import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';

type ErrorCodes = 'USER_NOT_FOUND' | 'WRONG_PASSWORD' | 'UNAUTHENTICATED' | 'USER_ALREADY_EXIST';

export function inputValidation<T>(errors: ValidationError[]): T {
  const reducer = (accumulate: T, { property, constraints }: ValidationError): T => {
    accumulate[property] = constraints ? Object.values<string>(constraints).join('. ') : '';
    return accumulate;
  };

  return errors.reduce<T>(reducer, {} as T);
}

export function extractValidationErrors(
  graphQLErrors: Readonly<GraphQLError[]>
): ValidationError[] {
  const reducer = (accumulate: ValidationError[], current: GraphQLError): ValidationError[] => {
    if (current.message === 'Argument Validation Error') {
      return accumulate.concat(current.extensions?.exception.validationErrors);
    }
    return accumulate;
  };
  return graphQLErrors.reduce<ValidationError[]>(reducer, []);
}

export function extractCustomError(graphQLErrors: GraphQLError[], code: ErrorCodes): Error | null {
  let error = null;
  graphQLErrors.forEach((err) => {
    if (err.extensions?.code === code) {
      error = err;
    }
  });
  return error;
}

export function extractMessageErrors(graphQLErrors: Readonly<GraphQLError[]>): string {
  const codes = ['USER_NOT_FOUND', 'WRONG_PASSWORD', 'UNAUTHENTICATED', 'USER_ALREADY_EXIST'];

  const reducer = (accumulate: string, current: GraphQLError) => {
    if (codes.find((code) => code === current.extensions?.code)) {
      accumulate += accumulate ? '. ' + current.message : current.message;
    }
    return accumulate;
  };

  return graphQLErrors.reduce(reducer, '');
}
