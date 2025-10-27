## ADDED Requirements

### Requirement: Working Directory Registration
The application SHALL allow users to register working directories for management.

#### Scenario: Register working directory
- **WHEN** user provides a directory path
- **THEN** the path is added to the working directories list in state
- **AND** the sidebar updates to show the new working directory

#### Scenario: Prevent duplicate registration
- **WHEN** user attempts to register an already registered directory
- **THEN** the operation is rejected with appropriate error message

### Requirement: Working Directory Removal
The application SHALL allow users to forget/remove working directories from management.

#### Scenario: Remove working directory
- **WHEN** user selects a working directory to remove
- **THEN** the directory is removed from the working directories list in state
- **AND** the sidebar updates to hide the removed directory

#### Scenario: Handle active directory removal
- **WHEN** user removes the currently active working directory
- **THEN** no directory is selected as active
- **AND** the application returns to default state

### Requirement: Working Directory Sidebar Display
The application SHALL display registered working directories in the sidebar as a list.

#### Scenario: Display working directories
- **WHEN** application loads
- **THEN** sidebar shows list of registered working directories
- **AND** current active directory is visually highlighted

### Requirement: Active Working Directory Selection
The application SHALL allow users to select the current active working directory.

#### Scenario: Select active directory
- **WHEN** user clicks on a working directory in the sidebar
- **THEN** that directory becomes the active working directory
- **AND** the selection is persisted in state
- **AND** UI updates to reflect the new active directory