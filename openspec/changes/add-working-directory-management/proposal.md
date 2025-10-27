## Why
The HAMI Electron application needs to manage working directories for organizing HAMI projects. Users should be able to register, forget, and select working directories through a sidebar interface, building on the foundational HAMI state management.

## What Changes
- Add working directory registration and removal functionality
- Implement sidebar display of working directories as a list
- Add selection mechanism for current active working directory
- Integrate with HAMI state management for persistence

## Impact
- Affected specs: New capability `working-directory-management`, depends on `hami-state-management`
- Affected code: UI sidebar components, state integration
- New dependencies: None
- Migration: None (new feature)