# Project Context

## Purpose
HAMI Electron is a GUI executor for the Human-Agent-Machine Interface (HAMI) framework. It provides a desktop application built with Electron that serves as a graphical interface for executing HAMI workflows, allowing users to interact with and manage human-agent workflows through a visual interface rather than command-line tools.

The project aims to:
- Provide an accessible GUI for HAMI workflow execution
- Enable visual workflow design and management
- Integrate with the HAMI plugin system for extensible functionality
- Support file system operations, configuration management, and tracing through the HAMI core libraries

## Tech Stack
- **Frontend**: React 19 with TypeScript, Tailwind CSS for styling
- **Desktop Framework**: Electron 38.4.0 with Electron Forge for packaging and distribution
- **Build Tools**: Webpack (via Electron Forge plugins), PostCSS, TypeScript compiler
- **Linting**: ESLint with TypeScript and import plugins
- **Core Framework**: @hami-frameworx/core (HAMI framework core library)
- **Runtime**: Node.js (via Electron), Bun (recommended for development)

## Project Conventions

### Code Style
- **TypeScript**: Strict mode enabled with `noImplicitAny: true`
- **JSX**: Uses React JSX transform (`"jsx": "react-jsx"`)
- **Linting**: ESLint with recommended rules for TypeScript, imports, and Electron-specific patterns
- **Naming**: CamelCase for classes and functions, kebab-case for file names
- **Imports**: ES6 modules with path mapping support

### Architecture Patterns
- **Electron Architecture**: Main process (Node.js) handles system operations, renderer process (Chromium) handles UI
- **HAMI Plugin System**: Extends HAMI framework with custom nodes and flows (e.g., `HAMITestNode`, `HAMITestFlow`)
- **React Components**: Functional components with hooks for state management
- **Separation of Concerns**: Main process for Electron logic, renderer for React UI, preload scripts for secure IPC

### Testing Strategy
- No explicit testing framework configured yet
- Manual validation of HAMI core library integration in both main and renderer processes
- Linting as primary code quality gate

### Git Workflow
- Standard Git practices with feature branches
- Commit messages should be descriptive and follow conventional commit format when applicable
- No specific branching strategy documented (main branch development)

## Domain Context
HAMI (Human-Agent-Machine Interface) is a modular, plugin-based framework for building human-agent workflows using TypeScript. It provides:
- **HAMINode**: Abstract base class for workflow nodes performing specific operations
- **HAMIFlow**: Abstract base class for complete workflows composed of connected nodes
- **Plugin System**: Extensible architecture for registering custom nodes and flows
- **Core Plugins**: File system operations, configuration management, tracing/logging

This project extends HAMI by providing a desktop GUI for workflow execution, making the framework more accessible to non-technical users.

## Important Constraints
- **Electron Limitations**: Must adhere to Electron's security model (context isolation, preload scripts)
- **HAMI Framework Compatibility**: Must integrate with @hami-frameworx/core and maintain plugin architecture
- **Desktop Application**: Cross-platform compatibility (Windows, macOS, Linux) via Electron Forge
- **TypeScript Strict Mode**: All code must pass strict TypeScript compilation

## State Management Architecture

The application implements a centralized state management system following HAMI framework patterns for persisting application data to `$USER/.hami/index.json`.

### State Structure
```typescript
// Generic state container - specific domains handled by other services
export type HAMIState = Record<string, any>;
```

### HAMI Framework Integration
- **HAMINodes**: `StateReadNode` and `StateWriteNode` handle file I/O operations with proper lifecycle (`prep()`/`exec()`/`post()`)
- **HAMIFlows**: `StateReadFlow` and `StateWriteFlow` orchestrate state operations with Node chaining and configuration validation
- **Service Layer**: `StateManagementService` provides high-level API with event-driven notifications
- **IPC Integration**: Electron IPC handlers enable secure renderer process access to state operations

### File Organization
```
src/
├── main.ts                # Electron main process
├── registry/
│   └── bootstrap.ts       # HAMI registry setup
├── state/
│   ├── index.ts           # Public API surface
│   ├── service.ts         # State management service
│   └── state.ts           # State types and validation
├── ops/                   # HAMI operations (nodes and flows)
│   ├── index.ts
│   ├── state-read-node.ts
│   ├── state-write-node.ts
│   ├── state-read-flow.ts
│   └── state-write-flow.ts
├── ui/
│   └── app.tsx            # React application
├── ipc-handlers.ts        # IPC communication handlers
└── renderer.ts            # Electron renderer entry
```

### Error Recovery
- **Missing File**: Automatically creates with default state
- **Corrupted JSON**: Backs up corrupted file and initializes with defaults
- **Invalid Structure**: Validates state and falls back to defaults
- **Atomic Writes**: Ensures data integrity during state persistence

### IPC API
The system provides IPC handlers for renderer process access:
- `state:get` - Retrieve current state
- `state:update` - Update state with partial changes
- `state:update-key` - Update a specific state key
- `state:get-key` - Get a specific state key

Events are broadcast to renderer processes for state changes and initialization.

## External Dependencies
- **@hami-frameworx/core**: Core HAMI framework library for workflow execution and plugin system
- **Electron Ecosystem**: Electron Forge for packaging, various makers for platform-specific builds
- **React Ecosystem**: React, React DOM for UI rendering
- **Build Tools**: Webpack loaders and plugins for asset handling and TypeScript compilation
