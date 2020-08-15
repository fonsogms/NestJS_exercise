import { Repository, Entity, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;
    newTask.user = user;
    await newTask.save();
    delete newTask.user;
    return newTask;
  }
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); //this refers to task entity
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search) OR (task.description LIKE :search)',
        { search: `%${search}%` }, // el LIKE y los porcentajes es para buscar parcialmente el termino
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
