import express from 'express';
const router = express.Router();

import { setNewPDF } from '../controller/pdf.js'
import { setNewNote } from '../controller/note.js'
import { setNewImage } from '../controller/image.js'
import { moveThumbs } from '../utils/x-thumbs.js'
import { getPDFByUploadedDate } from '../queries/pdfs.js'
import { createMainFolders } from '../utils/createMainFolders.js'

const folder = process.env.FOLDER + '/archivo-in';

router.get('/importerFiles', async (req, res = express.response) => {
    try {

        const uploadDate = new Date().toISOString().substring(0,10);
        console.log(`--- ${uploadDate} ---`);
        createMainFolders(folder, uploadDate);
        await moveThumbs(uploadDate);
        await setNewPDF(uploadDate);
        await setNewNote(uploadDate)
        await setNewImage(uploadDate)
        return res.status(200).json({
            ok: true,
            msg: 'This is okey in importerFiles'
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

router.post('/pdfs', async (req, res = express.response) => {
    try {
        const { uploadDate } = req.body;
        console.log('--- Getting PDFs by uploadDate: ' + uploadDate + ' ---')
        const allPDFs = await getPDFByUploadedDate(uploadDate)
        return res.status(200).json({
            ok: true,
            msg: allPDFs
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

export default router;