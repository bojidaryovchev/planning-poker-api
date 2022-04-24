import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVotingInput {
  @Field()
  gameId: string;
}
