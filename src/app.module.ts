import { Module } from '@nestjs/common';

import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule],
})
export class AppModule {}
