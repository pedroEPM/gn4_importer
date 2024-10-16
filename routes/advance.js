import express from 'express';
const router = express.Router();

import { getPDFs, getNote } from '../queries/advance.js'
 
 
router.get('/pdf/:year', async (req, res = express.response) => {
    try {
        const { year } = req.params;
        const pdfs = await getPDFs(year);
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

router.get('/note/:xmlid', async (req, res = express.response) => {
    try {
        const { xmlid } = req.params;
        const note = await getNote(xmlid);
   
        res.status(200).json({
            ok: true,
            msg: note,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

export default router;