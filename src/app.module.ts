import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../typeormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
