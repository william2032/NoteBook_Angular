import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { DbService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.db.query(`SELECT * FROM users WHERE email = $1`, [dto.email]);
    if (existing.length) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email`,
      [dto.name, dto.email, hashedPassword]
    );
    return user[0];
  }

  async findByEmail(email: string) {
    const user = await this.db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user[0];
  }
}
