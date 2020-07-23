import express from 'express';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();

routes.get('/items', ItemsController.index);

routes.get('/points/:id', PointsController.show);
routes.post('/points', PointsController.store);

export default routes;
