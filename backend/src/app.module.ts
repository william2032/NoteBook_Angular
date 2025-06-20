import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotebookModule } from './notebook/notebook.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotebookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
