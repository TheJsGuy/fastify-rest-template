import { AppServer, bootstrap } from './decorators/app-server';
import { AppUtilsController } from './controllers/app-utils';


@AppServer({
    controllers: [
        AppUtilsController
    ]
})
class Application {
    run(context) {
        console.warn(context);
    }
}

bootstrap(Application);
