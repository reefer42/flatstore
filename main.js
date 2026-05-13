const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');

const FLATHUB_API = 'https://flathub.org/api/v2';

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('search-flathub', async (event, query) => {
  try {
    const response = await axios.post(`${FLATHUB_API}/search`, { query: query });
    return response.data;
  } catch (error) {
    console.error('Search error:', error.message);
    throw new Error('Failed to search Flathub');
  }
});

ipcMain.handle('get-popular-apps', async () => {
  try {
    const response = await axios.get(`${FLATHUB_API}/collection/popular`);
    return response.data;
  } catch (error) {
    console.error('Popular apps error:', error.message);
    throw new Error('Failed to fetch popular apps');
  }
});

ipcMain.handle('get-app-details', async (event, id) => {
  try {
    const response = await axios.get(`${FLATHUB_API}/appstream/${id}`);
    return response.data;
  } catch (error) {
    console.error('App details error:', error.message);
    throw new Error('Failed to fetch app details');
  }
});

ipcMain.handle('install-app', async (event, id) => {
  return new Promise((resolve, reject) => {
    // Determine how to spawn a terminal
    const cmd = `x-terminal-emulator -e "flatpak install -y flathub ${id}; read -p \\"Press enter to continue...\\"" || gnome-terminal -- bash -c "flatpak install -y flathub ${id}; read -p \\"Press enter to continue...\\"" || konsole -e "flatpak install -y flathub ${id}; read -p \\"Press enter to continue...\\"" || xfce4-terminal -e "flatpak install -y flathub ${id}; read -p \\"Press enter to continue...\\""`;
    
    exec(cmd, (error) => {
        if (error) {
            console.error('Exec error:', error);
            reject(error.message);
        } else {
            resolve({ success: true });
        }
    });
  });
});
