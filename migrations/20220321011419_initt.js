/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('user', table => {
        table.integer('account_balance').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id')
        table.string('first_name', 100).notNullable()
        table.string('last_name', 100).notNullable()
        table.string('email', 100).notNullable().unique()
        table.string('password').notNullable()
        table.integer('account_no').notNullable()
        table.timestamps(true, true)
    })
};
