const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  searchFlathub: (query) => ipcRenderer.invoke('search-flathub', query),
  getPopularApps: () => ipcRenderer.invoke('get-popular-apps'),
  getAppDetails: (id) => ipcRenderer.invoke('get-app-details', id),
  installApp: (id) => ipcRenderer.invoke('install-app', id)
});
