import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'TODO' })
  title: string;

  @ApiProperty({ example: 'Work on the authentication of the users' })
  content: string;
}
