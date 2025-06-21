import { Module } from '@nestjs/common';
import { NoteBookService } from './notebook.service';
import { NoteBookController } from './notebook.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [NoteBookService],
  controllers: [NoteBookController],
  exports: [NoteBookService],
})
export class NotebookModule {}
