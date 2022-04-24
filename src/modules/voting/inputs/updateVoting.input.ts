import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVotingInput {
  @Field()
  id: string;

  @Field()
  hasFinished: boolean;
}
