## Context
HAMI Electron needs a foundational state management system to persist application data. This will use the HAMI framework's core plugins (core-fs) for file operations and follow the established patterns of HAMIFlow and HAMINode composition seen in hami-cli.

Reference: See hami-cli patterns in `https://github.com/KMaheshBhat/hami/blob/main/apps/hami-cli/src/ops/config-get-flow.ts` and `https://github.com/KMaheshBhat/hami/blob/main/apps/hami-cli/src/index.ts`

## Goals / Non-Goals
- Goals: Provide centralized state persistence, use HAMI core plugins, enable future features
- Non-Goals: Business logic, UI components, specific application features

## Decisions
- Decision: Use core-fs plugin for file I/O operations (read-file, write-file nodes)
- Alternatives considered: Direct Node.js fs API (less consistent with HAMI patterns)
- Decision: Implement as HAMIFlows for state operations following hami-cli patterns
- Alternatives considered: Direct service classes (doesn't leverage HAMI framework)

## Implementation Approach

### State File Structure
Store state in `$USER/.hami/index.json` with structure:
```json
{
  "workingDirectories": ["path/to/dir1", "path/to/dir2"],
  "activeWorkingDirectory": "path/to/dir1",
  "preferences": {}
}
```

### HAMIFlow Pattern Example

These are only examples.  Exact Node used may need to be revisited.  The source code of the nodes should be asked for review as they would contain up to date information.

Following hami-cli patterns, create flows like:
```typescript
export class StateReadFlow extends HAMIFlow<Record<string, any>, {}> {
  async run(shared: Record<string, any>): Promise<string | undefined> {
    const validate = shared.registry.createNode("core-fs:validate-hami", {});
    const readFile = shared.registry.createNode("core-fs:read-file", {
      path: "index.json",
      encoding: "utf8"
    });

    this.startNode.next(validate).next(readFile);
    return super.run(shared);
  }
}
```

Reference: Core plugins available at `https://github.com/KMaheshBhat/hami/blob/main/packages/core-fs/README.md`, `https://github.com/KMaheshBhat/hami/blob/main/packages/core-config-fs/README.md`

## Risks / Trade-offs
- Risk: Core plugin dependencies may change → Mitigation: Use stable core plugin APIs
- Risk: File system corruption → Mitigation: Atomic writes and backup handling

## Migration Plan
None - new foundational capability

## Open Questions
- How to handle concurrent state access?
- Should state include versioning for migration?