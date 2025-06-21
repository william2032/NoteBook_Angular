import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DbService.name);
  private pool: Pool;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.pool = new Pool({
        connectionString: this.configService.get<string>('DATABASE_URL'),
      });

      // Test the connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();

      this.logger.log('Database connection established successfully');
    } catch (error) {
      this.logger.error('Failed to initialize database connection', error);
      throw error;
    }
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[],
  ): Promise<T[]> {
    if (!this.pool) {
      throw new Error('Database pool is not initialized');
    }

    try {
      const result = await this.pool.query<T>(text, params);
      return result.rows;
    } catch (error) {
      this.logger.error(`Database query failed: ${text}`, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      try {
        await this.pool.end();
        this.logger.log('Database connection pool closed');
      } catch (error) {
        this.logger.error('Error closing database connection pool', error);
      }
    }
  }
}
