const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL('http://localhost:3001');

    // Crear un menú personalizado
    const menu = Menu.buildFromTemplate([
        {
            label: 'Archivo',
            submenu: [
                { label: 'Recargar', click: () => mainWindow.reload() },
                { label: 'Salir', role: 'quit' }
            ]
        },
        {
            label: 'Ver',
            submenu: [
                { label: 'Alternar Pantalla Completa', role: 'togglefullscreen' },
                { label: 'Herramientas para Desarrolladores', role: 'toggleDevTools' }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
