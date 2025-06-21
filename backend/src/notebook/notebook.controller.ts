import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateNoteDto } from './dtos/create-notebook.dto';
import { NoteBookService } from './notebook.service';
import { Note } from './interface/notes.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateNoteDto } from './dtos/update-notebook.dto';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NoteBookController {
  constructor(private readonly notebookService: NoteBookService) {}

  //create a new notes
  @Post()
  @ApiCreatedResponse({ description: 'Note successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input provided.' })
  async create(
    @Body() dto: CreateNoteDto,
    @GetUser() user: { userId: string },
  ): Promise<Note> {
    return this.notebookService.create(dto, user.userId);
  }

  // get all notes
  @Get()
  @ApiOperation({ summary: 'Get all notes for the current user' })
  @ApiNotFoundResponse({ description: 'Notes not found.' })
  @ApiOkResponse({ description: 'Fetched all notes successfully.' })
  findAll(@GetUser() user: { userId: string }) {
    return this.notebookService.findAllByUser(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note' })
  @ApiOkResponse({ description: `Fetched note with id successfully.` })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: { userId: string },
  ) {
    return this.notebookService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiOkResponse({ description: 'Note updated successfully.' })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser() user: { userId: string },
  ) {
    return this.notebookService.update(id, updateNoteDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiNoContentResponse({ description: 'Note deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Note with given ID not found.' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: { userId: string },
  ) {
    return this.notebookService.delete(id, user.userId);
  }
}
