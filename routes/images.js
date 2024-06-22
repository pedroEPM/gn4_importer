import express from 'express';
const router = express.Router();

import { findByXMLId } from '../controller/image.js'
 
 
router.get('/XML/:id', async (req, res = express.response) => {
    try {
        const { id } = req.params;
        const image = await findByXMLId(+id);
        res.status(200).json({
            ok: true,
            msg: image,
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