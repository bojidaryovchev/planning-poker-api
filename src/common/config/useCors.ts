import { INestApplication } from '@nestjs/common';

export default async function useCors(app: INestApplication): Promise<void> {
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });
}
