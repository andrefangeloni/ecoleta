import express from 'express';

import knex from './database/connection';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();

routes.get('/items', ItemsController.index);

routes.post('/points', PointsController.create);

export default routes;
