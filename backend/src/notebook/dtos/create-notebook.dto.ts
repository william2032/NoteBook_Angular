import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'Note title' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({ description: 'Note content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
