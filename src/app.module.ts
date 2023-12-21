import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configServices:ConfigService) => ({
      type: 'mysql',
      host: configServices.get("DATABASE_HOST"),
      port: parseInt(configServices.get("DATABASE_PORT")),
      username: configServices.get("DATABASE_USER"),
      password: configServices.get("DATABASE_PASSWORD"),
      database: configServices.get("DATABASE_NAME"),
      entities: [],
      synchronize: true,

    })
  }),
  ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
