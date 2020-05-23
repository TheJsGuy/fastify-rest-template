const { HttpMethod, RestController, RestHandler } = require('../decorators/rest-helper');



@RestController('/app-utils')
export class AppUtilsController {
    constructor() {
    }

    @RestHandler('', HttpMethod.GET)
    isActive = async () => {
        return {
            isWorking: true
        };
    };
}
