import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';

import { HAMINode } from '@hami-frameworx/core';

import { HAMIState, validateState } from '@/state/state';

export class StateWriteNode extends HAMINode {
  kind(): string {
    return 'hami-electron:state-write-node';
  }

  async prep(shared: Record<string, any>): Promise<{ userHamiDirectory: string; statePath: string; state: HAMIState }> {
    const userHomeDirectory = os.homedir();
    const userHamiDirectory = path.join(userHomeDirectory, '.hami');
    const statePath = path.join(userHamiDirectory, 'index.json');

    if (!shared.state) {
      throw new Error('State data is required in shared context');
    }

    return {
      userHamiDirectory,
      statePath,
      state: shared.state as HAMIState
    };
  }

  async exec(prepRes: { userHamiDirectory: string; statePath: string; state: HAMIState }): Promise<void> {
    const { userHamiDirectory, statePath, state } = prepRes;

    // Validate state before writing
    if (!validateState(state)) {
      throw new Error('Invalid state structure provided for writing');
    }

    // Ensure .hami directory exists
    await fs.mkdir(userHamiDirectory, { recursive: true });

    // Write state file atomically
    const tempPath = `${statePath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(state, null, 2), 'utf8');
    await fs.rename(tempPath, statePath);
  }

  // Direct execution method for service layer
  async executeDirect(state: HAMIState): Promise<void> {
    const userHomeDirectory = os.homedir();
    const userHamiDirectory = path.join(userHomeDirectory, '.hami');
    const statePath = path.join(userHamiDirectory, 'index.json');

    // Validate state before writing
    if (!validateState(state)) {
      throw new Error('Invalid state structure provided for writing');
    }

    // Ensure .hami directory exists
    await fs.mkdir(userHamiDirectory, { recursive: true });

    // Write state file atomically
    const tempPath = `${statePath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(state, null, 2), 'utf8');
    await fs.rename(tempPath, statePath);
  }
}