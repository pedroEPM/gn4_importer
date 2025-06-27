import 'dotenv/config';
import connection from "./databases/mongo.js";
import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import notes from './routes/notes.js'
import pdfs from './routes/pdfs.js'
import images from './routes/images.js'
import advance from './routes/advance.js'
import importer from './routes/importer.js'
import publicIP from './utils/getPublicIP.js';
import { findMissingYears, getExistingYears, getYearlyStats } from './queries/years.js';

const app = express();

app.use(express.json());
app.use(logger('dev'))
app.use(cors());

app.use('/api/note', notes);
app.use('/api/pdf', pdfs);
app.use('/api/image', images);
app.use('/api/advance', advance);
app.use('/api/importer', importer);

console.clear();
connection();

const port = process.env.PORT ?? 5001;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    publicIP()
});
