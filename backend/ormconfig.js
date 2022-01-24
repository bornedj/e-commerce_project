module.exports = {
    type: 'postgres',
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    logging: ["error", "migration", "query"],
    port: 5432,
    synchronize: false,
    entities: ['./src/entities/*.ts'],
    migrations: ["./src/migrations/*.ts"],
    migrationsRun: true,
    cli: {
        "migrationsDir": "./src/migrations"
    }
}