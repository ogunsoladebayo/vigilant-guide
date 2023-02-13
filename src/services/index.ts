import { Container } from "typescript-ioc";

export * from "./pizza.api";

import config from "./ioc.config";

Container.configure(...config);
