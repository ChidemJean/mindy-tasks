import { DataSource } from "typeorm";
import path from 'path';
import { app } from "electron";
import { UserSchema } from "./models/user.entity";
import { TaskSchema } from "./models/task.entity";

export const defaultStorageFolder = app.getPath('downloads');

const AppDataSource = new DataSource({
    type: "sqlite",
    synchronize: true,
    logging: true,
    logger: "simple-console",
    database: path.join(defaultStorageFolder, 'doc_app.sqlite'),
    entities: [
        TaskSchema, UserSchema
    ]
});

export const initDBConnection = () => {
    AppDataSource.initialize()
        .then(() => {})
        .catch((error: any) => console.log(error));
}

export default AppDataSource;