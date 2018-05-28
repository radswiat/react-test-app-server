import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import logger from 'core/modules/logger';
import Swagger from 'core/modules/swagger';
import dictionary from 'modules/dictionary';

import { systemCfg, swaggerCfg } from 'config';

export default new class Server {

  constructor() {
    logger.ready();
    logger.yarn.appStart('Test', 'Test api example');
    this.startup();
  }

  /**
   * Start up auth server
   * @return {Promise.<void>}
   */
  async startup() {

    // create express app
    this.app = express();

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());

    // add helmet security layer
    this.app.use(helmet());

    // create http server
    this.server = http.Server(this.app);

    // start swagger api
    new Swagger(this.app, swaggerCfg);

    // start server
    this.listen();
  }

  /**
   * Post startup
   * - once server is up and running
   * @returns {Promise<void>}
   */
  async postStartup() {
    // make sure dictionary data is in DB
    dictionary.importCheck();
  }

  listen() {
    this.server.listen(systemCfg.port, () => {
      logger.yarn.info('port', systemCfg.port);
      this.postStartup();
    });
  }
};
