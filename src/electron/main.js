"use strict";

const { app, BrowserWindow, Menu } = require("electron");

const path = require("path");
const url = require("url");

// application windows
let mainWindow = null;

// listen for app to be ready
app.once("ready", () => {
    console.log("Application starting...");

    // creates the browser window
    mainWindow  = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load index.html
    console.log("Rendering application...")
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../../dist/index.html"),
            protocol: "file:",
            slashes: true
        })
    );
    
    // build menu from template
    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // // insert menu
    // Menu.setApplicationMenu(mainMenu);

    // opens devtools for testing purposes
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow  = null;
    });
});

// quit when all windows are closed
app.on("window-all-closed", () => {
    if(process.platform != "darwin"){
        app.quit();
    }
});

// TODO application menu bar
// application menu
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Refresh",
                accelerator: process.platform == "darwin" ? "Command+R" : "Crtl+R",
                click(){
                    console.log("Reloading...");
                    mainWindow.loadFile("../client/src/index.html");
                }
            }
        ]
    }
];

// if on mac, add empty object to menu (this helps formatting the menu)
if(process.platform == "darwin"){
    mainMenuTemplate.unshift({label: ""});
}