import { NestFactory } from '@nestjs/core';
import config from './common/config';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  // Create a Nest application
  const app = await NestFactory.create(AppModule);
  // Apply global configurations
  await config(app);
  // Start the application
  await app.listen(Number(process.env.PORT));
}
bootstrap();
