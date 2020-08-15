import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/')
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.getTasks(filterDto, user);
  }
  @Get('/:id')
  async getTaskbyId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskbyId(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    //@Body("title") title:string;
    //@Body("description") description:string;
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.tasksService.deleteTask(id, user);
  }
  @Patch('/:id')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
  /* @Get()

  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksFiltered(filterDto);
    }
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  async getTaskbyId(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskbyId(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    //@Body("title") title:string;
    //@Body("description") description:string;
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    console.log('Deleting');
    return this.tasksService.deleteTask(id);
  }
  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  } */
}
