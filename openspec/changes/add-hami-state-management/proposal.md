## Why
The HAMI Electron application needs a centralized state management system to persist application data like user preferences and working directory configurations. This foundational capability will support multiple features including working directory management and future user preference systems.

## What Changes
- Add HAMI state management infrastructure for persisting application data
- Implement creation and management of `$USER/.hami/index.json` for state storage
- Provide APIs for reading and writing application state
- Establish patterns for future state-managed features

## Impact
- Affected specs: New capability `hami-state-management`
- Affected code: New state management utilities, file system operations
- New dependencies: None
- Migration: None (new foundational capability)