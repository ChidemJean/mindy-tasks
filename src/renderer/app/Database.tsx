import { hot } from 'react-hot-loader/root';
import React from 'react';
import { remote } from 'electron';

export const Application: React.FC<{}> = () => {
    // const database: Database = remote.getGlobal('database');

    // async function insert() {
    //     await database.insert('test', 'test');
    // }

    // async function listAll() {
    //     console.table(await database.fetchAll());
    // }

    async function sendMessage() {
        // await database.deleteAll();
        window.Main.sendMessage("TESTANDO MAIN");
    }

    return (
        <div>
            <button onClick={() => sendMessage()}>Clean</button>
            <p style={{color: 'white'}}>Database</p>
        </div>
    );
};

export default hot(Application);
