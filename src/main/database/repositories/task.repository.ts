import { Repository } from "typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { Task } from "../../domain/entities/task.entity";
import { TaskRepositoryInterface } from "../../domain/repositories/task.repository";

export class TaskTypeOrmRepository implements TaskRepositoryInterface {
   constructor(private ormRepo: Repository<Task>) { }
   
   update(id: string, Task: Task): Promise<boolean> {
      throw new Error("Method not implemented.");
   }

   async insert(task: Task): Promise<void> {
      // const { user, ...task } = _task;
      await this.ormRepo.save(task);
   }

   findAll(): Promise<Task[]> {
      return this.ormRepo.find();
   }
}