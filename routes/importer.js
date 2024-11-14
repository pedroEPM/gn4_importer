import express from 'express';
const router = express.Router();

import { setNewPDF } from '../controller/pdf.js'
import { moveThumbs } from '../utils/x-thumbs.js'
import { createMainFolders } from '../utils/createMainFolders.js'
const folder = process.env.FOLDER + '/archivo-in';

router.get('/importerFiles', async (req, res = express.response) => {
    try {

        const uploadDate = new Date().toISOString().substring(0,10);
        console.log(`--- ${uploadDate} ---`);
        createMainFolders(folder, uploadDate);
        await moveThumbs();
        // await setNewPDF(uploadDate);
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

export default router;