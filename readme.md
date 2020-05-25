# fastify-rest-template
application to serve as spring like decorator based web application framework using `babel`

## target

* build decorator driven web app framework
* all configurations should be annotation driven and must only use `dotenv` for static config files
* use Module SPI config file at root to identify entry-points to application and configurations

## node.js

|  Node.js | v12.16.3  |
|---|---|

## tasks

- [x] basic project setup
- [ ] create dependency tree management system for services
- [ ] add `@Configuration` decorator for loading configs
- [ ] add templates for mongodb, redis and sql for consumer to add
