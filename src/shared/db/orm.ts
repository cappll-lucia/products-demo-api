import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'ecommerce_demo',
    clientUrl:'mysql://root:root@localhost:3001/ecommerce_demo',
    highlighter: new SqlHighlighter(),
    debug: true,
    driver: MySqlDriver,
    schemaGenerator: {   // NEVER IN PRODUCTION
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    await generator.updateSchema()
}