import { Task } from '../entities/task.entity';

export interface TaskRepositoryInterface {
   insert(Task: Task): Promise<void>;
   update(id: string, Task: Task): Promise<boolean>;
   findAll(): Promise<Task[]>;
}