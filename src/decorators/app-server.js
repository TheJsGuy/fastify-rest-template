import { reflections } from './reflect-keys';
import { addMethodToServer, startServer } from '../server/fastify-server';

export function AppServer({
    controllers = [],
    services = []
}) {
    return Reflect.metadata(reflections.app_server, [controllers, services]);
}

export function bootstrap(Server) {
    const server = new Server();
    const [controllers, services] = Reflect.getMetadata(reflections.app_server, Server);
    controllers.forEach(Controller => {
        const [controllerBasePath] = Reflect.getMetadata(reflections.rest_controller, Controller);
        const instance = new Controller();
        console.warn(controllerBasePath);
        const controllerMetaData = {
            controllerBasePath
        };
        for (let property of Object.keys(instance)) {
            const metaDataKeys = Reflect.getMetadataKeys(instance, property);

            if (metaDataKeys && metaDataKeys.length > 0) {
                handleControllerReflections(instance, property, metaDataKeys, controllerMetaData);
            }

        }
    });

    startServer(server);
}

function handleControllerReflections(
    instance,
    property,
    metaDataKeys,
    controllerMetaData
) {
    for (const key of metaDataKeys) {
        switch (key) {
            case reflections.rest_handler: {
                const [path, method] = Reflect.getMetadata(key, instance, property);
                addMethodToServer(method, controllerMetaData.controllerBasePath + path, instance[property]);
            }
        }
    }
}
