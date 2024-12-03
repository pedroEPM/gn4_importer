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

const app = express();


import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "mail.grupomegamedia.mx",
    port: 26,
    // host: "192.168.7.13",
    secure: false,
    auth: {
        user: "no-reply-megateca@grupomegamedia.mx",
        pass: "@X0n4rch1v0#",
    },
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    // },
})

setTimeout(async () => {
    try {
        const cEmail = 'pablo.estrellapalomo@gmail.com';
        await transporter.sendMail({
            from: `no-reply-megateca@megamedia.com.mx`,
            // from: `"No reply" <no-reply-megateca@megamedia.com.mx>`,
            to: cEmail,
          
            subject: 'Reporte: mmmmmmmmmm',
            // subject: 'Reporte: ' + description,
            html: `<strong>El usuario:</strong> `
            // html: `<strong>El usuario:</strong> ${emailNewUser} <br> <strong>Indica el siguiente reporte:</strong> ${description}`
        })
    } catch (error) {
        console.log('Error ', error)
    }
}, 2000);

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
