import { reflections } from "./reflect-keys";

export const HttpMethod = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete',
    OPTIONS: 'options',
    HEAD: 'head'
};

/**
 * 
 * @param {{method: string; path: string}} arg
 */
export function RestHandler(
    path,
    method
) {
    return Reflect.metadata(reflections.rest_handler, [path, method]);
}

/**
 * 
 * @param {{path: string}} arg
 */
export function RestController(
    path
) {
    return Reflect.metadata(reflections.rest_controller, [path]);
}
