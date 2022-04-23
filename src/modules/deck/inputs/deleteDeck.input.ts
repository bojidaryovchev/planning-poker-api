import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteDeckInput {
  @Field()
  id: string;
}
