import { BrowserWindow, Menu, screen, Tray } from "electron";
import { join } from "path";
import { isDev, setAppWin } from "..";
import { initDBConnection } from "../database";

export default function createWindow() {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;

   // Create the browser window.
   const win = new BrowserWindow({
       icon: join(__dirname, "..", "..", "assets", "icon.png"),
       width: width * .35,
       height: height * .35,
       transparent: false,
       frame: true,
       maximizable: true,
       hasShadow: true,
       webPreferences: {
           nodeIntegration: false,
           contextIsolation: true,
           preload: join(__dirname, "bridge.js")
       },
   });

   // Turns off the application menu.
   // Menu.setApplicationMenu(null);

   if (isDev) {
       //In case of developement build we use WebpackDevServer to enable HotModuleReload
       //By default WDS will deploy compiled/recompiled files on url http://localhost:8080/
       win.loadURL('http://localhost:8080');

       // Open the DevTools.
       // win.webContents.openDevTools();
   } else {
       //TODO: Works on linux, check windows/mac
       win.loadFile('./.webpack/renderer/index.html');
   }

   setAppWin(win);
}