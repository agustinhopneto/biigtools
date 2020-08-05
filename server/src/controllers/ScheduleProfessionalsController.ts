import { Request, Response } from 'express';

import knex from '../database/connection';

class ScheduleProfessionalsController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const professionals = await knex('schedule_professionals')
        .select(
          'schedule_professionals.*',
          'schedule_categories.group_id',
          'schedule_categories.name as category_name',
          'schedule_groups.name as group_name',
        )
        .join(
          'schedule_categories',
          'schedule_professionals.category_id',
          '=',
          'schedule_categories.id',
        )
        .join(
          'schedule_groups',
          'schedule_categories.group_id',
          '=',
          'schedule_groups.id',
        );

      return response.json(professionals);
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'An error has ocurred. Please, try again', ...err });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const professional = await knex('schedule_professionals')
        .select(
          'schedule_professionals.*',
          'schedule_categories.group_id',
          'schedule_categories.name as category_name',
          'schedule_groups.name as group_name',
        )
        .join(
          'schedule_categories',
          'schedule_professionals.category_id',
          '=',
          'schedule_categories.id',
        )
        .join(
          'schedule_groups',
          'schedule_categories.group_id',
          '=',
          'schedule_groups.id',
        )
        .where('schedule_professionals.id', id)
        .first();

      if (!professional) {
        return response
          .status(400)
          .json({ errorTitle: 'Professional not found.' });
      }

      return response.json(professional);
    } catch (err) {
      return response.status(500).json({
        errorTitle: 'An error has ocurred. Please, try again',
        ...err,
      });
    }
  }

  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, categoryId } = request.body;

      const category = await knex('schedule_categories')
        .select('*')
        .where('id', categoryId)
        .first();

      if (!category) {
        return response.status(400).json({ errorTitle: 'Category not found.' });
      }

      const professional = {
        name,
        category_id: categoryId,
      };

      const professionalId = await knex('schedule_professionals').insert(
        professional,
      );

      return response.json({ id: professionalId[0], ...professional });
    } catch (err) {
      return response
        .status(500)
        .json({ errorTitle: 'Name already exists.', ...err });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, categoryId } = request.body;

    const professional = await knex('schedule_professionals')
      .select('*')
      .where('id', id)
      .first();

    if (!professional) {
      return response
        .status(400)
        .json({ errorTitle: 'Professional not found.' });
    }

    try {
      await knex('schedule_professionals')
        .where('id', id)
        .update({ name, category_id: categoryId });

      return response.json({ message: 'Professional updated.' });
    } catch (err) {
      return response.json({ errorTitle: 'An error has ocurred.', ...err });
    }
  }
}

export default ScheduleProfessionalsController;
