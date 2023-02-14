import { ApiServer } from "./server";
import { DatabaseConnection } from "./database";
import { Seed } from "./util/seeders";

export const start = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const apiServer = new ApiServer();
    const connectDB = new DatabaseConnection();
    const seeder = new Seed();

    Promise.all([
      apiServer.start(),
      connectDB.connect(),
      seeder.seedPizzaTypes(),
      seeder.seedIngredients(),
      seeder.seedRecipes(),
      seeder.seedOrders(),
    ])
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
