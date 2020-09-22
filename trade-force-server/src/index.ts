// -----------------------------------------------------------------------------
// Load environment variables from the .env file before doing anything else
// -----------------------------------------------------------------------------
import { config as envConfig } from 'dotenv';
envConfig();

// -----------------------------------------------------------------------------
// Load reflect-metadata before any inversify functions use it
// -----------------------------------------------------------------------------
import 'reflect-metadata';

// --- Remaining imports -----
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import TYPES from './constants/types';
import './controllers/UserController';
import { UserService } from './services';

// configure a new inversify container
const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);

// register the container with an inversify server
const inversifyServer = new InversifyExpressServer(container);

// configure middleware into the express app
inversifyServer.setConfig((app) => {
    // Add middleware to enable CORS
    app.use(cors());

    // Add middleware to parse the POST data of the body
    app.use(bodyParser.urlencoded({ extended: true }));

    // Add middleware to parse application/json
    app.use(bodyParser.json());
});

// configure an error handler into the express app
inversifyServer.setErrorConfig((app) => {
    app.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            if (err.detail) {
                res.status(500).send({ error: err.detail });
            } else {
                next(err);
            }
        }
    );
});

// -----------------------------------------------------------------------------
// Start the HTTP Server using the Express App
// -----------------------------------------------------------------------------
// this port can be mapped using docker
const port = 8080;
const app = inversifyServer.build();
const server = createServer(app);
server.listen(port, () => console.log('Listening on port ' + port));

// -----------------------------------------------------------------------------
// When SIGINT is received (i.e. Ctrl-C is pressed), shutdown services
// -----------------------------------------------------------------------------
process.on('SIGINT', () => {
    console.log('SIGINT received ...');

    console.log('Shutting down the server');
    server.close(() => {
        console.log('Server stopped ...');
        console.log('Exiting process ...');
        process.exit(0);
    });
});
