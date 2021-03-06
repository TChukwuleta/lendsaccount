// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // development: { 
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  development: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      // port : 3306,
      user: "root",
      password: '',
      database: 'useraccount'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: { 
      tableName: 'knex_migrations'
    }
  },

  migrations: {
    directory: './config/migrations'
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
