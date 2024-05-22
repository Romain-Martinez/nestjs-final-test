import { Routes } from '@nestjs/core';

import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

export const routes: Routes = [
    {
        path: 'user',
        module: UserModule,
    },
    {
        path: 'task',
        module: TaskModule,
    },
];
