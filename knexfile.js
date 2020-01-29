module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/encounters',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};