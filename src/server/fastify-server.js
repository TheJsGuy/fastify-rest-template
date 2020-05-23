import Fastify from 'fastify';

const app = Fastify({
    logger: true
});


export function addMethodToServer(
    method,
    path,
    handler
) {
    app[method](path, handler);
};

export const startServer = async server => {
    try {
        await app.listen(3000);
        app.log.info(`server listening on ${app.server.address().port}`);
        server.run(app);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

