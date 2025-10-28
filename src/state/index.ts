// Main state management API surface
export { StateManagementService } from './service';

// Core state types and utilities
export type { HAMIState } from './state';
export { DEFAULT_STATE, validateState, handleStateError } from './state';