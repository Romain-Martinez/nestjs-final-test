import { PrismaClient } from '@prisma/client';

import {
    INestApplication,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
    Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    async onModuleInit() {
        try {
            await this.$connect();
        } catch (error) {
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
