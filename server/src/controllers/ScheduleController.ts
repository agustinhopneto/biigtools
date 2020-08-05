import { Request, Response } from 'express';
import Excel from 'exceljs';
import path from 'path';

import knex from '../database/connection';

interface DataProps {
  professional: string;
  attended?: number;
  absences?: number;
}

class ExamsScheduleController {
  async store(request: Request, response: Response): Promise<Response> {
    const fileName = request.file.filename;

    const workbook = new Excel.Workbook();

    const file = await workbook.xlsx.readFile(
      path.resolve(__dirname, '..', '..', 'uploads', 'workbooks', fileName),
    );

    const worksheet = await file.getWorksheet('Worksheet');

    const values = worksheet.getSheetValues();

    const data = values.map((value, index) => {
      if (index >= 11) {
        const professional = worksheet.getRow(index).getCell(3).text;
        const attended = Number(worksheet.getRow(index).getCell(10).value);
        const absences = Number(worksheet.getRow(index).getCell(12).value);

        const rowValues = {
          professional,
          attended: attended || 0,
          absences: absences || 0,
        };

        return rowValues;
      }

      return null;
    });

    const filteredData = data.filter(value => value?.professional);

    const professionals = await knex('schedule_professionals')
      .select(
        'schedule_professionals.name',
        'schedule_categories.name as category_name',
        'schedule_categories.id as category_id',
        'schedule_groups.name as group_name',
        'schedule_groups.id as group_id',
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

    const schedule = professionals.map(professional => {
      let scheduleData = filteredData.find(
        value => value?.professional === professional.name,
      );

      if (!scheduleData) {
        scheduleData = {
          professional: professional.name,
          attended: 0,
          absences: 0,
        };
      }

      const categoryName = professional.category_name;
      const groupName = professional.group_name;
      const professionalName = scheduleData?.professional;
      const attended = scheduleData?.attended;
      const absences = scheduleData?.absences;

      return { professionalName, attended, absences, categoryName, groupName };
    });

    const categoriesData = await knex('schedule_categories').select('*');
    const groupsData = await knex('schedule_groups').select('*');

    const categories = categoriesData.map(category => category.name);
    const groups = groupsData.map(group => group.name);

    const categoriesCount = categories.map(category =>
      schedule.reduce(
        (accumulator, item) => {
          switch (item.categoryName) {
            case category:
              if (item.attended && item.absences) {
                accumulator.attended += item.attended;
                accumulator.absences += item.absences;
              }
              break;
            default:
              break;
          }

          return accumulator;
        },
        {
          category,
          attended: 0,
          absences: 0,
        },
      ),
    );

    const groupsCount = groups.map(group =>
      schedule.reduce(
        (accumulator, item) => {
          switch (item.groupName) {
            case group:
              if (item.attended && item.absences) {
                accumulator.attended += item.attended;
                accumulator.absences += item.absences;
              }
              break;
            default:
              break;
          }

          return accumulator;
        },
        {
          group,
          attended: 0,
          absences: 0,
        },
      ),
    );

    return response.json({ schedule, categoriesCount, groupsCount });
  }
}

export default ExamsScheduleController;
