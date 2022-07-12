import { ipcMain, IpcMain } from "electron";
import AppDataSource from "../database";
import { TaskTypeOrmRepository } from "../database/repositories/task.repository";
import { Task } from "../domain/entities/task.entity";
import { CreateTaskUseCase } from "../use-cases/create-task.use-case";
import { SearchTasksUseCase } from "../use-cases/search-task.use-case";

export const getTasksChannel = "get/tasks";
export const createTaskChannel = "create/task";
export const searchTaskChannel = "search/task";

export const repository = new TaskTypeOrmRepository(AppDataSource.getRepository(Task));
// export const listAll = new ListAllTasksUseCase(repository);
export const create = new CreateTaskUseCase(repository);
export const search = new SearchTasksUseCase(repository);

export function TasksController() {

   ipcMain.handle(searchTaskChannel, async (event, args) => {
      return await search.execute(args[0]);
   });

   ipcMain.handle(createTaskChannel, async (event, args) => {
      return await create.execute(args[0]);
   });

}