import { PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-notebook.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
