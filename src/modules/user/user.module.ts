import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserResolver } from './resolvers/user.resolvers';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver],
})
export class UserModule {}
