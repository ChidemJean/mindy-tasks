import { ipcMain, IpcMain } from "electron";
import { container } from "tsyringe";
import AppDataSource from "../database";
import { UserTypeOrmRepository } from "../database/repositories/user.repository";
import { User } from "../domain/entities/user.entity";
import { CreateUserUseCase } from "../use-cases/create-user.use-case";
import { ListAllUsersUseCase } from "../use-cases/list-all-users.use-case";

export const getUsersChannel = "get/users";
export const createUserChannel = "create/user";

export function UsersController() {

   ipcMain.handle(getUsersChannel, async (event, args) => {
      const listAll = container.resolve(ListAllUsersUseCase);
      return await listAll.execute();
   });

   ipcMain.handle(createUserChannel, async (event, args) => {
      const create = container.resolve(CreateUserUseCase);
      return await create.execute(args[0]);
   });

}