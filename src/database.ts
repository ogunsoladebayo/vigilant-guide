import mongoose from "mongoose";
import { LoggerApi } from "./logger";
import { Inject } from "typescript-ioc";

export class DatabaseConnection {
  @Inject
  logger: LoggerApi;

  private readonly mongoUri: string;
  constructor() {
    this.mongoUri = process.env.MONGO_URI!;
  }

  public async connect() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(this.mongoUri, {});
      this.logger.info("Database connected");
    } catch (error) {
      this.logger.error("Error Connection DB", error);
    }
  }
}
