// Generic state container - specific domains handled by other services
export type HAMIState = Record<string, any>;

export const DEFAULT_STATE: HAMIState = {};

export function validateState(state: any): state is HAMIState {
  return state !== null && typeof state === 'object';
}

export function handleStateError(error: any, statePath: string): HAMIState {
  console.error('State operation failed:', error);

  // If it's a read error and file might be corrupted, try to backup
  if (error.code === 'ENOENT') {
    console.log('State file does not exist, using default state');
    return DEFAULT_STATE;
  }

  // Handle JSON parsing errors (corrupted file)
  if (error instanceof SyntaxError) {
    console.warn('State file contains invalid JSON, attempting to backup and use default state');

    try {
      // Attempt to backup corrupted file using core-fs
      const backupPath = `${statePath}.backup.${Date.now()}`;
      // Note: In a real implementation with proper HAMI registry, we'd do:
      // const renameNode = shared.registry.createNode("core-fs:rename-file", {
      //   oldPath: statePath,
      //   newPath: backupPath
      // });
      // await renameNode.exec(shared);
      console.warn(`Would backup corrupted state file to ${backupPath}`);
    } catch (backupError) {
      console.error('Failed to backup corrupted state file:', backupError);
    }

    return DEFAULT_STATE;
  }

  // For other errors, log and return default state
  console.error('Unexpected error during state operation:', error);
  return DEFAULT_STATE;
}