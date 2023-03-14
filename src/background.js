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
  dialog,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import * as pcPower from "electron-shutdown-command";
import loudness from "../loudness";
import axios from "axios";
import { join } from "path";
import childProcess from "child_process";
import { createWriteStream, existsSync, readFileSync, unlinkSync } from "fs";
import { resourcesPath } from "process";
import lang from "./lang";

const branch = "dev";
const dlServerURL = "https://dl.ettie.uk";
const releaseBaseURL = "https://github.com/ettiebot/desktop/releases/download";
const versionsURL = `${dlServerURL}/versions.json`;

const isDevelopment = process.env.NODE_ENV !== "production";
const { platform } = process;

const serverURL = isDevelopment
  ? "http://localhost:3001"
  : "https://api.ettie.uk";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

class Ettie {
  constructor() {
    this.wins = {};
    this.display = screen.getPrimaryDisplay();
    this.config = this.readConfig();
    this.onAppReady();
  }

  readConfig() {
    try {
      console.log(join(resourcesPath, "config.json"));
      return JSON.parse(
        readFileSync(join(resourcesPath, "config.json"), "utf8")
      );
    } catch (_) {
      return null;
    }
  }

  async downloadFile(fileUrl, outputLocationPath) {
    if (existsSync(outputLocationPath)) unlinkSync(outputLocationPath);
    const writer = createWriteStream(outputLocationPath);

    return axios
      .get(fileUrl, {
        responseType: "stream",
      })
      .then((response) => {
        return new Promise((resolve, reject) => {
          response.data.pipe(writer);
          let error = null;
          writer.on("error", (err) => {
            error = err;
            writer.close();
            reject(err);
          });
          writer.on("close", () => {
            if (!error) {
              resolve(true);
            }
          });
        });
      });
  }

  async downloadDeps() {
    try {
      // Download dependencies for Windows
      const { data: versions } = await axios.get(versionsURL, {
        responseType: "json",
      });

      const verBranch = versions[branch];
      const verPlatform = verBranch[platform];
      if (!verPlatform) return;

      console.info("Found dependencies: ", verPlatform.deps.join(", "));

      for (const dep of verPlatform.deps) {
        const depPath = join(process.resourcesPath, dep);
        if (!existsSync(depPath)) {
          await this.downloadFile(
            `${dlServerURL}/${branch}/deps/${dep}`,
            depPath
          );
          console.info("Downloaded dependency: ", dep);
        }
      }
    } catch (err) {
      console.error("Failed to download dependencies: ", err);
    }
  }

  async createWindow(params = {}) {
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
        ...(params._args || {}),
      },
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url === win.webContents.getURL()) return { action: "allow" };
      shell.openExternal(url);
      return { action: "deny" };
    });

    if (platform === "win32") {
      win.setAppDetails({
        appId: "ettie-client",
      });
    }

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

  async checkForUpdates() {
    const lp = this.config ? lang[this.config.language] : lang["en"];

    const { data: versions } = await axios.get(versionsURL, {
      responseType: "json",
    });

    const verBranch = versions[branch];
    const version = verBranch._version;
    const verPlatform = verBranch[platform];
    console.info(verPlatform, version, verBranch);

    if (verPlatform) {
      // If the latest release is not the current version
      if (
        Number(version.replace(/[^a-zA-Z0-9 ]/g, "")) >
        Number(app.getVersion().replace(/[^a-zA-Z0-9 ]/g, ""))
      ) {
        try {
          console.log(`New version available, downloading v${version}...`);

          // Download the installer
          const assetLocalPath = join(process.resourcesPath, verPlatform.name);
          const updateBaseURL = `${releaseBaseURL}/v${version}/Ettie`;

          let updateURL;
          if (platform === "win32") {
            updateURL = `${updateBaseURL}-Setup-${version}.exe`;
          } else if (platform === "darwin") {
            updateURL = `${updateBaseURL}-${version}.dmg`;
          } else if (platform === "linux") {
            updateURL = `${updateBaseURL}-${version}.AppImage`;
          } else {
            return;
          }

          // Download update file
          await this.downloadFile(updateURL, assetLocalPath);

          // Download dependencies
          await this.downloadDeps();

          const buttonIndex = dialog.showMessageBoxSync({
            message: lp.updater.available,
            buttons: [lp.updater.yes, lp.updater.no],
          });

          if (buttonIndex === 0) {
            console.info("Installing update...");
            const subprocess = childProcess.spawn(
              this._buildUpdateRunCmd(assetLocalPath, platform, version),
              {
                detached: true,
                stdio: "ignore",
              }
            );
            subprocess.unref();
            app.quit();
          }
        } catch (err) {
          console.error("Failed to download update: ", err);
          dialog.showErrorBox(lp.updater.error, err.toString());
        }
      }
    }

    setTimeout(() => this.checkForUpdates(), 120 * 1000);
  }

  async listenIPC() {
    ipcMain.on("pcPower", (_, action) => {
      if (action === "shutdown") pcPower.shutdown();
      else if (action === "reboot") pcPower.reboot();
    });

    ipcMain.on("sound", async (_, { a, p }) => {
      switch (a) {
        case "set":
          if (p <= 0)
            await loudness.setVolume(
              (await loudness.getVolume()) - Math.abs(p)
            );
          else await loudness.setVolume((await loudness.getVolume()) + p);
          break;
        case "setTotal":
          await loudness.setVolume(p);
          break;
        case "mute":
          await loudness.setMuted(p);
          break;
      }
    });

    ipcMain.on("showWindow", () => {
      this.wins["chat"].show();
      this.wins["chat"].moveTop();
    });

    ipcMain.on("changeView", (_, data) => this.changeView(data));
  }

  async onAppReady() {
    // Vue.js polyfill for Devtools
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installExtension(VUEJS3_DEVTOOLS);
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }

    // Listen IPC events
    await this.listenIPC();

    // Create welcome window
    this.wins["welcome"] = await this.createWindow({
      width: 1200,
      height: 800,
      position: "center",
      _args: {
        additionalArguments: ["--resources-path=" + resourcesPath],
      },
    });

    // Create chat window
    this.wins["chat"] = await this.createWindow({
      width: 350,
      height: 500,
      x: this.display.workAreaSize.width / 2 - 200,
      y: this.display.workAreaSize.height - 480,
      _args: {
        additionalArguments: [
          "--server-url=" + serverURL,
          "--resources-path=" + resourcesPath,
        ],
      },
    });

    // Create tray
    await this.createTray();
    // Check for updates
    await this.checkForUpdates();
    // Download dependencies
    await this.downloadDeps();
  }

  createTray() {
    const lp = this.config ? lang[this.config.language] : lang["en"];

    this.tray = new Tray(
      nativeImage.createFromDataURL(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYxJREFUWEfNly1OBEEQhd8LCOAGWAwGT0g4AbdAg0FwCQQSyS04AQkCiwCD5wYgNvvIbHomszP9U9U9JIzdqq6vXver7iUcnySlwknSsdQQWkySdA7g2bq4FyQLkOs4B+SBSALUFu/BrBBRgNbiHUQ1wBLFPSpsKbBkcasKA4CkPQDfnsMl6RjAR4s1xwBJj+e6aZ0NGwBJOwBWme7XJLuY2bcUQFX3Ab5pOvYK/GuAfZI/XvkBvJI8LY1wlqyXGiiSHgFctjhgc7hrAEo51hngBpB0BuClKKvjajYpYOnYM36De3ZJrooApW7Hv1suoEkz74sBGIvfALjfgvbIG1PDUjhIfgTgc7pGtQLWwqH4HYDbaAOS1p0dLXvtKdqvV1K4eRTnwEvFAVybADyDpXRBTV1jBgiJDySvUl0bOh5S++00P0gsZ8QaMz5LY4AnABfWRWrjpgf5Tx+lM89H7oiZ/Tz76FDhgGT0wZv6Y/IG4MRRIBWafEsOl1ejj5Pp1qFlmoBGb3+RPPSq9gtFctRMs1E//wAAAABJRU5ErkJggg=="
      )
    );
    this.tray.setToolTip("Ettie");
    const contextMenu = Menu.buildFromTemplate([
      {
        label: lp.tray.showHide,
        type: "normal",
        click: () => {
          if (this.view === "chat") {
            if (this.wins["chat"].isVisible() === true)
              this.wins["chat"].hide();
            else this.wins["chat"].show();
          }
        },
      },
      {
        label: lp.tray.quit,
        type: "normal",
        click: () => app.quit(),
      },
      { type: "separator" },
      {
        label: this.config
          ? "token: ..." +
            this.config.token.substr(this.config.token.length - 15)
          : "unlogged",
        type: "normal",
      },
      {
        label: "v" + app.getVersion(),
        type: "normal",
      },
    ]);
    this.tray.setContextMenu(contextMenu);
    this.tray.on("click", () => contextMenu.items[0].click());
  }

  recreateTray() {
    this.tray.destroy();
    this.readConfig();
    this.createTray();
  }

  changeView({ view, reload }) {
    if (view === "welcome") {
      this.wins["chat"].hide();
      this.wins["welcome"].show();
      if (reload) this.wins["welcome"].reload();
    } else if (view === "chat") {
      this.wins["welcome"].hide();
      this.wins["chat"].show();
      if (reload) this.wins["chat"].reload();
    }

    this.view = view;
    this.recreateTray();
  }

  _buildUpdateRunCmd(assetLocalPath, platform, version) {
    if (platform === "win32") return assetLocalPath;
    else if (platform === "darwin")
      return `sudo hdiutil mount ${assetLocalPath} && sudo cp -R "/Volumes/Ettie ${version}/Ettie ${version}.app" /Applications`;
    else if (platform === "linux")
      return `chmod u+x ${assetLocalPath} && ${assetLocalPath}`;
  }
}

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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  //if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => new Ettie());
