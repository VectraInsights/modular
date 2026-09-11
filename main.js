// App de PC â€” janela Electron do Planejador de CÃ´modos (2D + 3D)
const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 1024,
    minHeight: 680,
    title: 'Planejador de CÃ´modos',
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, 'index.html'), { query: { v: String(Date.now()) } });
  win.on('closed', () => { win = null; });
}

const menu = Menu.buildFromTemplate([
  {
    label: 'Arquivo',
    submenu: [
      { label: 'Abrir projetoâ€¦', accelerator: 'Ctrl+O', click: () => win && win.webContents.send('menu-open') },
      { label: 'Salvar projetoâ€¦', accelerator: 'Ctrl+S', click: () => win && win.webContents.send('menu-save') },
      { type: 'separator' },
      { label: 'Exportar PNG (vista atual)â€¦', click: () => win && win.webContents.send('menu-png') },
      { type: 'separator' },
      { label: 'Sair', accelerator: 'Alt+F4', click: () => app.quit() }
    ]
  },
  {
    label: 'Exibir',
    submenu: [
      { label: 'Planta 2D', click: () => win && win.webContents.send('menu-view', '2d') },
      { label: 'VisÃ£o 3D', click: () => win && win.webContents.send('menu-view', '3d') },
      { type: 'separator' },
      { label: 'Recarregar', accelerator: 'F5', click: () => win && win.webContents.reload() },
      { label: 'DevTools', accelerator: 'F12', click: () => win && win.webContents.toggleDevTools() }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      { label: 'Abrir pasta de projetos', click: () => shell.openPath(path.join(os.homedir(), 'Documents')) },
      { label: 'Sobre', click: () => dialog.showMessageBox(win, { type: 'info', title: 'Planejador de CÃ´modos', message: 'Planejador de CÃ´modos 1.0 â€” digite as medidas e veja a planta 2D + 3D.' }) }
    ]
  }
]);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// Salvar / abrir projeto JSON na mÃ¡quina (app de PC de verdade, sem navegador)
ipcMain.handle('save-project', async (_e, jsonText) => {
  const r = await dialog.showSaveDialog(win, {
    title: 'Salvar projeto',
    defaultPath: path.join(os.homedir(), 'Documents', 'meu-comodo.json'),
    filters: [{ name: 'Projeto', extensions: ['json'] }]
  });
  if (r.canceled || !r.filePath) return null;
  fs.writeFileSync(r.filePath, jsonText, 'utf-8');
  return r.filePath;
});

ipcMain.handle('load-project', async () => {
  const r = await dialog.showOpenDialog(win, {
    title: 'Abrir projeto',
    defaultPath: path.join(os.homedir(), 'Documents'),
    filters: [{ name: 'Projeto', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (r.canceled || !r.filePaths.length) return null;
  return { file: r.filePaths[0], text: fs.readFileSync(r.filePaths[0], 'utf-8') };
});

ipcMain.handle('save-png', async (_e, dataUrl, baseName) => {
  const r = await dialog.showSaveDialog(win, {
    title: 'Exportar PNG',
    defaultPath: path.join(os.homedir(), 'Documents', (baseName || 'planta') + '.png'),
    filters: [{ name: 'Imagem', extensions: ['png'] }]
  });
  if (r.canceled || !r.filePath) return null;
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  fs.writeFileSync(r.filePath, buf);
  return r.filePath;
});


