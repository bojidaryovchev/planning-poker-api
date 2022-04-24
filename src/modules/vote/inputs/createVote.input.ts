import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field()
  userId: string;

  @Field()
  votingId: string;

  @Field()
  card: string;
}
