import { AppServer, bootstrap } from '../.lib';
import { AppUtilsController } from './controllers/app-utils';
import { SampleService } from './services/sample-service';

@AppServer({
    controllers: [
        AppUtilsController
    ],
    services: [
        SampleService
    ]
})
class Application {
    run(context) {
        context.app.log.info('App Started');
    }
}

bootstrap(Application);
