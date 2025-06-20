import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotebookDto {
  @ApiPropertyOptional({ example: 'update title' })
  title?: string;

  @ApiPropertyOptional({ example: 'update notes content' })
  content?: string;
}
