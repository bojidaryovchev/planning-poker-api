import { Args } from '@nestjs/graphql';

export function Input<T>(inputType: T): ParameterDecorator {
  return Args({ name: 'input', type: () => inputType });
}
