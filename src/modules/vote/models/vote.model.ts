import { Field, ObjectType } from '@nestjs/graphql';
import { User, Voting } from '@prisma/client';
import { UserModel } from '../../user/models/user.model';
import { VotingModel } from '../../voting/models/voting.model';

@ObjectType()
export class VoteModel {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => UserModel)
  user: User;

  @Field()
  votingId: string;

  @Field(() => VotingModel)
  voting: Voting;

  @Field()
  card: string;
}
