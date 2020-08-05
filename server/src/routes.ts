/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ScheduleController from './controllers/ScheduleController';
import ScheduleGroupsController from './controllers/ScheduleGroupsController';
import ScheduleCategoriesController from './controllers/ScheduleCategoriesController';
import ScheduleProfessionalsController from './controllers/ScheduleProfessionalsController';

const upload = multer(multerConfig);

const scheduleController = new ScheduleController();
const scheduleGroupsController = new ScheduleGroupsController();
const scheduleCategoriesController = new ScheduleCategoriesController();
const scheduleProfessionalsController = new ScheduleProfessionalsController();

const routes = express.Router();

routes.post('/schedule', upload.single('file'), scheduleController.store);

routes.get('/schedule/groups', scheduleGroupsController.index);
routes.get('/schedule/groups/:id', scheduleGroupsController.show);
routes.post('/schedule/groups', scheduleGroupsController.store);
routes.put('/schedule/groups/:id', scheduleGroupsController.update);

routes.get('/schedule/categories', scheduleCategoriesController.index);
routes.get('/schedule/categories/:id', scheduleCategoriesController.show);
routes.post('/schedule/categories', scheduleCategoriesController.store);
routes.put('/schedule/categories/:id', scheduleCategoriesController.update);

routes.get('/schedule/professionals', scheduleProfessionalsController.index);
routes.get('/schedule/professionals/:id', scheduleProfessionalsController.show);
routes.post('/schedule/professionals', scheduleProfessionalsController.store);
routes.put(
  '/schedule/professionals/:id',
  scheduleProfessionalsController.update,
);

export default routes;
