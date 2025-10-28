import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';

import { HAMINode } from '@hami-frameworx/core';

import { HAMIState, handleStateError, validateState } from '@/state/state';

export class StateReadNode extends HAMINode {
  kind(): string {
    return 'hami-electron:state-read-node';
  }

  async prep(shared: Record<string, any>): Promise<{ userHamiDirectory: string; statePath: string }> {
    const userHomeDirectory = os.homedir();
    const userHamiDirectory = path.join(userHomeDirectory, '.hami');
    const statePath = path.join(userHamiDirectory, 'index.json');

    return {
      userHamiDirectory,
      statePath
    };
  }

  async exec(prepRes: { userHamiDirectory: string; statePath: string }): Promise<HAMIState> {
    const { userHamiDirectory, statePath } = prepRes;

    try {
      // Ensure .hami directory exists
      await fs.mkdir(userHamiDirectory, { recursive: true });

      // Try to read and parse state file
      const content = await fs.readFile(statePath, 'utf8');
      const parsed = JSON.parse(content);

      if (!validateState(parsed)) {
        throw new Error('Invalid state structure');
      }

      return parsed as HAMIState;
    } catch (error) {
      return handleStateError(error, statePath);
    }
  }
}