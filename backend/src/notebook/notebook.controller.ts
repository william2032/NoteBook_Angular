import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateNoteDto } from './dtos/create-notebook.dto';
import { NoteBookService } from './notebook.service';
import { Note } from './interface/notes.interface';
import { UpdateNotebookDto } from './dtos/update-notebook.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteBookController {
  constructor(private readonly notebookService: NoteBookService) {}

  // get all notes
  @Get()
  @ApiNotFoundResponse({ description: 'Notes not found.' })
  @ApiOkResponse({ description: 'Fetched all notes successfully.' })
  async findAll(): Promise<Note[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.notebookService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Note successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input provided.' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notebookService.create(createNoteDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: `Fetched note with id  successfully.` })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note[]> {
    return this.notebookService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Note updated successfully.' })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNotebookDto,
  ): Promise<Note[]> {
    return this.notebookService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Note deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notebookService.delete(id);
  }
}
