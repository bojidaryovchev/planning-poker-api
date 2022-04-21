import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [GraphqlModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
