// models/consoles.ts

// Represents the full database record for a game console
export interface GameConsole {
    id: number; // Primary key
    name: string; // Name of the console
    manufacturer?: string; // Manufacturer of the console
    release_year?: number; // Year the console was released
    region?: string; // Region the console is targeted for
    color?: string; // Color of the console
    storage_capacity?: number; // Storage capacity in GB (optional)
    is_portable?: boolean; // Indicates if the console is portable
    has_online_support?: boolean; // Indicates if the console supports online features
    supported_resolutions?: string[]; // Supported resolutions as an array of strings
    price?: number; // Price of the console in USD
  }



  export interface GameConsoleData {
    name: string; // Required
    manufacturer?: string; 
    release_year?: number;
    region?: string;
    color?: string;
    storage_capacity?: number;
    is_portable?: boolean;
    has_online_support?: boolean;
    supported_resolutions?: string[]; // Array type for PostgreSQL
    price?: number;
  }
  