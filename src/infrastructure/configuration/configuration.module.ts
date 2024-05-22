import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationService } from './services/configuration.service';

@Module({
    exports: [ConfigurationService],
    imports: [ConfigModule.forRoot()],
    providers: [ConfigurationService],
})
export class ConfigurationModule {}
