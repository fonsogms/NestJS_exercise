import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getTaskbyId(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return found;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }
  async deleteTask(id: number): Promise<void> {
    const deletion = await this.taskRepository.delete({ id: id });
    console.log(deletion);
    if (deletion.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    const foundTask = await this.getTaskbyId(id);
    foundTask.status = status;
    foundTask.save();
    return foundTask;
  }
  /* 
    getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskbyId(id: string): Task {
    const found = this.tasks.find(task => {
      if (task.id === id) return true;
    });
    if (!found) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): Task {
    let deletedTask: Task;
    const found: Task = this.getTaskbyId(id);
    this.tasks.filter((task, index) => {
      if (task.id == id) {
        deletedTask = task;
        return false;
      }
      return true;
    });
    return deletedTask;
  }
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskbyId(id);
    task.status = status;
    return task;
  }
  getTasksFiltered(filterDto: GetTasksFilterDto): Task[] {
    const { status, searchTerm } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => {
        if (task.status == status) return true;
      });
    }
    if (searchTerm) {
      tasks = tasks.filter(task => {
        if (
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return true;
      });
    }
    return tasks;
  } */
}
