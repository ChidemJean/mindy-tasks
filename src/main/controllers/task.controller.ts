import { ipcMain, IpcMain } from "electron";
import AppDataSource from "../database";
import { TaskTypeOrmRepository } from "../database/repositories/task.repository";
import { Task } from "../domain/entities/task.entity";
import { CreateTaskUseCase } from "../use-cases/create-task.use-case";

export const getTasksChannel = "get/tasks";
export const createTaskChannel = "create/task";

export const repository = new TaskTypeOrmRepository(AppDataSource.getRepository(Task));
// export const listAll = new ListAllTasksUseCase(repository);
export const create = new CreateTaskUseCase(repository);

export function TasksController() {

   // ipcMain.handle(getTasksChannel, async (event, args) => {
   //    return await listAll.execute();
   // });

   ipcMain.handle(createTaskChannel, async (event, args) => {
      return await create.execute(args[0]);
   });

}