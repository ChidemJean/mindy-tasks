import { DataSource } from "typeorm";
import path from 'path';
import { app } from "electron";

export const defaultStorageFolder = app.getPath('downloads');

const AppDataSource = new DataSource({
    type: "sqlite",
    synchronize: true,
    logging: true,
    logger: "simple-console",
    database: path.join(defaultStorageFolder, 'doc_app.sqlite'),
    entities: [
        path.join(__dirname, "entity", "*.ts")
    ]
});

export const initDBConnection = () => {
    AppDataSource.initialize()
        .then(() => {})
        .catch((error: any) => console.log(error));
}

export default AppDataSource;