import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(private connection: Connection) {
    if (connection.isConnected) {
      console.log('Database connected successfully');
    }
  }
}
