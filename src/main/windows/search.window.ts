import { app, BrowserWindow, screen } from "electron";
import { join } from "path";
import { isDev, searchWin, setSearchWin } from "..";

export default function createSearchWindow() {

   const { width, height } = screen.getPrimaryDisplay().workAreaSize;

   // Create the browser window.
   let _searchWin = new BrowserWindow({
      icon: join(__dirname, "..", "..", "assets", "icon.png"),
      width: width * .40,
      height: height * .312,
      transparent: true,
      frame: false,
      // skipTaskbar: true,
      maximizable: false,
      hasShadow: false,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         preload: join(__dirname, "bridge.js")
      },
   });

   // const { getCursorScreenPoint, getDisplayNearestPoint } = screen

   // const currentScreen = getDisplayNearestPoint(getCursorScreenPoint())
   // _searchWin.setBounds(currentScreen.workArea)
   _searchWin.webContents.openDevTools();

   if (process.platform === 'darwin') {
      app.dock.hide();
   }

   _searchWin.on("blur", (e: any) => {
      // _searchWin.close();
      // setSearchWin(null);
   });

   _searchWin.webContents.on('before-input-event', (event, input) => {
      if (input.key.toLowerCase() === 'escape') {
         _searchWin.close();
      }
   });

   _searchWin.on('closed', function(){
      setSearchWin(null);
   });

   // Turns off the application menu.
   // Menu.setApplicationMenu(null);

   if (isDev) {
      //In case of developement build we use WebpackDevServer to enable HotModuleReload
      //By default WDS will deploy compiled/recompiled files on url http://localhost:8080/
      _searchWin.loadURL('http://localhost:8080');

      // Open the DevTools.
      // win.webContents.openDevTools();
   } else {
      //TODO: Works on linux, check windows/mac
      _searchWin.loadFile('./.webpack/renderer/index.html');
   }

   setSearchWin(_searchWin);
}