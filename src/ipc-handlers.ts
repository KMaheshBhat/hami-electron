import { ipcMain, BrowserWindow } from 'electron';

import { StateManagementService, type HAMIState } from '@/state';

export function setupStateIPCHandlers(stateService: StateManagementService): void {
  // Get current state
  ipcMain.handle('state:get', async (): Promise<HAMIState> => {
    return await stateService.getState();
  });

  // Update state
  ipcMain.handle('state:update', async (_, updates: Partial<HAMIState>): Promise<void> => {
    await stateService.updateState(updates);
  });

  // Generic state key operations - domain-specific logic handled by other services
  ipcMain.handle('state:update-key', async (_, key: string, value: any): Promise<void> => {
    await stateService.updateStateKey(key, value);
  });

  ipcMain.handle('state:get-key', async (_, key: string): Promise<any> => {
    return await stateService.getStateKey(key);
  });

  // Listen for state changes and broadcast to renderer
  stateService.on('state-changed', (newState: HAMIState) => {
    // Broadcast to all windows
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      window.webContents.send('state-changed', newState);
    });
  });

  stateService.on('state-initialized', (initialState: HAMIState) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      window.webContents.send('state-initialized', initialState);
    });
  });
}