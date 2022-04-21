import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersResolver } from './resolvers/users.resolvers';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
