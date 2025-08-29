import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    CategoryModule,
  ],
  //controllers: [AppController, CategoryController],
  //providers: [AppService, CategoryService],
})
export class AppModule {}
