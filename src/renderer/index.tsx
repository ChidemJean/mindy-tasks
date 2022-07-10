import React from 'react';
import ReactDOM from 'react-dom';
import Search from './app/Search';
import { globalStyles } from './styles/global';

globalStyles();

ReactDOM.render(<Search />, document.getElementById('root'));
