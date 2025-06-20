import { pool } from '../database.config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-notebook.dto';
import { UpdateNotebookDto } from './dtos/update-notebook.dto';

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
        ORDER BY created_at  `,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.rows;
  }

  async findOne(id: number) {
    const result = await pool.query(
      `SELECT *
       FROM notes
       WHERE id = $1`,
      [id],
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.rows[0];
  }

  async update(id: number, updateNotebookDto: UpdateNotebookDto) {
    const { title, content } = updateNotebookDto;

    const result = await pool.query(
      `UPDATE notes
       SET title   = $1,
           content = $2
       WHERE id = $3
       RETURNING *`,
      [title, content, id],
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.rows[0];
  }

  async delete(id: number) {
    const result = await pool.query(
      `DELETE
       FROM notes
       WHERE id = $1
       RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      throw new NotFoundException(`Notebook with ${id} not found `);
    }
    return { message: 'Note deleted successfully.' };
  }
}
