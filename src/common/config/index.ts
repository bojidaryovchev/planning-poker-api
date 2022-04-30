import { INestApplication } from '@nestjs/common';
import useCookieParser from './useCookieParser';
import useCors from './useCors';
import useCsurf from './useCsurf';
import useHelmet from './useHelmet';
import usePrisma from './usePrisma';

async function useCommon(app: INestApplication): Promise<void> {
  await usePrisma(app);
  await useCookieParser(app);
  await useCors(app);
}

async function useProduction(app: INestApplication): Promise<void> {
  await useHelmet(app);
  await useCsurf(app);
}

// TODO: uncomment once a viable case for development configurations is present
// async function useDevelopment(app: INestApplication): Promise<void> {}

export default async function (app: INestApplication): Promise<void> {
  await useCommon(app);

  if (process.env.NODE_ENV === 'production') {
    await useProduction(app);
  } else {
    // await useDevelopment(app);
  }
}
