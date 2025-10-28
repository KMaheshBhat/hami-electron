# HAMI Electron

A desktop GUI application for executing [HAMI (Human-Agent-Machine-Interface)](https://github.com/KMaheshBhat/hami) workflows. Built with Electron, this application provides a visual interface for managing and running human-agent workflows, making the HAMI framework accessible to users who prefer graphical interfaces over command-line tools.

## Overview

HAMI Electron bridges the gap between the powerful HAMI framework and end-users by providing an intuitive desktop application. It leverages the HAMI core plugin system to enable workflow execution, configuration management, and tracing through a modern React-based interface.

HAMI Electron builds on top of the HAMI framework, which is a modular, plugin-based system for creating extensible workflows that bridge human interaction with machine execution. The framework provides a plugin architecture for dynamically registering custom nodes and flows, with built-in support for file system operations, configuration management, and tracing.

## Features

- **HAMI Integration**: Full integration with the HAMI framework for workflow execution
- **State Management**: Centralized state persistence system for application data
- **Electron Desktop App**: Cross-platform desktop application built with Electron
- **React UI**: Modern user interface built with React and TypeScript
- **Plugin Architecture**: Extensible architecture supporting HAMI plugins and custom workflows

## Architecture

For detailed architecture information including state management, HAMI framework integration, and technical implementation details, see [`openspec/project.md`](../openspec/project.md).

### Core Components

- **Electron Main Process**: Handles system operations, window management, and HAMI workflow execution
- **React Renderer Process**: Provides the graphical user interface for workflow management
- **HAMI Integration**: Direct integration with @hami-frameworx/core for workflow execution
- **Plugin System**: Extensible architecture supporting custom HAMI nodes and flows

## Installation

### Prerequisites

- Node.js 18+
- npm (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/KMaheshBhat/hami-electron.git
cd hami-electron

# Install dependencies
npm install

# Start development mode
npm run start

# Package for distribution
npm run package

# Create distributable builds
npm run make
```

## Usage

### Running the Application

```bash
# Development mode
npm run start

# Production build
npm run make
```

The application currently provides:
- Full HAMI framework integration with state management system
- Centralized state persistence to `$USER/.hami/index.json`
- A React-based user interface with IPC communication
- Foundation for building comprehensive workflow management features

### Integration with HAMI CLI

HAMI Electron complements the HAMI CLI tools. Use the CLI for advanced workflow management and scripting, while using the Electron app for visual workflow execution and monitoring.

## Development

For detailed development information including project structure, build processes, and technical implementation details, see [`openspec/project.md`](../openspec/project.md).

### Quick Development Commands

```bash
# Lint code
npm run lint

# Build all components
npm run build
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## Technology Stack

- **Desktop Framework**: Electron with Electron Forge
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tools**: Webpack, PostCSS
- **Linting**: ESLint with TypeScript support
- **Core Framework**: @hami-frameworx/core

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related Projects

- [HAMI Core Framework](https://github.com/KMaheshBhat/hami) - The core HAMI framework
- [HAMI CLI](https://github.com/KMaheshBhat/hami/tree/main/apps/hami-cli) - Command-line interface for HAMI
- [HAMI Server](https://github.com/KMaheshBhat/hami/tree/main/apps/hami-server) - HTTP API server for HAMI
