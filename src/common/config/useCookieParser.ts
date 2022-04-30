import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export default async function useCookieParser(app: INestApplication): Promise<void> {
  app.use(cookieParser());
}
