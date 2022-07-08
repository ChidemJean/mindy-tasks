import { hot } from 'react-hot-loader/root';
import React from 'react';
import { remote } from 'electron';
import Database from '../../main/database/Database';
import { ContextMenuDemo } from '../components/ContextMenu';

export const Application: React.FC<{}> = () => {
    const database: Database = remote.getGlobal('database');

    return (
        <ContextMenuDemo/>
    );
};

export default hot(Application);
