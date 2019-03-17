// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, Menu } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import createWindow from "./helpers/window";
import * as Splashscreen from "@trodi/electron-splashscreen";

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  setApplicationMenu();

  const windowOptions = {
    width: 1000,
    height: 600,
    frame: false,
    show: false
  }

  const mainWindow = Splashscreen.initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__dirname, "splash.svg"),
    delay: 0, // force show immediately since example will load fast
    minVisible: 0, // show for 1.5s so example is obvious
    splashScreenOpts: {
      height: 300,
      width: 300,
      transparent: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
});

app.on("window-all-closed", () => {
  app.quit();
});
