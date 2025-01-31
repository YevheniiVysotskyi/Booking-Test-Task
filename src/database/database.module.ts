
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigService } from 'src/services/settings.service';
import { SettingsModule } from 'src/services/settings.module';

@Module({
  imports: [SettingsModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
