import { Controller, Get, Param } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';

import { AddTaskDto } from '../dtos/add-task.dto';
import { TaskService } from '../services/task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@Body() { userId, name, priority }: AddTaskDto) {
        return this.taskService.addTask(name, userId, priority);
    }

    @Get('/user/:userId')
    getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }
}
