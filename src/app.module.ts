import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
//import { CategoryController } from './category/category.controller';
//import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
  ],
  //controllers: [AppController, CategoryController],
  //providers: [AppService, CategoryService],
})
export class AppModule {}
