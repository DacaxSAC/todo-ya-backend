import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { CategoryController } from './category/category.controller';
//import { CategoryService } from './category/category.service';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<Database>) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
        // entities: [],
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
  ],
  //controllers: [AppController, CategoryController],
  //providers: [AppService, CategoryService],
})
export class AppModule {}
