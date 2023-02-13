import { default as express } from "express";
import { Inject } from "typescript-ioc";
import { AddressInfo } from "net";
import * as npmPackage from "../package.json";
import { parseCsvString } from "./util";
import { LoggerApi } from "./logger";
import http = require("http");
import path = require("path");
import cors = require("cors");
import { ApolloServer } from "apollo-server-express";
import { Config } from "apollo-server-core/src/types";
import { GraphQLSchema } from "graphql";
import { buildGraphqlSchema } from "./schema";

const config = npmPackage.config || {
  protocol: "http",
  host: "localhost",
  port: 3000,
  "context-root": "/",
};
const configApiContext = config["context-root"];

export class ApiServer {
  @Inject
  logger: LoggerApi;
  @Inject
  private server: http.Server = null;
  public PORT: number = +process.env.PORT || npmPackage.config.port;

  constructor(
    private readonly app: express.Application = express(),
    apiContext = configApiContext
  ) {
    this.logger.apply(this.app);
    this.app.use(cors());

    new Promise<ApolloServer>(async (resolve, reject) => {
      try {
        const schema: GraphQLSchema = (await buildGraphqlSchema()) as any;

        const graphqlServer = new ApolloServer({ schema });
        await graphqlServer.start();

        graphqlServer.applyMiddleware({ app: this.app });

        resolve(graphqlServer);
      } catch (error) {
        reject(error);
      }
    })
      .then((graphqlServer) => {
        this.logger.info(
          "Graphql server started: " + graphqlServer.graphqlPath
        );
      })
      .catch((error) => {
        this.logger.error("Error starting graphql server", { error });
      });
  }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public async start(): Promise<ApiServer> {
    return new Promise<ApiServer>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, () => {
        const addressInfo = this.server.address() as AddressInfo;

        const address =
          addressInfo.address === "::" ? "localhost" : addressInfo.address;

        // tslint:disable-next-line:no-console
        console.log(`Listening to http://${address}:${addressInfo.port}`);

        return resolve(this);
      });
    });
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(false);
      }
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
