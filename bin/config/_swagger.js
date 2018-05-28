import path from 'path';

export default {
  // app root to be used by swagger, default bin/
  appRoot: path.resolve(process.cwd(), 'bin/'),
  // swagger config dir, default bin/config
  configDir: path.resolve(process.cwd(), 'bin/config/'),
  // swagger config file
  swaggerFile: path.resolve(process.cwd(), 'bin/api/routes/routes.yaml'),
  // docs path in express route
  swaggerDocBaseRoute: '/',
};
