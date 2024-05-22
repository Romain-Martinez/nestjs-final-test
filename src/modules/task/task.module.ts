import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
