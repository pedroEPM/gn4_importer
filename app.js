import 'dotenv/config';
import connection from "./databases/mongo.js";
import express from 'express';
import cors  from 'cors';
import logger  from 'morgan';

import notes from './routes/notes.js'
import pdfs from './routes/pdfs.js'
import images from './routes/images.js'

const app = express();

app.use(express.json());
app.use(logger('dev'))
app.use(cors());

app.use('/api/note', notes);
app.use('/api/pdf', pdfs);
app.use('/api/image', images);


console.clear();
connection();

// import { readXML } from './utils/setFolder.js'
// readXML()
// import { setNewImage } from './controller/image.js'
// setNewImage()
// import { setNewPDF } from './controller/pdf.js'
// setNewPDF()
import { setNewNote } from './controller/note.js'
setNewNote()

// import { getPDFS } from './queries/pdfs.js'
// getPDFS()

const port = process.env.PORT ?? 5001;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

