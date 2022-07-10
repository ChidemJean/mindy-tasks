import { ipcMain, IpcMain } from "electron";
import AppDataSource from "../database";
import { UserTypeOrmRepository } from "../database/repositories/user.repository";
import { User } from "../domain/entities/user.entity";
import { CreateUserUseCase } from "../use-cases/create-user.use-case";
import { ListAllUsersUseCase } from "../use-cases/list-all-users.use-case";

export const getUsersChannel = "get/users";
export const createUserChannel = "create/user";

export const repository = new UserTypeOrmRepository(AppDataSource.getRepository(User));
export const listAll = new ListAllUsersUseCase(repository);
export const create = new CreateUserUseCase(repository);

export function UsersController() {

   ipcMain.handle(getUsersChannel, async (event, args) => {
      return await listAll.execute();
   });

   ipcMain.handle(createUserChannel, async (event, args) => {
      return await create.execute(args[0]);
   });

}