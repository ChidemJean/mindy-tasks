import { App, app, BrowserWindow, globalShortcut, ipcMain, Menu, nativeImage, screen, Tray } from 'electron';
import { join } from 'path';
import url from 'url';
import 'reflect-metadata'; // Required by TypoORM.
import { UsersController } from './controllers/user.controller';

import createTray from './windows/main.windows';
import createSearchWindow from './windows/search.windows';
import createWindow from './windows/app.windows';

export const isDev: boolean = !app.isPackaged;

export let tray: Tray = null
export let searchWin: BrowserWindow = null;
export let mainWin: BrowserWindow = null;

export const setAppWin = (win: BrowserWindow) => mainWin = win;
export const setSearchWin = (win: BrowserWindow) => searchWin = win;
export const setTray = (_tray: Tray) => tray = _tray;

async function registerListeners () {
    UsersController(ipcMain);
}

function initApp() {
    if (!tray) {
        createTray();
    }

    globalShortcut.register('CommandOrControl+Q', () => {
        console.log(searchWin != null);
        if (searchWin != null) return;
        createSearchWindow();
    });
}

app.on('ready', initApp)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        // app.quit();
        app.dock.hide();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});