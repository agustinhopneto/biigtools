/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedule_categories', table => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table
      .integer('group_id')
      .references('id')
      .inTable('schedule_groups')
      .notNullable()
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedule_categories');
}
