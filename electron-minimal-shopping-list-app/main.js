const electron = require("electron");
const url = require("url");
const path = require("path");

// Destructuring
// This will find 'app' and 'BrowserWindow' from the electron package
// Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { app, BrowserWindow, Menu, ipcMain } = electron;

// ipcMain and ipcRenderer allow for sending messages throughout different files

// Set Environment to production
process.env.NODE_ENV = 'production';

// Store a variable for our main window and the add item window
let mainWindow;
let addWindow;

// -- Main window
app.on("ready", function() {
    // Create new window
    mainWindow = new BrowserWindow({
        // No options
    });

    // Load HTML file into window (mainWindow.html)
    // This code translates into: file://__dirname/mainWindow.html
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "mainWindow.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Quit app when closed - Not done by default
    mainWindow.on("closed", function() {
        app.quit();
    });

    // Build menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert the menu to our application
    Menu.setApplicationMenu(mainMenu);
});

// -- Global Functions
// Handle: Create Add Window
function createAddWindow() {
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add item to shopping list"
    });

    // Load HTML file into window (mainWindow.html)
    // This code translates into:
    // file://__dirname/mainWindow.html
    addWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "addWindow.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Set addWindow to null whenever it is closed
    addWindow.on("closed", function() {
        addWindow = null;
    });
}

// Catch item add
ipcMain.on("item:add", function(e, item) {
    console.log("Item: " + item);
    mainWindow.webContents.send("item:add", item);
    addWindow.close();
});

// -- Menu
// Create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Add Item",
                accelerator:
                    process.platform == "darwin" ? "Command+A" : "Ctrl+A",
                click() {
                    createAddWindow();
                }
            },
            {
                label: "Clear Items",
                accelerator:
                    process.platform == "darwin" ? "Command+C" : "Ctrl+C",
                click() {
                    mainWindow.webContents.send("item:clear");
                }
            },
            {
                label: "Quit",
                // Accelerator (e.g. Hotkeys), if the platform is darwin, we're using Mac, otherwise Windows
                accelerator:
                    process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
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

// -- Additional settings
// Add an empty object on Mac so it doesn't show Electron instead of file
if (process.platform == "darwin") {
    // Unshift adds an object to the beginning of the array
    mainMenuTemplate.unshift({});
}

// Show developer tools menu if not in production build
if (process.env.NODE_ENV != "production") {
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle Developer Tools",
                accelerator:
                    process.platform == "darwin" ? "Command+D" : "Ctrl+D",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                // To show the Reload option, simply pass it as a role instead of a label
                role: "reload"
            }
        ]
    });
}
