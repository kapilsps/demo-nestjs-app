import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Task } from "src/db/entities/task.entity";
import { User } from "src/db/entities/user.entity";

// const baseDir = join(__dirname, '../');
// const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;
// const migrationPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;
// const dbType = process.env.TYPEORM_TYPE || 'mysql';
// console.log('username', process.env.TYPEORM_USERNAME);
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'mvc_nest_js',
    port: 3306,
    entities: [User, Task],
    synchronize:true
}