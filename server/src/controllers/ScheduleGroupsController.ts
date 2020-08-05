import { Request, Response } from 'express';

import knex from '../database/connection';

class ScheduleGroupsController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const groups = await knex('schedule_groups').select('*');

      return response.json(groups);
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'An error has ocurred. Please, try again', ...err });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const group = await knex('schedule_groups')
        .select('*')
        .where('id', id)
        .first();

      if (!group) {
        return response.status(400).json({ errorTitle: 'Group not found.' });
      }

      return response.json(group);
    } catch (err) {
      return response.status(500).json({
        errorTitle: 'An error has ocurred. Please, try again',
        ...err,
      });
    }
  }

  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;

      const group = {
        name,
      };

      const groupId = await knex('schedule_groups').insert(group);

      return response.json({ id: groupId[0], ...group });
    } catch (err) {
      return response
        .status(500)
        .json({ errorTitle: 'Name already exists.', ...err });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const group = await knex('schedule_groups')
      .select('*')
      .where('id', id)
      .first();

    if (!group) {
      return response.status(400).json({ errorTitle: 'Group not found.' });
    }

    try {
      await knex('schedule_groups').where('id', id).update({ name });

      return response.json({ message: 'Group updated.' });
    } catch (err) {
      return response.status(400).json({ errorTitle: 'Name already exists.', ...err });
    }
  }
}

export default ScheduleGroupsController;
