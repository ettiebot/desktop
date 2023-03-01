"use strict";
import {
  app,
  protocol,
  BrowserWindow,
  screen,
  shell,
  ipcMain,
  Tray,
  nativeImage,
  Menu,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import updateElectronApp from "update-electron-app";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import pcPower from "electron-shutdown-command";
const isDevelopment = process.env.NODE_ENV !== "production";

updateElectronApp();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow(params = {}) {
  // Create the browser window.
  let win;

  win = new BrowserWindow({
    ...params,
    alwaysOnTop: true,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url === win.webContents.getURL()) return { action: "allow" };
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.setAppDetails({
    appId: "ettie-client",
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  return win;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  ipcMain.on("pcPower", (e, action) => {
    pcPower[action]();
  });

  const welcomeWin = await createWindow({
    width: 1200,
    height: 800,
    position: "center",
  });
  const chatWin = await createWindow({
    width: 350,
    height: 500,
    x: width / 2 - 200,
    y: height - 480,
  });

  let _view = null;
  function changeView({ view, reload }) {
    if (view === "welcome") {
      chatWin.hide();
      welcomeWin.show();
      if (reload) welcomeWin.reload();
    } else if (view === "chat") {
      welcomeWin.hide();
      chatWin.show();
      if (reload) chatWin.reload();
    }

    _view = view;
  }

  const icon = nativeImage.createFromDataURL(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYxJREFUWEfNly1OBEEQhd8LCOAGWAwGT0g4AbdAg0FwCQQSyS04AQkCiwCD5wYgNvvIbHomszP9U9U9JIzdqq6vXver7iUcnySlwknSsdQQWkySdA7g2bq4FyQLkOs4B+SBSALUFu/BrBBRgNbiHUQ1wBLFPSpsKbBkcasKA4CkPQDfnsMl6RjAR4s1xwBJj+e6aZ0NGwBJOwBWme7XJLuY2bcUQFX3Ab5pOvYK/GuAfZI/XvkBvJI8LY1wlqyXGiiSHgFctjhgc7hrAEo51hngBpB0BuClKKvjajYpYOnYM36De3ZJrooApW7Hv1suoEkz74sBGIvfALjfgvbIG1PDUjhIfgTgc7pGtQLWwqH4HYDbaAOS1p0dLXvtKdqvV1K4eRTnwEvFAVybADyDpXRBTV1jBgiJDySvUl0bOh5S++00P0gsZ8QaMz5LY4AnABfWRWrjpgf5Tx+lM89H7oiZ/Tz76FDhgGT0wZv6Y/IG4MRRIBWafEsOl1ejj5Pp1qFlmoBGb3+RPPSq9gtFctRMs1E//wAAAABJRU5ErkJggg=="
  );
  const tray = new Tray(icon);
  tray.setToolTip("Ettie");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Показать/Скрыть",
      type: "normal",
      click: () => {
        if (_view === "chat") {
          if (chatWin.isVisible() === true) chatWin.hide();
          else chatWin.show();
        }
      },
    },
    {
      label: "Выход",
      type: "normal",
      click: () => app.quit(),
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.on("click", () => contextMenu.items[0].click());

  ipcMain.on("changeView", (e, data) => changeView(data));
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
