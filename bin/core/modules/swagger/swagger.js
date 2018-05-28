import nodePath from 'path';

import yamlToJS from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import SwaggerRunner from 'swagger-node-runner';
import get from 'lodash/get';
import set from 'lodash/set';

import { findStringAttr } from '../../utils';

/**
 * Swagger api core
 */
export default class Swagger {

  constructor(app, config) {
    this.app = app;
    this.config = config;
    this._createSwagger();
  }

  /**
   * Create swagger api middleware
   * @private
   */
  _createSwagger() {
    SwaggerRunner.create(this.config, (err, runner) => {
      if (err) return console.log(err);
      const sw = runner.expressMiddleware();
      sw.register(this.app);
      // create swagger docs after swagger register
      // has to be after or express routes will not overwrite
      this._createSwaggerDocs();
    });
  }

  /**
   * Create swagger docs
   * @private
   */
  _createSwaggerDocs() {
    const swaggerDocument = yamlToJS.load(this.config.swaggerFile);
    // Recursively search through the swagger file to replace $ref with actual values for swagger docs
    findStringAttr(swaggerDocument, '$ref', ({ path, lastPathKey }) => {
      const value = get(swaggerDocument, `${path.join('.')}.${lastPathKey}`);
      set(swaggerDocument, path.join('.'), this._getYamlRefFile(value));
    });
    this.app.use(this.config.swaggerDocBaseRoute, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  /**
   * Gets the JS version of a swagger file
   * @param filePath
   * @returns {*}
   * @private
   */
  _getYamlRefFile(filePath) {
    return yamlToJS.load(nodePath.resolve(process.cwd(), filePath));
  }

}
