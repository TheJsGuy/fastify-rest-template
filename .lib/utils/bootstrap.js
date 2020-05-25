import { reflections } from '../constants/reflect-keys';
import { FastifyApp } from '../server/fastify-server';

const fastifyApp = new FastifyApp();

export function bootstrap(Server) {
    const server = new Server();
    const [controllers, services] = Reflect.getMetadata(reflections.app_server, Server);

    mapServices(services);
    mapControllers(controllers);

    fastifyApp.run(server.run);
}

function mapServices(services) {
    services.forEach(Service => {
        const [name] = Reflect.getMetadata(reflections.app_injectable, Service);
        const serviceInstace = new Service();
        fastifyApp.addToDefaultServicePool(name, serviceInstace);
    });
}

function mapControllers(controllers) {
    controllers.forEach(Controller => {
        const [controllerBasePath] = Reflect.getMetadata(reflections.rest_controller, Controller);
        const instance = new Controller();
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
}

function handleControllerReflections(
    instance,
    property,
    metaDataKeys,
    controllerMetaData
) {
    for (const key of metaDataKeys) {
        switch (key) {
            case reflections.rest_handler:
                const [path, method] = Reflect.getMetadata(key, instance, property);
                fastifyApp.addRoute(
                    method,
                    controllerMetaData.controllerBasePath + path,
                    instance[property]
                );
                break;

            case reflections.app_inject:
                const [name, context] = Reflect.getMetadata(key, instance, property);
                if (name) {
                    instance[property] = fastifyApp.getServiceFromDefaultPool(name);
                }
                break;
        }
    }
}