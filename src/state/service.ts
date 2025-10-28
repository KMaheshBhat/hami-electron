import { EventEmitter } from 'events';

import { StateReadFlow, StateWriteFlow } from '@/ops';

import { type HAMIState, DEFAULT_STATE, validateState } from './state';

export class StateManagementService extends EventEmitter {
  private currentState: HAMIState = DEFAULT_STATE;
  private registry: any; // HAMI registry

  constructor(registry: any) {
    super();
    this.registry = registry;
  }

  async initialize(): Promise<void> {
    try {
      const state = await this.readState();
      this.currentState = state;
      this.emit('state-initialized', this.currentState);
    } catch (error) {
      console.error('Failed to initialize state:', error);
      this.currentState = DEFAULT_STATE;
      this.emit('state-initialized', this.currentState);
    }
  }

  async getState(): Promise<HAMIState> {
    return { ...this.currentState };
  }

  async updateState(updates: Partial<HAMIState>): Promise<void> {
    const newState = { ...this.currentState, ...updates };

    if (!validateState(newState)) {
      throw new Error('Invalid state updates provided');
    }

    await this.writeState(newState);
    this.currentState = newState;
    this.emit('state-changed', this.currentState);
  }

  async readState(): Promise<HAMIState> {
    const readFlow = new StateReadFlow({ coreFSStrategy: 'USER_HOME' });
    const result = await readFlow.run({ registry: this.registry });
    return result as unknown as HAMIState;
  }

  async writeState(state: HAMIState): Promise<void> {
    const writeFlow = new StateWriteFlow({ coreFSStrategy: 'USER_HOME' });
    await writeFlow.run({ registry: this.registry, state });
  }

  // Generic state update methods - domain-specific logic handled by other services
  async updateStateKey(key: string, value: any): Promise<void> {
    await this.updateState({ [key]: value });
  }

  async getStateKey<T = any>(key: string): Promise<T | undefined> {
    const state = await this.getState();
    return state[key] as T;
  }
}