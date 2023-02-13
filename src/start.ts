import { ApiServer } from "./server";
import { DatabaseConnection } from "./database";

export const start = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const apiServer = new ApiServer();
    const connectDB = new DatabaseConnection();

    Promise.all([apiServer.start(), connectDB.connect()])
      .then(() => resolve())
      .catch(reject);

    const graceful = () => {
      Promise.all([apiServer.stop()]).then(() => process.exit(0));
    };

    // Stop graceful
    process.on("SIGTERM", graceful);
    process.on("SIGINT", graceful);
  });
};
