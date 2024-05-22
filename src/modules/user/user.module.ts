import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../infrastructure/database/database.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
