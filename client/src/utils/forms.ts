import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';

export function inputValidation(errors: ValidationError[]): Record<string, string> {
  const reducer = (
    accumulate: Record<string, string>,
    { property, constraints }: ValidationError
  ): Record<string, string> => {
    accumulate[property] = constraints ? Object.values<string>(constraints).join('. ') : '';
    return accumulate;
  };

  return errors.reduce<Record<string, string>>(reducer, {});
}

export function extractValidationErrors(graphQLErrors: GraphQLError[]): ValidationError[] {
  const reducer = (accumulate: ValidationError[], current: GraphQLError): ValidationError[] => {
    if (current.message === 'Argument Validation Error') {
      return accumulate.concat(current.extensions?.exception.validationErrors);
    }
    return accumulate;
  };
  return graphQLErrors.reduce<ValidationError[]>(reducer, []);
}
