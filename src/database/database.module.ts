
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigService } from 'src/services/config.service';
import { ConfigModule } from 'src/services/config.module';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
