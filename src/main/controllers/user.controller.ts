import { IpcMain } from "electron";

export function UsersController(ipcMain: IpcMain) {

   ipcMain.handle("get/users", async (event, args) => {
      return [{ name: 'Jean' }];
   });

}