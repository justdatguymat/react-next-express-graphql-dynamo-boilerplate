import { ValidationError } from 'class-validator';
import { GraphQLError } from 'graphql';

export function inputValidation(errors: Array<ValidationError>): Record<string, string> {
  const reducer = (
    accumulate: Record<string, string>,
    { property, constraints }: ValidationError
  ): Record<string, string> => {
    accumulate[property] = constraints ? Object.values<string>(constraints).join('. ') : '';
    return accumulate;
  };

  return errors.reduce<Record<string, string>>(reducer, {});
}

export function extractValidationErrors(
  graphQLErrors: Readonly<Array<GraphQLError>>
): Array<ValidationError> {
  const reducer = (
    accumulate: Array<ValidationError>,
    current: GraphQLError
  ): ValidationError[] => {
    if (current.message === 'Argument Validation Error') {
      return accumulate.concat(current.extensions?.exception.validationErrors);
    }
    return accumulate;
  };
  return graphQLErrors.reduce<Array<ValidationError>>(reducer, []);
}

export function extractFormErrors(
  gqlErrors: Readonly<Array<GraphQLError>>
): Record<string, string> {
  return inputValidation(extractValidationErrors(gqlErrors));
}
