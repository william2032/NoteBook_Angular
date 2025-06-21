import { Module } from '@nestjs/common';
import { DbService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule {}
