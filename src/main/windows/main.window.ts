import { BrowserWindow, Menu, screen, Tray, nativeImage, app } from "electron";
import { join } from "path";
import { setTray } from "..";
import { initDBConnection } from "../database";
import createWindow from "./app.window";

export default function createTray () {

   const icon = join(__dirname, "..", "..", "assets", "icon.png");
   const trayicon = nativeImage.createFromPath(icon);
   const tray = new Tray(trayicon.resize({ width: 16 }));

   const contextMenu = Menu.buildFromTemplate([
       {
           label: 'Show App',
           click: () => {
               createWindow();
           }
       },
       {
            label: 'Show App 2',
            click: () => {
                createWindow();
            }
        },
       {
           label: 'Quit',
           click: () => {
               app.quit();
           }
       },
   ]);

   tray.setContextMenu(contextMenu);

   initDBConnection();

   setTray(tray);
}