// Ponte segura entre a janela (HTML) e o PC (arquivos). Sem isso o app não acessa disco.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('pcApi', {
  isPC: true,
  saveProject: (jsonText) => ipcRenderer.invoke('save-project', jsonText),
  loadProject: () => ipcRenderer.invoke('load-project'),
  savePng: (dataUrl, baseName) => ipcRenderer.invoke('save-png', dataUrl, baseName),
  onMenu: (cb) => {
    ipcRenderer.on('menu-save', () => cb('save'));
    ipcRenderer.on('menu-open', () => cb('open'));
    ipcRenderer.on('menu-png', () => cb('png'));
    ipcRenderer.on('menu-view', (_e, v) => cb('view:' + v));
  }
});
