import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { AuthorizationModule } from './authorization/authorization.module';
// import { UserModule } from './user/user.module';
// import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { ArtModule } from './modules/art/art.module';
import { SeederService } from './seeder/seeder.service';
import { User } from './modules/auth/entities/user.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`src/config/env/.env.${process.env.NODE_ENV || 'development'}`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    OrderModule,
    ArtModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
