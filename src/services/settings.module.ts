import { Module } from '@nestjs/common';
import { ConfigService } from './settings.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SettingsModule {}