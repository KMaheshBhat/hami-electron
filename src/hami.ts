import { HAMIFlow, HAMINode } from '@hami-frameworx/core';

export class HAMITestNode extends HAMINode {
  kind(): string {
    return 'hami-electron:hami-test-node';
  }
  async exec(prepRes: unknown): Promise<unknown> {
    console.log(`Running ${this.kind()} (HAMINode)`);
    return;
  }
}

export class HAMITestFlow extends HAMIFlow {
  kind(): string {
    return 'hami-electron:hami-test-flow';
  }
}
