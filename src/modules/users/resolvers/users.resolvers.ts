import { User } from '.prisma/client';
import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver(UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserModel], { nullable: true })
  async allUsers(): Promise<User[]> {
    return this.usersService.users({});
  }
}
