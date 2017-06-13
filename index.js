
'use strict';

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


import _proxy from './server/_router'
import config from './config'

const app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



app.use(_proxy)

app.listen(config.httpPort, () => {
    console.log("You can debug your app with http://" + config.localhost + ':' +config.httpPort );
});

export default app;