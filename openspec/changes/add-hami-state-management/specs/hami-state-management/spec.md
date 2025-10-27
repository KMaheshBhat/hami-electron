## ADDED Requirements

### Requirement: HAMI State File Management
The application SHALL create and manage a `$USER/.hami/index.json` file for persistent application state storage.

#### Scenario: Initialize state file
- **WHEN** application starts for the first time
- **THEN** creates `.hami` directory if it doesn't exist
- **AND** creates `index.json` with default empty state

#### Scenario: Read state file
- **WHEN** application needs current state
- **THEN** reads and parses `index.json` from `.hami` directory
- **AND** returns validated state object

#### Scenario: Write state file
- **WHEN** application state changes
- **THEN** writes updated state to `index.json`
- **AND** ensures atomic write operations

### Requirement: State Validation and Error Handling
The application SHALL validate state file integrity and handle corruption gracefully.

#### Scenario: Handle corrupted state file
- **WHEN** `index.json` contains invalid JSON
- **THEN** creates backup of corrupted file
- **AND** initializes with default state

#### Scenario: Handle missing state file
- **WHEN** `index.json` doesn't exist
- **THEN** creates new file with default state
- **AND** continues normal operation