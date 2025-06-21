import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-notebook.dto';
import { Note } from './interface/notes.interface';
import { DbService } from '../database/database.service';
import { UpdateNoteDto } from './dtos/update-notebook.dto';

@Injectable()
export class NoteBookService {
  constructor(private readonly dbService: DbService) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const { title, content } = createNoteDto;

    const result = await this.dbService.query<Note>(
      `INSERT INTO notes (title, content, user_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
      [title, content, userId],
    );

    return result[0];
  }

  async findAllByUser(userId: string): Promise<Note[]> {
    const result = await this.dbService.query<Note>(
      `SELECT *
             FROM notes
             WHERE user_id = $1
             ORDER BY created_at DESC`,
      [userId],
    );

    return result;
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const result = await this.dbService.query<Note>(
      `SELECT *
             FROM notes
             WHERE id = $1
               AND user_id = $2`,
      [id, userId],
    );

    if (result.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return result[0];
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    const { title, content } = updateNoteDto;

    // First check if the note exists and belongs to the user
    await this.findOne(id, userId);

    const result = await this.dbService.query<Note>(
      `UPDATE notes
             SET title      = COALESCE($1, title),
                 content    = COALESCE($2, content),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $3
               AND user_id = $4
             RETURNING *`,
      [title, content, id, userId],
    );

    return result[0];
  }

  async delete(id: string, userId: string): Promise<{ message: string }> {
    // First check if the note exists and belongs to the user
    await this.findOne(id, userId);

    const result = await this.dbService.query<Note>(
      `DELETE
             FROM notes
             WHERE id = $1
               AND user_id = $2
             RETURNING *`,
      [id, userId],
    );

    if (result.length === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return { message: 'Note deleted successfully' };
  }
}
