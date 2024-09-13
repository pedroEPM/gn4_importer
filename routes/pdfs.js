import express from 'express';
const router = express.Router();

import { getPDFS_, getImagesByPDFs_ } from '../controller/pdf.js'

router.get('/:year', async (req, res = express.response) => {
    try {
        console.log('--- Getting PDFS --- ')
        const { year } = req.params;

        const pdfs = await getPDFS_(year);
        return res.status(200).json({
            ok: true,
            msg: pdfs,
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

router.get('/byimages/:year', [], async(req, res = express.response) => await getImagesByPDFs_(req, res))
// 

 

export default router;