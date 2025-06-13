import { pool } from '../database.config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-notebook.dto';

@Injectable()
export class NoteBookService {
  async create(createNoteDto: CreateNoteDto) {
    const { title, content } = createNoteDto;

    const result = await pool.query(
      `INSERT INTO notes (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title, content],
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query(
      ` SELECT *
        FROM notes
        ORDER BY created_at DESC`,
    );
    if (result.rows.length === 0) {
      throw new NotFoundException('No notebook found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.rows;
  }
}
