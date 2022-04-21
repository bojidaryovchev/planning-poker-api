import { Module } from '@nestjs/common';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [GraphqlModule, UsersModule],
})
export class AppModule {}
