import { Node } from 'pocketflow';

import { HAMIFlow, HAMINodeConfigValidateResult, validateAgainstSchema, ValidationSchema } from '@hami-frameworx/core';

import { StateWriteNode } from './state-write-node';

interface StateWriteFlowConfig {
  coreFSStrategy: 'USER_HOME';
}

const StateWriteFlowConfigSchema: ValidationSchema = {
  type: 'object',
  properties: {
    coreFSStrategy: {
      type: 'string',
      enum: ['USER_HOME'],
    },
  },
  required: ['coreFSStrategy'],
};

export class StateWriteFlow extends HAMIFlow<Record<string, any>, StateWriteFlowConfig> {
  startNode: Node;
  config: StateWriteFlowConfig;

  constructor(config: StateWriteFlowConfig) {
    const startNode = new Node();
    super(startNode, config);
    this.startNode = startNode;
    this.config = config;
  }

  kind(): string {
    return 'hami-electron:state-write-flow';
  }

  async run(shared: Record<string, any>): Promise<string | undefined> {
    const stateWriteNode = new StateWriteNode();
    this.startNode.next(stateWriteNode);
    return super.run(shared);
  }

  validateConfig(config: StateWriteFlowConfig): HAMINodeConfigValidateResult {
    const result = validateAgainstSchema(config, StateWriteFlowConfigSchema);
    return {
      valid: result.isValid,
      errors: result.errors || [],
    };
  }
}