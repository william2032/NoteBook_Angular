import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateNoteDto } from './dtos/create-notebook.dto';
import { NoteBookService } from './notebook.service';

@ApiTags('notes')
@Controller('notes')
export class NoteBookController {
  constructor(private readonly notebookService: NoteBookService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Note successfully created.' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notebookService.create(createNoteDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Fetched all notes successfully.' })
  findAll() {
    return this.notebookService.findAll();
  }
}
