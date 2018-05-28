Logger

```
import logger from './modules/logger';

logger.ready();

logger.yarn.appStart('Logger testing app', 'App to test and showcase logger capabilities');


logger.system.access('access');

logger.yarn.status('server', true);
logger.yarn.status('status', false);

logger.yarn.info('github', 'http://github.com');
logger.yarn.info('version', '1.0.0');

logger.yarn.section('Server ready', 'all post startup logs below');


// logger.yarn.divider();
logger.yarn.success('Saving to DB', { test: 1, A: 'b' });


logger.log('Log');
logger.log('Log', 'log2', 'log3');
logger.log('Log', { test: 1 }, 'log3');
logger.log({test: 1});


logger.debug('debug', { value: 1 });
logger.info('info', { value: 1 });
logger.warn('warn', { value: 1 });
logger.error('error', { value: 1 });
```
