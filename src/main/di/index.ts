import { container } from "tsyringe";
import AppDataSource from "../database";
import { TaskTypeOrmRepository } from "../database/repositories/task.repository";
import { UserTypeOrmRepository } from "../database/repositories/user.repository";
import { TaskRepositoryInterface } from "../domain/repositories/task.repository";
import { UserRepositoryInterface } from "../domain/repositories/user.repository";

container.register("appDataSource", {
   useValue: AppDataSource
});

container.registerSingleton<UserRepositoryInterface>("UserRepositoryInterface", UserTypeOrmRepository);
container.registerSingleton<TaskRepositoryInterface>("TaskRepositoryInterface", TaskTypeOrmRepository);