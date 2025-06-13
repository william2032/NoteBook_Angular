import { Module } from '@nestjs/common';
import { NoteBookService } from './notebook.service';
import { NoteBookController } from './notebook.controller';

@Module({
  providers: [NoteBookService],
  controllers: [NoteBookController],
})
export class NotebookModule {}
