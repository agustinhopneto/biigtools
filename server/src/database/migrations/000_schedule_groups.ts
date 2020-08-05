/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedule_groups', table => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedule_groups');
}
