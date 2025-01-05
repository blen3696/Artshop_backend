// src/seeder/run-seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);

  await seederService.seedAdmin();
  await app.close();
}

bootstrap().catch(err => {
  console.error('Error seeding admin user:', err);
});
