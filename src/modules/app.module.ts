import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GraphqlModule, UsersModule],
})
export class AppModule {}
