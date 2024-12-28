
const dotenv = require('dotenv');
import mongoose from 'mongoose';

dotenv.config();

// Types
type DatabaseFunction = () => Promise<any>;
type ConnectionState = 0 | 1 | 2 | 3;

// Global connection instance
let connection: typeof mongoose | null = null;

// Custom error creator
const createDBException = (message: string): Error => {
  const error = new Error(message);
  error.name = 'DBException';
  return error;
};

// Get connection URL from environment
const getConnectionUrl = (): string => {
  const url = process.env.DB_CONNECTION_URL || process.env.CONNECTION_URL;
  if (!url) {
    throw createDBException('Database connection URL not found in environment variables');
  }
  return url;
};

// Get connection state name
const getConnectionStateName = (state: ConnectionState): string => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
};

// Set mongoose options
mongoose.set('strictQuery', true);

/**
 * Connect to MongoDB
 */
// export const connect = async (): Promise<typeof mongoose> => {
//   try {
//     if (connection) {
//       console.log('Using existing database connection');
//       return connection;
//     }

//     console.log('Opening new database connection');
//     connection = await mongoose.connect(getConnectionUrl());
//     return connection;
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Failed to connect to database';
//     throw createDBException(message);
//   }
// };

export const connect = async (): Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(getConnectionUrl());
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // or throw createDBException if you want to use your custom error
  }
};

/**
 * Execute database operation with automatic connection handling
 */
export const dbExecute = async <T>(operation: DatabaseFunction): Promise<T> => {
  try {
    await connect();
    const result = await operation();
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database operation failed';
    throw createDBException(message);
  }
};

/**
 * Open database connection
 */
export const openDBConnection = async (): Promise<typeof mongoose | null> => {
  try {
    const connectionState = mongoose.connection.readyState;

    // if (connectionState !== 1) {
    //   console.log('Opening new connection');
    //   return connection;
    // }
    connection = await mongoose.connect(getConnectionUrl());

    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    return null;
  }
};

/**
 * Close database connection
 */
export const closeDBConnection = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      connection = null;
      console.log('Database connection closed');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};

/**
 * Get current connection status
 */
export const getConnectionStatus = (): string => {
  return getConnectionStateName(mongoose.connection.readyState as ConnectionState);
};

// Set up connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err: Error) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 MongoDB disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  await closeDBConnection();
  process.exit(0);
});
