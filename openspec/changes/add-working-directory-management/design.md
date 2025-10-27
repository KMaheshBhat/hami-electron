## Context
Working directories are conceptually a flat list displayed in the sidebar. This builds on HAMI state management and uses HAMI core plugins (core-fs, core-config-fs, core-trace-fs) where available, following HAMIFlow patterns from hami-cli.

Reference: See hami-cli patterns in `https://github.com/KMaheshBhat/hami/blob/main/apps/hami-cli/src/ops/config-get-flow.ts` and `https://github.com/KMaheshBhat/hami/blob/main/apps/hami-cli/src/index.ts`

## Goals / Non-Goals
- Goals: Register/forget working directories, display in sidebar, select active directory, use HAMI framework patterns
- Non-Goals: Tree navigation, file browsing, configuration management, trace review (separate proposals)

## Decisions
- Decision: Use HAMIFlows for working directory operations following hami-cli patterns
- Alternatives considered: Direct service classes (doesn't leverage HAMI framework)
- Decision: Working directories stored as flat list in state via HAMI state management
- Alternatives considered: Tree structure (overly complex), database (overkill)
- Decision: Sidebar shows simple list with selection mechanism
- Alternatives considered: Tree view (not needed), tabs (less scalable)

## Implementation Approach

### State Integration
Working directories stored in HAMI state under `workingDirectories` array and `activeWorkingDirectory` field.

### HAMIFlow Pattern Example
Following hami-cli patterns, create flows like:
```typescript
export class RegisterWorkingDirectoryFlow extends HAMIFlow<Record<string, any>, { directoryPath: string }> {
  async run(shared: Record<string, any>): Promise<string | undefined> {
    // Use state management flows to read current state
    const readState = shared.registry.createNode("hami-electron:state-read", {});
    // Add directory to workingDirectories array
    const addDirectory = new AddDirectoryNode();
    // Use state management flows to write updated state
    const writeState = shared.registry.createNode("hami-electron:state-write", {});

    this.startNode.next(readState).next(addDirectory).next(writeState);
    return super.run(shared);
  }
}
```

Reference: Core plugins available at `https://github.com/KMaheshBhat/hami/blob/main/packages/core-fs/README.md`, `https://github.com/KMaheshBhat/hami/blob/main/packages/core-config-fs/README.md`, `https://github.com/KMaheshBhat/hami/blob/main/packages/core-trace-fs/README.md`

### UI Integration
Sidebar component will:
- Load working directories from state on mount
- Display as simple list with selection highlighting
- Call working directory management flows on user actions

## Risks / Trade-offs
- Risk: Users might expect tree navigation → Mitigation: Clear that this is list-based, future proposals can add tree features
- Risk: State corruption affects working directory list → Mitigation: Depends on robust state management

## Migration Plan
None - new feature

## Open Questions
- How to handle working directory validation (existence, permissions)?
- Should working directories have display names/aliases?