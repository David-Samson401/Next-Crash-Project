import mongoose, { Mongoose } from 'mongoose';

// Connection URI should be provided via environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast in development and at build time if the URI is missing
  throw new Error('MONGODB_URI environment variable is not defined');
}

// After the runtime check above, this value is always a string
const MONGODB_URI_STRING: string = MONGODB_URI;

// Shape of the cached connection stored on the global object
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use a typed global reference so TypeScript understands our cache without using `var`
const globalForMongoose = globalThis as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

// Initialize the cache on the global object if it does not exist yet
const cached: MongooseCache = globalForMongoose._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalForMongoose._mongooseCache = cached;

/**
 * Establishes a singleton Mongoose connection.
 *
 * In development, Next.js reloads modules frequently. Caching the connection
 * on the global object prevents creating a new connection on every reload.
 */
export async function connectMongoDB(): Promise<Mongoose> {
  // If we already have an active connection, reuse it.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is already in progress, await it instead of creating a new one.
  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI_STRING, options).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
