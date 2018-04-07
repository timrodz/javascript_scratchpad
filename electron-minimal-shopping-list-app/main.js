const electron = require("electron");
const url = require("url");
const path = require("path");

// Destructuring
// This will find 'app' and 'BrowserWindow' from the electron package
// Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { app, BrowserWindow, Menu } = electron;

// Store a variable for our main window
let mainWindow;

// Listen for app to be ready (app.on)
app.on("ready", function() {
  // Create new window
  mainWindow = new BrowserWindow({
    // Empty browser window
    // This has configuration options
  });

  // Load HTML file into window (mainWindow.html)
  // This code translates into:
  // file://__dirname/mainWindow.html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Build menu from the template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert the menu to our application
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item"
      },
      {
        label: "Clear Items"
      },
      {
        label: "Quit",
        // Accelerator (e.g. Hotkeys), if the platform is darwin, we're using Mac, otherwise Windows
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Hello"
      }
    ]
  }
];
