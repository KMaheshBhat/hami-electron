import { Node } from 'pocketflow';

import { HAMIFlow, HAMINodeConfigValidateResult, validateAgainstSchema, ValidationSchema } from '@hami-frameworx/core';

import { StateReadNode } from './state-read-node';

interface StateReadFlowConfig {
  coreFSStrategy: 'USER_HOME';
}

const StateReadFlowConfigSchema: ValidationSchema = {
  type: 'object',
  properties: {
    coreFSStrategy: {
      type: 'string',
      enum: ['USER_HOME'],
    },
  },
  required: ['coreFSStrategy'],
};

export class StateReadFlow extends HAMIFlow<Record<string, any>, StateReadFlowConfig> {
  startNode: Node;
  config: StateReadFlowConfig;

  constructor(config: StateReadFlowConfig) {
    const startNode = new Node();
    super(startNode, config);
    this.startNode = startNode;
    this.config = config;
  }

  kind(): string {
    return 'hami-electron:state-read-flow';
  }

  async run(shared: Record<string, any>): Promise<string | undefined> {
    const stateReadNode = new StateReadNode();
    this.startNode.next(stateReadNode);
    return super.run(shared);
  }

  validateConfig(config: StateReadFlowConfig): HAMINodeConfigValidateResult {
    const result = validateAgainstSchema(config, StateReadFlowConfigSchema);
    return {
      valid: result.isValid,
      errors: result.errors || [],
    };
  }
}