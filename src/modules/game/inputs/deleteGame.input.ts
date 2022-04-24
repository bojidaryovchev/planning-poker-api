import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteGameInput {
  @Field()
  id: string;
}
