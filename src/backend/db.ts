import mongoose, { Connection } from "mongoose";

const MONGO_URI: string | undefined =
  process.env.MONGODB_URI || "mongodb://localhost:27017/link_db";
const cached: { connection?: Connection; promise?: Promise<Connection> } = {};

async function connectMongo(): Promise<Connection> {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("----------Db connected-----------");
      return mongoose;
    }) as any;
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection!;
}
export default connectMongo;
