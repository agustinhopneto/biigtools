import { Request, Response } from 'express';

import knex from '../database/connection';

class ScheduleCategoriesController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const categories = await knex('schedule_categories')
        .select('schedule_categories.*', 'schedule_groups.name as group_name')
        .join(
          'schedule_groups',
          'schedule_categories.group_id',
          '=',
          'schedule_groups.id',
        );

      return response.json(categories);
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'An error has ocurred. Please, try again', ...err });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const category = await knex('schedule_categories')
        .select('schedule_categories.*', 'schedule_groups.name as group_name')
        .join(
          'schedule_groups',
          'schedule_categories.group_id',
          '=',
          'schedule_groups.id',
        )
        .where('schedule_categories.id', id)
        .first();

      if (!category) {
        return response.status(400).json({ errorTitle: 'Category not found.' });
      }

      return response.json(category);
    } catch (err) {
      return response.status(500).json({
        errorTitle: 'An error has ocurred. Please, try again',
        ...err,
      });
    }
  }

  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, groupId } = request.body;

      const group = await knex('schedule_groups')
        .select('*')
        .where('id', groupId)
        .first();

      if (!group) {
        return response.status(400).json({ errorTitle: 'Group not found.' });
      }

      const category = {
        name,
        group_id: groupId,
      };

      const categoryId = await knex('schedule_categories').insert(category);

      return response.json({ id: categoryId[0], ...category });
    } catch (err) {
      return response
        .status(500)
        .json({ errorTitle: 'Name already exists.', ...err });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, groupId } = request.body;

    const category = await knex('schedule_categories')
      .select('*')
      .where('id', id)
      .first();

    if (!category) {
      return response.status(400).json({ errorTitle: 'Category not found.' });
    }

    try {
      await knex('schedule_categories')
        .where('id', id)
        .update({ name, group_id: groupId });

      return response.json({ message: 'Category updated.' });
    } catch (err) {
      return response.json({ errorTitle: 'An error has ocurred.', ...err });
    }
  }
}

export default ScheduleCategoriesController;
