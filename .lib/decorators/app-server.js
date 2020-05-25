import { reflections } from '../constants/reflect-keys';

export function AppServer({
    controllers = [],
    services = []
}) {
    return Reflect.metadata(reflections.app_server, [controllers, services]);
}
