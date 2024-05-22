import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { routes } from './app.routes';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
    exports: [RouterModule],
    imports: [RouterModule.register(routes), TaskModule, UserModule],
})
export class AppRoutingModule {}
