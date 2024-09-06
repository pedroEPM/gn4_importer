import express from 'express';
const router = express.Router();

import { getPDFS_, getImagesByPDFs_ } from '../controller/pdf.js'

router.get('/', async (req, res = express.response) => {
    try {
        const pdfs = await getPDFS_();
        res.status(200).json({
            ok: true,
            msg: pdfs,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

router.get('/:year', [], async(req, res = express.response) => await getImagesByPDFs_(req, res))

 

export default router;