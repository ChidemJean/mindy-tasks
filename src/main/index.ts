import { app, BrowserWindow, globalShortcut, ipcMain, Menu, nativeImage, screen, Tray } from 'electron';
import { join } from 'path';
import url from 'url';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database/Database';

// Right now this specifies a folder where database files will be stored.
export const defaultStorageFolder = app.getPath('downloads');

const isDev: boolean = !app.isPackaged;

let tray: any = null

function createTray () {

    const icon =join(__dirname, "..", "..", "assets", "icon.png");
    const trayicon = nativeImage.createFromPath(icon);
    tray = new Tray(trayicon.resize({ width: 16 }));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
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

    global.database = new Database();
}

function createWindow() {
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
}

function createSearchWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    const win = new BrowserWindow({
        icon: join(__dirname, "..", "..", "assets", "icon.png"),
        width: width * .35,
        height: height * .35,
        transparent: false,
        frame: true,
        skipTaskbar: true,
        maximizable: true,
        hasShadow: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, "bridge.js")
        },
    });

    if (process.platform === 'darwin') {
        app.dock.hide();
    }

    win.on("blur", (e: any) => {
        win.close();
    });

    win.webContents.on('before-input-event', (event, input) => {
        console.log(input.key);
        if (input.key.toLowerCase() === 'escape') {
            win.close();
        }
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
}
  
async function registerListeners () {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message);
    });
}

function initApp() {
    if (!tray) { // if tray hasn't been created already.
        createTray();
    }

    globalShortcut.register('CommandOrControl+Q', () => {
        createSearchWindow();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform === 'darwin') {
        // app.quit();
        app.dock.hide();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
