import { Inject } from '../../.lib';

const { HttpMethod, RestController, RestHandler } = require('../../.lib');



@RestController('/app-utils')
export class AppUtilsController {

    @Inject('sampleService')
    sampleService;

    constructor() {
    }

    @RestHandler('/isActive', HttpMethod.GET)
    isActive = async () => {
        return this.sampleService.isActive();
    };

    @RestHandler('/serverTime', HttpMethod.GET)
    getServerTime = async () => {
        return {
            time: new Date().getTime()
        };
    };
}
