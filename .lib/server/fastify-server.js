import Fastify from 'fastify';
import { HttpMethod } from '../constants/http-method';


export class FastifyApp {
    constructor({
        port = 3000,
        logger = true
    } = {}) {
        this.port = port;
        this.defaultServicePool = {};

        this.app = Fastify({
            logger
        });
    }

    /**
     * @param {string} method
     * @param {string} path
     * @param {function} handler
     */
    addRoute = (method, path, handler) => {
        switch (method) {
            case HttpMethod.GET:
                this.app.get(
                    path,
                    handler
                );
                break;
            case HttpMethod.POST:
                this.app.post(
                    path,
                    handler
                );
                break;
            case HttpMethod.PUT:
                this.app.put(
                    path,
                    handler
                );
                break;
            case HttpMethod.DELETE:
                this.app.delete(
                    path,
                    handler
                );
                break;
            case HttpMethod.HEAD:
                this.app.head(
                    path,
                    handler
                );
                break;
            case HttpMethod.OPTIONS:
                this.app.options(
                    path,
                    handler
                );
                break;
            default:
                this.app.get(
                    path,
                    handler
                );
        }
    }

    run = async callback => {
        try {
            await this.app.listen(this.port);
            this.app.log.info(`server stated on port: ${this.app.server.address().port}`);
            callback({
                app: this.app
            });
        } catch (error) {
            this.app.log.error(error);
            process.exit(1);
        }
    }

    addToDefaultServicePool = (name, service) => {
        if (!this.defaultServicePool[name]) {
            this.defaultServicePool[name] = service;
        }
    }

    getServiceFromDefaultPool = name => {
        return this.defaultServicePool[name];
    }
}


