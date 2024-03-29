import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { Task } from "../../domain/entities/task.entity";
import { TaskRepositoryInterface } from "../../domain/repositories/task.repository";

@injectable()
export class TaskTypeOrmRepository implements TaskRepositoryInterface {
   private ormRepo: Repository<Task>

   constructor(@inject('appDataSource') private dataSource: DataSource) {
      this.ormRepo = dataSource.getRepository(Task);
   }
   
   update(id: string, Task: Task): Promise<boolean> {
      throw new Error("Method not implemented.");
   }

   async insert(task: Task): Promise<void> {
      // const { user, ...task } = _task;
      await this.ormRepo.save(task);
   }

   async findByTermAndUser(user: string, term: string): Promise<Task[]> {
      return await this.ormRepo.createQueryBuilder("task")
         .where("task.user = :user and (task.title like :term or task.text like :term)", { user, term:`%${term.trim()}%` })
         .getMany();
   }

   findAll(): Promise<Task[]> {
      return this.ormRepo.find();
   }
}